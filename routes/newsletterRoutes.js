const express = require('express');
const Newsletter = require('../models/newsletter');

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email: email.toLowerCase() });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed to our newsletter!',
        });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.subscribedAt = new Date();
        await existingSubscription.save();

        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }
    }

    // Create new subscription
    const newSubscription = new Newsletter({ email: email.toLowerCase() });
    await newSubscription.save();

    // In production, you would send a welcome email here
    // await sendWelcomeEmail(email);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed! Check your inbox for exclusive deals.',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed!',
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.',
    });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const subscription = await Newsletter.findOne({ email: email.toLowerCase() });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list',
      });
    }

    subscription.isActive = false;
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe. Please try again later.',
    });
  }
});

// Get all subscribers (admin only - you can add auth middleware)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true }).select('email subscribedAt');

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers',
    });
  }
});

module.exports = router;
