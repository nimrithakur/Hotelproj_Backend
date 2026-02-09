const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/booking'); // Path: ../models/Booking (assuming Booking model exists)
const Hotel = require('../models/hotel'); // Need the Hotel model to check price/availability
const { protect } = require('../middleware/authMiddleware'); // Path: ../middleware/authMiddleware

const router = express.Router();

// --- Protected Routes (Require User Login) ---

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private (Requires 'protect' middleware)
router.post(
  '/',
  protect, // Ensures the user is logged in
  [
    body('hotelId').notEmpty().withMessage('Hotel ID is required'),
    body('checkInDate')
      .isISO8601()
      .toDate()
      .withMessage('Valid check-in date is required'),
    body('checkOutDate')
      .isISO8601()
      .toDate()
      .withMessage('Valid check-out date is required'),
    body('guests')
      .isInt({
        min: 1
      })
      .withMessage('Number of guests must be at least 1'),
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

      const {
        hotelId,
        checkInDate,
        checkOutDate,
        guests
      } = req.body;

      // Basic date check
      if (checkInDate >= checkOutDate) {
        return res.status(400).json({
          success: false,
          message: 'Check-out date must be after check-in date.',
        });
      }

      // 2. Find Hotel and Calculate Total Price
      const hotel = await Hotel.findById(hotelId);

      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: 'Hotel not found.',
        });
      }

      // Calculate number of nights
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      // Use UTC dates for consistent calculation of days
      const diffDays = Math.round(Math.abs((checkOut.getTime() - checkIn.getTime()) / oneDay));

      // Calculate total price based on price per night from the Hotel model
      const totalPrice = diffDays * hotel.price;

      // 3. Create the booking
      const newBooking = await Booking.create({
        user: req.user.id, // User ID from 'protect' middleware
        hotel: hotelId,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
        status: 'Confirmed', // Default status
      });

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: newBooking,
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create booking',
        error: error.message,
      });
    }
  }
);

// @route   GET /api/bookings/my-bookings
// @desc    Get all bookings for the currently logged-in user
// @access  Private
router.get('/my-bookings', protect, async (req, res) => {
  try {
    // Find all bookings where the 'user' field matches the ID set by 'protect' middleware
    // Use .populate('hotel') to get the full hotel details linked to the booking
    const bookings = await Booking.find({
      user: req.user.id
    }).populate('hotel').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message,
    });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking',
      });
    }

    // Check if booking is already cancelled
    if (booking.status === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }

    // Update booking status
    booking.status = 'Cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message,
    });
  }
});

module.exports = router;
