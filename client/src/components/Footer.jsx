import React from 'react';

export default function Footer({ playBlip }) {
  const scrollToTop = () => {
    playBlip(550);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo-name">&lt;Boga Vivek /&gt;</span>
            <p>Computer Science & Engineering (Data Science) • Full-Stack MERN Developer</p>
          </div>
          <div className="footer-socials">
            <a
              href="https://github.com/VivekBoga09"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github" />
            </a>
            <a
              href="https://linkedin.com/in/vivekboga"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin" />
            </a>
            <a
              href="https://leetcode.com/u/vivekboga2006/"
              target="_blank"
              rel="noopener noreferrer"
              title="LeetCode"
              aria-label="LeetCode"
            >
              <i className="fa-solid fa-code" />
            </a>
            <a
              href="mailto:vivekboga2006@gmail.com"
              title="Email"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope" />
            </a>
            <a
              href="tel:+918121714172"
              title="Phone"
              aria-label="Phone"
            >
              <i className="fa-solid fa-phone" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025–2026 Boga Vivek. Built with MERN Stack (MongoDB, Express, React, Node.js).</p>
          <button
            onClick={scrollToTop}
            className="back-to-top"
            title="Back to top"
            aria-label="Back to top"
          >
            <i className="fa-solid fa-arrow-up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
