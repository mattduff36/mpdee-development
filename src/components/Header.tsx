'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Line, Text, ToggleButton } from '@once-ui-system/core';
import { routes, display, company } from '@/resources';
import { work, services, contact } from '@/resources';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import styles from './Header.module.scss';

export const Header = () => {
  const pathname = usePathname() ?? '';

  return (
    <Flex
      fitHeight
      className={styles.position}
      as="header"
      zIndex={9}
      fillWidth
      padding="8"
      horizontal="center"
    >
      <Flex
        paddingLeft="12"
        paddingX="12"
        fillWidth
        vertical="center"
        textVariant="label-default-s"
        maxWidth="l"
      >
        <Flex fillWidth horizontal="start" vertical="center" gap="4">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Flex
              horizontal="center"
              vertical="center"
              gap="8"
              style={{ cursor: 'pointer' }}
            >
              <Image
                src={company.logo}
                alt={company.logoAlt}
                width={120}
                height={40}
                style={{
                  height: '1.5rem',
                  width: 'auto',
                  objectFit: 'contain',
                }}
                priority
              />
              <Text variant="heading-strong-s" className="brand-gradient-text">
                Development
              </Text>
            </Flex>
          </Link>
        </Flex>

        <Flex
          fillWidth
          horizontal="center"
          vertical="center"
          className={styles.desktopNav}
        >
          <Flex
            background="surface"
            border="neutral-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            gap="2"
            vertical="center"
          >
            <ToggleButton
              prefixIcon="home"
              href="/"
              selected={pathname === '/'}
            >
              <Flex paddingX="2">Home</Flex>
            </ToggleButton>

            {routes['/work'] && (
              <>
                <Line vert maxHeight="24" />
                <ToggleButton
                  prefixIcon="grid"
                  href="/work"
                  selected={pathname === '/work'}
                >
                  <Flex paddingX="2">{work.label}</Flex>
                </ToggleButton>
              </>
            )}
            {routes['/services'] && (
              <>
                <Line vert maxHeight="24" />
                <ToggleButton
                  prefixIcon="openInNew"
                  href="/services"
                  selected={pathname === '/services'}
                >
                  <Flex paddingX="2">{services.label}</Flex>
                </ToggleButton>
              </>
            )}
            {routes['/contact'] && (
              <>
                <Line vert maxHeight="24" />
                <ToggleButton
                  prefixIcon="email"
                  href="/contact"
                  selected={pathname === '/contact'}
                >
                  <Flex paddingX="2">{contact.label}</Flex>
                </ToggleButton>
              </>
            )}
            {display.themeSwitcher && (
              <>
                <Line vert maxHeight="24" />
                <ThemeToggle />
              </>
            )}
          </Flex>
        </Flex>

        <Flex fillWidth horizontal="end" vertical="center">
          <MobileNav />
          {display.location && (
            <Flex
              paddingX="4"
              textVariant="label-default-s"
              className={styles.location}
            >
              {company.location}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
