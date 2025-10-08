import React, { useState } from "react";
import api from "../../services/api";
import TopBanner from "../top/TopBanner";
import ContactBanner from "./ContactBanner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
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
        setSubmissionStatus(
          "Your message has been sent successfully! We will get back to you soon."
        );
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
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

  return (
    <>
      <ContactBanner />
      <div className="container-fluid py-5">
        <div className="row g-4 align-items-stretch">
          {/* Left Side - Google Map */}
          <div className="col-lg-6 col-md-12">
            <div className="h-100 shadow rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d795.963930175866!2d91.77929982892584!3d26.155294228154055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDA5JzE5LjMiTiA5McKwNDYnNDcuOSJF!5e1!3m2!1sen!2sin!4v1755588418804!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="col-lg-6 col-md-12">
            <div className="h-100 shadow p-5 rounded bg-white">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="contact-form-label">
                    Your Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Full Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="contact-form-label">
                    Your Contact <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      contactError ? "is-invalid" : ""
                    }`}
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    placeholder="Contact Number"
                  />
                  {contactError && (
                    <div className="invalid-feedback">{contactError}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="contact-form-label">
                    Your Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="contact-form-label">
                    Your Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn contact-submit-button w-100 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Your Message"}
                </button>

                {submissionStatus && (
                  <div
                    className={`mt-3 fw-semibold ${
                      isSuccess ? "text-success" : "text-danger"
                    }`}
                  >
                    {submissionStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
