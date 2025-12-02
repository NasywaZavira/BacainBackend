const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const authRoutes = require("./routes/bacainRoutes");

const app = express();

// CORS configuration
const corsOptions = {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://bacain-azure.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
=======
=======
>>>>>>> Stashed changes
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

// Apply CORS to all routes
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

// Serve frontend static files when the build exists (production-ready)
const frontendDist = path.join(__dirname, "..", "Bacain", "dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  
  // SPA fallback: serve index.html for all other GET requests
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

module.exports = app;
