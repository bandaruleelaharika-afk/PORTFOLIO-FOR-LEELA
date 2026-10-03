import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import HomeSection from './pages/public/HomeSection';
import AboutSection from './pages/public/AboutSection';
import SkillsSection from './pages/public/SkillsSection';
import InternshipsSection from './pages/public/InternshipsSection';
import ProjectsSection from './pages/public/ProjectsSection';
import CertificationsSection from './pages/public/CertificationsSection';
import ContactSection from './pages/public/ContactSection';
import Cursor from './components/Cursor';

// Admin
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';

import './index.css';

const PublicPortfolio = () => {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <InternshipsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
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
