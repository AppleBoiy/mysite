import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const RESEARCH_BG = "https://media.db.com/images/public/69c65fc225e674ec5ae97316/c22a9e600_generated_8e1e04dd.png";

const experiences = [
  {
    title: "AI-Driven Data Analytics Research",
    team: "International AI Research Consortium",
    location: "Remote / Multi-country",
    period: "2025 — Present",
    description:
      "Contributing to cutting-edge research on machine learning models for large-scale data analytics. Collaborating with researchers from 4 countries to develop novel approaches for predictive modeling.",
    tags: ["Machine Learning", "Data Analytics", "Python"],
  },
  {
    title: "Computational Biology Study",
    team: "Cross-Disciplinary Research Lab",
    location: "University Research Center",
    period: "2024 — 2025",
    description:
      "Worked with a multidisciplinary team of biologists and computer scientists to develop computational models for protein structure prediction using deep learning techniques.",
    tags: ["Deep Learning", "Bioinformatics", "Research"],
  },
  {
    title: "Smart Systems & IoT Research",
    team: "Graduate Research Group",
    location: "Department of Computer Science",
    period: "2023 — 2024",
    description:
      "Led a sub-team investigating intelligent IoT systems for environmental monitoring. Designed and prototyped sensor networks with real-time data processing capabilities.",
    tags: ["IoT", "Embedded Systems", "Data Processing"],
  },
];

export default function ResearchSection() {
  return (
    <section id="research" className="py-24 lg:py-32 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={RESEARCH_BG}
          alt="Research collaboration background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
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
            Research <span className="italic">Experience</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 hover:shadow-lg transition-all duration-500 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-accent font-medium mt-1">{exp.team}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground shrink-0">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-5">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}