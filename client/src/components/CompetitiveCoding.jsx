import React from 'react';

export default function CompetitiveCoding() {
  return (
    <section id="competitive" className="section competitive-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Algorithmic & Open Source Prowess</span>
          <h2 className="section-title">
            Competitive <span className="gradient-text">Programming & GitHub Analytics</span>
          </h2>
          <p className="section-subtitle">
            Applying advanced data structures, algorithms, and collaborative open-source engineering to production systems.
          </p>
        </div>

        <div className="cp-grid">
          {/* Card 1: ICPC & Contest Track */}
          <div className="glass-card cp-card">
            <div className="cp-card-top">
              <div className="cp-brand">
                <div className="cp-icon-wrap leetcode-bg">
                  <i className="fa-solid fa-trophy" />
                </div>
                <div>
                  <h3 className="cp-title">ICPC Contests</h3>
                  <span className="cp-handle">Competitive Programming Track</span>
                </div>
              </div>
              <div className="rating-badge rating-badge-lc">
                <span className="rating-num">ICPC</span>
                <span className="rating-lbl">Contestant</span>
              </div>
            </div>

            <div className="cp-stats-row">
              <div className="cp-stat-box">
                <span className="stat-number">Contest</span>
                <span className="stat-label">ICPC Programmer</span>
              </div>
              <div className="cp-stat-box">
                <span className="stat-number">C++ / Java</span>
                <span className="stat-label">Primary Languages</span>
              </div>
              <div className="cp-stat-box">
                <span className="stat-number">Active</span>
                <span className="stat-label">DSA Problem Solver</span>
              </div>
            </div>

            <p className="cp-summary-desc">
              Participated in ICPC programming contests, applying advanced Data Structures and Algorithms to complex mathematical and computational challenges under strict time and memory limits.
            </p>

            <div className="cp-topics">
              <span className="topic-pill">Dynamic Programming</span>
              <span className="topic-pill">Graph Traversals (BFS/DFS)</span>
              <span className="topic-pill">Trees & Disjoint Sets</span>
              <span className="topic-pill">Binary Search & Two Pointers</span>
              <span className="topic-pill">Divide & Conquer</span>
              <span className="topic-pill">Greedy Approaches</span>
            </div>
          </div>

          {/* Card 2: JPMorgan Code for Good 2026 */}
          <div className="glass-card cp-card">
            <div className="cp-card-top">
              <div className="cp-brand">
                <div className="cp-icon-wrap codechef-bg">
                  <i className="fa-solid fa-award" />
                </div>
                <div>
                  <h3 className="cp-title">JPMorgan Chase</h3>
                  <span className="cp-handle">Code for Good 2026 (Hyderabad)</span>
                </div>
              </div>
              <div className="rating-badge rating-badge-cc">
                <span className="rating-num">CFG '26</span>
                <span className="rating-lbl">Selected</span>
              </div>
            </div>

            <div className="cp-stats-row">
              <div className="cp-stat-box">
                <span className="stat-number">Hyderabad</span>
                <span className="stat-label">Host City</span>
              </div>
              <div className="cp-stat-box">
                <span className="stat-number">Bikiran</span>
                <span className="stat-label">NGO Partner</span>
              </div>
              <div className="cp-stat-box">
                <span className="stat-number">Backend</span>
                <span className="stat-label">REST Engineering</span>
              </div>
            </div>

            <p className="cp-summary-desc">
              Selected among top engineering applicants to participate in JPMorgan Chase Code for Good 2026 – Hyderabad, engineering a career guidance platform for Class 9–12 students.
            </p>

            {/* Other Organizations */}
            <div className="other-platforms-box">
              <h4 className="dist-title">Campus Societies & Certifications</h4>
              <div className="platforms-list">
                <div className="plat-item">
                  <i className="fa-solid fa-users text-cyan" />
                  <div>
                    <strong>VJ Data Questers & Student Force:</strong> Member at VNR VJIET.
                  </div>
                </div>
                <div className="plat-item">
                  <i className="fa-brands fa-hackerrank text-green" />
                  <div>
                    <strong>HackerRank & IBM:</strong> Certified in Python Programming & Introduction to Generative AI.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Live GitHub Analytics & Problem Distribution */}
          <div className="glass-card cp-card github-activity-card">
            <div className="cp-card-top">
              <div className="cp-brand">
                <div className="cp-icon-wrap" style={{ background: 'linear-gradient(135deg, #24292e, #0d1117)' }}>
                  <i className="fa-brands fa-github text-white" />
                </div>
                <div>
                  <h3 className="cp-title">GitHub Analytics</h3>
                  <span className="cp-handle">github.com/VivekBoga09</span>
                </div>
              </div>
              <a
                href="https://github.com/VivekBoga09"
                target="_blank"
                rel="noopener noreferrer"
                className="rating-badge"
                style={{ background: 'rgba(255, 255, 255, 0.08)', textDecoration: 'none' }}
              >
                <span className="rating-num"><i className="fa-solid fa-arrow-up-right-from-square" /></span>
                <span className="rating-lbl">Visit</span>
              </a>
            </div>

            <div className="cp-stats-row">
              <div className="cp-stat-box">
                <span className="stat-number text-cyan">MERN</span>
                <span className="stat-label">Primary Stack</span>
              </div>
              <div className="cp-stat-box">
                <span className="stat-number text-green">3+</span>
                <span className="stat-label">Featured Repos</span>
              </div>
              <div className="cp-stat-box">
                <span className="stat-number text-purple">100%</span>
                <span className="stat-label">Git Versioned</span>
              </div>
            </div>

            <div className="language-distribution-wrap">
              <span className="dist-title">Languages & Technologies Breakdown:</span>
              <div className="lang-bar-container">
                <div className="lang-bar-segment" style={{ width: '38%', background: '#f7df1e' }} title="JavaScript: 38%" />
                <div className="lang-bar-segment" style={{ width: '26%', background: '#b07219' }} title="Java: 26%" />
                <div className="lang-bar-segment" style={{ width: '20%', background: '#3572a5' }} title="Python: 20%" />
                <div className="lang-bar-segment" style={{ width: '16%', background: '#f34b7d' }} title="C++: 16%" />
              </div>
              <div className="lang-legend-grid">
                <span><span className="legend-dot" style={{ background: '#f7df1e' }} /> JavaScript</span>
                <span><span className="legend-dot" style={{ background: '#b07219' }} /> Java</span>
                <span><span className="legend-dot" style={{ background: '#3572a5' }} /> Python</span>
                <span><span className="legend-dot" style={{ background: '#f34b7d' }} /> C++</span>
              </div>
            </div>

            <div className="github-quick-action">
              <a
                href="https://github.com/VivekBoga09"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-block btn-sm"
              >
                <i className="fa-brands fa-github" /> Inspect Repositories on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Coursework Matrix with OS & DAA */}
        <div className="dsa-core-pills glass-card">
          <div className="core-heading-row">
            <h4>
              <i className="fa-solid fa-graduation-cap" /> Core Computer Science Coursework
            </h4>
            <span className="badge-tag">Academic Honors (9.55 CGPA)</span>
          </div>
          <div className="coursework-chips">
            <div className="coursework-chip">
              <i className="fa-solid fa-network-wired" />
              <div>
                <strong>Data Structures & Algorithms</strong>
                <span>Linear & non-linear structures, balanced trees, shortest path graphs, heaps</span>
              </div>
            </div>
            <div className="coursework-chip">
              <i className="fa-solid fa-chart-line text-green" />
              <div>
                <strong>Design and Analysis of Algorithms</strong>
                <span>Asymptotic notation, dynamic programming, divide & conquer, greedy, NP-completeness</span>
              </div>
            </div>
            <div className="coursework-chip">
              <i className="fa-solid fa-microchip text-yellow" />
              <div>
                <strong>Operating Systems</strong>
                <span>Process synchronization, multithreading, CPU scheduling, virtual memory, paging</span>
              </div>
            </div>
            <div className="coursework-chip">
              <i className="fa-solid fa-database text-blue" />
              <div>
                <strong>Database Management Systems (DBMS)</strong>
                <span>Relational calculus, SQL indexing, ACID transactions, B+ trees, normalization</span>
              </div>
            </div>
            <div className="coursework-chip">
              <i className="fa-solid fa-cubes-stacked text-purple" />
              <div>
                <strong>Object-Oriented Programming (OOP)</strong>
                <span>Encapsulation, Polymorphism, Inheritance, Abstraction, SOLID principles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
