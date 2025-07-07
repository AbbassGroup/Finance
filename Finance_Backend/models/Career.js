const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [parseInt(process.env.MAX_NAME_LENGTH) || 100, 'Name cannot exceed 100 characters'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s'-]+$/.test(v);
      },
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    maxlength: [parseInt(process.env.MAX_EMAIL_LENGTH) || 100, 'Email cannot exceed 100 characters'],
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address'
    },
    index: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        // Remove all non-digit characters for validation
        const phoneDigits = v.replace(/\D/g, '');
        // Australian phone number validation
        const isMobile = /^04\d{8}$/.test(phoneDigits) || /^614\d{8}$/.test(phoneDigits) || /^4\d{8}$/.test(phoneDigits);
        const isLandline = /^02\d{8}$/.test(phoneDigits) || /^03\d{8}$/.test(phoneDigits) || /^07\d{8}$/.test(phoneDigits) || /^08\d{8}$/.test(phoneDigits) || /^612\d{8}$/.test(phoneDigits) || /^613\d{8}$/.test(phoneDigits) || /^617\d{8}$/.test(phoneDigits) || /^618\d{8}$/.test(phoneDigits);
        return isMobile || isLandline;
      },
      message: 'Please enter a valid Australian phone number'
    }
  },
  position: {
    type: String,
    trim: true,
    enum: {
      values: ['broker', 'admin', 'sales', 'marketing', 'other'],
      message: 'Please select a valid position'
    }
  },
  message: {
    type: String,
    trim: true,
    maxlength: [parseInt(process.env.MAX_MESSAGE_LENGTH) || 2000, 'Cover letter cannot exceed 2000 characters']
  },
  cvFileName: {
    type: String,
    required: [true, 'CV file is required'],
    trim: true
  },
  cvPath: {
    type: String,
    required: [true, 'CV file path is required'],
    trim: true
  },
  cvFileSize: {
    type: Number,
    required: true
  },
  cvMimeType: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        const allowedTypes = process.env.ALLOWED_FILE_TYPES 
          ? process.env.ALLOWED_FILE_TYPES.split(',') 
          : ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return allowedTypes.includes(v);
      },
      message: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'pending',
    index: true
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
careerSchema.index({ email: 1, createdAt: -1 });
careerSchema.index({ position: 1, status: 1 });
careerSchema.index({ createdAt: -1 });

// Virtual for full name
careerSchema.virtual('fullName').get(function() {
  return this.name;
});

// Pre-save middleware to sanitize data
careerSchema.pre('save', function(next) {
  // Sanitize name
  if (this.name) {
    this.name = this.name.replace(/[<>]/g, '').trim();
  }
  
  // Sanitize message
  if (this.message) {
    this.message = this.message.replace(/[<>]/g, '').trim();
  }
  
  next();
});

// Static method to get applications by status
careerSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Instance method to update status
careerSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  this.updatedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Career', careerSchema); 