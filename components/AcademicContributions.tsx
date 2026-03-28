'use client';

import { motion } from "framer-motion";
import { FileText, Users, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { safeDownload } from "@/lib/utils/downloadHelper";

const publicationsData = [
  {
    id: "kg-rag-jaist",
    title: "KG-Augmented RAG Pipeline for Automated Test Scenario Generation",
    journal: "JAIST×CMU Joint Research",
    year: "2025",
    authors: ["C. Jainan", "et al."],
    myName: "C. Jainan",
    type: "Research Paper",
    tags: ["Knowledge Graphs", "RAG", "LLMs", "Ontology Engineering", "Autonomous Driving"],
    link: null,
    downloadable: false,
    downloadUrl: null,
    documentLanguage: null,
    hasPreview: true,
  },
  {
    id: "ontology-phsrs",
    title: "Ontology-Augmented Thai Public Health Service Recommendation System",
    journal: "Knowledge Engineering Project",
    year: "2024",
    authors: ["C. Jainan", "K. Saelee"],
    myName: "C. Jainan",
    type: "Research Project",
    tags: ["Ontologies", "Semantic Web", "Healthcare", "OWL", "SPARQL"],
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
    authors: ["C. Jainan"],
    myName: "C. Jainan",
    type: "Educational Resource",
    tags: ["Documentation", "Teaching", "Developer Tools", "Technical Writing"],
    link: "https://kiwis.vercel.app/",
    downloadable: false,
    downloadUrl: null,
    documentLanguage: null,
    hasPreview: false,
  },
];

export default function AcademicContributions() {
  const { t } = useTranslation();
  
  // Map publications with translated descriptions
  const publications = publicationsData.map(pub => ({
    ...pub,
    tldr: t(`publications.items.${pub.id}.tldr`),
  }));
  
  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>, url: string, filename: string) => {
    e.preventDefault();
    await safeDownload(url, filename, 'Document is currently unavailable');
  };
  
  // Helper to format authors with bold name
  const formatAuthors = (authors: string[], myName: string) => {
    return authors.map((author, idx) => {
      const isBold = author === myName;
      return (
        <span key={idx}>
          {isBold ? <strong className="font-semibold text-foreground">{author}</strong> : author}
          {idx < authors.length - 1 && ", "}
        </span>
      );
    });
  };
  
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

        {publications.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t('publications.emptyState')}</p>
          </div>
        ) : (
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
                  {/* Title and Year */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                      {pub.hasPreview ? (
                        <Link href={`/publication/${pub.id}`} className="hover:underline">
                          {pub.title}
                        </Link>
                      ) : (
                        pub.title
                      )}
                    </h3>
                    <span className="shrink-0 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                      {pub.year}
                    </span>
                  </div>
                  
                  {/* Journal/Institution */}
                  <p className="text-accent text-sm font-medium mb-3">{pub.journal}</p>
                  
                  {/* TL;DR */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {pub.tldr}
                  </p>
                  
                  {/* Authors */}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <Users size={14} className="shrink-0" />
                    <span>{formatAuthors(pub.authors, pub.myName)}</span>
                  </div>
                  
                  {/* Tags and Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* Domain Tags */}
                    <div className="flex flex-wrap gap-2">
                      {pub.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Area */}
                    <div className="flex items-center gap-2">
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-accent hover:bg-accent/10 transition-colors"
                        >
                          <ExternalLink size={14} />
                          {t('publications.viewRepo')}
                        </a>
                      )}
                      {pub.downloadable && pub.downloadUrl && (
                        <button
                          onClick={(e) => handleDownload(e, pub.downloadUrl, `${pub.id}.pdf`)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Download size={14} />
                          {t('publications.downloadPDF')}
                          {pub.documentLanguage && (
                            <span className="text-xs opacity-70">({t(`publications.languages.${pub.documentLanguage}`)})</span>
                          )}
                        </button>
                      )}
                      {!pub.link && !pub.downloadable && (
                        <span className="text-sm text-muted-foreground italic">
                          {t('publications.draftAvailable')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
