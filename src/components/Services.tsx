'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  technologies: string[];
}

const services: Service[] = [
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually appealing user interfaces that enhance user experience and drive engagement.',
    icon: '🎨',
    details: [
      'User research and persona development',
      'Wireframing and prototyping',
      'Visual design and branding',
      'Usability testing and optimization',
      'Design system creation'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle']
  },
  {
    id: 'frontend-dev',
    title: 'Front-end Development',
    description: 'Building responsive, interactive web applications with modern technologies and best practices.',
    icon: '💻',
    details: [
      'Responsive web development',
      'Interactive animations and transitions',
      'Performance optimization',
      'Cross-browser compatibility',
      'Accessibility implementation'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion']
  },
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Development',
    description: 'End-to-end web application development from database design to deployment and maintenance.',
    icon: '🚀',
    details: [
      'Database design and optimization',
      'API development and integration',
      'Authentication and security',
      'Cloud deployment and scaling',
      'Ongoing maintenance and support'
    ],
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Vercel']
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenModal = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent, service: Service) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenModal(service);
    }
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

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver comprehensive web solutions tailored to your business needs, 
            from initial concept to final deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4" role="img" aria-label={service.title}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => handleOpenModal(service)}
                  onKeyDown={(e) => handleKeyDown(e, service)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                  <svg 
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
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
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
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
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-4xl mr-4" role="img" aria-label={selectedService.title}>
                      {selectedService.icon}
                    </span>
                    <h3 id="modal-title" className="text-3xl font-bold text-gray-900">
                      {selectedService.title}
                    </h3>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div id="modal-description" className="mb-8">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {selectedService.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">What We Deliver:</h4>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Technologies We Use:</h4>
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
                    className="px-6 py-3 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleCloseModal();
                      handleContactClick();
                    }}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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