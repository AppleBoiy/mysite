import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/settings';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chaipat.cc';
  
  // Project IDs from the application
  const projectIds = ['ags', 'eza-alias'];
  
  // Publication IDs from the application
  const publicationIds = ['ontology-phsrs', 'kg-rag-jaist'];
  
  // Static routes
  const staticRoutes = ['', '/contact', '/projects'];
  
  // Generate sitemap entries for all locales and routes
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  // Add static routes for each locale
  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
    
    // Add project detail pages
    projectIds.forEach((projectId) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/projects/${projectId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
    
    // Add publication detail pages
    publicationIds.forEach((publicationId) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/publication/${publicationId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });
  
  return sitemapEntries;
}
