import React from 'react';
import { useData } from '../contexts/DataContext';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  const { data } = useData();
  const settings = data?.settings?.[0] || {};
  
  const phoneNumber = settings.phone || '8309436254';
  const message = settings.whatsappMessage || 'Hello Leela Harika, I would like to discuss a project/opportunity with you.';
  
  // Format phone number for WhatsApp URL (remove spaces, + if any, ensure country code)
  const formattedPhone = '91' + phoneNumber.replace(/\D/g, ''); // Assuming India +91 as default for her number
  
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="floating-whatsapp"
      aria-label="Contact on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="whatsapp-icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.05 1.5c-7.9 0-14.3 6.4-14.3 14.3 0 2.6.7 5.1 2 7.3L1.5 30.5l7.6-2c2.2 1.2 4.6 1.8 7 1.8 7.9 0 14.3-6.4 14.3-14.3S23.95 1.5 16.05 1.5zm0 26.2c-2.2 0-4.4-.6-6.3-1.7l-.4-.3-4.7 1.2 1.3-4.6-.3-.5c-1.2-1.9-1.9-4.2-1.9-6.5 0-6.6 5.4-12 12-12s12 5.4 12 12-5.4 12-12 12zm6.6-8.9c-.4-.2-2.1-1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-.9-1.8-2.1-2-2.4-.2-.4 0-.5.2-.7.2-.2.4-.4.6-.6.2-.2.2-.4.4-.6.2-.2.1-.4.1-.6-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.5s-1.2 1.2-1.2 2.9c0 1.7 1.2 3.4 1.4 3.7.2.3 2.5 3.8 6 5.3 3.6 1.5 3.6 1 4.2.9.7-.1 2.1-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.2-.2-.5-.3-.9-.5z"/>
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
