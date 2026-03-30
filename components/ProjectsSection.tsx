'use client';

import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getFeaturedProjects, getProjectUrl } from "@/data/projects";
import { getProjectIcon, getProjectLabel, getProjectTypeBadge } from "@/lib/project-utils";

export default function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  
  const handlePrivateDemoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.info(t('projects.requestDemoMessage'), {
      duration: 5000,
    });
  };

  const featuredProjects = getFeaturedProjects().map(proj => ({
    ...proj,
    title: t(`projects.items.${proj.id}.title`),
    description: t(`projects.items.${proj.id}.description`),
  }));

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-sm tracking-[0.2em] uppercase text-accent font-medium">
              {t('projects.title')}
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {t('projects.heading')} <span className="italic">{t('projects.headingItalic')}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            {t('projects.description')}
          </p>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            {t('projects.viewAllProjects')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => {
            const isShowcase = project.isShowcase;
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  y: isShowcase ? -12 : -8, 
                  scale: isShowcase ? 1.02 : 1,
                  transition: { duration: 0.3 } 
                }}
                className={`bg-card border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group flex flex-col relative overflow-hidden ${
                  isShowcase
                    ? 'border-2 border-amber-500/50 hover:border-amber-500/80 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-card shadow-lg shadow-amber-500/10'
                    : project.isPrivate 
                    ? 'border-primary/40 hover:border-primary/60' 
                    : 'border-border hover:border-accent/30'
                }`}
              >
                {/* Showcase glow effects */}
                {isShowcase && (
                  <>
                    <div className="absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 -ml-16 -mb-16 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </>
                )}
                
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
                  {!project.isPrivate && project.stars !== undefined && (
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
                  {project.hasPreview ? (
                    <Link href={`/${locale}/projects/${project.id}`} className="hover:underline">
                      {isShowcase && '✨ '}{project.title}
                    </Link>
                  ) : (
                    <>{isShowcase && '✨ '}{project.title}</>
                  )}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
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
                      {getProjectIcon(project.type, project.isPrivate)}
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
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
