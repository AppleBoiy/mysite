import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Locale } from '@/lib/i18n/settings';
import PageWrapper from '@/components/PageWrapper';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import { ExperienceSkeleton, SkillsSkeleton, ProjectsSkeleton, AcademicSkeleton } from '@/components/SkeletonLoaders';

// Dynamic imports for below-fold sections with skeleton loaders
const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), {
  loading: () => <ExperienceSkeleton />,
  ssr: true
});

const SkillsSection = dynamic(() => import('@/components/SkillsSection'), {
  loading: () => <SkillsSkeleton />,
  ssr: true
});

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
  loading: () => <ProjectsSkeleton />,
  ssr: true
});

const AcademicContributions = dynamic(() => import('@/components/AcademicContributions'), {
  loading: () => <AcademicSkeleton />,
  ssr: true
});

// Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<Locale, string> = {
    en: 'Chaipat Jainan - Software Engineer & AI Researcher',
    ja: 'Chaipat Jainan - ソフトウェアエンジニア & AI研究者',
    th: 'Chaipat Jainan - วิศวกรซอฟต์แวร์ & นักวิจัย AI',
  };
  
  const descriptions: Record<Locale, string> = {
    en: 'Final-year CS student with research and industry experience in LLM systems, RAG pipelines, and backend engineering. Built production systems at CMU and contributed to joint research at JAIST.',
    ja: 'LLMシステム、RAGパイプライン、バックエンドエンジニアリングの研究および業界経験を持つCS最終学年の学生。CMUで本番システムを構築し、JAISTでの共同研究に貢献。',
    th: 'นักศึกษาวิทยาการคอมพิวเตอร์ปีสุดท้ายที่มีประสบการณ์วิจัยและอุตสาหกรรมในระบบ LLM, RAG pipelines และ backend engineering สร้างระบบ production ที่ CMU และมีส่วนร่วมในการวิจัยร่วมกับ JAIST',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: [
      'Chaipat Jainan',
      'Software Engineer',
      'AI Researcher',
      'LLM',
      'RAG',
      'Machine Learning',
      'Backend Engineering',
      'Python',
      'Flask',
      'AWS',
      'Chiang Mai University',
      'JAIST',
    ],
    authors: [{ name: 'Chaipat Jainan' }],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `https://chaipat.cc/${locale}`,
      siteName: 'Chaipat Jainan Portfolio',
      images: [
        {
          url: '/profile.webp',
          width: 800,
          height: 800,
          alt: 'Chaipat Jainan',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description: descriptions[locale],
      images: ['/profile.webp'],
      creator: '@AppleBoiy',
    },
    alternates: {
      canonical: `https://chaipat.cc/${locale}`,
      languages: {
        en: 'https://chaipat.cc/en',
        ja: 'https://chaipat.cc/ja',
        th: 'https://chaipat.cc/th',
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  // Load translations on the server
  const translations = await import(`@/locales/${locale}.json`);
  
  return (
    <>
      <PageWrapper locale={locale} translations={translations.default}>
        <main id="main-content" className="min-h-screen bg-background">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <AcademicContributions />
        </main>
      </PageWrapper>
      <Footer locale={locale} />
    </>
  );
}
