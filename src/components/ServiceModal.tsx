'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/types';

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

  // Get price tag styling based on service tier
  const getPriceTagStyle = () => {
    if (!service) {
      return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500';
    }
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

  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
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
          className="bg-white rounded-lg max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div
                className="text-2xl sm:text-3xl lg:text-4xl"
                role="img"
                aria-label={service.title}
              >
                {service.icon}
              </div>
              <div>
                <h2
                  id="modal-title"
                  className="text-base sm:text-lg lg:text-xl font-bold text-gray-900"
                >
                  {service.title}
                </h2>
                {service.price && (
                  <div
                    className={`inline-flex items-center px-4 py-2 mt-3 ${getPriceTagStyle()} text-xs sm:text-sm font-bold rounded-lg shadow-lg border-2 transform -skew-x-12`}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="transform skew-x-12">{service.price}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Service Description */}
              <div>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                  {service.description}
                </p>
              </div>

              {/* What We Do */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                  What We Do
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600 text-xs sm:text-sm">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                  Technologies & Tools
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                    Ready to get started with {service.title.toLowerCase()}?
                  </p>
                  <button
                    onClick={handleContactClick}
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                      />
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
