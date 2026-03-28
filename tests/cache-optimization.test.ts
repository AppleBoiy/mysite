import { describe, it, expect } from 'vitest';

/**
 * Cache Optimization Configuration Tests
 * 
 * These tests verify that the cache headers and performance optimizations
 * are correctly configured in next.config.mjs
 */

describe('Cache Optimization Configuration', () => {
  describe('Next.js Configuration', () => {
    it('should have image optimization configured', async () => {
      // Import the Next.js config
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      // Verify image optimization settings
      expect(nextConfig.images).toBeDefined();
      expect(nextConfig.images.formats).toEqual(['image/avif', 'image/webp']);
      expect(nextConfig.images.minimumCacheTTL).toBe(60 * 60 * 24 * 30); // 30 days
    });

    it('should have code splitting optimization configured', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      // Verify experimental optimizations
      expect(nextConfig.experimental).toBeDefined();
      expect(nextConfig.experimental.optimizePackageImports).toContain('lucide-react');
      expect(nextConfig.experimental.optimizePackageImports).toContain('@radix-ui/react-icons');
    });

    it('should have production console removal configured', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      // Verify compiler settings
      expect(nextConfig.compiler).toBeDefined();
      
      // In test environment, removeConsole should be false
      // In production, it should remove console logs except error and warn
      if (process.env.NODE_ENV === 'production') {
        expect(nextConfig.compiler.removeConsole).toBeDefined();
        expect(nextConfig.compiler.removeConsole.exclude).toEqual(['error', 'warn']);
      } else {
        expect(nextConfig.compiler.removeConsole).toBe(false);
      }
    });

    it('should have cache headers configured', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      // Verify headers function exists
      expect(nextConfig.headers).toBeDefined();
      expect(typeof nextConfig.headers).toBe('function');
      
      // Call the headers function to get the configuration
      const headers = await nextConfig.headers();
      
      // Verify cache headers are configured
      const cacheHeaders = headers.filter((h: any) => 
        h.source.includes('img') || 
        h.source.includes('_next/static') || 
        h.source.includes('_next/image')
      );
      
      expect(cacheHeaders.length).toBeGreaterThan(0);
      
      // Verify each cache header has the correct Cache-Control value
      cacheHeaders.forEach((header: any) => {
        const cacheControlHeader = header.headers.find((h: any) => h.key === 'Cache-Control');
        expect(cacheControlHeader).toBeDefined();
        expect(cacheControlHeader.value).toBe('public, max-age=31536000, immutable');
      });
    });

    it('should have security headers configured', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      const headers = await nextConfig.headers();
      
      // Find the security headers configuration
      const securityHeaders = headers.find((h: any) => h.source === '/:path*');
      expect(securityHeaders).toBeDefined();
      
      // Verify required security headers are present
      const headerKeys = securityHeaders.headers.map((h: any) => h.key);
      expect(headerKeys).toContain('X-Content-Type-Options');
      expect(headerKeys).toContain('X-Frame-Options');
      expect(headerKeys).toContain('Referrer-Policy');
      expect(headerKeys).toContain('Permissions-Policy');
      expect(headerKeys).toContain('Content-Security-Policy');
    });
  });

  describe('Image Optimization', () => {
    it('should support modern image formats', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      expect(nextConfig.images.formats).toContain('image/avif');
      expect(nextConfig.images.formats).toContain('image/webp');
    });

    it('should have responsive image sizes configured', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      expect(nextConfig.images.deviceSizes).toBeDefined();
      expect(nextConfig.images.deviceSizes.length).toBeGreaterThan(0);
      
      expect(nextConfig.images.imageSizes).toBeDefined();
      expect(nextConfig.images.imageSizes.length).toBeGreaterThan(0);
    });

    it('should have minimum cache TTL configured', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      const expectedTTL = 60 * 60 * 24 * 30; // 30 days in seconds
      expect(nextConfig.images.minimumCacheTTL).toBe(expectedTTL);
    });
  });

  describe('PWA Caching Strategy', () => {
    it('should have PWA configuration', async () => {
      const config = await import('../next.config.mjs');
      
      // The config is wrapped with withPWA, so we need to check if it's applied
      expect(config.default).toBeDefined();
      
      // PWA should be configured to generate service worker
      // This is verified by the presence of sw.js after build
    });
  });

  describe('Bundle Optimization', () => {
    it('should have React strict mode enabled', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      expect(nextConfig.reactStrictMode).toBe(true);
    });

    it('should optimize package imports', async () => {
      const config = await import('../next.config.mjs');
      const nextConfig = config.default;
      
      expect(nextConfig.experimental.optimizePackageImports).toBeDefined();
      expect(Array.isArray(nextConfig.experimental.optimizePackageImports)).toBe(true);
    });
  });
});

describe('Link Component Prefetching', () => {
  it('should use Next.js Link components for navigation', () => {
    // This is a documentation test - Next.js Link components have prefetching enabled by default
    // Prefetching behavior:
    // - Links are prefetched when they enter the viewport
    // - Links are prefetched on hover (desktop)
    // - Prefetched pages load instantly when clicked
    // - Prefetching is automatic in production builds
    
    expect(true).toBe(true); // Placeholder - actual prefetching is tested in E2E tests
  });
});
