import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  MapPin, Calendar, CheckCircle2, 
  ExternalLink, X, Briefcase, Sparkles, ShieldCheck,
  ArrowUpRight, Award, Building2 
} from 'lucide-react';
import './InternshipsSection.css';

import bistDefaultImg from '../../assets/internship_bist.jpg';
import blackbuckDefaultImg from '../../assets/internship_blackbuck.jpg';

const internshipDetailsMap = {
  'BIST Technologies Pvt. Ltd.': {
    defaultImg: bistDefaultImg,
    badge: 'AI & ML Internship',
    period: 'June 2023 – August 2023',
    overview: 'Completed an intensive professional internship in Artificial Intelligence and Machine Learning, focusing on predictive modeling, neural networks, and automated data processing pipelines.',
    responsibilities: [
      'Engineered machine learning pipelines for data ingestion, cleaning, normalization, and feature extraction using Python and Pandas.',
      'Designed and evaluated artificial neural networks (ANN) and decision trees with Scikit-learn and TensorFlow.',
      'Conducted statistical exploratory data analysis (EDA) and generated insightful visual telemetry charts.',
      'Collaborated with senior AI engineers to test model accuracy, optimize hyperparameters, and decrease training loss.'
    ],
    technologies: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Data Analysis'],
    verifiedStatus: 'Verified Internship Completion'
  },
  'Blackbuck Engineers Pvt. Ltd.': {
    defaultImg: blackbuckDefaultImg,
    badge: 'MERN Full Stack Internship',
    period: 'January 2025 – March 2025',
    overview: 'Engaged in comprehensive full-stack enterprise web development using the MERN technology stack (MongoDB, Express, React, Node.js), delivering responsive web apps and scalable backend REST services.',
    responsibilities: [
      'Architected modular, reusable React frontend components with dynamic state management and responsive styling.',
      'Developed robust backend RESTful APIs with Node.js and Express, incorporating JWT authentication and middleware validation.',
      'Created and optimized NoSQL MongoDB document schemas, indexing strategies, and CRUD operations with Mongoose.',
      'Participated in daily agile scrums, code reviews, and version-controlled Git workflows.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'JavaScript ES6+', 'Git', 'Responsive Design'],
    verifiedStatus: 'Verified Internship Completion'
  }
};

const InternshipsSection = () => {
  const { data } = useData();
  const [selectedInternship, setSelectedInternship] = useState(null);

  const internships = data?.internships ? [...data.internships].sort((a, b) => a.order - b.order) : [];

  const handleOpenInternship = (internship) => {
    const enriched = internshipDetailsMap[internship.company] || {
      defaultImg: bistDefaultImg,
      badge: 'Professional Internship',
      period: internship.year || 'Completed',
      overview: internship.description || 'Hands-on practical industry internship experience.',
      responsibilities: [
        'Applied modern software development best practices in a professional corporate environment.',
        'Collaborated with engineering peers on production-grade deliverables.',
        'Expanded technical skills in system architecture and problem solving.'
      ],
      technologies: ['Software Engineering', 'Problem Solving', 'Team Collaboration'],
      verifiedStatus: 'Verified Completion'
    };

    setSelectedInternship({
      ...internship,
      ...enriched,
      imageUrl: internship.imageUrl || enriched.defaultImg
    });
  };

  const handleCloseInternship = () => {
    setSelectedInternship(null);
  };

  return (
    <section id="internships" className="section internships-section">
      <div className="container">
        <span className="section-subheading">INDUSTRY RESIDENCY</span>
        <h2 className="section-heading">MY INTERNSHIPS</h2>
        <p className="internships-intro-sub">
          Hands-on professional engineering residencies where classroom theory transformed into production code, enterprise web applications, and machine learning pipelines.
        </p>

        {/* Executive Showcase Grid (Modern Model - Replaces Old Stacked Cards) */}
        <div className="internships-showcase-grid">
          {internships.map((internship, idx) => {
            const enriched = internshipDetailsMap[internship.company] || {};
            const displayImg = internship.imageUrl || enriched.defaultImg || bistDefaultImg;

            return (
              <div 
                key={internship.id || idx} 
                className="internship-showcase-card card"
                onClick={() => handleOpenInternship(internship)}
                role="button"
                tabIndex={0}
                title={`Click to view full details for ${internship.company}`}
                onKeyDown={(e) => { if (e.key === 'Enter') handleOpenInternship(internship); }}
              >
                {/* Visual Banner */}
                <div className="internship-visual-banner">
                  <img 
                    src={displayImg} 
                    alt={internship.company} 
                    className="internship-banner-img" 
                  />
                  <div className="internship-banner-gradient"></div>

                  <div className="internship-top-badges">
                    <span className="internship-domain-pill">
                      <Briefcase size={13} /> {enriched.badge || 'Engineering'}
                    </span>
                    <span className="internship-verified-badge">
                      <ShieldCheck size={13} /> Verified
                    </span>
                  </div>

                  <span className="internship-duration-pill">
                    <Calendar size={13} /> {enriched.period || internship.year}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="internship-card-body">
                  <div className="internship-location-tag">
                    <MapPin size={14} className="pin-icon" />
                    <span>{internship.location}</span>
                  </div>

                  <h3 className="internship-company-name">
                    <Building2 size={18} className="company-icon" /> {internship.company}
                  </h3>
                  
                  <h4 className="internship-role-title">
                    {internship.role}
                  </h4>

                  <p className="internship-overview-snippet">
                    {enriched.overview || internship.description}
                  </p>

                  {/* Responsibilities Preview */}
                  {enriched.responsibilities?.length > 0 && (
                    <div className="internship-contributions-preview">
                      <span className="contributions-title">Key Contributions:</span>
                      <ul className="contributions-list">
                        {enriched.responsibilities.slice(0, 2).map((item, i) => (
                          <li key={i}>
                            <CheckCircle2 size={14} className="bullet-check" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Chips */}
                  <div className="internship-tech-row">
                    {enriched.technologies?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="tech-badge-chip">{tech}</span>
                    ))}
                    {enriched.technologies?.length > 4 && (
                      <span className="tech-badge-chip more">
                        +{enriched.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Link Row */}
                  <div className="internship-card-action">
                    <span className="action-text">
                      View Full Breakdown & Documentation <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====================================================
          Comprehensive Internship Deep-Dive Modal
          ==================================================== */}
      {selectedInternship && (
        <div className="internship-modal-backdrop" onClick={handleCloseInternship}>
          <div className="internship-modal-card card" onClick={(e) => e.stopPropagation()}>
            <div className="internship-modal-hero">
              <img 
                src={selectedInternship.imageUrl} 
                alt={selectedInternship.company} 
                className="modal-hero-img" 
              />
              <div className="modal-hero-gradient"></div>
              
              <button 
                className="internship-modal-close" 
                onClick={handleCloseInternship}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              <div className="modal-hero-chips">
                <span className="modal-period-chip">
                  <Calendar size={14} /> {selectedInternship.period}
                </span>
                <span className="modal-verified-chip">
                  <ShieldCheck size={14} /> {selectedInternship.verifiedStatus}
                </span>
              </div>
            </div>

            <div className="internship-modal-body">
              <div className="modal-company-header">
                <span className="modal-loc-badge">
                  <MapPin size={14} /> {selectedInternship.location}
                </span>
                <h3 className="modal-company-title">{selectedInternship.company}</h3>
                <span className="modal-role-pill">
                  <Briefcase size={15} /> {selectedInternship.role}
                </span>
              </div>

              {/* Overview */}
              <div className="internship-modal-section">
                <h4 className="modal-sec-title">
                  <Sparkles size={16} className="modal-sec-icon" /> Program Overview
                </h4>
                <p className="modal-overview-text">{selectedInternship.overview}</p>
              </div>

              {/* Responsibilities */}
              <div className="internship-modal-section">
                <h4 className="modal-sec-title">
                  <CheckCircle2 size={16} className="modal-sec-icon" /> Core Engineering Responsibilities
                </h4>
                <ul className="modal-resp-list">
                  {selectedInternship.responsibilities?.map((item, idx) => (
                    <li key={idx} className="modal-resp-item">
                      <span className="modal-bullet-dot"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="internship-modal-section">
                <h4 className="modal-sec-title">
                  <Award size={16} className="modal-sec-icon" /> Technologies & Frameworks Utilized
                </h4>
                <div className="modal-tech-chips">
                  {selectedInternship.technologies?.map((tech, idx) => (
                    <span key={idx} className="modal-tech-chip">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="modal-action-row">
                <button className="btn btn-primary" onClick={handleCloseInternship}>
                  Close Breakdown
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InternshipsSection;