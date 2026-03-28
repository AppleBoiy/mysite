'use client';

import { useNetworkStatus, useLazyLoad, useHaptic, usePullToRefresh, useIsMobile } from '@/hooks';

/**
 * Demo component to verify custom hooks work in Next.js environment
 * This component demonstrates all migrated hooks functioning correctly
 */
export default function HooksDemo() {
  // Test useNetworkStatus
  const networkStatus = useNetworkStatus();
  
  // Test useLazyLoad
  const { ref: lazyRef, isVisible } = useLazyLoad();
  
  // Test useHaptic
  const { haptic, isSupported: hapticSupported } = useHaptic();
  
  // Test usePullToRefresh
  const handleRefresh = async () => {
    console.log('Refreshing...');
    await new Promise(resolve => setTimeout(resolve, 1000));
  };
  const { isRefreshing, pullDistance } = usePullToRefresh(handleRefresh);
  
  // Test useIsMobile
  const isMobile = useIsMobile();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Custom Hooks Demo</h2>
      
      {/* Network Status */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">useNetworkStatus</h3>
        <p>Online: {networkStatus.isOnline ? '✅' : '❌'}</p>
        <p>Connection: {networkStatus.effectiveType}</p>
        <p>Slow Connection: {networkStatus.isSlowConnection ? '⚠️' : '✅'}</p>
        <p>Downlink: {networkStatus.downlink} Mbps</p>
        <p>RTT: {networkStatus.rtt} ms</p>
      </div>

      {/* Lazy Load */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">useLazyLoad</h3>
        <div ref={lazyRef as any} className="h-20 bg-gray-100 flex items-center justify-center">
          {isVisible ? '✅ Visible' : '⏳ Not visible yet'}
        </div>
      </div>

      {/* Haptic */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">useHaptic</h3>
        <p>Supported: {hapticSupported ? '✅' : '❌'}</p>
        <div className="space-x-2 mt-2">
          <button 
            onClick={() => haptic.light()} 
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Light
          </button>
          <button 
            onClick={() => haptic.medium()} 
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Medium
          </button>
          <button 
            onClick={() => haptic.strong()} 
            className="px-3 py-1 bg-blue-700 text-white rounded"
          >
            Strong
          </button>
        </div>
      </div>

      {/* Pull to Refresh */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">usePullToRefresh</h3>
        <p>Refreshing: {isRefreshing ? '🔄' : '✅'}</p>
        <p>Pull Distance: {pullDistance.toFixed(0)}px</p>
        <p className="text-sm text-gray-600 mt-2">
          (Pull down from top of page on mobile to test)
        </p>
      </div>

      {/* Is Mobile */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">useIsMobile</h3>
        <p>Device: {isMobile ? '📱 Mobile' : '💻 Desktop'}</p>
      </div>
    </div>
  );
}
