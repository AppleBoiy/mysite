'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Lock, Grid3x3, List } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Locale } from '@/lib/i18n/settings';

const allProjectsData = [
  {
    id: 'ags',
    category: 'Web Apps',
    tags: ['Flask', 'AWS', 'Docker', 'GPT-3.5'],
    github: 'https://github.com/AGS-CMU/ags',
    demo: 'https://ags.cs.science.cmu.ac.th',
    stars: null,
    forks: null,
    isPrivate: true,
  },
  {
    id: 'ezaAlias',
    category: 'DevOps',
    tags: ['Shell', 'CLI', 'Productivity'],
    github: 'https://gist.github.com/AppleBoiy/04a249b6f64fd0fe1744aff759a0563b',
    demo: '',
    stars: 62,
    forks: 6,
    isPrivate: false,
  },
];

type ViewMode = 'grid' | 'list';

interface ProjectsGridProps {
  locale: Locale;
}

export default function ProjectsGrid({ locale }: ProjectsGridProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const projects = allProjectsData.map(proj => ({
    ...proj,
    title: t(`projects.items.${proj.id}.title`),
    description: t(`projects.items.${proj.id}.description`),
  }));

  const categories = [
    { name: 'All Projects', count: projects.length },
    { name: 'Web Apps', count: projects.filter(p => p.category === 'Web Apps').length },
    { name: 'AI/ML', count: projects.filter(p => p.category === 'AI/ML').length },
    { name: 'DevOps', count: projects.filter(p => p.category === 'DevOps').length },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'All Projects' || project.category === selectedCategory;
      return matchesCategory;
    });
  }, [projects, selectedCategory]);

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
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`bg-card border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group ${
              project.isPrivate
                ? 'border-primary/40 hover:border-primary/60'
                : 'border-border hover:border-accent/30'
            } ${viewMode === 'list' ? 'flex gap-6' : 'flex flex-col'}`}
          >
            <div className={viewMode === 'list' ? 'flex-1' : ''}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    project.isPrivate ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    {project.isPrivate ? (
                      <Lock size={20} className="text-primary" />
                    ) : (
                      <Github size={20} className="text-foreground" />
                    )}
                  </div>
                  {project.isPrivate && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      Private
                    </span>
                  )}
                </div>
                {!project.isPrivate && project.stars !== null && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star size={13} /> {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={13} /> {project.forks}
                    </span>
                  </div>
                )}
              </div>

              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                project.isPrivate
                  ? 'text-foreground group-hover:text-primary'
                  : 'text-foreground group-hover:text-accent'
              }`}>
                <Link href={`/${locale}/projects/${project.id}`} className="hover:underline">
                  {project.title}
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 text-sm transition-colors ${
                    project.isPrivate
                      ? 'text-foreground hover:text-primary'
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  <Github size={15} /> {project.isPrivate ? t('projects.privateRepo') : t('projects.code')}
                </a>
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
                      className="flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink size={15} /> {t('projects.liveDemo')}
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </>
  );
}
