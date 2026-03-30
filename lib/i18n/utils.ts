import { Locale, defaultLocale } from './settings';

/**
 * Safely get a nested translation value with fallback to default locale
 * @param translations - The translations object
 * @param key - Dot-notation key (e.g., "projects.items.ags.title")
 * @param locale - Current locale
 * @param defaultTranslations - Default locale translations (optional)
 * @returns The translated value or the key if not found
 */
export function getTranslationWithFallback(
  translations: any,
  key: string,
  locale: Locale,
  defaultTranslations?: any
): any {
  const keys = key.split('.');
  let value = translations;
  let defaultValue = defaultTranslations;

  // Try to get value from current locale
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      value = undefined;
      break;
    }
  }

  // If value found, return it
  if (value !== undefined) {
    return value;
  }

  // Fallback to default locale if available and different from current
  if (defaultTranslations && locale !== defaultLocale) {
    for (const k of keys) {
      if (defaultValue && typeof defaultValue === 'object' && k in defaultValue) {
        defaultValue = defaultValue[k];
      } else {
        defaultValue = undefined;
        break;
      }
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
  }

  // Return the key itself as last resort
  return key;
}
