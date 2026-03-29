'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationBase } from 'react-i18next';
import { Locale, defaultLocale, locales } from './settings';

// Keep a single instance for the browser to avoid re-initializing
let clientInstance: any = null;
const loadedLanguages = new Set<string>();

// Initialize i18next for both server and client
export function initClientI18n(locale: Locale, translations: any) {
  // 1. If we are in the browser and already initialized, reuse the instance
  if (typeof window !== 'undefined' && clientInstance) {
    if (clientInstance.language !== locale) {
      clientInstance.changeLanguage(locale);
    }
    return clientInstance;
  }

  // 2. Create a fresh instance. 
  // (Crucial for SSR so different users' requests don't leak languages!)
  const newInstance = i18next.createInstance();

  newInstance
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
      // 3. CRITICAL FOR HYDRATION: Force synchronous initialization
      initImmediate: false, 
    });
  
  loadedLanguages.add(locale);

  // 4. Save the instance globally for the browser so lazy loading works
  if (typeof window !== 'undefined') {
    clientInstance = newInstance;
  }

  return newInstance;
}

// Lazy load translations for client-side language switching
export async function loadLanguage(lng: Locale): Promise<boolean> {
  const langCode = lng.split('-')[0] as Locale;
  const instance = clientInstance || i18next;
  
  if (!locales.includes(langCode)) {
    console.warn(`Unsupported locale: ${langCode}`);
    return false;
  }

  if (loadedLanguages.has(langCode)) {
    await instance.changeLanguage(langCode);
    return true;
  }
  
  try {
    const translation = await import(`@/locales/${langCode}.json`);
    instance.addResourceBundle(langCode, 'translation', translation.default, true, true);
    loadedLanguages.add(langCode);
    await instance.changeLanguage(langCode);
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
  const instance = clientInstance || i18next;
  return (instance.language?.split('-')[0] || defaultLocale) as Locale;
}

// Change language
export async function changeLanguage(locale: Locale): Promise<boolean> {
  return loadLanguage(locale);
}

export default i18next;