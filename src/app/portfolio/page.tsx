import { Portfolio } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | MPDEE - Web Design & Development Projects',
  description:
    "Explore our featured web design and development projects. See how we've helped businesses grow their online presence with stunning photography portfolios, salon websites, and artistic showcases.",
  keywords:
    'portfolio, web design projects, website development, photography portfolio, salon website, artist website, React projects, Next.js websites',
  openGraph: {
    title: 'Portfolio | MPDEE - Web Design & Development Projects',
    description:
      "Explore our featured web design and development projects. See how we've helped businesses grow their online presence with professional websites.",
    type: 'website',
    url: 'https://mpdee.vercel.app/portfolio',
    siteName: 'MPDEE',
    images: [
      {
        url: '/images/LBP-Logo.png',
        width: 1200,
        height: 630,
        alt: 'MPDEE Portfolio - Featured Web Design Projects',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | MPDEE - Web Design & Development Projects',
    description:
      "Explore our featured web design and development projects. See how we've helped businesses grow their online presence.",
    images: ['/images/LBP-Logo.png'],
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

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Portfolio />
    </div>
  );
}
