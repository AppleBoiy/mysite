import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProjectPreview from './pages/ProjectPreview';
import PublicationPreview from './pages/PublicationPreview';
import NotFound from './pages/NotFound';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';

function App() {
  return (
    <Router>
      <ScrollToTopOnMount />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<ProjectPreview />} />
        <Route path="/publication/:publicationId" element={<PublicationPreview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App