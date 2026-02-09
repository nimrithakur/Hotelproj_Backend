const mongoose = require('mongoose');

// Define the schema for a Hotel Booking
const BookingSchema = new mongoose.Schema({
  // --- References ---
  // The user who made the booking (required)
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Links to the 'User' model
    required: true,
  },
  // The hotel being booked (required)
  hotel: {
    type: mongoose.Schema.ObjectId,
    // *** GOOD PRACTICE FIX: Changed 'hotel' to 'Hotel' to match model name convention ***
    ref: 'Hotel', 
    required: true,
  },
  
  // --- Booking Details ---
  checkInDate: {
    type: Date,
    required: [true, 'Check-in date is required'],
  },
  checkOutDate: {
    type: Date,
    required: [true, 'Check-out date is required'],
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'Must have at least one guest'],
  },
  
  // --- Financial/Status ---
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative'],
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Pending', 'Cancelled'],
    default: 'Confirmed', // Default status upon creation
  },
  
  // Optional field for special requests
  specialRequests: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true, // Adds createdAt (booking date) and updatedAt fields
});

// Export the model, naming the collection 'Booking' (Mongoose automatically pluralizes to 'bookings')
module.exports = mongoose.model('Booking', BookingSchema);
