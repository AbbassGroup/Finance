# Career Application System

## Overview
The career application system allows users to submit job applications through the "Join Our Team" form on the contact page. Applications are stored securely in the MongoDB database with file uploads for CVs/resumes.

## Features

### Security Features
- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **File Upload Validation**: Only PDF, DOC, and DOCX files are allowed
- **File Size Limits**: Configurable via `MAX_FILE_SIZE` environment variable (default: 5MB)
- **Duplicate Prevention**: Users can only submit one application per email within configurable time period
- **Data Validation**: Comprehensive server-side validation for all fields

### Database Storage
- **MongoDB Integration**: Applications stored in `careers` collection
- **Indexed Fields**: Email, status, and creation date are indexed for performance
- **File Metadata**: CV file information stored including name, path, size, and MIME type
- **Audit Trail**: IP address and user agent stored for security

### API Endpoints

#### Public Endpoints
- `POST /api/careers/apply` - Submit a new job application

#### Admin Endpoints (for future admin panel)
- `GET /api/careers/applications` - Get all applications with pagination
- `GET /api/careers/applications/:id` - Get specific application
- `PATCH /api/careers/applications/:id/status` - Update application status
- `DELETE /api/careers/applications/:id` - Delete application

## Environment Variables

### Required Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
UPLOAD_DIRECTORY=./uploads/resumes
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

### Optional Variables
```env
# Validation Limits
MAX_NAME_LENGTH=100
MAX_EMAIL_LENGTH=100
MAX_MESSAGE_LENGTH=2000

# Duplicate Prevention
DUPLICATE_CHECK_HOURS=24

# Custom Messages
CAREER_SUCCESS_MESSAGE=Application submitted successfully.
CAREER_ERROR_MESSAGE=Error submitting application.
CAREER_REQUIRED_FIELDS_MESSAGE=All fields including CV are required.

# Server Configuration
PORT=5050
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Error Messages
GENERIC_ERROR_MESSAGE=Something went wrong!
PRODUCTION_ERROR_MESSAGE=Internal server error
NOT_FOUND_MESSAGE=Route not found
```

## Database Schema

### Career Application Fields
- `name` (String, required): Applicant's full name
- `email` (String, required): Applicant's email address
- `phone` (String, required): Applicant's phone number (Australian format)
- `position` (String, optional): Position applied for (enum: broker, admin, sales, marketing, other)
- `message` (String, optional): Cover letter/message
- `cvFileName` (String, required): Original filename of uploaded CV
- `cvPath` (String, required): Server path to stored CV file
- `cvFileSize` (Number, required): Size of CV file in bytes
- `cvMimeType` (String, required): MIME type of CV file
- `status` (String, default: 'pending'): Application status (pending, reviewed, shortlisted, rejected, hired)
- `ipAddress` (String): IP address of applicant
- `userAgent` (String): User agent string
- `createdAt` (Date): Application submission timestamp
- `updatedAt` (Date): Last update timestamp

## File Upload

### Supported File Types
- PDF (.pdf)
- Microsoft Word (.doc)
- Microsoft Word (.docx)

### File Storage
- Files are stored in the directory specified by `UPLOAD_DIRECTORY`
- Unique filenames are generated to prevent conflicts
- File metadata is stored in the database

## Validation Rules

### Name
- Required, 2-100 characters (configurable via `MAX_NAME_LENGTH`)
- Only letters, spaces, hyphens, and apostrophes allowed

### Email
- Required, valid email format
- Maximum 100 characters (configurable via `MAX_EMAIL_LENGTH`)
- Stored in lowercase

### Phone
- Required, valid Australian phone number format
- Supports mobile (04XXXXXXXX, 614XXXXXXXX) and landline formats

### Position
- Optional, must be one of: broker, admin, sales, marketing, other if provided

### Message (Cover Letter)
- Optional, maximum 2000 characters (configurable via `MAX_MESSAGE_LENGTH`)

### CV File
- Required, maximum size configurable via `MAX_FILE_SIZE`
- Only PDF, DOC, DOCX files allowed (configurable via `ALLOWED_FILE_TYPES`)

## Error Handling

### Common Error Responses
- `400 Bad Request`: Validation errors, missing fields, invalid file type
- `409 Conflict`: Duplicate application within configured time period
- `500 Internal Server Error`: Server errors, database issues

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific validation errors"]
}
```

## Frontend Integration

### Form Submission
The frontend uses the `submitCareerApplication` function from `services/api.js` to submit applications:

```javascript
import { submitCareerApplication } from '../services/api';

const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+61400000000');
formData.append('position', 'broker');
formData.append('message', 'Cover letter text');
formData.append('cv', fileObject);

const result = await submitCareerApplication(formData);
```

### Success Response
```json
{
  "success": true,
  "message": "Application submitted successfully.",
  "applicationId": "507f1f77bcf86cd799439011"
}
```

## Security Considerations

1. **File Upload Security**: Only allowed file types and sizes are accepted
2. **Input Sanitization**: All user inputs are sanitized to prevent XSS
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **File Storage**: Files are stored outside web root for security
5. **Database Security**: Use environment variables for database credentials
6. **Validation Limits**: All validation limits are configurable via environment variables

## Future Enhancements

1. **Email Notifications**: Send email notifications when applications are received
2. **Admin Panel**: Web interface for managing applications
3. **File Scanning**: Virus/malware scanning for uploaded files
4. **Data Encryption**: Encrypt sensitive data at rest
5. **Authentication**: Admin authentication for managing applications 