'use client';

import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to top immediately on component mount
    window.scrollTo(0, 0);
    
    // Also handle browser back/forward navigation
    const handlePopState = () => {
      if (window.location.hash === '' || window.location.hash === '#') {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
};

export default ScrollToTop;
