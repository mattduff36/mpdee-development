import {
  Company,
  SocialLink,
  Home,
  WorkPage,
  ServicesPage,
  ContactPage,
  ServicePackage,
  Project,
  ContactChannel,
} from '@/types';

const company: Company = {
  name: 'MPDEE Development',
  tagline: 'Professional Web Design & Development',
  logo: '/images/MPDEE-Development-logo-trans.png',
  logoAlt: 'MPDEE Development logo',
  email: 'sendme@mpdee.info',
  location: 'United Kingdom',
  domain: 'mpdee.co.uk',
  subdomain: 'development.mpdee.co.uk',
};

const social: SocialLink[] = [
  {
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/mpdee',
    essential: true,
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://linkedin.com/company/mpdee',
    essential: true,
  },
  {
    name: 'X',
    icon: 'x',
    link: 'https://x.com/mpdee',
    essential: false,
  },
  {
    name: 'Email',
    icon: 'email',
    link: `mailto:${company.email}`,
    essential: true,
  },
];

const home: Home = {
  path: '/',
  image: '/images/mpdee_logo_with_text.png',
  label: 'Home',
  title: `${company.name} - ${company.tagline}`,
  description:
    'Professional web design and development services. Custom websites, e-commerce solutions, and digital platforms that drive results.',
  headline: (
    <>
      Building digital experiences that{' '}
      <span className="brand-gradient-text">drive results</span>
    </>
  ),
  subline: (
    <>
      We create beautiful, functional websites and web applications tailored to
      your business needs - from simple landing pages to complex full-stack
      platforms.
    </>
  ),
};

const work: WorkPage = {
  path: '/work',
  label: 'Work',
  title: `Projects - ${company.name}`,
  description: `Explore our portfolio of web design and development projects at ${company.name}.`,
};

const services: ServicesPage = {
  path: '/services',
  label: 'Services',
  title: `Services - ${company.name}`,
  description: `Web development packages and services offered by ${company.name}. From simple websites to enterprise-grade solutions.`,
};

const contact: ContactPage = {
  path: '/contact',
  label: 'Contact',
  title: `Contact - ${company.name}`,
  description: `Get in touch with ${company.name} to discuss your web development project.`,
};

const servicePackages: ServicePackage[] = [
  {
    id: 'starter-website',
    title: 'Starter Package',
    description:
      'Perfect for businesses needing a simple online presence. A single-page site that acts as a holding page while your full website is under construction, or for displaying static business information.',
    price: 'From £100',
    details: [
      'Professional 1 or 2 page basic holding page',
      'Static information display (business moved, under construction)',
      'Fully responsive mobile-friendly design',
      'Basic contact information and details',
      'Free domain name (1 year)',
      'Free hosting (1 year)',
      '12 months hosting free, then £15/month billed annually',
      'No ongoing maintenance required',
    ],
    technologies: ['HTML/CSS', 'Responsive Design', 'Domain Setup', 'Hosting'],
  },
  {
    id: 'basic-website',
    title: 'Basic Package',
    description:
      'Comprehensive business solution with up to 5 pages including About Us, Contact with forms, Services/Products pages, and dynamic elements like Google integration.',
    price: 'From £350',
    details: [
      'Up to 5 professionally designed pages',
      'About Us, Contact, Services/Products pages',
      'Advanced contact forms with email integration',
      'Google services integration (Drive, Calendar)',
      'Dynamic elements and interactive features',
      'Search engine optimization (SEO) foundation',
      'Fully responsive mobile-friendly design',
      '3 months free support',
      '12 months hosting free, then £15/month billed annually',
    ],
    technologies: [
      'HTML/CSS',
      'JavaScript',
      'Google APIs',
      'Contact Forms',
      'SEO Basics',
    ],
  },
  {
    id: 'pro-website',
    title: 'Pro Package',
    description:
      'Everything in Basic plus up to 8 pages, client management system with customer login portals, admin dashboard, reports and analytics, social media integration, and extended 6 months support.',
    price: 'From £600',
    isPopular: true,
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
      '12 months hosting free, then £15/month billed annually',
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
    id: 'ultimate-website',
    title: 'Ultimate Package',
    description:
      'Top-tier solution with unlimited pages, everything from Pro, plus 12 months on-call support, continuous development, and business system integration.',
    price: 'From £900',
    details: [
      'Unlimited pages and advanced features',
      'Everything from Pro package included',
      '12 months free support',
      '12 months on-call assistance for any changes',
      'Continuous development and enhancement',
      'Performance monitoring and optimization',
      'Integration with existing business systems',
      'Booking system integration (where possible)',
      'Advanced analytics and business intelligence',
      'Priority technical support and maintenance',
      'Enterprise-grade security implementation',
      '12 months hosting free, then £20/month billed annually',
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
      'Next-generation web applications delivering native app performance and functionality through advanced web technologies. Currently in development.',
    price: '',
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
      'Strategic collaboration with GMC Media delivering integrated digital marketing and professional media services.',
    price: '',
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

const projects: Project[] = [
  {
    id: 'lbp-website',
    title: 'Lee Barrowcliff Photography',
    shortDescription:
      'Professional photography portfolio website with secure client authentication and admin portal.',
    description:
      'A comprehensive photography portfolio platform featuring secure client login functionality with private gallery access and a dedicated admin portal for content management. The site includes multi-category image galleries (Wedding, Portrait, Lifestyle, Landscape, Wildlife, Sport, Baby, Family, Pets), user authentication system, and administrative dashboard for managing client access and gallery content. Built with responsive design and optimized image delivery for professional photography showcase.',
    image: '/images/portfolio-images/Lee-Barrowcliff-Photography/lbp-1.png',
    images: [
      '/images/portfolio-images/Lee-Barrowcliff-Photography/lbp-1.png',
      '/images/portfolio-images/Lee-Barrowcliff-Photography/lbp-2.png',
      '/images/portfolio-images/Lee-Barrowcliff-Photography/lbp-3.png',
    ],
    tags: ['Photography', 'Portfolio'],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'Client Authentication',
    ],
    outcomes: [
      'Secure multi-user authentication system with role-based access',
      'Admin portal for content management and client administration',
      'Private gallery system with personalized client access',
      'Responsive image galleries with optimized loading performance',
    ],
    liveUrl: 'https://www.leebarrowcliffphotography.com/',
  },
  {
    id: 'victoria-rose-salon',
    title: 'Victoria Rose Salon',
    shortDescription:
      'Dynamic salon website with automated content management and integrated booking system.',
    description:
      "A sophisticated salon website featuring dynamic services management through Google Sheets integration, allowing real-time content updates without technical intervention. The platform includes automated team photo synchronization via Google Drive integration, dynamic job title updates, and seamless integration with the salon's existing booking system. Additionally, the site features a custom-built virtual assistant created from scratch to enhance customer interaction and service inquiries.",
    image: '/images/portfolio-images/Victoria-Rose-Salon/vr-1.png',
    images: [
      '/images/portfolio-images/Victoria-Rose-Salon/vr-1.png',
      '/images/portfolio-images/Victoria-Rose-Salon/vr-2.png',
      '/images/portfolio-images/Victoria-Rose-Salon/vr-3.png',
    ],
    tags: ['Beauty', 'Business'],
    technologies: [
      'React',
      'Next.js',
      'TailwindCSS',
      'Google Sheets API',
      'Google Drive API',
      'Booking Integration',
      'Custom Virtual Assistant',
    ],
    outcomes: [
      'Dynamic content management via Google Sheets integration',
      'Automated team photo updates through Google Drive sync',
      'Custom-built virtual assistant for enhanced customer interaction',
      'Direct booking system integration for seamless appointments',
      'Real-time service updates without technical maintenance',
    ],
    liveUrl: 'https://www.victoriaroselimited.co.uk/',
  },
  {
    id: 'lwbarker-transport',
    title: 'L.W. Barker Transport Services',
    shortDescription:
      'Professional transport services website with comprehensive service management and logistics tracking.',
    description:
      'A robust transport services platform featuring comprehensive logistics management capabilities and service area optimization. The website includes detailed service categorization with specialized handling for medical equipment, IT equipment, and automotive parts transport. Built with responsive design for mobile accessibility, integrated contact systems for quote requests, and optimized service area mapping covering extensive UK coverage.',
    image: '/images/portfolio-images/LW-Barker-Transport-Services/lwb-1.png',
    images: [
      '/images/portfolio-images/LW-Barker-Transport-Services/lwb-1.png',
      '/images/portfolio-images/LW-Barker-Transport-Services/lwb-2.png',
      '/images/portfolio-images/LW-Barker-Transport-Services/lwb-3.png',
    ],
    tags: ['Transport', 'Business'],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Logistics Management',
      'Service Optimization',
      'Mobile Responsive Design',
    ],
    outcomes: [
      'Comprehensive logistics management and service categorization',
      'Specialized transport handling for medical and IT equipment',
      'Optimized service area mapping and coverage display',
      'Mobile-accessible quote request and contact systems',
    ],
    liveUrl: 'https://www.lwbarkertransport.com/',
  },
  {
    id: 'bouncy-castle-hire',
    title: 'T&S Bouncy Castle Hire',
    shortDescription:
      'Complete booking management platform with integrated payment processing and digital contracts.',
    description:
      'A comprehensive business management platform featuring a fully bespoke booking system designed to handle all operational requirements. The system includes integrated payment processing, electronically signed hire agreements, calendar synchronization for availability management, and comprehensive reporting for bookings and financial accounts.',
    image: '/images/portfolio-images/TS-Bouncy-Castle-Hire/tns-1.png',
    images: [
      '/images/portfolio-images/TS-Bouncy-Castle-Hire/tns-1.png',
      '/images/portfolio-images/TS-Bouncy-Castle-Hire/tns-2.png',
      '/images/portfolio-images/TS-Bouncy-Castle-Hire/tns-3.png',
      '/images/portfolio-images/TS-Bouncy-Castle-Hire/tns-4.png',
    ],
    tags: ['Entertainment', 'Business'],
    technologies: [
      'React',
      'Next.js',
      'TailwindCSS',
      'Payment Processing',
      'Digital Signatures',
      'Calendar Integration',
      'Reporting Dashboard',
    ],
    outcomes: [
      'Full bespoke booking system with automated workflows',
      'Integrated payment processing and digital contract signing',
      'Real-time calendar synchronization and availability management',
      'Comprehensive reporting system for bookings and financial tracking',
    ],
    liveUrl: 'https://www.bouncy-castle-hire.com/',
  },
  {
    id: 'paintings-by-kay',
    title: 'Paintings by Kay',
    shortDescription:
      'E-commerce art platform with integrated order management and commission system.',
    description:
      'A comprehensive e-commerce platform for original artwork featuring a complete online shop with integrated order management system. The platform includes secure payment processing, inventory management, automated order fulfillment workflows, and customer account management. Built with commission request functionality, digital gallery showcasing, and administrative dashboard for order tracking and sales reporting.',
    image: '/images/portfolio-images/Paintings-by-Kay/pbk-1.png',
    images: [
      '/images/portfolio-images/Paintings-by-Kay/pbk-1.png',
      '/images/portfolio-images/Paintings-by-Kay/pbk-2.png',
      '/images/portfolio-images/Paintings-by-Kay/pbk-3.png',
    ],
    tags: ['Art', 'Portfolio'],
    technologies: [
      'React',
      'Next.js',
      'TailwindCSS',
      'Gallery System',
      'E-commerce',
      'Contact Forms',
    ],
    outcomes: [
      'Beautiful showcase of nature-inspired artwork',
      'Professional gallery presentation and organization',
      'Commission request system for custom pieces',
      'Online shop integration with free UK delivery',
    ],
    liveUrl: 'https://www.paintingsbykay.co.uk/',
  },
  {
    id: 'voiceover-studio-finder',
    title: 'Voiceover Studio Finder',
    shortDescription:
      'Global directory platform connecting voice artists and producers with professional recording studios worldwide.',
    description:
      'A comprehensive directory platform built for the voiceover industry, connecting voice artists, podcasters, broadcasters, and producers with professional recording studios across 14+ countries. The platform features advanced search and filtering by location, studio type, and technical capabilities (ISDN, Source Connect, Cleanfeed), verified listings with real photos and equipment details, and studio owner self-management tools. Studios maintain full control over their profiles with no commission or booking agent involvement, receiving inquiries directly.',
    image: '/images/portfolio-images/Voiceover-Studio-Finder/vsf-1.png',
    images: [
      '/images/portfolio-images/Voiceover-Studio-Finder/vsf-1.png',
      '/images/portfolio-images/Voiceover-Studio-Finder/vsf-2.png',
      '/images/portfolio-images/Voiceover-Studio-Finder/vsf-3.png',
    ],
    tags: ['Directory', 'Platform'],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Database Integration',
      'Search & Filtering',
      'User Authentication',
      'Geolocation',
    ],
    outcomes: [
      'Global studio directory covering 14+ countries',
      'Advanced search with filtering by technology, location, and studio type',
      'Verified listings with detailed equipment and facility information',
      'Studio owner self-service portal with full profile control',
      'Cookie consent and GDPR-compliant privacy implementation',
    ],
    liveUrl: 'https://voiceoverstudiofinder.com/',
  },
];

const contactChannels: ContactChannel[] = [
  {
    icon: 'email',
    title: 'Email',
    detail: 'sendme@mpdee.info',
  },
  {
    icon: 'clock',
    title: 'Response Time',
    detail: 'Usually within 24 hours',
  },
  {
    icon: 'chat',
    title: 'Free Consultation',
    detail: 'No obligation project discussion',
  },
];

export {
  company,
  social,
  home,
  work,
  services,
  contact,
  servicePackages,
  projects,
  contactChannels,
};
