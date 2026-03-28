import { useTranslation } from "react-i18next";
import { Languages, Check, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { loadLanguage } from "../i18n";
import { toast } from "sonner";

const languages = [
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'th', label: 'TH', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ja', label: 'JA', name: '日本語', flag: '🇯🇵' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    
    try {
      const loaded = await loadLanguage(langCode);
      
      if (loaded) {
        await i18n.changeLanguage(langCode);
        
        const lang = languages.find(l => l.code === langCode);
        toast.success(`Language changed to ${lang?.name || langCode}`, {
          duration: 2000,
        });
      } else {
        toast.error('Failed to load language');
      }
    } catch (error) {
      console.error('Language change error:', error);
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full bg-muted hover:bg-accent/20 flex items-center justify-center transition-colors relative group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Select language"
        title={`Current: ${currentLang.name}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 size={18} className="text-foreground animate-spin" />
        ) : (
          <>
            <Languages size={18} className="text-foreground" />
            <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {currentLang.label}
            </span>
          </>
        )}
      </button>

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
