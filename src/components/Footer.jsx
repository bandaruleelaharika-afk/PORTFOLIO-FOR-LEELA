import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">LH</h2>
            <p className="footer-name">Leela Harika Bandaru</p>
            <p className="footer-tagline">Building innovative practical solutions.</p>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Leela Harika Bandaru. All Rights Reserved.</p>
          <a href="mailto:bandaruleelaharika@gmail.com" className="footer-email">
            bandaruleelaharika@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
