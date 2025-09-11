import React, { useState } from "react";
import api from "../../services/api";
import TopBanner from "../top/TopBanner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      if (value.length > 10) {
        setContactError("Contact number cannot exceed 10 digits.");
      } else {
        setContactError("");
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const contactRegex = /^\d{10}$/;
    if (!formData.contact || !contactRegex.test(formData.contact)) {
      setContactError("Please enter a valid 10-digit contact number.");
      isValid = false;
    } else {
      setContactError("");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmissionStatus("");
    setIsSuccess(false);

    try {
      const response = await api("/contact", "POST", formData, false);
      if (response && response.success) {
        setSubmissionStatus("Your message has been sent successfully! We will get back to you soon.");
        setIsSuccess(true);
        setFormData({ name: "", contact: "", email: "", message: "" });
      } else {
        setSubmissionStatus(`Failed to send message: ${response?.error || "An unexpected error occurred."}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmissionStatus(
        `Failed to send message: ${error.message || "An unexpected error occurred. Please try again."}`
      );
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <TopBanner/>
    <div className="contact-page-wrapper">
      {/* Left side: Google Map */}
      <div className="contact-map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d795.963930175866!2d91.77929982892584!3d26.155294228154055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDA5JzE5LjMiTiA5McKwNDYnNDcuOSJF!5e1!3m2!1sen!2sin!4v1755588418804!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>

      {/* Right side: Contact Form */}
      <div className="contact-form-global-wrapper">
        <div className="contact-form-card-container">
         

          <form onSubmit={handleSubmit} className="contact-form-layout">
            <div className="contact-form-group">
              <label htmlFor="name" className="contact-form-label">
                Your Name <span className="contact-required-indicator">*</span>
              </label>
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
              <label htmlFor="contact" className="contact-form-label">
                Your Contact <span className="contact-required-indicator">*</span>
              </label>
              <input
                type="number"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className={`contact-form-input ${contactError ? "contact-input-error" : ""}`}
                placeholder="Contact Number"
              />
              {contactError && <p className="contact-error-message">{contactError}</p>}
            </div>

            <div className="contact-form-group">
              <label htmlFor="email" className="contact-form-label">
                Your Email <span className="contact-required-indicator">*</span>
              </label>
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
              <label htmlFor="message" className="contact-form-label">
                Your Message <span className="contact-required-indicator">*</span>
              </label>
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
              className={`contact-submit-button ${isLoading ? "contact-submit-button-loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? <span className="contact-spinner-animation"></span> : "Send Your Message"}
            </button>
          </form>

          {submissionStatus && (
            <p className={`contact-status-message ${isSuccess ? "contact-status-success" : "contact-status-error"}`}>
              {submissionStatus}
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactForm;
