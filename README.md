# Boga Vivek — Full-Stack MERN Developer Portfolio

An ultra-modern, high-performance portfolio application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), engineered for **Boga Vivek** — Computer Science & Engineering (Data Science) undergraduate at **VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad** (CGPA: **9.55 / 10**).

---

## 🌟 Highlights & Key Features

- **Full MERN Stack Architecture**:
  - **M**ongoDB: Stores contact inquiries and project metadata via Mongoose schemas.
  - **E**xpress.js: Modular RESTful API routes (`/api/contact`, `/api/projects`, `/api/skills`, `/api/stats`, `/api/terminal`, `/api/simulate/*`).
  - **R**eact.js: Built with Vite, modern hooks, responsive grid system, and cyber-glassmorphism aesthetic.
  - **N**ode.js: High-concurrency runtime serving the API backend and React production bundle.
- **Hero Section**:
  - Live availability badge (`Available for Software Engineering Internships`).
  - Dynamic typewriter animation cycling across technical specializations.
  - Interactive 3D tilt avatar card with holographic scanline and floating technology badges.
  - Verified quick-stats counters: **9.55 / 10** CGPA, **370+** DSA questions solved, **1635** LeetCode rating.
- **Interactive Developer Terminal**:
  - Unix-style terminal executing commands (`whoami`, `skills`, `projects`, `education`, `leetcode`, `contact`, `sudo hire`, `help`).
  - Powered by live backend endpoint `POST /api/terminal` with client-side fallback.
- **Featured Projects & Deep-Dive Modals**:
  1. **Amazon Price Tracking System with Chrome Extension**: Manifest V3 extension, Puppeteer automated web scraping, node-cron daemon, Telegram Bot API discount notifications.
  2. **Ambulance Priority Traffic Control System**: Dynamic green corridor generation, emergency prioritization algorithms, and RESTful APIs.
  3. **Weather Forecast Web Application**: Real-time OpenWeather API, browser Geolocation API, and 5-day forecasts.
  - **Interactive In-Modal Simulators**: Live test buttons for price drop notifications and emergency traffic light transitions.
- **Competitive Programming & Algorithmic Showcase**:
  - LeetCode rating **1635**, 150+ solved with difficulty breakdown (Easy, Medium, Hard).
  - CodeChef 220+ problems solved in rated challenges.
  - Core CS coursework chips: DSA, DBMS, and OOP.
- **Official Printable Resume Modal**:
  - One-click pixel-perfect view matching Vivek's resume.
  - Custom `@media print` CSS for browser "Print / Save as PDF".
- **Working Contact Section**:
  - Validated contact form directly submitting to **MongoDB** via `POST /api/contact`.
  - Automatic `mailto:` client backup fallback.
  - One-click email and phone copying with toast notification feedback.
- **Modern Polish**:
  - Interactive background starfield / particle canvas.
  - Theme switcher: Cyberpunk, Obsidian, and Light modes.
  - Web Audio API synthesized futuristic UI click sound effects (toggleable).
  - Custom glowing cursor follower.

---

## 📂 Project Directory Structure

```
Portfolio/
├── client/                     # React.js Frontend (Vite)
│   ├── public/
│   │   └── assets/images/      # 3D Avatar & Project Mockups
│   ├── src/
│   │   ├── components/         # Modular React Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── TerminalPlayground.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── CompetitiveCoding.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProjectModal.jsx
│   │   │   ├── ResumeModal.jsx
│   │   │   └── AmbientBackground.jsx
│   │   ├── App.jsx             # Main Application Root
│   │   ├── main.jsx            # React Entrypoint
│   │   └── index.css           # Design System & Styling
│   ├── index.html
│   ├── vite.config.js          # API Proxy configuration
│   └── package.json
│
├── server/                     # Node.js + Express + MongoDB Backend
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose Connection & Resilient Fallback
│   ├── models/
│   │   ├── Message.js          # Contact Message Mongoose Schema
│   │   └── Project.js          # Project Mongoose Schema
│   ├── routes/
│   │   └── api.js              # RESTful API Endpoints
│   ├── server.js               # Main Express Server
│   ├── .env                    # Environment variables (PORT, MONGODB_URI)
│   └── package.json
│
└── package.json                # Root orchestration scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (Local instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### Running the Application

1. **Start the Express & MongoDB Backend**:
   ```bash
   npm run dev:server
   ```
   Server will run on `http://localhost:5000` with live API endpoints and MongoDB storage.

2. **Start the React Frontend with Vite (Dev Mode)**:
   ```bash
   npm run dev:client
   ```
   Frontend will launch on `http://localhost:5173` with instant HMR and API proxy to port 5000.

3. **Production Mode**:
   ```bash
   npm run build:client
   npm start
   ```
   Express will serve the built React app and REST API on `http://localhost:5000/`.

---

## 📬 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status and MongoDB connection verification |
| `GET` | `/api/projects` | Fetch all project data |
| `GET` | `/api/skills` | Categorized technical skills & proficiency levels |
| `GET` | `/api/stats` | Academic & competitive programming metrics |
| `POST` | `/api/contact` | Submit contact inquiry (stores directly to MongoDB) |
| `GET` | `/api/contact/messages` | Retrieve stored contact inquiries |
| `POST` | `/api/terminal` | Execute interactive developer terminal command |
| `POST` | `/api/simulate/price-drop` | Simulate Amazon price drop Telegram notification |
| `POST` | `/api/simulate/traffic-corridor` | Simulate emergency ambulance traffic light wave |

---


