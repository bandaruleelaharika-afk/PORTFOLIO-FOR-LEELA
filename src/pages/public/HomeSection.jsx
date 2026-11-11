import React from 'react';
import { useData } from '../../contexts/DataContext';
import './HomeSection.css';
import localProfileImg from '../../assets/profile.jpg';
import localResumePdf from '../../assets/resume.pdf';
import { Code, Cpu, Award } from 'lucide-react';

const HomeSection = () => {
  const { data } = useData();
  const homeData = data?.home?.[0] || {};
  const settings = data?.settings?.[0] || {};

  const handleHireMe = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetResume = () => {
    const resumeToOpen = settings.resumeUrl || localResumePdf;
    if (resumeToOpen) {
      window.open(resumeToOpen, '_blank');
    } else {
      alert("Resume will be available soon!");
    }
  };

  const profileImageSrc = settings.profileImageUrl || localProfileImg;

  return (
    <section id="home" className="home-section">
      <div className="container home-container">
        {/* Left Column: Hero Content Matching Exactly The User's Reference */}
        <div className="home-content">
          <div className="home-badge-pill">
            <span className="badge-pulse-dot"></span>
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <span className="home-greeting">HELLO, I'M</span>
          <h1 className="home-title">
            <span className="home-name-line name-primary">BANDARU</span>
            <span className="home-name-line name-accent">LEELA HARIKA</span>
          </h1>
          
          <div className="home-label-row">
            <span className="home-label-bar">|</span>
            <span className="home-label-text">
              {homeData.label || "SOFTWARE DEVELOPMENT • AI • WEB TECHNOLOGIES"}
            </span>
          </div>

          <p className="home-description">
            {homeData.description || "Passionate about software development, emerging technologies, problem-solving, continuous learning, and building innovative practical solutions."}
          </p>

          <div className="home-buttons">
            <button className="btn btn-primary" onClick={handleHireMe}>
              {homeData.hireMeText || "Hire Me"}
            </button>
            <button className="btn btn-outline" onClick={handleGetResume}>
              {homeData.getResumeText || "Get Resume"}
            </button>
          </div>
        </div>

        {/* Right Column: Clean Circular Profile with Concentric Ring, Target Dot & 3 Floating Badges */}
        <div className="home-image-wrapper">
          <div className="profile-showcase-container">
            {/* Concentric Outer Ring with Left Orbit Indicator Dot */}
            <div className="profile-outer-ring" aria-hidden="true">
              <div className="orbit-target-dot">
                <span className="orbit-inner-dot"></span>
              </div>
            </div>

            {/* Perfect Circular Portrait Frame */}
            <div className="profile-circular-frame">
              <img 
                src={profileImageSrc} 
                alt="Bandaru Leela Harika" 
                className="profile-portrait-img" 
              />
            </div>

            {/* Floating Badge 1: Top-Left (Full Stack Web) */}
            <div className="floating-badge badge-top-left">
              <div className="badge-icon-box box-teal">
                <Code size={14} strokeWidth={2.2} />
              </div>
              <div className="badge-text-box">
                <span className="badge-title">Full Stack Web</span>
                <span className="badge-sub">MERN Stack</span>
              </div>
            </div>

            {/* Floating Badge 2: Bottom-Left (MCA Post-Graduate) */}
            <div className="floating-badge badge-bottom-left">
              <div className="badge-icon-box box-purple">
                <Award size={14} strokeWidth={2.2} />
              </div>
              <div className="badge-text-box">
                <span className="badge-title">MCA Post-Graduate</span>
                <span className="badge-sub">Aditya University</span>
              </div>
            </div>

            {/* Floating Badge 3: Bottom-Right (AI & ML Enthusiast) */}
            <div className="floating-badge badge-bottom-right">
              <div className="badge-icon-box box-cyan">
                <Cpu size={14} strokeWidth={2.2} />
              </div>
              <div className="badge-text-box">
                <span className="badge-title">AI & ML Enthusiast</span>
                <span className="badge-sub">Python & Deep Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
