'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ExternalLink, Calendar, Users, Lock } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProjectTableOfContents from '@/components/ProjectTableOfContents';
import { getProjectById, getProjectUrl } from '@/data/projects';
import { getProjectIcon } from '@/lib/project-utils';
import { Locale } from '@/lib/i18n/settings';
import { useTranslation } from 'react-i18next';

interface TOCSection {
  id: string;
  title: string;
  level: number;
}

interface CustomPageLayoutProps {
  locale: Locale;
  projectId: string;
  children: ReactNode;
  // Optional: override default header if needed
  hideHeader?: boolean;
  // Optional: custom breadcrumb label
  customBreadcrumbLabel?: string;
  // Optional: table of contents sections
  tocSections?: TOCSection[];
}

/**
 * Standard layout wrapper for custom project pages
 * 
 * Provides:
 * - PageWrapper with navbar
 * - Breadcrumbs
 * - Project header with title, metadata, and action buttons
 * - Consistent spacing and structure
 * 
 * The children prop is where your custom content goes.
 */
export default function CustomPageLayout({
  locale,
  projectId,
  children,
  hideHeader = false,
  customBreadcrumbLabel,
  tocSections = [],
}: CustomPageLayoutProps) {
  const [translations, setTranslations] = useState<any>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    // Load translations dynamically
    import(`@/locales/${locale}.json`).then((module) => {
      setTranslations(module.default);
    });
  }, [locale]);

  const project = getProjectById(projectId);
  
  if (!project || !translations) {
    return null;
  }

  const title = t(`projects.items.${project.id}.title`);
  const subtitle = t(`projects.items.${project.id}.details.subtitle`);
  const organization = t(`projects.items.${project.id}.details.organization`);
  const role = t(`projects.items.${project.id}.details.role`);
  const details = project.details;

  const breadcrumbItems = [
    { label: t('breadcrumbs.projects'), href: `/${locale}/projects` },
    { label: customBreadcrumbLabel || title, href: `/${locale}/projects/${projectId}` }
  ];

  return (
    <PageWrapper locale={locale} translations={translations}>
      <main className="min-h-screen bg-background">
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <Breadcrumbs items={breadcrumbItems} />

            {!hideHeader && (
              <div className="mb-12">
                {/* Metadata badges */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {project.isPrivate && (
                      <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
                        <Lock size={12} />
                        Private Project
                      </span>
                    )}
                    {details?.period && (
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} />
                        {details.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title and subtitle */}
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xl text-muted-foreground mb-6">{subtitle}</p>
                )}

                {/* Organization and role */}
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

                {/* Action buttons */}
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
            )}

            {/* Main content with optional TOC sidebar */}
            <div className="flex gap-8">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {children}
              </div>

              {/* Table of Contents Sidebar */}
              {tocSections.length > 0 && (
                <ProjectTableOfContents sections={tocSections} />
              )}
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
