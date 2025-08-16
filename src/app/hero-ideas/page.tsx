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

// Original Interactive Grid (now Variation 1)
const InteractiveGridV1 = () => {
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
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
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

// New Hero Idea 4: Morphing Showcase
const HeroIdea4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-900 to-slate-700 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(45deg, #1e293b, #334155)',
            'linear-gradient(135deg, #334155, #475569)',
            'linear-gradient(225deg, #475569, #1e293b)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Morphing Portfolio Showcase */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="w-80 h-64 bg-white rounded-2xl shadow-2xl overflow-hidden"
          key={currentIndex}
          initial={{ rotateY: 90, scale: 0.8 }}
          animate={{ rotateY: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-full flex items-center justify-center p-8">
            <Image
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              width={200}
              height={150}
              className="object-contain"
            />
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-white font-semibold text-lg">
              {projects[currentIndex].title}
            </h3>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-start pl-16">
        <div className="text-white max-w-2xl">
          <motion.h1
            className="text-7xl md:text-8xl font-bold mb-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            MPDEE
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We create digital experiences that transform businesses
          </motion.p>

          <motion.div
            className="text-lg mb-8"
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-400">Currently showcasing:</span>
            <br />
            <span className="text-2xl font-semibold">
              {projects[currentIndex].title}
            </span>
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-x-4"
          >
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition-colors">
              View All Projects
            </button>
            <button className="border border-gray-400 hover:border-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// New Hero Idea 5: Split Screen Portfolio
const HeroIdea5 = () => {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Split Screen Layout */}
      <div className="flex h-full">
        {/* Left Side - Content */}
        <motion.div
          className="w-1/2 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center"
          initial={{ x: -window.innerWidth / 2 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-white text-center px-12">
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              MPDEE
            </motion.h1>

            <motion.p
              className="text-xl mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Professional web solutions that drive results
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(index)}
                  className={`block w-full text-left px-6 py-3 rounded-lg transition-all ${
                    activeProject === index
                      ? 'bg-white text-gray-900 transform scale-105'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Portfolio Showcase */}
        <motion.div
          className="w-1/2 bg-white flex items-center justify-center relative"
          initial={{ x: window.innerWidth / 2 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <Image
                  src={projects[activeProject].image}
                  alt={projects[activeProject].title}
                  width={300}
                  height={200}
                  className="object-contain mx-auto"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {projects[activeProject].title}
              </h2>
              <div
                className="w-32 h-1 mx-auto rounded"
                style={{ backgroundColor: projects[activeProject].color }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// New Hero Idea 6: Particle Portfolio
const HeroIdea6 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Particle Portfolio Items */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="absolute w-20 h-20 bg-white rounded-full p-3 shadow-lg"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`,
            }}
            animate={{
              x:
                (mousePosition.x - window.innerWidth / 2) *
                (0.01 + index * 0.005),
              y:
                (mousePosition.y - window.innerHeight / 2) *
                (0.01 + index * 0.005),
              rotate: [0, 360],
            }}
            transition={{
              x: { duration: 0.3 },
              y: { duration: 0.3 },
              rotate: {
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            whileHover={{ scale: 1.5, zIndex: 10 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={60}
              height={60}
              className="object-contain w-full h-full"
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            MPDEE
          </motion.h1>

          <motion.p
            className="text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Interactive web experiences that respond to your every move
          </motion.p>

          <motion.p
            className="text-lg mb-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Move your mouse to see our portfolio come alive
          </motion.p>

          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-4 rounded-full font-semibold text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Universe
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// New Hero Idea 7: Timeline Portfolio
const HeroIdea7 = () => {
  const [visibleProjects, setVisibleProjects] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleProjects(prev => (prev < projects.length ? prev + 1 : 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500" />

      {/* Portfolio Timeline Items */}
      <div className="absolute inset-0 flex flex-col justify-center">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex items-center mb-8 ${
              index % 2 === 0 ? 'justify-start pl-20' : 'justify-end pr-20'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{
              opacity: index < visibleProjects ? 1 : 0.3,
              x: 0,
              scale: index < visibleProjects ? 1 : 0.8,
            }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div
              className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <motion.div
                className="w-24 h-24 bg-white rounded-full p-4 shadow-lg"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </motion.div>

              <div
                className={`mx-8 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
              >
                <h3 className="text-white text-xl font-semibold">
                  {project.title}
                </h3>
                <div
                  className={`w-16 h-1 mt-2 ${index % 2 === 0 ? 'ml-0' : 'ml-auto'}`}
                  style={{ backgroundColor: project.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center text-white">
        <motion.h1
          className="text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          MPDEE
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our Journey Through Digital Excellence
        </motion.p>
      </div>
    </div>
  );
};

// New Hero Idea 8: Holographic Portfolio
const HeroIdea8 = () => {
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject(prev => (prev + 1) % projects.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full gap-1 p-4">
          {Array.from({ length: 96 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-cyan-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.05,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Holographic Portfolio Display */}
      <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="relative w-96 h-96"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg backdrop-blur-sm border border-cyan-500/50"
              initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-full flex flex-col items-center justify-center p-8">
                <motion.div
                  className="mb-6"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Image
                    src={projects[currentProject].image}
                    alt={projects[currentProject].title}
                    width={200}
                    height={150}
                    className="object-contain"
                  />
                </motion.div>
                <h3 className="text-cyan-400 text-2xl font-semibold text-center">
                  {projects[currentProject].title}
                </h3>
                <div className="w-32 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mt-4" />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-start pl-20">
        <div className="text-white max-w-2xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
              MPDEE
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
          </motion.div>

          <motion.p
            className="text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Step into the future of web development
          </motion.p>

          <motion.div
            className="text-lg mb-12"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="text-cyan-400">Holographic Preview:</span>
            <br />
            <motion.span
              key={currentProject}
              className="text-2xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {projects[currentProject].title}
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="space-x-4"
          >
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all">
              Enter the Matrix
            </button>
            <button className="border border-cyan-500 hover:bg-cyan-500/10 px-8 py-4 rounded-lg font-semibold transition-all">
              View Portfolio
            </button>
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
    { id: 4, name: 'Morphing Showcase', component: HeroIdea4 },
    { id: 5, name: 'Split Screen', component: HeroIdea5 },
    { id: 6, name: 'Particle Portfolio', component: HeroIdea6 },
    { id: 7, name: 'Timeline Journey', component: HeroIdea7 },
    { id: 8, name: 'Holographic Display', component: HeroIdea8 },
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
