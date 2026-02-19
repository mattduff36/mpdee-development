import { MetadataRoute } from 'next';
import { baseURL, routes } from '@/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = baseURL.startsWith('http') ? baseURL : `https://${baseURL}`;

  const routeEntries: MetadataRoute.Sitemap = Object.entries(routes)
    .filter(([, enabled]) => enabled)
    .map(([path]) => ({
      url: `${url}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : 0.8,
    }));

  return routeEntries;
}
