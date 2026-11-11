import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';

import HomeSection from './pages/public/HomeSection';
import AboutSection from './pages/public/AboutSection';
import EducationSection from './pages/public/EducationSection';
import SkillsSection from './pages/public/SkillsSection';
import InternshipsSection from './pages/public/InternshipsSection';
import ProjectsSection from './pages/public/ProjectsSection';
import CertificationsSection from './pages/public/CertificationsSection';
import ContactSection from './pages/public/ContactSection';
import Cursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen';
import Cyber3DBackground from './components/Cyber3DBackground';

// Admin
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';

import './index.css';

const PublicPortfolio = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Smooth Scroll Reveal Observer
    if (!loading) {
      const observerCallback = (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            obs.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      });

      const targets = document.querySelectorAll('.card, .section-heading, .section-subheading');
      targets.forEach((el) => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      
      {/* 3D Moving Interactive Theme Background (Geometric Polyhedrons & Perspective Constellation) */}
      <Cyber3DBackground />
      <div className="portfolio-steady-bg" aria-hidden="true">
        <div className="steady-bg-radial top-glow"></div>
        <div className="steady-bg-radial bottom-glow"></div>
      </div>

      <Cursor />
      <Navbar />
      <main style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <HomeSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <InternshipsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </div>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="app-container">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Public Portfolio Route */}
              <Route path="/" element={<PublicPortfolio />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
