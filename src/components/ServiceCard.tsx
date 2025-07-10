'use client';

import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  technologies: string[];
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onLearnMore: (service: Service) => void;
}

const ServiceCard = ({ service, index, onLearnMore }: ServiceCardProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onLearnMore(service);
    }
  };

  return (
    <motion.div
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
        <p className="text-gray-600 leading-relaxed">{service.description}</p>
      </div>

      <div className="text-center">
        <button
          onClick={() => onLearnMore(service)}
          onKeyDown={handleKeyDown}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
