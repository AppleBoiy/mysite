'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationBase } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Locale, defaultLocale, locales } from './settings';

// Track initialization state
let isInitialized = false;
const loadedLanguages = new Set<string>();

// Initialize i18next for client-side
export function initClientI18n(locale: Locale, translations: any) {
  if (typeof window === 'undefined') return;

  if (isInitialized && loadedLanguages.has(locale)) {
    // Already initialized with this locale
    if (i18next.language !== locale) {
      i18next.changeLanguage(locale);
    }
    return;
  }

  if (!isInitialized) {
    i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        resources: {
          [locale]: { translation: translations }
        },
        interpolation: {
          escapeValue: false
        },
        detection: {
          order: ['cookie', 'localStorage', 'navigator'],
          caches: ['cookie', 'localStorage'],
          cookieOptions: { path: '/', sameSite: 'strict' }
        },
        react: {
          useSuspense: false
        }
      });
    
    isInitialized = true;
    loadedLanguages.add(locale);
  } else {
    // Add new language resources
    i18next.addResourceBundle(locale, 'translation', translations, true, true);
    loadedLanguages.add(locale);
    i18next.changeLanguage(locale);
  }
}

// Lazy load translations for client-side language switching
export async function loadLanguage(lng: Locale): Promise<boolean> {
  const langCode = lng.split('-')[0] as Locale;
  
  if (!locales.includes(langCode)) {
    console.warn(`Unsupported locale: ${langCode}`);
    return false;
  }

  if (loadedLanguages.has(langCode)) {
    await i18next.changeLanguage(langCode);
    return true;
  }
  
  try {
    const translation = await import(`@/locales/${langCode}.json`);
    i18next.addResourceBundle(langCode, 'translation', translation.default, true, true);
    loadedLanguages.add(langCode);
    await i18next.changeLanguage(langCode);
    return true;
  } catch (error) {
    console.error(`Failed to load language: ${langCode}`, error);
    return false;
  }
}

// Custom hook for translations
export function useTranslation() {
  return useTranslationBase();
}

// Get current language
export function getCurrentLanguage(): Locale {
  return (i18next.language?.split('-')[0] || defaultLocale) as Locale;
}

// Change language
export async function changeLanguage(locale: Locale): Promise<boolean> {
  return loadLanguage(locale);
}

export default i18next;
