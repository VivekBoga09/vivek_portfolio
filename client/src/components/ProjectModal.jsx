import React, { useState } from 'react';

export default function ProjectModal({ projectSlug, onClose, playBlip }) {
  // Amazon simulator states
  const [tgNotification, setTgNotification] = useState(null);
  const [isSimulatingDrop, setIsSimulatingDrop] = useState(false);

  // Traffic simulator state
  const [trafficLightState, setTrafficLightState] = useState('red');
  const [ambulanceStatus, setAmbulanceStatus] = useState('Standing by');

  // JPMorgan Career Simulator State
  const [studentTrack, setStudentTrack] = useState('tech');
  const [assessmentResult, setAssessmentResult] = useState(null);

  if (!projectSlug) return null;

  const handleSimulateDrop = async () => {
    playBlip(750);
    setIsSimulatingDrop(true);
    try {
      const res = await fetch('/api/simulate/price-drop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Sony WH-1000XM5 Wireless Headphones',
          originalPrice: 29990,
          currentPrice: 22499
        })
      });
      const data = await res.json();
      setTgNotification(data.notification);
    } catch {
      setTgNotification({
        source: 'Telegram Bot API (PricePulse Bot)',
        product: 'Sony WH-1000XM5',
        originalPrice: 29990,
        currentPrice: 22499,
        savings: 7491,
        discountPercentage: 25,
        text: '🚨 ALERT: Sony WH-1000XM5 price dropped from ₹29,990 to ₹22,499! Target reached.'
      });
    } finally {
      setIsSimulatingDrop(false);
    }
  };

  const handleSimulateTraffic = async () => {
    playBlip(800);
    setAmbulanceStatus('DISPATCHED: En route with critical patient');
    setTrafficLightState('yellow');

    setTimeout(() => {
      setTrafficLightState('green');
      setAmbulanceStatus('GREEN CORRIDOR ACTIVE: All intersections preempted (ETA: 45s)');
      playBlip(920);
    }, 1200);
  };

  const handleRunAssessment = (trackKey) => {
    playBlip(700);
    setStudentTrack(trackKey);
    const mockAssessments = {
      tech: {
        role: 'Full-Stack Software Engineer',
        fitScore: '94%',
        suggestedNextSteps: 'Learn MERN Stack, Algorithms, and participate in Hackathons',
        pathway: 'Class 9 Foundation -> Class 11 Web Projects -> Engineering Internships'
      },
      datasci: {
        role: 'Data Scientist & AI Specialist',
        fitScore: '91%',
        suggestedNextSteps: 'Explore Python data libraries, SQL schemas, and Tableau dashboarding',
        pathway: 'Class 9 Math/Stats -> Class 11 Python -> Data Science Degree'
      },
      creative: {
        role: 'Product Designer & UI/UX Specialist',
        fitScore: '88%',
        suggestedNextSteps: 'Design user journeys, accessible UI systems, and Figma wireframes',
        pathway: 'Class 9 Art/Design -> Class 11 Web Design -> Human-Computer Interaction'
      }
    };
    setAssessmentResult(mockAssessments[trackKey]);
  };

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal-dialog glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-tag">Deep Dive Architecture</span>
            <h3 className="modal-title">
              {projectSlug === 'amazon-price-tracker'
                ? 'Amazon Price Tracking System (Chrome Extension)'
                : projectSlug === 'jpmorgan-career-platform'
                ? 'Student Career Discovery & Guidance Platform (JPMorgan Chase)'
                : 'Ambulance Priority Traffic Control System'}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-img-wrap">
            <img
              src={
                projectSlug === 'amazon-price-tracker'
                  ? '/assets/images/project-amazon.jpg'
                  : projectSlug === 'jpmorgan-career-platform'
                  ? '/assets/images/project-career.jpg'
                  : '/assets/images/project-traffic.jpg'
              }
              alt="Project Architecture"
              className="modal-img"
            />
          </div>

          {/* PROJECT 1: AMAZON PRICE TRACKER */}
          {projectSlug === 'amazon-price-tracker' && (
            <>
              <div className="modal-section">
                <h4><i className="fa-solid fa-lightbulb text-yellow" /> Project Overview</h4>
                <p>
                  Engineered a full-stack MERN application to monitor Amazon product prices and track price fluctuations in real time.
                  Features an integrated Manifest V3 Chrome Extension allowing users to add products directly from Amazon product pages,
                  paired with an automated Puppeteer background daemon and real-time Telegram Bot price drop alerts.
                </p>
              </div>

              <div className="modal-section">
                <h4><i className="fa-solid fa-microchip text-cyan" /> Key Architectural Pillars</h4>
                <ul className="modal-bullets">
                  <li>
                    <strong>Chrome Extension Integration:</strong> Streamlines product tracking by allowing users to add Amazon products directly from product pages through RESTful API integration.
                  </li>
                  <li>
                    <strong>Automated Scraping Daemon:</strong> Automated product price monitoring using Puppeteer and Node-cron, delivering real-time price-drop notifications through Telegram Bot API.
                  </li>
                  <li>
                    <strong>MERN Backend Infrastructure:</strong> Express and Node.js microservices persist user watchlists, historical pricing arrays, and threshold alerts in MongoDB.
                  </li>
                </ul>
              </div>

              {/* Simulator */}
              <div className="modal-section sim-box">
                <h4><i className="fa-solid fa-play text-cyan" /> Interactive Simulator: Test Price Drop Alert</h4>
                <p className="sim-sub">
                  Simulate a product on Amazon dropping price and watch the automated Telegram notification trigger via the MERN backend:
                </p>

                <div className="sim-controls">
                  <div className="sim-product-info">
                    <strong>Product:</strong> Sony WH-1000XM5 Wireless Headphones
                    <div className="sim-prices">
                      <span>Original: <del>₹29,990</del></span>
                      <span className="text-success font-bold">Target Alert: ≤ ₹24,000</span>
                    </div>
                  </div>
                  <button
                    onClick={handleSimulateDrop}
                    disabled={isSimulatingDrop}
                    className="btn btn-sm btn-primary"
                  >
                    <i className="fa-solid fa-bolt" /> Simulate Price Drop to ₹22,499
                  </button>
                </div>

                {tgNotification && (
                  <div className="sim-notification-result">
                    <div className="sim-tg-card">
                      <div className="tg-header">
                        <i className="fa-brands fa-telegram text-cyan" />
                        <span>PriceBot Alert • {tgNotification.source}</span>
                      </div>
                      <div className="tg-body">
                        🚨 <strong>PRICE DROP DETECTED!</strong><br />
                        <strong>{tgNotification.product}</strong> dropped from <del>₹29,990</del> to{' '}
                        <strong>₹{tgNotification.currentPrice.toLocaleString('en-IN')}</strong> (Saved {tgNotification.discountPercentage}%)!<br />
                        Threshold (₹24,000) breached. Notification dispatched to Telegram user chat.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-section">
                <h4><i className="fa-solid fa-tags" /> Technology Stack</h4>
                <div className="modal-tech-pills">
                  <span className="tag">React.js</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Express.js</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">Puppeteer</span>
                  <span className="tag">Chrome Extensions</span>
                  <span className="tag">Node-cron</span>
                  <span className="tag">Telegram API</span>
                </div>
              </div>
            </>
          )}

          {/* PROJECT 2: JPMORGAN CAREER GUIDANCE PLATFORM */}
          {projectSlug === 'jpmorgan-career-platform' && (
            <>
              <div className="modal-section">
                <h4><i className="fa-solid fa-award text-yellow" /> JPMorgan Chase Code for Good 2026 Collaboration</h4>
                <p>
                  Developed backend services for a comprehensive career guidance platform for Class 9–12 students in collaboration with{' '}
                  <strong>JPMorgan Chase & Co. and Bikiran Foundation</strong>. The platform bridges the career discovery gap for rural and semi-urban students by providing accessible resources, career exploration, and mentor-support pathways.
                </p>
              </div>

              <div className="modal-section">
                <h4><i className="fa-solid fa-microchip text-cyan" /> Architectural Highlights & Contributions</h4>
                <ul className="modal-bullets">
                  <li>
                    <strong>RESTful API Architecture:</strong> Constructed and integrated REST APIs with the React frontend for assessments, career profiles, and student progress tracking.
                  </li>
                  <li>
                    <strong>Rural & Semi-Urban Accessibility:</strong> Optimized network payloads and integrated Firebase authentication and cloud caching to ensure fast loading on low-bandwidth rural connections.
                  </li>
                  <li>
                    <strong>Scalable MongoDB Schema:</strong> Modeled student assessment metrics, interest matrices, and mentor pairing channels using MongoDB collections.
                  </li>
                </ul>
              </div>

              {/* Interactive Career Assessment Simulator */}
              <div className="modal-section sim-box">
                <h4><i className="fa-solid fa-play text-cyan" /> Interactive Simulator: Test Career Assessment Engine</h4>
                <p className="sim-sub">
                  Select a student interest domain to trigger the API evaluation and see the guidance output:
                </p>

                <div className="city-selector-row">
                  <button
                    className={`city-btn ${studentTrack === 'tech' ? 'active' : ''}`}
                    onClick={() => handleRunAssessment('tech')}
                  >
                    Computer Science / Engineering
                  </button>
                  <button
                    className={`city-btn ${studentTrack === 'datasci' ? 'active' : ''}`}
                    onClick={() => handleRunAssessment('datasci')}
                  >
                    Data Science & Analytics
                  </button>
                  <button
                    className={`city-btn ${studentTrack === 'creative' ? 'active' : ''}`}
                    onClick={() => handleRunAssessment('creative')}
                  >
                    Design & Product
                  </button>
                </div>

                {assessmentResult && (
                  <div className="weather-demo-card" style={{ marginTop: '14px' }}>
                    <div className="w-card-header">
                      <span className="w-city"><i className="fa-solid fa-compass text-cyan" /> Recommended Career: {assessmentResult.role}</span>
                      <span className="w-time">Fit Match: <strong className="text-green">{assessmentResult.fitScore}</strong></span>
                    </div>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#e2e8f0', marginTop: '8px' }}>
                      <div><strong>Roadmap Pathway:</strong> {assessmentResult.pathway}</div>
                      <div style={{ marginTop: '6px' }}><strong>Recommended Mentorship Next Step:</strong> {assessmentResult.suggestedNextSteps}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-section">
                <h4><i className="fa-solid fa-tags" /> Technology Stack</h4>
                <div className="modal-tech-pills">
                  <span className="tag">React.js</span>
                  <span className="tag">Tailwind CSS</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Express.js</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">Firebase</span>
                  <span className="tag">RESTful APIs</span>
                </div>
              </div>
            </>
          )}

          {/* PROJECT 3: AMBULANCE TRAFFIC SYSTEM */}
          {projectSlug === 'ambulance-priority-traffic' && (
            <>
              <div className="modal-section">
                <h4><i className="fa-solid fa-lightbulb text-yellow" /> Project Overview</h4>
                <p>
                  Designed a smart traffic management system that generates automatic green corridors for ambulances during emergencies.
                  Constructed RESTful APIs using Node.js and Express.js and integrated MongoDB to manage traffic signal data and ambulance detection requests.
                </p>
              </div>

              <div className="modal-section">
                <h4><i className="fa-solid fa-microchip text-cyan" /> System Architecture & Logic</h4>
                <ul className="modal-bullets">
                  <li>
                    <strong>Dynamic Green Corridors:</strong> Automatic route clearance for ambulances during emergencies using real-time spatial prioritization algorithms.
                  </li>
                  <li>
                    <strong>RESTful APIs:</strong> Constructed using Node.js and Express.js and integrated MongoDB to manage traffic signal data and ambulance detection requests.
                  </li>
                  <li>
                    <strong>Prioritization Logic:</strong> Implemented intelligent signal-prioritization logic to detect approaching ambulances and dynamically regulate traffic flow at intersections.
                  </li>
                </ul>
              </div>

              {/* Simulator */}
              <div className="modal-section sim-box">
                <h4><i className="fa-solid fa-play text-cyan" /> Interactive Corridor Simulation</h4>
                <p className="sim-sub">
                  Dispatch an emergency ambulance to view automatic signal state transition from Congested Red to Priority Green corridor:
                </p>

                <div className="traffic-sim-panel">
                  <div className="sim-traffic-light">
                    <span className={`light red ${trafficLightState === 'red' ? 'active' : ''}`} />
                    <span className={`light yellow ${trafficLightState === 'yellow' ? 'active' : ''}`} />
                    <span className={`light green ${trafficLightState === 'green' ? 'active' : ''}`} />
                  </div>
                  <div className="sim-traffic-meta">
                    <div className={trafficLightState === 'green' ? 'status-badge-green' : 'status-badge-red'}>
                      Intersection Status: {trafficLightState === 'green' ? 'PRIORITY GREEN CORRIDOR' : 'Normal Cycle (Red Active)'}
                    </div>
                    <div className="sim-ambulance-state">Status: {ambulanceStatus}</div>
                  </div>
                  <button onClick={handleSimulateTraffic} className="btn btn-sm btn-primary">
                    <i className="fa-solid fa-truck-medical" /> Dispatch Emergency Ambulance
                  </button>
                </div>
              </div>

              <div className="modal-section">
                <h4><i className="fa-solid fa-tags" /> Technology Stack</h4>
                <div className="modal-tech-pills">
                  <span className="tag">React.js</span>
                  <span className="tag">JavaScript (ES6+)</span>
                  <span className="tag">CSS3</span>
                  <span className="tag">Express.js</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">REST APIs</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <a
            href="https://github.com/VivekBoga09"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <i className="fa-brands fa-github" /> View GitHub Repository
          </a>
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
