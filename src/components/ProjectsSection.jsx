import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Lock } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "ags",
    title: "AGS - Automated Grading System",
    description:
      "Built a production LLM application (ags.cs.science.cmu.ac.th) using GPT-3.5 with structured prompt engineering and token-budget controls, reducing turnaround time by 80% (5 days → 1 day) while managing inference cost at scale for 80+ students. Designed and deployed a secure REST API with Flask and SQLAlchemy; containerized with Docker and automated via GitHub Actions CI/CD. Leveraged AWS services (ECS, Aurora, S3) for scalability.",
    tags: ["Flask", "AWS (ECS, Aurora, S3)", "Docker", "GPT-3.5", "SQLAlchemy", "CI/CD"],
    github: "https://github.com/AGS-CMU/ags",
    demo: "https://ags.cs.science.cmu.ac.th",
    stars: null,
    forks: null,
    isPrivate: true,
    hasPreview: true,
  },
  {
    id: "eza-alias",
    title: "Eza Alias Configuration",
    description:
      "Popular Gist providing a comprehensive alias setup for eza (modern ls replacement). Includes color schemes, icons, and productivity-enhancing shortcuts for better terminal file navigation. Used by developers worldwide.",
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
    title: "Neovim",
    description:
      "Contributor to Neovim - Vim-fork focused on extensibility and usability. Open source text editor with modern features and plugin ecosystem.",
    tags: ["Vim Script", "Open Source", "Editor"],
    github: "https://github.com/neovim/neovim",
    demo: "",
    stars: 97500,
    forks: 6700,
    isPrivate: false,
    hasPreview: false,
  },
  {
    id: "flask-security",
    title: "Flask-Security",
    description:
      "Contributor to Flask-Security - Quick and simple security for Flask applications. Provides common security patterns for authentication and authorization.",
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
  const handlePrivateDemoClick = (e) => {
    e.preventDefault();
    toast.info("Live demo for private projects is only available for reserved users. Please contact me to schedule a demo.", {
      duration: 5000,
    });
  };

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
              Projects
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            Featured <span className="italic">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            A selection of open-source projects and experiments from my GitHub.
          </p>

          <a
            href="https://github.com/AppleBoiy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 border border-border rounded-full text-sm text-foreground hover:bg-muted transition-colors"
          >
            <Github size={16} />
            View all on GitHub
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-card border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col ${
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
                  <Github size={15} /> {project.isPrivate ? 'Private Repo' : 'Code'}
                </a>
                {project.demo && (
                  project.isPrivate ? (
                    <button
                      onClick={handlePrivateDemoClick}
                      className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      <Lock size={15} /> Request Demo
                    </button>
                  ) : (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}