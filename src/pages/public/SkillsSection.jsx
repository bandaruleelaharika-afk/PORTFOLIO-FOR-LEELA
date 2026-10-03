import React from 'react';
import { useData } from '../../contexts/DataContext';
import './SkillsSection.css';

const SkillsSection = () => {
  const { data } = useData();
  const skills = data?.skills ? [...data.skills].sort((a, b) => a.order - b.order) : [];

  const technicalSkills = skills.filter(s => s.category === 'Technical');
  const toolsSkills = skills.filter(s => s.category === 'Tools & Software');
  const professionalSkills = skills.filter(s => s.category === 'Professional');

  const renderSkillGrid = (skillList, useInitialIcon) => (
    <div className="skills-grid">
      {skillList.map((skill, idx) => (
        <div key={skill.id || idx} className="skill-card card">
          {useInitialIcon ? (
            <div className="skill-icon-placeholder">
              {skill.name.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            <div className="skill-indicator"></div>
          )}
          <span className="skill-name">{skill.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-heading">MY SKILLS</h2>
        
        <div className="skills-container">
          {technicalSkills.length > 0 && (
            <div className="skills-category">
              <h3 className="skills-category-title">Technical Skills</h3>
              {renderSkillGrid(technicalSkills, true)}
            </div>
          )}

          {toolsSkills.length > 0 && (
            <div className="skills-category">
              <h3 className="skills-category-title">Tools & Software</h3>
              {renderSkillGrid(toolsSkills, true)}
            </div>
          )}

          {professionalSkills.length > 0 && (
            <div className="skills-category">
              <h3 className="skills-category-title">Professional Skills</h3>
              {renderSkillGrid(professionalSkills, false)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
