'use client';

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
  // Initialize translations synchronously before render to prevent hydration mismatch
  initClientI18n(locale, translations);

  return <Navbar locale={locale} {...props} />;
}
