
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-2xl font-bold text-brand-primary">
              foundtastic
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/about">About Us</NavItem>
              <NavItem to="/contact">Contact Us</NavItem>
              <NavItem to="/faq">FAQ</NavItem>
              <div className="flex items-center space-x-2 pl-4">
                <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-brand-primary border border-brand-primary hover:bg-blue-50 transition-colors">Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:opacity-90 transition-opacity">Register</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
                <select className="appearance-none bg-transparent border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block w-full p-2 pr-8">
                    <option>English</option>
                    <option>हिंदी</option>
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
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About Us</NavItem>
            <NavItem to="/contact">Contact Us</NavItem>
            <NavItem to="/faq">FAQ</NavItem>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-4">
              <Link to="/login" className="flex-1 text-center px-4 py-2 rounded-md text-sm font-medium text-brand-primary border border-brand-primary hover:bg-blue-50">Login</Link>
              <Link to="/register" className="flex-1 text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:opacity-90">Register</Link>
            </div>
             <div className="mt-3 px-5">
                <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block w-full p-2">
                    <option>English</option>
                    <option>हिंदी</option>
                </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
