# Custom Hooks for Next.js

This directory contains custom React hooks migrated from the React/Vite application to work with Next.js App Router and Client Components.

## Available Hooks

### useNetworkStatus

Detects network connection quality and provides information about the user's connection.

```typescript
import { useNetworkStatus } from '@/hooks';

function MyComponent() {
  const { isOnline, effectiveType, isSlowConnection, downlink, rtt } = useNetworkStatus();
  
  return (
    <div>
      {isOnline ? 'Online' : 'Offline'}
      {isSlowConnection && <p>Slow connection detected</p>}
    </div>
  );
}
```

**Features:**
- Detects online/offline status
- Identifies connection type (4g, 3g, 2g, slow-2g)
- Provides round-trip time (RTT) and download speed
- Includes fallback speed test for Safari/iOS
- Automatically re-tests connection every 5 minutes on unsupported browsers

### useLazyLoad

Implements lazy loading using IntersectionObserver for images and components.

```typescript
import { useLazyLoad } from '@/hooks';

function MyComponent() {
  const { ref, isVisible } = useLazyLoad({ rootMargin: '100px' });
  
  return (
    <div ref={ref}>
      {isVisible && <img src="image.jpg" alt="Lazy loaded" />}
    </div>
  );
}
```

**Features:**
- Uses IntersectionObserver API
- Configurable root margin and threshold
- Graceful fallback for unsupported browsers
- Automatically disconnects observer after element becomes visible

### useHaptic

Provides haptic feedback (vibration) for mobile devices.

```typescript
import { useHaptic } from '@/hooks';

function MyComponent() {
  const { haptic, isSupported } = useHaptic();
  
  const handleClick = () => {
    haptic.light(); // Light tap
    // or haptic.medium(), haptic.strong(), haptic.success(), haptic.error(), haptic.warning()
  };
  
  return (
    <button onClick={handleClick}>
      Click me {isSupported && '(with haptic)'}
    </button>
  );
}
```

**Features:**
- Multiple vibration patterns (light, medium, strong, success, error, warning)
- Automatic browser support detection
- Safe to use on non-supporting devices (no-op)

### usePullToRefresh

Implements pull-to-refresh functionality for mobile devices.

```typescript
import { usePullToRefresh } from '@/hooks';

function MyComponent() {
  const handleRefresh = async () => {
    // Fetch new data
    await fetchData();
  };
  
  const { isRefreshing, pullDistance } = usePullToRefresh(handleRefresh, {
    threshold: 80,
    resistance: 2.5,
    maxPullDistance: 120
  });
  
  return (
    <div style={{ transform: `translateY(${pullDistance}px)` }}>
      {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
    </div>
  );
}
```

**Features:**
- Touch-based pull-to-refresh
- Configurable threshold, resistance, and max distance
- Haptic feedback on refresh trigger
- Only activates when at top of page
- Smooth animations using requestAnimationFrame

### useIsMobile

Detects if the viewport is mobile-sized (< 768px).

```typescript
import { useIsMobile } from '@/hooks';

function MyComponent() {
  const isMobile = useIsMobile();
  
  return (
    <div>
      {isMobile ? 'Mobile view' : 'Desktop view'}
    </div>
  );
}
```

**Features:**
- Responsive to viewport changes
- Uses matchMedia API for efficient detection
- Configurable breakpoint (768px default)

## Migration Notes

All hooks have been:
- ✅ Converted from JavaScript to TypeScript
- ✅ Added 'use client' directive for Next.js Client Components
- ✅ Properly typed with TypeScript interfaces
- ✅ Tested for compatibility with Next.js App Router
- ✅ Maintained all original functionality

## Usage in Next.js

These hooks can only be used in Client Components. Make sure your component has the `'use client'` directive at the top:

```typescript
'use client';

import { useNetworkStatus } from '@/hooks';

export default function MyClientComponent() {
  const networkStatus = useNetworkStatus();
  // ...
}
```

## Browser Compatibility

- **useNetworkStatus**: Works in all modern browsers, with fallback for Safari/iOS
- **useLazyLoad**: Requires IntersectionObserver (all modern browsers), graceful fallback included
- **useHaptic**: Requires Vibration API (most mobile browsers)
- **usePullToRefresh**: Requires touch events (mobile devices)
- **useIsMobile**: Works in all browsers with matchMedia support

## Requirements

Validates: **Requirements 7.5** - Custom hooks work with Client Components in Next.js environment
