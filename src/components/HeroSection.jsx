import { motion } from "framer-motion";
import { ArrowDown, MapPin, GraduationCap, Download, AlertCircle } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";

const PROFILE_IMG = "https://raw.githubusercontent.com/AppleBoiy/mysite/main/img/profile.jpeg";
const PROFILE_IMG_FALLBACK = "https://ui-avatars.com/api/?name=Chaipat+Jainan&size=320&background=random";

export default function HeroSection() {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);
  
  const handleCVDownload = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/cv.pdf', { method: 'HEAD' });
      
      if (response.ok) {
        // CV exists, proceed with download
        window.location.href = '/cv.pdf';
      } else {
        // CV not found
        toast.error('CV is currently unavailable', {
          description: 'Please contact me directly for my resume',
          duration: 4000,
        });
      }
    } catch (error) {
      // Network error or CV not found
      toast.error('CV is currently unavailable', {
        description: 'Please contact me directly for my resume',
        duration: 4000,
      });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-10 bg-accent" />
              <span className="text-sm tracking-[0.2em] uppercase text-accent font-medium">
                {t('hero.subtitle')}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
              Chaipat
              <br />
              <span className="italic text-accent">Jainan</span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap size={16} className="text-accent" />
                <span>{t('hero.university')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-accent" />
                <span>{t('hero.location')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#experience"
                className="px-7 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {t('hero.viewWork')}
              </a>
              <a
                href="/contact"
                className="px-7 py-3 border border-border rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {t('hero.contactMe')}
              </a>
              <button
                onClick={handleCVDownload}
                className="px-7 py-3 border border-accent text-accent rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                {t('hero.downloadCV')}
              </button>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-accent/20 shadow-2xl bg-muted">
                <img
                  src={imgError ? PROFILE_IMG_FALLBACK : PROFILE_IMG}
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                  width="320"
                  height="320"
                  loading="eager"
                  decoding="async"
                  onError={() => setImgError(true)}
                />
                {imgError && (
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5">
                    <AlertCircle size={14} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-accent/30 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}