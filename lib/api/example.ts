/**
 * Example usage of fetchWithRetry utility
 * This file demonstrates various use cases for the API retry functionality
 */

import { fetchWithRetry, fetchJSON, APIError } from './fetchWithRetry';

/**
 * Example 1: Basic GET request with default retry config
 */
export async function fetchUserData(userId: string) {
  try {
    const response = await fetchWithRetry(`https://api.example.com/users/${userId}`);
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`Failed to fetch user ${userId}:`, error.message);
      throw error;
    }
    throw error;
  }
}

/**
 * Example 2: POST request with custom retry configuration
 */
export async function createProject(projectData: any) {
  try {
    const response = await fetchWithRetry(
      'https://api.example.com/projects',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      },
      {
        maxRetries: 5,
        initialDelay: 2000,
        maxDelay: 30000,
      }
    );
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      console.error('Failed to create project:', error.message);
      throw error;
    }
    throw error;
  }
}

/**
 * Example 3: Using fetchJSON helper for type-safe API calls
 */
interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
}

export async function fetchPublications(): Promise<Publication[]> {
  try {
    return await fetchJSON<Publication[]>('https://api.example.com/publications');
  } catch (error) {
    if (error instanceof APIError) {
      console.error('Failed to fetch publications:', error.message);
      return []; // Return empty array as fallback
    }
    throw error;
  }
}

/**
 * Example 4: Handling rate limiting (429 errors)
 */
export async function fetchWithRateLimit(url: string) {
  try {
    return await fetchWithRetry(
      url,
      {},
      {
        maxRetries: 10,
        initialDelay: 5000, // Start with 5 second delay for rate limits
        maxDelay: 60000, // Cap at 1 minute
        backoffMultiplier: 2,
      }
    );
  } catch (error) {
    if (error instanceof APIError && error.code === 'MAX_RETRIES_EXCEEDED') {
      console.error('Rate limit exceeded even after retries');
    }
    throw error;
  }
}

/**
 * Example 5: Critical request with minimal retries
 */
export async function fetchCriticalData(url: string) {
  try {
    return await fetchWithRetry(
      url,
      {},
      {
        maxRetries: 1,
        initialDelay: 500,
      }
    );
  } catch (error) {
    if (error instanceof APIError) {
      console.error('Critical request failed:', error.message);
    }
    throw error;
  }
}

/**
 * Example 6: Handling different error types
 */
export async function robustFetch(url: string) {
  try {
    const response = await fetchWithRetry(url);
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.code) {
        case 'CLIENT_ERROR':
          console.error('Client error (4xx):', error.message);
          break;
        case 'MAX_RETRIES_EXCEEDED':
          console.error('Max retries exceeded:', error.message);
          break;
        case 'FETCH_ERROR':
          console.error('Network error:', error.message);
          break;
        case 'JSON_PARSE_ERROR':
          console.error('Failed to parse JSON:', error.message);
          break;
        default:
          console.error('Unknown API error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
