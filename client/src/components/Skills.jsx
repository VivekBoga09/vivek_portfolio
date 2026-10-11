import React, { useState, useEffect } from 'react';

const FALLBACK_SKILLS = {
  languages: [
    { name: 'Java', level: 'Proficient', score: 90, note: 'OOP, Collections Framework, Competitive Programming', icon: 'fa-brands fa-java text-orange' },
    { name: 'Python', level: 'Certified (HackerRank)', score: 92, note: 'Data structures, functions, problem solving, automation', icon: 'fa-brands fa-python text-yellow' },
    { name: 'JavaScript (ES6+)', level: 'Advanced', score: 90, note: 'Async/await, DOM, Promises, Event-driven architecture', icon: 'fa-brands fa-js text-yellow' },
    { name: 'C++', level: 'Advanced', score: 88, note: 'STL, ICPC programming contest problem solving', icon: 'fa-solid fa-c text-blue' },
    { name: 'SQL', level: 'Intermediate', score: 85, note: 'Complex queries, indexing, joins, relational schema design', icon: 'fa-solid fa-database text-cyan' }
  ],
  web: [
    { name: 'React.js', level: 'Advanced', score: 90, note: 'Component trees, custom hooks, state hydration, dynamic routing', icon: 'fa-brands fa-react text-cyan' },
    { name: 'Node.js', level: 'Proficient', score: 88, note: 'Event loop runtime, scalable microservices, asynchronous I/O', icon: 'fa-brands fa-node-js text-green' },
    { name: 'Express.js', level: 'Proficient', score: 88, note: 'REST API design, auth middleware, request routing, error handling', icon: 'fa-solid fa-server text-purple' },
    { name: 'HTML & CSS', level: 'Expert', score: 95, note: 'Tailwind CSS, responsive grid/flexbox, cyber-glassmorphism', icon: 'fa-brands fa-html5 text-orange' },
    { name: 'REST APIs', level: 'Advanced', score: 92, note: 'JSON serialization, endpoint design, Postman integration testing', icon: 'fa-solid fa-network-wired text-cyan' }
  ],
  databases: [
    { name: 'MongoDB', level: 'Proficient', score: 88, note: 'NoSQL collections, Mongoose ODM, aggregation pipelines', icon: 'fa-solid fa-leaf text-green' },
    { name: 'MySQL', level: 'Proficient', score: 85, note: 'Relational schemas, foreign keys, normalization, ACID compliance', icon: 'fa-solid fa-server text-blue' },
    { name: 'Firebase', level: 'Intermediate', score: 82, note: 'Realtime database, authentication, cloud storage', icon: 'fa-solid fa-fire text-yellow' }
  ],
  tools: [
    { name: 'Postman', level: 'Advanced', score: 92, note: 'API testing, collection runner, mock servers, request validation', icon: 'fa-solid fa-paper-plane text-orange' },
    { name: 'Puppeteer Automation', level: 'Advanced', score: 90, note: 'Headless browser scraping, DOM automation, anti-bot handling', icon: 'fa-solid fa-robot text-purple' },
    { name: 'Chrome Extensions', level: 'Advanced', score: 88, note: 'Manifest V3, content scripts, background workers, storage', icon: 'fa-brands fa-chrome text-yellow' },
    { name: 'Node-cron', level: 'Proficient', score: 86, note: 'Automated scheduled jobs, background interval workers', icon: 'fa-solid fa-clock text-orange' },
    { name: 'Git, GitHub, VS Code', level: 'Proficient', score: 90, note: 'Version control, branching, PRs, collaborative workflows', icon: 'fa-brands fa-git-alt text-orange' }
  ],
  fundamentals: [
    { name: 'Data Structures & Algorithms', level: 'Exemplary', score: 95, note: 'ICPC Contestant, Trees, Graphs, DP, Heaps, Hash Maps', icon: 'fa-solid fa-sitemap text-accent' },
    { name: 'Design & Analysis of Algorithms', level: 'Exemplary', score: 94, note: 'Asymptotic complexity, divide & conquer, greedy, dynamic programming', icon: 'fa-solid fa-chart-line text-green' },
    { name: 'Database Management (DBMS)', level: 'Advanced', score: 90, note: 'ACID properties, transactions, concurrency, indexing', icon: 'fa-solid fa-database text-blue' },
    { name: 'Operating Systems', level: 'Advanced', score: 88, note: 'Processes, threads, CPU scheduling, memory management, locks', icon: 'fa-solid fa-microchip text-yellow' },
    { name: 'Object-Oriented Programming', level: 'Advanced', score: 92, note: 'Encapsulation, Polymorphism, Inheritance, Abstraction', icon: 'fa-solid fa-cube text-purple' }
  ]
};

export default function Skills({ playBlip }) {
  const [filter, setFilter] = useState('all');
  const [skillsData, setSkillsData] = useState(FALLBACK_SKILLS);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.data) {
          setSkillsData({
            languages: data.data.languages || FALLBACK_SKILLS.languages,
            web: data.data.web || FALLBACK_SKILLS.web,
            databases: data.data.databases || FALLBACK_SKILLS.databases,
            tools: data.data.tools || FALLBACK_SKILLS.tools,
            fundamentals: data.data.fundamentals || FALLBACK_SKILLS.fundamentals
          });
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { id: 'languages', title: 'Programming Languages', meta: 'Foundational & Algorithmic', icon: 'fa-solid fa-terminal' },
    { id: 'web', title: 'Web Technologies', meta: 'Full-Stack MERN Architecture', icon: 'fa-solid fa-globe' },
    { id: 'databases', title: 'Databases & Storage', meta: 'Relational & NoSQL Datastores', icon: 'fa-solid fa-database' },
    { id: 'tools', title: 'Developer Tools & Automation', meta: 'Postman, Bots & Chrome Extensions', icon: 'fa-solid fa-screwdriver-wrench' },
    { id: 'fundamentals', title: 'Computer Science Coursework', meta: 'OS, DAA, DSA, DBMS & OOP', icon: 'fa-solid fa-brain' }
  ];

  const visibleCategories =
    filter === 'all' ? categories : categories.filter((c) => c.id === filter);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Technical Arsenal</span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive stack developed through academic coursework, JPMorgan collaborations, and ICPC competitive programming.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="skills-filter-nav">
          <button
            className={`skill-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('all');
            }}
          >
            All Skills
          </button>
          <button
            className={`skill-filter-btn ${filter === 'languages' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('languages');
            }}
          >
            Languages
          </button>
          <button
            className={`skill-filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('web');
            }}
          >
            Web & Full-Stack
          </button>
          <button
            className={`skill-filter-btn ${filter === 'databases' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('databases');
            }}
          >
            Databases
          </button>
          <button
            className={`skill-filter-btn ${filter === 'tools' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('tools');
            }}
          >
            Tools & Postman
          </button>
          <button
            className={`skill-filter-btn ${filter === 'fundamentals' ? 'active' : ''}`}
            onClick={() => {
              playBlip(500);
              setFilter('fundamentals');
            }}
          >
            Coursework & OS
          </button>
        </div>

        {/* Skills Grid */}
        <div className="skills-category-grid">
          {visibleCategories.map((cat) => {
            const items = skillsData[cat.id] || FALLBACK_SKILLS[cat.id] || [];
            return (
              <div key={cat.id} className="glass-card skill-cat-card">
                <div className="cat-header">
                  <div className="cat-icon-wrap">
                    <i className={cat.icon} />
                  </div>
                  <div>
                    <h3 className="cat-title">{cat.title}</h3>
                    <span className="cat-meta">{cat.meta}</span>
                  </div>
                </div>

                <div className="skills-item-list">
                  {items.map((item, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-label-row">
                        <span className="skill-name">
                          <i className={item.icon || 'fa-solid fa-code text-cyan'} /> {item.name}
                        </span>
                        <span className="skill-level">{item.level}</span>
                      </div>
                      <div className="progress-track">
                        <div
                          className="progress-bar"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="skill-desc">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
