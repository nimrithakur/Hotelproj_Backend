const express = require('express');
const { body, validationResult } = require('express-validator');
const Hotel = require('../models/hotel'); // Path: ../models/Hotel (assuming Hotel model exists)
const { protect } = require('../middleware/authMiddleware'); // Path: ../middleware/authMiddleware

const router = express.Router();

// --- Public Routes (Anyone can view hotels) ---

// @route   GET /api/hotels/search
// @desc    Search hotels with filters
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const query = {};
    
    // City filter (case-insensitive)
    if (req.query.city) {
      query.city = new RegExp(req.query.city, 'i');
    }
    
    // State filter
    if (req.query.state) {
      query.state = new RegExp(req.query.state, 'i');
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = parseInt(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = parseInt(req.query.maxPrice);
      }
    }
    
    // Star rating filter
    if (req.query.starRating) {
      query.starRating = { $gte: parseInt(req.query.starRating) };
    }

    const hotels = await Hotel.find(query).sort({ price: 1 }); // Sort by price ascending

    res.status(200).json({
      success: true,
      message: 'Hotels found',
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search hotels',
    });
  }
});

// @route   GET /api/hotels
// @desc    Fetch all hotels (with optional search/filter/sort)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Implement simple searching/filtering logic here
    const query = {};
    if (req.query.city) {
      query.city = new RegExp(req.query.city, 'i'); // Case-insensitive city search
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = parseInt(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = parseInt(req.query.maxPrice);
      }
    }
    
    // Star rating filter
    if (req.query.starRating) {
      query.starRating = { $gte: parseInt(req.query.starRating) };
    }

    const hotels = await Hotel.find(query).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      message: 'Hotels fetched successfully',
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotels',
    });
  }
});

// @route   GET /api/hotels/:id
// @desc    Fetch a single hotel by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hotel fetched successfully',
      data: hotel,
    });
  } catch (error) {
    console.error('Error fetching single hotel:', error);
    // Handle invalid ID format error
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid hotel ID format',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel',
    });
  }
});

// --- Protected Route (Requires authentication to create a hotel) ---

// @route   POST /api/hotels
// @desc    Create a new hotel (Requires Admin/Owner role, but we only check for login here)
// @access  Private
router.post(
  '/',
  protect, // This middleware ensures the user is logged in
  [
    body('name').notEmpty().withMessage('Hotel name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('starRating').isInt({
      min: 1,
      max: 5
    }).withMessage('Star rating must be between 1 and 5'),
  ],
  async (req, res) => {
    try {
      // 1. Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      // 2. Create the hotel object
      // Attach the user ID from the 'protect' middleware to track who created the hotel
      const newHotel = await Hotel.create({
        ...req.body,
        owner: req.user.id, // req.user.id is set by the 'protect' middleware
      });

      res.status(201).json({
        success: true,
        message: 'Hotel created successfully',
        data: newHotel,
      });
    } catch (error) {
      console.error('Error creating hotel:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create hotel',
      });
    }
  }
);


module.exports = router;
