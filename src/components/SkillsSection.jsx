import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const skillCategories = [
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
    skills: ["LangChain", "Hugging Face", "OpenAI API", "Gemini API", "RAG Pipelines", "Prompt Engineering"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "Git", "GitHub Actions", "AWS (ECS, RDS, S3)", "GCP"],
  },
  {
    title: "Data & Knowledge Graphs",
    skills: ["Knowledge Graphs", "Ontology Engineering", "Neo4j", "NumPy", "Pandas", "OWL", "SPARQL", "SWRL"],
  },
];

function SkillCategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
    >
      <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-sm bg-muted text-foreground rounded-full border border-border hover:border-accent hover:bg-accent/5 hover:text-accent transition-all"
          >
            {skill}
          </span>
        ))}
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

        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}