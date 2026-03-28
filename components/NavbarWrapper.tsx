import { Locale } from '@/lib/i18n/settings';
import ClientNavbar from './ClientNavbar';

interface NavbarWrapperProps {
  locale: Locale;
  hasBanner?: boolean;
  customContent?: React.ReactNode;
  showGithubButton?: boolean;
}

export default async function NavbarWrapper({ 
  locale,
  ...props 
}: NavbarWrapperProps) {
  // Load translations on the server
  const translations = await import(`@/locales/${locale}.json`);

  return (
    <ClientNavbar 
      locale={locale} 
      translations={translations.default}
      {...props}
    />
  );
}
