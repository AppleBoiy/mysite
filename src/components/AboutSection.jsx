import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, Award, ExternalLink, Hash, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useHaptic } from "@/hooks/useHaptic";
import { useState } from "react";

const certifications = [
  {
    title: "AWS-TE - AWS Technical Essentials",
    issuer: "TRAINOCATE (Thailand) Co. Ltd.",
    year: "Jan 2025",
    type: "certification",
    verifyUrl: "https://trainocate.com/th/certificate/170879fc-f992-4a5f-b3c8-c2d9729a5848",
    credentialId: "170879fc-f992-4a5f-b3c8-c2d9729a5848",
    skills: ["AWS Core Services", "Cloud Computing", "EC2", "S3", "IAM"],
  },
  {
    title: "AWS-BDLK - Building Data Lakes on AWS",
    issuer: "TRAINOCATE (Thailand) Co. Ltd.",
    year: "Jan 2025",
    type: "certification",
    verifyUrl: "https://trainocate.com/th/certificate/2ff33512-692f-4a74-a576-143c0a480f57",
    credentialId: "2ff33512-692f-4a74-a576-143c0a480f57",
    skills: ["Data Lakes", "AWS Glue", "Amazon Athena", "Data Analytics", "ETL"],
  },
  {
    title: "CWIE Outstanding Project Award",
    issuer: "Chiang Mai University",
    year: "2025",
    type: "honor",
    verifyUrl: null,
    credentialId: null,
    skills: ["LLM Systems", "RAG Pipeline", "Production Deployment", "Innovation"],
  },
];

export default function AboutSection() {
  const { t } = useTranslation();
  const { haptic } = useHaptic();
  const [expandedCard, setExpandedCard] = useState(null);
  
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
              <br />
              <span className="italic">{t('about.headingItalic')}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
            </div>
          </div>

          {/* Right — Certifications & Honors */}
          <div className="space-y-4 lg:pt-8">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              {t('about.certificationsAndHonors')}
            </h3>
            {certifications.map((cert, i) => {
              const isExpanded = expandedCard === i;
              
              return (
                <motion.div
                  key={`cert-${i}-${cert.title}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    haptic.light();
                    setExpandedCard(isExpanded ? null : i);
                  }}
                >
                  <div className={`bg-card border rounded-2xl p-5 transition-all duration-300 ${
                    isExpanded 
                      ? cert.type === 'honor' 
                        ? 'border-primary shadow-lg shadow-primary/10' 
                        : 'border-accent shadow-lg shadow-accent/10'
                      : 'border-border hover:border-accent/50 hover:shadow-md'
                  }`}>
                    {/* Header - Always visible */}
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isExpanded
                          ? cert.type === 'honor' ? 'bg-primary/20' : 'bg-accent/20'
                          : cert.type === 'honor' ? 'bg-primary/10' : 'bg-accent/10'
                      }`}>
                        {cert.type === 'honor' ? (
                          <Award size={18} className={isExpanded ? 'text-primary' : 'text-primary'} />
                        ) : (
                          <BadgeCheck size={18} className={isExpanded ? 'text-accent' : 'text-accent'} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground leading-snug mb-1">{cert.title}</p>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {cert.verifyUrl && (
                          <ExternalLink 
                            size={16} 
                            className={`transition-colors ${
                              isExpanded 
                                ? cert.type === 'honor' ? 'text-primary' : 'text-accent'
                                : 'text-muted-foreground group-hover:text-accent'
                            }`}
                          />
                        )}
                        <span className="text-xs px-2.5 py-1 bg-muted text-muted-foreground rounded-full whitespace-nowrap">
                          {cert.year}
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-accent' : 'text-muted-foreground'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-border space-y-3">
                            {/* Skills */}
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                                {t('about.skillsCovered')}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {cert.skills.map((skill, skillIdx) => (
                                  <span
                                    key={`${i}-skill-${skillIdx}`}
                                    className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                                      cert.type === 'honor'
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-accent/10 text-accent'
                                    }`}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Credential ID & Verify Link */}
                            {(cert.credentialId || cert.verifyUrl) && (
                              <div className="flex items-center justify-between gap-3 pt-2">
                                {cert.credentialId && (
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-1 min-w-0">
                                    <Hash size={12} className="shrink-0" />
                                    <span className="font-mono truncate">{cert.credentialId}</span>
                                  </div>
                                )}
                                {cert.verifyUrl && (
                                  <a
                                    href={cert.verifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      haptic.medium();
                                    }}
                                    className={`text-xs font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
                                      cert.type === 'honor'
                                        ? 'text-primary hover:text-primary/80'
                                        : 'text-accent hover:text-accent/80'
                                    }`}
                                  >
                                    {t('about.verifyCertificate')} <ExternalLink size={12} />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
