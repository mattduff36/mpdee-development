'use client';

import { useState } from 'react';
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
  { id: 'lbp', title: 'Lee Barrowcliff Photography', image: '/images/LBP-Logo.png', color: '#1f2937' },
  { id: 'victoria', title: 'Victoria Rose Salon', image: '/images/victoria-rose-salon-logo.jpeg', color: '#ec4899' },
  { id: 'lwbarker', title: 'L.W. Barker Transport', image: '/images/lwbarker-logo.png', color: '#059669' },
  { id: 'bouncy', title: 'T&S Bouncy Castle Hire', image: '/images/ts-bouncy-castle-logo.png', color: '#f59e0b' },
  { id: 'paintings', title: 'Paintings by Kay', image: '/images/paintings-by-kay-logo.png', color: '#7c3aed' },
];

const HeroIdea1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
              ease: "linear",
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
            transition={{ duration: 1, type: "spring" }}
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
            <span className="text-yellow-400">Transforming Ideas into Digital Reality</span>
          </motion.p>

          {/* Interactive Portfolio Navigation */}
          <motion.div
            className="flex justify-center space-x-4 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {projects.map((project) => (
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

export default function HeroIdeasPage() {
  const [currentIdea, setCurrentIdea] = useState(1);

  const ideas = [
    { id: 1, name: 'Portfolio Carousel', component: HeroIdea1 },
    { id: 2, name: 'Floating Cards', component: HeroIdea2 },
    { id: 3, name: 'Interactive Grid', component: HeroIdea3 },
  ];

  const CurrentHeroComponent = ideas.find(idea => idea.id === currentIdea)?.component || HeroIdea1;

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
          {ideas.map((idea) => (
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
