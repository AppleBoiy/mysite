import { useState, useEffect } from 'react';

/**
 * Hook to detect network connection quality
 * Returns connection type and whether to use lite mode
 */
export function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    effectiveType: '4g', // 'slow-2g', '2g', '3g', '4g'
    saveData: false,
    isSlowConnection: false,
    rtt: 0, // Round-trip time in ms
    downlink: 10, // Mbps
  });

  useEffect(() => {
    // Check if Network Information API is available
    const connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;

    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine;
      const effectiveType = connection?.effectiveType || '4g';
      const saveData = connection?.saveData || false;
      const rtt = connection?.rtt || 0;
      const downlink = connection?.downlink || 10;

      // Determine if connection is slow
      const isSlowConnection = 
        !isOnline ||
        saveData ||
        effectiveType === 'slow-2g' ||
        effectiveType === '2g' ||
        rtt > 1000 || // High latency
        downlink < 1; // Less than 1 Mbps

      setNetworkStatus({
        isOnline,
        effectiveType,
        saveData,
        isSlowConnection,
        rtt,
        downlink,
      });
    };

    // Initial check
    updateNetworkStatus();

    // Listen for connection changes
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return networkStatus;
}
