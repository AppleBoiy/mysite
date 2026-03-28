import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import AcademicContributions from "../components/AcademicContributions";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollProgress from "../components/ScrollProgress";
import SkipToContent from "../components/SkipToContent";
import SEOHead from "../components/SEOHead";
import AvailabilityBanner from "../components/AvailabilityBanner";
import FloatingAvailabilityBadge from "../components/FloatingAvailabilityBadge";
import PageTransition from "../components/PageTransition";
import { useState } from "react";

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      <SEOHead />
      <SkipToContent />
      <ScrollProgress />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <AvailabilityBanner onVisibilityChange={setBannerVisible} />
          <Navbar hasBanner={bannerVisible} />
          <main id="main-content">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <AcademicContributions />
            <ProjectsSection />
            <SkillsSection />
          </main>
          <Footer />
          <ScrollToTop />
          <FloatingAvailabilityBadge isVisible={!bannerVisible} />
        </div>
      </PageTransition>
    </>
  );
}