import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, Calendar, Users, Lock, Tag } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { getServerTranslations } from '@/lib/i18n/server';
import { Locale } from '@/lib/i18n/settings';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

// Project data structure
interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  isPrivate: boolean;
  organization: string;
  period: string;
  role: string;
  github: string;
  demo: string;
  tags: string[];
  overview: string;
  challenges: string[];
  solutions: string[];
  impact: string[];
  techStack: Record<string, string[]>;
}

// Project data - matches the structure from ProjectPreview.jsx
const projectsData: Record<string, ProjectData> = {
  'ags': {
    id: 'ags',
    title: 'AGS - Automated Grading System',
    subtitle: 'Production LLM Application for Educational Assessment',
    isPrivate: true,
    organization: 'Chiang Mai University, Dept. of Computer Science',
    period: 'Jun 2024 — Dec 2024',
    role: 'DevOps Engineer (Contract)',
    github: 'https://github.com/AGS-CMU/ags',
    demo: 'https://ags.cs.science.cmu.ac.th',
    tags: ['Flask', 'AWS (ECS, Aurora, S3)', 'Docker', 'GPT-3.5', 'SQLAlchemy', 'CI/CD', 'GitHub Actions'],
    overview: 'Built a production LLM application using GPT-3.5 with structured prompt engineering and token-budget controls, reducing turnaround time by 80% (5 days → 1 day) while managing inference cost at scale for 80+ students.',
    challenges: [
      'Managing LLM inference costs at scale for 80+ students',
      'Ensuring consistent grading quality across diverse assignment types',
      'Implementing secure authentication and authorization for academic data',
      'Optimizing response time while maintaining accuracy',
    ],
    solutions: [
      'Implemented structured prompt engineering with token-budget controls to optimize GPT-3.5 usage',
      'Designed a secure REST API with Flask and SQLAlchemy for structured data querying',
      'Containerized the application with Docker for consistent deployment',
      'Automated CI/CD pipelines using GitHub Actions for reliable releases',
      'Leveraged AWS services (ECS, Aurora, S3) for scalability and reliability',
    ],
    impact: [
      '80% reduction in grading turnaround time (5 days → 1 day)',
      'Successfully served 80+ students with consistent performance',
      'Maintained cost-effective LLM inference at scale',
      'Achieved high system reliability through automated testing and deployment',
    ],
    techStack: {
      'Backend': ['Flask', 'Flask-RESTX', 'SQLAlchemy', 'Gunicorn'],
      'AI/LLM': ['OpenAI GPT-3.5', 'Prompt Engineering', 'Token Optimization'],
      'Cloud & DevOps': ['AWS ECS', 'AWS Aurora', 'AWS S3', 'Docker', 'GitHub Actions'],
      'Database': ['PostgreSQL (Aurora)', 'SQLAlchemy ORM'],
      'Testing': ['Pytest', 'Automated Testing'],
    },
  },
  'eza-alias': {
    id: 'eza-alias',
    title: 'Eza Alias Configuration',
    subtitle: 'Modern Terminal File Navigation Enhancement',
    isPrivate: false,
    organization: 'Open Source Community',
    period: '2023 — Present',
    role: 'Creator & Maintainer',
    github: 'https://gist.github.com/AppleBoiy/04a249b6f64fd0fe1744aff759a0563b',
    demo: '',
    tags: ['Shell', 'CLI', 'Productivity', 'Bash', 'Zsh'],
    overview: 'Popular Gist providing a comprehensive alias setup for eza (modern ls replacement). Includes color schemes, icons, and productivity-enhancing shortcuts for better terminal file navigation. Used by developers worldwide.',
    challenges: [
      'Creating intuitive aliases that enhance productivity without overwhelming users',
      'Ensuring compatibility across different shell environments (bash, zsh)',
      'Balancing feature richness with simplicity',
    ],
    solutions: [
      'Designed a hierarchical alias system with progressive complexity',
      'Implemented color-coded output for better visual parsing',
      'Added icon support for file type recognition',
      'Created comprehensive documentation with usage examples',
    ],
    impact: [
      '62+ stars on GitHub Gist',
      'Used by developers worldwide',
      'Improved terminal productivity for hundreds of users',
      'Active community engagement and feedback',
    ],
    techStack: {
      'Shell': ['Bash', 'Zsh', 'Shell Scripting'],
      'Tools': ['eza', 'Terminal Emulators'],
    },
  },
};

type Props = {
  params: Promise<{ locale: Locale; projectId: string }>;
};

// Generate static params for all projects
export async function generateStaticParams() {
  const projectIds = Object.keys(projectsData);
  const locales: Locale[] = ['en', 'ja', 'th'];
  
  // Generate all combinations of locale and projectId
  const params = locales.flatMap((locale) =>
    projectIds.map((projectId) => ({
      locale,
      projectId,
    }))
  );
  
  return params;
}

// Generate metadata for each project
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, projectId } = await params;
  const project = projectsData[projectId];

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Chaipat Jainan`,
    description: project.overview,
    keywords: project.tags,
    openGraph: {
      title: `${project.title} | Chaipat Jainan`,
      description: project.overview,
      url: `https://chaipat.cc/${locale}/projects/${projectId}`,
      type: 'article',
      publishedTime: project.period.split('—')[0].trim(),
      modifiedTime: project.period.split('—')[1]?.trim(),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Chaipat Jainan`,
      description: project.overview,
    },
    alternates: {
      canonical: `https://chaipat.cc/${locale}/projects/${projectId}`,
      languages: {
        en: `https://chaipat.cc/en/projects/${projectId}`,
        ja: `https://chaipat.cc/ja/projects/${projectId}`,
        th: `https://chaipat.cc/th/projects/${projectId}`,
      },
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, projectId } = await params;
  const project = projectsData[projectId];

  // Return 404 if project not found
  if (!project) {
    notFound();
  }

  // Initialize translations on server
  const { t } = await getServerTranslations(locale);
  const translations = await import(`@/locales/${locale}.json`);

  const breadcrumbItems = [
    { label: t('breadcrumbs.projects'), href: `/${locale}/projects` },
    { label: project.title, href: `/${locale}/projects/${projectId}` }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.overview,
    author: {
      '@type': 'Person',
      name: 'Chaipat Jainan',
      url: 'https://chaipat.cc',
    },
    dateCreated: project.period.split('—')[0].trim(),
    dateModified: project.period.split('—')[1]?.trim() || project.period.split('—')[0].trim(),
    programmingLanguage: project.tags,
    codeRepository: project.github,
    url: `https://chaipat.cc/${locale}/projects/${projectId}`,
    ...(project.demo && !project.isPrivate && { applicationCategory: 'WebApplication' }),
    keywords: project.tags.join(', '),
    isAccessibleForFree: !project.isPrivate,
    creator: {
      '@type': 'Organization',
      name: project.organization,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageWrapper locale={locale} translations={translations.default}>
        <main className="min-h-screen bg-background">
          <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
              <Breadcrumbs items={breadcrumbItems} />

            {/* Header */}
            <div className="mb-12">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  {project.isPrivate && (
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
                      <Lock size={12} />
                      Private Project
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar size={14} />
                    {project.period}
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{project.subtitle}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users size={16} className="text-accent" />
                  {project.organization}
                </span>
                <span className="text-sm text-muted-foreground">
                  Role: <span className="text-foreground font-medium">{project.role}</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-card border border-border rounded-full text-sm font-medium hover:border-accent/40 transition-colors flex items-center gap-2"
                >
                  <Github size={16} />
                  {project.isPrivate ? 'Private Repository' : 'View Code'}
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    {project.isPrivate ? 'Request Demo Access' : 'Live Demo'}
                  </a>
                )}
              </div>
            </div>

            {/* Overview */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
            </section>

            {/* Challenges */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Challenges</h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-muted-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Solutions */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Solutions</h2>
              <ul className="space-y-3">
                {project.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-muted-foreground">{solution}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Impact */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Impact</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.impact.map((item, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5">
                    <p className="text-foreground font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Tech Stack</h2>
              <div className="space-y-6">
                {Object.entries(project.techStack).map(([category, technologies]) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
                      <Tag size={14} />
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 text-sm bg-muted text-foreground rounded-full border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tags */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm bg-accent/10 text-accent rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      </PageWrapper>
    </>
  );
}
