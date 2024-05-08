const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');

// Create a new bid
router.post('/bids', bidController.createBid);

// Get all bids
router.get('/bids', bidController.getAllBids);

// Get a single bid by ID
router.get('/bids/:id', bidController.getBidById);

router.get('/bids/byEmail/:email', bidController.getBidsByEmail);
router.get('/bid-requests/byEmail/:email', bidController.getBidRequestsByEmail);
router.patch('/bids/:id/status', bidController.updateStatus);

// Update a bid
router.patch('/bids/:id', bidController.updateBid);

// Delete a bid
router.delete('/bids/:id', bidController.deleteBid);

module.exports = router;
