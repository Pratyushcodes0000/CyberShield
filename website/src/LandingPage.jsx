import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'
import { 
  FaShieldAlt, 
  FaRobot, 
  FaSync, 
  FaChartLine, 
  FaLock, 
  FaSearch,
  FaUserSecret,
  FaBuilding,
  FaTruck
} from 'react-icons/fa';

const features = [
  {
    id: 1,
    title: "Real-time Protection",
    icon: <FaShieldAlt className="feature-icon" />,
    description: "24/7 monitoring and instant threat detection",
    color: "#3b82f6"
  },
  {
    id: 2,
    title: "AI-Powered",
    icon: <FaRobot className="feature-icon" />,
    description: "Advanced machine learning algorithms",
    color: "#8b5cf6"
  },
  {
    id: 3,
    title: "Easy Integration",
    icon: <FaSync className="feature-icon" />,
    description: "Seamless setup with existing systems",
    color: "#10b981"
  }
];

const tools = [
  {
    id: 1,
    title: "Insider Threat Detector",
    subtitle: "Employee Fraud Monitor",
    icon: <FaUserSecret className="tool-icon" />,
    description: "Analyzes internal system usage for anomalies and potential insider threats.",
    features: ["Real-time monitoring", "Behavioral analysis", "Access tracking"],
    color: "#ef4444"
  },
  {
    id: 2,
    title: "Fake Business Identifier",
    icon: <FaBuilding className="tool-icon" />,
    description: "Protect your business from fraudulent companies and domain impersonation.",
    features: ["Domain verification", "Company validation", "Contract analysis"],
    color: "#8b5cf6"
  },
  {
    id: 3,
    title: "Supply Chain Verifier",
    icon: <FaTruck className="tool-icon" />,
    description: "Ensure the legitimacy of your entire supply chain network.",
    features: ["Vendor verification", "Risk assessment", "Compliance checking"],
    color: "#2563eb"
  }
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main className="landing-main">
        <div className="landing-container">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <h1>Advanced Cybersecurity Solutions</h1>
              <p>Protect your digital assets with our cutting-edge security tools and real-time threat detection</p>
              <div className="hero-buttons">
                <button className="primary-btn">Start Free Trial</button>
                <button className="secondary-btn">View Demo</button>
              </div>
            </div>
            <div className="hero-image">
              <div className="floating-cards">
                <div className="card card-1">🔒</div>
                <div className="card card-2">🛡️</div>
                <div className="card card-3">🔍</div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="features-section">
            <h2>Why Choose CyberShield?</h2>
            <div className="features-grid">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="feature-card"
                  style={{ '--feature-color': feature.color }}
                >
                  <div className="feature-icon-container">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tools Preview Section */}
          <section id="tools" className="tools-section">
            <h2>Our Security Tools</h2>
            <div className="tools-grid">
              {tools.map((tool) => (
                <div 
                  key={tool.id} 
                  className="tool-card"
                  style={{ '--tool-color': tool.color }}
                >
                  <div className="tool-icon-container">
                    {tool.icon}
                  </div>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <ul className="tool-features">
                    {tool.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-content">
              <h2>Ready to Secure Your Digital Assets?</h2>
              <p>Join thousands of businesses protected by CyberShield</p>
              <button className="primary-btn">Start Free Trial</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LandingPage; 