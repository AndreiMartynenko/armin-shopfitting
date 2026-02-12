from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ContactInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: str

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    description: str
    image_url: str
    location: str
    year: str

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    quote: str
    rating: int = 5

# Routes
@api_router.get("/")
async def root():
    return {"message": "Armin Shopfitting API"}

@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(input: ContactInquiryCreate):
    inquiry_dict = input.model_dump()
    inquiry_obj = ContactInquiry(**inquiry_dict)
    
    doc = inquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_inquiries.insert_one(doc)
    return inquiry_obj

@api_router.get("/contact", response_model=List[ContactInquiry])
async def get_contact_inquiries():
    inquiries = await db.contact_inquiries.find({}, {"_id": 0}).to_list(1000)
    
    for inquiry in inquiries:
        if isinstance(inquiry.get('created_at'), str):
            inquiry['created_at'] = datetime.fromisoformat(inquiry['created_at'])
    
    return inquiries

@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    # Return real projects data
    projects = [
        {
            "id": "1",
            "title": "Girkin Offices",
            "category": "Refurbishing",
            "description": "Complete office refurbishment with modern fit-out and interior design",
            "image_url": "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
            "location": "London, UK",
            "year": "Current"
        },
        {
            "id": "2",
            "title": "BBC Studios",
            "category": "Construction",
            "description": "Full studio construction and professional fit-out services",
            "image_url": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
            "location": "London, UK",
            "year": "Completed"
        },
        {
            "id": "3",
            "title": "ASDA Petrol Station Shops",
            "category": "Shopfitting",
            "description": "Retail shopfitting for multiple ASDA petrol station convenience stores",
            "image_url": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
            "location": "Nationwide, UK",
            "year": "Completed"
        }
    ]
    return projects

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    # Return sample testimonials
    testimonials = [
        {
            "id": "1",
            "name": "James Mitchell",
            "company": "Mitchell Retail Group",
            "quote": "Armin Shopfitting transformed our retail space beyond expectations. Their attention to detail and professionalism is unmatched.",
            "rating": 5
        },
        {
            "id": "2",
            "name": "Sarah Williams",
            "company": "Williams & Co Properties",
            "quote": "From property analysis to final construction, their team delivered exceptional results on time and within budget.",
            "rating": 5
        },
        {
            "id": "3",
            "name": "David Chen",
            "company": "Chen Hospitality",
            "quote": "The refurbishment of our hotel lobby was handled with incredible skill. Our guests constantly compliment the new design.",
            "rating": 5
        }
    ]
    return testimonials

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
