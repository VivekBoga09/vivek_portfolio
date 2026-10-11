import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import apiRouter from './routes/api.js';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Connection
await connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve API Routes
app.use('/api', apiRouter);

// Serve static assets from client dist if built
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Fallback to client index.html for React SPA routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      // If client not yet built, provide API greeting
      res.json({
        service: 'Boga Vivek Portfolio MERN Backend',
        status: 'online',
        endpoints: [
          '/api/health',
          '/api/projects',
          '/api/skills',
          '/api/stats',
          '/api/contact',
          '/api/terminal'
        ],
        instructions: 'Run `npm run dev:client` to launch the React frontend on http://localhost:5173'
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Boga Vivek Portfolio MERN Server running on port ${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
  console.log(`📡 API Projects: http://localhost:${PORT}/api/projects`);
  console.log(`📡 API Skills: http://localhost:${PORT}/api/skills`);
  console.log(`📡 API Contact: http://localhost:${PORT}/api/contact`);
  console.log(`====================================================`);
});
