import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import I18nProvider from '@/components/I18nProvider';
import RouteAnnouncer from '@/components/RouteAnnouncer';
import { AnalyticsWrapper } from '@/components/AnalyticsWrapper';
import { Locale, locales } from '@/lib/i18n/settings';
import { env } from '@/lib/env';
import '../globals.css';

// SEO metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params as { locale: Locale };
  
  const titles = {
    en: 'Chaipat Jainan - Portfolio',
    ja: 'チャイパット・ジャイナン - ポートフォリオ',
    th: 'ชัยภัทร ใจนาน - Portfolio',
  };
  
  const descriptions = {
    en: 'CS Student & Applied LLM Engineer specializing in RAG pipelines, Knowledge Graphs, and backend engineering',
    ja: 'RAGパイプライン、ナレッジグラフ、バックエンドエンジニアリングを専門とするCS学生および応用LLMエンジニア',
    th: 'นักศึกษาวิทยาการคอมพิวเตอร์และวิศวกร LLM ที่เชี่ยวชาญด้าน RAG pipelines, Knowledge Graphs และ backend engineering',
  };

  const title = titles[locale];
  const description = descriptions[locale];
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const canonicalUrl = `${siteUrl}/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: [
      'Chaipat Jainan',
      'Portfolio',
      'CS Student',
      'LLM Engineer',
      'RAG',
      'Knowledge Graphs',
      'Backend Engineering',
      'Software Developer',
    ],
    authors: [{ name: 'Chaipat Jainan', url: siteUrl }],
    creator: 'Chaipat Jainan',
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'ja' ? 'ja_JP' : 'th_TH',
      url: canonicalUrl,
      title,
      description,
      siteName: 'Chaipat Jainan Portfolio',
      images: [
        {
          url: `${siteUrl}/profile.webp`,
          width: 1200,
          height: 630,
          alt: 'Chaipat Jainan',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@AppleBoiy',
      images: [`${siteUrl}/profile.webp`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en`,
        ja: `${siteUrl}/ja`,
        th: `${siteUrl}/th`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params as { locale: Locale };
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('chaipat-theme');
  const theme = themeCookie?.value || 'system';

  // Load translations on the server
  const translations = await import(`@/locales/${locale}.json`);

  // JSON-LD structured data
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Chaipat Jainan',
        url: siteUrl,
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/profile.webp`,
        },
        jobTitle: 'CS Student & Applied LLM Engineer',
        description:
          'CS Student & Applied LLM Engineer specializing in RAG pipelines, Knowledge Graphs, and backend engineering',
        sameAs: [
          'https://github.com/AppleBoiy',
          'https://twitter.com/AppleBoiy',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Chaipat Jainan Portfolio',
        description:
          'Portfolio website showcasing projects, publications, and experience',
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
        inLanguage: locale,
      },
    ],
  };

  return (
    <html lang={locale} className={theme} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem
          storageKey="chaipat-theme"
        >
          <I18nProvider locale={locale} translations={translations.default}>
            <RouteAnnouncer />
            {children}
          </I18nProvider>
        </ThemeProvider>
        {/* 
          Vercel Analytics & Speed Insights Integration
          
          GDPR Compliance:
          - Both services are GDPR-compliant by default
          - No third-party cookies are used
          - No personal identifiers are collected
          - Data is anonymized and aggregated
          - No cross-site tracking
          
          Privacy Configuration:
          - beforeSend filter removes sensitive query parameters
          - Sensitive params: token, email, user, id, session
          
          Async Loading:
          - Components are placed at end of body
          - Non-blocking script loading
          - Does not impact page rendering performance
          
          Requirements: 8.1, 8.2, 8.4, 8.5
        */}
        <AnalyticsWrapper />
        <SpeedInsights />
      </body>
    </html>
  );
}
