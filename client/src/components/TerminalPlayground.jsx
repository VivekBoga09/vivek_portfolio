import React, { useState, useRef, useEffect } from 'react';

const INITIAL_HISTORY = [
  {
    type: 'banner',
    text: `██████╗  ██████╗  ██████╗  █████╗     ██╗   ██╗██╗██╗   ██╗███████╗██╗  ██╗
██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗    ██║   ██║██║██║   ██║██╔════╝██║ ██╔╝
██████╔╝██║   ██║██║  ███╗███████║    ██║   ██║██║██║   ██║█████╗  █████╔╝ 
██╔══██╗██║   ██║██║   ██║██╔══██║    ╚██╗ ██╔╝██║╚██╗ ██╔╝██╔══╝  ██╔═██╗ 
██████╔╝╚██████╔╝╚██████╔╝██║  ██║     ╚████╔╝ ██║ ╚████╔╝ ███████╗██║  ██╗
╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝      ╚═══╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝`
  },
  {
    type: 'system',
    text: "Welcome to Boga Vivek's interactive terminal. Type 'help' or click any quick command chip above."
  },
  {
    type: 'system',
    text: 'Status: Ready for SDE Internships | CGPA: 9.55 / 10 | LeetCode: 1635'
  }
];

export default function TerminalPlayground({ playBlip }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = async (commandToRun) => {
    const rawCmd = (commandToRun || inputVal).trim();
    if (!rawCmd) return;

    playBlip(720);
    setInputVal('');

    if (rawCmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    // Add user line
    const userLine = { type: 'input', text: `vivek@vnr-vjiet:~$ ${rawCmd}` };

    try {
      // Send to MERN backend API
      const response = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: rawCmd })
      });

      if (!response.ok) throw new Error('API response failed');
      const data = await response.json();

      setHistory((prev) => [
        ...prev,
        userLine,
        ...data.output.map((line) => ({ type: 'output', text: line }))
      ]);
    } catch (err) {
      // Local client fallback
      let outputLines = [];
      const cmd = rawCmd.toLowerCase();
      if (cmd === 'help') {
        outputLines = [
          'Available commands:',
          '  whoami       - Display developer summary and profile',
          '  skills       - Print core programming languages and frameworks',
          '  projects     - List featured MERN and automation projects',
          '  education    - Display degrees, college & CGPA score',
          '  leetcode     - View LeetCode contest rating & DSA metrics',
          '  contact      - Display email, phone, LinkedIn & GitHub links',
          '  sudo hire    - Execute hiring sequence for Boga Vivek',
          '  clear        - Clear the terminal console output'
        ];
      } else if (cmd === 'whoami') {
        outputLines = [
          'NAME: Boga Vivek',
          'ROLE: Computer Science Undergraduate (Data Science) & Full-Stack MERN Developer',
          'COLLEGE: VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad',
          'CGPA: 9.55 / 10 | Intermediate: 983 / 1000'
        ];
      } else if (cmd === 'sudo hire') {
        outputLines = [
          '🔐 Authenticating root authorization...',
          '✅ Privilege granted! Boga Vivek is available for Software Engineering Internships.',
          '🚀 Contact initiated: vivekboga2006@gmail.com / +91-8121714172'
        ];
      } else {
        outputLines = [`bash: command not found: ${rawCmd}. Type 'help' for options.`];
      }

      setHistory((prev) => [
        ...prev,
        userLine,
        ...outputLines.map((line) => ({ type: 'output', text: line }))
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand();
    }
  };

  return (
    <section id="terminal-section" className="section terminal-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Interactive Command Line</span>
          <h2 className="section-title">
            Developer <span className="gradient-text">Terminal</span>
          </h2>
          <p className="section-subtitle">
            Powered by the MERN Express backend API. Type commands or click quick action buttons below.
          </p>
        </div>

        <div className="terminal-container glass-card">
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="t-dot t-red" />
              <span className="t-dot t-yellow" />
              <span className="t-dot t-green" />
            </div>
            <div className="terminal-title">
              <i className="fa-solid fa-terminal" /> boga-vivek@portfolio: ~ (zsh)
            </div>
            <div className="terminal-actions">
              <button
                onClick={() => {
                  playBlip(350);
                  setHistory([]);
                }}
                className="terminal-btn"
                title="Clear Terminal"
              >
                <i className="fa-solid fa-eraser" /> Clear
              </button>
            </div>
          </div>

          {/* Quick Command Chips */}
          <div className="terminal-chips">
            <span className="chips-label">Quick Commands:</span>
            {['whoami', 'skills', 'projects', 'leetcode', 'education', 'contact', 'sudo hire', 'help'].map(
              (cmd) => (
                <button
                  key={cmd}
                  className="chip-cmd"
                  onClick={() => runCommand(cmd)}
                >
                  {cmd}
                </button>
              )
            )}
          </div>

          {/* Terminal Body */}
          <div className="terminal-body" ref={terminalBodyRef}>
            {history.map((item, index) => {
              if (item.type === 'banner') {
                return (
                  <div key={index} className="term-line output-text">
                    <span className="term-banner">{item.text}</span>
                  </div>
                );
              }
              if (item.type === 'input') {
                return (
                  <div key={index} className="term-line text-cyan font-bold">
                    {item.text}
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className={`term-line output-text ${item.type === 'system' ? 'text-muted' : ''}`}
                >
                  {item.text}
                </div>
              );
            })}
          </div>

          {/* Terminal Input */}
          <div className="terminal-input-row">
            <span className="prompt-user">vivek@vnr-vjiet</span>:
            <span className="prompt-path">~</span>
            <span className="prompt-sym">$</span>
            <input
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command (e.g. 'help', 'skills', 'projects')..."
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => runCommand()}
              className="terminal-send-btn"
              title="Run command"
            >
              <i className="fa-solid fa-arrow-turn-down" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
