import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AvailabilityBanner({ onVisibilityChange }) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide banner when user scrolls down more than 100px
      if (window.scrollY > 100 && !isDismissed) {
        setIsVisible(false);
      } else if (window.scrollY <= 100 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  useEffect(() => {
    // Notify parent component about visibility change
    if (onVisibilityChange) {
      onVisibilityChange(isVisible);
    }
  }, [isVisible, onVisibilityChange]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-accent/90 to-primary/90 backdrop-blur-sm text-white py-3 px-6 shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles size={20} />
          </motion.div>
          <p className="text-sm sm:text-base font-medium">
            <span className="hidden sm:inline">{t('availability.banner')} </span>
            <span className="sm:hidden">{t('availability.bannerShort')} </span>
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="px-4 py-1.5 bg-white text-accent rounded-full text-sm font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            {t('nav.getInTouch')}
          </a>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X size={18} />
          </button>
        </div> */}
      </div>
    </motion.div>
  );
}
