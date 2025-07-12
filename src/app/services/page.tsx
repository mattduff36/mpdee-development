import { Services } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | MPDEE - Web Design & Development Solutions',
  description:
    'Comprehensive web solutions tailored to your business needs. From essential websites for startups to premium solutions for established businesses, plus Progressive Web Apps and media partnerships.',
  keywords:
    'web design services, website development, business websites, essential websites, premium web solutions, progressive web apps, media partnerships, CMS websites, e-commerce development',
  openGraph: {
    title: 'Services | MPDEE - Web Design & Development Solutions',
    description:
      'Comprehensive web solutions tailored to your business needs. From essential websites for startups to premium solutions for established businesses.',
    type: 'website',
    url: 'https://mpdee.vercel.app/services',
    siteName: 'MPDEE',
    images: [
      {
        url: '/images/mpdee_logo_with_text.png',
        width: 1200,
        height: 630,
        alt: 'MPDEE Services - Web Design & Development Solutions',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | MPDEE - Web Design & Development Solutions',
    description:
      'Comprehensive web solutions tailored to your business needs. From essential websites for startups to premium solutions for established businesses.',
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
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Services />
    </div>
  );
}
