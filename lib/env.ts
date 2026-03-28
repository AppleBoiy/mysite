import { z } from 'zod';

/**
 * Environment variable validation schema
 * Ensures all required environment variables are present and valid at build time
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Public environment variables (available in browser)
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('http://localhost:3000'),
  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z.string().min(1, 'Web3Forms access key is required'),
});

/**
 * Validated environment variables
 * This object is type-safe and guaranteed to contain valid values
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables at build time
 * Throws an error if validation fails
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
    throw new Error('Invalid environment configuration');
  }

  return parsed.data;
}

/**
 * Validated and type-safe environment variables
 * Use this instead of process.env for guaranteed type safety
 */
export const env = validateEnv();

/**
 * Check if running in production
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Check if running in development
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Check if running in test
 */
export const isTest = env.NODE_ENV === 'test';
