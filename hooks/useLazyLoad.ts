'use client';

import { useEffect, useRef, useState } from 'react';

interface UseLazyLoadOptions extends IntersectionObserverInit {
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseLazyLoadReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
}

/**
 * Custom hook for lazy loading images using IntersectionObserver
 * @param options - IntersectionObserver options
 * @returns { ref, isVisible }
 */
export function useLazyLoad(options: UseLazyLoadOptions = {}): UseLazyLoadReturn {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before element is visible
        threshold: 0.01,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isVisible };
}
