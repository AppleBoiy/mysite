import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import SEOHead from "../components/SEOHead";
import PageTransition from "../components/PageTransition";
import { useEffect, useState } from "react";

export default function Contact() {
  const [isCVRequest, setIsCVRequest] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isCV = params.get('request') === 'cv';
    setIsCVRequest(isCV);
  }, []);

  return (
    <>
      <SEOHead 
        title="Contact | Chaipat Jainan"
        description="Get in touch with Chaipat Jainan for collaboration opportunities, questions, or just to connect."
      />
      <ScrollProgress />
      <PageTransition>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <ContactSection isCVRequest={isCVRequest} />
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
