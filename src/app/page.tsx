import { Hero, Services, Portfolio, Contact } from '@/components';
import ScrollToTop from '@/components/ScrollToTop';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | MPDEE - Professional Web Design & Development',
  description:
    'Professional web design and development services. We create beautiful, functional websites that drive results for your business. Expert UI/UX design and full-stack development.',
  keywords:
    'web design, web development, professional website, UI/UX design, full-stack development, business websites',
  openGraph: {
    title: 'Home | MPDEE - Professional Web Design & Development',
    description:
      'Professional web design and development services. We create beautiful, functional websites that drive results for your business.',
    type: 'website',
    url: 'https://development.mpdee.co.uk',
    siteName: 'MPDEE',
    images: [
      {
        url: '/images/mpdee_logo_with_text.png',
        width: 1200,
        height: 630,
        alt: 'MPDEE - Professional Web Design & Development',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | MPDEE - Professional Web Design & Development',
    description:
      'Professional web design and development services. We create beautiful, functional websites that drive results for your business.',
    images: ['/images/mpdee_logo_with_text.png'],
    creator: '@mpdee_dev',
    site: '@mpdee_dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function Home() {
  return (
    <>
      <ScrollToTop />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Contact Section */}
      <Contact />
    </>
  );
}
