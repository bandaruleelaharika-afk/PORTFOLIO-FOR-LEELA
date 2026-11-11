import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  Award, CheckCircle2, ExternalLink, Sparkles, 
  X, ShieldCheck, Eye, Calendar, ArrowUpRight 
} from 'lucide-react';
import './CertificationsSection.css';

import certMahindraDefault from '../../assets/cert_mahindra_pride.jpg';
import certIkkaDefault from '../../assets/cert_ikka_coromandel.jpg';
import certHtmlDefault from '../../assets/cert_html_pyramids.jpg';
import certPythonDefault from '../../assets/cert_python_springboard.jpg';

// Default authentic descriptions and fallback images mapped strictly to the 4 certifications
const defaultMetaMap = {
  'Employability Skill Programme': {
    defaultImg: certMahindraDefault,
    defaultYear: '2023',
    theme: 'mint',
    description: 'Comprehensive employability and professional skill enhancement program focusing on corporate communication, presentation, and team collaboration.'
  },
  'Career Orientation Program': {
    defaultImg: certIkkaDefault,
    defaultYear: '2024',
    theme: 'blue',
    description: 'Career orientation and industry readiness initiative covering professional roadmapping, corporate etiquette, and industry trends in collaboration with Coromandel.'
  },
  'HTML Basics': {
    defaultImg: certHtmlDefault,
    defaultYear: '',
    theme: 'emerald',
    description: 'Foundational certification covering modern HTML5 markup, document structure, semantics, and accessible web standards.'
  },
  'Python Basics': {
    defaultImg: certPythonDefault,
    defaultYear: '',
    theme: 'teal',
    description: 'Core certification verifying practical understanding of Python programming, control flow, functions, and data structures.'
  }
};

const themeClasses = ['theme-mint', 'theme-blue', 'theme-emerald', 'theme-teal'];

const CertificationsSection = () => {
  const { data } = useData();
  const [previewCert, setPreviewCert] = useState(null);
  const [inViewCards, setInViewCards] = useState({});
  const cardRefs = useRef([]);

  // Fetch from Firestore and sort by display order
  const rawCerts = data?.certifications && data.certifications.length > 0 
    ? [...data.certifications].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    : [];

  // Merge with fallback assets and authentic metadata without inventing missing details
  const certifications = rawCerts.map((cert, index) => {
    const meta = defaultMetaMap[cert.title] || {};
    const fallbackTheme = themeClasses[index % themeClasses.length];

    return {
      ...cert,
      year: cert.year !== undefined && cert.year !== null ? cert.year : (meta.defaultYear || ''),
      description: cert.description || meta.description || '',
      coverUrl: cert.coverUrl || meta.defaultImg || certMahindraDefault,
      themeClass: cert.theme ? `theme-${cert.theme}` : (meta.theme ? `theme-${meta.theme}` : fallbackTheme)
    };
  });

  // IntersectionObserver to trigger smooth progressive reveal of card content & large watermark numbers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.getAttribute('data-index');
          if (entry.isIntersecting && index !== null) {
            setInViewCards((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [certifications]);

  // Handle keyboard ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && previewCert) {
        setPreviewCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewCert]);

  const handleOpenCertificate = (cert) => {
    setPreviewCert(cert);
  };

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        
        {/* ====================================================
            Section Introduction
            ==================================================== */}
        <div className="cert-section-header">
          <div className="cert-header-badge">
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>CREDENTIALS & HONORS</span>
          </div>
          <h2 className="section-heading cert-main-title">MY CERTIFICATIONS</h2>
          <p className="certifications-intro-sub">
            Continuous learning. Practical skills. Professional growth.
          </p>
        </div>

        {/* ====================================================
            Premium Stacked Split-Panel Showcase Cards
            ==================================================== */}
        <div className="certifications-stack-container">
          {certifications.map((cert, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const totalCount = String(certifications.length).padStart(2, '0');
            const isInView = inViewCards[index];

            return (
              <div
                key={cert.id || index}
                data-index={index}
                ref={(el) => (cardRefs.current[index] = el)}
                style={{ '--stack-index': index }}
                className={`cert-panel-card ${cert.themeClass} ${isInView ? 'is-in-view' : ''}`}
              >
                {/* Large Translucent Watermark Background Number */}
                <div className="cert-bg-watermark-number" aria-hidden="true">
                  {formattedIndex}
                </div>

                {/* Decorative Subtle Grid / Radial Sheen in Card Background */}
                <div className="cert-card-sheen" aria-hidden="true"></div>

                {/* Card Inner Split Grid */}
                <div className="cert-panel-inner">
                  
                  {/* ====================================================
                      LEFT SIDE — Information, Metadata & Actions
                      ==================================================== */}
                  <div className="cert-panel-left">
                    
                    {/* Top Meta Row (Mobile & Desktop) */}
                    <div className="cert-top-meta-row">
                      <span className="cert-index-pill">
                        {formattedIndex} / {totalCount}
                      </span>

                      {cert.year && (
                        <span className="cert-year-pill">
                          <Calendar size={13} /> {cert.year}
                        </span>
                      )}

                      <span className="cert-verified-pill">
                        <ShieldCheck size={13} className="shield-icon" /> Verified Credential
                      </span>
                    </div>

                    {/* Mobile-Only Illustration/Image Display */}
                    <div className="cert-mobile-image-frame" onClick={() => handleOpenCertificate(cert)}>
                      <img 
                        src={cert.coverUrl} 
                        alt={cert.title} 
                        className="cert-mobile-img" 
                        loading="lazy"
                      />
                      <div className="cert-mobile-overlay">
                        <span className="cert-mobile-inspect-pill">
                          <Eye size={14} /> Tap to View
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="cert-title-heading">
                      {cert.title}
                    </h3>

                    {/* Organization / Issuer */}
                    <div className="cert-org-row">
                      <Award size={16} className="org-award-icon" />
                      <span className="cert-org-name">{cert.organization}</span>
                    </div>

                    {/* Description */}
                    {cert.description && (
                      <p className="cert-description-text">
                        {cert.description}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="cert-action-footer">
                      <button 
                        type="button"
                        className="btn cert-view-action-btn"
                        onClick={() => handleOpenCertificate(cert)}
                        aria-label={`View Certificate for ${cert.title}`}
                      >
                        <span>VIEW CERTIFICATE</span>
                        <ArrowUpRight size={17} className="btn-arrow-icon" />
                      </button>

                      {cert.certificateUrl && (
                        <a 
                          href={cert.certificateUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-outline cert-direct-link-btn"
                          title="Open Verified Certificate in New Tab"
                          aria-label="Open Certificate in New Tab"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>

                  </div>

                  {/* ====================================================
                      RIGHT SIDE — Desktop Visual Showcase Frame
                      ==================================================== */}
                  <div className="cert-panel-right">
                    <div className="cert-visual-stage">
                      
                      {/* Ambient Halo behind the certificate */}
                      <div className="cert-stage-halo" aria-hidden="true"></div>

                      {/* Certificate Preview Card */}
                      <div 
                        className="cert-preview-frame"
                        onClick={() => handleOpenCertificate(cert)}
                        role="button"
                        tabIndex={0}
                        title={`Click to view verified certificate for ${cert.title}`}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleOpenCertificate(cert); }}
                      >
                        <img 
                          src={cert.coverUrl} 
                          alt={cert.title} 
                          className="cert-showcase-img" 
                          loading="lazy"
                        />
                        
                        <div className="cert-frame-glass-overlay">
                          <span className="cert-inspect-pill">
                            <Eye size={15} /> Inspect Certificate
                          </span>
                        </div>

                        {/* Subtle Verified Corner Seal */}
                        <div className="cert-corner-seal">
                          <CheckCircle2 size={13} />
                          <span>Accredited</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ====================================================
          High-Resolution Full Certificate Modal
          ==================================================== */}
      {previewCert && (
        <div 
          className="cert-modal-backdrop" 
          onClick={() => setPreviewCert(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <div 
            className="cert-modal-card card" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="cert-modal-header">
              <div className="cert-modal-issuer">
                <Award size={18} className="issuer-icon" />
                <span>{previewCert.organization}</span>
              </div>
              <h3 id="cert-modal-title" className="cert-modal-title">
                {previewCert.title}
              </h3>
              <button 
                type="button"
                className="cert-modal-close" 
                onClick={() => setPreviewCert(null)}
                aria-label="Close certificate preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* High-Res Certificate Image Display */}
            <div className="cert-modal-image-display">
              <img 
                src={previewCert.coverUrl} 
                alt={previewCert.title} 
                className="cert-modal-doc-img" 
              />
            </div>

            {/* Verification Metadata Row */}
            <div className="cert-modal-details-grid">
              {previewCert.year && (
                <div className="cert-detail-box">
                  <span className="detail-label">Issue Year</span>
                  <span className="detail-value">{previewCert.year}</span>
                </div>
              )}
              <div className="cert-detail-box">
                <span className="detail-label">Verification Status</span>
                <span className="detail-value highlight">Verified & Accredited</span>
              </div>
              {previewCert.description && (
                <div className="cert-detail-box full-width">
                  <span className="detail-label">Scope & Competencies</span>
                  <p className="detail-description">{previewCert.description}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="cert-modal-footer">
              {previewCert.certificateUrl ? (
                <a 
                  href={previewCert.certificateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline cert-external-download-link"
                >
                  <ExternalLink size={15} /> Open Original Certificate File
                </a>
              ) : null}
              <button 
                type="button"
                className="btn btn-primary" 
                onClick={() => setPreviewCert(null)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
