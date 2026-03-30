import { createInstance, i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { Locale, defaultLocale } from './settings';

// Cache for loaded translations
const translationCache = new Map<Locale, any>();

async function loadTranslation(locale: Locale) {
  if (translationCache.has(locale)) {
    return translationCache.get(locale);
  }

  try {
    const translation = await import(`@/locales/${locale}.json`);
    translationCache.set(locale, translation.default);
    return translation.default;
  } catch (error) {
    console.error(`Failed to load translation for locale: ${locale}`, error);
    // Fallback to default locale
    if (locale !== defaultLocale) {
      return loadTranslation(defaultLocale);
    }
    return {};
  }
}

export async function getServerTranslations(locale: Locale): Promise<I18nInstance> {
  const i18nInstance = createInstance();
  const translation = await loadTranslation(locale);
  const defaultTranslation = locale !== defaultLocale ? await loadTranslation(defaultLocale) : translation;

  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: locale,
      resources: {
        [locale]: {
          translation
        },
        [defaultLocale]: {
          translation: defaultTranslation
        }
      },
      fallbackLng: defaultLocale,
      interpolation: {
        escapeValue: false
      }
    });

  return i18nInstance;
}

export async function getTranslation(locale: Locale, key: string, defaultValue?: string): Promise<string> {
  const i18n = await getServerTranslations(locale);
  return i18n.t(key, defaultValue || key);
}
