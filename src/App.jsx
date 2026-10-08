import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';

import HomeSection from './pages/public/HomeSection';
import AboutSection from './pages/public/AboutSection';
import SkillsSection from './pages/public/SkillsSection';
import InternshipsSection from './pages/public/InternshipsSection';
import ProjectsSection from './pages/public/ProjectsSection';
import CertificationsSection from './pages/public/CertificationsSection';
import ContactSection from './pages/public/ContactSection';
import Cursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen';

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
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <div className="premium-bg-container">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
        <div className="orb-shape"></div>
      </div>
      <div className="background-abstract-shape"></div>
      <Cursor />
      <Navbar />
      <main style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <HomeSection />
        <AboutSection />
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
