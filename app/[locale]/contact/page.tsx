import { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';
import PageWrapper from '@/components/PageWrapper';
import { getServerTranslations } from '@/lib/i18n/server';
import { Locale } from '@/lib/i18n/settings';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getServerTranslations(locale);

  return {
    title: t('contact.title'),
    description: t('contactPage.hero.description'),
    openGraph: {
      title: t('contactPage.hero.title'),
      description: t('contactPage.hero.description'),
      type: 'website',
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  
  // Initialize translations on server
  await getServerTranslations(locale);
  const translations = await import(`@/locales/${locale}.json`);

  return (
    <PageWrapper locale={locale} translations={translations.default}>
      <main className="min-h-screen">
        <ContactSection />
      </main>
    </PageWrapper>
  );
}
