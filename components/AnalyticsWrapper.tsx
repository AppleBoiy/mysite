'use client';

import { Analytics } from '@vercel/analytics/react';

export function AnalyticsWrapper() {
  return (
    <Analytics
      beforeSend={(event) => {
        // Filter out sensitive data from URLs
        // Remove query parameters that might contain personal information
        const url = new URL(event.url);
        
        // List of sensitive query parameters to remove
        const sensitiveParams = ['token', 'email', 'user', 'id', 'session'];
        sensitiveParams.forEach(param => url.searchParams.delete(param));
        
        // Return modified event
        return {
          ...event,
          url: url.toString()
        };
      }}
    />
  );
}
