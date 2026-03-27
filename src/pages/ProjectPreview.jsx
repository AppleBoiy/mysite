import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Lock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SEOHead from "../components/SEOHead";
import PageTransition from "../components/PageTransition";

const projectsData = {
  "ags": {
    title: "AGS - Automated Grading System",
    subtitle: "Production LLM Application for Educational Assessment",
    isPrivate: true,
    organization: "Chiang Mai University, Dept. of Computer Science",
    period: "Jun 2024 — Dec 2024",
    role: "DevOps Engineer (Contract)",
    github: "https://github.com/AGS-CMU/ags",
    demo: "https://ags.cs.science.cmu.ac.th",
    tags: ["Flask", "AWS (ECS, Aurora, S3)", "Docker", "GPT-3.5", "SQLAlchemy", "CI/CD", "GitHub Actions"],
    overview: "Built a production LLM application using GPT-3.5 with structured prompt engineering and token-budget controls, reducing turnaround time by 80% (5 days → 1 day) while managing inference cost at scale for 80+ students.",
    challenges: [
      "Managing LLM inference costs at scale for 80+ students",
      "Ensuring consistent grading quality across diverse assignment types",
      "Implementing secure authentication and authorization for academic data",
      "Optimizing response time while maintaining accuracy",
    ],
    solutions: [
      "Implemented structured prompt engineering with token-budget controls to optimize GPT-3.5 usage",
      "Designed a secure REST API with Flask and SQLAlchemy for structured data querying",
      "Containerized the application with Docker for consistent deployment",
      "Automated CI/CD pipelines using GitHub Actions for reliable releases",
      "Leveraged AWS services (ECS, Aurora, S3) for scalability and reliability",
    ],
    impact: [
      "80% reduction in grading turnaround time (5 days → 1 day)",
      "Successfully served 80+ students with consistent performance",
      "Maintained cost-effective LLM inference at scale",
      "Achieved high system reliability through automated testing and deployment",
    ],
    techStack: {
      "Backend": ["Flask", "Flask-RESTX", "SQLAlchemy", "Gunicorn"],
      "AI/LLM": ["OpenAI GPT-3.5", "Prompt Engineering", "Token Optimization"],
      "Cloud & DevOps": ["AWS ECS", "AWS Aurora", "AWS S3", "Docker", "GitHub Actions"],
      "Database": ["PostgreSQL (Aurora)", "SQLAlchemy ORM"],
      "Testing": ["Pytest", "Automated Testing"],
    },
  },
  "eza-alias": {
    title: "Eza Alias Configuration",
    subtitle: "Modern Terminal File Navigation Enhancement",
    isPrivate: false,
    organization: "Open Source Community",
    period: "2023 — Present",
    role: "Creator & Maintainer",
    github: "https://gist.github.com/AppleBoiy/04a249b6f64fd0fe1744aff759a0563b",
    demo: "",
    tags: ["Shell", "CLI", "Productivity", "Bash", "Zsh"],
    overview: "Popular Gist providing a comprehensive alias setup for eza (modern ls replacement). Includes color schemes, icons, and productivity-enhancing shortcuts for better terminal file navigation. Used by developers worldwide.",
    challenges: [
      "Creating intuitive aliases that enhance productivity without overwhelming users",
      "Ensuring compatibility across different shell environments (bash, zsh)",
      "Balancing feature richness with simplicity",
    ],
    solutions: [
      "Designed a hierarchical alias system with progressive complexity",
      "Implemented color-coded output for better visual parsing",
      "Added icon support for file type recognition",
      "Created comprehensive documentation with usage examples",
    ],
    impact: [
      "62+ stars on GitHub Gist",
      "Used by developers worldwide",
      "Improved terminal productivity for hundreds of users",
      "Active community engagement and feedback",
    ],
    techStack: {
      "Shell": ["Bash", "Zsh", "Shell Scripting"],
      "Tools": ["eza", "Terminal Emulators"],
    },
  },
};

export default function ProjectPreview() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData[projectId];

  const handlePrivateDemoClick = () => {
    toast.info("Live demo for private projects is only available for reserved users. Please contact me to schedule a demo.", {
      duration: 5000,
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title={`${project.title} | Chaipat Jainan`}
          description={project.description}
          keywords={project.tags.join(", ")}
          ogType="article"
        />
        <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
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
                {project.isPrivate ? "Private Repository" : "View Code"}
              </a>
              {project.demo && (
                project.isPrivate ? (
                  <button
                    onClick={handlePrivateDemoClick}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Lock size={16} />
                    Request Demo Access
                  </button>
                ) : (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )
              )}
            </div>
          </motion.div>

          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
          </motion.section>

          {/* Challenges */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Challenges</h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-muted-foreground">{challenge}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Solutions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Solutions</h2>
            <ul className="space-y-3">
              {project.solutions.map((solution, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-muted-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Impact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Impact</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.impact.map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5">
                  <p className="text-foreground font-medium">{item}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
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
          </motion.section>

          {/* Tags */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
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
          </motion.section>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
    </PageTransition>
  );
}
