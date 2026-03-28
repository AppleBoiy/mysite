import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for lazy loading images using IntersectionObserver
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - { ref, isVisible }
 */
export function useLazyLoad(options = {}) {
  const ref = useRef(null);
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
