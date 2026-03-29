# Implementation Plan: Next.js Migration

## Overview

This plan outlines the migration from React/Vite to Next.js 14+ with App Router, implementing server-side rendering for improved SEO while preserving all existing features including PWA support, internationalization, theme management, and analytics.

## Tasks

- [x] 1. Initialize Next.js project and configure core infrastructure
  - Create new Next.js 14+ project with App Router and TypeScript
  - Configure Tailwind CSS with existing configuration
  - Set up ESLint and TypeScript configurations
  - Install required dependencies (next-themes, next-pwa, Radix UI, Framer Motion)
  - Create folder structure following App Router conventions
  - _Requirements: 13.1, 13.2, 13.3_

- [ ] 2. Implement internationalization system
  - [x] 2.1 Create i18n configuration and middleware
    - Create lib/i18n/settings.ts with locale configuration
    - Create middleware.ts for locale detection and routing
    - Implement server-side i18n utilities in lib/i18n/server.ts
    - Implement client-side i18n utilities in lib/i18n/client.ts
    - Move translation files to locales/ directory
    - _Requirements: 2.1, 2.4, 2.7_
  
  - [ ]* 2.2 Write property test for language selection persistence
    - **Property 2: Language selection persistence round-trip**
    - **Validates: Requirements 2.2**
  
  - [ ]* 2.3 Write property test for browser language detection
    - **Property 3: Browser language detection applies supported locales**
    - **Validates: Requirements 2.3**
  
  - [ ]* 2.4 Write property test for locale-based routing
    - **Property 4: Locale-based routing accessibility**
    - **Validates: Requirements 2.4**
  
  - [ ]* 2.5 Write property test for server-rendered locale content
    - **Property 5: Server-rendered content matches requested locale**
    - **Validates: Requirements 2.5**
  
  - [ ]* 2.6 Write property test for language changes without reload
    - **Property 6: Language changes without page reload**
    - **Validates: Requirements 2.6**

- [ ] 3. Set up theme management with SSR support
  - [x] 3.1 Implement theme provider and detection
    - Create app/[locale]/layout.tsx with theme detection from cookies
    - Integrate next-themes ThemeProvider with SSR support
    - Implement theme cookie reading on server side
    - Configure suppressHydrationWarning for theme class
    - _Requirements: 3.1, 3.3, 3.5_
  
  - [ ]* 3.2 Write property test for theme persistence
    - **Property 7: Theme selection persistence round-trip**
    - **Validates: Requirements 3.2**
  
  - [ ]* 3.3 Write property test for system theme propagation
    - **Property 8: System theme changes propagate when system mode selected**
    - **Validates: Requirements 3.4**
  
  - [ ]* 3.4 Write property test for server-rendered theme class
    - **Property 9: Server-rendered theme class matches preference**
    - **Validates: Requirements 3.5**

- [ ] 4. Configure PWA with next-pwa
  - [x] 4.1 Set up PWA configuration and service worker
    - Install and configure next-pwa in next.config.js
    - Configure Workbox runtime caching strategies
    - Set up cache-first for static assets, network-first for dynamic content
    - Ensure manifest.json is properly configured
    - _Requirements: 4.1, 4.2, 4.4, 4.6_
  
  - [ ]* 4.2 Write property test for offline content serving
    - **Property 10: Offline content serving from cache**
    - **Validates: Requirements 4.3**

- [x] 5. Checkpoint - Verify core infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Create root layout and page structure
  - [x] 6.1 Implement root and locale layouts
    - Create app/[locale]/layout.tsx with HTML structure and providers
    - Integrate Analytics and SpeedInsights components
    - Set up error.tsx and not-found.tsx pages
    - Configure metadata generation for SEO
    - _Requirements: 1.1, 1.2, 1.3, 8.1, 8.2_
  
  - [ ]* 6.2 Write property test for server-rendered content
    - **Property 1: Server-rendered pages contain complete content**
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ]* 6.3 Write unit tests for metadata generation
    - Test SEO metadata includes title, description, Open Graph tags
    - Test structured data (JSON-LD) generation
    - _Requirements: 1.2, 1.3_

- [ ] 7. Migrate layout components
  - [x] 7.1 Convert Navbar to Next.js with Link components
    - Migrate Navbar component, mark as 'use client'
    - Replace React Router Link with next/link
    - Preserve active state and navigation logic
    - _Requirements: 7.1, 7.4_
  
  - [x] 7.2 Migrate Footer as Server Component
    - Convert Footer to Server Component (no 'use client' needed)
    - Update any links to use next/link
    - _Requirements: 7.1_
  
  - [x] 7.3 Migrate interactive UI components
    - Migrate ThemeToggle, LanguageSwitcher, SearchBar as Client Components
    - Migrate SkipToContent for accessibility
    - Migrate ScrollProgress, ScrollToTop with 'use client'
    - _Requirements: 7.1, 11.2_

- [ ] 8. Migrate page components
  - [x] 8.1 Create Home page with SSG
    - Create app/[locale]/page.tsx for home route
    - Migrate HeroSection, AboutSection, QuickSummary
    - Implement dynamic imports for below-fold sections
    - Configure metadata for home page
    - _Requirements: 1.1, 5.1, 9.2_
  
  - [x] 8.2 Create Contact page with SSR
    - Create app/[locale]/contact/page.tsx
    - Migrate ContactSection with form handling
    - Implement input sanitization for security
    - _Requirements: 5.1, 14.2_
  
  - [x] 8.3 Create Projects listing page
    - Create app/[locale]/projects/page.tsx
    - Migrate ProjectsSection component
    - Configure metadata for projects page
    - _Requirements: 5.1_

- [ ] 9. Implement dynamic routes
  - [x] 9.1 Create project detail dynamic route
    - Create app/[locale]/projects/[projectId]/page.tsx
    - Implement generateStaticParams for all projects
    - Migrate ProjectPreview component
    - Configure metadata generation per project
    - _Requirements: 5.1, 5.3_
  
  - [x] 9.2 Create publication detail dynamic route
    - Create app/[locale]/publication/[publicationId]/page.tsx
    - Implement generateStaticParams for all publications
    - Migrate PublicationPreview component
    - Configure metadata generation per publication
    - _Requirements: 5.2, 5.3_
  
  - [ ]* 9.3 Write property test for dynamic route accessibility
    - **Property 11: Dynamic route accessibility**
    - **Validates: Requirements 5.1, 5.2**
  
  - [ ]* 9.4 Write property test for client-side navigation
    - **Property 12: Client-side navigation without page reload**
    - **Validates: Requirements 5.4**
  
  - [ ]* 9.5 Write property test for 404 handling
    - **Property 13: Non-existent routes return 404**
    - **Validates: Requirements 5.5**
  
  - [ ]* 9.6 Write property test for scroll position preservation
    - **Property 14: Scroll position preservation on back navigation**
    - **Validates: Requirements 5.6**

- [x] 10. Checkpoint - Verify routing and pages
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Migrate content section components
  - [x] 11.1 Migrate experience and skills sections
    - Migrate ExperienceSection, SkillsSection with dynamic imports
    - Implement skeleton loaders for lazy-loaded sections
    - Mark as Client Components if using animations
    - _Requirements: 7.1, 9.2_
  
  - [x] 11.2 Migrate projects and publications sections
    - Migrate ProjectsSection, PublicationsSection, AcademicContributions
    - Preserve filtering and search functionality
    - _Requirements: 7.1_
  
  - [x] 11.3 Migrate interactive feature components
    - Migrate AvailabilityBanner, FloatingAvailabilityBadge
    - Migrate ShareButtons, Breadcrumbs
    - Mark all as Client Components
    - _Requirements: 7.1_

- [ ] 12. Convert images to Next.js Image component
  - [x] 12.1 Replace OptimizedImage with next/image
    - Replace all OptimizedImage usages with next/image
    - Configure image sizes and formats in next.config.js
    - Add blur placeholders for key images
    - Implement lazy loading for below-fold images
    - _Requirements: 6.1, 6.2, 6.3, 6.5_
  
  - [ ]* 12.2 Write property test for image optimization
    - **Property 15: Image optimization generates multiple sizes**
    - **Validates: Requirements 6.1, 6.4**
  
  - [ ]* 12.3 Write property test for modern image formats
    - **Property 16: Modern image format serving based on browser support**
    - **Validates: Requirements 6.2**
  
  - [ ]* 12.4 Write property test for lazy loading
    - **Property 17: Below-fold images use lazy loading**
    - **Validates: Requirements 6.3**
  
  - [ ]* 12.5 Write property test for blur placeholders
    - **Property 18: Blur placeholders present for configured images**
    - **Validates: Requirements 6.5**

- [ ] 13. Migrate custom hooks and utilities
  - [x] 13.1 Migrate custom hooks to Next.js environment
    - Migrate useNetworkStatus, useLazyLoad, useHaptic, usePullToRefresh
    - Ensure hooks work with Client Components
    - Add 'use client' directives where needed
    - _Requirements: 7.5_
  
  - [ ]* 13.2 Write property test for custom hooks
    - **Property 19: Custom hooks function correctly in Next.js environment**
    - **Validates: Requirements 7.5**
  
  - [x] 13.3 Migrate utility functions
    - Migrate lib/utils.js and lib/query-client.js
    - Migrate downloadHelper and other utilities
    - _Requirements: 7.1_

- [ ] 14. Implement error handling
  - [x] 14.1 Create error boundaries
    - Create app/error.tsx for root error boundary
    - Migrate SectionErrorBoundary component
    - Implement error logging in development mode
    - _Requirements: 12.1, 12.2, 12.5_
  
  - [ ]* 14.2 Write property test for error boundary isolation
    - **Property 20: Error boundaries catch and isolate component errors**
    - **Validates: Requirements 7.6, 12.2**
  
  - [x] 14.3 Implement API error handling with retry
    - Create fetchWithRetry utility for API requests
    - Implement exponential backoff for retries
    - _Requirements: 12.4_
  
  - [ ]* 14.4 Write property test for API retry
    - **Property 29: API request retry on failure**
    - **Validates: Requirements 12.4**
  
  - [ ]* 14.5 Write property test for development error logging
    - **Property 30: Development mode error logging**
    - **Validates: Requirements 12.5**
  
  - [ ]* 14.6 Write property test for lazy-load fallback
    - **Property 31: Lazy-loaded component fallback on failure**
    - **Validates: Requirements 12.6**

- [ ] 15. Migrate context providers
  - [x] 15.1 Migrate LiteModeContext
    - Migrate LiteModeContext and provider as Client Component
    - Ensure lite mode disables animations correctly
    - Preserve localStorage persistence
    - _Requirements: 7.7, 9.7_
  
  - [ ]* 15.2 Write property test for lite mode animation disabling
    - **Property 22: Lite mode disables animations**
    - **Validates: Requirements 9.7**

- [ ] 16. Checkpoint - Verify component migration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 17. Implement analytics tracking
  - [x] 17.1 Integrate Vercel Analytics and Speed Insights
    - Add Analytics and SpeedInsights to root layout
    - Configure privacy settings and GDPR compliance
    - Ensure async loading to avoid blocking
    - _Requirements: 8.1, 8.2, 8.4, 8.5_
  
  - [ ]* 17.2 Write property test for analytics tracking
    - **Property 21: Analytics tracking on all navigation types**
    - **Validates: Requirements 8.3**

- [ ] 18. Configure security headers and CSP
  - [x] 18.1 Implement security headers in next.config.js
    - Configure Content-Security-Policy header
    - Add X-Content-Type-Options, X-Frame-Options headers
    - Configure Referrer-Policy and Permissions-Policy
    - _Requirements: 10.2, 14.1, 14.6_
  
  - [ ]* 18.2 Write property test for security headers
    - **Property 23: Security headers present on all responses**
    - **Validates: Requirements 10.2, 14.1, 14.6**
  
  - [x] 18.3 Implement input sanitization
    - Create sanitization utilities using DOMPurify
    - Apply sanitization to contact form inputs
    - _Requirements: 14.2_
  
  - [ ]* 18.4 Write property test for input sanitization
    - **Property 32: Input sanitization in forms**
    - **Validates: Requirements 14.2**
  
  - [ ]* 18.5 Write property test for HTTPS external resources
    - **Property 33: External resources use HTTPS**
    - **Validates: Requirements 14.3**

- [ ] 19. Configure caching and performance optimization
  - [x] 19.1 Set up cache headers and optimization
    - Configure cache-control headers for static assets
    - Set up image optimization in next.config.js
    - Configure code splitting and bundle optimization
    - Implement prefetching for linked pages
    - _Requirements: 10.3, 9.2, 9.3, 9.6_
  
  - [ ]* 19.2 Write property test for cache headers
    - **Property 24: Cache headers present on static assets**
    - **Validates: Requirements 10.3**

- [ ] 20. Implement accessibility features
  - [x] 20.1 Ensure ARIA labels and keyboard navigation
    - Verify all interactive elements have ARIA labels
    - Test keyboard navigation for all features
    - Implement route change announcements for screen readers
    - _Requirements: 11.3, 11.6, 11.7_
  
  - [ ]* 20.2 Write property test for ARIA labels
    - **Property 25: Interactive elements have ARIA labels**
    - **Validates: Requirements 11.3**
  
  - [ ]* 20.3 Write property test for heading hierarchy
    - **Property 26: Heading hierarchy is valid**
    - **Validates: Requirements 11.4**
  
  - [ ]* 20.4 Write property test for keyboard navigation
    - **Property 27: Keyboard navigation for interactive features**
    - **Validates: Requirements 11.6**
  
  - [ ]* 20.5 Write property test for route change announcements
    - **Property 28: Route changes announced to screen readers**
    - **Validates: Requirements 11.7**

- [ ] 21. Generate sitemap and robots.txt
  - [x] 21.1 Create sitemap generation
    - Implement sitemap.xml generation with all routes
    - Include all static and dynamic routes with locales
    - Configure lastmod and priority values
    - _Requirements: 1.5_
  
  - [x] 21.2 Create robots.txt
    - Generate robots.txt with appropriate crawling directives
    - Allow all search engines to crawl
    - _Requirements: 1.6_

- [ ] 22. Configure Vercel deployment
  - [x] 22.1 Set up Vercel configuration
    - Create or update vercel.json with deployment settings
    - Configure environment variables
    - Set up automatic deployments on git push
    - Configure Edge Network settings
    - _Requirements: 10.1, 10.4, 10.5, 10.6_
  
  - [x] 22.2 Validate environment variables
    - Create environment variable validation using zod
    - Ensure all required variables are present at build time
    - _Requirements: 14.5_

- [ ] 23. Ensure backward compatibility
  - [x] 23.1 Verify URL route preservation
    - Test all legacy URLs work without redirects
    - Ensure bookmarks and external links remain valid
    - _Requirements: 15.1, 15.6_
  
  - [ ]* 23.2 Write property test for URL route preservation
    - **Property 35: URL route preservation from legacy app**
    - **Validates: Requirements 15.1, 15.6**
  
  - [x] 23.3 Verify localStorage key compatibility
    - Ensure theme and language localStorage keys match legacy app
    - Test preference migration from old to new app
    - _Requirements: 15.2_
  
  - [x] 23.4 Verify public asset structure
    - Ensure all public assets are in correct locations
    - Test asset URLs remain unchanged
    - _Requirements: 15.3_

- [ ] 24. Final checkpoint and validation
  - Run all unit tests and property tests
  - Perform Lighthouse audit (target score 90+)
  - Validate PWA functionality with offline testing
  - Test all locales and theme combinations
  - Verify analytics tracking works correctly
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation throughout migration
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- All code examples use TypeScript/JavaScript as specified in the design document
