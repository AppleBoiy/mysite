'use client';

import { useState, useEffect } from "react";
import { Menu, X, Github, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import StatusIndicator from "./StatusIndicator";
import { useTranslation } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/settings";

interface NavbarProps {
  customContent?: React.ReactNode;
  showGithubButton?: boolean;
  locale: Locale;
}

export default function Navbar({ 
  customContent = null, 
  showGithubButton = false,
  locale 
}: NavbarProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  
  // Remove locale prefix from pathname for comparison
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  const isHomePage = pathWithoutLocale === '/';
  const isContactPage = pathWithoutLocale === '/contact';

  const navLinks = [
    { label: t('nav.about'), href: isHomePage ? "#about" : `/${locale}#about` },
    { label: t('nav.experience'), href: isHomePage ? "#experience" : `/${locale}#experience` },
    { label: t('nav.skills'), href: isHomePage ? "#skills" : `/${locale}#skills` },
    { label: t('nav.projects'), href: isHomePage ? "#projects" : `/${locale}#projects` },
    { label: t('nav.academic'), href: isHomePage ? "#publications" : `/${locale}#publications` },
    { label: t('nav.contact'), href: `/${locale}/contact` },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHomePage && href.includes('#')) {
      // Let Next.js Link handle navigation to home with hash
      return;
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = () => {
      const sections = ['about', 'experience', 'skills', 'projects', 'publications', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-serif text-2xl font-bold text-foreground tracking-tight hover:text-accent transition-colors">
          CJ<span className="text-accent">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Show custom content if provided (e.g., search bar on Projects page) */}
          {customContent ? (
            <>
              {customContent}
              <div className="w-px h-6 bg-border mx-2" />
            </>
          ) : (
            <>
              {/* Show nav links only on home page */}
              {isHomePage && navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg ${
                      isActive 
                        ? 'text-accent' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* Show "Back to Home" on other pages */}
              {!isHomePage && (
                <Link
                  href={`/${locale}`}
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 rounded-lg flex items-center gap-2"
                >
                  ← {t('nav.backToHome')}
                </Link>
              )}
              
              {isHomePage && <div className="w-px h-6 bg-border mx-2" />}
            </>
          )}
          <StatusIndicator />
          <LanguageSwitcher />
          <ThemeToggle />
          
          {/* Show GitHub button on projects page, Resume button only on non-home pages */}
          {showGithubButton ? (
            <a
              href="https://github.com/AppleBoiy"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm font-medium px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Github size={16} />
              {t('projects.visitGithub')}
            </a>
          ) : !isContactPage && !isHomePage && (
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm font-medium px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Download size={16} />
              {t('nav.resume')}
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="text-foreground p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
              aria-hidden="true"
            />
            
            {/* Menu */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden relative z-40"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="px-6 py-6 flex flex-col gap-2">
                {/* Show custom content in mobile menu if provided - but hide on small screens */}
                {customContent && (
                  <div className="mb-4 hidden sm:block">
                    {customContent}
                  </div>
                )}
                
                {/* Show nav links only on home page */}
                {isHomePage && navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        handleNavClick(e, link.href);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                
                {/* Show "Back to Home" on other pages */}
                {!isHomePage && (
                  <Link
                    href={`/${locale}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                  >
                    ← {t('nav.backToHome')}
                  </Link>
                )}
                
                {/* Show GitHub button on projects page, Resume button only on non-home pages */}
                {showGithubButton ? (
                  <a
                    href="https://github.com/AppleBoiy"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Github size={16} />
                    {t('projects.visitGithub')}
                  </a>
                ) : !isContactPage && !isHomePage && (
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Download size={16} />
                    {t('nav.resume')}
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
