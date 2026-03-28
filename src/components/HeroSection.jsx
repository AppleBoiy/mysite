import { motion } from "framer-motion";
import { ArrowDown, MapPin, GraduationCap, Download, AlertCircle } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import OptimizedImage from "./OptimizedImage";
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

            {/* Impact Metrics */}
            <div className="flex gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-accent">250+</div>
                <div className="text-sm text-muted-foreground">{t('hero.metrics.studentsMentored')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">3+</div>
                <div className="text-sm text-muted-foreground">{t('hero.metrics.yearsTA')}</div>
              </div>
            </div>

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

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {/* Primary CTA - Most important action */}
              <a
                href="/contact"
                onClick={() => haptic.light()}
                className="px-8 py-4 bg-accent text-accent-foreground rounded-full text-base font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 select-none"
              >
                {t('hero.contactMe')} →
              </a>
              
              {/* Secondary CTAs - Less prominent */}
              <a
                href="#experience"
                onClick={() => haptic.light()}
                className="px-6 py-3 border border-border rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors select-none"
              >
                {t('hero.viewWork')}
              </a>
              <a
                href="/contact?request=cv"
                onClick={(e) => {
                  e.preventDefault();
                  haptic.medium();
                  window.location.href = '/contact?request=cv';
                }}
                className="px-6 py-3 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium text-accent hover:bg-accent/20 hover:border-accent/50 transition-all flex items-center gap-2 justify-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <Download size={16} />
                {t('hero.requestCV')}
              </a>
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
                <OptimizedImage
                  src={PROFILE_IMG_WEBP}
                  alt="Profile photo"
                  fallbackSrc={PROFILE_IMG}
                  width={320}
                  height={320}
                  priority={true}
                  className="w-full h-full object-cover"
                />
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