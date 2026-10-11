import React, { useState, useEffect, useRef } from 'react';

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onOpenAI,
  onOpenA11y,
  playBlip
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const COMMANDS = [
    {
      id: 'projects',
      title: 'Jump to Projects',
      desc: 'Amazon Price Tracker, JPMorgan Platform, Ambulance Corridor',
      category: 'Navigation',
      icon: 'fa-solid fa-folder-open',
      action: () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'jpmorgan',
      title: 'JPMorgan Chase Code for Good 2026',
      desc: 'View project details & Bikiran Foundation collaboration',
      category: 'Experience',
      icon: 'fa-solid fa-award text-yellow',
      action: () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'skills',
      title: 'Jump to Technical Skills',
      desc: 'MERN stack, Java, Python, C++, MongoDB, Postman',
      category: 'Navigation',
      icon: 'fa-solid fa-code text-cyan',
      action: () => {
        const el = document.getElementById('skills');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'icpc',
      title: 'Competitive Coding & ICPC Track',
      desc: 'DSA problem solving, ICPC contest participation, algorithms',
      category: 'Experience',
      icon: 'fa-solid fa-trophy text-purple',
      action: () => {
        const el = document.getElementById('competitive');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'education',
      title: 'Education & 9.55 CGPA Standing',
      desc: 'VNR VJIET (B.Tech CSE Data Science) & Sri Chaitanya (983/1000)',
      category: 'Academics',
      icon: 'fa-solid fa-graduation-cap text-green',
      action: () => {
        const el = document.getElementById('education');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'autoscroll',
      title: 'Start Hands-Free Auto-Scroll Tour',
      desc: 'Automatic presentation tour across projects, skills & achievements',
      category: 'Showcase',
      icon: 'fa-solid fa-circle-play text-cyan',
      action: () => {
        const btn = document.querySelector('.auto-scroll-launch-btn') || document.getElementById('auto-scroll-launch-btn');
        if (btn) btn.click();
      }
    },
    {
      id: 'resume',
      title: 'View Official Resume',
      desc: 'Open formatted, printable verified resume sheet',
      category: 'Documents',
      icon: 'fa-solid fa-file-pdf text-red',
      action: () => onOpenResume()
    },
    {
      id: 'ai-assistant',
      title: 'Ask VivekAI Copilot',
      desc: 'Launch conversational recruiter intelligence agent',
      category: 'AI Tools',
      icon: 'fa-solid fa-brain text-cyan',
      action: () => onOpenAI()
    },
    {
      id: 'accessibility',
      title: 'Open Accessibility Center (A11y)',
      desc: 'High contrast, text scaling, Dyslexia mode, speech narration',
      category: 'A11y',
      icon: 'fa-solid fa-universal-access text-yellow',
      action: () => onOpenA11y()
    },
    {
      id: 'contact',
      title: 'Send Message / Hire Vivek',
      desc: 'Get in touch via Gmail & direct contact form',
      category: 'Contact',
      icon: 'fa-solid fa-paper-plane text-cyan',
      action: () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'gmail-compose',
      title: 'Compose Directly in Gmail Web',
      desc: 'Open mail.google.com with pre-addressed email to Vivek',
      category: 'Contact',
      icon: 'fa-brands fa-google text-red',
      action: () => {
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=vivekboga2006@gmail.com', '_blank');
      }
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      desc: 'github.com/VivekBoga09 (Repositories, open source contributions)',
      category: 'External',
      icon: 'fa-brands fa-github',
      action: () => {
        window.open('https://github.com/VivekBoga09', '_blank');
      }
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      desc: 'linkedin.com/in/vivekboga (Professional network & recommendations)',
      category: 'External',
      icon: 'fa-brands fa-linkedin text-blue',
      action: () => {
        window.open('https://linkedin.com/in/vivekboga', '_blank');
      }
    }
  ];

  const filteredCommands = COMMANDS.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.desc.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      if (playBlip) playBlip(480, 0.03);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      if (playBlip) playBlip(480, 0.03);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        if (playBlip) playBlip(750);
        filteredCommands[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active palette-backdrop" onClick={onClose}>
      <div
        className="modal-dialog glass-card command-palette-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        <div className="palette-search-wrap">
          <i className="fa-solid fa-magnifying-glass palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="palette-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section (e.g. projects, jpmorgan, 3D, resume)..."
            aria-label="Search portfolio commands"
          />
          <span className="palette-kbd-badge">ESC to close</span>
        </div>

        <div className="palette-results-list" role="listbox">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.id}
                role="option"
                aria-selected={idx === selectedIndex}
                className={`palette-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => {
                  if (playBlip) playBlip(750);
                  cmd.action();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="palette-item-icon">
                  <i className={cmd.icon} />
                </div>
                <div className="palette-item-info">
                  <span className="palette-item-title">{cmd.title}</span>
                  <span className="palette-item-desc">{cmd.desc}</span>
                </div>
                <span className="palette-item-category">{cmd.category}</span>
              </div>
            ))
          ) : (
            <div className="palette-empty-state">
              <i className="fa-solid fa-ghost" />
              <span>No matching commands found for "{query}"</span>
            </div>
          )}
        </div>

        <div className="palette-footer">
          <div className="palette-shortcuts">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
          <span className="palette-hint-brand">Boga Vivek • Portfolio Omnibar</span>
        </div>
      </div>
    </div>
  );
}
