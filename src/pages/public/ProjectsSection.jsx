import React from 'react';
import { useData } from '../../contexts/DataContext';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);
import './ProjectsSection.css';

const ProjectsSection = () => {
  const { data } = useData();
  const projects = data?.projects ? [...data.projects].sort((a, b) => a.order - b.order) : [];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-heading">MY PROJECTS</h2>
        
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={project.id || idx} className="project-card card">
              <div className="project-image-container">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="project-image" />
                ) : (
                  <div className="project-image-placeholder">
                    <span className="project-number">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
              <div className="project-content">
                <span className="project-number-small">PROJECT {String(idx + 1).padStart(2, '0')}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-links">
                  {project.projectUrl ? (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                      <ExternalLink size={18} /> View Project
                    </a>
                  ) : (
                    <button className="btn btn-outline" disabled style={{ cursor: 'default', opacity: 0.7 }}>
                      Project Details
                    </button>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-icon">
                      <GithubIcon size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
