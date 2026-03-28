import { motion } from "framer-motion";
import { BadgeCheck, Award, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useHaptic } from "@/hooks/useHaptic";

const certifications = [
  {
    title: "AWS-TE - AWS Technical Essentials",
    issuer: "TRAINOCATE (Thailand) Co. Ltd.",
    credentialId: "170879fc-f992-4a5f-b3c8-c2d9729a5848",
    year: "Jan 2025",
    type: "certification",
    verifyUrl: "https://trainocate.com/th/certificate/170879fc-f992-4a5f-b3c8-c2d9729a5848",
  },
  {
    title: "AWS-BDLK - Building Data Lakes on AWS",
    issuer: "TRAINOCATE (Thailand) Co. Ltd.",
    credentialId: "2ff33512-692f-4a74-a576-143c0a480f57",
    year: "Jan 2025",
    type: "certification",
    verifyUrl: "https://trainocate.com/th/certificate/2ff33512-692f-4a74-a576-143c0a480f57",
  },
  {
    title: "CWIE Outstanding Project Award",
    issuer: "Chiang Mai University",
    credentialId: null,
    year: "2025",
    type: "honor",
    verifyUrl: null,
  },
];

export default function AboutSection() {
  const { t } = useTranslation();
  const { haptic } = useHaptic();
  
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-start mb-16"
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
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
            </div>
          </div>

          {/* Right — Certifications & Honors */}
          <div className="space-y-4 lg:pt-8">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              {t('about.certificationsAndHonors')}
            </h3>
            {certifications.map((cert, i) => (
              <motion.div
                key={`cert-${i}-${cert.title}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`bg-card border rounded-2xl p-5 transition-all duration-300 ${
                  cert.type === 'honor' 
                    ? 'border-primary/40 hover:border-primary/60 hover:shadow-md' 
                    : 'border-border hover:border-accent/50 hover:shadow-md'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                      cert.type === 'honor' ? 'bg-primary/10' : 'bg-accent/10'
                    }`}>
                      {cert.type === 'honor' ? (
                        <Award size={18} className="text-primary" />
                      ) : (
                        <BadgeCheck size={18} className="text-accent" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground leading-snug mb-1">{cert.title}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        {cert.credentialId && (
                          <span className="text-xs text-muted-foreground/70"></span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs px-2.5 py-1 bg-muted text-muted-foreground rounded-full whitespace-nowrap">
                        {cert.year}
                      </span>
                      {cert.verifyUrl && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            haptic.medium();
                          }}
                          className={`transition-colors ${
                            cert.type === 'honor'
                              ? 'text-primary hover:text-primary/80'
                              : 'text-accent hover:text-accent/80'
                          }`}
                          aria-label="Verify certificate"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
