import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, FlaskConical, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    type: "research",
    title: "AI/ML Research Intern",
    organization: "KnOWLab Research Lab, JAIST",
    location: "Nomi, Ishikawa, Japan",
    period: "Apr 2025 — Sep 2025",
    summary: "Built a prompt engineering pipeline (DoC) for LLM-based information extraction with 68% improvement over state-of-the-art, achieving 100% accuracy.",
    description:
      "CSCMU × KnOWLab-JAIST × Formal Methods Lab-JAIST Collaboration — Built a prompt engineering pipeline (DoC) for LLM-based information extraction from unstructured documents, automating structured data population with 68% improvement over state-of-the-art. Tested and debugged LLM outputs at scale; applied domain constraints to filter implausible AI responses, achieving 100% accuracy.",
    tags: ["LLM", "Prompt Engineering", "Information Extraction", "Python", "Research"],
  },
  {
    type: "work",
    title: "Backend Developer (Contract)",
    organization: "Chiang Mai University, Dept. of Western Languages (French)",
    location: "Chiang Mai, Thailand",
    period: "Apr 2024 — Mar 2025",
    summary: "Developed a platform integrating French language learning with interactive lessons and personalized guidance.",
    description:
      "Developed a platform integrating French language learning with interactive lessons and personalized guidance. Built backend infrastructure, including database management, API endpoints, and server configuration.",
    tags: ["Flask", "Flask-RESTX", "SQLAlchemy", "Gunicorn", "smtplib"],
  },
  {
    type: "work",
    title: "DevOps (Contract)",
    organization: "Chiang Mai University, Dept. of Computer Science",
    location: "Chiang Mai, Thailand",
    period: "Jun 2024 — Dec 2024",
    summary: "Built production LLM application using GPT-3.5, reducing grading turnaround time by 80% (5 days → 1 day) for 80+ students.",
    description:
      "Built a production LLM application (ags.cs.science.cmu.ac.th) using GPT-3.5 with structured prompt engineering and token-budget controls, reducing turnaround time by 80% (5 days → 1 day) while managing inference cost at scale for 80+ students. Designed and deployed a secure REST API with Flask and SQLAlchemy for structured data querying; containerized with Docker and automated via GitHub Actions CI/CD. Leveraged AWS services (ECS, Aurora, S3) for scalability.",
    tags: ["Flask", "AWS (ECS, Aurora, S3)", "Docker", "GPT-3.5", "SQLAlchemy", "CI/CD"],
  },
  {
    type: "work",
    title: "Teaching Assistant",
    organization: "Chiang Mai University",
    location: "Chiang Mai, Thailand",
    period: "Aug 2022 — Mar 2025",
    summary: "Mentored 50+ undergraduate students in Python programming, focusing on core concepts and best practices.",
    description:
      "Mentored 50+ undergraduate students in Python programming, focusing on core programming concepts and best practices. Authored comprehensive software setup guides for students to ensure smooth access to the necessary tools for the course.",
    tags: ["Python", "Teaching", "Mentoring", "Documentation"],
  },
];

export default function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-24 lg:py-32">
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
              Experience
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            Work & Research <span className="italic">Experience</span>
          </h2>
        </motion.div>

        <div className="flex items-center gap-6 mb-10 justify-center">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase size={14} className="text-accent" /> Work
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <FlaskConical size={14} className="text-primary" /> Research
          </span>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 8, transition: { duration: 0.3 } }}
                className="sm:pl-14 relative"
              >
                <div
                  className={`absolute left-0 top-6 w-10 h-10 rounded-full border-2 items-center justify-center hidden sm:flex ${
                    exp.type === "work"
                      ? "border-accent bg-accent/10"
                      : "border-primary bg-primary/10"
                  }`}
                >
                  {exp.type === "work" ? (
                    <Briefcase size={16} className="text-accent" />
                  ) : (
                    <FlaskConical size={16} className="text-primary" />
                  )}
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent/30 hover:shadow-lg transition-all duration-500 group">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                    <div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block ${
                          exp.type === "work"
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {exp.type === "work" ? "Work" : "Research"}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-accent font-medium mt-0.5">{exp.organization}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary - Visible when collapsed */}
                  {expandedIndex !== i && (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {exp.summary}
                    </p>
                  )}

                  {/* Full Details - Visible when expanded */}
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpand(i)}
                    className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    {expandedIndex === i ? (
                      <>
                        <ChevronUp size={16} />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        Show More Details
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}