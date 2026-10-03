import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
  const { data } = useData();
  const contactInfo = data?.contact?.[0] || data?.settings?.[0] || {};
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: serverTimestamp(),
        read: false
      });
      setStatus({ type: 'success', text: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: 'error', text: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            title="Back to Home"
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              color: 'var(--text-primary)', 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              transition: 'var(--transition)',
              position: 'absolute',
              top: '40px',
              left: '20px',
              zIndex: 10
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <span className="section-subheading">My Contact</span>
        <h2 className="section-heading">Let's Talk</h2>
        <p className="contact-description">
          Have an idea, project, or opportunity? Let's connect and create something meaningful together.
        </p>
        
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="contact-card card">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <a href={`mailto:${contactInfo.email || 'bandaruleelaharika@gmail.com'}`}>
                  {contactInfo.email || 'bandaruleelaharika@gmail.com'}
                </a>
              </div>
            </div>

            <div className="contact-card card">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <a href={`tel:${contactInfo.phone || '8309436254'}`}>
                  {contactInfo.phone || '8309436254'}
                </a>
              </div>
            </div>

            <div className="contact-card card">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>{contactInfo.location || 'Turangi, Kakinada, Andhra Pradesh, India'}</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper card">
            <h3 className="form-heading">TEXT ME</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Message" 
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              {status.text && (
                <div className={`form-status ${status.type}`}>
                  {status.text}
                </div>
              )}
              
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
