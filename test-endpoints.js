// Quick script to test different endpoint variations
// Run this with: node test-endpoints.js

const axios = require('axios');

const BASE_URL = 'https://vernanbackend.ezlab.in';
const endpoints = [
  '/api/contact-us',           // Without trailing slash
  '/api/contact-us/',          // With trailing slash (current - doesn't work)
  '/contact-us/',               // Without /api/
  '/contact-us',               // Without /api/ and trailing slash
  '/api/contactus/',           // Without hyphen
  '/api/contactus',            // Without hyphen and trailing slash
  '/api/v1/contact-us/',        // With version
  '/api/v1/contact-us',        // With version, no trailing slash
  '/contact',                   // Simplified
  '/api/contacts/',             // Plural
];

const testData = {
  name: "Alok Upadhyay",
  email: "aloku598@gmail.com",
  phone: "7055900678",
  message: "Test message"
};

async function testEndpoint(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await axios.post(url, testData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000
    });
    
    const contentType = response.headers['content-type'] || response.headers['Content-Type'] || '';
    const isHtml = typeof response.data === 'string' && 
                   (response.data.trim().startsWith('<!DOCTYPE') || 
                    response.data.trim().startsWith('<html') ||
                    contentType.includes('text/html'));
    
    if (isHtml) {
      return { status: 'HTML_RESPONSE', message: 'Received HTML (likely 404 page)' };
    }
    
    return { 
      status: 'SUCCESS', 
      statusCode: response.status,
      data: response.data 
    };
  } catch (error) {
    if (error.response) {
      const contentType = error.response.headers['content-type'] || error.response.headers['Content-Type'] || '';
      const isHtml = typeof error.response.data === 'string' && 
                     (error.response.data.trim().startsWith('<!DOCTYPE') || 
                      error.response.data.trim().startsWith('<html') ||
                      contentType.includes('text/html'));
      
      if (isHtml) {
        return { 
          status: 'HTML_ERROR', 
          statusCode: error.response.status,
          message: 'Received HTML error page' 
        };
      }
      
      return { 
        status: 'ERROR', 
        statusCode: error.response.status,
        message: error.response.statusText,
        data: error.response.data
      };
    } else if (error.request) {
      return { status: 'NETWORK_ERROR', message: 'No response received' };
    } else {
      return { status: 'ERROR', message: error.message };
    }
  }
}

async function testAllEndpoints() {
  console.log('Testing endpoint variations...\n');
  console.log('='.repeat(60));
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    const url = `${BASE_URL}${endpoint}`;
    
    console.log(`\nEndpoint: ${endpoint}`);
    console.log(`Full URL: ${url}`);
    
    if (result.status === 'SUCCESS') {
      console.log(`✅ SUCCESS! Status: ${result.statusCode}`);
      console.log(`Response:`, JSON.stringify(result.data, null, 2));
      console.log('\n🎉 THIS IS THE CORRECT ENDPOINT!');
      console.log(`Update src/config/api.js with: CONTACT_ENDPOINT: '${endpoint}'`);
      break;
    } else if (result.status === 'HTML_RESPONSE' || result.status === 'HTML_ERROR') {
      console.log(`❌ HTML Response (404 page) - Status: ${result.statusCode || 'N/A'}`);
    } else if (result.status === 'ERROR') {
      console.log(`⚠️  Error: ${result.statusCode} - ${result.message}`);
      if (result.data && typeof result.data === 'object') {
        console.log(`Response data:`, JSON.stringify(result.data, null, 2));
      }
    } else {
      console.log(`❌ ${result.status}: ${result.message}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\nIf none of these work, the endpoint might:');
  console.log('- Require authentication (API key, token, etc.)');
  console.log('- Have a different base path');
  console.log('- Not be publicly accessible');
  console.log('- Need to be contacted with the backend team for the correct endpoint');
}

testAllEndpoints().catch(console.error);

