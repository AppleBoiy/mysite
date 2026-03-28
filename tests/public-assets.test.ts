/**
 * Public Asset Structure Compatibility Tests
 * 
 * Validates: Requirements 15.3
 * Task: 23.4 - Verify public asset structure
 * 
 * These tests ensure that all public assets are in the correct locations
 * and that asset URLs remain unchanged from the legacy React/Vite app.
 */

import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'fs';
import { join } from 'path';

describe('Public Asset Structure', () => {
  const PUBLIC_DIR = join(process.cwd(), 'public');

  describe('Core assets exist', () => {
    it('should have favicon files in public root', () => {
      const faviconFiles = [
        'favicon.ico',
        'favicon.svg',
        'favicon-192.png',
        'favicon-512.png',
      ];

      faviconFiles.forEach(file => {
        const filePath = join(PUBLIC_DIR, file);
        expect(existsSync(filePath), `${file} should exist in public/`).toBe(true);
      });
    });

    it('should have apple-touch-icon in public root', () => {
      const appleTouchIcon = join(PUBLIC_DIR, 'apple-touch-icon.png');
      expect(existsSync(appleTouchIcon), 'apple-touch-icon.png should exist').toBe(true);
    });

    it('should have PWA manifest in public root', () => {
      const manifest = join(PUBLIC_DIR, 'manifest.json');
      expect(existsSync(manifest), 'manifest.json should exist').toBe(true);
    });

    it('should have profile images in public root', () => {
      const profileImages = [
        'profile.jpeg',
        'profile.webp',
      ];

      profileImages.forEach(file => {
        const filePath = join(PUBLIC_DIR, file);
        expect(existsSync(filePath), `${file} should exist in public/`).toBe(true);
      });
    });

    it('should have CV PDF in public root', () => {
      const cvPath = join(PUBLIC_DIR, 'cv.pdf');
      expect(existsSync(cvPath), 'cv.pdf should exist').toBe(true);
    });
  });

  describe('PWA assets exist', () => {
    it('should have service worker file', () => {
      const swPath = join(PUBLIC_DIR, 'sw.js');
      expect(existsSync(swPath), 'sw.js should exist').toBe(true);
    });

    it('should have workbox file', () => {
      // Workbox file may have a hash in the name
      const files = require('fs').readdirSync(PUBLIC_DIR);
      const hasWorkbox = files.some((file: string) => file.startsWith('workbox-'));
      expect(hasWorkbox, 'workbox file should exist').toBe(true);
    });
  });

  describe('Documents folder structure', () => {
    it('should have documents folder', () => {
      const documentsPath = join(PUBLIC_DIR, 'documents');
      expect(existsSync(documentsPath), 'documents/ folder should exist').toBe(true);
    });

    it('should have PDF files in documents folder', () => {
      const documentsPath = join(PUBLIC_DIR, 'documents');
      if (existsSync(documentsPath)) {
        const files = require('fs').readdirSync(documentsPath);
        const hasPdfs = files.some((file: string) => file.endsWith('.pdf'));
        expect(hasPdfs, 'documents/ should contain PDF files').toBe(true);
      }
    });
  });

  describe('Server configuration files', () => {
    it('should have .htaccess for Apache servers', () => {
      const htaccessPath = join(PUBLIC_DIR, '.htaccess');
      expect(existsSync(htaccessPath), '.htaccess should exist').toBe(true);
    });

    it('should have _redirects for Netlify/Vercel', () => {
      const redirectsPath = join(PUBLIC_DIR, '_redirects');
      expect(existsSync(redirectsPath), '_redirects should exist').toBe(true);
    });
  });

  describe('Asset URL compatibility', () => {
    it('should maintain root-level asset URLs', () => {
      // These URLs should work without any path changes
      const rootAssets = [
        '/favicon.ico',
        '/favicon.svg',
        '/manifest.json',
        '/profile.jpeg',
        '/profile.webp',
        '/cv.pdf',
        '/apple-touch-icon.png',
      ];

      rootAssets.forEach(url => {
        const filePath = join(PUBLIC_DIR, url.substring(1)); // Remove leading /
        expect(existsSync(filePath), `Asset ${url} should be accessible`).toBe(true);
      });
    });

    it('should maintain documents folder URLs', () => {
      // Documents should be accessible at /documents/*
      const documentsPath = join(PUBLIC_DIR, 'documents');
      expect(existsSync(documentsPath), '/documents/ URLs should work').toBe(true);
    });

    it('should not require /public prefix in URLs', () => {
      // In Next.js, public assets are served from root, not /public
      // This is the same as Vite behavior
      
      // Example: /profile.jpeg NOT /public/profile.jpeg
      const correctUrl = '/profile.jpeg';
      const incorrectUrl = '/public/profile.jpeg';
      
      expect(correctUrl).not.toContain('/public/');
      expect(incorrectUrl).toContain('/public/');
      
      // Verify the file exists at the correct location
      const filePath = join(PUBLIC_DIR, 'profile.jpeg');
      expect(existsSync(filePath)).toBe(true);
    });
  });

  describe('Asset file sizes and types', () => {
    it('should have reasonably sized favicon files', () => {
      const faviconFiles = [
        { name: 'favicon-192.png', maxSize: 50 * 1024 }, // 50KB
        { name: 'favicon-512.png', maxSize: 150 * 1024 }, // 150KB
      ];

      faviconFiles.forEach(({ name, maxSize }) => {
        const filePath = join(PUBLIC_DIR, name);
        if (existsSync(filePath)) {
          const stats = statSync(filePath);
          expect(stats.size, `${name} should be under ${maxSize} bytes`).toBeLessThan(maxSize);
        }
      });
    });

    it('should have valid manifest.json structure', () => {
      const manifestPath = join(PUBLIC_DIR, 'manifest.json');
      if (existsSync(manifestPath)) {
        const manifestContent = require('fs').readFileSync(manifestPath, 'utf-8');
        const manifest = JSON.parse(manifestContent);
        
        // Verify required PWA manifest fields
        expect(manifest).toHaveProperty('name');
        expect(manifest).toHaveProperty('short_name');
        expect(manifest).toHaveProperty('icons');
        expect(manifest).toHaveProperty('start_url');
        expect(manifest).toHaveProperty('display');
        expect(manifest).toHaveProperty('theme_color');
        expect(manifest).toHaveProperty('background_color');
      }
    });
  });

  describe('Legacy compatibility', () => {
    it('should maintain same public folder structure as Vite app', () => {
      // Both Vite and Next.js serve files from /public at the root URL
      // This ensures bookmarks and external links continue to work
      
      const expectedStructure = {
        root: [
          'favicon.ico',
          'favicon.svg',
          'manifest.json',
          'profile.jpeg',
          'cv.pdf',
        ],
        folders: [
          'documents',
        ],
      };

      // Verify root files
      expectedStructure.root.forEach(file => {
        const filePath = join(PUBLIC_DIR, file);
        expect(existsSync(filePath), `${file} should exist in public root`).toBe(true);
      });

      // Verify folders
      expectedStructure.folders.forEach(folder => {
        const folderPath = join(PUBLIC_DIR, folder);
        expect(existsSync(folderPath), `${folder}/ should exist in public`).toBe(true);
      });
    });

    it('should not break external links to assets', () => {
      // External links that may exist:
      // - https://example.com/cv.pdf
      // - https://example.com/profile.jpeg
      // - https://example.com/documents/paper.pdf
      
      // These should all continue to work without redirects
      const externallyLinkedAssets = [
        'cv.pdf',
        'profile.jpeg',
        'profile.webp',
      ];

      externallyLinkedAssets.forEach(asset => {
        const filePath = join(PUBLIC_DIR, asset);
        expect(existsSync(filePath), `External link to /${asset} should work`).toBe(true);
      });
    });

    it('should not introduce new asset paths that break bookmarks', () => {
      // Verify no assets have been moved to new locations
      // All assets should remain in their original locations
      
      // Example: profile.jpeg should NOT be moved to /images/profile.jpeg
      const profileInRoot = join(PUBLIC_DIR, 'profile.jpeg');
      const profileInImages = join(PUBLIC_DIR, 'images', 'profile.jpeg');
      
      expect(existsSync(profileInRoot), 'profile.jpeg should remain in root').toBe(true);
      expect(existsSync(profileInImages), 'profile.jpeg should NOT be in /images').toBe(false);
    });
  });

  describe('Next.js specific considerations', () => {
    it('should not have _next folder in public directory', () => {
      // _next is a build output folder, not a public asset
      const nextFolder = join(PUBLIC_DIR, '_next');
      expect(existsSync(nextFolder), '_next should not be in public/').toBe(false);
    });

    it('should allow Next.js Image optimization for public assets', () => {
      // Next.js can optimize images in /public
      // Verify images exist and are accessible
      const images = ['profile.jpeg', 'profile.webp'];
      
      images.forEach(image => {
        const imagePath = join(PUBLIC_DIR, image);
        expect(existsSync(imagePath), `${image} should be optimizable by Next.js`).toBe(true);
      });
    });

    it('should maintain static file serving behavior', () => {
      // Both Vite and Next.js serve public files as static assets
      // No processing, no bundling, direct serving
      
      // Files that should be served as-is:
      const staticFiles = [
        'cv.pdf',
        'manifest.json',
        '.htaccess',
        '_redirects',
      ];

      staticFiles.forEach(file => {
        const filePath = join(PUBLIC_DIR, file);
        expect(existsSync(filePath), `${file} should be served statically`).toBe(true);
      });
    });
  });

  describe('Asset documentation', () => {
    it('should have README documenting public assets', () => {
      const readmePath = join(PUBLIC_DIR, 'README.md');
      expect(existsSync(readmePath), 'public/README.md should exist').toBe(true);
    });
  });
});
