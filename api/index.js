const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

dotenv.config();
const app = express();
app.use(express.json());

// Allowed origins for CORS - update with your frontend deployed URLs
const allowedOrigins = [
  'http://localhost:3000',
  'https://vercel-frontend-test-ruddy.vercel.app'
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

// Apply CORS middleware globally
app.use(cors(corsOptionsDelegate));

// Explicitly handle OPTIONS preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  res.status(200).json({ message: 'Data received successfully' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Export the app wrapped with serverless-http for Vercel compatibility
module.exports.handler = serverless(app);
