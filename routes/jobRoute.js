const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const {verifyToken} = require("../middlewares/authMiddleware");

// Create a new job
router.post('/jobs', jobController.createJob);

// Get all jobs
router.get('/jobs', jobController.getAllJobs);

router.get('/jobs/byId/:id', jobController.getJobById);

// Get a single job by email
router.get('/jobs/:email', verifyToken, jobController.getJobsByEmail);

// Update a job
router.patch('/jobs/:id', jobController.updateJob);

// Delete a job
router.delete('/jobs/:id', jobController.deleteJob);

module.exports = router;
