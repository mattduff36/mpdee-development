'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 'lbp',
    title: 'Lee Barrowcliff Photography',
    image: '/images/LBP-Logo.png',
    color: '#1f2937',
  },
  {
    id: 'victoria',
    title: 'Victoria Rose Salon',
    image: '/images/victoria-rose-salon-logo.jpeg',
    color: '#ec4899',
  },
  {
    id: 'lwbarker',
    title: 'L.W. Barker Transport',
    image: '/images/lwbarker-logo.png',
    color: '#059669',
  },
  {
    id: 'bouncy',
    title: 'T&S Bouncy Castle Hire',
    image: '/images/ts-bouncy-castle-logo.png',
    color: '#f59e0b',
  },
  {
    id: 'paintings',
    title: 'Paintings by Kay',
    image: '/images/paintings-by-kay-logo.png',
    color: '#7c3aed',
  },
];

const HeroIdea1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle through projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Portfolio Carousel */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 z-10">
        <div className="relative w-32 h-32">
          <AnimatePresence mode="wait">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`absolute inset-0 rounded-full p-4 cursor-pointer ${
                  index === currentIndex ? 'ring-4 ring-white' : ''
                }`}
                style={{ backgroundColor: project.color }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: index === currentIndex ? 1.2 : 0.8,
                  rotate: 0,
                  x: Math.cos((index * 2 * Math.PI) / projects.length) * 60,
                  y: Math.sin((index * 2 * Math.PI) / projects.length) * 60,
                }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.6 }}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="w-full h-full bg-white rounded-full p-2 flex items-center justify-center">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            MPDEE
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl mb-8 h-16"
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            Creating amazing websites like <br />
            <span className="text-yellow-400 font-semibold">
              {projects[currentIndex].title}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-x-4"
          >
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              View Portfolio
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const HeroIdea2 = () => {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Floating Portfolio Cards */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="absolute w-40 h-40 bg-white rounded-xl shadow-2xl p-4"
            initial={{
              x:
                Math.random() *
                (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== 'undefined' ? window.innerHeight : 800),
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [
                Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 1200),
                Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 1200),
                Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 1200),
              ],
              y: [
                Math.random() *
                  (typeof window !== 'undefined' ? window.innerHeight : 800),
                Math.random() *
                  (typeof window !== 'undefined' ? window.innerHeight : 800),
                Math.random() *
                  (typeof window !== 'undefined' ? window.innerHeight : 800),
              ],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={120}
              height={120}
              className="object-contain w-full h-full"
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            MPDEE
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Bringing your digital vision to life
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="space-x-6"
          >
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-10 py-4 rounded-full font-semibold text-xl transition-all transform hover:scale-105">
              Explore Our Work
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const HeroIdea3 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Grid of Portfolio Previews */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 gap-4 p-8 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => {
          const project = projects[i % projects.length];
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
                src={project.image}
                alt={project.title}
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
            <h1 className="text-8xl md:text-9xl font-bold mb-4">MPDEE</h1>
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
            className="flex justify-center space-x-4 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {projects.map(project => (
              <motion.div
                key={project.id}
                className="w-16 h-16 bg-white rounded-full p-2 cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-xl mb-8"
              >
                {projects.find(p => p.id === hoveredProject)?.title}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="space-x-6"
          >
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              View Our Portfolio
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Start Your Project
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Interactive Grid Variation 2 - Dark Theme with Neon Accents
const HeroIdea4 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Grid of Portfolio Previews with Neon Effect */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 gap-3 p-6 opacity-15">
        {Array.from({ length: 30 }).map((_, i) => {
          const project = projects[i % projects.length];
          return (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-xl p-3 flex items-center justify-center border border-cyan-500/20"
              initial={{ opacity: 0, scale: 0, rotate: 45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              whileHover={{
                scale: 1.15,
                opacity: 0.9,
                borderColor: 'rgba(6, 182, 212, 0.8)',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={50}
                height={50}
                className="object-contain filter brightness-110"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-10"
          >
            <h1 className="text-9xl md:text-10xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              MPDEE
            </h1>
            <div className="w-40 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto shadow-lg shadow-cyan-500/50"></div>
          </motion.div>

          <motion.p
            className="text-2xl md:text-4xl mb-14 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Cutting-Edge Web Solutions
            <br />
            <span className="text-cyan-400 font-light">
              Where Innovation Meets Design
            </span>
          </motion.p>

          {/* Interactive Portfolio Navigation with Neon Effect */}
          <motion.div
            className="flex justify-center space-x-6 mb-14"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            {projects.map(project => (
              <motion.div
                key={project.id}
                className="w-20 h-20 bg-gray-800 rounded-2xl p-3 cursor-pointer border border-cyan-500/30"
                whileHover={{
                  scale: 1.3,
                  rotate: 180,
                  borderColor: 'rgba(6, 182, 212, 1)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full filter brightness-110"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="text-2xl mb-10 text-cyan-400 font-semibold"
              >
                {projects.find(p => p.id === hoveredProject)?.title}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="space-x-8"
          >
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-10 py-5 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
              Explore Portfolio
            </button>
            <button className="border-2 border-cyan-500 hover:bg-cyan-500/10 px-10 py-5 rounded-xl font-semibold text-lg transition-all">
              Start Project
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Interactive Grid Variation 3 - Warm Sunset Theme
const HeroIdea5 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900">
      {/* Grid of Portfolio Previews with Warm Glow */}
      <div className="absolute inset-0 grid grid-cols-7 grid-rows-6 gap-2 p-4 opacity-25">
        {Array.from({ length: 42 }).map((_, i) => {
          const project = projects[i % projects.length];
          return (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-2xl p-2 flex items-center justify-center shadow-lg"
              initial={{ opacity: 0, scale: 0, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ delay: i * 0.03, duration: 0.6 }}
              whileHover={{
                scale: 1.2,
                opacity: 0.9,
                boxShadow: '0 0 25px rgba(251, 191, 36, 0.6)',
                rotateY: 180,
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={40}
                height={40}
                className="object-contain"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-8xl md:text-10xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              MPDEE
            </h1>
            <div className="w-48 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 mx-auto rounded-full shadow-lg shadow-orange-500/50"></div>
          </motion.div>

          <motion.p
            className="text-3xl md:text-4xl mb-16 leading-relaxed font-light"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Crafting Digital Experiences
            <br />
            <span className="text-yellow-300 font-semibold">
              That Ignite Your Brand
            </span>
          </motion.p>

          {/* Interactive Portfolio Navigation with Warm Theme */}
          <motion.div
            className="flex justify-center space-x-8 mb-16"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            {projects.map(project => (
              <motion.div
                key={project.id}
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-4 cursor-pointer shadow-xl"
                whileHover={{
                  scale: 1.4,
                  rotate: -15,
                  boxShadow: '0 0 40px rgba(251, 191, 36, 0.8)',
                }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                className="text-3xl mb-12 text-yellow-300 font-bold"
                transition={{ type: 'spring', bounce: 0.4 }}
              >
                {projects.find(p => p.id === hoveredProject)?.title}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="space-x-8"
          >
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-500 hover:to-orange-600 px-12 py-6 rounded-2xl font-bold text-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
              View Portfolio
            </button>
            <button className="border-3 border-yellow-400 hover:bg-yellow-400/20 px-12 py-6 rounded-2xl font-bold text-xl transition-all">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Interactive Grid Variation 4 - Minimalist Monochrome
const HeroIdea6 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Grid of Portfolio Previews - Minimal Style */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-5 gap-4 p-12 opacity-30">
        {Array.from({ length: 40 }).map((_, i) => {
          const project = projects[i % projects.length];
          return (
            <motion.div
              key={i}
              className="bg-white rounded-lg p-3 flex items-center justify-center shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.4 }}
              whileHover={{
                scale: 1.1,
                opacity: 1,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                y: -5,
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={35}
                height={35}
                className="object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-gray-900 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-10"
          >
            <h1 className="text-9xl md:text-10xl font-thin mb-4 tracking-tight">
              MPDEE
            </h1>
            <div className="w-24 h-px bg-gray-900 mx-auto"></div>
          </motion.div>

          <motion.p
            className="text-2xl md:text-3xl mb-14 leading-relaxed font-light text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Minimal. Elegant. Effective.
            <br />
            <span className="text-gray-900 font-normal">
              Web Design Refined
            </span>
          </motion.p>

          {/* Interactive Portfolio Navigation - Clean Style */}
          <motion.div
            className="flex justify-center space-x-6 mb-14"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {projects.map(project => (
              <motion.div
                key={project.id}
                className="w-16 h-16 bg-white rounded-lg p-3 cursor-pointer shadow-md border border-gray-200"
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                  y: -8,
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={40}
                  height={40}
                  className="object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl mb-10 text-gray-600 font-light"
              >
                {projects.find(p => p.id === hoveredProject)?.title}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="space-x-6"
          >
            <button className="bg-gray-900 text-white hover:bg-gray-800 px-10 py-4 rounded-lg font-medium text-lg transition-all shadow-lg">
              View Work
            </button>
            <button className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white px-10 py-4 rounded-lg font-medium text-lg transition-all">
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Interactive Grid Variation 5 - Ocean Depths Theme
const HeroIdea7 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900">
      {/* Grid of Portfolio Previews - Ocean Theme */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-6 p-10 opacity-20">
        {Array.from({ length: 12 }).map((_, i) => {
          const project = projects[i % projects.length];
          return (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-3xl p-4 flex items-center justify-center backdrop-blur-sm border border-cyan-400/20"
              initial={{ opacity: 0, scale: 0, rotateZ: 45 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ delay: i * 0.15, duration: 1, type: 'spring' }}
              whileHover={{
                scale: 1.25,
                opacity: 0.8,
                rotateZ: -10,
                boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={80}
                height={80}
                className="object-contain filter brightness-125"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Floating Bubbles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
            }}
            animate={{
              y: [-20, -window.innerHeight - 100],
              x: [0, Math.random() * 100 - 50],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-8xl md:text-10xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              MPDEE
            </h1>
            <motion.div
              className="w-56 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 mx-auto rounded-full"
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </motion.div>

          <motion.p
            className="text-2xl md:text-4xl mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            Dive Deep Into Digital Excellence
            <br />
            <span className="text-cyan-300 font-semibold">
              Surfacing Extraordinary Solutions
            </span>
          </motion.p>

          {/* Interactive Portfolio Navigation - Ocean Style */}
          <motion.div
            className="flex justify-center space-x-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full p-4 cursor-pointer backdrop-blur-sm border border-cyan-400/30"
                whileHover={{
                  scale: 1.5,
                  rotate: 360,
                  boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)',
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 2 + index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full filter brightness-125"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -30 }}
                className="text-2xl mb-12 text-cyan-300 font-bold"
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                {projects.find(p => p.id === hoveredProject)?.title}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="space-x-8"
          >
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-12 py-6 rounded-full font-bold text-xl transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40">
              Explore Depths
            </button>
            <button className="border-2 border-cyan-400 hover:bg-cyan-400/20 px-12 py-6 rounded-full font-bold text-xl transition-all backdrop-blur-sm">
              Surface Contact
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Interactive Grid Variation 6 - Futuristic Hologram
const HeroIdea8 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black overflow-hidden">
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-10 grid-rows-6 h-full gap-1 p-8">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-purple-400 rounded"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.08,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Grid Elements */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 gap-8 p-16 opacity-25">
        {Array.from({ length: 20 }).map((_, i) => {
          const project = projects[i % projects.length];
          return (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl p-4 flex items-center justify-center backdrop-blur-sm border border-purple-400/30"
              initial={{ opacity: 0, scale: 0, rotateX: 180 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ delay: i * 0.08, duration: 1, type: 'spring' }}
              whileHover={{
                scale: 1.3,
                opacity: 0.9,
                rotateX: 180,
                boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={60}
                height={60}
                className="object-contain filter brightness-125 hue-rotate-15"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Scanning Lines Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent h-8"
        animate={{ y: [-50, window.innerHeight + 50] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2, type: 'spring', bounce: 0.3 }}
            className="mb-12"
          >
            <motion.h1
              className="text-9xl md:text-11xl font-bold mb-8"
              animate={{
                textShadow: [
                  '0 0 20px rgba(147, 51, 234, 0.5)',
                  '0 0 40px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(147, 51, 234, 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                MPDEE
              </span>
            </motion.h1>
            <motion.div
              className="w-64 h-2 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 mx-auto rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(147, 51, 234, 0.5)',
                  '0 0 40px rgba(34, 211, 238, 0.8)',
                  '0 0 20px rgba(147, 51, 234, 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <motion.p
            className="text-3xl md:text-5xl mb-20 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.8 }}
          >
            <span className="text-purple-300">Quantum Web Development</span>
            <br />
            <span className="text-cyan-300 font-semibold">
              Beyond Tomorrow&apos;s Standards
            </span>
          </motion.p>

          {/* Interactive Portfolio Navigation - Holographic Style */}
          <motion.div
            className="flex justify-center space-x-10 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1.2 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-2xl p-5 cursor-pointer backdrop-blur-sm border border-purple-400/50"
                  whileHover={{
                    scale: 1.6,
                    rotate: 360,
                    boxShadow: '0 0 50px rgba(147, 51, 234, 0.8)',
                  }}
                  animate={{
                    y: [0, -15, 0],
                    rotateX: [0, 10, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    rotateX: {
                      duration: 4 + index * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={56}
                    height={56}
                    className="object-contain w-full h-full filter brightness-125 hue-rotate-15"
                  />
                </motion.div>

                {/* Holographic Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(147, 51, 234, 0)',
                      '0 0 20px rgba(147, 51, 234, 0.3)',
                      '0 0 0px rgba(147, 51, 234, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2 + index * 0.2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, rotateX: 90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.3, rotateX: -90 }}
                className="text-3xl mb-16 font-bold"
                transition={{ type: 'spring', bounce: 0.6 }}
              >
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {projects.find(p => p.id === hoveredProject)?.title}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1.8 }}
            className="space-x-10"
          >
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-14 py-7 rounded-2xl font-bold text-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(147, 51, 234, 0.3)',
                  '0 0 40px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(147, 51, 234, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Enter Quantum Space
            </motion.button>
            <motion.button
              className="border-2 border-purple-400 hover:bg-purple-400/20 px-14 py-7 rounded-2xl font-bold text-2xl transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Access Portfolio
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function HeroIdeasPage() {
  const [currentIdea, setCurrentIdea] = useState(1);

  const ideas = [
    { id: 1, name: 'Portfolio Carousel', component: HeroIdea1 },
    { id: 2, name: 'Floating Cards', component: HeroIdea2 },
    { id: 3, name: 'Interactive Grid', component: HeroIdea3 },
    { id: 4, name: 'Dark Neon', component: HeroIdea4 },
    { id: 5, name: 'Warm Sunset', component: HeroIdea5 },
    { id: 6, name: 'Minimalist', component: HeroIdea6 },
    { id: 7, name: 'Ocean Depths', component: HeroIdea7 },
    { id: 8, name: 'Quantum Hologram', component: HeroIdea8 },
  ];

  const CurrentHeroComponent =
    ideas.find(idea => idea.id === currentIdea)?.component || HeroIdea1;

  return (
    <div>
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        <Link
          href="/"
          className="block bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          ← Back to Main Site
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-semibold mb-2 text-gray-900">Hero Ideas:</h3>
          {ideas.map(idea => (
            <button
              key={idea.id}
              onClick={() => setCurrentIdea(idea.id)}
              className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                currentIdea === idea.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {idea.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Hero Idea */}
      <CurrentHeroComponent />
    </div>
  );
}
