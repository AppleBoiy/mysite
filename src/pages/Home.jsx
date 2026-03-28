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
import PullToRefresh from "../components/PullToRefresh";
import { SkeletonExperience, SkeletonProject, SkeletonPublication } from "../components/SkeletonLoader";
import { toast } from "sonner";

// Lazy load below-the-fold sections
const ExperienceSection = lazy(() => import("../components/ExperienceSection"));
const ProjectsSection = lazy(() => import("../components/ProjectsSection"));
const AcademicContributions = lazy(() => import("../components/AcademicContributions"));

// Content-aware skeleton for Experience section
function ExperienceSkeleton() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent/30"></div>
            <div className="h-3 bg-accent/30 rounded w-24"></div>
            <div className="h-px w-10 bg-accent/30"></div>
          </div>
          <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
        </div>
        <div className="space-y-8 stagger-children">
          {[1, 2, 3].map((i) => (
            <SkeletonExperience key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Content-aware skeleton for Projects section
function ProjectsSkeleton() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent/30"></div>
            <div className="h-3 bg-accent/30 rounded w-24"></div>
            <div className="h-px w-10 bg-accent/30"></div>
          </div>
          <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 stagger-children">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonProject key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Content-aware skeleton for Academic section
function AcademicSkeleton() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent/30"></div>
            <div className="h-3 bg-accent/30 rounded w-24"></div>
            <div className="h-px w-10 bg-accent/30"></div>
          </div>
          <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
        </div>
        <div className="space-y-6 stagger-children">
          {[1, 2, 3].map((i) => (
            <SkeletonPublication key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);

  const handleRefresh = async () => {
    // Reload the page content
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  return (
    <>
      <SEOHead />
      <SkipToContent />
      <ScrollProgress />
      <PageTransition>
        <PullToRefresh onRefresh={handleRefresh}>
          <div className="min-h-screen bg-background">
            <AvailabilityBanner onVisibilityChange={setBannerVisible} />
            <Navbar hasBanner={bannerVisible} />
            <main id="main-content">
              <HeroSection />
              <AboutSection />
              <Suspense fallback={<ExperienceSkeleton />}>
                <ExperienceSection />
              </Suspense>
              <Suspense fallback={<AcademicSkeleton />}>
                <AcademicContributions />
              </Suspense>
              <Suspense fallback={<ProjectsSkeleton />}>
                <ProjectsSection />
              </Suspense>
            </main>
            <Footer />
            <ScrollToTop />
            <FloatingAvailabilityBadge isVisible={!bannerVisible} />
          </div>
        </PullToRefresh>
      </PageTransition>
    </>
  );
}
