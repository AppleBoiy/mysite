'use client';

import { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Locale } from '@/lib/i18n/settings';
import { initClientI18n } from '@/lib/i18n/client';
import Navbar from './Navbar';

interface PageWrapperProps {
  locale: Locale;
  translations: any;
  showGithubButton?: boolean;
  children: React.ReactNode;
}

export default function PageWrapper({ 
  locale, 
  translations,
  showGithubButton = false,
  children 
}: PageWrapperProps) {
  
  // useState with a callback guarantees this ONLY runs once on the initial render.
  // It runs synchronously on both the server and client, preventing the hydration mismatch!
  const [i18nInstance] = useState(() => initClientI18n(locale, translations));

  return (
    // Wrap your app in the provider so useTranslation() hooks can find the instance
    <I18nextProvider i18n={i18nInstance}>
      <Navbar locale={locale} showGithubButton={showGithubButton} />
      {children}
    </I18nextProvider>
  );
}