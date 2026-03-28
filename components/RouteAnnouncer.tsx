'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';

/**
 * RouteAnnouncer component for screen reader accessibility
 * 
 * Announces route changes to screen readers using ARIA live regions.
 * This ensures users with screen readers are notified when navigation occurs.
 * 
 * Requirements: 11.7 - Route changes announced to screen readers
 */
export default function RouteAnnouncer() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const previousPathRef = useRef<string>('');

  useEffect(() => {
    // Only announce if the path actually changed
    if (previousPathRef.current !== pathname && previousPathRef.current !== '') {
      // Extract page name from pathname
      const segments = pathname.split('/').filter(Boolean);
      // Remove locale from segments (first segment)
      const pageSegments = segments.slice(1);
      
      let pageName = 'Home';
      if (pageSegments.length > 0) {
        // Capitalize first letter of each segment
        pageName = pageSegments
          .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
          .join(' ');
      }

      // Announce the navigation
      const announcement = t('accessibility.navigatedTo', { page: pageName });
      
      // Update the live region
      const liveRegion = document.getElementById('route-announcer');
      if (liveRegion) {
        liveRegion.textContent = announcement;
      }
    }
    
    previousPathRef.current = pathname;
  }, [pathname, t]);

  return (
    <div
      id="route-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}
