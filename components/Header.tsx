import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'bg-brand-primary text-white'
            : 'text-slate-700 hover:bg-blue-100 hover:text-brand-primary'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const languages = [
  { code: 'English', name: 'English' },
  { code: 'हिंदी', name: 'हिंदी' },
  { code: 'বাংলা', name: 'বাংলা' },
  { code: 'ગુજરાતી', name: 'ગુજરાતી' },
  { code: 'ಕನ್ನಡ', name: 'ಕನ್ನಡ' },
  { code: 'മലയാളം', name: 'മലയാളം' },
  { code: 'मराठी', name: 'मराठी' },
  { code: 'ਪੰਜਾਬੀ', name: 'ਪੰਜਾਬੀ' },
  { code: 'தமிழ்', name: 'தமிழ்' },
  { code: 'తెలుగు', name: 'తెలుగు' },
  { code: 'اردو', name: 'اردو' },
];

interface HeaderProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    if (selectedLanguage === 'English' || selectedLanguage === 'हिंदी') {
      setLanguage(selectedLanguage as 'English' | 'हिंदी');
    } else {
      // For now, only English and Hindi are fully supported in the context
      alert(`${selectedLanguage} support is coming soon!`);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-2xl font-bold text-brand-primary">
              {t.appName}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              <NavItem to="/">{t.navHome}</NavItem>
              <NavItem to="/about">{t.navAbout}</NavItem>
              <NavItem to="/contact">{t.navContact}</NavItem>
              <NavItem to="/faq">{t.navFAQ}</NavItem>
            </div>
            {isLoggedIn ? (
              <>
                <NavItem to="/profile">{t.navProfile}</NavItem>
                <button onClick={handleLogoutClick} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:opacity-90 transition-opacity">
                  {t.navLogout}
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:opacity-90 transition-opacity">
                {t.navLogin}
              </Link>
            )}
            <div className="relative">
                <select 
                  value={language}
                  onChange={handleLangChange}
                  className="appearance-none bg-transparent border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block w-full p-2 pr-8"
                >
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-brand-primary inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem to="/">{t.navHome}</NavItem>
            <NavItem to="/about">{t.navAbout}</NavItem>
            <NavItem to="/contact">{t.navContact}</NavItem>
            <NavItem to="/faq">{t.navFAQ}</NavItem>
            {isLoggedIn && <NavItem to="/profile">{t.navProfile}</NavItem>}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              {isLoggedIn ? (
                 <button onClick={handleLogoutClick} className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:opacity-90">{t.navLogout}</button>
              ) : (
                 <Link to="/login" className="w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:opacity-90">{t.navLogin}</Link>
              )}
            </div>
             <div className="mt-3 px-5">
                <select 
                  value={language}
                  onChange={handleLangChange}
                  className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block w-full p-2"
                >
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
