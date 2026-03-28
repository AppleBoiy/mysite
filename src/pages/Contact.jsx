import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollProgress from "../components/ScrollProgress";
import SEOHead from "../components/SEOHead";
import PageTransition from "../components/PageTransition";

export default function Contact() {
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
          <div className="pt-24">
            <ContactSection />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </PageTransition>
    </>
  );
}
