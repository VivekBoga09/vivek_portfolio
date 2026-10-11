import React, { useState, useEffect } from 'react';

const SUGGESTED_PROMPTS = [
  'Why should we hire Vivek for an SDE Internship?',
  'Tell me about JPMorgan Chase Code for Good 2026',
  'What is Vivek\'s academic CGPA and college?',
  'Explain Vivek\'s DSA & ICPC contest experience',
  'Summarize Vivek\'s MERN stack & automation skills',
  'What certifications does Vivek hold?'
];

const ROLES = [
  'Full-Stack MERN Developer',
  'Backend & API Engineer',
  'Algorithm & Problem Solver (DSA)',
  'Data Science & AI Undergrad'
];

// Offline / Local Knowledge Engine mirroring backend intelligence
const LOCAL_KNOWLEDGE = [
  {
    triggers: ['cgpa', 'gpa', 'marks', 'percentage', 'score', 'grades', 'pointer', 'intermediate', '12th', 'sri chaitanya', 'rank'],
    pills: ['9.55 / 10 CGPA', '983 / 1000 Inter', 'VNR VJIET', 'Top Percentile'],
    answer: `Boga Vivek has a standout academic track record:\n• B.Tech in CSE (Data Science) at VNR VJIET, Hyderabad (2024–2028): Outstanding **9.55 / 10 CGPA**.\n• Intermediate at Sri Chaitanya College (2022–2024): Exceptional **983 / 1000 marks (98.3%)**.\nThis consistent academic excellence demonstrates strong analytical rigor and mathematical discipline.`,
    followUps: ['Why should we hire Vivek for an SDE Internship?', 'Tell me about JPMorgan Chase Code for Good 2026']
  },
  {
    triggers: ['college', 'university', 'institute', 'vnr', 'vjiet', 'btech', 'degree', 'undergrad', 'education', 'studying', 'where do you study'],
    pills: ['VNR VJIET Hyderabad', 'CSE (Data Science)', '2024-2028', 'Sri Chaitanya'],
    answer: `Boga Vivek is pursuing his **B.Tech in Computer Science and Engineering (Data Science)** (2024–2028) at **VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)**, Hyderabad, maintaining a **9.55 / 10 CGPA**.\nPrior to this, he completed his Intermediate education (MPC) at **Sri Chaitanya College** (2022–2024) scoring **983 / 1000 (98.3%)**.`,
    followUps: ['What are Vivek\'s skills and tech stack?', 'What projects has Vivek built?']
  },
  {
    triggers: ['jpmorgan', 'jp morgan', 'cfg', 'code for good', 'bikiran', 'hackathon', 'forage'],
    pills: ['JPMorgan Code for Good 2026', 'Bikiran Foundation', 'Social Impact', 'Forage Program'],
    answer: `Boga Vivek was selected to participate in **JPMorgan Chase Code for Good 2026 – Hyderabad**!\n• Impact: Collaborated on building a transformative tech solution for the **Bikiran Foundation**.\n• Architecture: Developed backend microservices for a student career guidance platform catering to Class 9–12 students.\n• API Design: Built and integrated RESTful APIs with React for assessments, career discovery pathways, and student progress tracking.\n• Additional Training: Completed the official **Software Engineering Program – JPMorgan Chase & Co. (Forage)**.`,
    followUps: ['Tell me about the Career Guidance Platform project', 'Explain Vivek\'s DSA & ICPC contest experience']
  },
  {
    triggers: ['amazon', 'price tracker', 'price drop', 'telegram', 'puppeteer', 'chrome extension', 'scraper'],
    pills: ['Chrome MV3 Extension', 'Puppeteer Daemon', 'Node-cron', 'Telegram Webhook'],
    answer: `**Amazon Price Tracking System (Chrome Extension)**:\n• Full-stack MERN application monitoring Amazon product prices and tracking real-time fluctuations.\n• Chrome Extension: Developed a Manifest V3 extension allowing users to add Amazon products directly from product pages through RESTful API integration.\n• Automation Daemon: Automated price checks using **Puppeteer** headless scraper and **Node-cron** scheduled workers.\n• Real-time Alerts: Sends instant price-drop webhook notifications directly to user devices via **Telegram Bot API**.`,
    followUps: ['What other projects has Vivek built?', 'What developer tools does Vivek use?']
  },
  {
    triggers: ['ambulance', 'traffic', 'green corridor', 'emergency', 'signals', 'signal prioritization'],
    pills: ['Smart City Routing', 'Green Corridors', 'Express.js & MongoDB', 'Dynamic Prioritization'],
    answer: `**Ambulance Priority Traffic Control System**:\n• Smart emergency management system generating automatic green corridors for ambulances during emergencies.\n• APIs & Database: Constructed RESTful APIs with Node.js and Express.js, integrating MongoDB to manage real-time traffic signal telemetry and vehicle detection events.\n• Priority Logic: Implemented intelligent signal-prioritization logic to detect approaching ambulances and dynamically regulate signal cycles at intersections to clear congestion.`,
    followUps: ['Tell me about Amazon Price Tracker', 'What are Vivek\'s database skills?']
  },
  {
    triggers: ['project', 'projects', 'what have you built', 'work', 'applications', 'portfolio projects', 'software'],
    pills: ['MERN Stack', 'Chrome Extensions', 'Puppeteer Automation', 'Smart City IoT'],
    answer: `Vivek has engineered 3 major production-grade projects:\n1. **Amazon Price Tracking System (Chrome Extension)**: Full-stack MERN app with Chrome MV3 Extension, Puppeteer scraper, Node-cron, and Telegram Bot alerts.\n2. **Student Career Discovery & Guidance Platform**: Built in collaboration with **JPMorgan Chase & Co. & Bikiran Foundation** (React, Tailwind CSS, Node.js, Express, MongoDB, Firebase).\n3. **Ambulance Priority Traffic Control System**: Smart traffic routing generating automatic green corridors using Node.js, Express, and MongoDB.`,
    followUps: ['Tell me about JPMorgan Chase Code for Good 2026', 'Why should we hire Vivek for an SDE Internship?']
  },
  {
    triggers: ['dsa', 'icpc', 'competitive', 'cp', 'algorithms', 'data structures', 'problem solving', 'leetcode', 'codeforces', 'c++'],
    pills: ['ICPC Contestant', 'DSA Focus', 'C++ STL Mastery', 'VJ Data Questers'],
    answer: `Vivek is an active competitive programmer with deep algorithmic rigor:\n• **ICPC Contestant**: Participated in prestigious ICPC programming contests, applying advanced Data Structures & Algorithms to solve challenging problems under contest pressure.\n• Core Areas: Dynamic Programming, Graph Theory (BFS/DFS, shortest paths), Trees, Binary Search, Greedy methods, and asymptotic optimization.\n• Languages for CP: C++ (STL) and Java.\n• Community: Active member of **VJ Data Questers** and **Student Force** at VNR VJIET.`,
    followUps: ['What coursework has Vivek completed?', 'What programming languages does Vivek know?']
  },
  {
    triggers: ['skills', 'stack', 'tech stack', 'technologies', 'proficient', 'what do you know', 'tools'],
    pills: ['MERN Stack', 'Java & Python', 'Postman & Puppeteer', 'MongoDB & MySQL'],
    answer: `Vivek's technical toolkit includes:\n• **Languages**: Java, Python, JavaScript (ES6+), C++, SQL\n• **Web Frameworks**: React.js, Node.js, Express.js, HTML5, CSS3, Tailwind CSS\n• **Databases**: MongoDB, MySQL, Firebase\n• **Developer Tools**: Postman, Git, GitHub, VS Code\n• **Automation & Systems**: REST APIs, Puppeteer, Chrome Extensions (MV3), Node-cron\n• **Coursework**: Data Structures & Algorithms, DBMS, OOP, Operating Systems, Design & Analysis of Algorithms.`,
    followUps: ['What databases does Vivek know?', 'What certifications does Vivek hold?']
  },
  {
    triggers: ['languages', 'programming language', 'java', 'python', 'javascript', 'c++', 'cpp', 'sql'],
    pills: ['Java', 'Python (HackerRank)', 'JavaScript (ES6+)', 'C++', 'SQL'],
    answer: `Vivek is proficient in 5 core programming languages:\n1. **Java**: OOP design, Collections Framework, multithreading, and enterprise backend fundamentals.\n2. **Python**: Certified by HackerRank; utilized for data manipulation, scripts, automation, and AI.\n3. **JavaScript (ES6+)**: Asynchronous event loop, Promises, modern DOM manipulation, full-stack MERN.\n4. **C++**: Used for competitive programming, ICPC contests, and high-performance algorithms.\n5. **SQL**: Relational database queries, joins, indexing, and schema design in MySQL.`,
    followUps: ['What developer tools does Vivek use?', 'What are Vivek\'s certifications?']
  },
  {
    triggers: ['database', 'databases', 'mongodb', 'mysql', 'nosql', 'firebase', 'mongoose'],
    pills: ['MongoDB (NoSQL)', 'MySQL (Relational)', 'Firebase Auth/Store', 'Mongoose ODM'],
    answer: `Vivek works proficiently across both NoSQL and Relational database paradigms:\n• **MongoDB**: Document modeling, indexing, aggregation pipelines, and Mongoose ODM for scalable full-stack applications (used in all 3 featured projects).\n• **MySQL**: Normalized relational schemas, complex joins, indexing, and ACID transaction concepts.\n• **Firebase**: Cloud Firestore, real-time database, and Firebase Authentication for rapid prototyping.`,
    followUps: ['Summarize Vivek\'s MERN stack & automation skills', 'What projects has Vivek built?']
  },
  {
    triggers: ['certification', 'certifications', 'certificate', 'training', 'courses', 'licenses', 'ibm', 'servicenow', 'smartbridge', 'hackerrank'],
    pills: ['JPMorgan Chase (Forage)', 'ServiceNow & SmartBridge', 'HackerRank Python', 'IBM Generative AI'],
    answer: `Vivek holds 4 verified certifications & industry training credentials:\n1. **Software Engineering Program** – JPMorgan Chase & Co. (Forage)\n2. **Digital Transformation Simulation** – ServiceNow & SmartBridge\n3. **Python Programming** – HackerRank (Verified Skill Assessment)\n4. **Introduction to Generative AI** – IBM`,
    followUps: ['Tell me about JPMorgan Chase Code for Good 2026', 'Why should we hire Vivek for an SDE Internship?']
  },
  {
    triggers: ['coursework', 'courses', 'subjects', 'os', 'operating systems', 'daa', 'dbms', 'oop'],
    pills: ['Operating Systems', 'DAA', 'DBMS', 'OOP', 'DSA'],
    answer: `Vivek has completed rigorous foundational computer science coursework at VNR VJIET:\n• **Data Structures and Algorithms (DSA)**\n• **Design and Analysis of Algorithms (DAA)** (Greedy, Divide & Conquer, Dynamic Programming, NP-completeness)\n• **Operating Systems (OS)** (Process scheduling, concurrency, synchronization, memory management, file systems)\n• **Database Management Systems (DBMS)** (Relational algebra, normalization, indexing, transaction processing)\n• **Object-Oriented Programming (OOP)** (Encapsulation, inheritance, polymorphism, design patterns).`,
    followUps: ['Explain Vivek\'s DSA & ICPC contest experience', 'What is Vivek\'s academic CGPA?']
  },
  {
    triggers: ['data science', 'ai', 'artificial intelligence', 'machine learning', 'ml', 'genai', 'generative ai'],
    pills: ['CSE (Data Science)', 'IBM GenAI Certified', 'Python Analytics', 'AI Applications'],
    answer: `Vivek specializes in **Data Science** as his core undergraduate branch at VNR VJIET:\n• Undergrad Specialization: B.Tech in CSE (Data Science) focusing on statistics, data manipulation, and scalable computational pipelines.\n• Certification: Certified by **IBM in Introduction to Generative AI**.\n• Hands-on Tools: Python (Pandas, NumPy basics), SQL analytics, and integrating AI models into web applications.`,
    followUps: ['What are Vivek\'s certifications?', 'Why should we hire Vivek for an SDE Internship?']
  },
  {
    triggers: ['why hire', 'internship', 'hire vivek', 'sde', 'strengths', 'candidate', 'why should we hire'],
    pills: ['Top 9.55 CGPA', 'JPMorgan Experience', 'ICPC Rigor', 'Full-Stack MERN Ready'],
    answer: `Why Boga Vivek is an exceptional hire for an SDE Internship:\n1. **Academic Excellence**: 9.55 / 10 CGPA at VNR VJIET and 983 / 1000 in Intermediate—demonstrating consistent dedication and quick learning.\n2. **Proven Full-Stack Engineering**: Selected for JPMorgan Chase Code for Good 2026; built production systems with MERN, Chrome Extensions, and Puppeteer daemons.\n3. **Algorithmic Problem-Solving**: ICPC contestant with deep mastery of Data Structures, Algorithms, and Operating Systems.\n4. **Immediate Productivity**: Self-driven, proficient with Git, Postman, Node.js, and React.js, ready to contribute from Day 1.`,
    followUps: ['How can I contact Vivek directly?', 'What are his 3 featured projects?']
  },
  {
    triggers: ['contact', 'email', 'phone', 'number', 'reach', 'connect', 'linkedin', 'github', 'hire', 'location'],
    pills: ['vivekboga2006@gmail.com', '+91-8121714172', 'Hyderabad, India', 'LinkedIn & GitHub'],
    answer: `You can reach Boga Vivek directly:\n• **Email**: vivekboga2006@gmail.com\n• **Phone / WhatsApp**: +91-8121714172\n• **LinkedIn**: linkedin.com/in/vivekboga\n• **GitHub**: github.com/VivekBoga09\n• **Location**: Hyderabad, Telangana, India\n• **Status**: Open to Software Development Engineer (SDE) Internships and Engineering opportunities.`,
    followUps: ['Why should we hire Vivek for an SDE Internship?', 'What projects has Vivek built?']
  },
  {
    triggers: ['who are you', 'who is vivek', 'about vivek', 'introduce', 'summary', 'tell me about yourself', 'bio'],
    pills: ['CSE (Data Science)', 'VNR VJIET', '9.55 CGPA', 'MERN & ICPC'],
    answer: `**Boga Vivek** is a Computer Science and Engineering (Data Science) undergraduate at VNR VJIET, Hyderabad (CGPA: 9.55 / 10).\nHe is a full-stack MERN developer, ICPC competitive programmer, and automation enthusiast. He was selected for **JPMorgan Chase Code for Good 2026 – Hyderabad**, where he built backend services for the Bikiran Foundation career discovery platform. He specializes in React.js, Node.js, Express.js, MongoDB, Puppeteer browser automation, and algorithms.`,
    followUps: ['Why should we hire Vivek for an SDE Internship?', 'Tell me about JPMorgan Chase Code for Good 2026']
  }
];

export default function AIAssistant({ playBlip }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'matcher'
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am **VivekAI**, an intelligent recruiter copilot trained on Boga Vivek's verified resume, academic standing, and engineering work. Ask me any question or pick a suggested topic below!",
      pills: ['JPMorgan Code for Good 2026', '9.55 CGPA', 'MERN Stack', 'ICPC Contestant'],
      followUps: [
        'Why should we hire Vivek for an SDE Internship?',
        'Tell me about JPMorgan Chase Code for Good 2026',
        'What is Vivek\'s academic CGPA and college?',
        'What projects has Vivek built?'
      ]
    }
  ]);

  // Role Matcher State
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [roleMatchResult, setRoleMatchResult] = useState({
    matchScore: 98,
    strengths: [
      'React.js component architecture & Tailwind CSS',
      'Express.js & Node.js REST API microservices',
      'MongoDB document schemas & Mongoose ODM',
      'End-to-end full stack execution (JPMorgan & Amazon projects)'
    ],
    relevantProjects: [
      'Student Career Discovery Platform (JPMorgan Chase & Co.)',
      'Amazon Price Tracking System (Chrome Extension & Puppeteer)'
    ],
    status: 'Exemplary Match for Software Development Engineer (SDE) Internship'
  });

  // Local query match fallback
  const getLocalAnswer = (query) => {
    const q = query.toLowerCase().trim();
    let best = null;
    let maxScore = 0;
    for (const item of LOCAL_KNOWLEDGE) {
      let score = 0;
      for (const trig of item.triggers) {
        if (q.includes(trig)) score += trig.length >= 5 ? 5 : 3;
      }
      if (score > maxScore) {
        maxScore = score;
        best = item;
      }
    }
    if (best && maxScore > 0) return best;

    // Token fallback
    const tokens = q.split(/\W+/).filter((w) => w.length > 2);
    for (const item of LOCAL_KNOWLEDGE) {
      const corpus = (item.answer + ' ' + item.triggers.join(' ')).toLowerCase();
      let hits = 0;
      for (const tok of tokens) {
        if (corpus.includes(tok)) hits++;
      }
      if (hits > 0) return item;
    }

    return LOCAL_KNOWLEDGE[LOCAL_KNOWLEDGE.length - 1]; // About Vivek
  };

  const handleAsk = async (queryText) => {
    const q = (queryText || inputQuery).trim();
    if (!q) return;

    if (playBlip) playBlip(750);
    setInputQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer,
          pills: data.relatedPills || [],
          followUps: data.followUps || []
        }
      ]);
      if (playBlip) playBlip(880);
    } catch {
      // High-precision local fallback
      const local = getLocalAnswer(q);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: local.answer,
          pills: local.pills,
          followUps: local.followUps || []
        }
      ]);
      if (playBlip) playBlip(880);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculateRoleMatch = async (roleName) => {
    setSelectedRole(roleName);
    if (playBlip) playBlip(720);
    try {
      const res = await fetch('/api/ai/match-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: roleName })
      });
      const data = await res.json();
      setRoleMatchResult({
        matchScore: data.matchScore,
        strengths: data.strengths,
        relevantProjects: data.relevantProjects,
        status: data.status
      });
    } catch {
      // Fallback
    }
  };

  // Text-To-Speech for individual message
  const handleSpeakMessage = (text, index) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown asterisks and bullets for pleasant speech
    const cleanSpeech = text.replace(/\*\*/g, '').replace(/•/g, '').replace(/[\n]+/g, '. ');
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
    setSpeakingIndex(index);
  };

  // Copy message text
  const handleCopyMessage = (text, index) => {
    if (playBlip) playBlip(700);
    const cleanText = text.replace(/\*\*/g, '');
    navigator.clipboard.writeText(cleanText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Clear conversation
  const handleClearChat = () => {
    if (playBlip) playBlip(600);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeakingIndex(null);
    setMessages([
      {
        sender: 'ai',
        text: "Conversation cleared. Ask me anything about Vivek's qualifications, ICPC contests, JPMorgan experience, or skills!",
        pills: ['JPMorgan Code for Good', '9.55 CGPA', 'MERN Stack'],
        followUps: SUGGESTED_PROMPTS.slice(0, 4)
      }
    ]);
  };

  // Format text helper: renders **bold** and newlines
  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n');
    return lines.map((line, lIdx) => {
      // Parse **bold** parts
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lIdx} className="ai-line-p">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trending AI Button (Right Edge) */}
      <div className="ai-floating-trigger-wrap">
        <button
          className="ai-floating-btn"
          onClick={() => {
            if (playBlip) playBlip(600);
            setIsOpen(!isOpen);
          }}
          title="Open VivekAI Recruiter Assistant"
          aria-label="Ask VivekAI"
        >
          <div className="ai-btn-glow" />
          <span className="ai-sparkle"><i className="fa-solid fa-wand-magic-sparkles" /></span>
          <span className="ai-label">Ask VivekAI</span>
          <span className="ai-live-badge">LIVE</span>
        </button>
      </div>

      {/* AI Assistant Modal / Drawer */}
      {isOpen && (
        <div className="modal-backdrop active" onClick={() => setIsOpen(false)}>
          <div className="modal-dialog glass-card ai-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header ai-modal-header">
              <div className="ai-header-title-wrap">
                <div className="ai-avatar-pill">
                  <i className="fa-solid fa-brain" />
                </div>
                <div>
                  <div className="ai-title-row">
                    <h3 className="modal-title">VivekAI Copilot</h3>
                    <span className="ai-version-tag">AI Intelligence v2.7</span>
                  </div>
                  <p className="ai-subtitle">Comprehensive Recruiter Evaluation & Dynamic Role Fit</p>
                </div>
              </div>

              <div className="ai-header-actions">
                <div className="ai-tab-pill-group">
                  <button
                    className={`ai-tab-pill ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => {
                      if (playBlip) playBlip(500);
                      setActiveTab('chat');
                    }}
                  >
                    <i className="fa-solid fa-comments" /> Ask AI
                  </button>
                  <button
                    className={`ai-tab-pill ${activeTab === 'matcher' ? 'active' : ''}`}
                    onClick={() => {
                      if (playBlip) playBlip(500);
                      setActiveTab('matcher');
                    }}
                  >
                    <i className="fa-solid fa-bullseye" /> Role Fit Analyzer
                  </button>
                </div>
                <button
                  className="ai-clear-btn"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                >
                  <i className="fa-solid fa-trash-can" />
                </button>
                <button className="modal-close-btn" onClick={() => setIsOpen(false)} aria-label="Close modal">&times;</button>
              </div>
            </div>

            {/* Body */}
            <div className="modal-body ai-modal-body">
              {activeTab === 'chat' ? (
                <div className="ai-chat-view">
                  {/* Suggestion Chips */}
                  <div className="ai-suggestions-row">
                    <span className="ai-sugg-label"><i className="fa-solid fa-lightbulb text-yellow" /> Recruiter Topics:</span>
                    <div className="ai-sugg-scroll">
                      {SUGGESTED_PROMPTS.map((prompt, i) => (
                        <button
                          key={i}
                          className="ai-sugg-chip"
                          onClick={() => handleAsk(prompt)}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="ai-messages-feed" role="log" aria-live="polite">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`ai-message-row ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                        {msg.sender === 'ai' && (
                          <div className="ai-msg-avatar">
                            <i className="fa-solid fa-brain" />
                          </div>
                        )}
                        <div className="ai-msg-bubble">
                          <div className="ai-msg-content">
                            {renderFormattedText(msg.text)}
                          </div>

                          {/* Pills */}
                          {msg.pills && msg.pills.length > 0 && (
                            <div className="ai-msg-pills">
                              {msg.pills.map((pill, pIdx) => (
                                <span key={pIdx} className="ai-msg-pill">
                                  <i className="fa-solid fa-check" /> {pill}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Follow-up Interactive Prompts */}
                          {msg.followUps && msg.followUps.length > 0 && msg.sender === 'ai' && (
                            <div className="ai-followups-container">
                              <span className="ai-followup-title">Explore further:</span>
                              <div className="ai-followup-chips">
                                {msg.followUps.map((fu, fIdx) => (
                                  <button
                                    key={fIdx}
                                    className="ai-followup-chip"
                                    onClick={() => handleAsk(fu)}
                                  >
                                    <i className="fa-solid fa-arrow-right" /> {fu}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Message Actions (TTS Voice & Copy) */}
                          {msg.sender === 'ai' && (
                            <div className="ai-msg-actions-bar">
                              <button
                                className={`ai-msg-action-btn ${speakingIndex === idx ? 'active-speaking' : ''}`}
                                onClick={() => handleSpeakMessage(msg.text, idx)}
                                title={speakingIndex === idx ? 'Stop speech' : 'Listen to answer'}
                                aria-label="Listen to answer"
                              >
                                <i className={`fa-solid ${speakingIndex === idx ? 'fa-stop text-pink' : 'fa-volume-high'}`} />
                                <span>{speakingIndex === idx ? 'Stop' : 'Listen'}</span>
                              </button>

                              <button
                                className="ai-msg-action-btn"
                                onClick={() => handleCopyMessage(msg.text, idx)}
                                title="Copy response"
                                aria-label="Copy response"
                              >
                                <i className={`fa-solid ${copiedIndex === idx ? 'fa-check text-green' : 'fa-copy'}`} />
                                <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="ai-message-row ai">
                        <div className="ai-msg-avatar">
                          <i className="fa-solid fa-brain" />
                        </div>
                        <div className="ai-msg-bubble ai-typing-indicator">
                          <span>Synthesizing verified resume details</span>
                          <span className="dots">...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Box */}
                  <div className="ai-input-wrap">
                    <input
                      type="text"
                      className="form-control ai-input"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                      placeholder="Ask anything about Vivek's JPMorgan project, ICPC, MERN stack, or CGPA..."
                      aria-label="Ask VivekAI a question"
                    />
                    <button
                      className="btn btn-primary ai-send-btn"
                      onClick={() => handleAsk()}
                      disabled={isLoading}
                      aria-label="Send message"
                    >
                      <i className="fa-solid fa-paper-plane" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Role Fit Analyzer Tab */
                <div className="ai-matcher-view">
                  <div className="ai-matcher-intro">
                    <h4><i className="fa-solid fa-chart-line text-cyan" /> Match Vivek Against Target Roles</h4>
                    <p>Select your open position to analyze Vivek's algorithmic, full-stack, and project alignment:</p>
                  </div>

                  {/* Role Selection Buttons */}
                  <div className="role-selector-grid">
                    {ROLES.map((r, i) => (
                      <button
                        key={i}
                        className={`role-select-card ${selectedRole === r ? 'active' : ''}`}
                        onClick={() => handleCalculateRoleMatch(r)}
                      >
                        <i className={`fa-solid ${i === 0 ? 'fa-layer-group' : i === 1 ? 'fa-server' : i === 2 ? 'fa-code' : 'fa-brain'}`} />
                        <span>{r}</span>
                      </button>
                    ))}
                  </div>

                  {/* Match Gauge Card */}
                  <div className="matcher-results-card glass-card">
                    <div className="gauge-row">
                      <div className="gauge-circle">
                        <span className="gauge-number">{roleMatchResult.matchScore}%</span>
                        <span className="gauge-label">Match Score</span>
                      </div>
                      <div className="gauge-summary">
                        <h4 className="role-verdict-title">
                          <i className="fa-solid fa-circle-check text-green" /> {roleMatchResult.status}
                        </h4>
                        <p className="role-verdict-sub">
                          Evaluated against Vivek's 9.55 CGPA @ VNR VJIET, JPMorgan Code for Good 2026 participation, ICPC contests, and MERN production code.
                        </p>
                      </div>
                    </div>

                    <div className="matcher-details-grid">
                      <div className="matcher-detail-col">
                        <h5><i className="fa-solid fa-bolt text-yellow" /> Key Verified Strengths</h5>
                        <ul className="matcher-bullets">
                          {roleMatchResult.strengths.map((str, sIdx) => (
                            <li key={sIdx}>{str}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="matcher-detail-col">
                        <h5><i className="fa-solid fa-laptop-code text-cyan" /> Proven Project Evidence</h5>
                        <ul className="matcher-bullets">
                          {roleMatchResult.relevantProjects.map((proj, pIdx) => (
                            <li key={pIdx}><strong>{proj}</strong></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
