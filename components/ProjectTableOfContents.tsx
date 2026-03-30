'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TOCSection {
  id: string;
  title: string;
  level: number;
}

interface ProjectTableOfContentsProps {
  sections: TOCSection[];
}

export default function ProjectTableOfContents({ sections }: ProjectTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show TOC after a short delay to avoid layout shift
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0,
      }
    );

    // Observe all section headings
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible || sections.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 w-64">
        <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-accent rounded-full" />
            On This Page
          </h3>
          <nav className="space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 flex items-start gap-2 group ${
                    isActive
                      ? 'bg-accent/10 text-accent font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  } ${section.level === 2 ? 'pl-6' : ''}`}
                >
                  <ChevronRight
                    size={14}
                    className={`mt-0.5 shrink-0 transition-transform ${
                      isActive ? 'rotate-90' : 'group-hover:translate-x-0.5'
                    }`}
                  />
                  <span className="line-clamp-2">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="mt-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Reading Progress</span>
            <span>{Math.round((sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100)}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300 rounded-full"
              style={{
                width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
