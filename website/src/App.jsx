import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Tools from './Tools.jsx';
import LandingPage from './LandingPage.jsx';
import FakeBussiness from './Tools/FakeBussiness.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Login from './Auth/Login.jsx'
import Password from './Tools/PasswordChecker.jsx'
import PublicWifiWarning from './Tools/PublicWifiWarning.jsx';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="193971991830-bepnllhuq5lrtbm82ubvrigpeo9sl132.apps.googleusercontent.com">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/fakeBussiness" element={<FakeBussiness />} />
          <Route path="/PasswordChecker" element={<Password/>} />
          <Route path="/publicWifiWarning" element={<PublicWifiWarning />} />
        </Routes>
        <Footer/>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;