import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  ArrowRight, 
  Hammer, 
  Ruler, 
  HardHat, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  ChevronRight,
  Star,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white border-b border-slate-200 shadow-sm"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" data-testid="logo" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_construct-homes-1/artifacts/hbm9jntv_ArminshopfittinG.png" 
              alt="Armin Shopfitting Logo" 
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-${link.name.toLowerCase()}`}
                className="font-manrope text-sm font-medium uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact">
              <Button
                data-testid="nav-cta"
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-none font-manrope font-medium uppercase tracking-wider px-6"
              >
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-slate-200 py-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 px-4 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors uppercase tracking-wider text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 pt-4">
              <a href="#contact">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-none">
                  Get Quote
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

// Hero Section - Light Split Layout
const HeroSection = () => {
  return (
    <section
      data-testid="hero-section"
      className="min-h-screen flex items-center bg-slate-50 pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-slate-900 text-white font-barlow uppercase tracking-widest text-xs mb-6">
              Est. 2020
            </span>

            <h1 className="font-barlow font-bold text-5xl sm:text-6xl lg:text-7xl text-slate-900 uppercase tracking-tighter leading-none mb-6">
              Precision Shopfitting & Construction
            </h1>

            <p className="text-slate-600 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Transforming commercial spaces with architectural precision and industrial strength. 
              Property analysis, refurbishing, and construction services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects">
                <Button
                  data-testid="hero-cta-primary"
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-none px-8 py-6 text-base font-manrope font-medium uppercase tracking-wider group shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-all"
                >
                  View Projects
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#contact">
                <Button
                  data-testid="hero-cta-secondary"
                  variant="outline"
                  className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-none px-8 py-6 text-base font-manrope font-medium uppercase tracking-wider"
                >
                  Contact Us
                </Button>
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 md:gap-12 mt-12 pt-8 border-t border-slate-200">
              <div>
                <span className="font-barlow font-bold text-4xl text-slate-900">250+</span>
                <p className="text-slate-500 text-sm mt-1">Projects</p>
              </div>
              <div>
                <span className="font-barlow font-bold text-4xl text-slate-900">5</span>
                <p className="text-slate-500 text-sm mt-1">Years</p>
              </div>
              <div>
                <span className="font-barlow font-bold text-4xl text-slate-900">98%</span>
                <p className="text-slate-500 text-sm mt-1">Satisfaction</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <img
                src="https://images.unsplash.com/photo-1659353587228-5dbbebb5d98f?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="Construction Manager with Tablet"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6">
              <span className="font-barlow font-bold text-3xl block">5</span>
              <span className="text-sm uppercase tracking-wider">Years of Excellence</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: Ruler,
      title: "Property Analysis",
      description: "Comprehensive property assessments to identify potential, evaluate structural integrity, and plan optimal development strategies.",
      features: ["Structural Surveys", "Feasibility Studies", "Cost Estimation"]
    },
    {
      icon: Hammer,
      title: "Refurbishing",
      description: "Transform existing spaces with modern renovations, interior upgrades, and complete property makeovers.",
      features: ["Interior Design", "Modernisation", "Restoration"]
    },
    {
      icon: HardHat,
      title: "Construction",
      description: "Full-scale construction services from ground-up builds to complex commercial fit-outs and extensions.",
      features: ["Commercial Builds", "Shopfitting", "Extensions"]
    }
  ];

  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-barlow text-sm font-bold tracking-widest uppercase text-slate-500 mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-barlow font-bold text-4xl sm:text-5xl text-slate-900 uppercase tracking-tight mb-4"
          >
            What We Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg"
          >
            From initial analysis to final construction, we provide end-to-end property solutions.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              data-testid={`service-card-${index}`}
              className="bg-white border-2 border-slate-900 p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 bg-slate-900 flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-barlow font-bold text-2xl uppercase tracking-tight text-slate-900 mb-4">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-slate-700">
                    <ChevronRight className="w-4 h-4 text-orange-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-20 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <img
                src="https://images.unsplash.com/photo-1653164488636-7407bec89281?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="Architectural plans"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block font-barlow text-sm font-bold tracking-widest uppercase text-slate-500 mb-4">
              About Us
            </span>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-slate-900 uppercase tracking-tight mb-6">
              Building Trust, Delivering Excellence
            </h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Armin Shopfitting has been at the forefront of property development and construction 
              since 2020. We combine traditional craftsmanship with modern innovation to 
              deliver exceptional results.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our team of expert analysts, designers, and builders work together to transform 
              your vision into reality. From initial property analysis to final construction, 
              we manage every detail with precision and care.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-barlow font-bold text-lg text-slate-900">Quality First</span>
                  <p className="text-slate-500 text-sm">Premium materials & finishes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-barlow font-bold text-lg text-slate-900">On Time</span>
                  <p className="text-slate-500 text-sm">Project delivery guaranteed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-barlow font-bold text-lg text-slate-900">Expert Team</span>
                  <p className="text-slate-500 text-sm">Skilled professionals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-barlow font-bold text-lg text-slate-900">Full Service</span>
                  <p className="text-slate-500 text-sm">End-to-end solutions</p>
                </div>
              </div>
            </div>

            <a href="#contact">
              <Button
                data-testid="about-cta"
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-none px-8 py-6 font-manrope font-medium uppercase tracking-wider group shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              >
                Work With Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
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

  const projectImages = {
    "Girkin Offices": "https://images.unsplash.com/photo-1755474897404-006834b70103?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    "BBC Studios": "https://images.unsplash.com/photo-1718066236074-13f8cf7ae93e?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    "ASDA Petrol Station Shops": "https://images.unsplash.com/photo-1759153820384-12c9ddf8bd8d?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
  };

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block font-barlow text-sm font-bold tracking-widest uppercase text-slate-500 mb-4"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-barlow font-bold text-4xl sm:text-5xl text-slate-900 uppercase tracking-tight"
            >
              Our Projects
            </motion.h2>
          </div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-900 hover:text-orange-500 font-medium flex items-center gap-2 mt-6 md:mt-0 uppercase tracking-wider text-sm"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              data-testid={`project-card-${index}`}
              className={`group relative overflow-hidden border-2 border-slate-900 ${
                index === 0 ? "md:row-span-2 h-[400px] md:h-auto" : "h-[300px]"
              }`}
            >
              <img
                src={projectImages[project.title] || project.image_url}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs uppercase tracking-wider mb-3">
                  {project.year}
                </span>
                <h3 className="font-barlow font-bold text-2xl text-white uppercase mb-1">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm">{project.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
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

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="py-20 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-barlow text-sm font-bold tracking-widest uppercase text-slate-500 mb-4"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-barlow font-bold text-4xl sm:text-5xl text-slate-900 uppercase tracking-tight"
          >
            Client Stories
          </motion.h2>
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-slate-900 p-8 md:p-12 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
            >
              <div className="text-slate-900 text-6xl font-serif mb-6">"</div>
              <p className="text-slate-700 text-xl md:text-2xl leading-relaxed mb-8">
                {testimonials[activeIndex]?.quote}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonials[activeIndex]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="font-barlow font-bold text-xl text-slate-900 uppercase">
                    {testimonials[activeIndex]?.name}
                  </p>
                  <p className="text-slate-500">{testimonials[activeIndex]?.company}</p>
                </div>
              </div>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  data-testid={`testimonial-dot-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 transition-colors ${
                    index === activeIndex ? "bg-slate-900" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Contact Section
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
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block font-barlow text-sm font-bold tracking-widest uppercase text-slate-500 mb-4">
              Get In Touch
            </span>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-slate-900 uppercase tracking-tight mb-6">
              Let's Build Together
            </h2>
            <p className="text-slate-600 mb-10 leading-relaxed text-lg">
              Ready to start your project? Contact us today for a free consultation 
              and quote. Our team is ready to bring your vision to life.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-barlow font-bold text-lg text-slate-900">Phone</p>
                  <p className="text-slate-600">+44 (0) 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-barlow font-bold text-lg text-slate-900">Email</p>
                  <p className="text-slate-600">info@arminshopfitting.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-barlow font-bold text-lg text-slate-900">Address</p>
                  <p className="text-slate-600">Suite Am 288, 195-197 Wood Street<br />Walthamstow, London, E17 3NU</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white border-2 border-slate-900 p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    data-testid="contact-name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-slate-900 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors rounded-none"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-testid="contact-email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-slate-900 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors rounded-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    data-testid="contact-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-slate-900 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors rounded-none"
                    placeholder="+44 123 456 7890"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    data-testid="contact-service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-slate-900 px-4 py-3 text-slate-900 transition-colors rounded-none"
                  >
                    <option value="">Select a service</option>
                    <option value="Property Analysis">Property Analysis</option>
                    <option value="Refurbishing">Refurbishing</option>
                    <option value="Construction">Construction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  data-testid="contact-message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-slate-900 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors resize-none rounded-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                data-testid="contact-submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-none py-6 font-manrope font-medium text-base uppercase tracking-wider group disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="bg-white inline-block px-3 py-2 rounded-sm">
                <img 
                  src="https://customer-assets.emergentagent.com/job_construct-homes-1/artifacts/hbm9jntv_ArminshopfittinG.png" 
                  alt="Armin Shopfitting Logo" 
                  className="h-10 w-auto"
                />
              </div>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              Expert property analysis, refurbishing, and construction services. 
              Transforming spaces with precision and artistry since 2020.
            </p>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Armin Shopfitting. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-barlow font-bold text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Services", "About", "Projects", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-barlow font-bold text-white uppercase tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {["Property Analysis", "Refurbishing", "Construction", "Shopfitting", "Interior Design"].map((service) => (
                <li key={service}>
                  <span className="text-slate-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            Precision in Every Build. Excellence in Every Detail.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div data-testid="landing-page" className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
