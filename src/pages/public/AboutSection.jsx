import React from 'react';
import { useData } from '../../contexts/DataContext';
import { GraduationCap, User } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
  const { data } = useData();
  const aboutData = data?.about?.[0] || {};
  
  const educationList = data?.education ? [...data.education].sort((a, b) => a.order - b.order) : [];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-heading">{aboutData.heading || 'ABOUT ME'}</h2>
        
        <div className="about-content-wrapper">
          
          {/* Left Column: About Me */}
          <div className="about-column">
            <div className="about-header-inline">
              <User size={28} className="about-icon" />
              <h3>Who I Am</h3>
            </div>
            <div className="about-summary-box card">
              <p className="about-summary">
                {aboutData.summary || "I am an MCA student passionate about software development and emerging technologies.\n\nI enjoy learning technologies, building practical projects, solving problems, and developing useful software solutions.\n\nPassionate about software development, emerging technologies, problem-solving, continuous learning, and building innovative practical solutions."}
              </p>
            </div>
          </div>
          
          {/* Right Column: Education */}
          <div className="about-column">
             <div className="about-header-inline">
               <GraduationCap size={28} className="about-icon" />
               <h3>Education</h3>
             </div>
             <div className="education-timeline">
               {educationList.slice(0, 2).map((edu, idx) => (
                 <div key={edu.id || idx} className="timeline-item">
                   <div className="timeline-marker"></div>
                   <div className="timeline-content card">
                     <div className="edu-year">{edu.year}</div>
                     <h4 className="edu-course">{edu.course}</h4>
                     <p className="edu-college">{edu.college}</p>
                     <div className="edu-footer">
                       <span className="edu-location">{edu.location}</span>
                       <span className="edu-percentage">{edu.percentage}</span>
                     </div>
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
