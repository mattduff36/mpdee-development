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
    id: 'lbp',
    title: 'Lee Barrowcliff Photography',
    image: '/images/hero-tiles/LBP-logo-328x328.png',
    color: '#1f2937',
  },
  {
    id: 'victoria',
    title: 'Victoria Rose Salon',
    image: '/images/hero-tiles/VRS-logo-328x328.png',
    color: '#ec4899',
  },
  {
    id: 'lwbarker',
    title: 'L.W. Barker Transport',
    image: '/images/hero-tiles/LWB-logo-328x328.png',
    color: '#059669',
  },
  {
    id: 'bouncy',
    title: 'T&S Bouncy Castle Hire',
    image: '/images/hero-tiles/TNS-logo-328x328.png',
    color: '#f59e0b',
  },
  {
    id: 'paintings',
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

  const handleViewPortfolio = () => {
    track('hero_portfolio_click', {
      source: 'hero',
      buttonText: 'View Portfolio',
    });

    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
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
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 whitespace-nowrap text-center">
              MPDEE{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Development
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto"></div>
          </motion.div>

          <motion.p
            className="text-2xl md:text-3xl mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Professional Web Design & Development
            <br />
            <span className="text-yellow-400">
              Transforming Ideas into Digital Reality
            </span>
          </motion.p>

          {/* Interactive Portfolio Navigation */}
          <motion.div
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {projects.map(project => (
              <motion.div
                key={project.id}
                className="w-28 h-28 bg-white rounded-full p-3 cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
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

          {/* Static gap for project title */}
          <div className="h-16 mb-8 flex items-center justify-center">
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-xl"
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
            className="space-x-6"
          >
            <button
              onClick={handleViewPortfolio}
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Our Portfolio
            </button>
            <button
              onClick={handleGetStarted}
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Project
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
