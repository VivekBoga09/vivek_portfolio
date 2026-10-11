import React, { useState, useEffect, useCallback } from 'react';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TerminalPlayground from './components/TerminalPlayground';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CompetitiveCoding from './components/CompetitiveCoding';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import AIAssistant from './components/AIAssistant';
import AccessibilityMenu from './components/AccessibilityMenu';
import CommandPalette from './components/CommandPalette';
import TrafficSimulatorModal from './components/TrafficSimulatorModal';
import AutoScrollWidget from './components/AutoScrollWidget';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [trafficSimOpen, setTrafficSimOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [backendStatus, setBackendStatus] = useState({
    connected: false,
    engine: 'Checking...'
  });

  // Synthesize delicate futuristic UI blip sounds using Web Audio API
  const playBlip = useCallback(
    (freq = 600, duration = 0.06) => {
      if (!soundEnabled) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio error fallback
      }
    },
    [soundEnabled]
  );

  // Toast Notification Dispatcher
  const showToast = useCallback((message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  // One-click copy with toast & feedback
  const copyToClipboard = useCallback(
    (text, label) => {
      playBlip(700);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard: ${text}`);
      } else {
        showToast(`${label}: ${text}`);
      }
    },
    [playBlip, showToast]
  );

  // Check Backend MERN API Health
  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.status === 'online') {
          setBackendStatus({
            connected: true,
            engine: data.database.engine
          });
          console.log('[MERN App] Backend Health OK:', data);
        }
      })
      .catch((err) => {
        console.log('[MERN App] Operating in offline mode:', err);
      });
  }, []);

  // Ambient interactive cursor follower
  useEffect(() => {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    const handleMouseMove = (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      glow.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Global keyboard shortcut for Command Palette: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Accessible Skip Link for Keyboard Navigators */}
      <a href="#main-content" className="skip-to-content">
        Skip to Main Content
      </a>

      {/* Background canvas and glows */}
      <AmbientBackground />
      <div className="cursor-glow" id="cursor-glow" />

      {/* Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
        backendStatus={backendStatus}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playBlip={playBlip}
      />

      {/* Main Content Sections */}
      <main id="main-content" tabIndex="-1">
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          playBlip={playBlip}
        />

        <About
          onOpenResume={() => setResumeOpen(true)}
          copyToClipboard={copyToClipboard}
          playBlip={playBlip}
        />

        <TerminalPlayground playBlip={playBlip} />

        <Skills playBlip={playBlip} />

        <Projects
          onOpenProjectModal={(slug) => setActiveProject(slug)}
          onOpenTrafficSim={() => setTrafficSimOpen(true)}
          playBlip={playBlip}
        />

        <CompetitiveCoding />

        <Education />

        <Contact
          copyToClipboard={copyToClipboard}
          showToast={showToast}
          playBlip={playBlip}
        />
      </main>

      {/* Footer */}
      <Footer playBlip={playBlip} />

      {/* Modals */}
      <ProjectModal
        projectSlug={activeProject}
        onClose={() => setActiveProject(null)}
        playBlip={playBlip}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        playBlip={playBlip}
      />

      {/* Interactive 2D Ambulance Traffic Simulator */}
      <TrafficSimulatorModal
        isOpen={trafficSimOpen}
        onClose={() => setTrafficSimOpen(false)}
        playBlip={playBlip}
      />

      {/* Futuristic Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAI={() => {}}
        onOpenA11y={() => {}}
        playBlip={playBlip}
      />

      {/* Bottom Right Floating Dock (A11y & VivekAI paired cleanly side-by-side) */}
      <div className="bottom-right-actions-dock">
        <AccessibilityMenu
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          playBlip={playBlip}
        />
        <AIAssistant playBlip={playBlip} />
      </div>

      {/* Auto Scroll Showcase Tour Dock (Left Dock) */}
      <AutoScrollWidget playBlip={playBlip} showToast={showToast} />

      {/* Toast Container */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <i className="fa-solid fa-circle-check" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
