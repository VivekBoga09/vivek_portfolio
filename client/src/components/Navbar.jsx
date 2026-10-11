import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenResume, onOpenCommandPalette, backendStatus, soundEnabled, setSoundEnabled, playBlip }) {
  const [theme, setTheme] = useState('cyberpunk');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    playBlip(750);
    const themes = ['cyberpunk', 'obsidian', 'light'];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      playBlip(880);
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    playBlip(520);
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="navbar-wrapper">
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          <a
            href="#hero"
            className="brand-logo"
            onClick={(e) => handleNavClick(e, 'hero')}
            aria-label="Boga Vivek Home"
          >
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">Boga Vivek</span>
            <span className="logo-bracket">/&gt;</span>
            <span
              className="status-indicator"
              title={backendStatus.connected ? "MERN Backend & DB Active" : "Backend Fallback Active"}
            />
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li>
              <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link" onClick={(e) => handleNavClick(e, 'skills')}>
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link" onClick={(e) => handleNavClick(e, 'projects')}>
                Projects
              </a>
            </li>
            <li>
              <a href="#competitive" className="nav-link" onClick={(e) => handleNavClick(e, 'competitive')}>
                CP & DSA
              </a>
            </li>
            <li>
              <a href="#education" className="nav-link" onClick={(e) => handleNavClick(e, 'education')}>
                Education
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>
                Contact
              </a>
            </li>
          </ul>

          {/* Right Action Controls */}
          <div className="nav-actions">
            {/* Live MERN Backend indicator badge */}
            <span className="backend-badge" title="MERN REST API Backend Live">
              <i className="fa-solid fa-server"></i> MERN API
            </span>

            {/* Quick Command Palette Trigger (Ctrl+K) */}
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  if (playBlip) playBlip(600);
                  onOpenCommandPalette();
                }}
                className="nav-search-btn"
                title="Search commands & sections (Ctrl + K)"
                aria-label="Open Command Palette (Ctrl + K)"
              >
                <i className="fa-solid fa-magnifying-glass" />
                <span className="nav-kbd-hint">⌘K</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="control-btn"
              title={`Theme: ${theme.toUpperCase()} (Click to toggle)`}
              aria-label="Toggle Theme"
            >
              <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : theme === 'obsidian' ? 'fa-ghost' : 'fa-moon'}`} />
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className="control-btn"
              title={soundEnabled ? 'Audio UI Enabled (Click to Mute)' : 'Audio UI Muted (Click to Enable)'}
              aria-label="Toggle UI Audio"
            >
              <i className={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`} />
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playBlip(640);
                onOpenResume();
              }}
              className="btn btn-sm btn-outline"
              aria-label="View Resume"
            >
              <i className="fa-solid fa-file-pdf"></i> Resume
            </button>

            {/* Mobile Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => {
                playBlip(400);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Navigation Menu"
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="logo-name">&lt;Boga Vivek /&gt;</span>
          <button
            className="close-drawer-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li>
            <a href="#about" className="mobile-link" onClick={(e) => handleNavClick(e, 'about')}>
              <i className="fa-solid fa-user-astronaut"></i> About
            </a>
          </li>
          <li>
            <a href="#skills" className="mobile-link" onClick={(e) => handleNavClick(e, 'skills')}>
              <i className="fa-solid fa-code"></i> Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="mobile-link" onClick={(e) => handleNavClick(e, 'projects')}>
              <i className="fa-solid fa-layer-group"></i> Projects
            </a>
          </li>
          <li>
            <a href="#competitive" className="mobile-link" onClick={(e) => handleNavClick(e, 'competitive')}>
              <i className="fa-solid fa-trophy"></i> CP & DSA (LeetCode 1635)
            </a>
          </li>
          <li>
            <a href="#education" className="mobile-link" onClick={(e) => handleNavClick(e, 'education')}>
              <i className="fa-solid fa-graduation-cap"></i> Education & Certs
            </a>
          </li>
          <li>
            <a href="#terminal-section" className="mobile-link" onClick={(e) => handleNavClick(e, 'terminal-section')}>
              <i className="fa-solid fa-terminal"></i> Terminal Playground
            </a>
          </li>
          <li>
            <a href="#contact" className="mobile-link" onClick={(e) => handleNavClick(e, 'contact')}>
              <i className="fa-solid fa-paper-plane"></i> Contact Me
            </a>
          </li>
        </ul>
        <div className="mobile-drawer-footer">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="btn btn-primary btn-block"
          >
            <i className="fa-solid fa-file-lines"></i> View Interactive Resume
          </button>
        </div>
      </div>
      <div
        className={`drawer-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
