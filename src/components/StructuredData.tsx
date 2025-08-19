import { generateStructuredData } from '@/shared/seo-utils';

export default function StructuredData() {
  const structuredData = {
    ...generateStructuredData('service', {
      name: 'MPDEE Development',
      description:
        'Professional web design and development services. Custom websites, e-commerce solutions, and digital platforms that drive results.',
      serviceType: 'Web Development Services',
      url: 'https://development.mpdee.co.uk',
    }),
    // Add specific service offerings
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Web Development',
            description:
              'Bespoke web applications and websites built with modern technologies.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Solutions',
            description:
              'Complete e-commerce platforms with payment processing and inventory management.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Design',
            description:
              'User-centered design for optimal user experience and conversion.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Platforms',
            description:
              'Scalable digital platforms and web applications for businesses.',
          },
        },
      ],
    },
    // Add professional credentials
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          serviceType: 'Professional Web Development',
          areaServed: 'United Kingdom',
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: 'https://development.mpdee.co.uk',
            serviceSmsNumber: '+44',
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
