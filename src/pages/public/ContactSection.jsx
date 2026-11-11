import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Clock, Sparkles, CheckCircle2, ArrowUpRight 
} from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
  const { data } = useData();
  const contactInfo = data?.contact?.[0] || data?.settings?.[0] || {};
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill in all required fields.' });
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
      setStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully. I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: 'error', text: 'Failed to send message. Please reach out directly via email or WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailAddress = contactInfo.email || 'bandaruleelaharika@gmail.com';
  const phoneNumber = contactInfo.phone || '8309436254';
  const locationText = contactInfo.location || 'Turangi, Kakinada, Andhra Pradesh, India';

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-container">
        <div className="contact-heading-wrap">
          <div className="contact-status-pill">
            <span className="contact-pulse-dot"></span>
            <span>OPEN FOR OPPORTUNITIES</span>
          </div>
          <span className="section-subheading">GET IN TOUCH</span>
          <h2 className="section-heading">LET'S CONNECT</h2>
          <p className="contact-description">
            Whether you have an internship, full-time engineering opening, project inquiry, or simply want to connect — my inbox is always open.
          </p>
        </div>
        
        <div className="contact-wrapper">
          {/* Left Column: Rich Contact Cards & Availability */}
          <div className="contact-info-column">
            {/* Availability Banner */}
            <div className="availability-card card">
              <div className="avail-header">
                <span className="avail-badge">
                  <CheckCircle2 size={14} className="avail-icon" /> Ready for Immediate Joining
                </span>
                <span className="avail-role-pref">Software Engineer • Web Developer • Python</span>
              </div>
              <p className="avail-text">
                MCA graduate from Aditya University with hands-on MERN stack and AI/ML internship training. Ready to contribute to dynamic software engineering teams.
              </p>
              <div className="response-time-chip">
                <Clock size={13} />
                <span>Typical response time: Under 24 hours</span>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="contact-channels-grid">
              <a href={`mailto:${emailAddress}`} className="channel-card card interactive-target">
                <div className="channel-icon-wrap">
                  <Mail size={22} />
                </div>
                <div className="channel-content">
                  <span className="channel-label">Email Address</span>
                  <span className="channel-value">{emailAddress}</span>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <a href={`tel:${phoneNumber}`} className="channel-card card interactive-target">
                <div className="channel-icon-wrap phone-wrap">
                  <Phone size={22} />
                </div>
                <div className="channel-content">
                  <span className="channel-label">Direct Phone / Call</span>
                  <span className="channel-value">+91 {phoneNumber}</span>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <div className="channel-card card location-channel">
                <div className="channel-icon-wrap loc-wrap">
                  <MapPin size={22} />
                </div>
                <div className="channel-content">
                  <span className="channel-label">Current Location</span>
                  <span className="channel-value">{locationText}</span>
                  <span className="loc-subtag">Open to Relocation / Hybrid / Remote</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Centered Direct Message Form */}
          <div className="contact-form-column">
            <div className="contact-form-card card">
              <div className="form-card-header">
                <div className="form-title-wrap">
                  <MessageSquare size={20} className="form-header-icon" />
                  <h3 className="form-heading">Send A Direct Message</h3>
                </div>
                <span className="form-subtitle">Fill in details and I'll respond promptly</span>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-field-label">Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="e.g. John Doe / Hiring Manager" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-field-label">Your Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="name@company.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-field-label">Subject / Purpose</label>
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="e.g. Job Opportunity / Collaboration" 
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-field-label">Your Message *</label>
                  <textarea 
                    name="message" 
                    placeholder="Write your message, project scope, or opportunity details here..." 
                    rows="4"
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
                
                <button type="submit" className="btn btn-primary contact-submit-btn" disabled={isSubmitting}>
                  <Send size={16} /> {isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
