const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User'); // Path is correct: one level up, then into models
const { generateToken } = require('../middleware/authMiddleware'); // Path is correct

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    try {
      console.log('Registration attempt:', { email: req.body?.email, name: req.body?.name });
      
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      console.log('Checking for existing user...');
      const existingUser = await User.findOne({
        email: email,
      });

      if (existingUser) {
        console.log('User already exists:', email);
        return res.status(400).json({
          success: false,
          message: 'Email already registered',
        });
      }

      // Create new user (password will be hashed by pre-save middleware)
      console.log('Creating new user...');
      const user = await User.create({
        name,
        email,
        password,
      });
      console.log('User created successfully:', user._id);

      // Generate token
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({
        success: false,
        message: 'Error registering user',
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
      });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      console.log('Login attempt:', { email: req.body?.email });
      
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      // Find user by email (include password for comparison)
      console.log('Finding user...');
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        console.log('User not found:', email);
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Check password
      console.log('Checking password...');
      const isPasswordCorrect = await user.matchPassword(password);

      if (!isPasswordCorrect) {
        console.log('Invalid password for user:', email);
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Generate token
      const token = generateToken(user._id);
      console.log('Login successful:', user._id);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({
        success: false,
        message: 'Error logging in',
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
      });
    }
  }
);

module.exports = router;