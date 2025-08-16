'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@vercel/analytics';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  tags: string[];
  technologies: string[];
  outcomes: string[];
  liveUrl?: string;
  githubUrl?: string;
}

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
      "A sophisticated salon website featuring dynamic services management through Google Sheets integration, allowing real-time content updates without technical intervention. The platform includes automated team photo synchronization via Google Drive integration, dynamic job title updates, and seamless integration with the salon's existing booking system. Additionally, the site features a custom-built virtual assistant created from scratch to enhance customer interaction and service inquiries. Each service page is directly linked to their booking platform, enabling streamlined customer journey from service discovery to appointment booking.",
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
      'A robust transport services platform featuring comprehensive logistics management capabilities and service area optimization. The website includes detailed service categorization with specialized handling for medical equipment, IT equipment, and automotive parts transport. Built with responsive design for mobile accessibility, integrated contact systems for quote requests, and optimized service area mapping covering extensive UK coverage from local to long-distance transport solutions.',
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
      'A comprehensive business management platform featuring a fully bespoke booking system designed to handle all operational requirements. The system includes integrated payment processing, electronically signed hire agreements, calendar synchronization for availability management, and comprehensive reporting for bookings and financial accounts. Built with automated workflow management to streamline the entire hire process from initial inquiry to equipment return.',
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
      'A comprehensive e-commerce platform for original artwork featuring a complete online shop with integrated order management system. The platform includes secure payment processing, inventory management, automated order fulfillment workflows, and customer account management. Built with commission request functionality, digital gallery showcasing, and administrative dashboard for order tracking, customer management, and sales reporting.',
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
];

const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

const Portfolio = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const filteredProjects =
    selectedTag === 'All'
      ? projects
      : projects.filter(project => project.tags.includes(selectedTag));

  const handleTagFilter = (tag: string) => {
    track('portfolio_filter', {
      filterTag: tag,
      previousFilter: selectedTag,
    });
    setSelectedTag(tag);
  };

  const handleProjectClick = (project: Project) => {
    track('project_view', {
      projectId: project.id,
      projectTitle: project.title,
      projectTags: project.tags.join(', '),
      currentFilter: selectedTag,
    });
    setSelectedProject(project);
    setSelectedImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setSelectedImageIndex(prev =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setSelectedImageIndex(prev =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, project: Project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleProjectClick(project);
    }
  };

  const handleModalKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  const handleContactClick = () => {
    track('contact_cta_click', {
      source: 'portfolio',
      section: 'cta',
    });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-background-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-light mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Explore our recent work and see how we&apos;ve helped businesses
            grow their online presence
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button
            onClick={() => handleTagFilter('All')}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              selectedTag === 'All'
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-text-light hover:bg-gray-600'
            }`}
            aria-pressed={selectedTag === 'All'}
          >
            All Projects
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagFilter(tag)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                selectedTag === tag
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-text-light hover:bg-gray-600'
              }`}
              aria-pressed={selectedTag === tag}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-800/80 rounded-lg shadow-lg overflow-hidden cursor-pointer border-2 border-gray-700 group hover:border-blue-500/70 transition-colors duration-300 ease-out"
                onClick={() => handleProjectClick(project)}
                onKeyDown={e => handleKeyDown(e, project)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
              >
                <div className="aspect-video bg-gray-200 overflow-hidden relative group">
                  <Image
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-800 font-medium text-sm">
                      View Project
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-text-light mb-2">
                    {project.title}
                  </h3>
                  <p className="text-text-muted mb-3 line-clamp-2 text-sm">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-text-light mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-text-muted mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help bring your vision to life with a
            custom web solution
          </p>
          <button
            onClick={handleContactClick}
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold text-lg rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Get in touch with us"
          >
            Get in Touch
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
            onKeyDown={handleModalKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-description"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    id="project-modal-title"
                    className="text-3xl font-bold text-gray-900"
                  >
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2"
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Mobile: Single image with navigation */}
                  <div className="lg:hidden">
                    {/* Main Image Display */}
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4 relative group">
                      <Image
                        src={selectedProject.images[selectedImageIndex]}
                        alt={`${selectedProject.title} screenshot ${selectedImageIndex + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority
                      />

                      {/* Navigation Arrows */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Previous image"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Next image"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      {selectedProject.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          {selectedImageIndex + 1} /{' '}
                          {selectedProject.images.length}
                        </div>
                      )}
                    </div>

                    {/* Image Thumbnails */}
                    {selectedProject.images.length > 1 && (
                      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        {selectedProject.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => handleImageSelect(index)}
                            className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              index === selectedImageIndex
                                ? 'border-blue-500 opacity-100'
                                : 'border-gray-300 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${selectedProject.title} thumbnail ${index + 1}`}
                              width={80}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Desktop: All images stacked vertically */}
                  <div className="hidden lg:block">
                    <div className="space-y-4 mb-6">
                      {selectedProject.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative group"
                        >
                          <Image
                            src={image}
                            alt={`${selectedProject.title} screenshot ${index + 1}`}
                            fill
                            sizes="50vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            priority={index === 0}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div id="project-modal-description">
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
                        Key Outcomes:
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.outcomes.map((outcome, index) => (
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
                              {outcome}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-600 text-white font-semibold text-sm rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                    >
                      View Live Site
                    </a>
                  )}
                  <button
                    onClick={() => {
                      handleCloseModal();
                      handleContactClick();
                    }}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Start Your Project
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

export default Portfolio;
