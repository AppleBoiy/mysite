# API Utilities

## fetchWithRetry

A robust utility for making HTTP requests with automatic retry logic and exponential backoff.

### Features

- **Automatic Retries**: Retries failed requests up to a configurable number of times
- **Exponential Backoff**: Implements exponential backoff between retries to avoid overwhelming servers
- **Smart Error Handling**: Distinguishes between retryable and non-retryable errors
- **Configurable**: Fully customizable retry behavior
- **TypeScript Support**: Full type safety with TypeScript

### Basic Usage

```typescript
import { fetchWithRetry } from '@/lib/api/fetchWithRetry';

// Simple GET request with default retry config (3 retries, 1s initial delay)
const response = await fetchWithRetry('https://api.example.com/data');
const data = await response.json();
```

### Custom Configuration

```typescript
import { fetchWithRetry } from '@/lib/api/fetchWithRetry';

const response = await fetchWithRetry(
  'https://api.example.com/data',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key: 'value' }),
  },
  {
    maxRetries: 5,           // Retry up to 5 times
    initialDelay: 2000,      // Start with 2 second delay
    maxDelay: 30000,         // Cap delay at 30 seconds
    backoffMultiplier: 2,    // Double delay each retry
    retryableStatuses: [408, 429, 500, 502, 503, 504], // Which HTTP status codes to retry
  }
);
```

### JSON Helper

For JSON APIs, use the convenience wrapper:

```typescript
import { fetchJSON } from '@/lib/api/fetchWithRetry';

interface User {
  id: string;
  name: string;
  email: string;
}

const user = await fetchJSON<User>('https://api.example.com/user/123');
console.log(user.name); // Type-safe access
```

### Error Handling

```typescript
import { fetchWithRetry, APIError } from '@/lib/api/fetchWithRetry';

try {
  const response = await fetchWithRetry('https://api.example.com/data');
  const data = await response.json();
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error: ${error.statusCode} - ${error.message}`);
    console.error(`Error Code: ${error.code}`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Retry Behavior

The utility implements the following retry logic:

1. **Network Errors**: Always retried (e.g., connection failures, DNS errors)
2. **Server Errors (5xx)**: Retried by default
3. **Client Errors (4xx)**: Only specific codes are retried:
   - `408` Request Timeout
   - `429` Too Many Requests
4. **Exponential Backoff**: Delay between retries increases exponentially
   - Attempt 1: `initialDelay` (default: 1s)
   - Attempt 2: `initialDelay * 2` (default: 2s)
   - Attempt 3: `initialDelay * 4` (default: 4s)
   - Capped at `maxDelay` (default: 10s)

### Default Configuration

```typescript
{
  maxRetries: 3,
  initialDelay: 1000,      // 1 second
  maxDelay: 10000,         // 10 seconds
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504]
}
```

### Use Cases

#### API Rate Limiting

```typescript
// Automatically handles 429 Too Many Requests with backoff
const response = await fetchWithRetry('https://api.example.com/data', {}, {
  maxRetries: 5,
  initialDelay: 5000, // Start with 5s delay for rate limits
});
```

#### Unreliable Network

```typescript
// More aggressive retries for unstable connections
const response = await fetchWithRetry('https://api.example.com/data', {}, {
  maxRetries: 10,
  initialDelay: 500,
  maxDelay: 5000,
});
```

#### Critical Requests

```typescript
// Fewer retries for time-sensitive operations
const response = await fetchWithRetry('https://api.example.com/urgent', {}, {
  maxRetries: 1,
  initialDelay: 500,
});
```

### Integration with React/Next.js

```typescript
'use client';

import { useState, useEffect } from 'react';
import { fetchJSON } from '@/lib/api/fetchWithRetry';

export default function DataComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJSON('https://api.example.com/data')
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

### Requirements

This utility validates **Requirement 12.4**: "WHEN an API request fails, THE Next_App SHALL retry the request up to 3 times"

The implementation provides:
- Configurable retry count (default: 3)
- Exponential backoff to prevent server overload
- Smart error classification (retryable vs non-retryable)
- Comprehensive error reporting
