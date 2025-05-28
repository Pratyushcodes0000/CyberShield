import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    console.log("Retrieved user data from localStorage:", userData);
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed user data:", parsedUser);
        // Verify that the user object has the required properties
        if (!parsedUser.picture) {
          console.error("User data missing picture URL:", parsedUser);
          setImageError(true);
        } else {
          console.log("User picture URL:", parsedUser.picture);
          // Reset image error state when we have a valid picture URL
          setImageError(false);
        }
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleImageError = (e) => {
    console.log("Profile picture failed to load:", e);
    console.log("Attempted to load image from:", user?.picture);
    console.log("Current user state:", user);
    setImageError(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Debug render
  console.log("Current user state:", user);
  console.log("Image error state:", imageError);

  return (
    <header className="landing-header">
      <div className="header-content">
        <Link to="/" className="logo">CyberShield</Link>
        
        <nav className={`landing-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/tools" onClick={() => setIsMenuOpen(false)}>Tools</Link></li>
            <li><Link to="/features" onClick={() => setIsMenuOpen(false)}>Features</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-profile">
              {imageError ? (
                <FaUserCircle className="profile-picture fallback-icon" />
              ) : (
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="profile-picture"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  onError={handleImageError}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
              )}
              {isMenuOpen && (
                <div className="profile-dropdown">
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : 
            <Link to="/login" className="nav-cta">Get Started</Link>
          }
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header