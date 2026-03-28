'use client';

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ExperienceData {
  id: string;
  type: 'research' | 'work';
  tags: string[];
}

interface Experience extends ExperienceData {
  title: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
}

const experiencesData: ExperienceData[] = [
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

  const experiences: Experience[] = experiencesData.map(exp => ({
    ...exp,
    title: t(`experience.items.${exp.id}.title`),
    organization: t(`experience.items.${exp.id}.organization`),
    location: t(`experience.items.${exp.id}.location`),
    period: t(`experience.items.${exp.id}.period`),
    bullets: t(`experience.items.${exp.id}.bullets`, { returnObjects: true }) as string[],
  }));

  // Helper function to highlight metrics in text
  const highlightMetrics = (text: string) => {
    return text.split(/(\d+%|\d+\+|\d+ days?|\d+ students?|100% accuracy|68%|80%|250\+|50\+)/gi).map((part, idx) => {
      if (/(\d+%|\d+\+|\d+ days?|\d+ students?|100% accuracy|68%|80%|250\+|50\+)/i.test(part)) {
        return (
          <span key={idx} className="font-bold text-accent">
            {part}
          </span>
        );
      }
      return part;
    });
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
              {t('experience.title')}
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {t('experience.heading')} <span className="italic">{t('experience.headingItalic')}</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border hidden sm:block" />
          
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 8, transition: { duration: 0.3 } }}
                className="sm:pl-10 relative"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-6 w-4 h-4 rounded-full border-2 hidden sm:block ${
                    exp.type === "work"
                      ? "border-accent bg-accent"
                      : "border-primary bg-primary"
                  }`}
                />

                <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 hover:shadow-lg transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-accent font-medium">{exp.organization}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar size={14} /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <MapPin size={14} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description with bullet points */}
                  <ul className="mb-4 space-y-2 list-disc list-inside text-muted-foreground leading-relaxed">
                    {Array.isArray(exp.bullets) && exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="pl-2">
                        {highlightMetrics(bullet)}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
