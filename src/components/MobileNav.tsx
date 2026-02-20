'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Column,
  Dialog,
  Flex,
  IconButton,
  ToggleButton,
} from '@once-ui-system/core';
import { routes, display, work, services, contact } from '@/resources';
import { ThemeToggle } from './ThemeToggle';
import styles from './MobileNav.module.scss';

export function MobileNav() {
  const pathname = usePathname() ?? '';
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  return (
    <div className={styles.wrapper}>
      {display.themeSwitcher && (
        <div className={styles.themeToggle}>
          <ThemeToggle />
        </div>
      )}
      <IconButton
        icon="bars3"
        variant="ghost"
        size="m"
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
        className={styles.trigger}
      />
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Menu"
        className={styles.mobileMenuDialog}
        style={{
          maxWidth: 'min(320px, 90vw)',
          height: 'fit-content',
          maxHeight: 'calc(100vh - 120px)',
          alignSelf: 'flex-start',
          marginTop: '72px',
          flex: '0 1 auto',
        }}
      >
        <Column fillWidth gap="4">
          <div onClick={handleNavClick}>
            <ToggleButton
              prefixIcon="home"
              href="/"
              selected={pathname === '/'}
              fillWidth
            >
              <Flex paddingX="4">Home</Flex>
            </ToggleButton>
          </div>
          {routes['/work'] && (
            <div onClick={handleNavClick}>
              <ToggleButton
                prefixIcon="grid"
                href="/work"
                selected={pathname === '/work'}
                fillWidth
              >
                <Flex paddingX="4">{work.label}</Flex>
              </ToggleButton>
            </div>
          )}
          {routes['/services'] && (
            <div onClick={handleNavClick}>
              <ToggleButton
                prefixIcon="openInNew"
                href="/services"
                selected={pathname === '/services'}
                fillWidth
              >
                <Flex paddingX="4">{services.label}</Flex>
              </ToggleButton>
            </div>
          )}
          {routes['/contact'] && (
            <div onClick={handleNavClick}>
              <ToggleButton
                prefixIcon="email"
                href="/contact"
                selected={pathname === '/contact'}
                fillWidth
              >
                <Flex paddingX="4">{contact.label}</Flex>
              </ToggleButton>
            </div>
          )}
        </Column>
      </Dialog>
    </div>
  );
}
