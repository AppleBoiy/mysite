import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { z } from 'zod';

describe('Environment Variable Validation', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  it('should validate required environment variables', () => {
    // Set up valid environment
    (process.env as any).NODE_ENV = 'test';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = 'test-key-123';

    const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']),
      NEXT_PUBLIC_SITE_URL: z.string().url(),
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z.string().min(1),
    });

    const result = envSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe('test');
      expect(result.data.NEXT_PUBLIC_SITE_URL).toBe('https://example.com');
      expect(result.data.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY).toBe('test-key-123');
    }
  });

  it('should fail validation when NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is missing', () => {
    (process.env as any).NODE_ENV = 'test';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']),
      NEXT_PUBLIC_SITE_URL: z.string().url(),
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z.string().min(1),
    });

    const result = envSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    });

    expect(result.success).toBe(false);
  });

  it('should fail validation when NEXT_PUBLIC_SITE_URL is not a valid URL', () => {
    (process.env as any).NODE_ENV = 'test';
    process.env.NEXT_PUBLIC_SITE_URL = 'not-a-url';
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = 'test-key-123';

    const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']),
      NEXT_PUBLIC_SITE_URL: z.string().url(),
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z.string().min(1),
    });

    const result = envSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    });

    expect(result.success).toBe(false);
  });

  it('should use default value for NEXT_PUBLIC_SITE_URL when not provided', () => {
    (process.env as any).NODE_ENV = 'test';
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = 'test-key-123';

    const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']),
      NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('http://localhost:3000'),
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z.string().min(1),
    });

    const result = envSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000');
    }
  });

  it('should validate NODE_ENV enum values', () => {
    (process.env as any).NODE_ENV = 'invalid';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = 'test-key-123';

    const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']),
      NEXT_PUBLIC_SITE_URL: z.string().url(),
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z.string().min(1),
    });

    const result = envSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    });

    expect(result.success).toBe(false);
  });
});
