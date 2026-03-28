import { Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/AppleBoiy", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/chaipat-jainan", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@chaipat.cc", label: "Email", email: "contact@chaipat.cc" },
  ];

  const handleEmailClick = async (e, email) => {
    if (!email) return;
    
    // Try to copy email to clipboard as fallback
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!", {
        description: email,
      });
    } catch (err) {
      // Clipboard failed, let mailto work
      console.log("Clipboard not available, using mailto");
    }
  };

  return (
    <footer className="py-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
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
          <p className="text-sm text-muted-foreground text-center sm:text-right">
            © {new Date().getFullYear()} — Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
