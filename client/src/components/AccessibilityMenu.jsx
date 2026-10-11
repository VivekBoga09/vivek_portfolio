import React, { useState, useEffect, useCallback } from 'react';

export default function AccessibilityMenu({ soundEnabled, setSoundEnabled, playBlip }) {
  const [isOpen, setIsOpen] = useState(false);

  // Accessibility State with localStorage persistence
  const [contrast, setContrast] = useState(() => localStorage.getItem('a11y_contrast') || 'default');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('a11y_font_size') || 'normal');
  const [isDyslexic, setIsDyslexic] = useState(() => localStorage.getItem('a11y_dyslexia') === 'true');
  const [reduceMotion, setReduceMotion] = useState(() => localStorage.getItem('a11y_reduce_motion') === 'true');
  const [readingRuler, setReadingRuler] = useState(() => localStorage.getItem('a11y_reading_ruler') === 'true');
  const [highlightLinks, setHighlightLinks] = useState(() => localStorage.getItem('a11y_highlight_links') === 'true');
  const [bigCursor, setBigCursor] = useState(() => localStorage.getItem('a11y_big_cursor') === 'true');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rulerTop, setRulerTop] = useState(200);

  // Sync to documentElement attributes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-contrast', contrast);
    root.setAttribute('data-font-size', fontSize);
    root.setAttribute('data-dyslexia', isDyslexic ? 'true' : 'false');
    root.setAttribute('data-reduce-motion', reduceMotion ? 'true' : 'false');
    root.setAttribute('data-highlight-links', highlightLinks ? 'true' : 'false');
    root.setAttribute('data-big-cursor', bigCursor ? 'true' : 'false');

    localStorage.setItem('a11y_contrast', contrast);
    localStorage.setItem('a11y_font_size', fontSize);
    localStorage.setItem('a11y_dyslexia', isDyslexic);
    localStorage.setItem('a11y_reduce_motion', reduceMotion);
    localStorage.setItem('a11y_reading_ruler', readingRuler);
    localStorage.setItem('a11y_highlight_links', highlightLinks);
    localStorage.setItem('a11y_big_cursor', bigCursor);
  }, [contrast, fontSize, isDyslexic, reduceMotion, readingRuler, highlightLinks, bigCursor]);

  // Reading Ruler cursor tracker
  useEffect(() => {
    if (!readingRuler) return;
    const handleMouseMove = (e) => {
      setRulerTop(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [readingRuler]);

  // Keyboard shortcut: Alt + A to toggle Accessibility Menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Screen Reader Speech Synthesis Narration
  const handleToggleSpeech = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const summaryText = `Boga Vivek. Computer Science and Engineering Data Science undergraduate at VNR VJIET with a 9.55 out of 10 CGPA.
Selected for JPMorgan Chase Code for Good 2026 Hyderabad, collaborating on a student career platform for Bikiran Foundation.
ICPC competitive programmer, full-stack MERN developer skilled in React, Node, Express, MongoDB, Python, Java, and Puppeteer automation.
Featured projects include Amazon Price Tracking System with Chrome Extension, Student Career Discovery Platform, and Ambulance Priority Traffic Control System.`;

    const utterance = new SpeechSynthesisUtterance(summaryText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [isSpeaking]);

  // Reset All to Default
  const handleResetDefaults = () => {
    if (playBlip) playBlip(500);
    setContrast('default');
    setFontSize('normal');
    setIsDyslexic(false);
    setReduceMotion(false);
    setReadingRuler(false);
    setHighlightLinks(false);
    setBigCursor(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Interactive Reading Ruler Guide Bar */}
      {readingRuler && (
        <div
          className="a11y-reading-ruler"
          style={{ top: `${rulerTop}px` }}
          aria-hidden="true"
        />
      )}

      {/* Floating Accessibility Trigger Button (Left Edge) */}
      <div className="a11y-floating-trigger-wrap">
        <button
          className="a11y-floating-btn"
          onClick={() => {
            if (playBlip) playBlip(650);
            setIsOpen(!isOpen);
          }}
          aria-label="Open Accessibility Menu (Alt + A)"
          title="Accessibility Controls (Alt + A)"
        >
          <i className="fa-solid fa-universal-access" />
          <span className="a11y-trigger-label">A11y</span>
        </button>
      </div>

      {/* Accessibility Drawer / Modal */}
      {isOpen && (
        <div className="modal-backdrop active" onClick={() => setIsOpen(false)}>
          <div
            className="modal-dialog glass-card a11y-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Accessibility Options Panel"
          >
            {/* Header */}
            <div className="modal-header a11y-modal-header">
              <div className="a11y-header-title">
                <i className="fa-solid fa-universal-access text-cyan" />
                <div>
                  <h3>Accessibility Center</h3>
                  <p className="a11y-sub">Inclusive viewing, neurodivergent reading tools & narration</p>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close Accessibility Menu"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body a11y-modal-body">
              {/* SECTION 1: CONTRAST & THEME */}
              <div className="a11y-control-group">
                <div className="a11y-group-title">
                  <i className="fa-solid fa-circle-half-stroke text-yellow" /> Contrast & Vision
                </div>
                <div className="a11y-button-grid">
                  <button
                    className={`a11y-btn ${contrast === 'default' ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(700); setContrast('default'); }}
                  >
                    <i className="fa-solid fa-palette" /> Default Cyber
                  </button>
                  <button
                    className={`a11y-btn ${contrast === 'high-dark' ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(700); setContrast('high-dark'); }}
                  >
                    <i className="fa-solid fa-moon" /> High Contrast Dark
                  </button>
                  <button
                    className={`a11y-btn ${contrast === 'high-light' ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(700); setContrast('high-light'); }}
                  >
                    <i className="fa-solid fa-sun" /> High Contrast Light
                  </button>
                  <button
                    className={`a11y-btn ${contrast === 'monochrome' ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(700); setContrast('monochrome'); }}
                  >
                    <i className="fa-solid fa-eye-slash" /> Monochromatic
                  </button>
                </div>
              </div>

              {/* SECTION 2: TEXT SIZING */}
              <div className="a11y-control-group">
                <div className="a11y-group-title">
                  <i className="fa-solid fa-font text-cyan" /> Text Size Scaling
                </div>
                <div className="a11y-button-grid four-cols">
                  <button
                    className={`a11y-btn ${fontSize === 'normal' ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(720); setFontSize('normal'); }}
                  >
                    100% Normal
                  </button>
                  <button
                    className={`a11y-btn ${fontSize === 'medium' ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(720); setFontSize('medium'); }}
                  >
                    115% Large
                  </button>
                  <button
                    className={`a11y-btn ${fontSize === 'large' ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(720); setFontSize('large'); }}
                  >
                    130% X-Large
                  </button>
                  <button
                    className={`a11y-btn ${fontSize === 'xlarge' ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(720); setFontSize('xlarge'); }}
                  >
                    145% Huge
                  </button>
                </div>
              </div>

              {/* SECTION 3: READING & COGNITIVE AIDS */}
              <div className="a11y-control-group">
                <div className="a11y-group-title">
                  <i className="fa-solid fa-book-open-reader text-purple" /> Reading & Visual Assistance
                </div>
                <div className="a11y-toggles-grid">
                  <button
                    className={`a11y-toggle-btn ${isDyslexic ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(740); setIsDyslexic(!isDyslexic); }}
                  >
                    <div className="toggle-info">
                      <span className="toggle-title">Dyslexia-Friendly Typography</span>
                      <span className="toggle-desc">Expanded character spacing and high-legibility letterforms</span>
                    </div>
                    <span className="toggle-badge">{isDyslexic ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    className={`a11y-toggle-btn ${readingRuler ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(740); setReadingRuler(!readingRuler); }}
                  >
                    <div className="toggle-info">
                      <span className="toggle-title">Reading Ruler / Focus Line</span>
                      <span className="toggle-desc">Horizontal guided line that follows your cursor</span>
                    </div>
                    <span className="toggle-badge">{readingRuler ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    className={`a11y-toggle-btn ${highlightLinks ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(740); setHighlightLinks(!highlightLinks); }}
                  >
                    <div className="toggle-info">
                      <span className="toggle-title">Highlight Links & Clickables</span>
                      <span className="toggle-desc">High-contrast bright outlines around interactive controls</span>
                    </div>
                    <span className="toggle-badge">{highlightLinks ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    className={`a11y-toggle-btn ${reduceMotion ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(740); setReduceMotion(!reduceMotion); }}
                  >
                    <div className="toggle-info">
                      <span className="toggle-title">Pause Motion & Glows</span>
                      <span className="toggle-desc">Suppresses animations, particle drift, and flashing elements</span>
                    </div>
                    <span className="toggle-badge">{reduceMotion ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    className={`a11y-toggle-btn ${bigCursor ? 'active' : ''}`}
                    onClick={() => { if (playBlip) playBlip(740); setBigCursor(!bigCursor); }}
                  >
                    <div className="toggle-info">
                      <span className="toggle-title">High-Visibility Big Cursor</span>
                      <span className="toggle-desc">Enlarged cursor indicator for easy mouse tracking</span>
                    </div>
                    <span className="toggle-badge">{bigCursor ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              {/* SECTION 4: TEXT TO SPEECH NARRATOR */}
              <div className="a11y-control-group">
                <div className="a11y-group-title">
                  <i className="fa-solid fa-volume-high text-cyan" /> Voice Narration & Audio
                </div>
                <div className="a11y-audio-row">
                  <button
                    className={`btn ${isSpeaking ? 'btn-danger' : 'btn-primary'} a11y-speech-btn`}
                    onClick={handleToggleSpeech}
                  >
                    <i className={`fa-solid ${isSpeaking ? 'fa-stop' : 'fa-play'}`} />
                    <span>{isSpeaking ? 'Stop Reading Aloud' : 'Read Page Overview Aloud'}</span>
                  </button>

                  <button
                    className={`a11y-sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
                    onClick={() => {
                      if (playBlip) playBlip(600);
                      setSoundEnabled(!soundEnabled);
                    }}
                  >
                    <i className={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`} />
                    <span>UI Sound Effects: {soundEnabled ? 'ON' : 'MUTED'}</span>
                  </button>
                </div>
              </div>

              {/* SECTION 5: KEYBOARD NAVIGATION REFERENCE */}
              <div className="a11y-control-group a11y-kbd-card">
                <div className="a11y-group-title">
                  <i className="fa-solid fa-keyboard text-green" /> Accessible Keyboard Shortcuts
                </div>
                <div className="a11y-kbd-grid">
                  <div><kbd>Alt + A</kbd> Toggle Accessibility Menu</div>
                  <div><kbd>Tab</kbd> Navigate interactive controls</div>
                  <div><kbd>Enter / Space</kbd> Activate focused button</div>
                  <div><kbd>Esc</kbd> Dismiss modal or drawer</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer a11y-modal-footer">
              <button className="btn btn-secondary" onClick={handleResetDefaults}>
                <i className="fa-solid fa-rotate-left" /> Reset All to Defaults
              </button>
              <button className="btn btn-primary" onClick={() => setIsOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
