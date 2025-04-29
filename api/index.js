const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Simplified CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
    'https://vercel-frontend-test-ruddy.vercel.app',
    'https://testproject-frontend.vercel.app',
    'https://frontend-npob8lq5l-bhumiks-projects.vercel.app',
    process.env.FRONTEND_URL || ''
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware globally as the first middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check route
app.get('/', (_, res) => {
  res.status(200).send('API is running');
});

// Data submission endpoint
app.post('/', (req, res) => {
  try {
    const { name, email, message } = req.body;

    // In production, avoid console.log as it can slow down serverless functions
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    }

    res.status(200).json({
      success: true,
      message: 'Data received successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error processing request',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the serverless handler for Vercel
module.exports = serverless(app);
