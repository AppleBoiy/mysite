'use client';

import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshOptions {
  threshold?: number;
  resistance?: number;
  maxPullDistance?: number;
}

interface UsePullToRefreshReturn {
  isRefreshing: boolean;
  pullDistance: number;
}

/**
 * Custom hook for pull-to-refresh functionality on mobile
 * @param onRefresh - Callback function to execute on refresh
 * @param options - Configuration options
 * @returns { isRefreshing, pullDistance }
 */
export function usePullToRefresh(
  onRefresh: () => Promise<void> | void,
  options: UsePullToRefreshOptions = {}
): UsePullToRefreshReturn {
  const {
    threshold = 80, // Distance in pixels to trigger refresh
    resistance = 2.5, // Resistance factor for pull distance
    maxPullDistance = 120, // Maximum pull distance
  } = options;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    // Only enable on touch devices
    if (!('ontouchstart' in window)) return;

    let rafId: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger if at top of page
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || isRefreshing) return;

      const touchY = e.touches[0].clientY;
      const distance = touchY - touchStartY.current;

      // Only pull down
      if (distance > 0 && window.scrollY === 0) {
        // Prevent default scroll behavior
        e.preventDefault();

        // Apply resistance and cap at max distance
        const resistedDistance = Math.min(
          distance / resistance,
          maxPullDistance
        );

        // Use RAF for smooth updates
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setPullDistance(resistedDistance);
        });
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling.current) return;

      isPulling.current = false;

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        
        // Trigger haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }

        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        // Animate back to 0
        setPullDistance(0);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onRefresh, threshold, resistance, maxPullDistance, isRefreshing, pullDistance]);

  return { isRefreshing, pullDistance };
}
