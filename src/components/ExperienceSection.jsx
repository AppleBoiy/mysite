import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, FlaskConical, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const experiencesData = [
  {
    id: "jaist",
    type: "research",
    tags: ["LLM", "Prompt Engineering", "Information Extraction", "Python", "Research"],
  },
  {
    id: "french",
    type: "work",
    tags: ["Flask", "Flask-RESTX", "SQLAlchemy", "Gunicorn", "smtplib"],
  },
  {
    id: "ags",
    type: "work",
    tags: ["Flask", "AWS (ECS, Aurora, S3)", "Docker", "GPT-3.5", "SQLAlchemy", "CI/CD"],
  },
  {
    id: "ta",
    type: "work",
    tags: ["Python", "Teaching", "Mentoring", "Documentation"],
  },
];

export default function ExperienceSection() {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const experiences = experiencesData.map(exp => ({
    ...exp,
    title: t(`experience.items.${exp.id}.title`),
    organization: t(`experience.items.${exp.id}.organization`),
    location: t(`experience.items.${exp.id}.location`),
    period: t(`experience.items.${exp.id}.period`),
    summary: t(`experience.items.${exp.id}.summary`),
    description: t(`experience.items.${exp.id}.description`),
  }));

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
              {t('experience.title')}
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {t('experience.heading')} <span className="italic">{t('experience.headingItalic')}</span>
          </h2>
        </motion.div>

        <div className="flex items-center gap-6 mb-10 justify-center">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase size={14} className="text-accent" /> {t('experience.work')}
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <FlaskConical size={14} className="text-primary" /> {t('experience.research')}
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
                        {exp.type === "work" ? t('experience.work') : t('experience.research')}
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
                        {t('experience.showLess')}
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        {t('experience.showMore')}
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