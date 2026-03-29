import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const LOCALES = ['en', 'ja', 'th'];

describe('SEO Validation', () => {
  describe('Meta Tags', () => {
    LOCALES.forEach((locale) => {
      it(`should have proper meta tags for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Title
        const title = document.querySelector('title');
        expect(title).toBeTruthy();
        expect(title?.textContent).toBeTruthy();

        // Description
        const description = document.querySelector('meta[name="description"]');
        expect(description).toBeTruthy();
        expect(description?.getAttribute('content')).toBeTruthy();

        // Keywords
        const keywords = document.querySelector('meta[name="keywords"]');
        expect(keywords).toBeTruthy();
        expect(keywords?.getAttribute('content')).toContain('Chaipat Jainan');

        // Canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        expect(canonical).toBeTruthy();
        expect(canonical?.getAttribute('href')).toContain(locale);
      });
    });
  });

  describe('Open Graph Tags', () => {
    LOCALES.forEach((locale) => {
      it(`should have proper Open Graph tags for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // OG Title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        expect(ogTitle).toBeTruthy();
        expect(ogTitle?.getAttribute('content')).toBeTruthy();

        // OG Description
        const ogDescription = document.querySelector('meta[property="og:description"]');
        expect(ogDescription).toBeTruthy();

        // OG Image
        const ogImage = document.querySelector('meta[property="og:image"]');
        expect(ogImage).toBeTruthy();
        expect(ogImage?.getAttribute('content')).toContain('profile.webp');

        // OG URL
        const ogUrl = document.querySelector('meta[property="og:url"]');
        expect(ogUrl).toBeTruthy();
        expect(ogUrl?.getAttribute('content')).toContain(locale);

        // OG Type
        const ogType = document.querySelector('meta[property="og:type"]');
        expect(ogType?.getAttribute('content')).toBe('website');

        // OG Locale
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        expect(ogLocale).toBeTruthy();
      });
    });
  });

  describe('Twitter Card Tags', () => {
    LOCALES.forEach((locale) => {
      it(`should have proper Twitter Card tags for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Twitter Card
        const twitterCard = document.querySelector('meta[name="twitter:card"]');
        expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');

        // Twitter Title
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        expect(twitterTitle).toBeTruthy();

        // Twitter Description
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        expect(twitterDescription).toBeTruthy();

        // Twitter Image
        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        expect(twitterImage).toBeTruthy();
        expect(twitterImage?.getAttribute('content')).toContain('profile.webp');

        // Twitter Creator
        const twitterCreator = document.querySelector('meta[name="twitter:creator"]');
        expect(twitterCreator?.getAttribute('content')).toBe('@AppleBoiy');
      });
    });
  });

  describe('JSON-LD Structured Data', () => {
    LOCALES.forEach((locale) => {
      it(`should have valid JSON-LD structured data for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
        expect(jsonLdScript).toBeTruthy();

        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}');
        expect(jsonLd['@context']).toBe('https://schema.org');
        expect(jsonLd['@graph']).toBeTruthy();
        expect(Array.isArray(jsonLd['@graph'])).toBe(true);

        // Check Person schema
        const person = jsonLd['@graph'].find((item: any) => item['@type'] === 'Person');
        expect(person).toBeTruthy();
        expect(person.name).toBe('Chaipat Jainan');
        expect(person.jobTitle).toBeTruthy();
        expect(person.image).toBeTruthy();
        expect(person.sameAs).toBeTruthy();
        expect(Array.isArray(person.sameAs)).toBe(true);

        // Check WebSite schema
        const website = jsonLd['@graph'].find((item: any) => item['@type'] === 'WebSite');
        expect(website).toBeTruthy();
        expect(website.name).toBeTruthy();
        expect(website.url).toBeTruthy();
        expect(website.inLanguage).toBe(locale);
      });
    });
  });

  describe('Alternate Language Links', () => {
    LOCALES.forEach((locale) => {
      it(`should have alternate language links for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const alternates = document.querySelectorAll('link[rel="alternate"]');
        expect(alternates.length).toBeGreaterThanOrEqual(LOCALES.length);

        LOCALES.forEach((lang) => {
          const alternate = Array.from(alternates).find(
            (link) => (link as Element).getAttribute('hreflang') === lang
          );
          expect(alternate).toBeTruthy();
          expect((alternate as Element)?.getAttribute('href')).toContain(`/${lang}`);
        });
      });
    });
  });

  describe('Robots Meta', () => {
    LOCALES.forEach((locale) => {
      it(`should allow indexing for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const robots = document.querySelector('meta[name="robots"]');
        const content = robots?.getAttribute('content') || '';
        
        // Should not contain noindex or nofollow
        expect(content).not.toContain('noindex');
        expect(content).not.toContain('nofollow');
      });
    });
  });

  describe('HTML Lang Attribute', () => {
    LOCALES.forEach((locale) => {
      it(`should have correct lang attribute for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const htmlElement = document.querySelector('html');
        expect(htmlElement?.getAttribute('lang')).toBe(locale);
      });
    });
  });

  describe('Sitemap and Robots.txt', () => {
    it('should have accessible sitemap.xml', async () => {
      const response = await fetch(`${SITE_URL}/sitemap.xml`);
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('xml');
      
      const xml = await response.text();
      expect(xml).toContain('<?xml');
      expect(xml).toContain('<urlset');
      
      // Should contain all locales
      LOCALES.forEach((locale) => {
        expect(xml).toContain(`/${locale}`);
      });
    });

    it('should have accessible robots.txt', async () => {
      const response = await fetch(`${SITE_URL}/robots.txt`);
      expect(response.status).toBe(200);
      
      const text = await response.text();
      expect(text.toLowerCase()).toContain('user-agent');
      expect(text).toContain('Sitemap');
    });
  });

  describe('Performance and Best Practices', () => {
    LOCALES.forEach((locale) => {
      it(`should have proper viewport meta tag for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const viewport = document.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();
        expect(viewport?.getAttribute('content')).toContain('width=device-width');
      });

      it(`should have charset meta tag for ${locale} locale`, async () => {
        const response = await fetch(`${SITE_URL}/${locale}`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const charset = document.querySelector('meta[charset]');
        expect(charset).toBeTruthy();
      });
    });
  });
});
