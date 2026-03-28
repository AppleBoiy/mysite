'use client';

import { motion } from "framer-motion";
import { FileText, Users } from "lucide-react";

const publications = [
  {
    title: "KG-Augmented RAG Pipeline for Automated Test Scenario Generation",
    journal: "JAIST×CMU Joint Research (Under Publication Embargo)",
    year: "2025",
    authors: "Chaipat Jainan, et al.",
    type: "Research Paper",
    status: "Under Embargo",
  },
];

export default function PublicationsSection() {
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
              Publications
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            Academic <span className="italic">Contributions</span>
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
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText size={18} className="text-accent" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                      {pub.title}
                    </h3>
                    <span className="shrink-0 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                      {pub.year}
                    </span>
                  </div>

                  <p className="text-accent text-sm font-medium mb-2">
                    {pub.journal}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users size={14} />
                      {pub.authors}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-muted rounded-full">
                      {pub.type}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                      {pub.status}
                    </span>
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
