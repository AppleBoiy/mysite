import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";

const projects = [
  {
    title: "Eza Alias Configuration",
    description:
      "Popular Gist providing a comprehensive alias setup for eza (modern ls replacement). Includes color schemes, icons, and productivity-enhancing shortcuts for better terminal file navigation. Used by developers worldwide.",
    tags: ["Shell", "CLI", "Productivity", "Gist"],
    github: "https://gist.github.com/AppleBoiy/04a249b6f64fd0fe1744aff759a0563b",
    demo: "",
    stars: 62,
    forks: 6,
  },
  {
    title: "Ontology-Augmented Thai Public Health Service Recommendation System",
    description:
      "Built a health-domain knowledge base with 85 classes, 411 individuals, and 22 data properties modeling Thai public health services, patient rights, and insurance coverage as a queryable recommendation layer. Authored 38 SWRL reasoning rules and 40 SPARQL queries across 4 competency scopes.",
    tags: ["OWL", "SPARQL", "SWRL", "Protégé", "Python"],
    github: "https://github.com/AppleBoiy/onto-augmented-PHSRS",
    demo: "",
    stars: 0,
    forks: 0,
  },
  {
    title: "Neovim",
    description:
      "Contributor to Neovim - Vim-fork focused on extensibility and usability. Open source text editor with modern features and plugin ecosystem.",
    tags: ["Vim Script", "Open Source", "Editor"],
    github: "https://github.com/neovim/neovim",
    demo: "",
    stars: 97500,
    forks: 6700,
  },
  {
    title: "Flask-Security",
    description:
      "Contributor to Flask-Security - Quick and simple security for Flask applications. Provides common security patterns for authentication and authorization.",
    tags: ["Python", "Flask", "Security", "Open Source"],
    github: "https://github.com/pallets-eco/flask-security",
    demo: "",
    stars: 696,
    forks: 162,
  },
];

export default function ProjectsSection() {
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
              className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Github size={20} className="text-foreground" />
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star size={13} /> {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={13} /> {project.forks}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                {project.title}
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
                  className="flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
                >
                  <Github size={15} /> Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}