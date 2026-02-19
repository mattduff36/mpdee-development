'use client';

import { ToggleButton } from '@once-ui-system/core';
import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme') as 'light' | 'dark';
    if (currentTheme) setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('data-theme', newTheme);
  };

  return (
    <ToggleButton
      onClick={toggleTheme}
      selected={false}
      className={styles.toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀' : '☽'}
    </ToggleButton>
  );
};
