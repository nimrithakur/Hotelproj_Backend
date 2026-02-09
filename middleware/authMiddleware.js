const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Path: ../models/User (one level up to backend, then into models)

// --- 1. Function to Generate a JWT ---
// This is used in authRoutes.js upon user registration or login
const generateToken = (id) => {
  // Use the JWT_SECRET from your .env file
  // Token expires in 7 days for security and session management
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d', 
  });
};


// --- 2. Middleware to Protect Routes ---
// This ensures that only authenticated users can access certain routes
const protect = async (req, res, next) => {
  let token;

  // 1. Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (split "Bearer <token>" and take the second element)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (excluding password)
      // We attach the user object to the request so downstream controllers can access it (req.user)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      // If user is found, proceed to the next middleware/route handler
      next();
    } catch (error) {
      // Handle cases where token is expired, invalid, or secret is wrong
      console.error(error);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  // 2. Handle case where no token is provided
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};


module.exports = {
  generateToken,
  protect,
};
