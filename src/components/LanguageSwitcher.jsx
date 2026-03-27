import { useTranslation } from "react-i18next";
import { Languages, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const languages = [
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'th', label: 'TH', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ja', label: 'JA', name: '日本語', flag: '🇯🇵' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
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
        className="w-9 h-9 rounded-full bg-muted hover:bg-accent/20 flex items-center justify-center transition-colors relative group"
        aria-label="Select language"
        title={`Current: ${currentLang.name}`}
      >
        <Languages size={18} className="text-foreground" />
        <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center">
          {currentLang.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted transition-colors ${
                i18n.language === lang.code ? 'bg-accent/10' : ''
              }`}
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
