import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProjectPreview from './pages/ProjectPreview';
import PublicationPreview from './pages/PublicationPreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<ProjectPreview />} />
        <Route path="/publication/:publicationId" element={<PublicationPreview />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App