import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { RefreshCw } from 'lucide-react';

export default function PullToRefresh({ onRefresh, children }) {
  const { isRefreshing, pullDistance } = usePullToRefresh(onRefresh, {
    threshold: 80,
    resistance: 2.5,
    maxPullDistance: 120,
  });

  const opacity = Math.min(pullDistance / 80, 1);
  const rotation = (pullDistance / 120) * 360;

  return (
    <div className="relative">
      {/* Pull indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translateY(${Math.min(pullDistance, 60)}px)`,
          opacity: opacity,
          transition: isRefreshing || pullDistance === 0 ? 'all 0.3s ease-out' : 'none',
        }}
      >
        <div className="bg-background/90 backdrop-blur-sm border border-border rounded-full p-3 shadow-lg">
          <RefreshCw
            size={20}
            className={`text-accent ${isRefreshing ? 'animate-spin' : ''}`}
            style={{
              transform: isRefreshing ? 'none' : `rotate(${rotation}deg)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
