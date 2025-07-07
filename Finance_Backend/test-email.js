const EmailService = require('./services/emailService');
require('dotenv').config();

async function testEmailService() {
  console.log('🧪 Testing Email Service...\n');
  
  // Test 1: Home Form
  console.log('📧 Test 1: Home Form Email');
  try {
    const homeFormData = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '0412345678',
      email: 'john.doe@example.com'
    };
    
    const result = await EmailService.sendFormSubmissionEmail(homeFormData, 'home-form');
    console.log('✅ Home form email sent successfully:', result.messageId);
  } catch (error) {
    console.log('❌ Home form email failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Contact Form
  console.log('📧 Test 2: Contact Form Email');
  try {
    const contactFormData = {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '0423456789',
      message: 'I would like to inquire about your home loan services. Please contact me at your earliest convenience.'
    };
    
    const result = await EmailService.sendFormSubmissionEmail(contactFormData, 'contact-form');
    console.log('✅ Contact form email sent successfully:', result.messageId);
  } catch (error) {
    console.log('❌ Contact form email failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Career Form
  console.log('📧 Test 3: Career Form Email');
  try {
    const careerFormData = {
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      phone: '0434567890',
      position: 'broker',
      cvFile: 'mike_johnson_cv.pdf'
    };
    
    const result = await EmailService.sendFormSubmissionEmail(careerFormData, 'career-form');
    console.log('✅ Career form email sent successfully:', result.messageId);
  } catch (error) {
    console.log('❌ Career form email failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🎯 Email Service Test Complete!');
  console.log('📧 Check sadeq@abbass.group for test emails');
  console.log('='.repeat(50));
}

// Check environment variables
console.log('🔍 Environment Check:');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? '✅ Set' : '❌ Missing');
console.log('SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL || '❌ Missing');
console.log('SENDGRID_TO_EMAIL:', process.env.SENDGRID_TO_EMAIL || '❌ Missing');
console.log('');

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL || !process.env.SENDGRID_TO_EMAIL) {
  console.log('❌ Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

testEmailService().catch(console.error); 