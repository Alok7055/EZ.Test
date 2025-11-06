import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';
import { getContactUrl, API_CONFIG } from '../config/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submission message when user starts typing
    if (submissionMessage) {
      setSubmissionMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage('');

    const requestData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    };

    const apiUrl = getContactUrl();
    
    console.log('Submitting to:', apiUrl);
    console.log('Request data:', requestData);

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: API_CONFIG.TIMEOUT
    };

    try {
      const response = await axios.post(apiUrl, requestData, requestConfig);

      console.log('Response:', response);
      console.log('Response headers:', response.headers);
      console.log('Response data:', response.data);
      
      // Check if response is HTML (usually means 404 page or error page)
      const contentType = response.headers['content-type'] || response.headers['Content-Type'] || '';
      const responseData = response.data;
      const isHtml = typeof responseData === 'string' && 
                     (responseData.trim().startsWith('<!DOCTYPE') || 
                      responseData.trim().startsWith('<html') ||
                      contentType.includes('text/html'));

      if (isHtml) {
        console.warn('Received HTML response instead of JSON. This usually means the endpoint is incorrect.');
        setSubmissionMessage(
          `Received HTML response (likely 404 page). The endpoint "${apiUrl}" may be incorrect. ` +
          `Please check the API URL and update src/config/api.js with the correct endpoint.`
        );
        setIsSubmitting(false);
        return;
      }
      
      // API returns 201 Created on success (not 200)
      if (response.status === 200 || response.status === 201) {
        // Verify it's actually JSON data, not HTML
        if (typeof responseData === 'object' && responseData !== null) {
          setSubmissionMessage('Form Submitted');
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
          setErrors({});
        } else {
          setSubmissionMessage('Received unexpected response format. Check console for details.');
        }
      } else {
        setSubmissionMessage(`Form submitted with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        request: error.request,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });

      if (error.response) {
        const status = error.response.status;
        const statusText = error.response.statusText;
        const errorData = error.response.data;
        const contentType = error.response.headers['content-type'] || error.response.headers['Content-Type'] || '';

        // Check if error response is HTML (common for 404 pages)
        const isHtml = typeof errorData === 'string' && 
                      (errorData.trim().startsWith('<!DOCTYPE') || 
                       errorData.trim().startsWith('<html') ||
                       contentType.includes('text/html'));

        if (isHtml) {
          console.warn('Error response is HTML. This usually means the endpoint does not exist.');
          setSubmissionMessage(
            `Endpoint returned HTML (likely 404 error page). The URL "${apiUrl}" appears to be incorrect. ` +
            `Please verify the correct endpoint and update src/config/api.js. ` +
            `Try: /api/contact-us (without trailing slash) or /contact-us/`
          );
        } else if (status === 200 || status === 201) {
          // Sometimes APIs return 200 in error response
          setSubmissionMessage('Form Submitted');
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
          setErrors({});
        } else if (status === 404) {
          setSubmissionMessage(
            `Endpoint not found (404). Please check the API URL: ${apiUrl}. ` +
            `You may need to update the CONTACT_ENDPOINT in src/config/api.js. ` +
            `Common fixes: Remove trailing slash or try /contact-us/ instead of /api/contact-us/`
          );
        } else if (status === 400) {
          const errorMsg = errorData?.message || errorData?.error || 'Invalid data. Please check your inputs.';
          setSubmissionMessage(`Validation error: ${errorMsg}`);
        } else if (status === 422) {
          const errorMsg = errorData?.message || errorData?.error || 'Validation error. Please check your inputs.';
          setSubmissionMessage(`Validation error: ${errorMsg}`);
        } else if (status === 500) {
          setSubmissionMessage('Server error. Please try again later.');
        } else if (status === 403) {
          setSubmissionMessage('Access forbidden. Please check API permissions.');
        } else {
          setSubmissionMessage(`Submission failed: ${status} ${statusText}. Check console for details.`);
        }
      } else if (error.request) {
        setSubmissionMessage(
          `Network error. Could not reach ${apiUrl}. ` +
          `Please check your connection and verify the API endpoint is correct.`
        );
      } else {
        setSubmissionMessage(`Error: ${error.message}. Check console for details.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className={`form-textarea ${errors.message ? 'error' : ''}`}
            placeholder="Enter your message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        {submissionMessage && (
          <div className={`submission-message ${submissionMessage === 'Form Submitted' ? 'success' : 'error'}`}>
            {submissionMessage}
          </div>
        )}

        <button
          type="submit"
          className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

