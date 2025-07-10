'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TextTrail from './TextTrail';

interface HeroProps {
  onGetStarted?: () => void;
}

const DOTS = [
  { key: 'dot1', base: 'top-10 left-10 w-20 h-20', factor: 0.04 },
  { key: 'dot2', base: 'top-40 right-20 w-16 h-16', factor: -0.03 },
  { key: 'dot3', base: 'bottom-20 left-1/4 w-12 h-12', factor: 0.06 },
  { key: 'dot4', base: 'bottom-40 right-1/3 w-8 h-8', factor: -0.05 },
];

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative bg-background-dark text-text-light py-20 overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        {DOTS.map((dot, i) =>
          isMobile ? (
            <div
              key={dot.key}
              className={`absolute ${dot.base} bg-white rounded-full ${i % 2 === 0 ? 'animate-pulse' : 'animate-bounce'}`}
            />
          ) : (
            <div
              key={dot.key}
              className={`absolute ${dot.base} bg-white rounded-full`}
              style={{
                transform: `translate(${mouse.x * 80 * dot.factor}px, ${mouse.y * 80 * dot.factor}px)`,
                transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)',
              }}
            />
          )
        )}
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo above heading */}
          <div className={`flex flex-col items-center mb-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Image
              src="/images/mpdee_logo.png"
              alt="MPDEE logo"
              width={96}
              height={96}
              className="mx-auto w-24 h-24 md:w-32 md:h-32 object-contain"
              priority
            />
          </div>
          {/* Main heading with slide-up animation */}
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Professional Web Design & Development
          </h1>
          {/* Subtitle with delayed slide-up animation */}
          <p
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            We create beautiful, functional websites that drive results for your
            business
          </p>
          {/* CTA button with delayed fade-in and scale animation */}
          <div
            className={`transition-all duration-1000 ease-out delay-600 ${
              isVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <button
              onClick={handleGetStarted}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Get started with our web design services"
            >
              Get Started
            </button>
          </div>
          {/* Scroll indicator with bounce animation */}
          <div
            className={`mt-16 transition-all duration-1000 ease-out delay-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2 opacity-80">Scroll to explore</span>
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 