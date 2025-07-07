const Contact = require('../models/Contact');
const EmailService = require('../services/emailService');

// Handle Home form submission
exports.submitHomeForm = async (req, res) => {
  try {
    const { firstName, lastName, phone, email } = req.body;
    if (!firstName || !lastName || !phone || !email) {
      return res.status(400).json({ 
        success: false, 
        message: process.env.REQUIRED_FIELDS_MESSAGE || 'All fields are required.' 
      });
    }
    
    const contact = new Contact({
      formType: 'home-form',
      firstName,
      lastName,
      phone,
      email
    });
    await contact.save();
    
    // Send email notification
    try {
      await EmailService.sendFormSubmissionEmail({ firstName, lastName, phone, email }, 'home-form');
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails, just log it
    }
    
    res.json({ 
      success: true, 
      message: process.env.HOME_FORM_SUCCESS_MESSAGE || 'Form submitted successfully.' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: process.env.FORM_SUBMISSION_ERROR_MESSAGE || 'Error submitting form.' 
    });
  }
};

// Handle Contact Us message form submission
exports.submitMessage = async (req, res) => {
  try {
    const { firstName, lastName, phone, message } = req.body;
    if (!firstName || !lastName || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: process.env.REQUIRED_FIELDS_MESSAGE || 'All fields are required.' 
      });
    }
    
    const contact = new Contact({
      formType: 'message',
      firstName,
      lastName,
      phone,
      message
    });
    await contact.save();
    
    // Send email notification
    try {
      await EmailService.sendFormSubmissionEmail({ firstName, lastName, phone, message, email: req.body.email }, 'message');
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails, just log it
    }
    
    res.json({ 
      success: true, 
      message: process.env.MESSAGE_SUCCESS_MESSAGE || 'Message sent successfully.' 
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: process.env.MESSAGE_ERROR_MESSAGE || 'Error sending message.',
      error: error.message,
      stack: error.stack
    });
  }
}; 