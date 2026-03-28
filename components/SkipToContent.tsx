'use client';

import { useTranslation } from '@/lib/i18n/client';

/**
 * SkipToContent component for keyboard accessibility
 * 
 * Provides a skip link that allows keyboard users to bypass navigation
 * and jump directly to the main content. The link is visually hidden
 * but becomes visible when focused via keyboard navigation.
 * 
 * Requirements: 11.2 - Skip-to-content links for keyboard navigation
 */
export default function SkipToContent() {
  const { t } = useTranslation();
  
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      {t('accessibility.skipToContent')}
    </a>
  );
}
