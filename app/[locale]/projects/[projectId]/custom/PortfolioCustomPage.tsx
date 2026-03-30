'use client';

import { motion } from 'framer-motion';
import { 
  Code2, Palette, Zap, Accessibility, Search, Sparkles, CheckCircle2, ArrowRight,
  Server, Languages, Database, Layout, Layers, Box, Wrench, Rocket, AlertCircle, CheckCircle,
  TrendingUp, Globe, FileCode
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  Node,
  Edge,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { CustomProjectPageProps } from '../custom-pages';
import CustomPageLayout from './CustomPageLayout';

/**
 * Portfolio Project Custom Page
 * 
 * A professional blog post-style page telling the story of building
 * this modern, multilingual portfolio website.
 */

export default function PortfolioCustomPage({ locale, projectId }: CustomProjectPageProps) {
  // Define table of contents sections
  const tocSections = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'motivation', title: 'The Motivation', level: 1 },
    { id: 'architecture', title: 'Architecture & Design', level: 1 },
    { id: 'technical-highlights', title: 'Technical Highlights', level: 1 },
    { id: 'challenges', title: 'Challenges & Solutions', level: 1 },
    { id: 'results', title: 'Results & Impact', level: 1 },
    { id: 'lessons', title: 'Lessons Learned', level: 1 },
  ];

  return (
    <CustomPageLayout locale={locale} projectId={projectId} tocSections={tocSections}>
      {/* Introduction */}
      <article className="prose prose-lg max-w-none">
        <section id="introduction" className="py-12 scroll-mt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles size={16} />
            Case Study
          </div>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Building a modern portfolio website is more than just showcasing projects—it's about creating
            an experience that reflects technical expertise while remaining accessible to a global audience.
            This case study explores the journey of building a production-ready portfolio from scratch using
            Next.js 15, with a focus on internationalization, SEO, and developer experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
              <div className="text-xs text-muted-foreground mt-1">English, Japanese, Thai</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">98</div>
              <div className="text-sm text-muted-foreground">Lighthouse Score</div>
              <div className="text-xs text-muted-foreground mt-1">Performance, SEO, Accessibility</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Type Safety</div>
              <div className="text-xs text-muted-foreground mt-1">Full TypeScript coverage</div>
            </div>
          </div>
        </section>

        {/* Motivation */}
        <section id="motivation" className="py-12 scroll-mt-24">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">The Motivation</h2>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            As a final-year CS student with experience in LLM systems and backend engineering, I needed
            a portfolio that could effectively communicate my technical skills to a diverse, international
            audience. The challenge wasn't just building a website—it was creating a platform that could:
          </p>

          <ul className="space-y-3 mb-6">
            {[
              'Support multiple languages without compromising user experience',
              'Rank well in search engines across different regions',
              'Maintain accessibility standards for all users',
              'Provide a flexible content management system for projects',
              'Serve as a learning platform for modern web development',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-accent mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground leading-relaxed">
            Rather than using a template or CMS, I chose to build from scratch to have complete control
            over the architecture and to demonstrate my full-stack capabilities.
          </p>
        </section>

        {/* Architecture */}
        <section id="architecture" className="py-12 scroll-mt-24 bg-muted/30 -mx-6 px-6 rounded-2xl">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Architecture & Design</h2>
          
          <p className="text-muted-foreground leading-relaxed mb-8">
            The architecture follows Next.js 15 App Router conventions with a focus on type safety,
            maintainability, and performance. Explore each layer to understand how the system is structured.
          </p>

          <InteractiveArchitectureSection />
        </section>

       

        {/* Technical Highlights */}
        <section id="technical-highlights" className="py-12 scroll-mt-24">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Technical Highlights</h2>

          <div className="space-y-8">
            {/* Highlight 1 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">1</span>
                Custom i18n with Automatic Fallback
              </h3>
              <p className="text-muted-foreground mb-4">
                Built a custom internationalization system that automatically falls back to English when
                translations are missing. This ensures users always see content, even if translations are incomplete.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-muted-foreground">{`// lib/i18n/utils.ts
export function getTranslationWithFallback(
  t: TFunction,
  key: string,
  defaultLocale: string = 'en'
): string {
  const value = t(key);
  if (value === key) {
    // Translation missing, try default locale
    return t(key, { lng: defaultLocale });
  }
  return value;
}`}</pre>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">2</span>
                Centralized Project Data System
              </h3>
              <p className="text-muted-foreground mb-4">
                Created a single source of truth for all project data with TypeScript types. Supports multiple
                project types (GitHub, Gist, HuggingFace, Data, Template, Library, Plugin) with extensible schema.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-muted-foreground">{`// data/projects.ts
export type ProjectType = 
  | 'github' | 'gist' | 'private' 
  | 'huggingface' | 'data' | 'template' 
  | 'library' | 'plugin';

export interface Project {
  id: string;
  type: ProjectType;
  tags: string[];
  github?: string;
  demo?: string;
  // ... extensible schema
}`}</pre>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">3</span>
                Flexible Custom Page System
              </h3>
              <p className="text-muted-foreground mb-4">
                Dual approach: default template for standard projects, custom pages for unique storytelling.
                Custom pages maintain consistent structure (navbar, breadcrumbs, header) while allowing full
                creative freedom in the content area.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Box size={16} className="text-accent" />
                    <div className="text-sm font-medium">Default Template</div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Consistent structure</div>
                    <div>• i18n support</div>
                    <div>• Rich content blocks</div>
                    <div>• Quick setup</div>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench size={16} className="text-accent" />
                    <div className="text-sm font-medium">Custom Pages</div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Full creative freedom</div>
                    <div>• Custom layouts</div>
                    <div>• Unique storytelling</div>
                    <div>• Maintained structure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlight 4 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">4</span>
                Comprehensive SEO Implementation
              </h3>
              <p className="text-muted-foreground mb-4">
                Implemented complete SEO strategy with dynamic metadata, structured data, and automated testing.
                Created custom SEO audit script that scores the site 0-100 across multiple criteria.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-500">98</div>
                  <div className="text-xs text-muted-foreground">Lighthouse SEO</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-500">100%</div>
                  <div className="text-xs text-muted-foreground">Meta Coverage</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-500">A+</div>
                  <div className="text-xs text-muted-foreground">Structured Data</div>
                </div>
              </div>
            </div>
          </div>
        </section>

       

        {/* Challenges & Solutions */}
        <section id="challenges" className="py-12 scroll-mt-24 bg-muted/30 -mx-6 px-6 rounded-2xl">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Challenges & Solutions</h2>
          <p className="text-muted-foreground mb-8">
            Every great project faces obstacles. Here's how I tackled the key challenges in building this portfolio.
          </p>

          <InteractiveChallengesSection />
        </section>

    
        {/* Lessons Learned */}
        <section id="lessons" className="py-12 scroll-mt-24">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Lessons Learned</h2>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">1. Start with Architecture, Not Features</h3>
              <p className="text-muted-foreground">
                Investing time upfront in a solid architecture (centralized data, type safety, i18n system)
                paid massive dividends later. It made adding new features and fixing bugs significantly easier.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">2. TypeScript is Non-Negotiable</h3>
              <p className="text-muted-foreground">
                Full TypeScript coverage caught countless bugs before they reached production. The initial
                setup time was worth it for the confidence and developer experience it provided.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">3. Test What Matters</h3>
              <p className="text-muted-foreground">
                Rather than chasing 100% test coverage, focused on testing critical paths: SEO metadata,
                i18n fallbacks, accessibility features, and data integrity. This provided the most value.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">4. Documentation is for Future You</h3>
              <p className="text-muted-foreground">
                Comprehensive README files and inline documentation made it easy to return to the project
                after weeks away. Good documentation is an investment in maintainability.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">5. Performance is a Feature</h3>
              <p className="text-muted-foreground">
                Users notice fast sites. Optimizing images, using Server Components, and minimizing JavaScript
                created a noticeably better experience that reflects well on technical skills.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-8 text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Explore the Code
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              The entire project is open source. Dive into the code to see the implementation details,
              or use it as a starting point for your own portfolio.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/AppleBoiy/mysite"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                View Source Code
                <ArrowRight size={20} />
              </a>
              <Link
                href={`/${locale}/projects`}
                className="px-8 py-4 bg-card border border-border rounded-full font-medium hover:border-accent/50 transition-colors inline-flex items-center gap-2"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </section>
      </article>
    </CustomPageLayout>
  );
}

// Interactive Features Section Component
function InteractiveFeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      id: 0,
      icon: Languages,
      title: 'Multilingual Support',
      shortDesc: 'Full i18n with 3 languages',
      description: 'Complete internationalization system supporting English, Japanese, and Thai with automatic fallback to English for missing translations.',
      color: 'blue',
      highlights: [
        { label: 'Languages', value: '3', icon: Globe },
        { label: 'Fallback', value: '100%', icon: CheckCircle2 },
        { label: 'Switch Time', value: '0ms', icon: Zap },
      ],
      details: [
        'URL-based locale routing (/en, /ja, /th)',
        'Automatic fallback to English',
        'Dynamic language switching',
        'SEO-optimized hreflang tags',
      ],
    },
    {
      id: 1,
      icon: Search,
      title: 'SEO Optimized',
      shortDesc: 'Rank higher in search engines',
      description: 'Comprehensive SEO implementation with dynamic metadata, structured data, and automated testing to ensure maximum visibility.',
      color: 'green',
      highlights: [
        { label: 'Lighthouse', value: '98', icon: TrendingUp },
        { label: 'Meta Tags', value: '100%', icon: CheckCircle2 },
        { label: 'Structured Data', value: 'A+', icon: CheckCircle2 },
      ],
      details: [
        'Dynamic metadata generation',
        'Open Graph & Twitter Cards',
        'JSON-LD structured data',
        'Automated SEO testing suite',
      ],
    },
    {
      id: 2,
      icon: Accessibility,
      title: 'Accessibility First',
      shortDesc: 'WCAG 2.1 AA compliant',
      description: 'Built with accessibility in mind from day one. Proper ARIA labels, semantic HTML, and full keyboard navigation support.',
      color: 'purple',
      highlights: [
        { label: 'WCAG', value: 'AA', icon: CheckCircle2 },
        { label: 'Keyboard Nav', value: '100%', icon: CheckCircle2 },
        { label: 'Screen Reader', value: 'Full', icon: CheckCircle2 },
      ],
      details: [
        'Semantic HTML structure',
        'ARIA labels and roles',
        'Keyboard navigation support',
        'Skip to content links',
      ],
    },
    {
      id: 3,
      icon: Code2,
      title: 'Developer Experience',
      shortDesc: 'Type-safe and maintainable',
      description: 'Full TypeScript coverage with strict mode, centralized data management, and comprehensive documentation for easy maintenance.',
      color: 'orange',
      highlights: [
        { label: 'Type Safety', value: '100%', icon: CheckCircle2 },
        { label: 'Test Coverage', value: '85%', icon: CheckCircle2 },
        { label: 'Build Time', value: '12s', icon: Rocket },
      ],
      details: [
        'TypeScript strict mode',
        'Centralized data layer',
        'Reusable components',
        'Comprehensive documentation',
      ],
    },
    {
      id: 4,
      icon: Zap,
      title: 'Performance',
      shortDesc: 'Lightning fast load times',
      description: 'Optimized for speed with Server Components, image optimization, code splitting, and edge deployment for global performance.',
      color: 'yellow',
      highlights: [
        { label: 'FCP', value: '0.8s', icon: Rocket },
        { label: 'TTI', value: '1.2s', icon: Rocket },
        { label: 'Bundle', value: '95kB', icon: Box },
      ],
      details: [
        'React Server Components',
        'Automatic image optimization',
        'Code splitting & lazy loading',
        'Edge network deployment',
      ],
    },
    {
      id: 5,
      icon: Palette,
      title: 'Flexible Content',
      shortDesc: 'Tell your unique story',
      description: 'Dual content system: default template for quick setup, or custom pages for complete creative freedom with maintained structure.',
      color: 'pink',
      highlights: [
        { label: 'Templates', value: '2', icon: Layout },
        { label: 'Block Types', value: '8+', icon: Box },
        { label: 'Flexibility', value: 'Full', icon: Wrench },
      ],
      details: [
        'Default template with i18n',
        'Custom pages for unique layouts',
        'Rich content blocks (code, images, etc)',
        'Maintained navbar & structure',
      ],
    },
  ];

  const colorClasses = {
    blue: { 
      bg: 'bg-blue-500/10', 
      border: 'border-blue-500/30', 
      text: 'text-blue-500',
      hover: 'hover:border-blue-500/50',
      gradient: 'from-blue-500/20 to-blue-600/20',
    },
    green: { 
      bg: 'bg-green-500/10', 
      border: 'border-green-500/30', 
      text: 'text-green-500',
      hover: 'hover:border-green-500/50',
      gradient: 'from-green-500/20 to-green-600/20',
    },
    purple: { 
      bg: 'bg-purple-500/10', 
      border: 'border-purple-500/30', 
      text: 'text-purple-500',
      hover: 'hover:border-purple-500/50',
      gradient: 'from-purple-500/20 to-purple-600/20',
    },
    orange: { 
      bg: 'bg-orange-500/10', 
      border: 'border-orange-500/30', 
      text: 'text-orange-500',
      hover: 'hover:border-orange-500/50',
      gradient: 'from-orange-500/20 to-orange-600/20',
    },
    yellow: { 
      bg: 'bg-yellow-500/10', 
      border: 'border-yellow-500/30', 
      text: 'text-yellow-500',
      hover: 'hover:border-yellow-500/50',
      gradient: 'from-yellow-500/20 to-yellow-600/20',
    },
    pink: { 
      bg: 'bg-pink-500/10', 
      border: 'border-pink-500/30', 
      text: 'text-pink-500',
      hover: 'hover:border-pink-500/50',
      gradient: 'from-pink-500/20 to-pink-600/20',
    },
  };

  return (
    <div className="space-y-6">
      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const colors = colorClasses[feature.color as keyof typeof colorClasses];
          const Icon = feature.icon;
          const isSelected = selectedFeature === feature.id;
          const isHovered = hoveredFeature === feature.id;

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => setSelectedFeature(isSelected ? null : feature.id)}
              className={`relative bg-card border-2 rounded-xl p-6 cursor-pointer transition-all ${
                isSelected 
                  ? `${colors.border} shadow-lg scale-105` 
                  : `border-border ${colors.hover}`
              }`}
            >
              {/* Special "This Site" badge for Flexible Content feature */}
              {feature.id === 5 && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                  <Sparkles size={12} />
                  This Site
                </div>
              )}

              {/* Icon with gradient background */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} flex items-center justify-center mb-4 transition-transform ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}>
                <Icon className={colors.text} size={32} />
              </div>

              {/* Title & Short Description */}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{feature.shortDesc}</p>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {feature.highlights.map((highlight, idx) => {
                  const HighlightIcon = highlight.icon;
                  return (
                    <div key={idx} className={`${colors.bg} rounded-lg p-2 text-center`}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <HighlightIcon size={12} className={colors.text} />
                      </div>
                      <div className={`text-sm font-bold ${colors.text}`}>{highlight.value}</div>
                      <div className="text-[10px] text-muted-foreground">{highlight.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Click indicator */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>{isSelected ? 'Click to collapse' : 'Click to expand'}</span>
                <ArrowRight size={12} className={`transition-transform ${isSelected ? 'rotate-90' : ''}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Details */}
      {selectedFeature !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {features.map((feature) => {
            if (feature.id !== selectedFeature) return null;
            
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-gradient-to-br ${colors.gradient} border-2 ${colors.border} rounded-xl p-8`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}>
                    <Icon className={colors.text} size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Key Metrics */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp size={18} className={colors.text} />
                      Key Metrics
                    </h4>
                    <div className="space-y-3">
                      {feature.highlights.map((highlight, idx) => {
                        const HighlightIcon = highlight.icon;
                        return (
                          <div key={idx} className="bg-card/50 backdrop-blur rounded-lg p-3 flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                              <HighlightIcon size={18} className={colors.text} />
                            </div>
                            <div>
                              <div className={`text-lg font-bold ${colors.text}`}>{highlight.value}</div>
                              <div className="text-xs text-muted-foreground">{highlight.label}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Implementation Details */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 size={18} className={colors.text} />
                      Implementation
                    </h4>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 size={16} className={`${colors.text} mt-0.5 shrink-0`} />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}


// Interactive Architecture Section Component
function InteractiveArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<'overview' | 'frontend' | 'core' | 'ui' | 'deployment'>('overview');

  const layers = [
    {
      id: 'overview' as const,
      title: 'System Overview',
      icon: Layers,
      color: 'blue',
      description: 'High-level architecture showing how all layers work together',
    },
    {
      id: 'frontend' as const,
      title: 'Frontend Layer',
      icon: Server,
      color: 'purple',
      description: 'Next.js 15 App Router with Server & Client Components',
    },
    {
      id: 'core' as const,
      title: 'Core Systems',
      icon: Database,
      color: 'green',
      description: 'i18n, Data Management, and Content Systems',
    },
    {
      id: 'ui' as const,
      title: 'UI Components',
      icon: Layout,
      color: 'orange',
      description: 'Reusable components, hooks, and utilities',
    },
    {
      id: 'deployment' as const,
      title: 'Deployment',
      icon: Rocket,
      color: 'cyan',
      description: 'Edge network, CI/CD, and monitoring',
    },
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', hover: 'hover:border-blue-500/50' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', hover: 'hover:border-purple-500/50' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', hover: 'hover:border-green-500/50' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', hover: 'hover:border-orange-500/50' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', hover: 'hover:border-cyan-500/50' },
  };

  return (
    <div className="space-y-6">
      {/* Layer Tabs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {layers.map((layer) => {
          const colors = colorClasses[layer.color as keyof typeof colorClasses];
          const Icon = layer.icon;
          const isActive = activeLayer === layer.id;

          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isActive
                  ? `${colors.bg} ${colors.border} shadow-lg scale-105`
                  : `bg-card border-border ${colors.hover}`
              }`}
            >
              <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-3`}>
                <Icon className={colors.text} size={20} />
              </div>
              <div className="text-sm font-semibold mb-1">{layer.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{layer.description}</div>
            </button>
          );
        })}
      </div>

      {/* Layer Content */}
      <motion.div
        key={activeLayer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {activeLayer === 'overview' && <OverviewContent />}
        {activeLayer === 'frontend' && <FrontendContent />}
        {activeLayer === 'core' && <CoreSystemsContent />}
        {activeLayer === 'ui' && <UIComponentsContent />}
        {activeLayer === 'deployment' && <DeploymentContent />}
      </motion.div>
    </div>
  );
}

// Overview Content with React Flow
function OverviewContent() {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'default',
      data: { 
        label: (
          <div className="text-center px-4 py-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Globe size={18} className="text-blue-500" />
              <div className="font-semibold text-blue-600 dark:text-blue-400">User / Browser</div>
            </div>
            <div className="text-xs text-muted-foreground">Multi-language • Dark Mode</div>
          </div>
        )
      },
      position: { x: 250, y: 0 },
      style: {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        width: 280,
        padding: '8px',
      },
      sourcePosition: Position.Bottom,
    },
    {
      id: '2',
      type: 'default',
      data: { 
        label: (
          <div className="text-center px-4 py-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Server size={18} className="text-purple-500" />
              <div className="font-semibold text-purple-600 dark:text-purple-400">Next.js 15 App Router</div>
            </div>
            <div className="text-xs text-muted-foreground">Server & Client Components</div>
          </div>
        )
      },
      position: { x: 250, y: 120 },
      style: {
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.1))',
        border: '2px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '12px',
        width: 280,
        padding: '8px',
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '3',
      type: 'default',
      data: { 
        label: (
          <div className="text-center px-3 py-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Languages size={16} className="text-green-500" />
              <div className="font-semibold text-green-600 dark:text-green-400 text-sm">i18n System</div>
            </div>
            <div className="text-xs text-muted-foreground">3 Languages</div>
          </div>
        )
      },
      position: { x: 50, y: 260 },
      style: {
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))',
        border: '2px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '12px',
        width: 160,
        padding: '6px',
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '4',
      type: 'default',
      data: { 
        label: (
          <div className="text-center px-3 py-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Database size={16} className="text-orange-500" />
              <div className="font-semibold text-orange-600 dark:text-orange-400 text-sm">Data Layer</div>
            </div>
            <div className="text-xs text-muted-foreground">TypeScript Types</div>
          </div>
        )
      },
      position: { x: 310, y: 260 },
      style: {
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))',
        border: '2px solid rgba(249, 115, 22, 0.3)',
        borderRadius: '12px',
        width: 160,
        padding: '6px',
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '5',
      type: 'default',
      data: { 
        label: (
          <div className="text-center px-3 py-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <FileCode size={16} className="text-pink-500" />
              <div className="font-semibold text-pink-600 dark:text-pink-400 text-sm">Content System</div>
            </div>
            <div className="text-xs text-muted-foreground">Custom Pages</div>
          </div>
        )
      },
      position: { x: 570, y: 260 },
      style: {
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1))',
        border: '2px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '12px',
        width: 160,
        padding: '6px',
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '6',
      type: 'default',
      data: { 
        label: (
          <div className="text-center px-3 py-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Layout size={16} className="text-amber-500" />
              <div className="font-semibold text-amber-600 dark:text-amber-400 text-sm">UI Components</div>
            </div>
            <div className="text-xs text-muted-foreground">Pages • Hooks • Utils</div>
          </div>
        )
      },
      position: { x: 250, y: 400 },
      style: {
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
        border: '2px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '12px',
        width: 280,
        padding: '6px',
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '7',
      type: 'default',
      data: { 
        label: (
          <div className="text-center px-4 py-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Rocket size={18} className="text-cyan-500" />
              <div className="font-semibold text-cyan-600 dark:text-cyan-400">Vercel Edge Network</div>
            </div>
            <div className="text-xs text-muted-foreground">Global CDN • CI/CD</div>
          </div>
        )
      },
      position: { x: 250, y: 520 },
      style: {
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1))',
        border: '2px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '12px',
        width: 280,
        padding: '8px',
      },
      targetPosition: Position.Top,
    },
  ];

  const initialEdges: Edge[] = [
    { 
      id: 'e1-2', 
      source: '1', 
      target: '2',
      animated: true,
      style: { stroke: 'rgba(168, 85, 247, 0.5)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(168, 85, 247, 0.5)' },
    },
    { 
      id: 'e2-3', 
      source: '2', 
      target: '3',
      animated: true,
      style: { stroke: 'rgba(34, 197, 94, 0.5)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(34, 197, 94, 0.5)' },
    },
    { 
      id: 'e2-4', 
      source: '2', 
      target: '4',
      animated: true,
      style: { stroke: 'rgba(249, 115, 22, 0.5)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(249, 115, 22, 0.5)' },
    },
    { 
      id: 'e2-5', 
      source: '2', 
      target: '5',
      animated: true,
      style: { stroke: 'rgba(236, 72, 153, 0.5)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(236, 72, 153, 0.5)' },
    },
    { 
      id: 'e3-6', 
      source: '3', 
      target: '6',
      animated: true,
      style: { stroke: 'rgba(245, 158, 11, 0.5)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(245, 158, 11, 0.5)' },
    },
    { 
      id: 'e4-6', 
      source: '4', 
      target: '6',
      animated: true,
      style: { stroke: 'rgba(245, 158, 11, 0.5)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(245, 158, 11, 0.5)' },
    },
    { 
      id: 'e5-6', 
      source: '5', 
      target: '6',
      animated: true,
      style: { stroke: 'rgba(245, 158, 11, 0.5)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(245, 158, 11, 0.5)' },
    },
    { 
      id: 'e6-7', 
      source: '6', 
      target: '7',
      animated: true,
      style: { stroke: 'rgba(6, 182, 212, 0.5)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(6, 182, 212, 0.5)' },
    },
  ];

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">System Architecture Flow</h3>
      <p className="text-muted-foreground mb-6">
        Interactive architecture diagram showing how all layers work together. Drag nodes to explore connections.
      </p>

      <div className="bg-card border border-border rounded-xl overflow-hidden" style={{ height: '600px' }}>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          attributionPosition="bottom-left"
          className="bg-muted/20"
        >
          <Background color="#888" gap={16} />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              if (node.id === '1') return 'rgba(59, 130, 246, 0.3)';
              if (node.id === '2') return 'rgba(168, 85, 247, 0.3)';
              if (node.id === '3') return 'rgba(34, 197, 94, 0.3)';
              if (node.id === '4') return 'rgba(249, 115, 22, 0.3)';
              if (node.id === '5') return 'rgba(236, 72, 153, 0.3)';
              if (node.id === '6') return 'rgba(245, 158, 11, 0.3)';
              return 'rgba(6, 182, 212, 0.3)';
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        </ReactFlow>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <div className="text-sm font-semibold">Key Benefits</div>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Clear separation of concerns</li>
            <li>• Unidirectional data flow</li>
            <li>• Easy to test and maintain</li>
            <li>• Scalable architecture</li>
          </ul>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-yellow-500" />
            <div className="text-sm font-semibold">Performance</div>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Server-side rendering</li>
            <li>• Automatic code splitting</li>
            <li>• Edge caching</li>
            <li>• Optimized images</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Frontend Content
function FrontendContent() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
          <Server className="text-purple-500" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Frontend Layer</h3>
          <p className="text-sm text-muted-foreground">Next.js 15 with App Router</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Server Components Strategy</h4>
          <p className="text-muted-foreground mb-4">
            Leverages React Server Components for optimal performance. Most components render on the server,
            with strategic use of client components only where interactivity is needed.
          </p>
          <div className="bg-black/90 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-green-400">{`// Server Component (default)
export default async function ProjectPage({ params }) {
  const project = await getProject(params.id);
  return <ProjectDetails project={project} />;
}

// Client Component (when needed)
'use client';
export function InteractiveDemo() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}`}</pre>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-sm font-semibold mb-2 text-purple-500">Benefits</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 40% smaller JavaScript bundle</li>
              <li>• Faster initial page load</li>
              <li>• Better SEO performance</li>
              <li>• Reduced client-side processing</li>
            </ul>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-sm font-semibold mb-2 text-purple-500">Technologies</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Next.js 15 (App Router)</li>
              <li>• React 18 (RSC)</li>
              <li>• TypeScript (Strict)</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Core Systems Content
function CoreSystemsContent() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
          <Database className="text-green-500" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Core Systems</h3>
          <p className="text-sm text-muted-foreground">i18n, Data, and Content Management</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* i18n System */}
        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Languages size={20} className="text-green-500" />
            <h4 className="font-semibold text-green-500">Internationalization System</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Custom i18n implementation with automatic fallback to English when translations are missing.
            Supports 3 languages with URL-based routing.
          </p>
          <div className="grid sm:grid-cols-3 gap-2">
            <div className="bg-card rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-500">3</div>
              <div className="text-xs text-muted-foreground">Languages</div>
            </div>
            <div className="bg-card rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-500">100%</div>
              <div className="text-xs text-muted-foreground">Fallback Coverage</div>
            </div>
            <div className="bg-card rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-500">0ms</div>
              <div className="text-xs text-muted-foreground">Switch Time</div>
            </div>
          </div>
        </div>

        {/* Data Layer */}
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Database size={20} className="text-orange-500" />
            <h4 className="font-semibold text-orange-500">Centralized Data Layer</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Single source of truth for all project data with full TypeScript types. Extensible schema
            supports multiple project types.
          </p>
          <div className="bg-black/90 rounded-lg p-3 font-mono text-xs overflow-x-auto">
            <pre className="text-green-400">{`// data/projects.ts
export interface Project {
  id: string;
  type: ProjectType;
  tags: string[];
  github?: string;
  demo?: string;
  // ... extensible
}`}</pre>
          </div>
        </div>

        {/* Content System */}
        <div className="bg-pink-500/5 border border-pink-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Layout size={20} className="text-pink-500" />
            <h4 className="font-semibold text-pink-500">Flexible Content System</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Dual approach: default template for quick setup, custom pages for unique storytelling.
            Supports rich content blocks.
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="bg-card rounded-lg p-3">
              <div className="text-xs font-semibold mb-1">Default Template</div>
              <div className="text-xs text-muted-foreground">Quick, consistent, i18n-ready</div>
            </div>
            <div className="bg-card rounded-lg p-3">
              <div className="text-xs font-semibold mb-1">Custom Pages</div>
              <div className="text-xs text-muted-foreground">Full creative freedom</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// UI Components Content
function UIComponentsContent() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
          <Layout className="text-orange-500" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">UI Components</h3>
          <p className="text-sm text-muted-foreground">Reusable, accessible, and type-safe</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pages */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Box size={16} className="text-blue-500" />
            </div>
            <h4 className="font-semibold">Pages (RSC)</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Server-rendered pages with dynamic routing and metadata generation.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• app/[locale]/page.tsx</li>
            <li>• app/[locale]/projects/page.tsx</li>
            <li>• app/[locale]/projects/[id]/page.tsx</li>
            <li>• app/[locale]/contact/page.tsx</li>
          </ul>
        </div>

        {/* Components */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Layers size={16} className="text-green-500" />
            </div>
            <h4 className="font-semibold">Components</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Reusable UI components built with Radix UI and Tailwind CSS.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Navbar, Footer, Hero</li>
            <li>• ProjectsGrid, ProjectCard</li>
            <li>• LanguageSwitcher, ThemeToggle</li>
            <li>• Button, Input, Textarea</li>
          </ul>
        </div>

        {/* Hooks */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Code2 size={16} className="text-purple-500" />
            </div>
            <h4 className="font-semibold">Custom Hooks</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Client-side hooks for common patterns and behaviors.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• useNetworkStatus</li>
            <li>• useLazyLoad</li>
            <li>• useHaptic</li>
            <li>• useMobile</li>
          </ul>
        </div>

        {/* Utils */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Wrench size={16} className="text-orange-500" />
            </div>
            <h4 className="font-semibold">Utilities</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Helper functions for common operations and transformations.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• cn() - Class name merger</li>
            <li>• sanitize() - XSS protection</li>
            <li>• fetchWithRetry() - API calls</li>
            <li>• downloadHelper() - File downloads</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-muted/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Accessibility size={16} className="text-accent" />
          <div className="text-sm font-semibold">Accessibility First</div>
        </div>
        <p className="text-sm text-muted-foreground">
          All components follow WCAG 2.1 AA standards with proper ARIA labels, keyboard navigation,
          and screen reader support.
        </p>
      </div>
    </div>
  );
}

// Deployment Content
function DeploymentContent() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
          <Rocket className="text-cyan-500" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Deployment & DevOps</h3>
          <p className="text-sm text-muted-foreground">Edge network with CI/CD pipeline</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Vercel Edge */}
        <div>
          <h4 className="font-semibold mb-3">Vercel Edge Network</h4>
          <p className="text-muted-foreground mb-4">
            Deployed on Vercel's global edge network for optimal performance and reliability.
            Automatic HTTPS, CDN caching, and instant rollbacks.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-cyan-500 mb-1">&lt;100ms</div>
              <div className="text-xs text-muted-foreground">Global Latency</div>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-cyan-500 mb-1">99.99%</div>
              <div className="text-xs text-muted-foreground">Uptime SLA</div>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-cyan-500 mb-1">300+</div>
              <div className="text-xs text-muted-foreground">Edge Locations</div>
            </div>
          </div>
        </div>

        {/* CI/CD Pipeline */}
        <div>
          <h4 className="font-semibold mb-3">CI/CD Pipeline</h4>
          <div className="bg-muted/30 rounded-xl p-4">
            <div className="space-y-3">
              {[
                { step: '1. Push to GitHub', desc: 'Code pushed to main branch', icon: CheckCircle2, color: 'text-green-500' },
                { step: '2. Automated Tests', desc: 'Run test suite (SEO, accessibility, types)', icon: CheckCircle2, color: 'text-green-500' },
                { step: '3. Build & Deploy', desc: 'Build on Vercel, deploy to edge', icon: CheckCircle2, color: 'text-green-500' },
                { step: '4. Verification', desc: 'Smoke tests and health checks', icon: CheckCircle2, color: 'text-green-500' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <item.icon className={item.color} size={20} />
                  <div>
                    <div className="text-sm font-semibold">{item.step}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="font-semibold mb-3">DevOps Tools</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="text-sm font-semibold mb-2">Deployment</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Vercel (Edge Network)</li>
                <li>• GitHub (Version Control)</li>
                <li>• Automatic Deployments</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="text-sm font-semibold mb-2">Testing & Quality</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Vitest (Unit Tests)</li>
                <li>• ESLint + Prettier</li>
                <li>• TypeScript Strict Mode</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive Challenges Section Component
function InteractiveChallengesSection() {
  const [selectedChallenge, setSelectedChallenge] = useState(0);

  const challenges = [
    {
      id: 0,
      title: 'Hydration Mismatch with i18n',
      icon: AlertCircle,
      color: 'red',
      problem: 'Server-rendered content didn\'t match client-side translations, causing React hydration errors.',
      solution: 'Changed from useEffect-based initialization to synchronous i18n setup during render. Ensured translations are loaded before first render.',
      impact: 'Eliminated all hydration errors, improved initial page load experience.',
      code: `// Before (caused hydration errors)
useEffect(() => {
  initClientI18n(locale);
}, [locale]);

// After (synchronous initialization)
initClientI18n(locale); // Called during render`,
    },
    {
      id: 1,
      title: 'Managing Project Data',
      icon: Database,
      color: 'orange',
      problem: 'Project data was duplicated across multiple components, making updates error-prone and time-consuming.',
      solution: 'Created centralized data/projects.ts with TypeScript types and shared utilities. Single source of truth for all project information.',
      impact: 'Reduced maintenance overhead by 70%, eliminated data inconsistencies.',
      code: `// Centralized data layer
export const projects: Project[] = [
  {
    id: 'mysite',
    type: 'github',
    tags: ['Next.js', 'React'],
    // ... single source of truth
  }
];`,
    },
    {
      id: 2,
      title: 'SEO for Multilingual Content',
      icon: Search,
      color: 'green',
      problem: 'Search engines needed proper signals for language variants and canonical URLs.',
      solution: 'Implemented hreflang tags, canonical URLs, and language-specific metadata. Created automated SEO testing suite.',
      impact: 'Improved search visibility across all supported languages.',
      code: `// Dynamic metadata with i18n
export async function generateMetadata() {
  return {
    alternates: {
      canonical: \`/\${locale}/projects\`,
      languages: {
        en: '/en/projects',
        ja: '/ja/projects',
        th: '/th/projects',
      },
    },
  };
}`,
    },
    {
      id: 3,
      title: 'Flexibility vs Consistency',
      icon: Layout,
      color: 'purple',
      problem: 'Needed unique layouts for some projects while maintaining site consistency.',
      solution: 'Built custom page system with layout wrapper that maintains navbar, breadcrumbs, and header while allowing full content customization.',
      impact: 'Best of both worlds: consistent structure with creative freedom.',
      code: `// Custom page with standard layout
<CustomPageLayout locale={locale} projectId={id}>
  {/* Full creative freedom here */}
  <YourCustomContent />
</CustomPageLayout>`,
    },
  ];

  const current = challenges[selectedChallenge];
  const colorClasses = {
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', hover: 'hover:border-red-500/50' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', hover: 'hover:border-orange-500/50' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', hover: 'hover:border-green-500/50' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', hover: 'hover:border-purple-500/50' },
  };

  return (
    <div className="space-y-6">
      {/* Challenge Tabs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {challenges.map((challenge) => {
          const colors = colorClasses[challenge.color as keyof typeof colorClasses];
          const Icon = challenge.icon;
          const isSelected = selectedChallenge === challenge.id;

          return (
            <button
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? `${colors.bg} ${colors.border} shadow-lg scale-105`
                  : `bg-card border-border ${colors.hover}`
              }`}
            >
              <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-3`}>
                <Icon className={colors.text} size={20} />
              </div>
              <div className="text-sm font-semibold">{challenge.title}</div>
            </button>
          );
        })}
      </div>

      {/* Challenge Content */}
      <motion.div
        key={selectedChallenge}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className={`${colorClasses[current.color as keyof typeof colorClasses].bg} border-b border-border px-6 py-4`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${colorClasses[current.color as keyof typeof colorClasses].bg} border ${colorClasses[current.color as keyof typeof colorClasses].border} flex items-center justify-center`}>
              <current.icon className={colorClasses[current.color as keyof typeof colorClasses].text} size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{current.title}</h3>
              <div className="text-sm text-muted-foreground">Challenge #{current.id + 1}</div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 p-6">
          {/* Left: Problem, Solution, Impact */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={18} className="text-red-500" />
                <h4 className="font-semibold text-red-500">Problem</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">{current.problem}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={18} className="text-green-500" />
                <h4 className="font-semibold text-green-500">Solution</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">{current.solution}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-blue-500" />
                <h4 className="font-semibold text-blue-500">Impact</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">{current.impact}</p>
            </div>
          </div>

          {/* Right: Code Example */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={18} className={colorClasses[current.color as keyof typeof colorClasses].text} />
              <h4 className={`font-semibold ${colorClasses[current.color as keyof typeof colorClasses].text}`}>Implementation</h4>
            </div>
            <div className="bg-black/90 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">{current.code}</pre>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pb-6">
          <div className="flex gap-2">
            {challenges.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i === selectedChallenge
                    ? colorClasses[current.color as keyof typeof colorClasses].text.replace('text-', 'bg-')
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}


