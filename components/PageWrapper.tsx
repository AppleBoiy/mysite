'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    initClientI18n(locale, translations);
  }, [locale, translations]);

  return (
    <>
      <Navbar locale={locale} showGithubButton={showGithubButton} />
      {children}
    </>
  );
}
