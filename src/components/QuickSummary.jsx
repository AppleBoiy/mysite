import { motion } from "framer-motion";
import { Briefcase, Code, Award, Calendar, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useHaptic } from "@/hooks/useHaptic";

export default function QuickSummary() {
  const { t } = useTranslation();
  const { haptic } = useHaptic();

  const highlights = [
    {
      icon: Briefcase,
      label: t('quickSummary.experience'),
      value: "3+ years",
    },
    {
      icon: Code,
      label: t('quickSummary.specialization'),
      value: "LLM & RAG Systems",
    },
    {
      icon: Award,
      label: t('quickSummary.achievement'),
      value: "68% SOTA improvement",
    },
    {
      icon: Calendar,
      label: t('quickSummary.availability'),
      value: t('quickSummary.availableNow'),
    },
  ];

  const keySkills = [
    { name: "Python", link: "#experience" },
    { name: "LLM/RAG", link: "#experience" },
    { name: "Flask", link: "#projects" },
    { name: "AWS", link: "#projects" },
    { name: "Docker", link: "#projects" },
    { name: "GPT-3.5/4", link: "#experience" },
    { name: "Knowledge Graphs", link: "#publications" },
    { name: "CI/CD", link: "#projects" },
  ];

  return (
    <section className="py-12 lg:py-16 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground leading-tight">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-muted/30 rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                {t('quickSummary.keySkills')}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {keySkills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.link}
                  onClick={() => haptic.light()}
                  className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:border-accent hover:bg-accent/5 hover:text-accent transition-all cursor-pointer active:scale-95"
                >
                  {skill.name}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
