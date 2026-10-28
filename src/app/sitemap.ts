import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/work',
    '/services',
    '/contact',
    '/privacy',
    ...projects.map(project => '/work/' + project.slug),
  ];
  return paths.map(path => ({
    url: 'https://development.mpdee.co.uk' + path,
    lastModified: new Date('2026-10-28'),
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : path.startsWith('/work') ? 0.8 : 0.6,
  }));
}
