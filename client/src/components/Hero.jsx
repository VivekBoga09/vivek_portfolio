import React, { useState, useEffect, useRef } from 'react';

const TYPING_PHRASES = [
  'JPMorgan Chase Code for Good 2026',
  'CSE (Data Science) Undergrad (CGPA 9.55)',
  'Full-Stack MERN Developer',
  'ICPC Programming Contestant',
  'Chrome Extension & Automation Builder'
];

export default function Hero({ onOpenResume, playBlip }) {
  const [photoMode, setPhotoMode] = useState('real');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const avatarCardRef = useRef(null);

  // Typewriting effect
  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentPhrase.substring(0, displayText.length - 1)
          : currentPhrase.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  // 3D Tilt effect on the avatar card
  const handleMouseMove = (e) => {
    const card = avatarCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = avatarCardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          {/* Live Status Badge */}
          <div className="hero-badge-group">
            <div className="hero-badge cfg-badge">
              <span className="pulse-dot-gold" />
              <span>JPMorgan Chase Code for Good 2026 Participant</span>
            </div>
            <div className="hero-badge avail-sub-badge">
              <span className="pulse-dot" />
              <span>Available for SDE Internships</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Boga Vivek</span>
          </h1>

          <div className="hero-role-tag">
            <i className="fa-solid fa-graduation-cap text-cyan" /> CSE (Data Science) Undergraduate • VNR VJIET
          </div>

          {/* Dynamic Typist */}
          <div className="hero-typing-wrapper">
            <span className="typing-prefix">I am a </span>
            <span className="typing-text">{displayText}</span>
            <span className="typing-cursor">|</span>
          </div>

          {/* Summary */}
          <p className="hero-desc">
            Computer Science and Engineering (Data Science) undergraduate at{' '}
            <strong>VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad</strong>{' '}
            (CGPA: <strong>9.55 / 10</strong>). Proficient in <strong>React.js, Node.js, Express.js, and MongoDB</strong>,
            eager to apply technical and problem-solving skills to build scalable software solutions.
          </p>

          {/* Quick Metrics */}
          <div className="hero-metrics">
            <div className="metric-chip">
              <i className="fa-solid fa-graduation-cap metric-icon" />
              <div className="metric-info">
                <span className="metric-val">9.55</span>
                <span className="metric-label">CGPA @ VNR VJIET</span>
              </div>
            </div>
            <div className="metric-chip">
              <i className="fa-solid fa-award metric-icon text-yellow" />
              <div className="metric-info">
                <span className="metric-val">CFG 2026</span>
                <span className="metric-label">JPMorgan Chase</span>
              </div>
            </div>
            <div className="metric-chip">
              <i className="fa-solid fa-code metric-icon text-purple" />
              <div className="metric-info">
                <span className="metric-val">ICPC</span>
                <span className="metric-label">Contestant & DSA</span>
              </div>
            </div>
            <div className="metric-chip">
              <i className="fa-brands fa-react metric-icon" />
              <div className="metric-info">
                <span className="metric-val">MERN</span>
                <span className="metric-label">Full-Stack Stack</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-ctas">
            <a
              href="#projects"
              className="btn btn-primary hero-btn"
              onClick={() => playBlip(550)}
            >
              <span>Explore Projects</span>
              <i className="fa-solid fa-arrow-right" />
            </a>
            <button
              onClick={() => {
                playBlip(600);
                onOpenResume();
              }}
              className="btn btn-secondary hero-btn"
            >
              <i className="fa-solid fa-file-pdf" />
              <span>View Resume</span>
            </button>
            <a
              href="#contact"
              className="btn btn-outline hero-btn"
              onClick={() => playBlip(480)}
            >
              <i className="fa-solid fa-envelope" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="hero-socials">
            <a
              href="https://github.com/VivekBoga09"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title="GitHub: VivekBoga09"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github" />
            </a>
            <a
              href="https://linkedin.com/in/vivekboga"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title="LinkedIn: vivekboga"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin" />
            </a>
            <a
              href="mailto:vivekboga2006@gmail.com"
              className="social-icon"
              title="Email: vivekboga2006@gmail.com"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope" />
            </a>
            <a
              href="tel:+918121714172"
              className="social-icon"
              title="Phone: +91-8121714172"
              aria-label="Phone"
            >
              <i className="fa-solid fa-phone" />
            </a>
          </div>
        </div>

        {/* 3D Card / Profile Photo with Live Switcher ON TOP */}
        <div className="hero-visual">
          <div className="avatar-card-wrapper">
            {/* Toggle Bar positioned ON TOP of Photo */}
            <div className="photo-mode-toggle-top">
              <button
                type="button"
                className={`photo-switch-btn ${photoMode === 'real' ? 'active' : ''}`}
                onClick={() => {
                  if (playBlip) playBlip(600);
                  setPhotoMode('real');
                }}
                title="Show Real LinkedIn Photo"
              >
                <i className="fa-solid fa-camera" /> Real Photo
              </button>
              <button
                type="button"
                className={`photo-switch-btn ${photoMode === 'avatar' ? 'active' : ''}`}
                onClick={() => {
                  if (playBlip) playBlip(650);
                  setPhotoMode('avatar');
                }}
                title="Show 3D Pixar Avatar"
              >
                <i className="fa-solid fa-cube" /> 3D Avatar
              </button>
            </div>

            <div
              className="avatar-card"
              ref={avatarCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="avatar-glow-ring" />
              <div className="avatar-image-container">
                <img
                  src={photoMode === 'real' ? '/assets/images/linkedin_photo.jpg' : '/assets/images/avatar.jpg'}
                  alt="Boga Vivek - Computer Science Undergraduate"
                  className="avatar-img"
                  width="450"
                  height="450"
                  loading="eager"
                />
              </div>

              {/* Floating Badges */}
              <div className="floating-badge badge-top-right">
                <i className="fa-brands fa-react" /> MERN Stack
              </div>
              <div className="floating-badge badge-mid-left">
                <i className="fa-solid fa-award text-yellow" /> Code for Good 2026
              </div>
              <div className="floating-badge badge-bottom-right">
                <i className="fa-solid fa-shield-halved" /> 9.55 CGPA
              </div>
              <div className="floating-badge badge-bottom-left">
                <i className="fa-solid fa-brain" /> ICPC Contestant
              </div>

              <div className="card-scanline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
