import React from 'react';
import { useData } from '../../contexts/DataContext';
import { ExternalLink } from 'lucide-react';
import './CertificationsSection.css';

const CertificationsSection = () => {
  const { data } = useData();
  const certifications = data?.certifications ? [...data.certifications].sort((a, b) => a.order - b.order) : [];

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <h2 className="section-heading">CERTIFICATIONS</h2>
        
        <div className="certifications-grid">
          {certifications.map((cert, idx) => (
            <div key={cert.id || idx} className="cert-card card">
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
                      CERTIFICATE NOT UPLOADED
                    </button>
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

export default CertificationsSection;
