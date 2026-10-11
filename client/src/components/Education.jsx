import React from 'react';

export default function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Academic Journey & Credentials</span>
          <h2 className="section-title">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Consistent top-tier academic excellence paired with industry training from JPMorgan Chase and ServiceNow.
          </p>
        </div>

        <div className="edu-cert-layout">
          {/* Left Column: Education Timeline */}
          <div className="edu-column">
            <h3 className="column-title">
              <i className="fa-solid fa-graduation-cap" /> Formal Education
            </h3>

            <div className="timeline">
              {/* B.Tech */}
              <div className="timeline-item">
                <div className="timeline-marker" />
                <div className="glass-card timeline-card">
                  <div className="timeline-period">2024 — 2028</div>
                  <h4 className="timeline-degree">
                    B.Tech in Computer Science and Engineering (Data Science)
                  </h4>
                  <div className="timeline-institution">
                    <i className="fa-solid fa-building-columns" /> VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad
                  </div>
                  <div className="timeline-score-badge">
                    <span className="badge-label">CGPA:</span>
                    <span className="badge-value">9.55 / 10</span>
                  </div>
                  <p className="timeline-notes">
                    Specializing in Data Science, advanced algorithms, and full-stack software development. Ranked among top academic performers in the department.
                  </p>
                  <div className="timeline-tags">
                    <span>Data Structures</span>
                    <span>Algorithms</span>
                    <span>DBMS</span>
                    <span>OOP</span>
                    <span>Operating Systems</span>
                    <span>Design & Analysis of Algorithms</span>
                  </div>
                </div>
              </div>

              {/* Intermediate */}
              <div className="timeline-item">
                <div className="timeline-marker" />
                <div className="glass-card timeline-card">
                  <div className="timeline-period">2022 — 2024</div>
                  <h4 className="timeline-degree">
                    Intermediate
                  </h4>
                  <div className="timeline-institution">
                    <i className="fa-solid fa-school" /> Sri Chaitanya College
                  </div>
                  <div className="timeline-score-badge badge-emerald">
                    <span className="badge-label">Score:</span>
                    <span className="badge-value">983 / 1000 (98.3%)</span>
                  </div>
                  <p className="timeline-notes">
                    Secured top percentile academic score demonstrating strong analytical, mathematical, and logical problem-solving foundations.
                  </p>
                  <div className="timeline-tags">
                    <span>Mathematics</span>
                    <span>Physics</span>
                    <span>Analytical Reasoning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements & Activities Card */}
            <div className="glass-card achievements-card" style={{ marginTop: '28px' }}>
              <h4 className="side-card-title">
                <i className="fa-solid fa-trophy text-yellow" /> Key Achievements & Activities
              </h4>
              <ul className="modal-bullets">
                <li>
                  <strong>Selected for JPMorgan Chase Code for Good 2026 – Hyderabad:</strong> Collaborating on a high-impact technology solution for Bikiran Foundation.
                </li>
                <li>
                  <strong>Active Competitive Programmer:</strong> Strong focus on Data Structures and Algorithms with high-speed problem-solving in C++ and Java.
                </li>
                <li>
                  <strong>ICPC Programming Contestant:</strong> Participated in competitive ICPC contests, applying advanced algorithmic strategies under time constraints.
                </li>
                <li>
                  <strong>Campus Leadership:</strong> Active member of <strong>VJ Data Questers</strong> and <strong>Student Force</strong>, VNR VJIET.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="cert-column">
            <h3 className="column-title">
              <i className="fa-solid fa-award" /> Certifications & Training
            </h3>

            <div className="cert-cards-list">
              {/* JPMorgan Chase Forage */}
              <div className="glass-card cert-card">
                <div className="cert-icon-box cert-jpm">
                  <i className="fa-solid fa-building-columns" />
                </div>
                <div className="cert-body">
                  <div className="cert-issuer">JPMorgan Chase & Co. (Forage)</div>
                  <h4 className="cert-title">Software Engineering Program</h4>
                  <p className="cert-desc">
                    Completed virtual software engineering simulation covering interface development, real-time data feeds, and financial services architecture.
                  </p>
                  <div className="cert-footer">
                    <span className="cert-verified">
                      <i className="fa-solid fa-circle-check" /> Verified Credential
                    </span>
                  </div>
                </div>
              </div>

              {/* ServiceNow & SmartBridge */}
              <div className="glass-card cert-card">
                <div className="cert-icon-box cert-servicenow">
                  <i className="fa-solid fa-arrows-spin" />
                </div>
                <div className="cert-body">
                  <div className="cert-issuer">ServiceNow & SmartBridge</div>
                  <h4 className="cert-title">Digital Transformation Simulation</h4>
                  <p className="cert-desc">
                    Hands-on experience with digital workflows, enterprise transformation simulations, and automated business service workflows.
                  </p>
                  <div className="cert-footer">
                    <span className="cert-verified">
                      <i className="fa-solid fa-circle-check" /> Verified Simulation
                    </span>
                  </div>
                </div>
              </div>

              {/* HackerRank Python */}
              <div className="glass-card cert-card">
                <div className="cert-icon-box cert-py">
                  <i className="fa-brands fa-python" />
                </div>
                <div className="cert-body">
                  <div className="cert-issuer">HackerRank Certification</div>
                  <h4 className="cert-title">Python Programming</h4>
                  <p className="cert-desc">
                    Certification demonstrating proficiency in Python programming including data structures, functions, and algorithmic problem-solving.
                  </p>
                  <div className="cert-footer">
                    <span className="cert-verified">
                      <i className="fa-solid fa-circle-check" /> Verified Credential
                    </span>
                  </div>
                </div>
              </div>

              {/* IBM GenAI */}
              <div className="glass-card cert-card">
                <div className="cert-icon-box cert-ibm">
                  <i className="fa-solid fa-microchip" />
                </div>
                <div className="cert-body">
                  <div className="cert-issuer">IBM Professional Foundation</div>
                  <h4 className="cert-title">Introduction to Generative AI</h4>
                  <p className="cert-desc">
                    Gained foundational knowledge of generative AI, large language models (LLMs), transformer principles, and real-world AI applications.
                  </p>
                  <div className="cert-footer">
                    <span className="cert-verified">
                      <i className="fa-solid fa-circle-check" /> Verified Foundation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
