import React from 'react';

export default function About({ onOpenResume, copyToClipboard, playBlip }) {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Background & Core Focus</span>
          <h2 className="section-title">
            About <span className="gradient-text">Boga Vivek</span>
          </h2>
          <p className="section-subtitle">
            Bridging strong theoretical computer science foundations with pragmatic full-stack architecture.
          </p>
        </div>

        <div className="about-grid">
          {/* Main Biography Card */}
          <div className="glass-card about-card-main">
            <h3 className="card-heading">
              <i className="fa-solid fa-compass" /> Engineering Vision & Background
            </h3>
            <p>
              I am a <strong>Computer Science and Engineering (Data Science)</strong> undergraduate at{' '}
              <span className="highlight-text">
                VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad
              </span>{' '}
              (2024–2028), maintaining an academic standing of <strong>CGPA 9.55 / 10</strong>, paired with an outstanding Intermediate score of <strong>983 / 1000 (98.3%)</strong> from Sri Chaitanya College.
            </p>
            <p>
              I possess a strong foundation in <strong>Data Structures, Algorithms, and Full-Stack Web Development</strong>.
              I am proficient in <strong>React.js, Node.js, Express.js, and MongoDB</strong>, and eager to apply technical and problem-solving skills to build scalable software solutions.
            </p>
            <p>
              Recently selected to participate in the prestigious <strong>JPMorgan Chase Code for Good 2026 – Hyderabad</strong>,
              collaborating on high-impact technology solutions for the <strong>Bikiran Foundation</strong>.
            </p>

            <div className="about-highlights-list">
              <div className="highlight-item">
                <i className="fa-solid fa-award text-yellow" />
                <div>
                  <strong>JPMorgan Chase Code for Good 2026:</strong> Selected to engineer full-stack solutions for Bikiran Foundation in Hyderabad.
                </div>
              </div>
              <div className="highlight-item">
                <i className="fa-solid fa-code text-cyan" />
                <div>
                  <strong>ICPC & Competitive Programming:</strong> Participated in ICPC programming contests, applying algorithmic problem-solving in C++ and Java.
                </div>
              </div>
              <div className="highlight-item">
                <i className="fa-solid fa-users text-green" />
                <div>
                  <strong>Leadership & Campus Activities:</strong> Member of <strong>VJ Data Questers</strong> & <strong>Student Force</strong>, VNR VJIET.
                </div>
              </div>
              <div className="highlight-item">
                <i className="fa-solid fa-circle-check text-emerald" />
                <div>
                  <strong>Rigorous Coursework:</strong> DSA, Database Management Systems, Object-Oriented Programming, Operating Systems, and Design & Analysis of Algorithms.
                </div>
              </div>
            </div>

            <div className="about-actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  playBlip(620);
                  onOpenResume();
                }}
              >
                <i className="fa-solid fa-file-arrow-down" /> View & Print Resume
              </button>
              <a
                href="#contact"
                className="btn btn-outline"
                onClick={() => playBlip(500)}
              >
                <i className="fa-solid fa-handshake" /> Let's Connect
              </a>
            </div>
          </div>

          {/* Quick Info & Tech Cloud Sidebar */}
          <div className="about-sidebar">
            <div className="glass-card side-info-card">
              <h4 className="side-card-title">
                <i className="fa-solid fa-id-card" /> Quick Contact Info
              </h4>
              <ul className="info-list">
                <li>
                  <span className="info-label">
                    <i className="fa-solid fa-envelope" /> Email:
                  </span>
                  <div className="copyable-wrap">
                    <a href="mailto:vivekboga2006@gmail.com" className="info-val">
                      vivekboga2006@gmail.com
                    </a>
                    <button
                      className="copy-pill-btn"
                      onClick={() => copyToClipboard('vivekboga2006@gmail.com', 'Email')}
                      title="Copy Email"
                    >
                      <i className="fa-regular fa-copy" />
                    </button>
                  </div>
                </li>
                <li>
                  <span className="info-label">
                    <i className="fa-solid fa-phone" /> Phone:
                  </span>
                  <div className="copyable-wrap">
                    <a href="tel:+918121714172" className="info-val">
                      +91-8121714172
                    </a>
                    <button
                      className="copy-pill-btn"
                      onClick={() => copyToClipboard('+918121714172', 'Phone')}
                      title="Copy Phone"
                    >
                      <i className="fa-regular fa-copy" />
                    </button>
                  </div>
                </li>
                <li>
                  <span className="info-label">
                    <i className="fa-solid fa-location-dot" /> Location:
                  </span>
                  <span className="info-val">Hyderabad, Telangana, India</span>
                </li>
                <li>
                  <span className="info-label">
                    <i className="fa-brands fa-linkedin" /> LinkedIn:
                  </span>
                  <a
                    href="https://linkedin.com/in/vivekboga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    linkedin.com/in/vivekboga <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                </li>
                <li>
                  <span className="info-label">
                    <i className="fa-brands fa-github" /> GitHub:
                  </span>
                  <a
                    href="https://github.com/VivekBoga09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    github.com/VivekBoga09 <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="glass-card side-info-card">
              <h4 className="side-card-title">
                <i className="fa-solid fa-cubes" /> Core Strengths
              </h4>
              <div className="tag-cloud">
                <span className="tech-tag"><i className="fa-brands fa-react" /> React.js</span>
                <span className="tech-tag"><i className="fa-brands fa-node-js" /> Node.js</span>
                <span className="tech-tag"><i className="fa-solid fa-server" /> Express.js</span>
                <span className="tech-tag"><i className="fa-solid fa-database" /> MongoDB</span>
                <span className="tech-tag"><i className="fa-brands fa-python" /> Python</span>
                <span className="tech-tag"><i className="fa-brands fa-java" /> Java</span>
                <span className="tech-tag"><i className="fa-solid fa-code" /> C++ (ICPC)</span>
                <span className="tech-tag"><i className="fa-solid fa-paper-plane" /> Postman</span>
                <span className="tech-tag"><i className="fa-solid fa-robot" /> Puppeteer</span>
                <span className="tech-tag"><i className="fa-brands fa-chrome" /> Chrome Extensions</span>
                <span className="tech-tag"><i className="fa-solid fa-clock" /> Node-cron</span>
                <span className="tech-tag"><i className="fa-solid fa-network-wired" /> REST APIs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
