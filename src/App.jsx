import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';
import { SkeletonSection } from './components/SkeletonLoader';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const ProjectPreview = lazy(() => import('./pages/ProjectPreview'));
const PublicationPreview = lazy(() => import('./pages/PublicationPreview'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <ScrollToTopOnMount />
      <Suspense fallback={<SkeletonSection />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:projectId" element={<ProjectPreview />} />
          <Route path="/publication/:publicationId" element={<PublicationPreview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  )
}

export default App