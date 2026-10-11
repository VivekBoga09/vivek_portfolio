import express from 'express';
import nodemailer from 'nodemailer';
import { Message } from '../models/Message.js';
import { Project } from '../models/Project.js';
import { isDBConnected, getFallbackStore } from '../config/db.js';

const router = express.Router();

// Seeded Projects Data from Boga Vivek's updated verified resume
const INITIAL_PROJECTS = [
  {
    slug: 'amazon-price-tracker',
    title: 'Amazon Price Tracking System (Chrome Extension)',
    category: 'mern',
    categoryLabel: 'MERN Stack • Puppeteer • Node-Cron',
    status: 'Production Ready',
    badge: 'Chrome Extension + Bot',
    badgeType: 'cyan',
    image: '/assets/images/project-amazon.jpg',
    description: 'Engineered a full-stack MERN application to monitor Amazon product prices and track price fluctuations in real time. Features a Chrome Extension for 1-click product tracking and Telegram Bot automated price drop notifications.',
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
        text: 'React frontend with Express/Node backend, managing product watchlists, historical snapshots, and user alerting thresholds in MongoDB.'
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
      'Telegram Bot API'
    ],
    githubUrl: 'https://github.com/VivekBoga09',
    architecturePoints: [
      'Manifest V3 Chrome Extension injects scripts into Amazon product DOM to harvest ASINs and prices.',
      'Express.js microservice records target price triggers and tracking subscriptions into MongoDB collections.',
      'Puppeteer scraping worker runs on node-cron schedule with stealth bypass techniques.',
      'Webhook engine routes formatted markdown notifications to Telegram Bot API.'
    ]
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
    description: 'Developed backend services for a student career guidance platform for Class 9–12 students in collaboration with JPMorgan Chase & Co. and Bikiran Foundation, bridging the career discovery gap for rural and semi-urban learners.',
    highlights: [
      {
        title: 'JPMorgan Chase & Bikiran Foundation Collaboration:',
        text: 'Developed backend services for an impactful career guidance platform designed for Class 9–12 students across India.'
      },
      {
        title: 'RESTful API Engineering:',
        text: 'Built and integrated REST APIs with the React frontend for assessments, career profiles, and student progress tracking.'
      },
      {
        title: 'Empowering Underserved Students:',
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
    githubUrl: 'https://github.com/VivekBoga09',
    architecturePoints: [
      'High-throughput Express REST APIs deliver psychometric assessment scoring and career match suggestions.',
      'MongoDB document datastore archives student progress, school cohorts, and personalized mentor interactions.',
      'Firebase auth & media pipelines ensure secure, low-latency access even over variable rural mobile network connections.',
      'React frontend features responsive UI tailored for accessible student exploration.'
    ]
  },
  {
    slug: 'ambulance-priority-traffic',
    title: 'Ambulance Priority Traffic Control System',
    category: 'mern',
    categoryLabel: 'Smart City • MERN Stack',
    status: 'Real-time Logic',
    badge: 'Emergency Corridor',
    badgeType: 'blue',
    image: '/assets/images/project-traffic.jpg',
    description: 'Designed a smart traffic management system that generates automatic green corridors for ambulances during emergencies, dynamically regulating traffic flow and reducing critical transit latency.',
    highlights: [
      {
        title: 'Automatic Green Corridors:',
        text: 'Designed a smart traffic management system that generates automatic green corridors for ambulances during emergency transit.'
      },
      {
        title: 'RESTful Signal APIs:',
        text: 'Constructed RESTful APIs using Node.js and Express.js and integrated MongoDB to manage traffic signal data and ambulance detection requests.'
      },
      {
        title: 'Prioritization Logic:',
        text: 'Implemented intelligent signal-prioritization logic to detect approaching ambulances and dynamically regulate traffic flow at congested intersections.'
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
      'Smart City Logic'
    ],
    githubUrl: 'https://github.com/VivekBoga09',
    architecturePoints: [
      'Emergency vehicle client transmits telemetry and priority clearance request to Express.js endpoints.',
      'Intelligent signal scheduler computes intersection arrival windows and preempts conflicting red phases.',
      'MongoDB maintains state history, emergency event records, and traffic density metrics.',
      'React monitoring dashboard offers live intersection telemetry and manual supervisor controls.'
    ]
  }
];

// 1. Health check & DB status
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Boga Vivek Portfolio API',
    database: {
      connected: isDBConnected(),
      engine: isDBConnected() ? 'MongoDB Cloud/Local' : 'Resilient In-Memory & File Store'
    }
  });
});

// 2. Fetch Projects
router.get('/projects', async (req, res) => {
  try {
    if (isDBConnected()) {
      const dbProjects = await Project.find({});
      if (dbProjects && dbProjects.length > 0) {
        return res.json({ success: true, count: dbProjects.length, data: dbProjects });
      }
    }
    res.json({ success: true, count: INITIAL_PROJECTS.length, data: INITIAL_PROJECTS });
  } catch (error) {
    res.json({ success: true, count: INITIAL_PROJECTS.length, data: INITIAL_PROJECTS });
  }
});

// 3. Fetch Skills
router.get('/skills', (req, res) => {
  res.json({
    success: true,
    data: {
      languages: [
        { name: 'Java', level: 'Proficient', score: 90, note: 'OOP, Collections Framework, Competitive Programming' },
        { name: 'Python', level: 'Certified (HackerRank)', score: 92, note: 'Data structures, automation, AI applications, problem-solving' },
        { name: 'JavaScript (ES6+)', level: 'Advanced', score: 90, note: 'Asynchronous event loops, DOM, Promises, modern ES6+' },
        { name: 'C++', level: 'Advanced', score: 88, note: 'STL, algorithms, ICPC contest problem solving' },
        { name: 'SQL', level: 'Intermediate', score: 85, note: 'Complex queries, indexing, joins, schema design' }
      ],
      web: [
        { name: 'React.js', level: 'Advanced', score: 90, note: 'Hooks, state management, modular components, SPA architecture' },
        { name: 'Node.js', level: 'Proficient', score: 88, note: 'Event-driven runtime, scalable backend microservices' },
        { name: 'Express.js', level: 'Proficient', score: 88, note: 'REST API design, middleware, auth routing, error handling' },
        { name: 'HTML & CSS', level: 'Expert', score: 95, note: 'Tailwind CSS, responsive layouts, CSS grid/flexbox' },
        { name: 'REST APIs', level: 'Advanced', score: 92, note: 'Endpoint optimization, JSON serialization, Postman testing' }
      ],
      databases: [
        { name: 'MongoDB', level: 'Proficient', score: 88, note: 'NoSQL collections, Mongoose ODM, aggregation pipelines' },
        { name: 'MySQL', level: 'Proficient', score: 85, note: 'Relational schemas, foreign keys, ACID compliance' },
        { name: 'Firebase', level: 'Intermediate', score: 82, note: 'Realtime database, authentication, cloud storage' }
      ],
      tools: [
        { name: 'Postman', level: 'Advanced', score: 90, note: 'API testing, collection runner, mock servers, request validation' },
        { name: 'Puppeteer Automation', level: 'Advanced', score: 90, note: 'Headless browser scraping, DOM automation, anti-bot handling' },
        { name: 'Chrome Extensions', level: 'Advanced', score: 88, note: 'Manifest V3, content scripts, background workers, storage' },
        { name: 'Node-cron', level: 'Proficient', score: 86, note: 'Automated scheduled jobs, background interval workers' },
        { name: 'Git & GitHub', level: 'Proficient', score: 90, note: 'Version control, branching, PRs, collaborative workflows' }
      ],
      fundamentals: [
        { name: 'Data Structures & Algorithms', level: 'Exemplary', score: 95, note: 'ICPC Contestant, Trees, Graphs, DP, Binary Search' },
        { name: 'Design & Analysis of Algorithms', level: 'Exemplary', score: 94, note: 'Asymptotic complexity, divide & conquer, greedy, dynamic programming' },
        { name: 'Database Management Systems', level: 'Advanced', score: 90, note: 'Relational calculus, indexing, ACID transactions, normalization' },
        { name: 'Operating Systems', level: 'Advanced', score: 88, note: 'Process scheduling, threads, memory management, virtual memory, synchronization' },
        { name: 'Object-Oriented Programming', level: 'Advanced', score: 92, note: 'Inheritance, Polymorphism, Encapsulation, Abstraction' }
      ]
    }
  });
});

// 4. Fetch Stats & Resume Highlights
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Boga Vivek',
      cgpa: '9.55 / 10',
      college: 'VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad',
      department: 'Computer Science and Engineering (Data Science)',
      intermediateMarks: '983 / 1000',
      intermediateCollege: 'Sri Chaitanya College',
      achievements: [
        'Selected to participate in JPMorgan Chase Code for Good 2026 – Hyderabad (Bikiran Foundation)',
        'Participated in ICPC programming contests',
        'Active competitive programmer with strong focus on DSA',
        'Member, VJ Data Questers & Student Force, VNR VJIET'
      ],
      certifications: [
        'Software Engineering Program – JPMorgan Chase & Co. (Forage)',
        'Digital Transformation Simulation – ServiceNow & SmartBridge',
        'Python Programming – HackerRank',
        'Introduction to Generative AI – IBM'
      ]
    }
  });
});

// 5. Contact Form Submission (POST to MongoDB)
// 5. Contact Form Submission (POST to MongoDB & Send via Gmail)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, subject, message.'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const clientIP = req.ip || req.connection.remoteAddress || '127.0.0.1';
    let savedRecord = null;

    if (isDBConnected()) {
      const newMessage = new Message({
        name,
        email,
        subject,
        message,
        ip: clientIP
      });
      savedRecord = await newMessage.save();
    } else {
      savedRecord = {
        _id: 'msg_' + Date.now(),
        name,
        email,
        subject,
        message,
        ip: clientIP,
        createdAt: new Date()
      };
      getFallbackStore().messages.unshift(savedRecord);
    }

    console.log(`[Contact Received] From ${name} (${email}): "${subject}"`);

    // Direct Gmail Web Compose URL (1-click send in user's browser)
    const emailSubject = `[Portfolio Inquiry] ${subject} - from ${name}`;
    const emailBody = `Dear Boga Vivek,\n\n${message}\n\n---\nSent by: ${name}\nEmail: ${email}\nReceived via: Boga Vivek MERN Portfolio`;
    const gmailDirectUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vivekboga2006@gmail.com&su=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Automated Backend Gmail SMTP Dispatch via Nodemailer (if GMAIL_APP_PASSWORD is set)
    let emailSentViaSmtp = false;
    const gmailUser = process.env.GMAIL_USER || 'vivekboga2006@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS;

    if (gmailPass && gmailPass.trim() !== '') {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass.trim()
          }
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${gmailUser}>`,
          to: 'vivekboga2006@gmail.com',
          replyTo: email,
          subject: emailSubject,
          text: emailBody,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; background-color: #f8fafc; border-radius: 8px;">
              <h2 style="color: #0284c7; margin-top: 0;">🚀 New Portfolio Message for Boga Vivek</h2>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
              <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              <div style="background: #ffffff; padding: 16px; border-left: 4px solid #00f2fe; border-radius: 4px; margin: 15px 0;">
                <p style="white-space: pre-wrap; margin: 0; font-size: 15px; line-height: 1.6;">${message}</p>
              </div>
              <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
                Delivered automatically via Boga Vivek MERN Portfolio Server • Client IP: ${clientIP}
              </p>
            </div>
          `
        });
        emailSentViaSmtp = true;
        console.log(`[Gmail SMTP Success] Successfully delivered email to vivekboga2006@gmail.com`);
      } catch (smtpErr) {
        console.warn(`[Gmail SMTP Notice] Could not deliver via SMTP directly (${smtpErr.message}). Using web Gmail fallback.`);
      }
    }

    return res.status(201).json({
      success: true,
      emailSentViaSmtp,
      gmailDirectUrl,
      mailtoUri: `mailto:vivekboga2006@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
      message: emailSentViaSmtp
        ? 'Message sent directly to Boga Vivek via Gmail!'
        : 'Message saved! Opening Gmail so you can confirm and send directly to vivekboga2006@gmail.com.',
      data: {
        id: savedRecord._id,
        name: savedRecord.name,
        email: savedRecord.email,
        subject: savedRecord.subject,
        createdAt: savedRecord.createdAt
      }
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message.'
    });
  }
});

// 6. List Contact Inquiries (GET)
router.get('/contact/messages', async (req, res) => {
  try {
    if (isDBConnected()) {
      const messages = await Message.find({}).sort({ createdAt: -1 }).limit(20);
      return res.json({ success: true, count: messages.length, data: messages });
    }
    const messages = getFallbackStore().messages;
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Trending AI Feature: VivekAI Recruiter Assistant Endpoint
const VIVEK_KNOWLEDGE_BASE = [
  {
    category: 'cgpa_and_academics',
    triggers: ['cgpa', 'gpa', 'marks', 'percentage', 'score', 'grades', 'pointer', 'intermediate', '12th', 'sri chaitanya', 'rank', 'academic standing'],
    pills: ['9.55 / 10 CGPA', '983 / 1000 Inter', 'VNR VJIET', 'Top Percentile'],
    answer: `Boga Vivek has a standout academic track record:
• B.Tech in CSE (Data Science) at VNR VJIET, Hyderabad (2024–2028): Outstanding **9.55 / 10 CGPA**.
• Intermediate at Sri Chaitanya College (2022–2024): Exceptional **983 / 1000 marks (98.3%)**.
This consistent academic excellence demonstrates strong analytical rigor, dedication, and mathematical fundamentals that translate directly into high-quality engineering.`
  },
  {
    category: 'college_and_education',
    triggers: ['college', 'university', 'institute', 'vnr', 'vjiet', 'btech', 'degree', 'undergrad', 'education', 'studying', 'where do you study', 'campus', 'branch', 'data science'],
    pills: ['VNR VJIET Hyderabad', 'CSE (Data Science)', '2024-2028', 'Sri Chaitanya'],
    answer: `Boga Vivek is pursuing his **B.Tech in Computer Science and Engineering (Data Science)** (2024–2028) at **VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)**, Hyderabad, maintaining a **9.55 / 10 CGPA**.
Prior to this, he completed his Intermediate education (MPC) at **Sri Chaitanya College** (2022–2024) scoring **983 / 1000 (98.3%)**.`
  },
  {
    category: 'jpmorgan_code_for_good',
    triggers: ['jpmorgan', 'jp morgan', 'cfg', 'code for good', 'bikiran', 'hackathon', 'forage'],
    pills: ['JPMorgan Code for Good 2026', 'Bikiran Foundation', 'Social Impact', 'Forage Program'],
    answer: `Boga Vivek was selected to participate in **JPMorgan Chase Code for Good 2026 – Hyderabad**!
• Impact: Collaborated on building a transformative tech solution for the **Bikiran Foundation**.
• Architecture: Developed backend microservices for a student career guidance platform catering to Class 9–12 students.
• API Design: Built and integrated RESTful APIs with React for assessments, career discovery pathways, and student progress tracking.
• Additional Training: Successfully completed the official **Software Engineering Program – JPMorgan Chase & Co. (Forage)**.`
  },
  {
    category: 'amazon_price_tracker',
    triggers: ['amazon', 'price tracker', 'price drop', 'telegram', 'puppeteer', 'chrome extension', 'scraper'],
    pills: ['Chrome MV3 Extension', 'Puppeteer Daemon', 'Node-cron', 'Telegram Webhook'],
    answer: `**Amazon Price Tracking System (Chrome Extension)**:
• Architecture: Full-stack MERN application to monitor Amazon product prices and track real-time fluctuations.
• Chrome Extension: Developed a Manifest V3 extension allowing users to add Amazon products directly from product pages through RESTful API integration.
• Automation Daemon: Automated price checks using **Puppeteer** headless browser and **Node-cron** scheduled workers.
• Real-time Alerts: Sends instant price-drop webhook notifications directly to user devices via **Telegram Bot API**.`
  },
  {
    category: 'career_guidance_project',
    triggers: ['career discovery', 'guidance platform', 'student career', 'rural students', 'class 9', 'bikiran platform'],
    pills: ['JPMorgan Collab', 'Bikiran Foundation', 'React & Tailwind', 'Firebase & MongoDB'],
    answer: `**Student Career Discovery & Guidance Platform** (JPMorgan Chase & Co. & Bikiran Foundation Collaboration):
• Purpose: Bridges the career-guidance gap for rural and semi-urban Class 9–12 students by providing accessible resources and mentor-support pathways.
• Backend & APIs: Built scalable REST APIs using Express.js and MongoDB to manage assessment results, profile data, and mentor connections.
• Frontend: Built an intuitive, accessible UI in React.js and Tailwind CSS with Firebase authentication, optimized for low-bandwidth environments.`
  },
  {
    category: 'ambulance_traffic_system',
    triggers: ['ambulance', 'traffic', 'green corridor', 'emergency', 'signals', 'signal prioritization'],
    pills: ['Smart City Routing', 'Green Corridors', 'Express.js & MongoDB', 'Dynamic Prioritization'],
    answer: `**Ambulance Priority Traffic Control System**:
• Mission: Smart emergency management system generating automatic green corridors for ambulances during medical emergencies.
• APIs & Database: Constructed RESTful APIs with Node.js and Express.js, integrating MongoDB to manage real-time traffic signal telemetry and vehicle detection events.
• Priority Logic: Implemented intelligent signal-prioritization logic to detect approaching ambulances and dynamically regulate signal cycles at intersections to clear congestion.`
  },
  {
    category: 'projects_overview',
    triggers: ['project', 'projects', 'what have you built', 'work', 'applications', 'portfolio projects', 'software'],
    pills: ['MERN Stack', 'Chrome Extensions', 'Puppeteer Automation', 'Smart City IoT'],
    answer: `Vivek has engineered 3 major production-grade projects:
1. **Amazon Price Tracking System (Chrome Extension)**: Full-stack MERN app with Chrome MV3 Extension, Puppeteer scraper, Node-cron, and Telegram Bot alerts.
2. **Student Career Discovery & Guidance Platform**: Built in collaboration with **JPMorgan Chase & Co. & Bikiran Foundation** (React, Tailwind CSS, Node.js, Express, MongoDB, Firebase).
3. **Ambulance Priority Traffic Control System**: Smart traffic routing generating automatic green corridors using Node.js, Express, and MongoDB.
Each project features interactive live simulators you can test in this portfolio!`
  },
  {
    category: 'competitive_coding_and_dsa',
    triggers: ['dsa', 'icpc', 'competitive', 'cp', 'algorithms', 'data structures', 'problem solving', 'leetcode', 'codeforces', 'c++', 'time complexity'],
    pills: ['ICPC Contestant', 'DSA Focus', 'C++ STL Mastery', 'VJ Data Questers'],
    answer: `Vivek is an active competitive programmer with deep algorithmic rigor:
• **ICPC Contestant**: Participated in prestigious ICPC programming contests, applying advanced Data Structures & Algorithms to solve challenging problems under contest pressure.
• Core Areas: Dynamic Programming, Graph Theory (BFS/DFS, shortest paths), Trees, Binary Search, Greedy methods, and asymptotic optimization.
• Languages for CP: C++ (STL) and Java.
• Community: Active member of **VJ Data Questers** and **Student Force** at VNR VJIET.`
  },
  {
    category: 'technical_skills_and_stack',
    triggers: ['skills', 'stack', 'tech stack', 'technologies', 'proficient', 'what do you know', 'tools'],
    pills: ['MERN Stack', 'Java & Python', 'Postman & Puppeteer', 'MongoDB & MySQL'],
    answer: `Vivek's technical toolkit includes:
• **Languages**: Java, Python, JavaScript (ES6+), C++, SQL
• **Web Frameworks**: React.js, Node.js, Express.js, HTML5, CSS3, Tailwind CSS
• **Databases**: MongoDB, MySQL, Firebase
• **Developer Tools**: Postman, Git, GitHub, VS Code
• **Automation & Systems**: REST APIs, Puppeteer, Chrome Extensions (MV3), Node-cron
• **Coursework**: Data Structures & Algorithms, DBMS, OOP, Operating Systems, Design & Analysis of Algorithms.`
  },
  {
    category: 'programming_languages',
    triggers: ['languages', 'programming language', 'java', 'python', 'javascript', 'c++', 'cpp', 'sql', 'coding language'],
    pills: ['Java', 'Python (HackerRank)', 'JavaScript (ES6+)', 'C++', 'SQL'],
    answer: `Vivek is proficient in 5 core programming languages:
1. **Java**: OOP design, Collections Framework, multithreading, and enterprise backend fundamentals.
2. **Python**: Certified by HackerRank; utilized for data manipulation, scripts, automation, and AI.
3. **JavaScript (ES6+)**: Asynchronous event loop, Promises, modern DOM manipulation, full-stack MERN.
4. **C++**: Used for competitive programming, ICPC contests, and high-performance algorithms.
5. **SQL**: Relational database queries, joins, indexing, and schema design in MySQL.`
  },
  {
    category: 'databases',
    triggers: ['database', 'databases', 'mongodb', 'mysql', 'nosql', 'firebase', 'mongoose'],
    pills: ['MongoDB (NoSQL)', 'MySQL (Relational)', 'Firebase Auth/Store', 'Mongoose ODM'],
    answer: `Vivek works proficiently across both NoSQL and Relational database paradigms:
• **MongoDB**: Document modeling, indexing, aggregation pipelines, and Mongoose ODM for scalable full-stack applications (used in all 3 featured projects).
• **MySQL**: Normalized relational schemas, complex joins, indexing, and ACID transaction concepts.
• **Firebase**: Cloud Firestore, real-time database, and Firebase Authentication for rapid prototyping.`
  },
  {
    category: 'tools_and_automation',
    triggers: ['postman', 'puppeteer', 'node-cron', 'cron', 'extension', 'tools', 'git', 'github', 'automation'],
    pills: ['Postman', 'Puppeteer', 'Chrome Extensions', 'Node-cron', 'Git/GitHub'],
    answer: `Vivek leverages professional developer and automation tooling:
• **Postman**: Constructing, testing, and documenting RESTful API endpoints and automating test requests.
• **Puppeteer**: Headless browser automation for live scraping and web data extraction (Amazon Price Tracker).
• **Chrome Extensions (MV3)**: Building interactive browser extensions with service workers and content scripts.
• **Node-cron**: Scheduling automated background daemons and recurring polling jobs.
• **Git & GitHub**: Distributed version control, branches, PR reviews, and team collaboration.`
  },
  {
    category: 'certifications',
    triggers: ['certification', 'certifications', 'certificate', 'training', 'courses', 'licenses', 'ibm', 'servicenow', 'smartbridge', 'hackerrank'],
    pills: ['JPMorgan Chase (Forage)', 'ServiceNow & SmartBridge', 'HackerRank Python', 'IBM Generative AI'],
    answer: `Vivek holds 4 verified certifications & industry training credentials:
1. **Software Engineering Program** – JPMorgan Chase & Co. (Forage)
2. **Digital Transformation Simulation** – ServiceNow & SmartBridge
3. **Python Programming** – HackerRank (Verified Skill Assessment)
4. **Introduction to Generative AI** – IBM`
  },
  {
    category: 'coursework',
    triggers: ['coursework', 'courses', 'subjects', 'os', 'operating systems', 'daa', 'dbms', 'oop', 'design and analysis of algorithms'],
    pills: ['Operating Systems', 'DAA', 'DBMS', 'OOP', 'DSA'],
    answer: `Vivek has completed rigorous foundational computer science coursework at VNR VJIET:
• **Data Structures and Algorithms (DSA)**
• **Design and Analysis of Algorithms (DAA)** (Greedy, Divide & Conquer, Dynamic Programming, NP-completeness)
• **Operating Systems (OS)** (Process scheduling, concurrency, synchronization, memory management, file systems)
• **Database Management Systems (DBMS)** (Relational algebra, normalization, indexing, transaction processing)
• **Object-Oriented Programming (OOP)** (Encapsulation, inheritance, polymorphism, design patterns).`
  },
  {
    category: 'data_science_and_ai',
    triggers: ['data science', 'ai', 'artificial intelligence', 'machine learning', 'ml', 'genai', 'generative ai'],
    pills: ['CSE (Data Science)', 'IBM GenAI Certified', 'Python Analytics', 'AI Applications'],
    answer: `Vivek specializes in **Data Science** as his core undergraduate branch at VNR VJIET:
• Undergrad Specialization: B.Tech in CSE (Data Science) focusing on statistics, data manipulation, and scalable computational pipelines.
• Certification: Certified by **IBM in Introduction to Generative AI**.
• Hands-on Tools: Python (Pandas, NumPy basics), SQL analytics, and integrating AI models into web applications.`
  },
  {
    category: 'why_hire_vivek',
    triggers: ['why hire', 'internship', 'hire vivek', 'sde', 'strengths', 'candidate', 'why should we hire'],
    pills: ['Top 9.55 CGPA', 'JPMorgan Experience', 'ICPC Rigor', 'Full-Stack MERN Ready'],
    answer: `Why Boga Vivek is an exceptional hire for an SDE Internship:
1. **Academic Excellence**: 9.55 / 10 CGPA at VNR VJIET and 983 / 1000 in Intermediate—demonstrating consistent dedication and quick learning.
2. **Proven Full-Stack Engineering**: Selected for JPMorgan Chase Code for Good 2026; built production systems with MERN, Chrome Extensions, and Puppeteer daemons.
3. **Algorithmic Problem-Solving**: ICPC contestant with deep mastery of Data Structures, Algorithms, and Operating Systems.
4. **Immediate Productivity**: Self-driven, proficient with Git, Postman, Node.js, and React.js, ready to contribute from Day 1.`
  },
  {
    category: 'contact_and_socials',
    triggers: ['contact', 'email', 'phone', 'number', 'reach', 'connect', 'linkedin', 'github', 'hire', 'location', 'where are you located'],
    pills: ['vivekboga2006@gmail.com', '+91-8121714172', 'Hyderabad, India', 'LinkedIn & GitHub'],
    answer: `You can reach Boga Vivek directly:
• **Email**: vivekboga2006@gmail.com
• **Phone / WhatsApp**: +91-8121714172
• **LinkedIn**: linkedin.com/in/vivekboga
• **GitHub**: github.com/VivekBoga09
• **Location**: Hyderabad, Telangana, India
• **Status**: Open to Software Development Engineer (SDE) Internships and Engineering opportunities.`
  },
  {
    category: 'activities_and_clubs',
    triggers: ['clubs', 'activities', 'achievements', 'vj data questers', 'student force', 'leadership', 'community'],
    pills: ['VJ Data Questers', 'Student Force', 'ICPC Contestant', 'JPMorgan 2026'],
    answer: `Key Achievements & Extracurricular Activities:
• **JPMorgan Chase Code for Good 2026 – Hyderabad**: Selected to collaborate on tech solutions for Bikiran Foundation.
• **ICPC Programming Contests**: Participated in competitive programming contests applying advanced DSA.
• **Member, VJ Data Questers & Student Force, VNR VJIET**: Active student contributor promoting data science and collaborative student initiatives.
• **HackerRank Certified**: Certified in Python Problem Solving.`
  },
  {
    category: 'about_vivek',
    triggers: ['who are you', 'who is vivek', 'about vivek', 'introduce', 'summary', 'tell me about yourself', 'bio'],
    pills: ['CSE (Data Science)', 'VNR VJIET', '9.55 CGPA', 'MERN & ICPC'],
    answer: `**Boga Vivek** is a Computer Science and Engineering (Data Science) undergraduate at VNR VJIET, Hyderabad (CGPA: 9.55 / 10).
He is a full-stack MERN developer, ICPC competitive programmer, and automation enthusiast. He was selected for **JPMorgan Chase Code for Good 2026 – Hyderabad**, where he built backend services for the Bikiran Foundation career discovery platform. He specializes in React.js, Node.js, Express.js, MongoDB, Puppeteer browser automation, and algorithms.`
  }
];

router.post('/ai/ask', (req, res) => {
  const { query = '' } = req.body;
  const q = query.toLowerCase().trim();

  if (!q) {
    return res.json({
      success: true,
      query: '',
      answer: "Hello! Ask me anything about Boga Vivek's education, 9.55 CGPA, JPMorgan Code for Good 2026 project, ICPC coding experience, skills, certifications, or contact details!",
      relatedPills: ['9.55 CGPA', 'JPMorgan Code for Good 2026', 'MERN Stack', 'ICPC Contestant'],
      confidence: '100%',
      category: 'welcome',
      followUps: [
        'Why should we hire Vivek for an SDE Internship?',
        'Tell me about JPMorgan Chase Code for Good 2026',
        'What is Vivek\'s CGPA and college?',
        'What projects has Vivek built?'
      ]
    });
  }

  // 1. Check exact/keyword triggers
  let bestMatch = null;
  let highestScore = 0;

  for (const item of VIVEK_KNOWLEDGE_BASE) {
    let score = 0;
    for (const trigger of item.triggers) {
      if (q.includes(trigger)) {
        score += trigger.length >= 5 ? 5 : 3;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // 2. If score is positive, return the best match
  if (bestMatch && highestScore > 0) {
    return res.json({
      success: true,
      query,
      answer: bestMatch.answer,
      relatedPills: bestMatch.pills,
      confidence: `${Math.min(99.8, 93 + highestScore)}%`,
      category: bestMatch.category,
      followUps: [
        'Why should we hire Vivek for an SDE Internship?',
        'Explain Vivek\'s DSA & ICPC contest experience',
        'What certifications does Vivek have?',
        'How can I contact Vivek directly?'
      ].filter((f) => !f.toLowerCase().includes(bestMatch.category.slice(0, 4)))
    });
  }

  // 3. Fallback: Intelligent token-level matching across knowledge base
  const queryTokens = q.split(/\W+/).filter((w) => w.length > 2);
  let tokenBest = null;
  let maxTokenHits = 0;

  for (const item of VIVEK_KNOWLEDGE_BASE) {
    let hits = 0;
    const itemCorpus = (item.answer + ' ' + item.triggers.join(' ')).toLowerCase();
    for (const tok of queryTokens) {
      if (itemCorpus.includes(tok)) hits++;
    }
    if (hits > maxTokenHits) {
      maxTokenHits = hits;
      tokenBest = item;
    }
  }

  if (tokenBest && maxTokenHits > 0) {
    return res.json({
      success: true,
      query,
      answer: tokenBest.answer,
      relatedPills: tokenBest.pills,
      confidence: '95.2%',
      category: tokenBest.category,
      followUps: [
        'Tell me about JPMorgan Chase Code for Good 2026',
        'What are Vivek\'s skills and tech stack?',
        'What is Vivek\'s academic CGPA?'
      ]
    });
  }

  // 4. Default Smart Summary Answer
  return res.json({
    success: true,
    query,
    answer: `Boga Vivek is a Computer Science and Engineering (Data Science) undergraduate at VNR VJIET (CGPA: **9.55 / 10**), selected for **JPMorgan Chase Code for Good 2026 – Hyderabad**.
He is an ICPC programming contestant and full-stack MERN engineer proficient in React.js, Node.js, Express.js, MongoDB, Postman, Python, Java, C++, and Puppeteer automation.
Feel free to ask specifically about his projects, coding contests, coursework, certifications, or contact info!`,
    relatedPills: ['9.55 CGPA', 'JPMorgan Code for Good 2026', 'Full-Stack MERN', 'ICPC Contestant'],
    confidence: '94.5%',
    category: 'summary',
    followUps: [
      'Why should we hire Vivek for an SDE Internship?',
      'Tell me about JPMorgan Chase Code for Good 2026',
      'What are his 3 featured projects?'
    ]
  });
});


// 8. Trending AI Feature: AI Role Fit Analyzer
router.post('/ai/match-role', (req, res) => {
  const { role = 'Full-Stack MERN Developer' } = req.body;
  const r = role.toLowerCase();

  let matchScore = 96;
  let strengths = [];
  let relevantProjects = [];

  if (r.includes('mern') || r.includes('full-stack') || r.includes('web')) {
    matchScore = 98;
    strengths = ['React.js component architecture', 'Express.js & Node.js REST services', 'MongoDB database modeling & Mongoose', 'Tailwind CSS & responsive layouts'];
    relevantProjects = ['Student Career Platform (JPMorgan Chase)', 'Amazon Price Tracking System (Chrome Ext)'];
  } else if (r.includes('backend') || r.includes('api')) {
    matchScore = 96;
    strengths = ['RESTful API construction & Postman testing', 'Node.js event-driven architecture', 'MongoDB & MySQL databases', 'Scheduled daemon workers with node-cron'];
    relevantProjects = ['JPMorgan Career Platform API Services', 'Ambulance Priority Traffic Control APIs'];
  } else if (r.includes('algorithm') || r.includes('dsa') || r.includes('problem solver')) {
    matchScore = 97;
    strengths = ['ICPC programming contest participation', 'Exemplary DSA and Design & Analysis of Algorithms', 'Strong C++ and Java implementation speed', 'Operating Systems & System architecture'];
    relevantProjects = ['Ambulance Signal Prioritization Algorithm', 'Competitive Programming Tracks'];
  } else {
    matchScore = 95;
    strengths = ['High academic performance (CGPA 9.55 / 10)', 'Collaborative problem solving (JPMorgan Code for Good 2026)', 'Puppeteer browser automation', 'Python Programming Certified (HackerRank)'];
    relevantProjects = ['All 3 Featured Production Projects'];
  }

  res.json({
    success: true,
    role,
    matchScore,
    strengths,
    relevantProjects,
    status: 'Highly Recommended for SDE Internship Interview'
  });
});

// 9. Interactive Terminal Endpoint
router.post('/terminal', (req, res) => {
  const { command } = req.body;
  const cmd = (command || '').trim().toLowerCase();

  switch (cmd) {
    case 'help':
      return res.json({
        output: [
          'Available commands:',
          '  whoami       - Display developer summary and profile',
          '  skills       - Print core programming languages and frameworks',
          '  projects     - List featured MERN and automation projects',
          '  jpmorgan     - View JPMorgan Chase Code for Good 2026 details',
          '  education    - Display degrees, college & CGPA score',
          '  icpc         - View competitive programming & ICPC history',
          '  contact      - Display email, phone, LinkedIn & GitHub links',
          '  sudo hire    - Execute hiring sequence for Boga Vivek',
          '  clear        - Clear the terminal console output'
        ]
      });

    case 'whoami':
    case 'bio':
      return res.json({
        output: [
          'NAME: Boga Vivek',
          'ROLE: CSE (Data Science) Undergraduate | Full-Stack MERN Developer',
          'COLLEGE: VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad',
          'CGPA: 9.55 / 10 | Intermediate: 983 / 1000',
          'ACHIEVEMENT: Selected for JPMorgan Chase Code for Good 2026 – Hyderabad',
          'PASSION: High-concurrency Web Apps, Browser Automation, and Algorithmic Problem Solving'
        ]
      });

    case 'jpmorgan':
    case 'cfg':
      return res.json({
        output: [
          '🏆 JPMORGAN CHASE CODE FOR GOOD 2026 (Hyderabad):',
          '  • Selected to collaborate on a technology solution for Bikiran Foundation.',
          '  • Developed backend services & REST APIs for a student career guidance platform.',
          '  • Completed Software Engineering Program – JPMorgan Chase & Co. (Forage).'
        ]
      });

    case 'skills':
      return res.json({
        output: [
          'LANGUAGES: Java, Python (HackerRank Certified), JavaScript (ES6+), C++, SQL',
          'WEB STACK: React.js, Node.js, Express.js, HTML, CSS, Tailwind CSS, REST APIs',
          'DATABASES: MongoDB (NoSQL), MySQL (Relational), Firebase',
          'DEVELOPER TOOLS: Git, GitHub, VS Code, Postman, Puppeteer, Chrome Extensions, Node-cron',
          'COURSEWORK: DSA, DBMS, OOP, Operating Systems, Design & Analysis of Algorithms'
        ]
      });

    case 'projects':
      return res.json({
        output: [
          '1. Amazon Price Tracking System (Chrome Extension) | MERN, Puppeteer, Node-Cron',
          '2. Student Career Discovery Platform | React, Tailwind CSS, Node, Express, MongoDB, Firebase (JPMorgan Collab)',
          '3. Ambulance Priority Traffic Control System | React, Express, Node, MongoDB',
          '--> Click "Deep Dive & Sim" in the projects section to explore live interactive simulators!'
        ]
      });

    case 'education':
      return res.json({
        output: [
          '🎓 B.Tech in CSE (Data Science) [2024 - 2028]',
          '   VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad',
          '   Academic Standing: CGPA 9.55 / 10',
          '',
          '🏫 Intermediate [2022 - 2024]',
          '   Sri Chaitanya College',
          '   Score: 983 / 1000 (98.3%)'
        ]
      });

    case 'icpc':
    case 'cp':
      return res.json({
        output: [
          '⚡ COMPETITIVE PROGRAMMING & ALGORITHMS:',
          '  • Participated in ICPC programming contests applying DSA to complex problem-solving.',
          '  • Active competitive programmer with a strong focus on Data Structures & Algorithms.',
          '  • Top topics: Dynamic Programming, Graph Algorithms, Binary Search, Trees, Complexity Analysis.'
        ]
      });

    case 'contact':
      return res.json({
        output: [
          'EMAIL: vivekboga2006@gmail.com',
          'PHONE: +91-8121714172',
          'LINKEDIN: https://linkedin.com/in/vivekboga',
          'GITHUB: https://github.com/VivekBoga09',
          'LOCATION: Hyderabad, Telangana, India'
        ]
      });

    case 'sudo hire':
      return res.json({
        output: [
          '🔐 Authenticating root authorization...',
          '✅ Privilege granted! Boga Vivek is available for Software Engineering Internships (2025 - 2026).',
          '🚀 Contact initiated: vivekboga2006@gmail.com / +91-8121714172',
          '🎉 Welcome to the team!'
        ]
      });

    default:
      return res.json({
        output: [
          `bash: command not found: ${cmd}`,
          "Type 'help' to inspect available commands."
        ]
      });
  }
});

// 10. Interactive Project Simulations
router.post('/simulate/price-drop', (req, res) => {
  const { originalPrice = 29990, currentPrice = 22499, productName = 'Sony WH-1000XM5' } = req.body;
  const discountPct = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  res.json({
    success: true,
    triggered: true,
    notification: {
      source: 'Telegram Bot API (PricePulse Bot)',
      product: productName,
      originalPrice,
      currentPrice,
      savings: originalPrice - currentPrice,
      discountPercentage: discountPct,
      timestamp: new Date().toLocaleTimeString(),
      text: `🚨 ALERT: ${productName} price dropped to ₹${currentPrice.toLocaleString('en-IN')}! Saved ${discountPct}% below alert threshold.`
    }
  });
});

router.post('/simulate/career-assessment', (req, res) => {
  const { track = 'tech', studentGrade = 'Class 11' } = req.body;
  
  const tracks = {
    tech: {
      domain: 'Computer Science & Software Engineering',
      recommendedStream: 'MPC (Mathematics, Physics, Chemistry) + Computer Science',
      targetDegrees: ['B.Tech in CSE / Data Science', 'B.Tech in Artificial Intelligence'],
      recommendedSkills: ['Python Basics', 'Algorithms & Logic Building', 'Web Foundations (HTML/CSS/JS)'],
      careerOutlook: 'High Demand (Average SDE Graduate starting package: 8 - 25 LPA)',
      mentorGuidance: 'Strong mathematical aptitude detected. Focus on Data Structures, OOP, and GitHub project building.'
    },
    datasci: {
      domain: 'Data Science & Machine Learning',
      recommendedStream: 'Mathematics + Statistics + Computing',
      targetDegrees: ['B.Tech in CSE (Data Science)', 'B.S. in Data Analytics'],
      recommendedSkills: ['Python & Pandas', 'Linear Algebra & Statistics', 'SQL & Data Visualization'],
      careerOutlook: 'Explosive Growth (AI/ML Engineer, Data Scientist, BI Analyst)',
      mentorGuidance: 'Excellent analytical reasoning. Build data analysis pipelines and Kaggle exploration portfolios.'
    },
    core: {
      domain: 'Electronics, Hardware & Robotics',
      recommendedStream: 'Physical Sciences & Electronics',
      targetDegrees: ['B.Tech in ECE', 'Robotics & Automation'],
      recommendedSkills: ['Embedded Systems', 'IoT & Microcontrollers', 'C/C++ Programming'],
      careerOutlook: 'Strategic Growth (Semiconductor, Embedded IoT, EV Industry)',
      mentorGuidance: 'Hardware + Firmware convergence. Pair C++ programming with microcontroller prototyping.'
    }
  };

  const recommendation = tracks[track] || tracks.tech;

  res.json({
    success: true,
    studentGrade,
    selectedTrack: track,
    collaboration: 'JPMorgan Chase Code for Good 2026 x Bikiran Foundation',
    recommendation,
    generatedAt: new Date().toISOString()
  });
});

router.post('/simulate/amazon-scrape', (req, res) => {
  const { url = 'https://www.amazon.in/dp/B09G9FPHY6' } = req.body;
  res.json({
    success: true,
    engine: 'Puppeteer Headless Daemon v22 + Chrome MV3',
    scrapedData: {
      title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
      currentPrice: 22499,
      currency: 'INR',
      inStock: true,
      lastChecked: new Date().toLocaleTimeString(),
      priceChange24h: '-25%'
    }
  });
});


router.post('/simulate/traffic-corridor', (req, res) => {
  const { ambulanceId = 'AMB-01', location = 'Intersection 4', target = 'Apollo Medical Center' } = req.body;

  res.json({
    success: true,
    corridorStatus: 'ACTIVE',
    signalPhase: 'GREEN_WAVE',
    ambulance: {
      id: ambulanceId,
      currentLocation: location,
      target,
      speedKmh: 68,
      etaSeconds: 45
    },
    signalModulation: {
      congestedWaitTimeReducedSeconds: 180,
      clearedIntersectionCount: 3,
      automaticReversionInSeconds: 60
    }
  });
});

export default router;
