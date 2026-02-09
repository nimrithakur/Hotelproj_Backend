const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();

// Middleware
// CORS configuration - allows local development and production frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://hotelproj-frontend.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, server-side requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow any localhost origin for development
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    
    // Allow Vercel preview deployments
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
// We are removing the deprecated options here as they can cause warnings in newer Mongoose versions
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel_booking';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
    
    // If Atlas fails, try local MongoDB
    if (MONGODB_URI.includes('mongodb+srv://')) {
      console.log('⚠ Attempting to connect to local MongoDB...');
      mongoose
        .connect('mongodb://localhost:27017/hotel_booking')
        .then(() => console.log('✓ Connected to local MongoDB successfully'))
        .catch((localErr) => {
          console.error('✗ Local MongoDB connection also failed:', localErr.message);
          console.log('⚠ Server will continue running but database operations will fail');
          console.log('💡 To fix this:');
          console.log('   1. Whitelist your IP in MongoDB Atlas, OR');
          console.log('   2. Install and start local MongoDB: sudo systemctl start mongod');
        });
    } else {
      console.log('⚠ Server will continue running but database operations will fail');
      console.log('💡 Make sure MongoDB is installed and running: sudo systemctl start mongod');
    }
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Hotel Booking API is running!' });
});

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const hotelCount = mongoose.connection.readyState === 1 
      ? await require('./models/hotel').countDocuments() 
      : 0;
    
    res.json({
      status: 'ok',
      database: dbStatus,
      hotelCount: hotelCount,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
});