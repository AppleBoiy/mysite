'use client';

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Core skills that should be highlighted with accent color
const coreSkills = ["Python", "LLMs", "AWS", "Flask", "Docker", "Knowledge Graphs", "Ontology Engineering"];

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "Shell Scripting", "SQL"],
  },
  {
    title: "Backend & API",
    skills: ["Flask", "Flask-RESTX", "SQLAlchemy", "REST API Design", "Pytest"],
  },
  {
    title: "AI & LLM",
    skills: ["LLMs", "LangChain", "Hugging Face", "OpenAI API", "Gemini API", "RAG Pipelines", "Prompt Engineering"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "Git", "GitHub Actions", "AWS", "GCP"],
  },
  {
    title: "Knowledge Graphs",
    skills: ["Knowledge Graphs", "Ontology Engineering", "Neo4j", "OWL", "SPARQL", "SWRL"],
  },
  {
    title: "Data Science",
    skills: ["NumPy", "Pandas"],
  },
];

interface SkillCategoryProps {
  category: SkillCategory;
  index: number;
}

function SkillCategoryComponent({ category, index }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8"
    >
      <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => {
          const isCore = coreSkills.includes(skill);
          return (
            <span
              key={skill}
              className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                isCore
                  ? 'bg-accent/10 text-accent border-accent font-medium hover:bg-accent/20'
                  : 'bg-muted text-muted-foreground border-border hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {skill}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { t } = useTranslation();
  
  return (
    <section id="skills" className="py-24 lg:py-32">
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
              {t('skills.title')}
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {t('skills.heading')} <span className="italic">{t('skills.headingItalic')}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
          {skillCategories.map((cat, i) => (
            <SkillCategoryComponent key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
