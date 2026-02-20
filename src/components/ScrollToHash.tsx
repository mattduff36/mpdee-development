'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (!hash) return;

    const id = hash.slice(1);

    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToElement);
    });
  }, [pathname]);

  return null;
}
