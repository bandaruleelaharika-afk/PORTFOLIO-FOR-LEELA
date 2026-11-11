import React from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  GraduationCap, User, MapPin, Mail, Phone, 
  Calendar, Award, Target, Sparkles, BookOpen, CheckCircle2 
} from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
  const { data } = useData();
  const aboutData = data?.about?.[0] || {};
  const settings = data?.settings?.[0] || {};
  
  const educationList = data?.education ? [...data.education].sort((a, b) => a.order - b.order) : [];

  const coreStrengths = [
    {
      icon: <Target size={22} />,
      title: "Problem Solving",
      desc: "Strong analytical mindset focused on data structures, algorithmic efficiency, and scalable architectures."
    },
    {
      icon: <Sparkles size={22} />,
      title: "Rapid Learner",
      desc: "Fast absorption of emerging frameworks and libraries across AI/ML pipelines and full-stack ecosystems."
    },
    {
      icon: <CheckCircle2 size={22} />,
      title: "Production Focused",
      desc: "Dedicated to transforming theoretical software concepts into dependable, practical user experiences."
    },
    {
      icon: <Award size={22} />,
      title: "Collaborative Mindset",
      desc: "Exceptional teamwork, clear technical communication, and agile sprint coordination."
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <span className="section-subheading">BIOGRAPHY & ACADEMICS</span>
        <h2 className="section-heading">ALL ABOUT ME</h2>
        <p className="about-intro-sub">
          A dedicated software developer and MCA post-graduate candidate bridging artificial intelligence, full-stack web technologies, and practical problem solving.
        </p>

        {/* Biography & Philosophy Presentation */}
        <div className="about-bio-container">
          <div className="about-header-inline">
            <User size={24} className="about-icon" />
            <h3>Who I Am</h3>
          </div>
          
          <div className="about-summary-box card">
            <p className="about-narrative-lead">
              Hello! I am <strong>Bandaru Leela Harika</strong>, an ambitious Computer Applications post-graduate student at Aditya University with a deep passion for building modern software solutions.
            </p>
            
            <p className="about-narrative-text">
              My journey in technology spans across core programming (Java, Python, Data Structures), modern Full-Stack Web Development (MERN Stack: MongoDB, Express, React, Node.js), and applied Artificial Intelligence & Machine Learning.
            </p>

            <p className="about-narrative-text">
              I thrive in environments where theoretical computer science converges with impactful real-world applications. Whether training deep learning models for predictive threat identification or engineering responsive, accessible web portals, I bring dedication, precision, and continuous curiosity.
            </p>

            <div className="about-tag-cloud">
              <span className="about-pill">Software Engineering</span>
              <span className="about-pill">AI & Deep Learning</span>
              <span className="about-pill">MERN Stack</span>
              <span className="about-pill">Data Structures</span>
              <span className="about-pill">IoT Systems</span>
            </div>
          </div>
        </div>

        {/* Core Attributes & Philosophies Row */}
        <div className="about-strengths-section">
          <h3 className="strengths-title">Core Philosophies & Strengths</h3>
          <div className="strengths-grid">
            {coreStrengths.map((item, idx) => (
              <div key={idx} className="strength-card card">
                <div className="strength-icon-box">{item.icon}</div>
                <h4 className="strength-card-title">{item.title}</h4>
                <p className="strength-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;