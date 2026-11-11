import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  X, CheckCircle2, Award, Zap, BookOpen, Layers, 
  Sparkles, ArrowUpRight, Flame, Code2 
} from 'lucide-react';
import './SkillsSection.css';

// SVG Brand Logos & Rich Visuals for Skills
const SkillIcons = {
  Java: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <path d="M26 44c0 0-5 3 2 4s15 1 18-3c-3 1-8 2-12 2s-8-1-8-3z" fill="#E76F00" />
      <path d="M22 37c0 0-6 4 3 5s18 1 23-4c-4 1-11 2-16 2s-10-1-10-3z" fill="#E76F00" />
      <path d="M33 22c2 2 3 5 0 9 5-3 8-7 4-11-5-6-1-11-1-11s-9 6-3 12z" fill="#5382A1" />
      <path d="M44 48c0 0 6 3 10 2s-2-5-6-6c2 1 4 2 2 4s-4 1-6 0z" fill="#E76F00" />
      <path d="M27 30c0 0-11 3-3 4s14 1 20-3c-4 1-10 2-14 2s-3-1-3-3z" fill="#E76F00" />
      <path d="M38 10c0 0 4 3 1 7 4-2 7-6 3-10-5-5-1-7-1-7s-7 4-3 10z" fill="#5382A1" />
      <path d="M15 54c7 2 23 2 34 0 5-1-2-4-5-4-9 1-18 1-24 0-5-1-9 3-5 4z" fill="#5382A1" />
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <path d="M31.8 4C20.6 4 21.3 8.8 21.3 8.8l.01 5.1h10.9v1.6H17.1s-7.1-.8-7.1 10.4 6.2 10 6.2 10h3.7v-5.2s-.2-6.2 6.1-6.2h10.5s5.9.1 5.9-5.8V10S43.6 4 31.8 4zm-3.3 3.3c1 0 1.9.9 1.9 1.9s-.9 1.9-1.9 1.9-1.9-.9-1.9-1.9.9-1.9 1.9-1.9z" fill="#387EB8"/>
      <path d="M32.2 60c11.2 0 10.5-4.8 10.5-4.8l-.01-5.1H31.7v-1.6h15.2s7.1.8 7.1-10.4-6.2-10-6.2-10h-3.7v5.2s.2 6.2-6.1 6.2H27.5s-5.9-.1-5.9 5.8V54s-1.2 6 10.6 6zm3.3-3.3c-1 0-1.9-.9-1.9-1.9s.9-1.9 1.9-1.9 1.9.9 1.9 1.9-.9 1.9-1.9 1.9z" fill="#FFE052"/>
    </svg>
  ),
  DataStructures: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <circle cx="32" cy="14" r="8" fill="#10B981" />
      <circle cx="16" cy="46" r="8" fill="#38BDF8" />
      <circle cx="48" cy="46" r="8" fill="#A855F7" />
      <line x1="26" y1="20" x2="20" y2="39" stroke="var(--text-secondary)" strokeWidth="3" strokeDasharray="3 3"/>
      <line x1="38" y1="20" x2="44" y2="39" stroke="var(--text-secondary)" strokeWidth="3" strokeDasharray="3 3"/>
      <line x1="24" y1="46" x2="40" y2="46" stroke="var(--accent)" strokeWidth="2.5" />
    </svg>
  ),
  HTML: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <path d="M10 6l4.4 49.3L32 60l17.6-4.7L54 6H10z" fill="#E44D26"/>
      <path d="M32 10.5v44.8l13.6-3.8 3.5-39.2H32z" fill="#F16529"/>
      <path d="M32 21.6h-9.8l.7 7.7H32V21.6zm0 14.8h-.1l-5.6-.1-.4-4.5h-5.4l.7 8.9 10.8.3v-4.6z" fill="#EBEBEB"/>
      <path d="M32 21.6v7.7h8.8l-.8 9.3-8 2.2v4.8l13.6-3.8 1.4-15.5h-15l-.1-4.7z" fill="#FFFFFF"/>
    </svg>
  ),
  CSS: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <path d="M10 6l4.4 49.3L32 60l17.6-4.7L54 6H10z" fill="#1572B6"/>
      <path d="M32 10.5v44.8l13.6-3.8 3.5-39.2H32z" fill="#33A9DC"/>
      <path d="M32 21.6h-9.8l.7 7.7H32V21.6zm0 14.8h-.1l-5.6-.1-.4-4.5h-5.4l.7 8.9 10.8.3v-4.6z" fill="#EBEBEB"/>
      <path d="M32 21.6v7.7h8.8l-.8 9.3-8 2.2v4.8l13.6-3.8 1.4-15.5h-15l-.1-4.7z" fill="#FFFFFF"/>
    </svg>
  ),
  MSWord: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <rect x="14" y="8" width="38" height="48" rx="6" fill="#185ABD" />
      <rect x="8" y="16" width="28" height="32" rx="4" fill="#2B7CD3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
      <path d="M15 24h3.5l2.2 9 2.4-9h3.2l2.4 9 2.2-9h3.5l-3.8 16h-3.4l-2.4-9-2.4 9h-3.5L15 24z" fill="#FFFFFF" />
    </svg>
  ),
  MSExcel: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <rect x="14" y="8" width="38" height="48" rx="6" fill="#107C41" />
      <rect x="8" y="16" width="28" height="32" rx="4" fill="#21A366" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
      <path d="M16 24h4l3 5.5 3-5.5h4l-4.8 8 5.2 8h-4.2l-3.2-5.8-3.2 5.8h-4.2l5.2-8-4.8-8z" fill="#FFFFFF" />
    </svg>
  ),
  MSPowerPoint: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <rect x="14" y="8" width="38" height="48" rx="6" fill="#C43E1C" />
      <rect x="8" y="16" width="28" height="32" rx="4" fill="#D83B01" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
      <path d="M18 24h6.5c3.5 0 5.5 1.8 5.5 4.8s-2 4.8-5.5 4.8H21.5v6.4H18V24zm3.5 6.6h3c1.5 0 2.2-.6 2.2-1.8s-.7-1.8-2.2-1.8h-3v3.6z" fill="#FFFFFF" />
    </svg>
  ),
  GoodCommunication: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <circle cx="32" cy="32" r="26" fill="rgba(16, 185, 129, 0.15)" />
      <path d="M22 20h20a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H30l-8 7v-7h-0a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6z" fill="#10B981"/>
      <circle cx="26" cy="32" r="2.5" fill="#FFFFFF"/>
      <circle cx="32" cy="32" r="2.5" fill="#FFFFFF"/>
      <circle cx="38" cy="32" r="2.5" fill="#FFFFFF"/>
    </svg>
  ),
  QuickLearner: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <circle cx="32" cy="32" r="26" fill="rgba(245, 158, 11, 0.15)" />
      <path d="M32 12a14 14 0 0 0-9 24.7V42a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5.3A14 14 0 0 0 32 12zm-3 34v2h6v-2h-6z" fill="#F59E0B"/>
      <path d="M32 20l-3 7h6l-4 8 8-9h-5l3-6h-5z" fill="#FFFBEB"/>
    </svg>
  ),
  TeamWorker: () => (
    <svg viewBox="0 0 64 64" className="skill-svg-logo">
      <circle cx="32" cy="32" r="26" fill="rgba(56, 189, 248, 0.15)" />
      <circle cx="32" cy="22" r="6" fill="#38BDF8"/>
      <path d="M22 42c0-5 4-8 10-8s10 3 10 8v2H22v-2z" fill="#38BDF8"/>
      <circle cx="18" cy="27" r="4.5" fill="#818CF8"/>
      <path d="M11 43c0-3.5 3-6 7-6 1.2 0 2.3.3 3.2.7-1 1.4-1.6 3.1-1.6 5.3v2h-8.6v-2z" fill="#818CF8"/>
      <circle cx="46" cy="27" r="4.5" fill="#818CF8"/>
      <path d="M53 43c0-3.5-3-6-7-6-1.2 0-2.3.3-3.2.7 1 1.4 1.6 3.1 1.6 5.3v2h8.6v-2z" fill="#818CF8"/>
    </svg>
  ),
};

// Rich Detailed Information for Each Skill Modal
const skillDetailsMap = {
  Java: {
    level: '92%',
    status: 'Proficient',
    summary: 'Core programming language utilized extensively for Object-Oriented Software Engineering, data processing algorithms, and backend systems.',
    keyTopics: ['Object-Oriented Programming (OOP)', 'Collections Framework', 'Exception Handling', 'Multithreading & Concurrency', 'File I/O & Streams', 'Java Virtual Machine (JVM) internals'],
    practicalExperience: 'Applied in academic MCA software development modules at Aditya University, complex problem solving, and backend algorithmic tasks.',
    categoryColor: '#E76F00'
  },
  Python: {
    level: '90%',
    status: 'Advanced',
    summary: 'Primary language for Artificial Intelligence, Machine Learning pipelines, data analytics, and neural network development.',
    keyTopics: ['NumPy & Pandas', 'Scikit-learn', 'TensorFlow / Keras basics', 'Data Cleaning & Preprocessing', 'NLP Text Tokenization', 'Object-Oriented Scripting'],
    practicalExperience: 'Employed during AI & ML internship at BIST Technologies and the Crime Detection Multi-Layer Perceptron research project.',
    categoryColor: '#387EB8'
  },
  'Data Structures': {
    level: '88%',
    status: 'Strong Foundation',
    summary: 'Fundamental core computer science competency focusing on optimal data organization, time-space complexity optimization, and algorithmic efficiency.',
    keyTopics: ['Arrays & Strings', 'Linked Lists (Singly & Doubly)', 'Stacks & Queues', 'Trees (BST, Binary Tree)', 'Graph Traversals (BFS, DFS)', 'Sorting & Searching Algorithms'],
    practicalExperience: 'Active practice in competitive coding, MCA coursework, and designing low-latency logic for IoT telemetry buffering.',
    categoryColor: '#10B981'
  },
  HTML: {
    level: '95%',
    status: 'Expert',
    summary: 'Structural backbone of modern web applications emphasizing semantic markup, accessibility (a11y), and SEO-friendly document hierarchy.',
    keyTopics: ['HTML5 Semantic Elements', 'Forms & Real-time Validation', 'SVG Graphics & Canvas', 'Audio & Video Embedding', 'SEO Metadata & Microdata', 'Responsive Viewport Standards'],
    practicalExperience: 'Extensively used in MERN Stack web projects at Blackbuck Engineers and this dynamic portfolio application.',
    categoryColor: '#E44D26'
  },
  CSS: {
    level: '94%',
    status: 'Expert',
    summary: 'Modern styling, CSS architecture, dynamic animations, responsive UI layouts, and cohesive design system construction.',
    keyTopics: ['Flexbox & CSS Grid Systems', 'Custom Properties (CSS Variables)', 'Keyframe Animations & Transitions', 'Dark & Light Mode Themes', 'Mobile-First Media Queries', 'Glassmorphism & Shadows'],
    practicalExperience: 'Engineered responsive interfaces, stacked card layouts, glowing cyber-animations, and theme systems across web portals.',
    categoryColor: '#1572B6'
  },
  'MS Word': {
    level: '95%',
    status: 'Expert',
    summary: 'Professional documentation, technical report generation, formal project documentation, and corporate formatting standards.',
    keyTopics: ['Advanced Document Layout & Styles', 'Table of Contents & References', 'Mail Merge & Automation', 'Technical Project Reports', 'Header/Footer Styling', 'Collaboration & Tracking'],
    practicalExperience: 'Authoring academic MCA dissertations, research documentation, project abstracts, and professional resumes.',
    categoryColor: '#2B7CD3'
  },
  'MS Excel': {
    level: '88%',
    status: 'Proficient',
    summary: 'Quantitative data analysis, spreadsheet modeling, business metrics computation, and structured tabular presentation.',
    keyTopics: ['Formulas & Complex Functions (VLOOKUP, INDEX/MATCH)', 'Pivot Tables & Pivot Charts', 'Conditional Formatting', 'Data Sorting & Filtering', 'Statistical Analysis', 'Data Visualizations'],
    practicalExperience: 'Utilized for machine learning dataset analysis, academic performance metrics, and corporate orientation reporting.',
    categoryColor: '#21A366'
  },
  'MS PowerPoint': {
    level: '92%',
    status: 'Advanced',
    summary: 'Engaging visual presentation design, project pitch decks, technical seminars, and executive slideshow preparation.',
    keyTopics: ['Visual Hierarchy & Storyboarding', 'Custom Slide Layouts & Master Slides', 'Infographics & SmartArt', 'Technical Architecture Slides', 'Presenter View & Delivery', 'Transitions & Visual Polish'],
    practicalExperience: 'Delivered technical project seminars, internship milestone presentations, and college symposium pitches.',
    categoryColor: '#D83B01'
  },
  'Good Communication': {
    level: '96%',
    status: 'High Competency',
    summary: 'Articulate verbal and written communication, effective technical articulation, and cross-functional interpersonal skills.',
    keyTopics: ['Technical Articulation & Pitching', 'Active Listening & Empathy', 'Professional Email & Reporting', 'Presentation & Public Speaking', 'Constructive Feedback', 'Client & Mentor Engagement'],
    practicalExperience: 'Refined through the Mahindra Pride Employability Skill Programme and collaborative team projects.',
    categoryColor: '#10B981'
  },
  'Quick Learner': {
    level: '98%',
    status: 'Core Trait',
    summary: 'Fast absorption of novel frameworks, rapid paradigm adaptation, and proactive self-directed technology acquisition.',
    keyTopics: ['Rapid Prototyping', 'Documentation Reading', 'Problem Deconstruction', 'Continuous Curiosity', 'Self-Driven Research', 'Agile Mindset'],
    practicalExperience: 'Quickly mastered MERN Stack and Deep Learning libraries in fast-paced professional internship environments.',
    categoryColor: '#F59E0B'
  },
  'Team Worker': {
    level: '95%',
    status: 'Collaborative',
    summary: 'Cooperative sprint execution, mutual accountability, empathetic conflict resolution, and goal-oriented collective synergy.',
    keyTopics: ['Agile Collaboration & Standups', 'Git Workflow & Code Sharing', 'Peer Mentoring', 'Task Ownership', 'Conflict Resolution', 'Shared Vision Focus'],
    practicalExperience: 'Collaborated with multidisciplinary engineering cohorts during internship residencies and group projects.',
    categoryColor: '#38BDF8'
  }
};

const SkillsSection = () => {
  const { data } = useData();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Technical');

  const skills = data?.skills ? [...data.skills].sort((a, b) => a.order - b.order) : [];

  const getSkillVisual = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('java')) return <SkillIcons.Java />;
    if (lower.includes('python')) return <SkillIcons.Python />;
    if (lower.includes('data structure') || lower.includes('dsa')) return <SkillIcons.DataStructures />;
    if (lower.includes('html')) return <SkillIcons.HTML />;
    if (lower.includes('css')) return <SkillIcons.CSS />;
    if (lower.includes('word')) return <SkillIcons.MSWord />;
    if (lower.includes('excel')) return <SkillIcons.MSExcel />;
    if (lower.includes('powerpoint')) return <SkillIcons.MSPowerPoint />;
    if (lower.includes('communication')) return <SkillIcons.GoodCommunication />;
    if (lower.includes('learner')) return <SkillIcons.QuickLearner />;
    if (lower.includes('team')) return <SkillIcons.TeamWorker />;
    return <CheckCircle2 size={28} className="default-skill-icon" />;
  };

  const marqueeSkills = [
    { name: 'Java', icon: <SkillIcons.Java />, tag: 'OOP & Backend' },
    { name: 'Python', icon: <SkillIcons.Python />, tag: 'AI & Machine Learning' },
    { name: 'Data Structures', icon: <SkillIcons.DataStructures />, tag: 'Algorithms' },
    { name: 'HTML5', icon: <SkillIcons.HTML />, tag: 'Semantic Web' },
    { name: 'CSS3', icon: <SkillIcons.CSS />, tag: 'Modern UI & Animations' },
    { name: 'MERN Stack', icon: <SkillIcons.HTML />, tag: 'Full Stack Web' },
    { name: 'Deep Learning', icon: <SkillIcons.Python />, tag: 'Neural Networks' },
    { name: 'IoT Systems', icon: <SkillIcons.DataStructures />, tag: 'Hardware Telemetry' },
    { name: 'MS Word', icon: <SkillIcons.MSWord />, tag: 'Documentation' },
    { name: 'MS Excel', icon: <SkillIcons.MSExcel />, tag: 'Data Analytics' },
    { name: 'MS PowerPoint', icon: <SkillIcons.MSPowerPoint />, tag: 'Presentations' },
    { name: 'Team Collaboration', icon: <SkillIcons.TeamWorker />, tag: 'Agile Mindset' },
  ];

  const handleOpenSkill = (skill) => {
    const details = skillDetailsMap[skill.name] || {
      level: '85%',
      status: 'Skilled',
      summary: `Proficient understanding and practical application of ${skill.name}.`,
      keyTopics: ['Core Fundamentals', 'Best Practices', 'Practical Application'],
      practicalExperience: 'Applied in college coursework and software projects.'
    };
    setSelectedSkill({ ...skill, ...details });
  };

  const handleCloseSkill = () => {
    setSelectedSkill(null);
  };

  const categories = [
    { id: 'Technical', label: 'Technical Skills', icon: <Zap size={16} /> },
    { id: 'Tools & Software', label: 'Tools & Software', icon: <Layers size={16} /> }
  ];

  const filteredSkills = skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <span className="section-subheading">COMPETENCIES & EXPERTISE</span>
        <h2 className="section-heading">MY SKILLS</h2>
        <p className="skills-intro-sub">
          A blend of programming languages, modern frameworks, and data analysis software. Click any skill card for full syllabus metrics and practical experience.
        </p>

        {/* Moving Technology Ticker Ribbon */}
        <div className="skills-marquee-container" aria-label="Technology Ticker">
          <div className="skills-marquee-track">
            {marqueeSkills.map((item, idx) => (
              <div key={`m1-${idx}`} className="marquee-chip">
                <span className="marquee-icon">{item.icon}</span>
                <span className="marquee-name">{item.name}</span>
                <span className="marquee-tag">{item.tag}</span>
              </div>
            ))}
            {marqueeSkills.map((item, idx) => (
              <div key={`m2-${idx}`} className="marquee-chip" aria-hidden="true">
                <span className="marquee-icon">{item.icon}</span>
                <span className="marquee-name">{item.name}</span>
                <span className="marquee-tag">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs: Technical Skills & Tools/Software */}
        <div className="skills-tab-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`skills-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span className="tab-count-badge">
                {skills.filter(s => s.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic & Attractive Skills Showcase Grid */}
        <div className="skills-interactive-grid">
          {filteredSkills.map((skill, idx) => {
            const details = skillDetailsMap[skill.name] || { 
              level: '85%', 
              status: 'Proficient',
              categoryColor: 'var(--accent)'
            };

            return (
              <div
                key={skill.id || idx}
                className="skill-showcase-card card"
                onClick={() => handleOpenSkill(skill)}
                role="button"
                tabIndex={0}
                title={`Click to inspect ${skill.name} details`}
                onKeyDown={(e) => { if (e.key === 'Enter') handleOpenSkill(skill); }}
                style={{ '--skill-color': details.categoryColor || 'var(--accent)' }}
              >
                <div className="skill-card-header">
                  <div className="skill-logo-frame">
                    {getSkillVisual(skill.name)}
                  </div>
                  <div className="skill-badges-col">
                    <span className="skill-level-number">{details.level}</span>
                    <span className="skill-status-tag">{details.status}</span>
                  </div>
                </div>

                <div className="skill-card-body">
                  <span className="skill-category-micro">{skill.category}</span>
                  <h3 className="skill-title-text">{skill.name}</h3>
                  
                  {/* Glowing Animated Progress Bar */}
                  <div className="skill-progress-track">
                    <div 
                      className="skill-progress-bar"
                      style={{ width: details.level }}
                    ></div>
                  </div>
                </div>

                <div className="skill-card-footer">
                  <span className="skill-view-hint">
                    Explore Syllabus & Experience <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ====================================================
          Interactive Skill Details Modal
          ==================================================== */}
      {selectedSkill && (
        <div className="skill-modal-backdrop" onClick={handleCloseSkill}>
          <div 
            className="skill-modal-card card" 
            onClick={(e) => e.stopPropagation()}
            style={{ '--skill-accent': selectedSkill.categoryColor || 'var(--accent)' }}
          >
            <div className="skill-modal-header">
              <div className="skill-modal-logo-wrap">
                {getSkillVisual(selectedSkill.name)}
              </div>
              <div className="skill-modal-title-wrap">
                <div className="skill-modal-badge-row">
                  <span className="modal-category-tag">{selectedSkill.category}</span>
                  <span className="modal-status-badge">{selectedSkill.status}</span>
                  <span className="modal-level-pct">{selectedSkill.level} Proficiency</span>
                </div>
                <h3 className="skill-modal-name">{selectedSkill.name}</h3>
              </div>
              <button 
                className="skill-modal-close" 
                onClick={handleCloseSkill}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="skill-modal-body">
              {/* Summary */}
              <div className="skill-modal-section">
                <h4 className="modal-subheading">
                  <BookOpen size={16} className="modal-sec-icon" /> Core Competency Overview
                </h4>
                <p className="modal-desc-text">{selectedSkill.summary}</p>
              </div>

              {/* Topics / Syllabus */}
              {selectedSkill.keyTopics && (
                <div className="skill-modal-section">
                  <h4 className="modal-subheading">
                    <Zap size={16} className="modal-sec-icon" /> Technical Syllabus & Topics Mastered
                  </h4>
                  <div className="modal-topic-chips">
                    {selectedSkill.keyTopics.map((topic, i) => (
                      <span key={i} className="modal-topic-chip">
                        <CheckCircle2 size={13} className="chip-check" />
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Experience */}
              {selectedSkill.practicalExperience && (
                <div className="skill-modal-section">
                  <h4 className="modal-subheading">
                    <Sparkles size={16} className="modal-sec-icon" /> Practical Experience & Application
                  </h4>
                  <p className="modal-context-text">{selectedSkill.practicalExperience}</p>
                </div>
              )}
            </div>

            <div className="skill-modal-footer">
              <button className="btn btn-primary" onClick={handleCloseSkill}>
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsSection;