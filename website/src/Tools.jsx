import React from "react";
import { Link } from 'react-router-dom';
import './Tools.css';
import { 
  FaShieldAlt, 
  FaEnvelopeOpenText, 
  FaLock, 
  FaSearch, 
  FaUserSecret,
  FaBuilding,
  FaTruck,
  FaRobot, 
  FaExclamationTriangle, 
  FaWifi
} from 'react-icons/fa';

const tools = [
  {
    id: 1,
    title: "Insider Threat Detector",
    subtitle: "Employee Fraud Monitor",
    icon: <FaUserSecret className="tool-icon" />,
    description: "Analyzes internal system usage (e.g., logins, downloads) for anomalies.",
    features: [
      "Real-time activity monitoring",
      "Behavioral analysis",
      "Anomaly detection",
      "Access pattern tracking"
    ],
    color: "#ef4444"
  },
  {
    id: 2,
    title: "Fake Business Identifier Tool",
    icon: <FaBuilding className="tool-icon" />,
    description: "Detects fake companies/domains impersonating real ones in B2B emails or contracts.",
    features: [
      "Domain verification",
      "Company registry check",
      "Email pattern analysis",
      "Contract validation"
    ],
    color: "#8b5cf6",
    link:'fakeBussiness',
  },
  {
    id: 3,
    title: "Fake News Identifier Tool",
    icon: <FaExclamationTriangle className="tool-icon" />,
    description: "Detects and flags potentially fake news articles or claims using AI heuristics.",
    features: [
      "AI-powered news analysis",
      "Suspicious phrase detection",
      "Sensationalism scoring",
      "Fact-checking suggestions"
    ],
    color: "#f59e42",
    link: 'fakeNewsIdentifier',
  },
  {
    id: 4,
    title: "Phishing Email Scanner",
    icon: <FaEnvelopeOpenText className="tool-icon" />,
    description: "Detect suspicious keywords and links in your Gmail inbox using AI and the Gmail API.",
    features: [
      "Email content analysis",
      "Link verification",
      "Attachment scanning",
      "Real-time alerts"
    ],
    color: "#10b981",
    link:'EmailScanner'
  },
  {
    id: 5,
    title: "Safe Browsing Checker",
    icon: <FaShieldAlt className="tool-icon" />,
    description: "Check if a link is flagged as malicious using Google's Safe Browsing API.",
    features: [
      "URL verification",
      "Malware detection",
      "Phishing protection",
      "Real-time scanning"
    ],
    color: "#f59e0b"
  },

  {
    id: 6,
    title: "Password Breach Checker",
    icon: <FaLock className="tool-icon" />,
    description: "Check if your password has been exposed in known data breaches using Have I Been Pwned API.",
    features: [
      "SHA-1 password hashing",
      "Anonymous breach check",
      "Real-time results",
      "No password stored or sent"
    ],
    color: "#0ea5e9",
    link: 'passwordChecker',
  }
];

const Tools = () => {
  return (
    <div className="tools-page">
    

      <main className="tools-main">
        <div className="tools-container">
          <section className="tools-hero">
            <h1>🛡️ Cyber Fraud Prevention Tools</h1>
            <p>A suite of tools designed to protect consumers and businesses from digital fraud using AI, APIs, and best security practices.</p>
          </section>

          <section className="tools-grid">
            {tools.map((tool) => (
              <div 
                key={tool.id} 
                className="tool-card"
                style={{ '--tool-color': tool.color }}
              >
                <div className="tool-icon-container">
                  {tool.icon}
                </div>
                <h2>{tool.title}</h2>
                <p>{tool.description}</p>
                <Link to={`/${tool.link}`} className="logo">USE</Link>
              </div>
            ))}
          </section>

          <section className="tools-cta">
            <button className="cta-button">Get Started</button>
          </section>
        </div>
      </main>

      
    </div>
  );
};

export default Tools;
