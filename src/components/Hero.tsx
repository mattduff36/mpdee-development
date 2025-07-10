'use client';

import React, { useState, useEffect } from 'react';

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Default behavior: scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-white rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
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
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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