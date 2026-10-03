import React from 'react';
import { useData } from '../../contexts/DataContext';
import './HomeSection.css';
import localProfileImg from '../../assets/profile.jpg';
import localResumePdf from '../../assets/resume.pdf';

const HomeSection = () => {
  const { data } = useData();
  const homeData = data?.home?.[0] || {};
  const settings = data?.settings?.[0] || {};

  const handleHireMe = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetResume = () => {
    const resumeToOpen = settings.resumeUrl || localResumePdf;
    if (resumeToOpen) {
      window.open(resumeToOpen, '_blank');
    } else {
      alert("Resume will be available soon!");
    }
  };

  // If a profile image is set via admin, use it, else use the locally provided image
  const profileImageSrc = settings.profileImageUrl || localProfileImg;

  return (
    <section id="home" className="home-section">
      <div className="container home-container">
        
        <div className="home-content">
          <span className="home-greeting">HELLO, I'M</span>
          <h1 className="home-title">
            {(homeData.title || "Bandaru\nLeela Harika").split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>
          
          <div className="home-label">
            {homeData.label || "SOFTWARE DEVELOPMENT • AI • WEB TECHNOLOGIES"}
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

        <div className="home-image-wrapper">
          <div className="geometric-frame">
            <div className="frame-border"></div>
            {profileImageSrc ? (
              <img src={profileImageSrc} alt="Leela Harika Bandaru" className="profile-image" />
            ) : (
              <div className="profile-image-placeholder">
                <span>Profile Image</span>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HomeSection;
