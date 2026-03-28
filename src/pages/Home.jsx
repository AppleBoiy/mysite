import { lazy, Suspense, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollProgress from "../components/ScrollProgress";
import SkipToContent from "../components/SkipToContent";
import SEOHead from "../components/SEOHead";
import AvailabilityBanner from "../components/AvailabilityBanner";
import FloatingAvailabilityBadge from "../components/FloatingAvailabilityBadge";
import PageTransition from "../components/PageTransition";
import { SkeletonSection } from "../components/SkeletonLoader";

// Lazy load below-the-fold sections
const ExperienceSection = lazy(() => import("../components/ExperienceSection"));
const ProjectsSection = lazy(() => import("../components/ProjectsSection"));
const AcademicContributions = lazy(() => import("../components/AcademicContributions"));

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
            <Suspense fallback={<SkeletonSection />}>
              <ExperienceSection />
            </Suspense>
            <Suspense fallback={<SkeletonSection />}>
              <AcademicContributions />
            </Suspense>
            <Suspense fallback={<SkeletonSection />}>
              <ProjectsSection />
            </Suspense>
          </main>
          <Footer />
          <ScrollToTop />
          <FloatingAvailabilityBadge isVisible={!bannerVisible} />
        </div>
      </PageTransition>
    </>
  );
}
