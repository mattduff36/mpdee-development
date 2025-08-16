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
      'Professional photography portfolio website with gallery showcase and client login system.',
    description:
      "A stunning photography portfolio website for Lee Barrowcliff Photography featuring beautiful image galleries across multiple categories (Wedding, Portrait, Lifestyle, Landscape, Wildlife, Sport, Baby, Family, Pets), client login section for private galleries, and professional presentation. Designed to showcase the photographer's diverse work across the East Midlands.",
    image: '/images/LBP-Logo.png',
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
      'Professional portfolio showcasing 9 photography categories',
      'Secure client login system for private galleries',
      'Enhanced online presence across East Midlands',
      'Streamlined client experience and engagement',
    ],
    liveUrl: 'https://www.leebarrowcliffphotography.com/',
  },
  {
    id: 'victoria-rose-salon',
    title: 'Victoria Rose Salon',
    shortDescription:
      'Professional hair and beauty salon website with comprehensive service showcase.',
    description:
      "A beautiful and functional website for Victoria Rose Salon in Mansfield Woodhouse, Nottinghamshire, featuring comprehensive hair and beauty services, detailed service pages, customer reviews, and professional presentation. Operating since 2012, the salon offers expert hair cutting, styling, colouring, beauty treatments, manicures, pedicures, and advanced aesthetic services.",
    image: '/images/victoria-rose-salon-logo.jpeg',
    tags: ['Beauty', 'Business'],
    technologies: ['React', 'Next.js', 'TailwindCSS', 'Contact Forms', 'SEO'],
    outcomes: [
      'Professional online presence for established salon',
      'Comprehensive service showcase and information',
      'Enhanced customer engagement and accessibility',
      'Improved local business visibility in Nottinghamshire',
    ],
    liveUrl: 'https://www.victoriaroselimited.co.uk/',
  },
  {
    id: 'lwbarker-transport',
    title: 'L.W. Barker Transport Services',
    shortDescription:
      'Professional transport company website with comprehensive fleet showcase and service coverage.',
    description:
      "A comprehensive website for L.W. Barker Transport Services LTD, a family-run business with 21 years of experience providing complete transport solutions across the UK. Features detailed fleet information (3.5t vans to 44t articulated lorries), service coverage from local to long-distance transport, specialized load handling, and 24/7 emergency transport availability.",
    image: '/images/lwbarker-logo.png',
    tags: ['Transport', 'Business'],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'PWA',
    ],
    outcomes: [
      'Professional showcase of comprehensive transport services',
      'Detailed fleet presentation from 3.5t to 44t vehicles',
      'UK-wide service coverage with local Newark base',
      '24/7 availability and emergency transport solutions',
    ],
    liveUrl: 'https://www.lwbarkertransport.com/',
  },
  {
    id: 'bouncy-castle-hire',
    title: 'T&S Bouncy Castle Hire',
    shortDescription:
      'Family-run bouncy castle hire business serving Nottinghamshire with safe, professional party equipment.',
    description:
      "A vibrant and engaging website for T&S Bouncy Castle Hire, a family-run business based in Edwinstowe serving Nottinghamshire since 2024. Features comprehensive bouncy castle showcase, service area coverage (Edwinstowe, Mansfield, Newark, Worksop, Ollerton, Nottingham, Bilsthorpe), safety information, and professional party equipment rental services with full insurance and PIPA testing.",
    image: '/images/ts-bouncy-castle-logo.png',
    tags: ['Entertainment', 'Business'],
    technologies: [
      'React',
      'Next.js',
      'TailwindCSS',
      'Contact Forms',
      'Local SEO',
    ],
    outcomes: [
      'Professional online presence for new family business',
      'Comprehensive service area coverage across Nottinghamshire',
      'Safety-focused presentation with insurance details',
      'Enhanced local community engagement and bookings',
    ],
    liveUrl: 'https://www.bouncy-castle-hire.com/',
  },
  {
    id: 'paintings-by-kay',
    title: 'Paintings by Kay',
    shortDescription:
      'Nature-inspired art portfolio with gallery showcase and commission services.',
    description:
      "An artistic portfolio website showcasing Kay's nature-inspired paintings from Mansfield, Nottinghamshire. Features a beautiful gallery of original acrylic and oil paintings including woodland scenes, dramatic skies, tranquil waters, and coastal landscapes. Includes commission services for custom landscape and scenery pieces, online shop with free UK delivery, and contact system for inquiries.",
    image: '/images/paintings-by-kay-logo.png',
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
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
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
                <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={project.image}
                    alt={`${project.title} logo and branding`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                    loading="lazy"
                  />
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
                  <div>
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6 relative">
                      <Image
                        src={selectedProject.image}
                        alt={`${selectedProject.title} logo and branding`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                        priority
                      />
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
