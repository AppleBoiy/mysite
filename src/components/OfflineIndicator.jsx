import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export default function OfflineIndicator() {
  const { isOnline, isSlowConnection, effectiveType } = useNetworkStatus();
  const [showNotification, setShowNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowNotification(true);
      setWasOffline(true);
    } else if (wasOffline) {
      // Show "back online" message briefly
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowNotification(false);
    }
  }, [isOnline, wasOffline]);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg backdrop-blur-xl border ${
              isOnline
                ? 'bg-green-500/90 border-green-400/50 text-white'
                : 'bg-red-500/90 border-red-400/50 text-white'
            }`}
            role="alert"
            aria-live="polite"
          >
            {isOnline ? (
              <>
                <Wifi size={18} />
                <span className="text-sm font-medium">Back online</span>
              </>
            ) : (
              <>
                <WifiOff size={18} />
                <span className="text-sm font-medium">No internet connection</span>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Persistent indicator for slow connections */}
      {isOnline && isSlowConnection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/90 backdrop-blur-xl border border-orange-400/50 text-white text-xs shadow-lg"
            role="status"
            aria-live="polite"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-medium">Slow connection ({effectiveType})</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
