const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const corsMiddleware = require('./middleware/cors');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(corsMiddleware);

// The careers route handles multipart/form-data, so it comes BEFORE the json body parser.
app.use('/api/careers', require('./routes/careers'));

// The json body parser is needed for other routes like contact.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/contact', require('./routes/contact'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'ABBASS Finance Backend API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: process.env.GENERIC_ERROR_MESSAGE || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : (process.env.PRODUCTION_ERROR_MESSAGE || 'Internal server error')
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: process.env.NOT_FOUND_MESSAGE || 'Route not found' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
}); 