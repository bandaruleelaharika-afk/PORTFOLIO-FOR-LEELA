import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Briefcase } from 'lucide-react';
import './InternshipsSection.css';

const InternshipsSection = () => {
  const { data } = useData();
  const internships = data?.internships ? [...data.internships].sort((a, b) => a.order - b.order) : [];

  return (
    <section id="internships" className="section internships-section">
      <div className="container">
        <h2 className="section-heading">MY INTERNSHIPS</h2>
        
        <div className="internships-timeline-container">
          <div className="internships-timeline">
            {internships.map((internship, idx) => (
              <div key={internship.id || idx} className="internship-item">
                <div className="internship-marker">
                  <Briefcase size={16} />
                </div>
                <div className="internship-content card">
                  <div className="internship-year">{internship.year}</div>
                  <h3 className="internship-company">{internship.company}</h3>
                  <h4 className="internship-role">{internship.role}</h4>
                  <div className="internship-location">{internship.location}</div>
                  <p className="internship-description">{internship.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipsSection;
