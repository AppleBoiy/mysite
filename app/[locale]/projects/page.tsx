import { Metadata } from 'next';
import { getServerTranslations } from '@/lib/i18n/server';
import { Locale } from '@/lib/i18n/settings';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import ProjectsGrid from '@/components/ProjectsGrid';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getServerTranslations(locale);

  const titles: Record<Locale, string> = {
    en: 'Projects - Chaipat Jainan',
    ja: 'プロジェクト - Chaipat Jainan',
    th: 'โปรเจกต์ - Chaipat Jainan',
  };

  const descriptions: Record<Locale, string> = {
    en: 'A selection of open-source projects and experiments from my GitHub, including production LLM applications, developer tools, and contributions to open-source projects.',
    ja: 'GitHubからのオープンソースプロジェクトと実験のセレクション。本番環境のLLMアプリケーション、開発者ツール、オープンソースプロジェクトへの貢献を含みます。',
    th: 'โปรเจกต์โอเพนซอร์สและการทดลองจาก GitHub รวมถึงแอปพลิเคชัน LLM ในระบบ production เครื่องมือสำหรับนักพัฒนา และการมีส่วนร่วมในโปรเจกต์โอเพนซอร์ส',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: [
      'projects',
      'open source',
      'GitHub',
      'LLM applications',
      'developer tools',
      'Flask',
      'AWS',
      'Docker',
      'Python',
      'automation',
    ],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `https://chaipat.cc/${locale}/projects`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description: descriptions[locale],
    },
    alternates: {
      canonical: `https://chaipat.cc/${locale}/projects`,
      languages: {
        en: 'https://chaipat.cc/en/projects',
        ja: 'https://chaipat.cc/ja/projects',
        th: 'https://chaipat.cc/th/projects',
      },
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  
  // Initialize translations on server
  const { t } = await getServerTranslations(locale);
  const translations = await import(`@/locales/${locale}.json`);

  const breadcrumbItems = [
    { label: t('breadcrumbs.projects'), href: `/${locale}/projects` }
  ];

  return (
    <PageWrapper locale={locale} translations={translations.default} showGithubButton>
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="text-center mb-12 mt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-accent" />
              <span className="text-sm tracking-[0.2em] uppercase text-accent font-medium">
                {t('projects.title')}
              </span>
              <div className="h-px w-10 bg-accent" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              {t('projects.heading')} <span className="italic">{t('projects.headingItalic')}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('projects.description')}
            </p>
          </div>

          <ProjectsGrid locale={locale} />
        </div>
      </main>
    </PageWrapper>
  );
}
