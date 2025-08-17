'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface NavigationProps {
  logo?: string;
}

const Navigation = ({ logo = 'MPDEE' }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const navigationItems = useMemo(
    () => [
      { name: 'Services', href: '#services', id: 'services' },
      { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
      { name: 'Contact', href: '#contact', id: 'contact' },
    ],
    []
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      const currentSection = sections.find(section => {
        if (section === 'home') {
          return window.scrollY < 100;
        }

        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });

      setActiveSection(currentSection || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems, isClient]);

  const handleNavClick = (href: string, id: string) => {
    setIsMenuOpen(false);

    if (!isClient) return;

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      handleCloseMenu();
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background-dark/95 backdrop-blur-sm shadow-lg'
          : 'bg-background-dark'
      }`}
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 w-1/3">
            <button
              onClick={() => handleNavClick('#', 'home')}
              className="flex items-center text-2xl font-bold text-text-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Go to homepage"
              tabIndex={0}
            >
              <Image
                src="/images/mpdee_logo.png"
                alt="MPDEE logo"
                width={32}
                height={32}
                className="mr-2 w-8 h-8 object-contain"
                priority
              />
              MPDEE&nbsp;
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Development
              </span>
            </button>
          </div>

          {/* Desktop Navigation - Perfectly Centered */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8 w-1/3 justify-center"
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-text-light hover:text-primary hover:bg-gray-800'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                tabIndex={0}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>

          {/* CTA Button (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex w-1/3 justify-end"
          >
            <button
              onClick={() => handleNavClick('#contact', 'contact')}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Get in touch"
              tabIndex={0}
            >
              Get Started
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleToggleMenu}
              className="text-text-light hover:text-white p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              tabIndex={0}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide Down Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scaleY: 0 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0 }}
              transition={{
                duration: 0.25,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              style={{ transformOrigin: 'top' }}
              className="md:hidden bg-background-dark border-t border-gray-700 shadow-lg overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      activeSection === item.id
                        ? 'text-primary bg-primary/10'
                        : 'text-text-light hover:text-primary hover:bg-gray-800'
                    }`}
                    aria-current={
                      activeSection === item.id ? 'page' : undefined
                    }
                    tabIndex={0}
                  >
                    {item.name}
                  </motion.button>
                ))}

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: navigationItems.length * 0.05,
                  }}
                  className="pt-4"
                >
                  <button
                    onClick={() => handleNavClick('#contact', 'contact')}
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Get in touch"
                    tabIndex={0}
                  >
                    Get Started
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 md:hidden -z-10"
            onClick={handleCloseMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
