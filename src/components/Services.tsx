'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/types';
import ServiceCard from './ServiceCard';
import {
  BronzeIcon,
  SilverIcon,
  GoldIcon,
  PlatinumIcon,
  PWAIcon,
  MediaPartnershipIcon,
} from '@/components/icons';

const services: Service[] = [
  {
    id: 'bronze-website',
    title: 'Bronze Website Package',
    description:
      'Perfect for businesses needing a simple online presence. A single-page site that acts as a holding page while your full website is under construction, or for displaying static business information. Once complete, no further alterations needed.',
    icon: <BronzeIcon />, // Use SVG component
    price: 'From £100',
    details: [
      'Professional 1 or 2 page basic holding page',
      'Static information display (business moved, under construction)',
      'Fully responsive mobile-friendly design',
      'Basic contact information and details',
      'Free domain name (1 year)',
      'Free hosting (1 year)',
      '12 months hosting free, then £10/month billed annually',
      'No ongoing maintenance required',
    ],
    technologies: ['HTML/CSS', 'Responsive Design', 'Domain Setup', 'Hosting'],
  },
  {
    id: 'silver-website',
    title: 'Silver Website Package',
    description:
      'Comprehensive business solution with up to 5 pages including About Us, Contact with forms, Services/Products pages, and dynamic elements like Google integration (Drive, Calendar). Includes 3 months support for any changes.',
    icon: <SilverIcon />, // Use SVG component
    price: 'From £300',
    details: [
      'Up to 5 professionally designed pages',
      'About Us, Contact, Services/Products pages',
      'Advanced contact forms with email integration',
      'Google services integration (Drive, Calendar)',
      'Dynamic elements and interactive features',
      'Search engine optimization (SEO) foundation',
      'Fully responsive mobile-friendly design',
      '3 months free support',
      '12 months hosting free, then £10/month billed annually',
    ],
    technologies: ['HTML/CSS', 'JavaScript', 'Google APIs', 'Contact Forms', 'SEO Basics'],
  },
  {
    id: 'gold-website',
    title: 'Gold Website Package',
    description:
      'Everything in Silver plus up to 8 pages, client management system with customer login portals, admin dashboard for managing customer accounts, reports and analytics, social media integration, and extended 6 months support.',
    icon: <GoldIcon />, // Use SVG component
    isPopular: true,
    price: 'From £600',
    details: [
      'Up to 8 professionally designed pages',
      'Client management system with secure login',
      'Customer portal for downloads and services',
      'Admin dashboard for customer management',
      'Reports and analytics system',
      'Social media platform integration',
      'Advanced content management system (CMS)',
      'Sophisticated contact and inquiry systems',
      '6 months free support',
      '12 months hosting free, then £10/month billed annually',
    ],
    technologies: [
      'React',
      'Next.js',
      'User Authentication',
      'Database Integration',
      'Analytics',
    ],
  },
  {
    id: 'platinum-website',
    title: 'Platinum Website Package',
    description:
      'Ultimate solution with unlimited pages, everything from Gold package, plus 12 months on-call assistance, continuous development and enhancement, performance monitoring, and integration with existing business systems (booking systems, etc.).',
    icon: <PlatinumIcon />, // Use SVG component
    price: 'From £900',
    details: [
      'Unlimited pages and advanced features',
      'Everything from Gold package included',
      '12 months free support',
      '12 months on-call assistance for any changes',
      'Continuous development and enhancement',
      'Performance monitoring and optimization',
      'Integration with existing business systems',
      'Booking system integration (where possible)',
      'Advanced analytics and business intelligence',
      'Priority technical support and maintenance',
      'Enterprise-grade security implementation',
      '12 months hosting free, then £10/month billed annually',
    ],
    technologies: [
      'Full-Stack Development',
      'System Integration',
      'Advanced Analytics',
      'Performance Monitoring',
      'Enterprise Solutions',
    ],
  },
  {
    id: 'pwa-webapps',
    title: 'Progressive Web Applications',
    description:
      'Next-generation web applications delivering native app performance and functionality through advanced web technologies. Currently in development with innovative features being finalized.',
    icon: <PWAIcon />,
    isComingSoon: true,
    details: [
      'Native application experience within web browsers',
      'Offline functionality with high-performance loading',
      'Push notifications and advanced app-like features',
      'Cross-platform compatibility and deployment',
      'Direct installation without app store requirements',
      'Automatic updates and seamless maintenance',
      'Enhanced user engagement and retention',
      'Mobile-first responsive architecture',
    ],
    technologies: ['PWA', 'Service Workers', 'React Native', 'Advanced APIs'],
  },
  {
    id: 'gmc-media-partnership',
    title: 'Media & Marketing Partnership',
    description:
      'Strategic collaboration with GMC Media delivering integrated digital marketing and professional media services. Comprehensive solutions combining web development expertise with specialized media production capabilities.',
    icon: <MediaPartnershipIcon />,
    isPartnership: true,
    details: [
      'Professional video production and post-production services',
      'Comprehensive digital marketing and social media strategies',
      'Professional brand photography and visual content creation',
      'Strategic marketing consultation and campaign development',
      'Advanced content creation and management systems',
      'Targeted social media advertising and optimization',
      'Professional-grade media equipment and technical expertise',
      'Fully integrated web development and media solutions',
    ],
    technologies: [
      'Video Production',
      'Digital Marketing',
      'Social Media',
      'Content Creation',
      'Brand Photography',
    ],
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenModal = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleModalKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  const handleContactClick = () => {
    // Scroll to contact form when implemented
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get price tag styling based on service tier
  const getPriceTagStyle = (service: Service) => {
    if (service.id === 'bronze-website') {
      return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-500';
    }
    if (service.id === 'silver-website') {
      return 'bg-gradient-to-r from-slate-400 to-slate-500 text-white border-slate-400';
    }
    if (service.id === 'gold-website') {
      return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-yellow-400';
    }
    if (service.id === 'platinum-website') {
      return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black border-gray-300';
    }
    return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500';
  };

  return (
    <section id="services" className="py-20 bg-background-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-light mb-4">
            Our Services
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            We deliver comprehensive web solutions tailored to your business
            needs, from initial concept to final deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onLearnMore={handleOpenModal}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={handleContactClick}
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold text-lg rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Discuss your project with us"
          >
            Discuss Your Project
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
            onKeyDown={handleModalKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Price Corner Sash */}
              {selectedService.price && (
                <div className="absolute top-0 left-0 z-10">
                  {/* Corner fold - back of ribbon */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '110px',
                      height: '110px',
                      top: '0px',
                      left: '0px',
                      background: 'linear-gradient(225deg, #ffffff 0%, #f8f9fa 20%, #e9ecef 40%, #dee2e6 70%, #ced4da 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                      boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.25), inset 2px 2px 4px rgba(255,255,255,0.8)',
                      border: '1px solid rgba(0,0,0,0.2)'
                    }}
                  />
                  
                  {/* Corner fold crease line */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '155px',
                      height: '2px',
                      top: '78px',
                      left: '0px',
                      transform: 'rotate(-45deg)',
                      transformOrigin: 'left center',
                      background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)'
                    }}
                  />
                  
                  {/* Ribbon shadow (underneath) */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '200px',
                      height: '55px',
                      top: '17px',
                      left: '-55px',
                      transform: 'rotate(-45deg)',
                      transformOrigin: 'center',
                      background: 'rgba(0,0,0,0.1)',
                      filter: 'blur(3px)',
                      borderRadius: '4px'
                    }}
                  />
                  
                  {/* Main ribbon */}
                  <div
                    className={`${getPriceTagStyle(selectedService)}`}
                    style={{
                      position: 'absolute',
                      width: '200px',
                      height: '55px',
                      top: '15px',
                      left: '-55px',
                      transform: 'rotate(-45deg)',
                      transformOrigin: 'center',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                      border: '2px solid rgba(0,0,0,0.2)',
                      borderRadius: '4px',
                      background: `linear-gradient(180deg, ${
                        selectedService.id === 'gold-website' ? '#ffd700' : 
                        selectedService.id === 'silver-website' ? '#e2e8f0' :
                        selectedService.id === 'platinum-website' ? '#e5e7eb' :
                        '#f59e0b'
                      } 0%, ${
                        selectedService.id === 'gold-website' ? '#ffed4e' : 
                        selectedService.id === 'silver-website' ? '#cbd5e1' :
                        selectedService.id === 'platinum-website' ? '#d1d5db' :
                        '#f59e0b'
                      } 40%, ${
                        selectedService.id === 'gold-website' ? '#eab308' : 
                        selectedService.id === 'silver-website' ? '#94a3b8' :
                        selectedService.id === 'platinum-website' ? '#9ca3af' :
                        '#d97706'
                      } 100%)`
                    }}
                  />
                  
                  {/* Ribbon highlight */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '200px',
                      height: '10px',
                      top: '13px',
                      left: '-55px',
                      transform: 'rotate(-45deg)',
                      transformOrigin: 'center',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)',
                      borderRadius: '4px 4px 0 0'
                    }}
                  />
                  

                  
                  {/* Text on ribbon */}
                  <div 
                    className="absolute text-black font-bold"
                    style={{ 
                      top: '22px',
                      left: '15px',
                      transform: 'rotate(-45deg)',
                      transformOrigin: 'center',
                      textShadow: '0 2px 4px rgba(255,255,255,0.9)',
                      zIndex: 10
                    }}
                  >
                    {selectedService.price.includes('From') ? (
                      <div className="text-center leading-tight whitespace-nowrap">
                        <div className="text-[10px] opacity-70 font-medium">From</div>
                        <div className="text-2xl font-bold">
                          {selectedService.price.replace('From ', '')}
                        </div>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold whitespace-nowrap">
                        {selectedService.price}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1 flex flex-col items-center">
                    <span
                      className="text-4xl mb-2"
                      role="img"
                      aria-label={selectedService.title}
                    >
                      {selectedService.icon}
                    </span>
                    <h3
                      id="modal-title"
                      className="text-xl lg:text-2xl font-bold text-gray-900 text-center"
                    >
                      {selectedService.title}
                    </h3>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div id="modal-description" className="mb-8">
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
                    {selectedService.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
                      What We Deliver:
                    </h4>
                    <ul className="space-y-2">
                      {selectedService.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
                      Technologies We Use:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-3 text-gray-600 font-semibold text-sm rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleCloseModal();
                      handleContactClick();
                    }}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
