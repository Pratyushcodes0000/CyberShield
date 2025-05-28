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
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
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
      setLoginError(null);
      console.log('Google Token:', credentialResponse.credential);
      
      // Send token to backend
      const res = await axios.post('http://localhost:8000/api/auth/google', {
        token: credentialResponse.credential
      });
      
      if (!res.data || !res.data.user) {
        throw new Error('Invalid response from server');
      }

      const userData = res.data.user;
      console.log("Received user data structure:", {
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        fullData: userData
      });

      // Verify required fields
      if (!userData.name || !userData.email || !userData.picture) {
        console.error('Missing user data fields:', {
          hasName: !!userData.name,
          hasEmail: !!userData.email,
          hasPicture: !!userData.picture
        });
        throw new Error('Missing required user data');
      }

      // Store user data in localStorage
      try {
        const userDataToStore = {
          name: userData.name,
          email: userData.email,
          picture: userData.picture
        };
        console.log("Storing user data:", userDataToStore);
        localStorage.setItem('user', JSON.stringify(userDataToStore));
        console.log("Successfully stored user data in localStorage");
        setUser(userDataToStore);
        navigate('/');
      } catch (storageError) {
        console.error('Error storing user data:', storageError);
        setLoginError('Failed to save login information');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.response?.data?.error || 'Login failed. Please try again.');
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
        
        {loginError && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {loginError}
          </div>
        )}

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
              setLoginError('Google login failed. Please try again.');
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
