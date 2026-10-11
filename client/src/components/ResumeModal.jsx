import React, { useState } from 'react';

export default function ResumeModal({ isOpen, onClose, playBlip }) {
  const [roleFilter, setRoleFilter] = useState('all'); // 'all' | 'mern' | 'backend' | 'dsa'

  if (!isOpen) return null;

  const handlePrint = () => {
    if (playBlip) playBlip(650);
    const resumeEl = document.getElementById('printable-resume');
    if (!resumeEl) {
      window.print();
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Boga_Vivek_Resume</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #0f172a;
              background: #ffffff;
              padding: 10mm 14mm;
              font-size: 9.5pt;
              line-height: 1.35;
              width: 100%;
            }
            @page {
              size: A4 portrait;
              margin: 8mm 12mm;
            }
            .res-header {
              border-bottom: 2pt solid #0f172a;
              padding-bottom: 6pt;
              margin-bottom: 8pt;
            }
            .res-name {
              font-size: 20pt;
              font-weight: 800;
              color: #0f172a;
              letter-spacing: 0.5px;
              margin-bottom: 2pt;
              line-height: 1.1;
            }
            .res-subtitle {
              font-size: 9.5pt;
              font-weight: 600;
              color: #334155;
              margin-bottom: 4pt;
            }
            .res-contact-bar {
              display: flex;
              flex-wrap: wrap;
              gap: 12pt;
              font-size: 8.5pt;
              color: #475569;
            }
            .res-contact-bar i {
              display: none;
            }
            .res-section {
              margin-bottom: 8pt;
              page-break-inside: avoid;
            }
            .res-section-title {
              font-size: 10pt;
              font-weight: 800;
              color: #0f172a;
              border-bottom: 1pt solid #cbd5e1;
              padding-bottom: 2pt;
              margin-bottom: 4pt;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .res-entry {
              margin-bottom: 6pt;
              page-break-inside: avoid;
            }
            .res-entry-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              font-size: 9pt;
              margin-bottom: 1.5pt;
            }
            .res-entry-header strong {
              color: #0f172a;
              font-weight: 700;
            }
            .res-entry-header em {
              color: #475569;
              font-style: italic;
            }
            .res-entry-right {
              text-align: right;
              font-size: 8.5pt;
            }
            .res-badge {
              background: #f1f5f9;
              color: #0f172a;
              border: 1pt solid #cbd5e1;
              padding: 1pt 5pt;
              border-radius: 3pt;
              font-size: 8pt;
              font-weight: 700;
            }
            .res-tech-line {
              font-size: 8pt;
              color: #475569;
              font-style: italic;
            }
            .res-bullets {
              padding-left: 14pt;
              margin-top: 2pt;
              margin-bottom: 3pt;
            }
            .res-bullets li {
              font-size: 8.2pt;
              line-height: 1.35;
              margin-bottom: 2pt;
              color: #1e293b;
            }
            .res-skills-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 2.5pt;
              font-size: 8.2pt;
              line-height: 1.35;
            }
            .res-text {
              font-size: 8.2pt;
              line-height: 1.35;
              color: #1e293b;
            }
            a {
              color: #0f172a;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          ${resumeEl.innerHTML}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 3500);
    }, 400);
  };

  return (
    <div className="modal-backdrop active" id="modal-resume" onClick={onClose}>
      <div
        className="modal-dialog glass-card resume-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-tag">Official Document</span>
            <h3 className="modal-title">Boga Vivek — Verified Software Engineer Resume</h3>
          </div>
          <div className="resume-modal-actions">
            <a
              href="/assets/Boga_Vivek_Resume.pdf"
              download="Boga_Vivek_Resume.pdf"
              className="btn btn-sm btn-primary"
              title="Download Verified PDF Resume directly"
              onClick={() => { if (playBlip) playBlip(750); }}
            >
              <i className="fa-solid fa-file-arrow-down" /> Download PDF
            </a>
            <button
              onClick={handlePrint}
              className="btn btn-sm btn-outline"
              title="Print or Save Tailored ATS View"
            >
              <i className="fa-solid fa-print" /> Print ATS View
            </button>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              &times;
            </button>
          </div>
        </div>

        {/* Role Tailored Filter Toolbar */}
        <div className="resume-tailor-toolbar">
          <span className="tailor-label">
            <i className="fa-solid fa-filter text-cyan" /> Tailor for Position:
          </span>
          <div className="tailor-btn-group">
            <button
              className={`tailor-btn ${roleFilter === 'all' ? 'active' : ''}`}
              onClick={() => { if (playBlip) playBlip(500); setRoleFilter('all'); }}
            >
              Master Resume
            </button>
            <button
              className={`tailor-btn ${roleFilter === 'mern' ? 'active' : ''}`}
              onClick={() => { if (playBlip) playBlip(500); setRoleFilter('mern'); }}
            >
              Full-Stack MERN
            </button>
            <button
              className={`tailor-btn ${roleFilter === 'backend' ? 'active' : ''}`}
              onClick={() => { if (playBlip) playBlip(500); setRoleFilter('backend'); }}
            >
              Backend & APIs
            </button>
            <button
              className={`tailor-btn ${roleFilter === 'dsa' ? 'active' : ''}`}
              onClick={() => { if (playBlip) playBlip(500); setRoleFilter('dsa'); }}
            >
              Algorithms & ICPC
            </button>
          </div>
        </div>

        <div className="modal-body resume-modal-body">
          <div className={`resume-sheet tailor-${roleFilter}`} id="printable-resume">
            {/* Header */}
            <header className="res-header">
              <h1 className="res-name">BOGA VIVEK</h1>
              <div className="res-subtitle">
                CSE (Data Science) Undergraduate • Full-Stack Developer
              </div>
              <div className="res-contact-bar">
                <span><i className="fa-solid fa-phone" /> +91-8121714172</span>
                <span><i className="fa-solid fa-envelope" /> vivekboga2006@gmail.com</span>
                <span><i className="fa-brands fa-linkedin" /> linkedin.com/in/vivekboga</span>
                <span><i className="fa-brands fa-github" /> github.com/VivekBoga09</span>
              </div>
            </header>

            {/* Summary */}
            <section className="res-section">
              <h2 className="res-section-title">SUMMARY</h2>
              <p className="res-text">
                Computer Science and Engineering (Data Science) undergraduate with a foundation in Data Structures,
                Algorithms, and Full-Stack Web Development. Proficient in React.js, Node.js, Express.js, and MongoDB, eager to
                apply technical and problem-solving skills to build scalable software solutions.
              </p>
            </section>

            {/* Education */}
            <section className="res-section">
              <h2 className="res-section-title">EDUCATION</h2>
              <div className="res-entry">
                <div className="res-entry-header">
                  <div>
                    <strong>B.Tech in Computer Science and Engineering (Data Science)</strong><br />
                    <em>VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad</em>
                  </div>
                  <div className="res-entry-right">
                    <span>2024–2028</span><br />
                    <strong className="res-badge">CGPA: 9.55 / 10</strong>
                  </div>
                </div>
              </div>

              <div className="res-entry">
                <div className="res-entry-header">
                  <div>
                    <strong>Intermediate</strong><br />
                    <em>Sri Chaitanya College</em>
                  </div>
                  <div className="res-entry-right">
                    <span>2022–2024</span><br />
                    <strong className="res-badge">Marks: 983 / 1000</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="res-section">
              <h2 className="res-section-title">PROJECTS</h2>

              {/* Amazon Price Tracker */}
              <div className="res-entry">
                <div className="res-entry-header">
                  <div>
                    <strong>Amazon Price Tracking System (Chrome Extension)</strong>
                    <span className="res-tech-line"> | MERN, Puppeteer, Node-Cron</span>
                  </div>
                  <div className="res-entry-right">
                    <a href="https://github.com/VivekBoga09" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
                <ul className="res-bullets">
                  <li>Engineered a full-stack MERN application to monitor Amazon product prices and track price fluctuations in real time.</li>
                  <li>Developed a Chrome Extension that streamlines product tracking by allowing users to add Amazon products directly from product pages through RESTful API integration.</li>
                  <li>Automated product price monitoring using Puppeteer and Node-cron, delivering real-time price-drop notifications through Telegram Bot API.</li>
                </ul>
              </div>

              {/* Student Career Discovery */}
              <div className="res-entry">
                <div className="res-entry-header">
                  <div>
                    <strong>Student Career Discovery & Guidance Platform</strong>
                    <span className="res-tech-line"> | React, Tailwind CSS, Node.js, Express.js, MongoDB, Firebase</span>
                  </div>
                  <div className="res-entry-right">
                    <a href="https://github.com/VivekBoga09" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
                <ul className="res-bullets">
                  <li>Developed backend services for a career guidance platform for Class 9–12 students in collaboration with JPMorgan Chase & Co. and Bikiran Foundation.</li>
                  <li>Built and integrated REST APIs with the React frontend for assessments, career profiles, and student progress.</li>
                  <li>Bridged the career-guidance gap for rural and semi-urban students by providing accessible resources, career exploration, and mentor-support pathways.</li>
                </ul>
              </div>

              {/* Ambulance Priority */}
              <div className="res-entry">
                <div className="res-entry-header">
                  <div>
                    <strong>Ambulance Priority Traffic Control System</strong>
                    <span className="res-tech-line"> | React, JavaScript, Express.js, Node.js, MongoDB</span>
                  </div>
                  <div className="res-entry-right">
                    <a href="https://github.com/VivekBoga09" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
                <ul className="res-bullets">
                  <li>Designed a smart traffic management system that generates automatic green corridors for ambulances during emergencies.</li>
                  <li>Constructed RESTful APIs using Node.js and Express.js and integrated MongoDB to manage traffic signal data and ambulance detection requests.</li>
                  <li>Implemented intelligent signal-prioritization logic to detect approaching ambulances and dynamically regulate traffic flow at intersections.</li>
                </ul>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="res-section">
              <h2 className="res-section-title">TECHNICAL SKILLS</h2>
              <div className="res-skills-grid">
                <div><strong>Programming Languages:</strong> Java, Python, JavaScript, C++, SQL</div>
                <div><strong>Web Technologies:</strong> HTML, CSS, React.js, Node.js, Express.js</div>
                <div><strong>Databases:</strong> MySQL, MongoDB</div>
                <div><strong>Developer Tools:</strong> Git, GitHub, VS Code, Postman</div>
                <div><strong>Other:</strong> REST APIs, Puppeteer, Chrome Extensions, Node-cron</div>
              </div>
            </section>

            {/* Coursework */}
            <section className="res-section">
              <h2 className="res-section-title">RELEVANT COURSEWORK</h2>
              <p className="res-text">
                Data Structures and Algorithms, Database Management Systems, Object-Oriented Programming, Operating Systems, Design and Analysis of Algorithms
              </p>
            </section>

            {/* Certifications & Training */}
            <section className="res-section">
              <h2 className="res-section-title">CERTIFICATIONS & TRAINING</h2>
              <ul className="res-bullets">
                <li><strong>Software Engineering Program – JPMorgan Chase & Co. (Forage)</strong></li>
                <li><strong>Digital Transformation Simulation – ServiceNow & SmartBridge</strong></li>
                <li><strong>Python Programming – HackerRank</strong></li>
                <li><strong>Introduction to Generative AI – IBM</strong></li>
              </ul>
            </section>

            {/* Achievements & Activities */}
            <section className="res-section">
              <h2 className="res-section-title">ACHIEVEMENTS & ACTIVITIES</h2>
              <ul className="res-bullets">
                <li>Selected to participate in <strong>JPMorgan Chase Code for Good 2026 – Hyderabad</strong>, collaborating on a technology solution for Bikiran Foundation.</li>
                <li>Active competitive programmer with a strong focus on Data Structures and Algorithms.</li>
                <li>Participated in <strong>ICPC programming contests</strong>, applying DSA to competitive problem-solving.</li>
                <li>Member, <strong>VJ Data Questers</strong> & <strong>Student Force</strong>, VNR VJIET.</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handlePrint} className="btn btn-primary">
            <i className="fa-solid fa-print" /> Print / Save as PDF
          </button>
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
