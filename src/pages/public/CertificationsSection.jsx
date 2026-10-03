import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ExternalLink } from 'lucide-react';
import './CertificationsSection.css';

const CertificationsSection = () => {
  const { data } = useData();
  const certifications = data?.certifications ? [...data.certifications].sort((a, b) => a.order - b.order) : [];
  
  const carouselRef = useRef(null);
  const requestRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // We duplicate the items once so it can loop. Actually for a scrollLeft loop to work without jumps, 
  // we can append clones or just let standard scroll reset when it hits the end, but seamless loop is best.
  // For a portfolio, if it has 4 items, and we show 4 on desktop, it won't scroll unless we have more. 
  // Let's duplicate the list to ensure there's enough content to scroll.
  const displayCerts = [...certifications, ...certifications, ...certifications];

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let scrollPos = el.scrollLeft;

    const animate = () => {
      if (!isPaused && displayCerts.length > 0) {
        scrollPos += 0.5; // Speed of scroll
        
        // If we've scrolled past one full set of items, seamlessly jump back.
        // The width of one full set is (el.scrollWidth / 3) because we triplicated it.
        const oneSetWidth = el.scrollWidth / 3;
        
        if (scrollPos >= oneSetWidth) {
           scrollPos -= oneSetWidth;
        }
        
        el.scrollLeft = scrollPos;
      } else {
        // If paused (e.g. user scrolling manually), sync our scrollPos with actual scrollLeft
        scrollPos = el.scrollLeft;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused, displayCerts.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <h2 className="section-heading">CERTIFICATIONS</h2>
        
        <div className="carousel-wrapper">
          <div 
            className="certifications-carousel" 
            ref={carouselRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onScroll={() => {
              if (isPaused) {
                // Let the user scroll manually
              }
            }}
          >
            {displayCerts.map((cert, idx) => (
              <div key={`${cert.id || 'cert'}-${idx}`} className="cert-card card">
                <div className="cert-image-container">
                  {cert.coverUrl ? (
                    <img src={cert.coverUrl} alt={cert.title} className="cert-image" />
                  ) : (
                    <div className="cert-image-placeholder">
                      <span>CERTIFICATE</span>
                    </div>
                  )}
                </div>
                <div className="cert-content">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-org">{cert.organization}</p>
                  {cert.year && <span className="cert-year">{cert.year}</span>}
                  
                  <div className="cert-action">
                    {cert.certificateUrl ? (
                      <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline cert-btn">
                        VIEW CERTIFICATE <ExternalLink size={16} />
                      </a>
                    ) : (
                      <button className="btn btn-outline cert-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                        NOT UPLOADED
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
