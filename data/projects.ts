export type ProjectType = 'github' | 'gist' | 'private' | 'huggingface' | 'data' | 'template' | 'library' | 'plugin';

export type ContentBlockType = 'text' | 'code' | 'terminal' | 'image' | 'images' | 'video';

export interface ContentBlock {
  type: ContentBlockType;
  // For text blocks
  content?: string;
  // For code blocks
  code?: string;
  language?: string;
  filename?: string;
  // For terminal blocks
  command?: string;
  output?: string;
  // For image blocks
  src?: string;
  alt?: string;
  caption?: string;
  // For images (gallery)
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  // For video blocks
  videoUrl?: string;
}

export interface Project {
  id: string;
  type: ProjectType;
  tags: string[];
  github?: string;
  demo?: string;
  stars?: number | null;
  forks?: number | null;
  isPrivate?: boolean;
  hasPreview?: boolean;
  url?: string; // For gist, huggingface, data, template, library, plugin
  featured?: boolean; // Show on homepage
  isShowcase?: boolean; // Special flag for showcase/demo projects (not real projects)
  // Detailed page data (optional) - all text fields support i18n via translation keys
  details?: {
    period?: string; // Not translated (e.g., "Jun 2024 — Dec 2024")
    hasDetails?: boolean; // Flag to indicate if detail page should be generated
    // Custom content sections with rich blocks
    sections?: Array<{
      title: string; // Translation key: projects.items.{id}.details.sections[index].title
      blocks: ContentBlock[];
    }>;
  };
}

export const projects: Project[] = [
  {
    id: "portfolio",
    type: "github",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "i18n"],
    github: "https://github.com/AppleBoiy/mysite",
    demo: "https://chaipat.cc",
    stars: null,
    forks: null,
    isPrivate: false,
    hasPreview: true,
    featured: true,
    details: {
      period: 'Dec 2024 — Present',
      hasDetails: true,
    },
  },
  {
    id: "ags",
    type: "private",
    tags: ["Flask", "AWS", "Docker", "GPT-3.5"],
    github: "https://github.com/AGS-CMU/ags",
    demo: "https://ags.cs.science.cmu.ac.th",
    stars: null,
    forks: null,
    isPrivate: true,
    hasPreview: true,
    featured: true,
    details: {
      period: 'Jun 2024 — Dec 2024',
      hasDetails: true,
    },
  },
  {
    id: "ezaAlias",
    type: "gist",
    tags: ["Shell", "CLI", "Productivity"],
    url: "https://gist.github.com/AppleBoiy/04a249b6f64fd0fe1744aff759a0563b",
    stars: 62,
    forks: 6,
    hasPreview: true,
    featured: true,
    details: {
      period: '2023 — Present',
      hasDetails: true,
    },
  },
  {
    id: "ontologyPhsrs",
    type: "data",
    tags: ["OWL", "RDF", "Knowledge Graph"],
    url: "https://github.com/AppleBoiy/ontology-phsrs",
    demo: "/documents/ontology-phsrs.pdf",
    hasPreview: true,
    featured: true,
  },
  {
    id: "typstTemplate",
    type: "template",
    tags: ["Typst", "LaTeX", "Academic"],
    url: "https://github.com/AppleBoiy/typst-academic-presentation",
    stars: 0,
    forks: 0,
    hasPreview: false,
    featured: false,
  },
  {
    id: "demoProject",
    type: "github",
    tags: ["Demo", "Showcase", "Custom Page"],
    github: "https://github.com/example/demo",
    demo: "https://demo.example.com",
    stars: null,
    forks: null,
    hasPreview: true,
    featured: false,
    isShowcase: true, // Special flag for showcase projects
    details: {
      period: '2024 — Present',
      hasDetails: true,
      // This project uses a custom page - see app/[locale]/projects/[projectId]/custom/DemoCustomPage.tsx
    },
  },
];

// Helper to get featured projects
export const getFeaturedProjects = () => projects.filter(p => p.featured);

// Helper to get project by ID
export const getProjectById = (id: string) => projects.find(p => p.id === id);

// Helper to get project URL
export const getProjectUrl = (project: Project) => {
  if (project.github) return project.github;
  if (project.url) return project.url;
  return '';
};
