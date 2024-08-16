import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { FiX } from 'react-icons/fi';
import '../../App.css';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [language, setLanguage] = useState('en'); // State for managing language
  const { authenticationStore } = useStore();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const toggleNav = () => {
    setNavActive(!navActive);
    console.log("clicked");
  };

  const closeMenu = () => {
    setNavActive(false);
  };

  const handleLogout = () => {
    authenticationStore.logout();
    navigate('/admin/login');
  };

  const handleSmoothScroll = (e: any, id: any) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu();
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <nav className={`navbar ${navActive ? "active" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="navbar-toggler" type="button" onClick={toggleNav}>
            <span className={`navbar-toggler-icon ${navActive ? 'active' : ''}`}></span>
          </button>
        </div>
        <div className="navbar-brand-container" onClick={handleLogoClick}>
          <Link className="navbar-brand" to="/">
            <img src="/img/zalogo.png" alt="ZabeliArchitects" className="logo-img" />
          </Link>
        </div>
        <div className="navbar-right">
          <div className={`navbar-menu ${navActive ? 'navbar-menu-active' : ''}`}>
            <ul className="navbar-nav">
              {navActive && (
                <button className="navbar-close d-block d-md-none" onClick={closeMenu}>
                  <FiX size={24} />
                </button>
              )}
              <li className="nav-item">
                <a onClick={(e) => handleSmoothScroll(e, 'projects2')} className="nav-link" href="#projects2">Projects</a>
              </li>
              <li className="nav-item">
                <a onClick={(e) => handleSmoothScroll(e, 'news')} className="nav-link" href="#news">News</a>
              </li>
              <li className="nav-item">
                <a onClick={(e) => handleSmoothScroll(e, 'aboutus')} className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a onClick={(e) => handleSmoothScroll(e, 'contact')} className="nav-link" href="#contact">Project With Us</a>
              </li>
              {authenticationStore.isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link onClick={closeMenu} className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link onClick={closeMenu} className="nav-link" to="/admin/manage-projects">Manage Projects</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={closeMenu} className="nav-link" to="/admin/manage-project-details">Manage Project Details</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={closeMenu} className="nav-link" to="/admin/manage-news">Manage News</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={closeMenu} className="nav-link" to="/admin/manage-team-members">Manage Team Members</Link>
                  </li> */}
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                  </li>
                </>
              )}
              
            </ul>
          </div>
          <li className="nav-item">
                {language === 'en' && (
                  <span className="language-option" onClick={() => handleLanguageChange('de')}>DE</span>
                )}
                {language === 'de' && (
                  <span className="language-option" onClick={() => handleLanguageChange('en')}>EN</span>
                )}
              </li>
        </div>
      </div>
    </nav>
  );
}

export default observer(Navbar);
