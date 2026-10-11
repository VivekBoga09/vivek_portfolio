import React, { useState, useEffect } from 'react';

const STATIC_PROJECTS = [
  {
    slug: 'amazon-price-tracker',
    title: 'Amazon Price Tracking System (Chrome Extension)',
    category: 'mern',
    categoryLabel: 'MERN • Puppeteer • Node-Cron',
    status: 'Production Ready',
    badge: 'Extension + Bot',
    badgeType: 'cyan',
    image: '/assets/images/project-amazon.jpg',
    description:
      'Engineered a full-stack MERN application to monitor Amazon product prices and track price fluctuations in real time.',
    highlights: [
      {
        title: 'Chrome Extension Integration:',
        text: 'Streamlines product tracking by allowing users to add Amazon products directly from product pages through RESTful API integration.'
      },
      {
        title: 'Automated Scraping Daemon:',
        text: 'Automated product price monitoring using Puppeteer and Node-cron, delivering real-time price-drop notifications through Telegram Bot API.'
      },
      {
        title: 'Full-Stack MERN Architecture:',
        text: 'React frontend with Express/Node backend, managing product watchlists, price histories, and notification thresholds in MongoDB.'
      }
    ],
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Puppeteer',
      'Chrome Extensions',
      'Node-cron',
      'Telegram API'
    ],
    githubUrl: 'https://github.com/VivekBoga09'
  },
  {
    slug: 'jpmorgan-career-platform',
    title: 'Student Career Discovery & Guidance Platform',
    category: 'mern',
    categoryLabel: 'JPMorgan Chase & Co. • Bikiran Foundation',
    status: 'Code for Good 2026',
    badge: 'JPMorgan Collab',
    badgeType: 'emerald',
    image: '/assets/images/project-career.jpg',
    description:
      'Developed backend services for a career guidance platform for Class 9–12 students in collaboration with JPMorgan Chase & Co. and Bikiran Foundation.',
    highlights: [
      {
        title: 'JPMorgan Chase & Bikiran Foundation Collaboration:',
        text: 'Developed backend services for a career guidance platform for Class 9–12 students in collaboration with JPMorgan Chase & Co. and Bikiran Foundation.'
      },
      {
        title: 'RESTful API Engineering:',
        text: 'Built and integrated REST APIs with the React frontend for assessments, career profiles, and student progress.'
      },
      {
        title: 'Empowering Rural & Semi-Urban Students:',
        text: 'Bridged the career-guidance gap for rural and semi-urban students by providing accessible resources, career exploration, and mentor-support pathways.'
      }
    ],
    techStack: [
      'React.js',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Firebase',
      'REST APIs'
    ],
    githubUrl: 'https://github.com/VivekBoga09'
  },
  {
    slug: 'ambulance-priority-traffic',
    title: 'Ambulance Priority Traffic Control System',
    category: 'mern',
    categoryLabel: 'Smart City • MERN Stack',
    status: 'Real-time Logic',
    badge: 'Emergency Corridors',
    badgeType: 'blue',
    image: '/assets/images/project-traffic.jpg',
    description:
      'Designed a smart traffic management system that generates automatic green corridors for ambulances during emergencies.',
    highlights: [
      {
        title: 'Automatic Green Corridors:',
        text: 'Designed a smart traffic management system that generates automatic green corridors for ambulances during emergency transit.'
      },
      {
        title: 'RESTful API Services:',
        text: 'Constructed RESTful APIs using Node.js and Express.js and integrated MongoDB to manage traffic signal data and ambulance detection requests.'
      },
      {
        title: 'Intelligent Prioritization Logic:',
        text: 'Implemented intelligent signal-prioritization logic to detect approaching ambulances and dynamically regulate traffic flow at intersections.'
      }
    ],
    techStack: [
      'React.js',
      'JavaScript (ES6+)',
      'CSS3',
      'Express.js',
      'Node.js',
      'MongoDB',
      'REST APIs',
      'Smart City'
    ],
    githubUrl: 'https://github.com/VivekBoga09'
  }
];

export default function Projects({ onOpenProjectModal, onOpenTrafficSim, playBlip }) {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState(STATIC_PROJECTS);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setProjects(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const visibleProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => {
          if (filter === 'cfg') return p.status.includes('Code for Good') || p.categoryLabel.includes('JPMorgan');
          if (filter === 'mern') return p.category === 'mern';
          if (filter === 'automation') return p.techStack.includes('Puppeteer') || p.techStack.includes('Chrome Extensions');
          return true;
        });

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Engineering Showcase</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world applications engineered with modern MERN stacks, JPMorgan Chase collaborations, and automation pipelines.
          </p>
        </div>

        {/* Project Filter Nav */}
        <div className="project-filter-nav">
          <button
            className={`proj-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('all');
            }}
          >
            All Projects ({projects.length})
          </button>
          <button
            className={`proj-filter-btn ${filter === 'cfg' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('cfg');
            }}
          >
            <i className="fa-solid fa-award text-yellow" /> JPMorgan Collab
          </button>
          <button
            className={`proj-filter-btn ${filter === 'mern' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('mern');
            }}
          >
            Full-Stack MERN
          </button>
          <button
            className={`proj-filter-btn ${filter === 'automation' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('automation');
            }}
          >
            Automation & Extensions
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {visibleProjects.map((proj) => (
            <article key={proj.slug} className="glass-card project-card">
              <div className="project-media-wrap">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="project-img"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <div className="project-action-btns">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        playBlip(620);
                        onOpenProjectModal(proj.slug);
                      }}
                    >
                      <i className="fa-solid fa-magnifying-glass-plus" /> Deep Dive & Architecture
                    </button>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fa-brands fa-github" /> Repo
                    </a>
                  </div>
                </div>
                <div
                  className={`project-badge-tag ${
                    proj.badgeType === 'emerald'
                      ? 'badge-emerald'
                      : proj.badgeType === 'blue'
                      ? 'badge-cyan'
                      : ''
                  }`}
                >
                  <i className="fa-solid fa-bolt" /> {proj.badge}
                </div>
              </div>

              <div className="project-body">
                <div className="project-meta-top">
                  <span className="project-category">{proj.categoryLabel}</span>
                  <span className="project-status">
                    <i className="fa-solid fa-circle" /> {proj.status}
                  </span>
                </div>

                <h3 className="project-title">{proj.title}</h3>
                <p className="project-description">{proj.description}</p>

                <div className="project-highlights">
                  {proj.highlights &&
                    proj.highlights.map((h, i) => (
                      <div key={i} className="highlight-bullet">
                        <i className="fa-solid fa-check-circle" />
                        <span>
                          <strong>{h.title}</strong> {h.text}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="project-tech-stack">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-footer">
                  {proj.slug === 'ambulance-priority-traffic' && onOpenTrafficSim && (
                    <button
                      className="btn btn-primary btn-block"
                      style={{ marginBottom: '8px' }}
                      onClick={() => {
                        playBlip(750);
                        onOpenTrafficSim();
                      }}
                    >
                      <i className="fa-solid fa-truck-medical" />
                      <span>Launch Live 2D Intersection Simulator</span>
                    </button>
                  )}
                  <button
                    className="btn btn-outline btn-block"
                    onClick={() => {
                      playBlip(600);
                      onOpenProjectModal(proj.slug);
                    }}
                  >
                    <span>Explore Architecture & Interactive Sim</span>
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
