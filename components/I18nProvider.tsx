'use client';

import { useEffect, useRef } from 'react';
import { Locale } from '@/lib/i18n/settings';
import { initClientI18n } from '@/lib/i18n/client';

interface I18nProviderProps {
  locale: Locale;
  translations: any;
  children: React.ReactNode;
}

export default function I18nProvider({ 
  locale, 
  translations, 
  children 
}: I18nProviderProps) {
  const initialized = useRef(false);

  // Initialize i18n synchronously before first render
  if (!initialized.current && typeof window !== 'undefined') {
    initClientI18n(locale, translations);
    initialized.current = true;
  }

  useEffect(() => {
    // Ensure i18n is initialized and updated when locale changes
    if (!initialized.current) {
      initClientI18n(locale, translations);
      initialized.current = true;
    }
  }, [locale, translations]);

  return <>{children}</>;
}
