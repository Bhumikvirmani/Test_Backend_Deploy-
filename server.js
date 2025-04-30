const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173'], // Vite dev server default port
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
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running locally'
  });
});

// Data submission endpoint
app.post('/', (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    
    res.status(200).json({
      success: true,
      message: 'Data received successfully'
    });
  } catch (error) {
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
});
