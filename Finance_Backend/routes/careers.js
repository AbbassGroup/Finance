const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const upload = require('../middleware/upload');

// Job application form (with CV upload) - Public endpoint
router.post('/apply', upload.single('cv'), careerController.submitApplication);

// Admin endpoints (these would typically be protected with authentication middleware)
// Get all applications with pagination and filtering
router.get('/applications', careerController.getAllApplications);

// Get specific application by ID
router.get('/applications/:id', careerController.getApplicationById);

// Update application status
router.patch('/applications/:id/status', careerController.updateApplicationStatus);

// Delete application
router.delete('/applications/:id', careerController.deleteApplication);

module.exports = router; 