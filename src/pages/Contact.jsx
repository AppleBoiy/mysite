import { motion } from "framer-motion";
import { Clock, MapPin, FileText, ArrowDown } from "lucide-react";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollProgress from "../components/ScrollProgress";
import SEOHead from "../components/SEOHead";
import PageTransition from "../components/PageTransition";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useHaptic } from "@/hooks/useHaptic";

export default function Contact() {
  const { t } = useTranslation();
  const { haptic } = useHaptic();
  const [isCVRequest, setIsCVRequest] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isCV = params.get('request') === 'cv';
    setIsCVRequest(isCV);
    
    // Auto-scroll to form after page loads if CV request
    if (isCV) {
      // Wait for page to fully render, then scroll
      const timer = setTimeout(() => {
        const formSection = document.getElementById('contact');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800); // Wait 800ms for animations to settle
      
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToForm = () => {
    haptic.light();
    const formSection = document.getElementById('contact');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEOHead 
        title="Contact | Chaipat Jainan"
        description="Get in touch with Chaipat Jainan for collaboration opportunities, questions, or just to connect."
      />
      <ScrollProgress />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navbar />
          
          {/* Hero Section */}
          <div className="pt-32 pb-12">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  {isCVRequest ? t('contactPage.cvRequest.title') : t('contactPage.hero.title')}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {isCVRequest ? t('contactPage.cvRequest.description') : t('contactPage.hero.description')}
                </p>
                
                {isCVRequest && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 mb-8"
                  >
                    <FileText size={20} />
                    {t('contactPage.cvRequest.button')}
                    <ArrowDown size={16} />
                  </motion.button>
                )}
                
                {/* Info Cards */}
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Clock size={20} className="text-accent" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {t('contactPage.responseTime.title')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t('contactPage.responseTime.value')}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {t('contactPage.location.title')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t('contactPage.location.value')}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <ContactSection isCVRequest={isCVRequest} />
          <Footer />
          <ScrollToTop />
        </div>
      </PageTransition>
    </>
  );
}
