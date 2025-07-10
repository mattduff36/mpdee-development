import { Portfolio } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | MPDEE - Web Design & Development Projects',
  description: 'Explore our featured web design and development projects. See how we\'ve helped businesses grow their online presence with stunning photography portfolios, salon websites, and artistic showcases.',
  keywords: 'portfolio, web design projects, website development, photography portfolio, salon website, artist website, React projects, Next.js websites',
  openGraph: {
    title: 'Portfolio | MPDEE - Web Design & Development Projects',
    description: 'Explore our featured web design and development projects. See how we\'ve helped businesses grow their online presence with professional websites.',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Portfolio />
    </div>
  );
}
