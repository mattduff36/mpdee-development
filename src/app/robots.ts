import { MetadataRoute } from 'next';
import { baseURL } from '@/resources';

export default function robots(): MetadataRoute.Robots {
  const url = baseURL.startsWith('http') ? baseURL : `https://${baseURL}`;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'],
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
