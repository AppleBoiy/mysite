import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Download, ExternalLink, Calendar, Users, FileText, BookOpen, Database } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { getServerTranslations } from '@/lib/i18n/server';
import { Locale } from '@/lib/i18n/settings';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

// Publication data structure
interface PublicationData {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  journal: string;
  year: string;
  authors: string[];
  organization: string;
  status: string;
  github: string | null;
  downloadUrl: string | null;
  documentLanguage: string | null;
  tags: string[];
  abstract: string;
  overview: string;
  motivation: string[];
  methodology: Record<string, string[]>;
  keyFeatures?: string[];
  keyFindings?: string[];
  competencyQuestions?: Array<{
    scope: string;
    questions: string[];
  }>;
  technicalDetails: Record<string, string[]>;
  impact: string[];
  techStack: Record<string, string[]>;
  futureWork: string[];
}

// Publication data - matches the structure from PublicationPreview.jsx
const publicationsData: Record<string, PublicationData> = {
  'ontology-phsrs': {
    id: 'ontology-phsrs',
    title: 'Ontology-Augmented Thai Public Health Service Recommendation System',
    subtitle: 'Knowledge Engineering for Healthcare Service Discovery',
    type: 'Research Project',
    journal: 'Knowledge Engineering Project',
    year: '2024',
    authors: ['Chaipat Jainan, Kungwansup Saelee'],
    organization: 'Chiang Mai University',
    status: 'Completed',
    github: 'https://github.com/AppleBoiy/onto-augmented-PHSRS',
    downloadUrl: '/documents/ontology-phsrs.pdf',
    documentLanguage: 'Thai',
    tags: ['OWL', 'SPARQL', 'SWRL', 'Protégé', 'Python', 'Knowledge Graphs', 'Ontology Engineering'],
    abstract: 'This project presents a comprehensive ontology-based recommendation system for Thai public health services. By modeling complex relationships between health services, patient rights, and insurance coverage, the system provides intelligent recommendations to help Thai citizens navigate the public healthcare system more effectively.',
    overview: 'Built a health-domain knowledge base with 85 classes, 411 individuals, and 22 data properties modeling Thai public health services, patient rights, and insurance coverage as a queryable recommendation layer. Authored 38 SWRL reasoning rules and 40 SPARQL queries across 4 competency scopes to enable intelligent service recommendations.',
    motivation: [
      'Complex navigation of Thai public health service system',
      'Lack of structured information about patient rights and insurance coverage',
      'Need for intelligent recommendations based on patient circumstances',
      'Gap between available services and citizen awareness',
    ],
    methodology: {
      'Knowledge Modeling': [
        'Designed ontology with 85 classes representing health services, facilities, and patient profiles',
        'Created 411 individuals representing real-world entities in the Thai healthcare system',
        'Defined 22 data properties to capture essential attributes and relationships',
        'Modeled complex relationships between services, rights, and insurance coverage',
      ],
      'Reasoning & Inference': [
        'Authored 38 SWRL (Semantic Web Rule Language) rules for automated reasoning',
        'Implemented inference rules for service eligibility and recommendations',
        'Designed rules to handle complex insurance coverage scenarios',
        'Created reasoning chains for patient rights validation',
      ],
      'Query System': [
        'Developed 40 SPARQL queries across 4 competency question scopes',
        'Implemented queries for service discovery and recommendation',
        'Created queries for insurance coverage verification',
        'Designed queries for patient rights information retrieval',
      ],
      'Implementation': [
        'Used Protégé for ontology development and visualization',
        'Implemented Python scripts for data processing and integration',
        'Validated ontology consistency and completeness',
        'Tested reasoning rules with real-world scenarios',
      ],
    },
    keyFeatures: [
      'Comprehensive Thai public health service ontology with 85 classes',
      '411 real-world entities representing healthcare facilities and services',
      '38 SWRL reasoning rules for intelligent recommendations',
      '40 SPARQL queries for flexible information retrieval',
      '4 competency question scopes covering major use cases',
      'Integration of patient rights and insurance coverage information',
    ],
    competencyQuestions: [
      {
        scope: 'Service Discovery',
        questions: [
          'What health services are available for a specific condition?',
          'Which facilities provide a particular service?',
          'What are the operating hours and locations of health facilities?',
        ],
      },
      {
        scope: 'Insurance Coverage',
        questions: [
          'What services are covered under a specific insurance scheme?',
          'What are the coverage limits and conditions?',
          'Which facilities accept a particular insurance type?',
        ],
      },
      {
        scope: 'Patient Rights',
        questions: [
          'What rights does a patient have in the public health system?',
          'What are the procedures for filing complaints?',
          'What information must be disclosed to patients?',
        ],
      },
      {
        scope: 'Recommendations',
        questions: [
          'What services are recommended for a patient profile?',
          'Which facility is most suitable based on location and coverage?',
          'What alternative services are available if primary choice is unavailable?',
        ],
      },
    ],
    technicalDetails: {
      'Ontology Statistics': [
        '85 Classes - Hierarchical organization of health domain concepts',
        '411 Individuals - Real-world instances of healthcare entities',
        '22 Data Properties - Attributes describing entities',
        'Multiple Object Properties - Relationships between entities',
      ],
      'Reasoning Rules': [
        '38 SWRL Rules - Semantic Web Rule Language for inference',
        'Service eligibility rules',
        'Insurance coverage validation rules',
        'Recommendation generation rules',
      ],
      'Query Capabilities': [
        '40 SPARQL Queries - Structured query language for RDF',
        '4 Competency Scopes - Organized by use case',
        'Complex join queries across multiple entity types',
        'Aggregation and filtering capabilities',
      ],
    },
    impact: [
      'Structured representation of Thai public health service information',
      'Automated reasoning for service recommendations',
      'Improved accessibility to healthcare information for Thai citizens',
      'Reusable ontology framework for healthcare domain modeling',
      'Foundation for future intelligent health service applications',
    ],
    techStack: {
      'Ontology Engineering': ['OWL (Web Ontology Language)', 'Protégé', 'RDF/RDFS'],
      'Query & Reasoning': ['SPARQL', 'SWRL', 'Pellet Reasoner'],
      'Development': ['Python', 'RDFLib', 'SPARQL Wrapper'],
      'Tools': ['Protégé Desktop', 'OWLViz', 'OntoGraf'],
    },
    futureWork: [
      'Integration with real-time health facility data',
      'Mobile application for citizen access',
      'Expansion to cover more health service categories',
      'Machine learning integration for personalized recommendations',
      'Multi-language support (Thai, English, regional languages)',
    ],
  },
  'kg-rag-jaist': {
    id: 'kg-rag-jaist',
    title: 'KG-Augmented RAG Pipeline for Automated Test Scenario Generation',
    subtitle: 'JAIST×CMU Joint Research',
    type: 'Research Paper',
    journal: 'JAIST×CMU Joint Research',
    year: '2025',
    authors: ['Chaipat Jainan', 'et al.'],
    organization: 'KnOWLab Research Lab, JAIST',
    status: 'Extended',
    github: null,
    downloadUrl: null,
    documentLanguage: null,
    tags: ['LLM', 'Knowledge Graphs', 'RAG', 'Test Generation', 'Prompt Engineering'],
    abstract: 'This research presents a novel approach to automated test scenario generation using Knowledge Graph-augmented Retrieval-Augmented Generation (RAG) pipelines. By combining structured knowledge representation with large language models, we achieve significant improvements in test scenario quality and coverage.',
    overview: 'Developed a prompt engineering pipeline (DoC - Domain-Constrained) for LLM-based information extraction from unstructured documents, automating structured data population with 68% improvement over state-of-the-art. Tested and debugged LLM outputs at scale; applied domain constraints to filter implausible AI responses, achieving 100% accuracy.',
    motivation: [
      'Manual test scenario generation is time-consuming and error-prone',
      'Existing automated approaches lack domain knowledge integration',
      'Need for structured knowledge to guide LLM generation',
      'Gap between unstructured documentation and structured test cases',
    ],
    methodology: {
      'Knowledge Graph Construction': [
        'Extracted domain knowledge from technical documentation',
        'Built structured knowledge graph representing system components and relationships',
        'Defined ontology for test scenario domain',
        'Integrated domain constraints and validation rules',
      ],
      'RAG Pipeline Design': [
        'Implemented retrieval mechanism for relevant knowledge graph nodes',
        'Designed prompt templates incorporating retrieved knowledge',
        'Created domain-constrained generation pipeline (DoC)',
        'Integrated feedback loop for iterative refinement',
      ],
      'LLM Integration': [
        'Developed structured prompt engineering approach',
        'Implemented token budget optimization',
        'Created output validation and filtering mechanisms',
        'Designed domain constraint application layer',
      ],
      'Evaluation': [
        'Tested at scale with diverse document types',
        'Compared against state-of-the-art baselines',
        'Measured accuracy, coverage, and quality metrics',
        'Validated with domain experts',
      ],
    },
    keyFindings: [
      '68% improvement over state-of-the-art in information extraction accuracy',
      '100% accuracy achieved through domain constraint filtering',
      'Significant reduction in implausible AI-generated outputs',
      'Scalable approach applicable to various documentation types',
      'Effective integration of structured knowledge with LLM capabilities',
    ],
    technicalDetails: {
      'Pipeline Components': [
        'Knowledge Graph - Structured domain representation',
        'Retrieval Module - Context-aware knowledge retrieval',
        'Prompt Engineering - DoC (Domain-Constrained) approach',
        'LLM Integration - Structured generation with constraints',
        'Validation Layer - Domain constraint application',
      ],
      'Key Innovations': [
        'Domain-Constrained (DoC) prompt engineering pipeline',
        'Knowledge graph-augmented context retrieval',
        'Automated filtering of implausible outputs',
        'Scalable information extraction framework',
      ],
    },
    impact: [
      '68% improvement in extraction accuracy vs. state-of-the-art',
      '100% accuracy through domain constraint filtering',
      'Reduced manual effort in test scenario generation',
      'Scalable approach for automated documentation processing',
      'Foundation for future KG-augmented LLM applications',
    ],
    techStack: {
      'LLM & AI': ['Large Language Models', 'Prompt Engineering', 'RAG Pipeline'],
      'Knowledge Graphs': ['Graph Databases', 'Ontology Engineering', 'SPARQL'],
      'Development': ['Python', 'LangChain', 'Knowledge Graph Libraries'],
      'Research': ['Information Extraction', 'Domain Constraints', 'Validation'],
    },
    futureWork: [
      'Extension to additional domains and use cases',
      'Integration with continuous testing pipelines',
      'Real-time knowledge graph updates',
      'Multi-modal information extraction',
      'Publication in academic conference/journal',
    ],
  },
};

type Props = {
  params: Promise<{ locale: Locale; publicationId: string }>;
};

// Generate static params for all publications
export async function generateStaticParams() {
  const publicationIds = Object.keys(publicationsData);
  const locales: Locale[] = ['en', 'ja', 'th'];
  
  // Generate all combinations of locale and publicationId
  const params = locales.flatMap((locale) =>
    publicationIds.map((publicationId) => ({
      locale,
      publicationId,
    }))
  );
  
  return params;
}

// Generate metadata for each publication
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, publicationId } = await params;
  const publication = publicationsData[publicationId];

  if (!publication) {
    return {
      title: 'Publication Not Found',
    };
  }

  return {
    title: `${publication.title} | Chaipat Jainan`,
    description: publication.abstract,
    keywords: publication.tags,
    authors: publication.authors.map(author => ({ name: author })),
    openGraph: {
      title: `${publication.title} | Chaipat Jainan`,
      description: publication.abstract,
      url: `https://chaipat.cc/${locale}/publication/${publicationId}`,
      type: 'article',
      publishedTime: `${publication.year}-01-01`,
      authors: publication.authors,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${publication.title} | Chaipat Jainan`,
      description: publication.abstract,
      creator: '@AppleBoiy',
    },
    alternates: {
      canonical: `https://chaipat.cc/${locale}/publication/${publicationId}`,
      languages: {
        en: `https://chaipat.cc/en/publication/${publicationId}`,
        ja: `https://chaipat.cc/ja/publication/${publicationId}`,
        th: `https://chaipat.cc/th/publication/${publicationId}`,
      },
    },
  };
}

export default async function PublicationDetailPage({ params }: Props) {
  const { locale, publicationId } = await params;
  const publication = publicationsData[publicationId];

  // Return 404 if publication not found
  if (!publication) {
    notFound();
  }

  // Initialize translations on server
  const { t } = await getServerTranslations(locale);
  const translations = await import(`@/locales/${locale}.json`);

  const breadcrumbItems = [
    { label: t('breadcrumbs.publications'), href: `/${locale}#publications` },
    { label: publication.title, href: `/${locale}/publication/${publicationId}` }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    alternativeHeadline: publication.subtitle,
    description: publication.abstract,
    author: publication.authors.map(author => ({
      '@type': 'Person',
      name: author,
    })),
    datePublished: publication.year,
    publisher: {
      '@type': 'Organization',
      name: publication.organization,
    },
    isPartOf: {
      '@type': 'PublicationIssue',
      name: publication.journal,
    },
    keywords: publication.tags.join(', '),
    url: `https://chaipat.cc/${locale}/publication/${publicationId}`,
    inLanguage: publication.documentLanguage || 'en',
    ...(publication.downloadUrl && {
      encoding: {
        '@type': 'MediaObject',
        contentUrl: `https://chaipat.cc${publication.downloadUrl}`,
        encodingFormat: 'application/pdf',
      },
    }),
    ...(publication.github && {
      codeRepository: publication.github,
    }),
    about: publication.tags.map(tag => ({
      '@type': 'Thing',
      name: tag,
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageWrapper locale={locale} translations={translations.default}>
        <main className="min-h-screen bg-background">
          <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
              <Breadcrumbs items={breadcrumbItems} />

            {/* Header */}
            <div className="mb-12">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                    {publication.type}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    publication.status === 'Extended' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {publication.status}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar size={14} />
                    {publication.year}
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {publication.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{publication.subtitle}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <BookOpen size={16} className="text-accent" />
                  {publication.journal}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users size={16} className="text-accent" />
                  {publication.authors.join(', ')}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {publication.downloadUrl && (
                  <a
                    href={publication.downloadUrl}
                    download
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download Document
                    {publication.documentLanguage && (
                      <span className="ml-1 px-2 py-0.5 bg-primary-foreground/20 rounded text-xs">
                        {publication.documentLanguage}
                      </span>
                    )}
                  </a>
                )}
                {publication.github && (
                  <a
                    href={publication.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-card border border-border rounded-full text-sm font-medium hover:border-accent/40 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View Repository
                  </a>
                )}
              </div>
            </div>

            {/* Abstract */}
            <section className="mb-12 bg-card border border-border rounded-2xl p-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText size={24} className="text-accent" />
                Abstract
              </h2>
              <p className="text-muted-foreground leading-relaxed">{publication.abstract}</p>
            </section>

            {/* Overview */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{publication.overview}</p>
            </section>

            {/* Motivation */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Motivation</h2>
              <ul className="space-y-3">
                {publication.motivation.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Methodology */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Methodology</h2>
              <div className="space-y-6">
                {Object.entries(publication.methodology).map(([phase, steps]) => (
                  <div key={phase} className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">{phase}</h3>
                    <ul className="space-y-2">
                      {steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="text-muted-foreground text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Features or Findings */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                {publication.keyFeatures ? 'Key Features' : 'Key Findings'}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {(publication.keyFeatures || publication.keyFindings || []).map((item, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5">
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Competency Questions (if available) */}
            {publication.competencyQuestions && (
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Competency Questions
                </h2>
                <div className="space-y-6">
                  {publication.competencyQuestions.map((cq, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-accent mb-4">{cq.scope}</h3>
                      <ul className="space-y-2">
                        {cq.questions.map((q, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="text-accent mt-1">•</span>
                            <span className="text-muted-foreground">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Details */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Database size={24} className="text-accent" />
                Technical Details
              </h2>
              <div className="space-y-6">
                {Object.entries(publication.technicalDetails).map(([category, details]) => (
                  <div key={category} className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
                    <ul className="space-y-2">
                      {details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Impact */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Impact</h2>
              <ul className="space-y-3">
                {publication.impact.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tech Stack */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Technologies Used</h2>
              <div className="space-y-6">
                {Object.entries(publication.techStack).map(([category, technologies]) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-accent mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 text-sm bg-muted text-foreground rounded-full border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Future Work */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Future Work</h2>
              <ul className="space-y-3">
                {publication.futureWork.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tags */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm bg-accent/10 text-accent rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      </PageWrapper>
    </>
  );
}
