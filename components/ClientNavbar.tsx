'use client';

import { useEffect } from 'react';
import Navbar from './Navbar';
import { Locale } from '@/lib/i18n/settings';
import { initClientI18n } from '@/lib/i18n/client';

interface ClientNavbarProps {
  locale: Locale;
  translations: any;
  customContent?: React.ReactNode;
  showGithubButton?: boolean;
}

export default function ClientNavbar({ 
  locale, 
  translations,
  ...props 
}: ClientNavbarProps) {
  useEffect(() => {
    initClientI18n(locale, translations);
  }, [locale, translations]);

  return <Navbar locale={locale} {...props} />;
}
