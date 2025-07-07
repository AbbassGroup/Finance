require('dotenv').config();
const sgMail = require('@sendgrid/mail');

console.log('🔍 Testing SendGrid Setup...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? `${process.env.SENDGRID_API_KEY.substring(0, 10)}...` : '❌ Missing');
console.log('SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL || '❌ Missing');
console.log('SENDGRID_TO_EMAIL:', process.env.SENDGRID_TO_EMAIL || '❌ Missing');
console.log('');

// Check API key format
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.log('❌ SENDGRID_API_KEY is missing');
  process.exit(1);
}

if (!apiKey.startsWith('SG.')) {
  console.log('❌ API key does not start with "SG." - invalid format');
  process.exit(1);
}

console.log('✅ API key format looks correct');

// Configure SendGrid
sgMail.setApiKey(apiKey);

// Test simple email
async function testSimpleEmail() {
  try {
    console.log('\n📧 Testing simple email...');
    
    const msg = {
      to: process.env.SENDGRID_TO_EMAIL || 'test@example.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'test@example.com',
      subject: 'Test Email from ABBASS Finance',
      text: 'This is a test email to verify SendGrid setup.',
      html: '<p>This is a <strong>test email</strong> to verify SendGrid setup.</p>',
    };

    const response = await sgMail.send(msg);
    console.log('✅ Email sent successfully!');
    console.log('Status Code:', response[0].statusCode);
    console.log('Message ID:', response[0].headers['x-message-id']);
    
  } catch (error) {
    console.log('❌ Email failed:');
    console.log('Error:', error.message);
    
    if (error.response) {
      console.log('Status Code:', error.response.statusCode);
      console.log('Error Details:', JSON.stringify(error.response.body, null, 2));
    }
  }
}

testSimpleEmail(); 