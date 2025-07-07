const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error('REACT_APP_API_URL environment variable is required');
}

// Home form submission
export const submitHomeForm = async (formData) => {
  const res = await fetch(`${API_URL}/contact/home-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return res.json();
};

// Contact Us form submission
export const submitContactMessage = async (formData) => {
  const res = await fetch(`${API_URL}/contact/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return res.json();
};

// Careers (job application) form submission with file upload
export const submitCareerApplication = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/careers/apply`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to submit application');
    }

    return res.json();
  } catch (error) {
    console.error('Career application error:', error);
    throw error;
  }
}; 