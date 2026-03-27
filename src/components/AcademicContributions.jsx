import { motion } from "framer-motion";
import { FileText, Users, ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const publications = [
  {
    id: "kg-rag-jaist",
    title: "KG-Augmented RAG Pipeline for Automated Test Scenario Generation",
    journal: "JAIST×CMU Joint Research",
    year: "2025",
    authors: "C Jainan, et al.",
    type: "Research Paper",
    status: "Extended",
    link: null,
    downloadable: false,
    hasPreview: true,
  },
  {
    id: "ontology-phsrs",
    title: "Ontology-Augmented Thai Public Health Service Recommendation System",
    journal: "Knowledge Engineering Project",
    year: "2024",
    authors: "C Jainan, K Saelee",
    type: "Research Project",
    status: "Completed",
    link: "https://github.com/AppleBoiy/onto-augmented-PHSRS",
    downloadable: true,
    downloadUrl: "/documents/ontology-phsrs.pdf",
    documentLanguage: "Thai",
    hasPreview: true,
  },
  {
    id: "cs-setup-guide",
    title: "CS Student Setup Guide - Comprehensive Software Installation Documentation",
    journal: "Chiang Mai University - Teaching Resource",
    year: "2022-2025",
    authors: "C Jainan",
    type: "Educational Resource",
    status: "Active",
    link: "https://kiwis.vercel.app/",
    downloadable: false,
    hasPreview: false,
  },
];

export default function AcademicContributions() {
  const { t } = useTranslation();
  
  return (
    <section id="publications" className="py-24 lg:py-32 bg-muted/30">
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
              {t('publications.title')}
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {t('publications.heading')} <span className="italic">{t('publications.headingItalic')}</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText size={18} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                      {pub.hasPreview ? (
                        <Link to={`/publication/${pub.id}`} className="hover:underline">
                          {pub.title}
                        </Link>
                      ) : (
                        pub.title
                      )}
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 ml-2 text-accent hover:text-accent/80"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                        {pub.year}
                      </span>
                      {pub.downloadable && (
                        <a
                          href={pub.downloadUrl}
                          download
                          className="shrink-0 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-1"
                        >
                          <Download size={12} />
                          {t('publications.download')}
                          {pub.documentLanguage && (
                            <span className="ml-1">({pub.documentLanguage})</span>
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-accent text-sm font-medium mb-2">{pub.journal}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users size={14} /> {pub.authors}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-muted rounded-full">{pub.type}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      pub.status === 'Extended' 
                        ? 'bg-blue-100 text-blue-700' 
                        : pub.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>{pub.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}