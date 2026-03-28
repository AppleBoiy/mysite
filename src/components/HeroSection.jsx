import { motion } from "framer-motion";
import { ArrowDown, MapPin, GraduationCap, Download, AlertCircle } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useHaptic } from "@/hooks/useHaptic";

// Use WebP with JPEG fallback for better performance
const PROFILE_IMG_WEBP = "/profile.webp";
const PROFILE_IMG = "/profile.jpeg";
const PROFILE_IMG_GITHUB = "https://raw.githubusercontent.com/AppleBoiy/mysite/main/img/profile.jpeg";
const PROFILE_IMG_FALLBACK = "https://ui-avatars.com/api/?name=Chaipat+Jainan&size=320&background=D4A574&color=1a1a2e&bold=true";

export default function HeroSection() {
  const { t } = useTranslation();
  const { haptic } = useHaptic();
  const [imgSrc, setImgSrc] = useState(PROFILE_IMG_WEBP);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Preload image with retry logic
  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    
    img.onload = () => {
      setImgLoaded(true);
    };
    
    img.onerror = () => {
      // Try fallbacks in order: WebP → JPEG → GitHub → UI Avatars
      if (retryCount === 0) {
        setImgSrc(PROFILE_IMG);
        setRetryCount(1);
      } else if (retryCount === 1) {
        setImgSrc(PROFILE_IMG_GITHUB);
        setRetryCount(2);
      } else if (retryCount === 2) {
        setImgSrc(PROFILE_IMG_FALLBACK);
        setRetryCount(3);
        setImgLoaded(true);
      }
    };
    
    // Timeout fallback for slow networks (5 seconds)
    const timeout = setTimeout(() => {
      if (!imgLoaded && retryCount < 3) {
        if (retryCount === 0) {
          setImgSrc(PROFILE_IMG);
          setRetryCount(1);
        } else if (retryCount === 1) {
          setImgSrc(PROFILE_IMG_GITHUB);
          setRetryCount(2);
        } else {
          setImgSrc(PROFILE_IMG_FALLBACK);
          setRetryCount(3);
          setImgLoaded(true);
        }
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [imgSrc, retryCount, imgLoaded]);
  
  const handleCVDownload = async (e) => {
    e.preventDefault();
    haptic.medium();
    
    try {
      const response = await fetch('/cv.pdf', { method: 'HEAD' });
      
      if (response.ok) {
        haptic.success();
        window.location.href = '/cv.pdf';
      } else {
        haptic.error();
        toast.error('CV is currently unavailable', {
          description: 'Please contact me directly for my resume',
          duration: 4000,
        });
      }
    } catch (error) {
      haptic.error();
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
                onClick={() => haptic.light()}
                className="px-7 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {t('hero.viewWork')}
              </a>
              <a
                href="/contact"
                onClick={() => haptic.light()}
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
                {!imgLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                  </div>
                )}
                <img
                  src={imgSrc}
                  alt="Profile photo"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  width="320"
                  height="320"
                  loading="eager"
                  decoding="async"
                  onError={() => {
                    if (retryCount === 0) {
                      setImgSrc(PROFILE_IMG);
                      setRetryCount(1);
                    } else if (retryCount === 1) {
                      setImgSrc(PROFILE_IMG_GITHUB);
                      setRetryCount(2);
                    } else if (retryCount === 2) {
                      setImgSrc(PROFILE_IMG_FALLBACK);
                      setRetryCount(3);
                      setImgLoaded(true);
                    }
                  }}
                  onLoad={() => setImgLoaded(true)}
                />
                {retryCount === 3 && imgLoaded && (
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5" title="Using fallback image">
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