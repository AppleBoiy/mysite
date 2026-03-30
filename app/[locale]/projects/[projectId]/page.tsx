import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalLink, Calendar, Users, Lock, Tag } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import ProjectContentBlock from '@/components/ProjectContentBlock';
import ProjectTableOfContents from '@/components/ProjectTableOfContents';
import { getServerTranslations } from '@/lib/i18n/server';
import { Locale } from '@/lib/i18n/settings';
import Breadcrumbs from '@/components/Breadcrumbs';
import { projects, getProjectById, getProjectUrl } from '@/data/projects';
import { getProjectIcon } from '@/lib/project-utils';
import { hasCustomPage, getCustomPage } from './custom-pages';

type Props = {
  params: Promise<{ locale: Locale; projectId: string }>;
};

// Generate static params for all projects with details
export async function generateStaticParams() {
  const projectsWithDetails = projects.filter(p => p.hasPreview);
  const locales: Locale[] = ['en', 'ja', 'th'];
  
  const params = locales.flatMap((locale) =>
    projectsWithDetails.map((project) => ({
      locale,
      projectId: project.id,
    }))
  );
  
  return params;
}

// Generate metadata for each project
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, projectId } = await params;
  const project = getProjectById(projectId);
  const { t } = await getServerTranslations(locale);

  if (!project || !project.details?.hasDetails) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = t(`projects.items.${project.id}.title`);
  const description = t(`projects.items.${project.id}.description`);
  const overview = t(`projects.items.${project.id}.details.overview`);

  return {
    title: `${title} | Chaipat Jainan`,
    description: overview || description,
    keywords: project.tags,
    openGraph: {
      title: `${title} | Chaipat Jainan`,
      description: overview || description,
      url: `https://chaipat.cc/${locale}/projects/${projectId}`,
      type: 'article',
      publishedTime: project.details.period?.split('—')[0].trim(),
      modifiedTime: project.details.period?.split('—')[1]?.trim(),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Chaipat Jainan`,
      description: overview || description,
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
  
  // Check if project has a custom page
  if (hasCustomPage(projectId)) {
    const CustomPage = getCustomPage(projectId);
    if (CustomPage) {
      return <CustomPage locale={locale} projectId={projectId} />;
    }
  }
  
  // Otherwise, use the default template
  const project = getProjectById(projectId);

  // Return 404 if project not found or no details
  if (!project || !project.details?.hasDetails) {
    notFound();
  }

  const details = project.details;
  const { t } = await getServerTranslations(locale);
  const translations = await import(`@/locales/${locale}.json`);
  
  const title = t(`projects.items.${project.id}.title`);
  const description = t(`projects.items.${project.id}.description`);
  
  // Get translated detail fields
  const subtitle = t(`projects.items.${project.id}.details.subtitle`);
  const organization = t(`projects.items.${project.id}.details.organization`);
  const role = t(`projects.items.${project.id}.details.role`);
  const overview = t(`projects.items.${project.id}.details.overview`);
  
  // Get arrays from translations
  const detailsData = translations.default.projects.items[project.id]?.details;
  const challenges = detailsData?.challenges || [];
  const solutions = detailsData?.solutions || [];
  const impact = detailsData?.impact || [];
  const techStack = detailsData?.techStack || {};

  const breadcrumbItems = [
    { label: t('breadcrumbs.projects'), href: `/${locale}/projects` },
    { label: title, href: `/${locale}/projects/${projectId}` }
  ];

  // Build table of contents
  const tocSections = [
    { id: 'overview', title: 'Overview', level: 1 },
    ...(challenges.length > 0 ? [{ id: 'challenges', title: 'Challenges', level: 1 }] : []),
    ...(solutions.length > 0 ? [{ id: 'solutions', title: 'Solutions', level: 1 }] : []),
    ...(impact.length > 0 ? [{ id: 'impact', title: 'Impact', level: 1 }] : []),
    ...(Object.keys(techStack).length > 0 ? [{ id: 'tech-stack', title: 'Tech Stack', level: 1 }] : []),
    { id: 'tags', title: 'Tags', level: 1 },
    ...(details.sections?.map((section, index) => ({
      id: `section-${index}`,
      title: detailsData?.sections?.[index]?.title || section.title,
      level: 1,
    })) || []),
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description: overview || description,
    author: {
      '@type': 'Person',
      name: 'Chaipat Jainan',
      url: 'https://chaipat.cc',
    },
    dateCreated: details.period?.split('—')[0].trim(),
    dateModified: details.period?.split('—')[1]?.trim() || details.period?.split('—')[0].trim(),
    programmingLanguage: project.tags,
    codeRepository: getProjectUrl(project),
    url: `https://chaipat.cc/${locale}/projects/${projectId}`,
    ...(project.demo && !project.isPrivate && { applicationCategory: 'WebApplication' }),
    keywords: project.tags.join(', '),
    isAccessibleForFree: !project.isPrivate,
    creator: {
      '@type': 'Organization',
      name: organization,
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
            <div className="max-w-7xl mx-auto px-6">
              <Breadcrumbs items={breadcrumbItems} />

              <div className="flex gap-8">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
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
                        {details.period && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar size={14} />
                            {details.period}
                          </span>
                        )}
                      </div>
                    </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{subtitle}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                {organization && (
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users size={16} className="text-accent" />
                    {organization}
                  </span>
                )}
                {role && (
                  <span className="text-sm text-muted-foreground">
                    Role: <span className="text-foreground font-medium">{role}</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {getProjectUrl(project) && (
                  <a
                    href={getProjectUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-card border border-border rounded-full text-sm font-medium hover:border-accent/40 transition-colors flex items-center gap-2"
                  >
                    {getProjectIcon(project.type, project.isPrivate, 16)}
                    {project.isPrivate ? 'Private Repository' : 'View Code'}
                  </a>
                )}
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
            {overview && (
              <section id="overview" className="mb-12 scroll-mt-24">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{overview}</p>
              </section>
            )}

            {/* Challenges */}
            {challenges.length > 0 && (
              <section id="challenges" className="mb-12 scroll-mt-24">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Challenges</h2>
                <ul className="space-y-3">
                  {challenges.map((challenge: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Solutions */}
            {solutions.length > 0 && (
              <section id="solutions" className="mb-12 scroll-mt-24">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Solutions</h2>
                <ul className="space-y-3">
                  {solutions.map((solution: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground">{solution}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Impact */}
            {impact.length > 0 && (
              <section id="impact" className="mb-12 scroll-mt-24">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Impact</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {impact.map((item: string, i: number) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <p className="text-foreground font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            {Object.keys(techStack).length > 0 && (
              <section id="tech-stack" className="mb-12 scroll-mt-24">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Tech Stack</h2>
                <div className="space-y-6">
                  {Object.entries(techStack).map(([category, technologies]: [string, any]) => (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
                        <Tag size={14} />
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech: string) => (
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
            )}

            {/* Tags */}
            <section id="tags" className="mb-12 scroll-mt-24">
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

            {/* Custom Sections with Rich Content Blocks */}
            {details.sections && details.sections.length > 0 && (
              <>
                {details.sections.map((section, sectionIndex) => {
                  const sectionTitle = detailsData?.sections?.[sectionIndex]?.title || section.title;
                  
                  return (
                    <section key={sectionIndex} id={`section-${sectionIndex}`} className="mb-12 scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                        {sectionTitle}
                      </h2>
                      <div className="space-y-6">
                        {section.blocks.map((block, blockIndex) => (
                          <ProjectContentBlock key={blockIndex} block={block} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </>
            )}
                </div>

                {/* Table of Contents Sidebar */}
                <ProjectTableOfContents sections={tocSections} />
              </div>
            </div>
          </div>
        </main>
      </PageWrapper>
    </>
  );
}
