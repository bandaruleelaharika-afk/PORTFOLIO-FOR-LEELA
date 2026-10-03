import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Home as HomeIcon, 
  User, 
  BookOpen, 
  Code, 
  Briefcase, 
  Award, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

import AdminHomeTab from './tabs/AdminHomeTab';
import AdminAboutTab from './tabs/AdminAboutTab';
import AdminSkillsTab from './tabs/AdminSkillsTab';
import AdminInternshipsTab from './tabs/AdminInternshipsTab';
import AdminProjectsTab from './tabs/AdminProjectsTab';
import AdminCertificationsTab from './tabs/AdminCertificationsTab';
import AdminMessagesTab from './tabs/AdminMessagesTab';
import AdminSettingsTab from './tabs/AdminSettingsTab';

import './Dashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'home', label: 'Home Content', icon: <HomeIcon size={20} /> },
    { id: 'about', label: 'About & Education', icon: <User size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={20} /> },
    { id: 'internships', label: 'Internships', icon: <Briefcase size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={20} /> },
    { id: 'certifications', label: 'Certifications', icon: <Award size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="admin-welcome"><h2>Welcome, Leela Harika</h2><p>Select a tab from the sidebar to manage your portfolio content.</p></div>;
      case 'home':
        return <AdminHomeTab />;
      case 'about':
        return <AdminAboutTab />;
      case 'skills':
        return <AdminSkillsTab />;
      case 'internships':
        return <AdminInternshipsTab />;
      case 'projects':
        return <AdminProjectsTab />;
      case 'certifications':
        return <AdminCertificationsTab />;
      case 'messages':
        return <AdminMessagesTab />;
      case 'settings':
        return <AdminSettingsTab />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="admin-layout">
      {/* Mobile Sidebar Toggle */}
      <div className="admin-mobile-header">
        <div className="admin-logo">LH Admin</div>
        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header desktop-only">
          <h2>LH Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <a href="/" target="_blank" rel="noopener noreferrer" className="sidebar-nav-item">
            <ExternalLinkIcon size={20} />
            <span>View Site</span>
          </a>
          <button className="sidebar-nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <div className="admin-content-wrapper">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

// Simple icon for view site since lucide external link was used above
const ExternalLinkIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export default AdminDashboard;
