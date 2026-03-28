import { Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/AppleBoiy", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/chaipat-jainan", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@chaipat.cc", label: "Email", email: "contact@chaipat.cc" },
  ];

  const navLinks = [
    { label: t('nav.about'), href: isHomePage ? "#about" : "/#about" },
    { label: t('nav.experience'), href: isHomePage ? "#experience" : "/#experience" },
    { label: t('nav.projects'), href: isHomePage ? "#projects" : "/#projects" },
    { label: t('nav.resume'), href: "/cv.pdf", external: true },
  ];

  const handleEmailClick = async (e, email) => {
    if (!email) return;
    
    // Try to copy email to clipboard as fallback
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!", {
        description: email,
        duration: 2000,
      });
    } catch (err) {
      console.log("Clipboard not available, using mailto");
    }
  };

  return (
    <footer className="py-10 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          {/* Top row - Name, Social, Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left - Name and Social */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <p className="font-serif text-lg font-semibold text-foreground">
                Chaipat Jainan<span className="text-accent">.</span>
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  const isEmail = link.label === "Email";
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={isEmail ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      onClick={isEmail ? (e) => handleEmailClick(e, link.email) : undefined}
                      className="w-9 h-9 rounded-lg bg-muted hover:bg-accent/10 hover:text-accent transition-all duration-300 flex items-center justify-center"
                      aria-label={link.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right - Secondary Navigation */}
            <nav className="flex flex-wrap items-center justify-center gap-4 text-sm" aria-label="Footer navigation">
              {navLinks.map((link, idx) => (
                <span key={link.label} className="flex items-center gap-4">
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                  {idx < navLinks.length - 1 && (
                    <span className="text-border">|</span>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Bottom row - Copyright and Source */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Chaipat Jainan. {t('footer.rights')}
            </p>
            <a
              href="https://github.com/AppleBoiy/mysite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <Github size={14} />
              View Source Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
