'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { track } from '@vercel/analytics';

interface Project {
  id: string;
  title: string;
  image: string;
  color: string;
}

interface HeroProps {
  onGetStarted?: () => void;
}

const projects: Project[] = [
  {
    id: 'lbp-website',
    title: 'Lee Barrowcliff Photography',
    image: '/images/hero-tiles/LBP-logo-328x328.png',
    color: '#1f2937',
  },
  {
    id: 'victoria-rose-salon',
    title: 'Victoria Rose Salon',
    image: '/images/hero-tiles/VRS-logo-328x328.png',
    color: '#ec4899',
  },
  {
    id: 'lwbarker-transport',
    title: 'L.W. Barker Transport Services',
    image: '/images/hero-tiles/LWB-logo-328x328.png',
    color: '#059669',
  },
  {
    id: 'bouncy-castle-hire',
    title: 'T&S Bouncy Castle Hire',
    image: '/images/hero-tiles/TNS-logo-328x328.png',
    color: '#f59e0b',
  },
  {
    id: 'paintings-by-kay',
    title: 'Paintings by Kay',
    image: '/images/hero-tiles/PBK-logo-328x328.png',
    color: '#7c3aed',
  },
];

// Hero tiles for background grid
const heroTiles = [
  '/images/hero-tiles/MPDEE-logo.png',
  '/images/hero-tiles/LBP-logo-328x328.png',
  '/images/hero-tiles/VRS-logo-328x328.png',
  '/images/hero-tiles/LWB-logo-328x328.png',
  '/images/hero-tiles/TNS-logo-328x328.png',
  '/images/hero-tiles/PBK-logo-328x328.png',
  '/images/hero-tiles/FTC-logo-328x328.png',
];

// Function to shuffle array randomly
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [shuffledTiles, setShuffledTiles] = useState<string[]>([]);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    // Shuffle tiles on component mount
    setShuffledTiles(shuffleArray(heroTiles));
  }, []);

  const handleGetStarted = () => {
    track('hero_cta_click', {
      source: 'hero',
      buttonText: 'Get Started',
    });

    if (onGetStarted) {
      onGetStarted();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleViewServices = () => {
    track('hero_services_click', {
      source: 'hero',
      buttonText: 'View Services',
    });

    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectClick = (projectId: string) => {
    track('hero_project_circle_click', {
      source: 'hero',
      project: projectId,
    });

    // Scroll to portfolio section
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });

      // Wait for scroll to complete, then trigger modal
      setTimeout(() => {
        // Dispatch custom event to open the correct project modal
        const event = new CustomEvent('openProjectModal', {
          detail: { projectId },
        });
        window.dispatchEvent(event);
      }, 1000); // Wait 1 second for scroll to complete
    }
  };

  return (
    <section
      id="home"
      className="relative h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden"
    >
      {/* Grid of Portfolio Previews */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 gap-4 p-8 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => {
          // Ensure we always have a tile by cycling through available tiles
          const tilesToUse =
            shuffledTiles.length > 0 ? shuffledTiles : heroTiles;
          const tileImage = tilesToUse[i % tilesToUse.length];

          return (
            <motion.div
              key={i}
              className="bg-white rounded-lg p-2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 0.8 }}
            >
              <Image
                src={tileImage}
                alt="Portfolio tile"
                width={78}
                height={78}
                className="object-contain"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-5xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-center leading-tight">
              MPDEE{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Development
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto"></div>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Professional Web Design & Development
          </motion.p>

          {/* Interactive Portfolio Navigation - Netflix Style Carousel */}
          <motion.div
            className="relative w-full max-w-2xl mx-auto mb-8 py-4 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
            }}
          >
            {/* Scrolling container */}
            <motion.div
              className="flex space-x-6 px-16 min-w-0"
              animate={{
                x: isCarouselPaused ? 0 : -((projects.length * (112 + 24)) * 2), // 112px width + 24px gap (space-x-6), move by 2 sets
              }}
              transition={{
                x: {
                  duration: 30, // Slower for smoother effect
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop',
                },
              }}
              onHoverStart={() => setIsCarouselPaused(true)}
              onHoverEnd={() => setIsCarouselPaused(false)}
              style={{
                touchAction: 'pan-y',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
              }}
            >
              {/* Create enough duplicates for seamless loop */}
              {[...projects, ...projects, ...projects, ...projects].map((project, index) => (
                <motion.div
                  key={`${project.id}-${index}`}
                  className="w-28 h-28 bg-white rounded-full p-3 cursor-pointer flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Static gap for project title */}
          <div className="h-16 mb-8 flex items-center justify-center">
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
                >
                  {projects.find(p => p.id === hoveredProject)?.title}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex gap-3 sm:gap-6 items-center justify-center"
          >
            <button
              onClick={handleViewServices}
              className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors"
            >
              <span className="hidden sm:inline">View Services</span>
              <span className="sm:hidden">Services</span>
            </button>
            <button
              onClick={handleGetStarted}
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors"
            >
              <span className="hidden sm:inline">Start Your Project</span>
              <span className="sm:hidden">Contact</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
