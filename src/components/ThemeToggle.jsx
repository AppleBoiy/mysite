import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
    );
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-9 h-9 rounded-full bg-muted hover:bg-accent/20 flex items-center justify-center transition-colors"
        aria-label={t('theme.toggle')}
      >
        {theme === "dark" ? (
          <Sun size={18} className="text-foreground" />
        ) : (
          <Moon size={18} className="text-foreground" />
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full mt-2 right-0 z-50 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg border border-border whitespace-nowrap animate-fade-in">
          {theme === "dark" ? t('theme.switchToLight') : t('theme.switchToDark')}
          <div className="absolute -top-1 right-3 w-2 h-2 bg-popover border-l border-t border-border rotate-45" />
        </div>
      )}
    </div>
  );
}
