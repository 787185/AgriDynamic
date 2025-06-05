import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectArticle from './pages/ProjectArticle';
import LoginModal from './components/LoginModal';
import AdminLayout from './components/admin/AdminLayout';
import Volunteers from './pages/admin/Volunteers';
import Enquiries from './pages/admin/Enquiries';
import AdminProjects from './pages/admin/Projects';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar onLoginClick={() => setShowLoginModal(true)} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project/:id" element={<ProjectArticle />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Volunteers />} />
                <Route path="volunteers" element={<Volunteers />} />
                <Route path="enquiries" element={<Enquiries />} />
                <Route path="projects" element={<AdminProjects />} />
              </Route>
            </Routes>
          </main>
          <Footer />
          {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;