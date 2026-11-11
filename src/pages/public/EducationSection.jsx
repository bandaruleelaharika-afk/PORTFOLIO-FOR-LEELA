import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  GraduationCap, Calendar, Award, MapPin, 
  CheckCircle2, Sparkles, BookOpen 
} from 'lucide-react';
import './EducationSection.css';

import defaultStudyLabImg from '../../assets/edu_study_lab.jpg';
import defaultCampusLibraryImg from '../../assets/edu_campus_library.jpg';

const EducationSection = () => {
  const { data } = useData();
  const rawEducation = data?.education || [];
  const settings = data?.settings?.[0] || {};

  // Sort strictly in chronological order as requested: Intermediate -> Degree -> MCA
  const educationList = [...rawEducation].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  // Customizable images from Cloudinary via settings/Firestore, with high-quality local fallbacks
  const imageOne = settings.educationImageOne || defaultStudyLabImg;
  const imageTwo = settings.educationImageTwo || defaultCampusLibraryImg;

  const [activeIndices, setActiveIndices] = useState([0]); // First milestone active by default
  const [lineHeightPercent, setLineHeightPercent] = useState(15);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const sectionRef = useRef(null);
  const milestoneRefs = useRef([]);

  useEffect(() => {
    milestoneRefs.current = milestoneRefs.current.slice(0, educationList.length);
  }, [educationList]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check section visibility
      if (rect.top < viewportHeight * 0.85 && rect.bottom > 100) {
        setIsSectionVisible(true);
      }

      // Calculate milestone activations
      const newActive = new Set(activeIndices);
      let deepestActiveIndex = 0;

      milestoneRefs.current.forEach((el, index) => {
        if (!el) return;
        const mRect = el.getBoundingClientRect();
        // Activate milestone when it reaches middle-upper viewport
        if (mRect.top <= viewportHeight * 0.65) {
          newActive.add(index);
          if (index > deepestActiveIndex) {
            deepestActiveIndex = index;
          }
        }
      });

      // Update active milestones without unnecessary resetting on small scrolls
      if (newActive.size !== activeIndices.length) {
        setActiveIndices(Array.from(newActive));
      }

      // Calculate line draw progression smoothly
      if (milestoneRefs.current.length > 0) {
        const firstEl = milestoneRefs.current[0];
        const lastEl = milestoneRefs.current[milestoneRefs.current.length - 1];

        if (firstEl && lastEl) {
          const firstTop = firstEl.offsetTop + 18; // Center of first marker
          const lastTop = lastEl.offsetTop + 18;   // Center of last marker
          const totalDistance = lastTop - firstTop;

          if (totalDistance > 0) {
            const currentEl = milestoneRefs.current[deepestActiveIndex];
            if (currentEl) {
              const currentOffset = currentEl.offsetTop + 18 - firstTop;
              const ratio = Math.min(1, Math.max(0, currentOffset / totalDistance));
              setLineHeightPercent(ratio * 100);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [educationList, activeIndices]);

  return (
    <section id="education" ref={sectionRef} className={`section education-section ${isSectionVisible ? 'in-view' : ''}`}>
      <div className="container education-container">
        
        {/* Section Heading */}
        <div className="education-header-center">
          <span className="section-subheading">ACADEMIC JOURNEY</span>
          <h2 className="section-heading education-main-heading">MY EDUCATION</h2>
          <p className="education-intro-sub">
            Chronological academic roadmap bridging foundational science, computer applications, and advanced software engineering.
          </p>
        </div>

        {/* Desktop 2-Column Editorial Layout (45% Images / 55% Scroll-driven Timeline) */}
        <div className="education-layout-grid">
          
          {/* LEFT SIDE — 45%: Sticky Staggered Image Panels */}
          <div className="education-left-showcase">
            <div className="staggered-images-wrapper">
              
              {/* Backing Ambient Halo */}
              <div className="edu-image-ambient-halo" aria-hidden="true"></div>

              {/* Staggered Image 1 (Higher, Left) */}
              <div className="staggered-image-panel panel-one">
                <img 
                  src={imageOne} 
                  alt="Academic Research and Coding" 
                  className="edu-staggered-img" 
                  loading="lazy"
                />
                <div className="panel-sheen-overlay"></div>
                <div className="panel-tag-pill">
                  <BookOpen size={13} className="panel-tag-icon" />
                  <span>Software & AI Lab</span>
                </div>
              </div>

              {/* Staggered Image 2 (Lower, Right) */}
              <div className="staggered-image-panel panel-two">
                <img 
                  src={imageTwo} 
                  alt="University Campus & Modern Library" 
                  className="edu-staggered-img" 
                  loading="lazy"
                />
                <div className="panel-sheen-overlay"></div>
                <div className="panel-tag-pill">
                  <GraduationCap size={13} className="panel-tag-icon" />
                  <span>Academic Campus</span>
                </div>
              </div>

              {/* Subtle Floating Achievement Chip */}
              <div className="edu-floating-stat-chip">
                <Sparkles size={16} className="stat-sparkle-icon" />
                <div>
                  <span className="stat-title">Master of Computer Applications</span>
                  <span className="stat-sub">Aditya University • MCA 2024–2026</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — 55%: Progressive Scroll-Driven Vertical Timeline */}
          <div className="education-right-timeline">
            
            {/* The Vertical Connecting Line Track */}
            <div className="timeline-track-rail" aria-hidden="true">
              <div 
                className="timeline-progress-laser" 
                style={{ height: `${lineHeightPercent}%` }}
              ></div>
            </div>

            {/* Timeline Milestones (Chronological: Intermediate -> Degree -> MCA) */}
            <div className="timeline-milestones-stream">
              {educationList.map((item, index) => {
                const isActive = activeIndices.includes(index);
                const isCurrent = activeIndices[activeIndices.length - 1] === index;

                return (
                  <div
                    key={item.id || index}
                    ref={(el) => (milestoneRefs.current[index] = el)}
                    className={`timeline-milestone-node ${isActive ? 'node-active' : ''} ${isCurrent ? 'node-current' : ''}`}
                  >
                    {/* Circular Milestone Node Indicator on the Line */}
                    <div className="milestone-marker-wrapper">
                      <div className="milestone-outer-ring">
                        <div className="milestone-core-dot">
                          <GraduationCap size={12} className="marker-cap-icon" />
                        </div>
                      </div>
                      <div className="milestone-glow-pulse" aria-hidden="true"></div>
                    </div>

                    {/* Milestone Card Content */}
                    <div className="milestone-card-content card">
                      <div className="milestone-top-row">
                        <span className="milestone-year-pill">
                          <Calendar size={13} /> {item.year}
                        </span>
                        <span className="milestone-score-badge">
                          Result: <strong>{item.percentage}</strong>
                        </span>
                      </div>

                      <h3 className="milestone-qualification-title">
                        {item.course}
                      </h3>

                      <h4 className="milestone-college-name">
                        {item.college}
                      </h4>

                      <div className="milestone-location-row">
                        <MapPin size={14} className="milestone-pin-icon" />
                        <span>{item.location}</span>
                      </div>

                      {item.description && (
                        <p className="milestone-description-text">
                          {item.description}
                        </p>
                      )}

                      <div className="milestone-verified-seal">
                        <CheckCircle2 size={13} className="seal-check" />
                        <span>Verified Academic Credential</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EducationSection;

