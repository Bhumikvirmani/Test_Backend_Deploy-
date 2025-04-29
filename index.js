const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Allowed origins for CORS - update with your frontend deployed URL
const allowedOrigins = [
  'http://localhost:3000',
  'https://vercel-frontend-test-git-main-bhumiks-projects.vercel.app'
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

app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({ extended: true }));

// Handle preflight OPTIONS requests
app.options('*', cors(corsOptionsDelegate));

app.post('/', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  res.status(200).json({ message: 'Data received successfully' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
