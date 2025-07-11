import { Hero, Services, Portfolio, Contact } from '@/components';
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
  },
};

export default function Home() {
  return (
    <>
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
