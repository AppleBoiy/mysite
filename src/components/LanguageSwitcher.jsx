import { useTranslation } from "react-i18next";
import { Languages, Check, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { loadLanguage } from "../i18n";
import { toast } from "sonner";
import { useHaptic } from "@/hooks/useHaptic";

const languages = [
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'th', label: 'TH', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ja', label: 'JA', name: '日本語', flag: '🇯🇵' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { haptic } = useHaptic();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = async (langCode) => {
    if (i18n.language === langCode) {
      setIsOpen(false);
      return;
    }

    haptic.medium();
    setIsLoading(true);
    
    try {
      const loaded = await loadLanguage(langCode);
      
      if (loaded) {
        await i18n.changeLanguage(langCode);
        haptic.success();
        // Language changed successfully - no toast notification
      } else {
        haptic.error();
        toast.error('Failed to load language');
      }
    } catch (error) {
      console.error('Language change error:', error);
      haptic.error();
      toast.error('Failed to change language');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
    );
  }

  const currentLang = getCurrentLanguage();

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onMouseEnter={() => !isOpen && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          onClick={() => {
            haptic.light();
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="w-9 h-9 rounded-full bg-muted hover:bg-accent/20 flex items-center justify-center transition-colors relative group disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Select language"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={18} className="text-foreground animate-spin" />
          ) : (
            <Languages size={18} className="text-foreground" />
          )}
        </button>

        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute top-full mt-2 right-0 z-50 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg border border-border whitespace-nowrap animate-fade-in">
            Language: {currentLang.name}
            <div className="absolute -top-1 right-3 w-2 h-2 bg-popover border-l border-t border-border rotate-45" />
          </div>
        )}
      </div>

      {isOpen && !isLoading && (
        <div className="absolute top-12 right-0 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 min-w-[160px] animate-scale-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted transition-colors ${
                i18n.language === lang.code ? 'bg-accent/10' : ''
              }`}
              disabled={isLoading}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm font-medium text-foreground flex-1 text-left">
                {lang.name}
              </span>
              {i18n.language === lang.code && (
                <Check size={16} className="text-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
