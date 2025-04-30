const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
console.log(`Loading environment from ${envFile}`);
dotenv.config({ path: envFile });

// Initialize Express app
const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',                    // Local development
  'https://vocal-boba-2ccc7e.netlify.app',    // Netlify deployment
  'https://test-backend-deploy-homh.onrender.com'  // Backend URL
];

// Add FRONTEND_URL from environment variables if it exists and is not already in the list
if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check route
app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    cors: {
      allowedOrigins
    }
  });
});

// Data submission endpoint
app.post('/', (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(`Received form submission:`);
    console.log(`- Name: ${name}`);
    console.log(`- Email: ${email}`);
    console.log(`- Message: ${message}`);

    res.status(200).json({
      success: true,
      message: 'Data received successfully'
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(400).json({
      success: false,
      message: 'Error processing request',
      error: error.message
    });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`- GET /: Health check`);
  console.log(`- POST /: Form submission`);
});
