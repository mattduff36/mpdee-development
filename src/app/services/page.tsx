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
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Services />
    </div>
  );
}
