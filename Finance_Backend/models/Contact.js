const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  formType: {
    type: String,
    enum: ['home-form', 'message'],
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: function() {
      return this.formType === 'home-form';
    }
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: function() {
      return this.formType === 'message';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema); 