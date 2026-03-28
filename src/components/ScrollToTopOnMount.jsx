import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopOnMount() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, let the browser handle scrolling to that element
    if (hash) {
      // Small delay to ensure element is rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    // Otherwise, scroll to top
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
      });
    });
  }, [pathname, hash]);

  return null;
}
