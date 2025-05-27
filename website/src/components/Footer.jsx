import React from 'react';
import './Footer.css';

const Footer = () => {
    return(
        <div className='container'>
        <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CyberShield</h3>
            <p>Advanced cybersecurity solutions for modern businesses</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>Tools</li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: contact@cybershield.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 CyberShield. All rights reserved.</p>
        </div>
      </footer>
        </div>
    );
}
export default Footer