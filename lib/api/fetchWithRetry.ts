/**
 * Fetch with retry utility for API requests
 * Implements exponential backoff for retries
 * Validates: Requirements 12.4
 */

export interface RetryConfig {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryableStatuses?: number[];
}

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

const DEFAULT_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504], // Request Timeout, Too Many Requests, Server Errors
};

/**
 * Determines if an error is retryable
 */
function isRetryableError(error: unknown, retryableStatuses: number[]): boolean {
  // Network errors (fetch failures)
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }

  // API errors with retryable status codes
  if (error instanceof APIError) {
    return retryableStatuses.includes(error.statusCode);
  }

  // HTTP Response errors
  if (error instanceof Response) {
    return retryableStatuses.includes(error.status);
  }

  return false;
}

/**
 * Calculate delay with exponential backoff
 */
function calculateDelay(
  attempt: number,
  initialDelay: number,
  maxDelay: number,
  backoffMultiplier: number
): number {
  const delay = initialDelay * Math.pow(backoffMultiplier, attempt);
  return Math.min(delay, maxDelay);
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch with automatic retry and exponential backoff
 * 
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param config - Retry configuration
 * @returns Promise resolving to Response
 * @throws APIError for non-retryable errors or after max retries
 * 
 * @example
 * ```typescript
 * const response = await fetchWithRetry('https://api.example.com/data', {
 *   method: 'GET',
 *   headers: { 'Content-Type': 'application/json' }
 * }, {
 *   maxRetries: 3,
 *   initialDelay: 1000
 * });
 * ```
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  config: RetryConfig = {}
): Promise<Response> {
  const {
    maxRetries,
    initialDelay,
    maxDelay,
    backoffMultiplier,
    retryableStatuses,
  } = { ...DEFAULT_CONFIG, ...config };

  let lastError: Error | Response;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url, options);

      // Success - return response
      if (response.ok) {
        return response;
      }

      // Client errors (4xx) - don't retry except for specific cases
      if (response.status >= 400 && response.status < 500) {
        // Only retry if it's in the retryable list (e.g., 408, 429)
        if (!retryableStatuses.includes(response.status)) {
          throw new APIError(
            response.status,
            `Client error: ${response.statusText}`,
            'CLIENT_ERROR'
          );
        }
      }

      // Server errors (5xx) or retryable 4xx - will retry
      lastError = response;

      // If this was the last attempt, throw error
      if (attempt === maxRetries) {
        throw new APIError(
          response.status,
          `HTTP ${response.status}: ${response.statusText}`,
          'MAX_RETRIES_EXCEEDED'
        );
      }
    } catch (error) {
      lastError = error as Error;

      // If it's a non-retryable error, throw immediately
      if (!isRetryableError(error, retryableStatuses)) {
        if (error instanceof APIError) {
          throw error;
        }
        throw new APIError(
          0,
          error instanceof Error ? error.message : 'Unknown error',
          'FETCH_ERROR'
        );
      }

      // If this was the last attempt, throw error
      if (attempt === maxRetries) {
        throw new APIError(
          0,
          `Network error after ${maxRetries} retries: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
          'MAX_RETRIES_EXCEEDED'
        );
      }
    }

    // Calculate delay with exponential backoff
    const delay = calculateDelay(attempt, initialDelay, maxDelay, backoffMultiplier);

    // Log retry attempt in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[fetchWithRetry] Attempt ${attempt + 1}/${maxRetries + 1} failed. Retrying in ${delay}ms...`
      );
    }

    // Wait before retrying
    await sleep(delay);
    attempt++;
  }

  // This should never be reached, but TypeScript needs it
  throw new APIError(
    0,
    'Unexpected error in fetchWithRetry',
    'UNEXPECTED_ERROR'
  );
}

/**
 * Convenience wrapper for JSON API requests with retry
 * 
 * @example
 * ```typescript
 * const data = await fetchJSON<User>('https://api.example.com/user/123');
 * ```
 */
export async function fetchJSON<T = any>(
  url: string,
  options: RequestInit = {},
  config: RetryConfig = {}
): Promise<T> {
  const response = await fetchWithRetry(url, options, config);

  if (!response.ok) {
    throw new APIError(
      response.status,
      `Failed to fetch JSON: ${response.statusText}`,
      'JSON_FETCH_ERROR'
    );
  }

  try {
    return await response.json();
  } catch (error) {
    throw new APIError(
      response.status,
      'Failed to parse JSON response',
      'JSON_PARSE_ERROR'
    );
  }
}
