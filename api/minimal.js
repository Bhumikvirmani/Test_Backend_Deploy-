// Minimal API endpoint for Vercel
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET request
  if (req.method === 'GET') {
    res.status(200).json({
      status: 'success',
      message: 'API is running'
    });
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      res.status(200).json({
        status: 'success',
        message: 'Data received successfully'
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'Error processing request'
      });
    }
    return;
  }

  // Handle unsupported methods
  res.status(405).json({
    status: 'error',
    message: 'Method not allowed'
  });
};
