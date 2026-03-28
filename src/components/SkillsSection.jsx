import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", years: "3+", projects: "AGS, JAIST Research" },
      { name: "Shell Scripting", years: "2+", projects: "DevOps, Automation" },
      { name: "SQL", years: "2+", projects: "AGS, French Platform" },
    ],
  },
  {
    title: "Backend & API",
    skills: [
      { name: "Flask", years: "2+", projects: "AGS, French Platform" },
      { name: "Flask-RESTX", years: "1+", projects: "French Platform" },
      { name: "SQLAlchemy", years: "2+", projects: "AGS, French Platform" },
      { name: "REST API Design", years: "2+", projects: "AGS, French Platform" },
      { name: "Pytest", years: "1+", projects: "AGS" },
    ],
  },
  {
    title: "AI & LLM",
    skills: [
      { name: "LangChain", years: "1+", projects: "JAIST Research" },
      { name: "Hugging Face", years: "1+", projects: "JAIST Research" },
      { name: "OpenAI API", years: "1+", projects: "AGS, JAIST Research" },
      { name: "Gemini API", years: "1+", projects: "Personal Projects" },
      { name: "RAG Pipelines", years: "1+", projects: "JAIST Research" },
      { name: "Prompt Engineering", years: "1+", projects: "AGS, JAIST Research" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Docker", years: "2+", projects: "AGS, French Platform" },
      { name: "Git", years: "3+", projects: "All Projects" },
      { name: "GitHub Actions", years: "1+", projects: "AGS" },
      { name: "AWS (ECS, RDS, S3)", years: "1+", projects: "AGS" },
      { name: "GCP", years: "1+", projects: "Personal Projects" },
    ],
  },
  {
    title: "Data & Knowledge Graphs",
    skills: [
      { name: "Knowledge Graphs", years: "1+", projects: "JAIST Research" },
      { name: "Ontology Engineering", years: "1+", projects: "Ontology Project" },
      { name: "Neo4j", years: "1+", projects: "JAIST Research" },
      { name: "NumPy", years: "2+", projects: "Data Analysis" },
      { name: "Pandas", years: "2+", projects: "Data Analysis" },
      { name: "OWL", years: "1+", projects: "Ontology Project" },
      { name: "SPARQL", years: "1+", projects: "Ontology Project" },
      { name: "SWRL", years: "1+", projects: "Ontology Project" },
    ],
  },
];

function SkillCategoryCard({ category, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    } else if (e.key === 'Escape' && isFlipped) {
      setIsFlipped(false);
    }
  };

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative h-[240px] cursor-pointer perspective-1000"
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${category.title} skills. Press Enter to view details.`}
        aria-pressed={isFlipped}
      >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Skill Tags */}
        <div
          className="absolute inset-0 bg-card border border-border rounded-2xl p-6 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1.5 text-sm bg-muted text-foreground rounded-full border border-border"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Back - Skill Details */}
        <div
          className="absolute inset-0 bg-card border border-accent/40 rounded-2xl p-5 backface-hidden overflow-y-auto"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="font-serif text-base font-semibold text-accent mb-3 sticky top-0 bg-card pb-2">
            {category.title}
          </h3>
          <div className="space-y-2.5">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="pb-2.5 border-b border-border last:border-0"
              >
                <div className="font-medium text-foreground text-sm mb-1">
                  {skill.name}
                </div>
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <div>
                    <span className="text-accent font-medium">{skill.years}</span> years experience
                  </div>
                  <div className="truncate">
                    Used in: <span className="text-foreground">{skill.projects}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
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
          <p className="text-sm text-muted-foreground mt-4">
            Hover or tap on cards to see experience details
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((cat, i) => (
            <SkillCategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}