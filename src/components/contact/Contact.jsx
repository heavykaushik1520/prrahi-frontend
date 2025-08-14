import React, { useState } from "react";
import api from "../../services/api";

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
      // Basic validation for a 10-digit number.
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmissionStatus("");
    setIsSuccess(false);

    try {
      const response = await api("/contact", "POST", formData, false);
      if (response && response.success) {
        setSubmissionStatus(
          "Your message has been sent successfully! We will get back to you soon."
        );
        setIsSuccess(true);
        setFormData({ name: "", contact: "", email: "", message: "" });
      } else {
        setSubmissionStatus(
          `Failed to send message: ${
            response?.error || "An unexpected error occurred."
          }`
        );
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmissionStatus(
        `Failed to send message: ${
          error.message || "An unexpected error occurred. Please try again."
        }`
      );
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="contact-form-global-wrapper">
      <div className="contact-form-card-container">
        <h2 className="contact-form-main-title">Connect With Us! 📬</h2>
        <p className="contact-form-sub-heading">
          We're here to help. Send us a message and we'll reply as soon as
          possible.
        </p>

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
              className={`contact-form-input ${
                contactError ? "contact-input-error" : ""
              }`}
              placeholder="Contact Number"
            />
            {contactError && (
              <p className="contact-error-message">{contactError}</p>
            )}
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
            className={`contact-submit-button ${
              isLoading ? "contact-submit-button-loading" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="contact-spinner-animation"></span>
            ) : (
              "Send Your Message"
            )}
          </button>
        </form>

        {submissionStatus && (
          <p
            className={`contact-status-message ${
              isSuccess ? "contact-status-success" : "contact-status-error"
            }`}
          >
            {submissionStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
