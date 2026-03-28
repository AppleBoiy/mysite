import { QueryClient } from '@tanstack/react-query';

/**
 * Create a new QueryClient instance with default configuration
 * This should be used in Client Components only
 */
export const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Factory function to create a new QueryClient instance
 * Useful for creating isolated instances in tests or SSR contexts
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
