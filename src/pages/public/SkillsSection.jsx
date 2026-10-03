import React from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  Code2, Terminal, Globe, FileText, FileSpreadsheet, 
  Presentation, MessageSquare, Lightbulb, Users, CheckCircle2 
} from 'lucide-react';
import './SkillsSection.css';

const SkillsSection = () => {
  const { data } = useData();
  const skills = data?.skills ? [...data.skills].sort((a, b) => a.order - b.order) : [];

  const technicalSkills = skills.filter(s => s.category === 'Technical');
  const toolsSkills = skills.filter(s => s.category === 'Tools & Software');
  const professionalSkills = skills.filter(s => s.category === 'Professional');

  const getSkillIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('java') || lower.includes('c++')) return <Code2 size={20} />;
    if (lower.includes('python')) return <Terminal size={20} />;
    if (lower.includes('html') || lower.includes('css')) return <Globe size={20} />;
    if (lower.includes('word')) return <FileText size={20} />;
    if (lower.includes('excel')) return <FileSpreadsheet size={20} />;
    if (lower.includes('powerpoint')) return <Presentation size={20} />;
    if (lower.includes('communication')) return <MessageSquare size={20} />;
    if (lower.includes('learner')) return <Lightbulb size={20} />;
    if (lower.includes('team')) return <Users size={20} />;
    return <CheckCircle2 size={20} />;
  };

  const renderSkillGrid = (skillList) => (
    <div className="skills-grid">
      {skillList.map((skill, idx) => (
        <div key={skill.id || idx} className="skill-item">
          <div className="skill-icon-wrapper">
             {getSkillIcon(skill.name)}
          </div>
          <span className="skill-name">{skill.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-heading">MY SKILLS</h2>
        
        <div className="skills-layout-container">
          <div className="skills-top-row">
            {technicalSkills.length > 0 && (
              <div className="skills-category-box card">
                <h3 className="skills-category-title">Technical Skills</h3>
                {renderSkillGrid(technicalSkills)}
              </div>
            )}

            {toolsSkills.length > 0 && (
              <div className="skills-category-box card">
                <h3 className="skills-category-title">Tools & Software</h3>
                {renderSkillGrid(toolsSkills)}
              </div>
            )}
          </div>

          {professionalSkills.length > 0 && (
            <div className="skills-category-box card professional-box">
              <h3 className="skills-category-title">Professional Skills</h3>
              <div className="professional-skills-grid">
                {professionalSkills.map((skill, idx) => (
                  <div key={skill.id || idx} className="pro-skill-item">
                    <div className="pro-skill-icon">
                       {getSkillIcon(skill.name)}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
