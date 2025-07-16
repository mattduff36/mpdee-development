'use client';

import { motion } from 'framer-motion';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  index: number;
  onLearnMore: (service: Service) => void;
}

const ServiceCard = ({ service, index, onLearnMore }: ServiceCardProps) => {
  // Determine if this is a website package and get gradient class
  const getGradientClass = () => {
    if (service.id === 'bronze-website') return 'package-gradient-bronze';
    if (service.id === 'silver-website') return 'package-gradient-silver';
    if (service.id === 'gold-website') return 'package-gradient-gold';
    if (service.id === 'platinum-website') return 'package-gradient-platinum';
    return '';
  };

  const isWebsitePackage = service.id.includes('-website');
  const gradientClass = getGradientClass();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onLearnMore(service);
    }
  };

  const handleClick = () => {
    onLearnMore(service);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      onClick={service.isComingSoon ? undefined : handleClick}
      onKeyDown={service.isComingSoon ? undefined : handleKeyDown}
      tabIndex={service.isComingSoon ? undefined : 0}
      className={`bg-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border ${
        service.isPopular
          ? 'border-primary shadow-primary/20'
          : service.isComingSoon
            ? 'border-yellow-500 shadow-yellow-500/20'
            : service.isPartnership
              ? 'border-purple-500 shadow-purple-500/20'
              : 'border-gray-700'
      } relative ${service.isComingSoon ? 'opacity-75' : ''} ${
        service.isComingSoon ? '' : 'cursor-pointer'
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isWebsitePackage ? gradientClass : ''
      } h-full flex flex-col`}
      role={service.isComingSoon ? undefined : 'button'}
      aria-label={
        service.isComingSoon ? undefined : `Learn more about ${service.title}`
      }
    >
      {service.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      {service.isComingSoon && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Coming Soon
          </span>
        </div>
      )}
      {service.isPartnership && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Partnership
          </span>
        </div>
      )}
      <div className="flex items-start gap-4 flex-1">
        <div
          className="text-4xl flex-shrink-0 mt-1"
          role="img"
          aria-label={service.title}
        >
          {service.icon}
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-xl font-bold text-text-light mb-2">
            {service.title}
          </h3>
          <p className="text-text-muted leading-relaxed text-sm flex-1">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
