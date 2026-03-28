import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function FloatingAvailabilityBadge({ isVisible }) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (isVisible) {
      // Show full text initially
      setIsExpanded(true);
      
      // Collapse to compact button after 5 seconds
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="/contact"
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: 1
          }}
          exit={{ y: 100, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-accent to-primary text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-shadow duration-300 flex items-center overflow-hidden"
          style={{ height: "48px" }}
          title={t('availability.badge')}
          aria-label={t('availability.badge')}
        >
          <motion.div
            animate={{ 
              paddingLeft: isExpanded ? "12px" : "14px",
              paddingRight: isExpanded ? "0px" : "14px"
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="shrink-0"
            >
              <Sparkles size={18} />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={false}
            animate={{ 
              width: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
              marginLeft: isExpanded ? "8px" : 0,
              marginRight: isExpanded ? "16px" : 0
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span className="hidden sm:inline">{t('availability.badge')}</span>
            <span className="sm:hidden">{t('availability.badgeShort')}</span>
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
