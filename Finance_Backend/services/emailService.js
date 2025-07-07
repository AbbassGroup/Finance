const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  /**
   * Send form submission email
   * @param {Object} formData - The form data to include in the email
   * @param {string} formType - Type of form (home-form, contact-form, career-form)
   * @returns {Promise}
   */
  static async sendFormSubmissionEmail(formData, formType) {
    try {
      const subject = `New ${formType.replace('-', ' ')} Submission - ABBASS Finance`;
      
      // Create email content based on form type
      let htmlContent = this.createEmailContent(formData, formType);
      
      const msg = {
        to: process.env.SENDGRID_TO_EMAIL,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: subject,
        html: htmlContent,
      };

      // If it's a career form and a CV is provided, attach it
      if (formType === 'career-form' && formData.cvPath) {
        try {
          const fileContent = fs.readFileSync(formData.cvPath);
          msg.attachments = [
            {
              content: fileContent.toString('base64'),
              filename: formData.cvFile,
              type: formData.cvMimeType,
              disposition: 'attachment',
            },
          ];
        } catch (fileError) {
          console.error('Error attaching CV file:', fileError);
          // Optional: modify email to inform about the attachment failure
        }
      }

      const response = await sgMail.send(msg);
      console.log('Email sent successfully:', response[0].statusCode);
      return { success: true, messageId: response[0].headers['x-message-id'] };
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('SendGrid error details:', error.response.body);
      }
      throw new Error('Failed to send email notification');
    }
  }

  /**
   * Create HTML email content based on form type
   * @param {Object} formData - The form data
   * @param {string} formType - Type of form
   * @returns {string} HTML content
   */
  static createEmailContent(formData, formType) {
    const timestamp = new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Sydney'
    });

    let content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin: 0;">ABBASS Finance - New Form Submission</h2>
          <p style="color: #666; margin: 10px 0 0 0;">Form Type: ${formType.replace('-', ' ').toUpperCase()}</p>
          <p style="color: #666; margin: 5px 0;">Submitted: ${timestamp}</p>
        </div>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
          <h3 style="color: #333; margin-top: 0;">Form Details:</h3>
    `;

    // Add form fields based on form type
    switch (formType) {
      case 'home-form':
        content += `
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>First Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.firstName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Last Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.lastName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email}</td></tr>
          </table>
        `;
        break;

      case 'message':
        content += `
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>First Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.firstName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Last Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.lastName}</td></tr>
            ${formData.email ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email}</td></tr>` : ''}
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.message}</td></tr>
          </table>
        `;
        break;

      case 'career-form':
        content += `
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>First Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.firstName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Last Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.lastName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>CV File:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.cvFile || 'Not provided'} (Attached)</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.message}</td></tr>
          </table>
        `;
        break;

      default:
        content += `
          <p>Form data received but format not recognized.</p>
          <pre style="background-color: #f8f9fa; padding: 10px; border-radius: 4px;">${JSON.stringify(formData, null, 2)}</pre>
        `;
    }

    content += `
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #666;">
          <p style="margin: 0;">This is an automated notification from the ABBASS Finance website contact form.</p>
          <p style="margin: 5px 0 0 0;">Please respond to the customer directly using the contact information provided above.</p>
        </div>
      </div>
    `;

    return content;
  }
}

module.exports = EmailService; 