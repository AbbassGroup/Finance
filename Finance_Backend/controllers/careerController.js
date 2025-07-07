const Career = require('../models/Career');
const EmailService = require('../services/emailService');

// Input sanitization function
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

// Validate file upload
const validateFileUpload = (file) => {
  if (!file) {
    return { isValid: false, error: 'CV file is required' };
  }

  const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 5242880; // 5MB default
  if (file.size > maxSize) {
    return { isValid: false, error: `File size must be less than ${maxSize / 1024 / 1024}MB` };
  }

  const allowedTypes = process.env.ALLOWED_FILE_TYPES 
    ? process.env.ALLOWED_FILE_TYPES.split(',') 
    : ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  if (!allowedTypes.includes(file.mimetype)) {
    return { isValid: false, error: 'Only PDF, DOC, and DOCX files are allowed' };
  }

  return { isValid: true };
};

// Validate form data
const validateFormData = (data) => {
  const errors = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  const maxNameLength = parseInt(process.env.MAX_NAME_LENGTH) || 100;
  if (data.name && data.name.length > maxNameLength) {
    errors.push(`Name cannot exceed ${maxNameLength} characters`);
  }
  if (data.name && !/^[a-zA-Z\s'-]+$/.test(data.name.trim())) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }

  // Email validation
  if (!data.email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Please enter a valid email address');
  }
  const maxEmailLength = parseInt(process.env.MAX_EMAIL_LENGTH) || 100;
  if (data.email && data.email.length > maxEmailLength) {
    errors.push(`Email cannot exceed ${maxEmailLength} characters`);
  }

  // Phone validation
  if (!data.phone) {
    errors.push('Phone number is required');
  } else {
    const phoneDigits = data.phone.replace(/\D/g, '');
    const isMobile = /^04\d{8}$/.test(phoneDigits) || /^614\d{8}$/.test(phoneDigits) || /^4\d{8}$/.test(phoneDigits);
    const isLandline = /^02\d{8}$/.test(phoneDigits) || /^03\d{8}$/.test(phoneDigits) || /^07\d{8}$/.test(phoneDigits) || /^08\d{8}$/.test(phoneDigits) || /^612\d{8}$/.test(phoneDigits) || /^613\d{8}$/.test(phoneDigits) || /^617\d{8}$/.test(phoneDigits) || /^618\d{8}$/.test(phoneDigits);
    if (!isMobile && !isLandline) {
      errors.push('Please enter a valid Australian phone number');
    }
  }

  // Position validation (optional)
  if (data.position && !['broker', 'admin', 'sales', 'marketing', 'other'].includes(data.position)) {
    errors.push('Please select a valid position');
  }

  // Message validation (optional but if provided, validate)
  const maxMessageLength = parseInt(process.env.MAX_MESSAGE_LENGTH) || 2000;
  if (data.message && data.message.length > maxMessageLength) {
    errors.push(`Cover letter cannot exceed ${maxMessageLength} characters`);
  }

  return errors;
};

exports.submitApplication = async (req, res) => {
  try {
    // Validate file upload
    const fileValidation = validateFileUpload(req.file);
    if (!fileValidation.isValid) {
      return res.status(400).json({ 
        success: false, 
        message: fileValidation.error 
      });
    }

    // Sanitize and validate form data
    const { name, email, phone, position, message } = req.body;
    
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      position: sanitizeInput(position),
      message: sanitizeInput(message)
    };

    // Validate form data
    const validationErrors = validateFormData(sanitizedData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: process.env.CAREER_REQUIRED_FIELDS_MESSAGE || 'Validation failed',
        errors: validationErrors
      });
    }

    // Check for duplicate applications (same email within configured time period)
    const duplicateCheckHours = parseInt(process.env.DUPLICATE_CHECK_HOURS) || 24;
    const existingApplication = await Career.findOne({
      email: sanitizedData.email.toLowerCase(),
      createdAt: { $gte: new Date(Date.now() - duplicateCheckHours * 60 * 60 * 1000) }
    });

    if (existingApplication) {
      return res.status(400).json({ 
        success: false, 
        message: `You have already submitted an application within the last ${duplicateCheckHours} hours. Please wait before submitting another application.`
      });
    }

    // Create career application
    const career = new Career({
      name: sanitizedData.name,
      email: sanitizedData.email.toLowerCase(),
      phone: sanitizedData.phone,
      position: sanitizedData.position || undefined,
      message: sanitizedData.message || '',
      cvFileName: req.file.originalname,
      cvPath: req.file.path,
      cvFileSize: req.file.size,
      cvMimeType: req.file.mimetype,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || ''
    });

    // Save to database
    await career.save();

    // Send email notification
    try {
      const formData = {
        firstName: sanitizedData.name.split(' ')[0] || sanitizedData.name,
        lastName: sanitizedData.name.split(' ').slice(1).join(' ') || '',
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        message: sanitizedData.message,
        cvFile: req.file.originalname,
        cvPath: req.file.path,
        cvMimeType: req.file.mimetype
      };
      await EmailService.sendFormSubmissionEmail(formData, 'career-form');
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails, just log it
    }

    // Return success response
    res.status(201).json({ 
      success: true, 
      message: process.env.CAREER_SUCCESS_MESSAGE || 'Application submitted successfully.',
      applicationId: career._id
    });

  } catch (error) {
    console.error('Career application error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'An application with this email already exists.'
      });
    }

    res.status(500).json({ 
      success: false, 
      message: process.env.CAREER_ERROR_MESSAGE || 'Error submitting application.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all applications (admin endpoint)
exports.getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, position } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (position) query.position = position;

    const applications = await Career.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Career.countDocuments(query);

    res.json({
      success: true,
      data: applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalApplications: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving applications',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get application by ID (admin endpoint)
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Career.findById(req.params.id).select('-__v');
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update application status (admin endpoint)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be one of: pending, reviewed, shortlisted, rejected, hired' 
      });
    }

    const application = await Career.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete application (admin endpoint)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Career.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    // TODO: Delete the associated CV file from storage

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 