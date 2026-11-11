import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  ExternalLink, X, Cpu, ShieldCheck, 
  Layers, CheckCircle2, AlertTriangle, ArrowUpRight, Sparkles 
} from 'lucide-react';
import './ProjectsSection.css';

import gasDetectorDefaultImg from '../../assets/project_gas_detector.jpg';
import crimeDetectionDefaultImg from '../../assets/project_crime_detection.jpg';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const projectDetailsMap = {
  'Gas and Smoke Detector': {
    defaultImg: gasDetectorDefaultImg,
    category: 'IoT & Embedded Hardware Systems',
    status: 'Completed Academic Prototype',
    overview: 'A smart hardware safety system that constantly analyzes atmospheric gas concentrations, identifying hazardous LPG, smoke, and combustible fumes to avert fire accidents and toxic exposures.',
    problemStatement: 'Gas leaks and smoke buildup in residential and industrial environments often go unnoticed until fire or suffocation occurs. Standard alarms lack precise telemetry and early sensitivity calibration.',
    architecture: 'Interfaced an analog MQ-2 semiconductor gas sensor with an Arduino microcontroller. Real-time PPM readings are displayed on an OLED display, and if readings cross safe limits, an acoustic buzzer and emergency LEDs activate immediately.',
    keyFeatures: [
      'Continuous real-time PPM gas concentration sensing',
      'Instantaneous acoustic and visual alarm dispatch on hazard detection',
      'Calibrated for LPG, Smoke, Propane, Methane, and Alcohol vapors',
      'Low power consumption with modular hardware expansion capabilities'
    ],
    technologies: ['Arduino', 'MQ-2 Gas Sensor', 'C / C++', 'Embedded Systems', 'IoT Circuitry', 'OLED Telemetry', 'Buzzer Alarm']
  },
  'Crime Detection Using Multi-Layer Perceptron in Social Media Platforms': {
    defaultImg: crimeDetectionDefaultImg,
    category: 'AI & Deep Learning / NLP',
    status: 'Research Project',
    overview: 'An intelligent cybersecurity framework that monitors social media textual streams, tokenizes content, and deploys a Multi-Layer Perceptron (MLP) deep neural network to detect criminal intent, cyber threats, and dangerous anomalies.',
    problemStatement: 'The sheer volume of social media interactions makes manual monitoring of criminal recruitment, hate speech, and illicit threats infeasible, necessitating automated, high-precision deep learning filters.',
    architecture: 'Implemented a pipeline comprising NLP text preprocessing (stopword removal, stemming, TF-IDF vectorization), followed by a multi-layered perceptron architecture with optimized hidden layer weights and backpropagation to categorize threat levels.',
    keyFeatures: [
      'High-accuracy multi-class text categorization using Multi-Layer Perceptron neural networks',
      'NLP feature extraction and sentiment polarity detection',
      'Predictive risk score index for threat containment and flagged reporting',
      'Scalable architecture adaptable across diverse social communication feeds'
    ],
    technologies: ['Python', 'Multi-Layer Perceptron (MLP)', 'Deep Learning', 'NLP', 'Scikit-learn', 'Pandas', 'NumPy', 'Data Visualization']
  }
};

const ProjectsSection = () => {
  const { data } = useData();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = data?.projects ? [...data.projects].sort((a, b) => a.order - b.order) : [];

  const handleOpenProject = (project) => {
    const enriched = projectDetailsMap[project.title] || {
      defaultImg: gasDetectorDefaultImg,
      category: 'Software Engineering',
      status: 'Completed',
      overview: project.description || 'Full-scale software development project.',
      problemStatement: 'Engineered to address practical real-world computing requirements.',
      architecture: 'Developed with modern architecture standards, clean code, and robust error handling.',
      keyFeatures: [
        'Modular, maintainable code architecture',
        'Intuitive interface and reliable logic execution',
        'End-to-end testing and validation'
      ],
      technologies: ['Software Development', 'Problem Solving', 'Data Processing']
    };

    setSelectedProject({
      ...project,
      ...enriched,
      imageUrl: project.imageUrl || enriched.defaultImg
    });
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <span className="section-subheading">INNOVATION & CODE</span>
        <h2 className="section-heading">MY PROJECTS</h2>
        <p className="projects-intro-sub">
          Showcasing applied engineering across Artificial Intelligence, Machine Learning, and IoT. Click any project card to view full technical breakdown and imagery.
        </p>
        
        <div className="projects-grid">
          {projects.map((project, idx) => {
            const enriched = projectDetailsMap[project.title] || {};
            const displayImg = project.imageUrl || enriched.defaultImg || gasDetectorDefaultImg;

            return (
              <div 
                key={project.id || idx} 
                className="project-card card interactive-target"
                onClick={() => handleOpenProject(project)}
                role="button"
                tabIndex={0}
                title={`Click to view detailed case study for ${project.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') handleOpenProject(project); }}
              >
                {/* Project Visual Container */}
                <div className="project-image-container">
                  <img 
                    src={displayImg} 
                    alt={project.title} 
                    className="project-image" 
                  />
                  <div className="project-image-gradient"></div>
                  
                  <span className="project-category-badge">
                    {enriched.category || 'Engineering'}
                  </span>

                  <span className="project-number-tag">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="project-view-overlay">
                    <span>Click to View Full Project Details <ArrowUpRight size={14} /></span>
                  </div>
                </div>

                {/* Content */}
                <div className="project-content">
                  <span className="project-domain-tag">{enriched.category || 'Software Engineering'}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  {/* Tech Stack Preview */}
                  <div className="project-tech-preview">
                    {enriched.technologies?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="tech-chip-preview">{tech}</span>
                    ))}
                    {enriched.technologies?.length > 4 && (
                      <span className="tech-chip-preview more">+{enriched.technologies.length - 4} more</span>
                    )}
                  </div>

                  <div className="project-footer-row">
                    <span className="inspect-link">
                      Detailed Case Study & Specs <ArrowUpRight size={16} />
                    </span>
                    <div className="project-links-direct" onClick={(e) => e.stopPropagation()}>
                      {project.projectUrl && (
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" title="Live Preview">
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" title="View Code">
                          <GithubIcon size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====================================================
          Interactive Project Details Modal
          ==================================================== */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={handleCloseProject}>
          <div 
            className="project-modal-card card" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Hero Visual */}
            <div className="project-modal-hero">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title} 
                className="project-modal-hero-img" 
              />
              <div className="project-modal-hero-gradient"></div>

              <button 
                className="project-modal-close" 
                onClick={handleCloseProject}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              <div className="modal-hero-badge-wrap">
                <span className="modal-category-chip">
                  <Cpu size={14} /> {selectedProject.category}
                </span>
                <span className="modal-status-chip">
                  <ShieldCheck size={14} /> {selectedProject.status}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="project-modal-body">
              <h3 className="project-modal-title">{selectedProject.title}</h3>

              {/* Overview */}
              <div className="project-modal-section">
                <h4 className="modal-subheading">
                  <Sparkles size={16} className="modal-sec-icon" /> Project Overview
                </h4>
                <p className="modal-desc-text">{selectedProject.overview}</p>
              </div>

              {/* Problem Statement */}
              <div className="project-modal-section">
                <h4 className="modal-subheading">
                  <AlertTriangle size={16} className="modal-sec-icon" /> Problem Statement
                </h4>
                <p className="modal-desc-text">{selectedProject.problemStatement}</p>
              </div>

              {/* Architecture & Implementation */}
              <div className="project-modal-section">
                <h4 className="modal-subheading">
                  <Layers size={16} className="modal-sec-icon" /> System Architecture & Implementation
                </h4>
                <p className="modal-desc-text">{selectedProject.architecture}</p>
              </div>

              {/* Key Features */}
              <div className="project-modal-section">
                <h4 className="modal-subheading">
                  <CheckCircle2 size={16} className="modal-sec-icon" /> Key Features & Capabilities
                </h4>
                <div className="project-features-list">
                  {selectedProject.keyFeatures?.map((feature, i) => (
                    <div key={i} className="project-feature-item">
                      <span className="feat-check"><CheckCircle2 size={14} /></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="project-modal-section">
                <h4 className="modal-subheading">
                  <Cpu size={16} className="modal-sec-icon" /> Technologies & Tools Applied
                </h4>
                <div className="modal-tech-chips">
                  {selectedProject.technologies?.map((tech, i) => (
                    <span key={i} className="tech-badge-chip">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="project-modal-actions">
                {selectedProject.projectUrl && (
                  <a href={selectedProject.projectUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Launch Live Project <ExternalLink size={16} />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    View Repository <GithubIcon size={16} />
                  </a>
                )}
                <button className="btn btn-outline close-action-btn" onClick={handleCloseProject}>
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
