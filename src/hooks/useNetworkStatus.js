import { useState, useEffect } from 'react';

/**
 * Hook to detect network connection quality
 * Returns connection type and whether to use lite mode
 * Includes fallback speed test for Safari/iOS
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

  // Estimate connection speed by downloading a small image
  const estimateConnectionSpeed = async () => {
    try {
      const imageUrl = 'https://www.google.com/images/phd/px.gif'; // 43 bytes
      const startTime = performance.now();
      
      const response = await fetch(imageUrl, { 
        cache: 'no-store',
        mode: 'no-cors' // Avoid CORS issues
      });
      
      const endTime = performance.now();
      const duration = endTime - startTime; // milliseconds
      
      // Estimate based on response time
      let effectiveType = '4g';
      let downlink = 10;
      let rtt = duration;
      
      if (duration > 2000) {
        effectiveType = 'slow-2g';
        downlink = 0.05;
      } else if (duration > 1000) {
        effectiveType = '2g';
        downlink = 0.25;
      } else if (duration > 500) {
        effectiveType = '3g';
        downlink = 1.5;
      } else {
        effectiveType = '4g';
        downlink = 10;
      }
      
      return { effectiveType, downlink, rtt };
    } catch (error) {
      console.warn('Speed test failed, using defaults:', error);
      return { effectiveType: '4g', downlink: 10, rtt: 0 };
    }
  };

  useEffect(() => {
    // Check if Network Information API is available
    const connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;

    const updateNetworkStatus = async () => {
      const isOnline = navigator.onLine;
      let effectiveType = connection?.effectiveType || '4g';
      let saveData = connection?.saveData || false;
      let rtt = connection?.rtt || 0;
      let downlink = connection?.downlink || 10;

      // If Network Information API is not available (Safari/iOS), run speed test
      if (!connection && isOnline) {
        const speedTest = await estimateConnectionSpeed();
        effectiveType = speedTest.effectiveType;
        downlink = speedTest.downlink;
        rtt = speedTest.rtt;
      }

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

    // Re-test connection speed every 5 minutes on Safari/iOS
    let speedTestInterval;
    if (!connection) {
      speedTestInterval = setInterval(updateNetworkStatus, 5 * 60 * 1000);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
      
      if (speedTestInterval) {
        clearInterval(speedTestInterval);
      }
    };
  }, []);

  return networkStatus;
}
