import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LanguageSelectorPopup from './components/LanguageSelectorPopup';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ReportFlowPage from './pages/ReportFlowPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('foundtastic-visited');
    if (!hasVisited) {
      setShowPopup(true);
      sessionStorage.setItem('foundtastic-visited', 'true');
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-brand-light font-sans">
        {showPopup && <LanguageSelectorPopup onClose={handleClosePopup} />}
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/report" element={<ReportFlowPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;