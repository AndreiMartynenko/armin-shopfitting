import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navbar Component - Simple & Clean
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav data-testid="navbar" className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-36 md:h-48 lg:h-52">
          {/* Logo - Bigger */}
          <a href="#" data-testid="logo" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_construct-homes-1/artifacts/hbm9jntv_ArminshopfittinG.png" 
              alt="Armin Shopfitting Logo" 
              className="h-28 sm:h-32 md:h-40 lg:h-44 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-${link.name.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact">
              <Button
                data-testid="nav-cta"
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 text-sm"
              >
                Get in Touch
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white py-6 border-t border-gray-100"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <a href="#contact">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full">
                  Get in Touch
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

// Hero Section - With Image
const HeroSection = () => {
  return (
    <section data-testid="hero-section" className="pt-36 md:pt-48 lg:pt-52">
      {/* Hero Image - Clean & Calm */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
          alt="Modern interior space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-3xl md:text-5xl font-light text-center px-6"
          >
            Construction & Refurbishment Services
          </motion.h2>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight mb-8">
            We deliver <span className="font-medium">construction</span>, <span className="font-medium">refurbishment</span> and <span className="font-medium">property analysis</span> services across London.
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
            With 5 years' experience in design, build and consultancy, we bring clarity and control to complex projects.
          </p>

          <a href="#contact">
            <Button
              data-testid="hero-cta"
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-6 text-base group"
            >
              Arrange a Consultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Services Section - Minimal Cards
const ServicesSection = () => {
  const services = [
    {
      title: "Property Analysis",
      description: "We assess your property's potential, evaluate structural integrity, and plan optimal development strategies."
    },
    {
      title: "Refurbishing",
      description: "Transform existing spaces with modern renovations, interior upgrades, and complete property makeovers."
    },
    {
      title: "Construction",
      description: "Full-scale construction services from ground-up builds to complex commercial fit-outs and extensions."
    },
    {
      title: "Shopfitting",
      description: "Expert retail and commercial fit-out services, creating spaces that enhance customer experience."
    },
    {
      title: "Interior Design",
      description: "We translate your vision into refined, buildable design that enhances both experience and performance."
    },
    {
      title: "Project Management",
      description: "We plan, coordinate and manage every element of your project, ensuring it runs smoothly and on budget."
    }
  ];

  return (
    <section id="services" data-testid="services-section" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-gray-500 text-sm mb-4">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 max-w-2xl">
            From feasibility through to hand-over, we provide <span className="font-medium">end-to-end property solutions</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              data-testid={`service-card-${index}`}
              className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Trusted By Section - Client Logos
const TrustedBySection = () => {
  const clients = [
    { 
      name: "Starbucks", 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
    },
    { 
      name: "Subway", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/1200px-Subway_2016_logo.svg.png"
    },
    { 
      name: "EG Group", 
      logo: null
    },
    { 
      name: "H&M", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png"
    },
    { 
      name: "BBC", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/BBC_Logo_2021.svg/1200px-BBC_Logo_2021.svg.png"
    },
    { 
      name: "ASDA", 
      logo: null
    }
  ];
  
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-gray-400 text-sm mb-10">Trusted by leading brands</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {clients.map((client) => (
            <div key={client.name} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              {client.logo ? (
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-10 md:h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-gray-500 text-xl font-bold tracking-wide">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section - Clean Grid
const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" data-testid="projects-section" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-gray-500 text-sm mb-4">Recent Work</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Selected <span className="font-medium">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              data-testid={`project-card-${index}`}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <p className="text-gray-500 text-sm">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section - Simple Quote Style
const AboutSection = () => {
  return (
    <section id="about" data-testid="about-section" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm mb-8">About Us</p>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed mb-8">
              "Whether you are repositioning an asset, redefining a workspace, or refurbishing a commercial property, we help you engage the right team, manage cost and programme, and realise design that performs."
            </blockquote>
            <p className="text-gray-500 leading-relaxed mb-8">
              Armin Shopfitting has been delivering exceptional construction and refurbishment services since 2020. 
              With hands-on experience across design, project consultancy and delivery, we make complex projects simple.
            </p>
            
            <div className="flex flex-wrap justify-center gap-12 mt-12">
              <div className="text-center">
                <span className="text-4xl font-light text-gray-900">250+</span>
                <p className="text-gray-500 text-sm mt-1">Projects Delivered</p>
              </div>
              <div className="text-center">
                <span className="text-4xl font-light text-gray-900">5</span>
                <p className="text-gray-500 text-sm mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <span className="text-4xl font-light text-gray-900">98%</span>
                <p className="text-gray-500 text-sm mt-1">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Section - Simple Quote
const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API}/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" data-testid="testimonials-section" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <blockquote className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed mb-8 italic">
            "{testimonials[activeIndex]?.quote}"
          </blockquote>
          <p className="font-medium text-gray-900">{testimonials[activeIndex]?.name}</p>
          <p className="text-gray-500 text-sm">{testimonials[activeIndex]?.company}</p>
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              data-testid={`testimonial-dot-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-gray-900" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section - Clean Form
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm mb-4">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Drop us a <span className="font-medium">line</span>...
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10">
              Ready to start your project? Contact us today for a free consultation. 
              Our team is ready to bring your vision to life.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">+44 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">info@arminshopfitting.com</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <span className="text-gray-600">
                  Suite Am 288, 195-197 Wood Street<br />
                  Walthamstow, London, E17 3NU
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    data-testid="contact-name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-gray-400 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    data-testid="contact-email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-gray-400 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    data-testid="contact-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-gray-400 focus:outline-none transition-colors"
                    placeholder="+44 123 456 7890"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Service *</label>
                  <select
                    name="service"
                    data-testid="contact-service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-gray-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="Property Analysis">Property Analysis</option>
                    <option value="Refurbishing">Refurbishing</option>
                    <option value="Construction">Construction</option>
                    <option value="Shopfitting">Shopfitting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Message *</label>
                <textarea
                  name="message"
                  data-testid="contact-message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-gray-400 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                data-testid="contact-submit"
                disabled={isSubmitting}
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-6 text-base disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer - Simple & Clean
const Footer = () => {
  return (
    <footer data-testid="footer" className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img 
            src="https://customer-assets.emergentagent.com/job_construct-homes-1/artifacts/hbm9jntv_ArminshopfittinG.png" 
            alt="Armin Shopfitting Logo" 
            className="h-12 w-auto"
          />
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Armin Shopfitting. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page
const LandingPage = () => {
  return (
    <div data-testid="landing-page" className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
