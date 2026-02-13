from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'andreimartynenko@outlook.com')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Models
class ContactInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: str

class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Project(BaseModel):
    id: str
    title: str
    category: str
    description: str
    image_url: str
    location: str
    year: str

class Testimonial(BaseModel):
    id: str
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
    inquiry_obj = ContactInquiry(**input.model_dump())
    
    # Send email notification
    try:
        html_content = f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {input.name}</p>
        <p><strong>Email:</strong> {input.email}</p>
        <p><strong>Phone:</strong> {input.phone or 'Not provided'}</p>
        <p><strong>Service:</strong> {input.service}</p>
        <p><strong>Message:</strong></p>
        <p>{input.message}</p>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New Inquiry from {input.name} - {input.service}",
            "html": html_content,
            "reply_to": input.email
        }
        
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent for inquiry from {input.email}")
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
    
    return inquiry_obj

@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = [
        {
            "id": "1",
            "title": "Gherkin Offices",
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
            "title": "ASDA Petrol Stations",
            "category": "Shopfitting",
            "description": "Retail shopfitting for multiple ASDA petrol station convenience stores",
            "image_url": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
            "location": "Nationwide, UK",
            "year": "Completed"
        },
        {
            "id": "4",
            "title": "H&M Shops",
            "category": "Shopfitting",
            "description": "Complete retail shopfitting for H&M store locations",
            "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
            "location": "London, UK",
            "year": "Completed"
        }
    ]
    return projects

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = [
        {
            "id": "1",
            "name": "EG Group Management",
            "company": "EG Group",
            "quote": "Armin Shopfitting delivered exceptional quality on our projects. Their attention to detail, professionalism, and ability to meet tight deadlines made them a pleasure to work with. We highly recommend their services.",
            "rating": 5
        },
        {
            "id": "2",
            "name": "Sarah Williams",
            "company": "Retail Development Manager",
            "quote": "Outstanding work on our retail fit-outs. The team understood our brand requirements perfectly and delivered a space that exceeded our expectations.",
            "rating": 5
        },
        {
            "id": "3",
            "name": "David Chen",
            "company": "Property Developer",
            "quote": "From initial consultation to final handover, Armin Shopfitting demonstrated expertise and reliability. Their project management was seamless.",
            "rating": 5
        }
    ]
    return testimonials

# Include the router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
