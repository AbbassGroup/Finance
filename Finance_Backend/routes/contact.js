const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Home page form
router.post('/home-form', contactController.submitHomeForm);

// Contact Us page message form
router.post('/message', contactController.submitMessage);

module.exports = router; 