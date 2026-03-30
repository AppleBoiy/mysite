'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitFork, Lock, Grid3x3, List } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Locale } from '@/lib/i18n/settings';
import { projects, getProjectUrl } from '@/data/projects';
import { getProjectIcon, getProjectLabel, getProjectTypeBadge } from '@/lib/project-utils';

type ViewMode = 'grid' | 'list';

interface ProjectsGridProps {
  locale: Locale;
}

export default function ProjectsGrid({ locale }: ProjectsGridProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const allProjects = projects.map(proj => ({
    ...proj,
    title: t(`projects.items.${proj.id}.title`),
    description: t(`projects.items.${proj.id}.description`),
  }));

  // Generate categories dynamically
  const categories = [
    { name: 'All Projects', count: allProjects.length },
    { name: 'GitHub', count: allProjects.filter(p => p.type === 'github').length },
    { name: 'Gist', count: allProjects.filter(p => p.type === 'gist').length },
    { name: 'Data', count: allProjects.filter(p => p.type === 'data').length },
    { name: 'Template', count: allProjects.filter(p => p.type === 'template').length },
    { name: 'Showcase', count: allProjects.filter(p => p.isShowcase).length },
  ].filter(cat => cat.count > 0); // Only show categories with projects

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      if (selectedCategory === 'All Projects') return true;
      if (selectedCategory === 'GitHub') return project.type === 'github';
      if (selectedCategory === 'Gist') return project.type === 'gist';
      if (selectedCategory === 'Data') return project.type === 'data';
      if (selectedCategory === 'Template') return project.type === 'template';
      if (selectedCategory === 'Showcase') return project.isShowcase;
      return true;
    });
  }, [allProjects, selectedCategory]);

  const handlePrivateDemoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.info(t('projects.requestDemoMessage'), {
      duration: 5000,
    });
  };

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.name
                ? 'bg-accent text-accent-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* View Toggle and Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredProjects.length} projects
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 gap-6' : 'flex flex-col gap-4'}>
        {filteredProjects.map((project, i) => {
          const isShowcase = projects.find(p => p.id === project.id)?.isShowcase;
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ 
                y: isShowcase ? -8 : -4,
                scale: isShowcase ? 1.02 : 1,
                transition: { duration: 0.3 }
              }}
              className={`bg-card border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden ${
                isShowcase
                  ? 'border-2 border-amber-500/50 hover:border-amber-500/80 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-card shadow-lg shadow-amber-500/10'
                  : project.isPrivate
                  ? 'border-primary/40 hover:border-primary/60'
                  : 'border-border hover:border-accent/30'
              } ${viewMode === 'list' ? 'flex gap-6' : 'flex flex-col'}`}
            >
              {/* Showcase glow effects */}
              {isShowcase && (
                <>
                  <div className="absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 -ml-16 -mb-16 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </>
              )}
              
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isShowcase
                        ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30'
                        : project.isPrivate 
                        ? 'bg-primary/10' 
                        : 'bg-muted'
                    }`}>
                      {getProjectIcon(project.type, project.isPrivate)}
                    </div>
                    {isShowcase && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-600 dark:text-amber-400 rounded-full border border-amber-500/30">
                        Showcase
                      </span>
                    )}
                    {!isShowcase && project.isPrivate && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Private
                      </span>
                    )}
                    {!isShowcase && !project.isPrivate && getProjectTypeBadge(project.type) && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                        {getProjectTypeBadge(project.type)}
                      </span>
                    )}
                  </div>
                  {!project.isPrivate && project.stars !== null && project.stars !== undefined && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star size={13} /> {project.stars}
                      </span>
                      {project.forks !== undefined && (
                        <span className="flex items-center gap-1">
                          <GitFork size={13} /> {project.forks}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                  isShowcase
                    ? 'text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400'
                    : project.isPrivate
                    ? 'text-foreground group-hover:text-primary'
                    : 'text-foreground group-hover:text-accent'
                }`}>
                  <Link href={`/${locale}/projects/${project.id}`} className="hover:underline">
                    {isShowcase && '✨ '}{project.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        isShowcase
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {getProjectUrl(project) && (
                    <a
                      href={getProjectUrl(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        isShowcase
                          ? 'text-foreground hover:text-amber-600 dark:hover:text-amber-400'
                          : project.isPrivate
                          ? 'text-foreground hover:text-primary'
                          : 'text-foreground hover:text-accent'
                      }`}
                    >
                      {getProjectIcon(project.type, project.isPrivate, 15)}
                      {getProjectLabel(project.type, t, project.isPrivate)}
                    </a>
                  )}
                  {project.demo && (
                    project.isPrivate ? (
                      <button
                        onClick={handlePrivateDemoClick}
                        className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <Lock size={15} /> {t('projects.requestDemo')}
                      </button>
                    ) : (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-sm transition-colors ${
                          isShowcase
                            ? 'text-foreground hover:text-amber-600 dark:hover:text-amber-400'
                            : 'text-foreground hover:text-accent'
                        }`}
                      >
                        <ExternalLink size={15} /> {t('projects.liveDemo')}
                      </a>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </>
  );
}
