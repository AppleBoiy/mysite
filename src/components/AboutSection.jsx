import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const certifications = [
  {
    title: "AWS-TE - AWS Technical Essentials",
    issuer: "TRAINOCATE (Thailand) Co. Ltd.",
    year: "Jan 2025",
  },
  {
    title: "AWS-BDLK - Building Data Lakes on AWS",
    issuer: "TRAINOCATE (Thailand) Co. Ltd.",
    year: "Jan 2025",
  },
  {
    title: "Security Best Practices in Google Cloud",
    issuer: "Google Cloud Skills Boost",
    year: "Jun 2024",
  },
  {
    title: "Baseline: Infrastructure",
    issuer: "Google",
    year: "Jun 2024",
  },
];

export default function AboutSection() {
  const { t } = useTranslation();
  
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-accent" />
              <span className="text-sm tracking-[0.2em] uppercase text-accent font-medium">
                {t('about.title')}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-6">
              {t('about.heading')}
              <br />
              <span className="italic">{t('about.headingItalic')}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
            </div>
          </div>

          {/* Right — Certifications */}
          <div className="space-y-4 lg:pt-8">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              {t('about.certifications')}
            </h3>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:border-accent/40 transition-colors duration-300"
              >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mt-0.5">
                  <BadgeCheck size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground leading-snug">{cert.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{cert.issuer}</p>
                </div>
                <span className="ml-auto shrink-0 text-xs px-2.5 py-1 bg-muted text-muted-foreground rounded-full">
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}