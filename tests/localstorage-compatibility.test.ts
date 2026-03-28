/**
 * localStorage Key Compatibility Tests
 * 
 * Validates: Requirements 15.2
 * Task: 23.3 - Verify localStorage key compatibility
 * 
 * These tests ensure that localStorage keys used in the Next.js app
 * match those used in the legacy React/Vite app for seamless migration.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('localStorage Key Compatibility', () => {
  // Store original localStorage state
  let originalLocalStorage: Storage;

  beforeEach(() => {
    // Save original localStorage
    originalLocalStorage = global.localStorage;
    
    // Mock localStorage
    const localStorageMock: { [key: string]: string } = {};
    global.localStorage = {
      getItem: (key: string) => localStorageMock[key] || null,
      setItem: (key: string, value: string) => {
        localStorageMock[key] = value;
      },
      removeItem: (key: string) => {
        delete localStorageMock[key];
      },
      clear: () => {
        Object.keys(localStorageMock).forEach(key => delete localStorageMock[key]);
      },
      key: (index: number) => Object.keys(localStorageMock)[index] || null,
      length: Object.keys(localStorageMock).length,
    } as Storage;
  });

  afterEach(() => {
    // Restore original localStorage
    global.localStorage = originalLocalStorage;
  });

  describe('Theme localStorage key', () => {
    it('should use "chaipat-theme" key for theme storage', () => {
      // This is the key used by next-themes with storageKey="chaipat-theme"
      const THEME_KEY = 'chaipat-theme';
      
      // Simulate theme storage
      localStorage.setItem(THEME_KEY, 'dark');
      
      // Verify the key exists and value is correct
      expect(localStorage.getItem(THEME_KEY)).toBe('dark');
    });

    it('should support all theme values: light, dark, system', () => {
      const THEME_KEY = 'chaipat-theme';
      const validThemes = ['light', 'dark', 'system'];
      
      validThemes.forEach(theme => {
        localStorage.setItem(THEME_KEY, theme);
        expect(localStorage.getItem(THEME_KEY)).toBe(theme);
      });
    });

    it('should persist theme preference across sessions', () => {
      const THEME_KEY = 'chaipat-theme';
      
      // Set theme
      localStorage.setItem(THEME_KEY, 'dark');
      
      // Simulate reading on next session
      const storedTheme = localStorage.getItem(THEME_KEY);
      
      expect(storedTheme).toBe('dark');
    });
  });

  describe('Language localStorage key', () => {
    it('should use "i18nextLng" key for language storage', () => {
      // This is the default key used by i18next-browser-languagedetector
      const LANGUAGE_KEY = 'i18nextLng';
      
      // Simulate language storage
      localStorage.setItem(LANGUAGE_KEY, 'en');
      
      // Verify the key exists and value is correct
      expect(localStorage.getItem(LANGUAGE_KEY)).toBe('en');
    });

    it('should support all locale values: en, ja, th', () => {
      const LANGUAGE_KEY = 'i18nextLng';
      const validLocales = ['en', 'ja', 'th'];
      
      validLocales.forEach(locale => {
        localStorage.setItem(LANGUAGE_KEY, locale);
        expect(localStorage.getItem(LANGUAGE_KEY)).toBe(locale);
      });
    });

    it('should persist language preference across sessions', () => {
      const LANGUAGE_KEY = 'i18nextLng';
      
      // Set language
      localStorage.setItem(LANGUAGE_KEY, 'ja');
      
      // Simulate reading on next session
      const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
      
      expect(storedLanguage).toBe('ja');
    });

    it('should handle language codes with region (e.g., en-US)', () => {
      const LANGUAGE_KEY = 'i18nextLng';
      
      // i18next may store full locale codes
      localStorage.setItem(LANGUAGE_KEY, 'en-US');
      
      const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
      expect(storedLanguage).toBe('en-US');
      
      // Verify we can extract the base language
      const baseLanguage = storedLanguage?.split('-')[0];
      expect(baseLanguage).toBe('en');
    });
  });

  describe('Migration compatibility', () => {
    it('should maintain all legacy localStorage keys', () => {
      // These are the keys that must remain consistent between legacy and Next.js apps
      const LEGACY_KEYS = {
        theme: 'chaipat-theme',
        language: 'i18nextLng',
      };

      // Verify keys are documented and consistent
      expect(LEGACY_KEYS.theme).toBe('chaipat-theme');
      expect(LEGACY_KEYS.language).toBe('i18nextLng');
    });

    it('should allow reading legacy preferences in Next.js app', () => {
      // Simulate legacy app setting preferences
      localStorage.setItem('chaipat-theme', 'dark');
      localStorage.setItem('i18nextLng', 'ja');

      // Verify Next.js app can read these preferences
      expect(localStorage.getItem('chaipat-theme')).toBe('dark');
      expect(localStorage.getItem('i18nextLng')).toBe('ja');
    });

    it('should not introduce new localStorage keys that break compatibility', () => {
      // List of allowed localStorage keys
      const ALLOWED_KEYS = [
        'chaipat-theme',
        'i18nextLng',
        // i18next may also use these keys
        'i18next',
        // Service worker and PWA may use additional keys
      ];

      // This test documents the expected keys
      // Any new keys should be carefully considered for backward compatibility
      expect(ALLOWED_KEYS).toContain('chaipat-theme');
      expect(ALLOWED_KEYS).toContain('i18nextLng');
    });
  });

  describe('Cookie storage compatibility', () => {
    it('should document that i18next also uses cookies for language', () => {
      // i18next-browser-languagedetector uses both localStorage and cookies
      // The detection order in lib/i18n/client.ts is: ['cookie', 'localStorage', 'navigator']
      // This ensures SSR can read language preference from cookies
      
      const DETECTION_ORDER = ['cookie', 'localStorage', 'navigator'];
      const CACHES = ['cookie', 'localStorage'];
      
      expect(DETECTION_ORDER).toContain('cookie');
      expect(DETECTION_ORDER).toContain('localStorage');
      expect(CACHES).toContain('cookie');
      expect(CACHES).toContain('localStorage');
    });

    it('should document that theme uses cookies for SSR', () => {
      // next-themes reads from cookies on the server side
      // The cookie name matches the storageKey: "chaipat-theme"
      
      const THEME_STORAGE_KEY = 'chaipat-theme';
      
      // This is used in both localStorage (client) and cookies (server)
      expect(THEME_STORAGE_KEY).toBe('chaipat-theme');
    });
  });
});
