const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

dotenv.config();
const app = express();

// Allowed origins for CORS - update with your frontend deployed URLs
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite dev server
  'https://vercel-frontend-test-ruddy.vercel.app',
  process.env.FRONTEND_URL || '' // Will be set in Vercel environment variables
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowedOrigins.indexOf(req.headers.origin) !== -1) {
    corsOptions = {
      origin: req.headers.origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    };
  } else {
    corsOptions = { origin: false }; // Disable CORS for this request
  }
  callback(null, corsOptions);
};

// Apply CORS middleware globally as the first middleware
app.use(cors(corsOptionsDelegate));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  res.status(200).json({ message: 'Data received successfully' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
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
