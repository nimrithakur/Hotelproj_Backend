const express = require('express');
const Hotel = require('../models/hotel');
const { getHotelImages } = require('../hotelImages');

const router = express.Router();

// Sample hotels data (subset for quick seeding)
const sampleHotels = [
  // Mumbai Hotels
  { name: 'Hotel Marine Plaza', city: 'Mumbai', address: 'Marine Drive, Mumbai 400020', description: 'Elegant hotel overlooking Marine Drive with modern amenities and stunning sea views.', price: 2500, starRating: 4, amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'AC'], images: getHotelImages(0), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Suba Palace', city: 'Mumbai', address: 'Colaba, Mumbai 400005', description: 'Comfortable stay near Gateway of India, perfect for budget travelers.', price: 1800, starRating: 3, amenities: ['Free WiFi', 'Restaurant', 'AC'], images: getHotelImages(1), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Godwin', city: 'Mumbai', address: 'Garden Road, Colaba, Mumbai 400001', description: 'Budget hotel with great location near tourist attractions.', price: 1500, starRating: 3, amenities: ['Free WiFi', 'AC', 'Room Service'], images: getHotelImages(2), owner: '507f1f77bcf86cd799439011' },
  
  // Delhi Hotels
  { name: 'Hotel Broadway', city: 'Delhi', address: 'Asaf Ali Road, New Delhi 110002', description: 'Heritage hotel near Old Delhi with vintage charm.', price: 2200, starRating: 4, amenities: ['Free WiFi', 'Restaurant', 'AC', 'Room Service'], images: getHotelImages(11), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Le Roi', city: 'Delhi', address: 'Paharganj, New Delhi 110055', description: 'Budget hotel in backpacker area with basic amenities.', price: 1200, starRating: 2, amenities: ['Free WiFi', 'AC'], images: getHotelImages(12), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Shelton', city: 'Delhi', address: 'Connaught Place, New Delhi 110001', description: 'Central location with easy access to metro and shopping.', price: 2800, starRating: 4, amenities: ['Free WiFi', 'Restaurant', 'AC', 'Room Service'], images: getHotelImages(13), owner: '507f1f77bcf86cd799439011' },
  
  // Bangalore Hotels
  { name: 'Hotel Empire', city: 'Bangalore', address: 'Church Street, Bangalore 560001', description: 'Centrally located hotel near MG Road metro station.', price: 2400, starRating: 4, amenities: ['Free WiFi', 'Restaurant', 'AC', 'Room Service'], images: getHotelImages(26), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Nandhana Grand', city: 'Bangalore', address: 'Koramangala, Bangalore 560034', description: 'IT hub proximity with modern amenities.', price: 1800, starRating: 3, amenities: ['Free WiFi', 'Restaurant', 'AC'], images: getHotelImages(27), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Royal Orchid', city: 'Bangalore', address: 'Brigade Road, Bangalore 560025', description: 'Shopping district hotel with excellent service.', price: 3000, starRating: 4, amenities: ['Free WiFi', 'Restaurant', 'Bar', 'AC', 'Gym'], images: getHotelImages(28), owner: '507f1f77bcf86cd799439011' },
  
  // Goa Hotels
  { name: 'Beach Paradise Resort', city: 'Goa', address: 'Calangute Beach, Goa 403516', description: 'Beachfront resort with stunning ocean views and water sports.', price: 3500, starRating: 4, amenities: ['Free WiFi', 'Restaurant', 'Beach Access', 'AC', 'Pool'], images: getHotelImages(41), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Marbella Guest House', city: 'Goa', address: 'Panjim, Goa 403001', description: 'Cozy guest house in capital city with Portuguese charm.', price: 1800, starRating: 3, amenities: ['Free WiFi', 'AC'], images: getHotelImages(42), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Beira Mar', city: 'Goa', address: 'Baga Beach, Goa 403516', description: 'Party area hotel with nightlife proximity.', price: 2200, starRating: 3, amenities: ['Free WiFi', 'Restaurant', 'AC', 'Beach Access'], images: getHotelImages(43), owner: '507f1f77bcf86cd799439011' },
  
  // Jaipur Hotels
  { name: 'Hotel Pearl Palace', city: 'Jaipur', address: 'Hari Kishan Somani Marg, Jaipur 302001', description: 'Heritage hotel with traditional Rajasthani hospitality.', price: 2000, starRating: 4, amenities: ['Free WiFi', 'Restaurant', 'AC', 'Rooftop Cafe'], images: getHotelImages(56), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Arya Niwas', city: 'Jaipur', address: 'Sansar Chandra Road, Jaipur 302001', description: 'Budget hotel near railway station with vegetarian restaurant.', price: 1500, starRating: 3, amenities: ['Free WiFi', 'Restaurant', 'AC'], images: getHotelImages(57), owner: '507f1f77bcf86cd799439011' },
  { name: 'Hotel Diggi Palace', city: 'Jaipur', address: 'SMS Hospital Road, Jaipur 302004', description: 'Palace hotel with beautiful gardens and cultural events.', price: 2800, starRating: 4, amenities: ['Free WiFi', 'Restaurant', 'AC', 'Garden'], images: getHotelImages(58), owner: '507f1f77bcf86cd799439011' },
];

// @route   POST /api/seed/hotels
// @desc    Seed database with sample hotels (WARNING: Use only once)
// @access  Public (Should be protected in production)
router.post('/hotels', async (req, res) => {
  try {
    console.log('Starting database seed...');
    
    // Check if hotels already exist
    const existingCount = await Hotel.countDocuments();
    if (existingCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Database already has ${existingCount} hotels. Clear database first if you want to reseed.`,
        count: existingCount
      });
    }

    // Insert sample hotels
    const insertedHotels = await Hotel.insertMany(sampleHotels);
    console.log(`Seeded ${insertedHotels.length} hotels successfully`);

    res.status(201).json({
      success: true,
      message: 'Database seeded successfully',
      count: insertedHotels.length,
      hotels: insertedHotels.map(h => ({ id: h._id, name: h.name, city: h.city }))
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message,
    });
  }
});

// @route   DELETE /api/seed/hotels
// @desc    Clear all hotels from database (WARNING: Destructive)
// @access  Public (Should be protected in production)
router.delete('/hotels', async (req, res) => {
  try {
    const result = await Hotel.deleteMany({});
    console.log(`Deleted ${result.deletedCount} hotels`);

    res.status(200).json({
      success: true,
      message: 'All hotels deleted',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting hotels',
      error: error.message,
    });
  }
});

module.exports = router;
