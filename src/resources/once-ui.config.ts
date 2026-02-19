import {
  DisplayConfig,
  RoutesConfig,
  FontsConfig,
  StyleConfig,
  EffectsConfig,
  SchemaConfig,
  SameAsConfig,
} from '@/types';

import { Geist } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';

const baseURL = 'https://development.mpdee.co.uk';

const routes: RoutesConfig = {
  '/': true,
  '/work': true,
  '/services': true,
  '/contact': true,
};

const display: DisplayConfig = {
  location: true,
  time: false,
  themeSwitcher: true,
};

const heading = Geist({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});

const body = Geist({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const label = Geist({
  variable: '--font-label',
  subsets: ['latin'],
  display: 'swap',
});

const code = Geist_Mono({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
});

const fonts: FontsConfig = {
  heading,
  body,
  label,
  code,
};

const style: StyleConfig = {
  theme: 'dark',
  neutral: 'gray',
  brand: 'orange',
  accent: 'blue',
  solid: 'contrast',
  solidStyle: 'flat',
  border: 'playful',
  surface: 'translucent',
  transition: 'all',
  scaling: '100',
};

const effects: EffectsConfig = {
  mask: {
    cursor: true,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 30,
    x: 50,
    y: 0,
    width: 75,
    height: 50,
    tilt: 0,
    colorStart: 'brand-background-strong',
    colorEnd: 'static-transparent',
  },
  dots: {
    display: true,
    opacity: 20,
    size: '2',
    color: 'brand-on-background-weak',
  },
  grid: {
    display: false,
    opacity: 100,
    color: 'neutral-alpha-medium',
    width: '0.25rem',
    height: '0.25rem',
  },
  lines: {
    display: false,
    opacity: 100,
    color: 'neutral-alpha-weak',
    size: '16',
    thickness: 1,
    angle: 45,
  },
};

const schema: SchemaConfig = {
  logo: '/images/MPDEE-Development-logo-trans.png',
  type: 'Organization',
  name: 'MPDEE Development',
  description:
    'Professional web design and development services. Custom websites, e-commerce solutions, and digital platforms.',
  email: 'sendme@mpdee.info',
};

const sameAs: SameAsConfig = {};

export { display, routes, baseURL, fonts, style, schema, sameAs, effects };
