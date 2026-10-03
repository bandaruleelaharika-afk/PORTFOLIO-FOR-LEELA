import React from 'react';
import { useData } from '../../contexts/DataContext';
import './AboutSection.css';

const AboutSection = () => {
  const { data } = useData();
  const aboutData = data?.about?.[0] || {};
  
  // Only get MCA and Degree based on prompt requirements for public site, 
  // but if it's dynamic we should ideally filter by order or a flag,
  // For safety we sort and take top 2, assuming admin creates them properly.
  const educationList = data?.education ? [...data.education].sort((a, b) => a.order - b.order) : [];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-heading">{aboutData.heading || 'ABOUT ME'}</h2>
        
        <div className="about-content-wrapper">
          <div className="about-summary-box card">
            <p className="about-summary" style={{ whiteSpace: 'pre-line' }}>
              {aboutData.summary || "I am an MCA student passionate about software development and emerging technologies.\n\nI enjoy learning technologies, building practical projects, solving problems, and developing useful software solutions.\n\nPassionate about software development, emerging technologies, problem-solving, continuous learning, and building innovative practical solutions."}
            </p>
          </div>
          
          <div className="education-container">
            <h3 className="sub-heading">Education</h3>
            <div className="education-grid">
              {educationList.slice(0, 2).map((edu, idx) => (
                <div key={edu.id || idx} className="education-card card">
                  <div className="edu-year">{edu.year}</div>
                  <h4 className="edu-course">{edu.course}</h4>
                  <p className="edu-college">{edu.college}</p>
                  <div className="edu-footer">
                    <span className="edu-location">{edu.location}</span>
                    <span className="edu-percentage">{edu.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
