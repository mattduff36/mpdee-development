'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  technologies: string[];
}

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleContactClick = () => {
    onClose();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
        onKeyDown={handleKeyDown}
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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="text-4xl" role="img" aria-label={service.title}>
                {service.icon}
              </div>
              <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
                {service.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Service Description */}
              <div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>

              {/* What We Do */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Do</h3>
                <ul className="space-y-2">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Ready to get started with {service.title.toLowerCase()}?
                  </p>
                  <button
                    onClick={handleContactClick}
                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                    </svg>
                    Discuss Your Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceModal; 