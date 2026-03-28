import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Lock, FolderGit2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";

const projectsData = [
  {
    id: "ags",
    tags: ["Flask", "AWS (ECS, Aurora, S3)", "Docker", "GPT-3.5", "SQLAlchemy", "CI/CD"],
    github: "https://github.com/AGS-CMU/ags",
    demo: "https://ags.cs.science.cmu.ac.th",
    stars: null,
    forks: null,
    isPrivate: true,
    hasPreview: true,
  },
  {
    id: "ezaAlias",
    tags: ["Shell", "CLI", "Productivity", "Gist"],
    github: "https://gist.github.com/AppleBoiy/04a249b6f64fd0fe1744aff759a0563b",
    demo: "",
    stars: 62,
    forks: 6,
    isPrivate: false,
    hasPreview: true,
  },
  {
    id: "neovim",
    tags: ["Vim Script", "Open Source", "Editor"],
    github: "https://github.com/neovim/neovim",
    demo: "",
    stars: 97500,
    forks: 6700,
    isPrivate: false,
    hasPreview: false,
  },
  {
    id: "flaskSecurity",
    tags: ["Python", "Flask", "Security", "Open Source"],
    github: "https://github.com/pallets-eco/flask-security",
    demo: "",
    stars: 696,
    forks: 162,
    isPrivate: false,
    hasPreview: false,
  },
];

export default function ProjectsSection() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handlePrivateDemoClick = (e) => {
    e.preventDefault();
    toast.info(t('projects.requestDemoMessage'), {
      duration: 5000,
    });
  };

  const projects = projectsData.map(proj => ({
    ...proj,
    title: t(`projects.items.${proj.id}.title`),
    description: t(`projects.items.${proj.id}.description`),
  }));

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    
    const query = searchQuery.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [projects, searchQuery]);

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

          <a
            href="https://github.com/AppleBoiy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 border border-border rounded-full text-sm text-foreground hover:bg-muted transition-colors"
          >
            <Github size={16} />
            {t('projects.viewAllGithub')}
          </a>
        </motion.div>

        {projects.length > 0 && (
          <div className="mb-8 max-w-md mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('projects.search')}
            />
          </div>
        )}

        {projects.length === 0 ? (
          <EmptyState
            icon={FolderGit2}
            title={t('projects.emptyState')}
            description={t('projects.emptyStateDescription')}
            action={
              <a
                href="https://github.com/AppleBoiy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:opacity-90 transition-all"
              >
                <Github size={16} />
                {t('projects.viewAllGithub')}
              </a>
            }
          />
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            icon={FolderGit2}
            title={t('projects.noResults')}
            description={t('projects.noResultsDescription')}
            variant="search"
          />
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`bg-card border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group flex flex-col ${
                project.isPrivate 
                  ? 'border-primary/40 hover:border-primary/60' 
                  : 'border-border hover:border-accent/30'
              }`}
            >
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
                {!project.isPrivate && (
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
                {project.hasPreview ? (
                  <Link to={`/project/${project.id}`} className="hover:underline">
                    {project.title}
                  </Link>
                ) : (
                  project.title
                )}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
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
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}