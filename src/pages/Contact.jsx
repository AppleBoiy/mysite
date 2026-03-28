import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollProgress from "../components/ScrollProgress";
import SEOHead from "../components/SEOHead";
import PageTransition from "../components/PageTransition";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

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
                  {t('contactPage.hero.title')}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t('contactPage.hero.description')}
                </p>
                
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
          
          <ContactSection />
          <Footer />
          <ScrollToTop />
        </div>
      </PageTransition>
    </>
  );
}
