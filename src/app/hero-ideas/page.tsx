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

// Interactive Grid Variation 1 - Original Classic
const HeroIdea1 = () => {
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

// Interactive Grid Variation 2 - Hexagonal Mosaic
const HeroIdea2 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Hexagonal Grid Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="grid grid-cols-8 grid-rows-6 gap-2 p-6 h-full">
          {Array.from({ length: 48 }).map((_, i) => {
            const project = projects[i % projects.length];
            return (
              <motion.div
                key={i}
                className="hexagon bg-white flex items-center justify-center"
                style={{
                  clipPath:
                    'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  transform:
                    i % 2 === 0 ? 'translateY(25%)' : 'translateY(-25%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover={{ scale: 1.2, opacity: 0.8 }}
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
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: 'spring' }}
          >
            MPDEE
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Crafting Digital Experiences with
            <br />
            <span className="text-blue-400 font-semibold">
              Geometric Precision
            </span>
          </motion.p>

          {/* Hexagonal Portfolio Navigation */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {projects.map(project => (
              <motion.div
                key={project.id}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath:
                    'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 180,
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
                }}
                transition={{ duration: 0.4 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-lg mb-8 text-blue-300"
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
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-10 py-4 rounded-lg font-semibold text-lg transition-all">
              Explore Geometry
            </button>
            <button className="border border-blue-400 hover:bg-blue-400/20 px-10 py-4 rounded-lg font-semibold text-lg transition-all">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Interactive Grid Variation 3 - Floating Islands
const HeroIdea3 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 overflow-hidden">
      {/* Floating Island Grid */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => {
          const project = projects[i % projects.length];
          return (
            <motion.div
              key={i}
              className="absolute bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              style={{
                left: `${15 + (i % 5) * 18}%`,
                top: `${20 + Math.floor(i / 5) * 25}%`,
                width: '120px',
                height: '120px',
              }}
              initial={{ opacity: 0, y: 100, rotate: -45 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                rotate: 0,
              }}
              transition={{
                delay: i * 0.1,
                y: {
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              whileHover={{
                scale: 1.2,
                rotate: 15,
                boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-8"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.4 }}
          >
            MPDEE
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Where Ideas Take Flight
            <br />
            <span className="text-cyan-300 font-semibold">
              Floating Above the Ordinary
            </span>
          </motion.p>

          {/* Floating Portfolio Navigation */}
          <motion.div
            className="flex justify-center space-x-8 mb-12"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl p-3 cursor-pointer shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                whileHover={{
                  scale: 1.3,
                  y: -20,
                  boxShadow: '0 25px 50px rgba(6, 182, 212, 0.4)',
                  rotate: 360,
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={72}
                  height={72}
                  className="object-contain w-full h-full"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-xl mb-8 text-cyan-300"
              >
                {projects.find(p => p.id === hoveredProject)?.title}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="space-x-6"
          >
            <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-10 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg">
              Take Flight
            </button>
            <button className="border-2 border-cyan-400 hover:bg-cyan-400/20 px-10 py-4 rounded-2xl font-semibold text-lg transition-all">
              Explore Islands
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Interactive Grid Variation 4 - Morphing Tessellation
const HeroIdea4 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
      {/* Morphing Tessellation Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-6 grid-rows-5 gap-1 p-4 h-full">
          {Array.from({ length: 30 }).map((_, i) => {
            const project = projects[i % projects.length];
            const shapes = [
              'polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle
              'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon
              'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Square
              'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // Pentagon
            ];

            return (
              <motion.div
                key={i}
                className="bg-white flex items-center justify-center"
                style={{
                  clipPath: shapes[i % shapes.length],
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 90, 180, 270, 360],
                  clipPath: [
                    shapes[i % shapes.length],
                    shapes[(i + 1) % shapes.length],
                    shapes[(i + 2) % shapes.length],
                    shapes[i % shapes.length],
                  ],
                }}
                transition={{
                  delay: i * 0.08,
                  rotate: {
                    duration: 8 + i * 0.2,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  clipPath: {
                    duration: 6 + i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                whileHover={{ scale: 1.5, zIndex: 10 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-5xl mx-auto px-6">
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.6 }}
          >
            MPDEE
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Constantly Evolving Digital Solutions
            <br />
            <span className="text-fuchsia-400 font-semibold">
              Morphing with Your Vision
            </span>
          </motion.p>

          {/* Morphing Portfolio Navigation */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {projects.map((project, index) => {
              const shapes = [
                'polygon(50% 0%, 0% 100%, 100% 100%)',
                'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                'circle(50% at 50% 50%)',
              ];

              return (
                <motion.div
                  key={project.id}
                  className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center cursor-pointer"
                  style={{
                    clipPath: shapes[index % shapes.length],
                  }}
                  animate={{
                    clipPath: [
                      shapes[index % shapes.length],
                      shapes[(index + 1) % shapes.length],
                      shapes[(index + 2) % shapes.length],
                      shapes[index % shapes.length],
                    ],
                    rotate: [0, 360],
                  }}
                  transition={{
                    clipPath: {
                      duration: 4 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    rotate: {
                      duration: 8 + index * 0.3,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  }}
                  whileHover={{
                    scale: 1.4,
                    boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)',
                  }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
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
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                className="text-xl mb-8 text-fuchsia-300"
                transition={{ type: 'spring', bounce: 0.5 }}
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
            <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 px-10 py-4 rounded-lg font-semibold text-lg transition-all">
              Transform Ideas
            </button>
            <button className="border-2 border-fuchsia-400 hover:bg-fuchsia-400/20 px-10 py-4 rounded-lg font-semibold text-lg transition-all">
              Watch Evolution
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Interactive Grid Variation 5 - Particle Constellation
const HeroIdea5 = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Particle Constellation */}
      <div className="absolute inset-0">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line
              key={i}
              x1={`${20 + (i % 4) * 20}%`}
              y1={`${25 + Math.floor(i / 4) * 15}%`}
              x2={`${25 + ((i + 1) % 4) * 20}%`}
              y2={`${30 + Math.floor((i + 1) / 4) * 15}%`}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 2 }}
            />
          ))}
        </svg>

        {/* Particle Nodes */}
        {Array.from({ length: 25 }).map((_, i) => {
          const project = projects[i % projects.length];
          const baseX = 15 + (i % 5) * 17;
          const baseY = 20 + Math.floor(i / 5) * 15;

          return (
            <motion.div
              key={i}
              className="absolute w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              style={{
                left: `${baseX}%`,
                top: `${baseY}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.1, 1],
                x:
                  (mousePosition.x - window.innerWidth / 2) *
                  (0.02 + i * 0.001),
                y:
                  (mousePosition.y - window.innerHeight / 2) *
                  (0.02 + i * 0.001),
                boxShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.3)',
                  '0 0 20px rgba(147, 51, 234, 0.5)',
                  '0 0 10px rgba(59, 130, 246, 0.3)',
                ],
              }}
              transition={{
                opacity: { duration: 1, delay: i * 0.1 },
                x: { duration: 0.5 },
                y: { duration: 0.5 },
                scale: { duration: 3 + i * 0.1, repeat: Infinity },
                boxShadow: { duration: 4 + i * 0.2, repeat: Infinity },
              }}
              whileHover={{
                scale: 1.8,
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            MPDEE
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Connected Digital Universe
            <br />
            <span className="text-blue-400 font-semibold">
              Where Every Project Matters
            </span>
          </motion.p>

          <motion.p
            className="text-lg mb-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Move your cursor to interact with our constellation of work
          </motion.p>

          {/* Constellation Portfolio Navigation */}
          <motion.div
            className="flex justify-center space-x-8 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3 cursor-pointer relative overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(59, 130, 246, 0.4)',
                    '0 0 25px rgba(147, 51, 234, 0.6)',
                    '0 0 15px rgba(59, 130, 246, 0.4)',
                  ],
                  rotate: [0, 360],
                }}
                transition={{
                  boxShadow: { duration: 3 + index * 0.5, repeat: Infinity },
                  rotate: {
                    duration: 20 + index * 2,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
                whileHover={{
                  scale: 1.4,
                  boxShadow: '0 0 50px rgba(59, 130, 246, 1)',
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-xl mb-8 text-blue-300"
              >
                {projects.find(p => p.id === hoveredProject)?.title}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="space-x-6"
          >
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-12 py-4 rounded-full font-semibold text-lg transition-all">
              Join the Constellation
            </button>
            <button className="border border-blue-400 hover:bg-blue-400/20 px-12 py-4 rounded-full font-semibold text-lg transition-all">
              Explore Connections
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
    { id: 1, name: 'Classic Grid', component: HeroIdea1 },
    { id: 2, name: 'Hexagonal Mosaic', component: HeroIdea2 },
    { id: 3, name: 'Floating Islands', component: HeroIdea3 },
    { id: 4, name: 'Morphing Tessellation', component: HeroIdea4 },
    { id: 5, name: 'Particle Constellation', component: HeroIdea5 },
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
          <h3 className="font-semibold mb-2 text-gray-900">
            Interactive Grid Variations:
          </h3>
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
