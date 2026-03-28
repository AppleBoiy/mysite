import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Lock, FolderGit2, ChevronLeft, ChevronRight, ArrowUpDown, Grid3x3, List } from "lucide-react";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useMemo, useRef, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";

const projectsData = [
  {
    id: "ags",
    tags: ["Flask", "AWS (ECS, Aurora, S3)", "Docker", "GPT-3.5", "SQLAlchemy", "CI/CD"],
    category: "ai-ml",
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
    category: "devops",
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
    category: "devops",
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
    category: "web-app",
    github: "https://github.com/pallets-eco/flask-security",
    demo: "",
    stars: 696,
    forks: 162,
    isPrivate: false,
    hasPreview: false,
  },
];

const categories = [
  { id: "all", label: "All Projects", icon: FolderGit2, count: 0 },
  { id: "web-app", label: "Web Apps", icon: ExternalLink, count: 0 },
  { id: "ai-ml", label: "AI/ML", icon: Star, count: 0 },
  { id: "devops", label: "DevOps", icon: Github, count: 0 },
];

export default function Projects() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all");
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || "recent");
  const [viewMode, setViewMode] = useState(searchParams.get('view') || "grid");
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  
  const handlePrivateDemoClick = (e) => {
    e.preventDefault();
    toast.info(t('projects.requestDemoMessage'), {
      duration: 5000,
    });
  };

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll left/right
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Check scroll on mount and resize
  useState(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Update URL when filters change
  const updateURL = (newSearch, newCategory, newSort, newView) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newCategory && newCategory !== 'all') params.set('category', newCategory);
    if (newSort && newSort !== 'recent') params.set('sort', newSort);
    if (newView && newView !== 'grid') params.set('view', newView);
    setSearchParams(params);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    updateURL(value, selectedCategory, sortBy, viewMode);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateURL(searchQuery, category, sortBy, viewMode);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    updateURL(searchQuery, selectedCategory, sort, viewMode);
  };

  const handleViewModeChange = (view) => {
    setViewMode(view);
    updateURL(searchQuery, selectedCategory, sortBy, view);
  };

  const projects = projectsData.map(proj => ({
    ...proj,
    title: t(`projects.items.${proj.id}.title`),
    description: t(`projects.items.${proj.id}.description`),
  }));

  // Calculate category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' 
      ? projects.length 
      : projects.filter(p => p.category === cat.id).length
  }));

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort projects
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return (b.stars || 0) - (a.stars || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          // Keep original order (most recent first)
          return 0;
      }
    });
    
    return filtered;
  }, [projects, searchQuery, selectedCategory, sortBy]);

  return (
    <>
      <SEOHead 
        title="Projects | Chaipat Jainan"
        description="Browse my portfolio of projects including web applications, AI/ML systems, and DevOps tools. Featuring production LLM applications, automated grading systems, and open-source contributions."
        keywords="Projects, Portfolio, Web Development, AI/ML, DevOps, LLM Applications, Open Source"
        canonicalUrl="https://chaipat.cc/projects"
      />
      <div className="min-h-screen bg-background">
        <Navbar 
          showGithubButton={true}
          customContent={
            projectsData.length >= 10 ? (
              <div className="hidden xl:block w-80">
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={t('projects.search')}
                />
              </div>
            ) : null
          }
        />
        <main className="pt-24 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            {/* Breadcrumbs */}
            <Breadcrumbs 
              items={[
                { label: t('breadcrumbs.projects'), href: '/projects' },
              ]}
            />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-px w-10 bg-accent" />
                <span className="text-sm tracking-[0.2em] uppercase text-accent font-medium">
                  {t('projects.title')}
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-2">
                {t('projects.heading')} <span className="italic">{t('projects.headingItalic')}</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('projects.description')}
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              {/* Search Bar and Sort - Only show when there are 10+ projects */}
              {projectsData.length >= 10 && (
                <div className="mb-4 xl:hidden flex gap-2">
                  <div className="flex-1">
                    <SearchBar
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder={t('projects.search')}
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="recent">{t('projects.sort.recent')}</option>
                    <option value="stars">{t('projects.sort.stars')}</option>
                    <option value="name">{t('projects.sort.name')}</option>
                  </select>
                </div>
              )}

              {/* Category Filters with Scroll Indicators */}
              <div className="relative mb-4">
                {/* Left Arrow */}
                {showLeftArrow && (
                  <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                  <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}

                {/* Fade Edges */}
                {showLeftArrow && (
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-[5]" />
                )}
                {showRightArrow && (
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-[5]" />
                )}

                {/* Scrollable Categories */}
                <div
                  ref={scrollContainerRef}
                  onScroll={checkScroll}
                  className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-10"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-2 mx-auto">
                    {categoriesWithCounts.map((category) => {
                      const isActive = selectedCategory === category.id;
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                            isActive
                              ? 'bg-accent text-accent-foreground shadow-md'
                              : 'bg-card border border-border text-muted-foreground hover:border-accent hover:text-foreground'
                          }`}
                        >
                          {category.label} ({category.count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Results Header Bar - Project count and View Toggle */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                </p>
                
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <button
                      onClick={() => handleViewModeChange('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-label="Grid view"
                      title="Grid view"
                    >
                      <Grid3x3 size={16} />
                    </button>
                    <button
                      onClick={() => handleViewModeChange('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-label="List view"
                      title="List view"
                    >
                      <List size={16} />
                    </button>
                  </div>
                  
                  {/* Sort Dropdown - Only show when there are 10+ projects */}
                  {projectsData.length >= 10 && (
                    <div className="hidden xl:flex items-center gap-2">
                      <ArrowUpDown size={16} className="text-muted-foreground" />
                      <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                        title="Sort projects"
                      >
                        <option value="recent">{t('projects.sort.recent')}</option>
                        <option value="stars">{t('projects.sort.stars')}</option>
                        <option value="name">{t('projects.sort.name')}</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Projects Grid/List */}
            {filteredProjects.length === 0 ? (
              <EmptyState
                icon={FolderGit2}
                title={searchQuery ? t('projects.noResults') : t('projects.emptyState')}
                description={searchQuery ? t('projects.noResultsDescription') : t('projects.emptyStateDescription')}
                variant={searchQuery ? "search" : "default"}
              />
            ) : (
              <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 gap-6' : 'flex flex-col gap-4'}>
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className={`bg-card border rounded-2xl hover:shadow-2xl transition-all duration-300 group ${
                      project.isPrivate 
                        ? 'border-primary/40 hover:border-primary/60' 
                        : 'border-border hover:border-accent/30'
                    } ${
                      viewMode === 'grid' 
                        ? 'p-6 flex flex-col' 
                        : 'p-4 flex flex-row gap-6 items-start'
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      // GRID VIEW
                      <>
                        {/* Header with metadata */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-lg font-semibold transition-colors ${
                              project.isPrivate 
                                ? 'text-foreground group-hover:text-primary' 
                                : 'text-foreground group-hover:text-accent'
                            }`}>
                              {project.hasPreview ? (
                                <Link to={`/projects/${project.id}`} className="hover:underline">
                                  {project.title}
                                </Link>
                              ) : (
                                project.title
                              )}
                            </h3>
                            {project.isPrivate && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full shrink-0">
                                Private
                              </span>
                            )}
                          </div>
                          {!project.isPrivate && (
                            <div className="flex items-center gap-3 text-sm text-muted-foreground shrink-0">
                              <span className="flex items-center gap-1">
                                <Star size={13} /> {project.stars}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork size={13} /> {project.forks}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                          {project.description}
                        </p>

                        {/* Tags */}
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

                        {/* Links */}
                        <div className="flex items-center gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                              project.isPrivate
                                ? 'text-primary hover:bg-primary/10'
                                : 'text-accent hover:bg-accent/10'
                            }`}
                          >
                            <Github size={15} /> {project.isPrivate ? t('projects.privateRepo') : t('projects.code')}
                          </a>
                          {project.demo && (
                            project.isPrivate ? (
                              <button
                                onClick={handlePrivateDemoClick}
                                className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                              >
                                <Lock size={15} /> {t('projects.requestDemo')}
                              </button>
                            ) : (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-accent hover:bg-accent/10 transition-colors"
                              >
                                <ExternalLink size={15} /> {t('projects.liveDemo')}
                              </a>
                            )
                          )}
                        </div>
                      </>
                    ) : (
                      // LIST VIEW
                      <>
                        {/* Left side - Content */}
                        <div className="flex-1 min-w-0 max-w-2xl">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`text-base font-semibold transition-colors ${
                              project.isPrivate 
                                ? 'text-foreground group-hover:text-primary' 
                                : 'text-foreground group-hover:text-accent'
                            }`}>
                              {project.hasPreview ? (
                                <Link to={`/projects/${project.id}`} className="hover:underline">
                                  {project.title}
                                </Link>
                              ) : (
                                project.title
                              )}
                            </h3>
                            {project.isPrivate && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full shrink-0">
                                Private
                              </span>
                            )}
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
                          
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Links */}
                          <div className="flex items-center gap-3">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                                project.isPrivate
                                  ? 'text-primary hover:bg-primary/10'
                                  : 'text-accent hover:bg-accent/10'
                              }`}
                            >
                              <Github size={15} /> {project.isPrivate ? t('projects.privateRepo') : t('projects.code')}
                            </a>
                            {project.demo && (
                              project.isPrivate ? (
                                <button
                                  onClick={handlePrivateDemoClick}
                                  className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                                >
                                  <Lock size={15} /> {t('projects.requestDemo')}
                                </button>
                              ) : (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-accent hover:bg-accent/10 transition-colors"
                                >
                                  <ExternalLink size={15} /> {t('projects.liveDemo')}
                                </a>
                              )
                            )}
                          </div>
                        </div>

                        {/* Right side - Tags */}
                        <div className="flex flex-wrap gap-2 shrink-0 max-w-xs">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
