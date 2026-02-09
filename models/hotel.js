const mongoose = require('mongoose');

// Define the schema for the Hotel
const HotelSchema = new mongoose.Schema({
  // --- Basic Information ---
  name: {
    type: String,
    required: [true, 'A hotel name is required'],
    trim: true,
    unique: true, // Assuming hotel names must be unique for listing purposes
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  // --- Pricing and Rating ---
  price: {
    type: Number,
    required: [true, 'Price per night is required'],
    min: [0, 'Price cannot be negative'],
  },
  starRating: {
    type: Number,
    required: [true, 'Star rating is required'],
    min: [1, 'Rating must be at least 1 star'],
    max: [5, 'Rating cannot exceed 5 stars'],
  },
  
  // --- Features and Images ---
  amenities: {
    type: [String], // Array of strings (e.g., WiFi, Pool, Parking)
    default: [],
  },
  images: {
    type: [String], // Array of URLs to image assets
    default: [],
  },
  
  // --- Management/Reference ---
  // Reference to the User who created/manages this hotel listing
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // This links to the 'User' model (You'll need a User.js file)
    required: true,
  },
  
  // --- Availability/Review Meta ---
  // Placeholder for future features like review count or average rating
  averageRating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },

  // Optional fields for geo-location if you implement searching by proximity
  // location: { 
  //   type: { type: String, enum: ['Point'] },
  //   coordinates: { type: [Number], index: '2dsphere' }
  // }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Export the model, naming the collection 'Hotel' (Mongoose automatically pluralizes to 'hotels')
module.exports = mongoose.model('Hotel', HotelSchema);
