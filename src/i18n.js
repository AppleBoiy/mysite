import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Cache for loaded languages
const loadedLanguages = new Set();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {}, // Start empty, load dynamically
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // Disable suspense to handle loading manually
    },
  });

// Lazy load translations with proper async handling
export const loadLanguage = async (lng) => {
  const langCode = lng.split('-')[0]; // Handle en-US -> en
  
  if (loadedLanguages.has(langCode)) {
    return true; // Already loaded
  }
  
  try {
    const translation = await import(`./locales/${langCode}.json`);
    i18n.addResourceBundle(langCode, 'translation', translation.default, true, true);
    loadedLanguages.add(langCode);
    return true;
  } catch (error) {
    console.error(`Failed to load language: ${langCode}`, error);
    return false;
  }
};

// Load initial language
const detectedLng = i18n.language?.split('-')[0] || 'en';
loadLanguage(detectedLng);

export default i18n;
