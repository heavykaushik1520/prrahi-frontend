import React, { useState } from 'react';
import api from '../../services/api';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true); 
    setSubmissionStatus(''); 
    setIsSuccess(false); 

    try {
      const response = await api('/contact', 'POST', formData, false);
      if (response && response.success) {
        setSubmissionStatus('Your message has been sent successfully! We will get back to you soon. 😊');
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmissionStatus(`Failed to send message: ${response?.error || 'An unexpected error occurred.'}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmissionStatus(`Failed to send message: ${error.message || 'An unexpected error occurred. Please try again.'}`);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form-global-wrapper">
      <div className="contact-form-card-container">
        <h2 className="contact-form-main-title">Connect With Us! 📬</h2>
        <p className="contact-form-sub-heading">
          We're here to help. Send us a message and we'll reply as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="contact-form-layout">
          <div className="contact-form-group">
            <label htmlFor="name" className="contact-form-label">Your Name <span className="contact-required-indicator">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="contact-form-input"
              placeholder="Full Name"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="email" className="contact-form-label">Your Email <span className="contact-required-indicator">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="contact-form-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="message" className="contact-form-label">Your Message <span className="contact-required-indicator">*</span></label>
            <textarea
              id="message"
              name="message"
              rows="7"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="contact-form-textarea"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className={`contact-submit-button ${isLoading ? 'contact-submit-button-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="contact-spinner-animation"></span>
            ) : (
              'Send Your Message'
            )}
          </button>
        </form>

        {submissionStatus && (
          <p className={`contact-status-message ${isSuccess ? 'contact-status-success' : 'contact-status-error'}`}>
            {submissionStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
