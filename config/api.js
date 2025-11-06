// API Configuration
export const API_CONFIG = {
  // Base URL for the API
  BASE_URL: 'https://vernanbackend.ezlab.in',
  
  // Contact form endpoint - CONFIRMED WORKING
  // Tested and verified: Returns 201 status with JSON response
  // Original endpoint provided: https://vernanbackend.ezlab.in/api/contact-us/
  CONTACT_ENDPOINT: '/api/contact-us/',
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get contact form URL
export const getContactUrl = () => {
  return getApiUrl(API_CONFIG.CONTACT_ENDPOINT);
};

