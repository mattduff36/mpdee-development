'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    title: 'LBP Construction Website',
    shortDescription: 'Modern construction company website with project showcase and contact forms.',
    description: 'A comprehensive website for LBP Construction featuring project galleries, service descriptions, and client testimonials. Built with modern web technologies for optimal performance and user experience.',
    image: '/images/LBP-Logo.png',
    tags: ['Construction', 'Business'],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    outcomes: [
      'Increased online inquiries by 150%',
      'Improved mobile user experience',
      'Enhanced brand credibility',
      'Streamlined project showcase process'
    ],
    liveUrl: 'https://lbpconstruction.example.com'
  },
  {
    id: 'victoria-rose-salon',
    title: 'Victoria Rose Salon',
    shortDescription: 'Elegant salon website with online booking and service management.',
    description: 'A beautiful and functional website for Victoria Rose Salon featuring online appointment booking, service listings, and staff profiles. Designed to reflect the salon\'s premium brand and enhance customer experience.',
    image: '/images/victoria-rose-salon-logo.jpeg',
    tags: ['Beauty', 'E-commerce'],
    technologies: ['React', 'Next.js', 'Stripe', 'Sanity CMS', 'TailwindCSS'],
    outcomes: [
      'Reduced phone booking calls by 70%',
      'Increased appointment bookings by 200%',
      'Enhanced customer satisfaction',
      'Improved operational efficiency'
    ],
    liveUrl: 'https://victoriarosesalon.example.com'
  },
  {
    id: 'paintings-by-kay',
    title: 'Paintings by Kay',
    shortDescription: 'Artist portfolio website with gallery and commission request system.',
    description: 'An artistic portfolio website showcasing Kay\'s paintings with a beautiful gallery layout, commission request forms, and integrated payment processing for art sales.',
    image: '/images/paintings-by-kay-logo.png',
    tags: ['Art', 'Portfolio'],
    technologies: ['React', 'Next.js', 'PayPal', 'Cloudinary', 'Styled Components'],
    outcomes: [
      'Increased art sales by 300%',
      'Streamlined commission process',
      'Enhanced online presence',
      'Improved customer engagement'
    ],
    liveUrl: 'https://paintingsbykay.example.com'
  }
];

const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

const Portfolio = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedTag === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedTag));

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleProjectClick = (project: Project) => {
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
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our recent work and see how we've helped businesses grow their online presence
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => handleTagFilter('All')}
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              selectedTag === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-pressed={selectedTag === 'All'}
          >
            All Projects
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagFilter(tag)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-pressed={selectedTag === tag}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleProjectClick(project)}
                onKeyDown={(e) => handleKeyDown(e, project)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium">
                      View Project
                    </span>
                    <svg 
                      className="w-5 h-5 text-blue-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life with a custom web solution
          </p>
          <button
            onClick={handleContactClick}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
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
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 id="project-modal-title" className="text-3xl font-bold text-gray-900">
                    {selectedProject.title}
                  </h3>
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain"
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
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Outcomes:</h4>
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used:</h4>
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
                    className="px-6 py-3 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                    >
                      View Live Site
                    </a>
                  )}
                  <button
                    onClick={() => {
                      handleCloseModal();
                      handleContactClick();
                    }}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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