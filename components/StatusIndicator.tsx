'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";

export default function StatusIndicator() {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Pulsing dot */}
      <button
        className="relative flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors"
        aria-label="Availability status"
      >
        <div className="relative">
          {/* Outer pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Inner dot */}
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
          {t('availability.available')}
        </span>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute top-full right-0 mt-2 px-4 py-2 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap z-50"
        >
          <p className="text-sm font-medium text-foreground">
            {t('availability.tooltip')}
          </p>
        </motion.div>
      )}
    </div>
  );
}
