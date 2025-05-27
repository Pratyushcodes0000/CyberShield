import React, { useState, useEffect } from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle regular sign in logic here
      console.log('Form submitted:', formData);
      // After successful login, navigate to home
      navigate('/');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Google Token:', credentialResponse.credential);
      // Send this token to your backend to exchange for access token
      const res = await axios.post('http://localhost:8000/api/auth/google', {
        token: credentialResponse.credential
      });
      console.log("Backend Response", res.data);
      
      // Store user data in localStorage
      const userData = res.data.user;
      console.log("Storing user data:", userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // After successful login, navigate to home
      navigate('/');
    } catch (error) {
      console.error('Error sending token to backend:', error.response?.data || error.message);
    }
  };

  // If user is already logged in, show the logged-in state
  if (user) {
    return (
      <div className="sign-in-container">
        <div className="sign-in-box">
          <h1>Already Logged In</h1>
          <div className="logged-in-content">
            <img 
              src={user.picture} 
              alt={user.name} 
              className="logged-in-avatar"
            />
            <p className="welcome-message">Welcome back, {user.name}!</p>
            <p className="user-email">{user.email}</p>
            <button 
              onClick={() => navigate('/')} 
              className="home-button"
            >
              Go to Home
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                setUser(null);
              }} 
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <h1>Welcome Back</h1>
        <p className="subtitle">Please sign in to continue</p>
        
        <form onSubmit={handleSubmit} className="sign-in-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="google-login-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
            theme="filled_blue"
            shape="rectangular"
            text="signin_with"
            width="100%"
          />
        </div>

        <p className="sign-up-link">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
