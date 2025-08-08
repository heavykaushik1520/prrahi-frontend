import React from "react"; // Only React is needed here, no state/effect for the button itself
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="footer-widget">
              <h3 className="footer-widget-title">PRAAHI</h3>
              <p className="footer-description">
                We are passionate about creating innovative solutions that
                transform businesses and enhance user experiences. Our
                commitment to excellence drives everything we do.
              </p>
              <div className="footer-social-links">
                <Link to="/" className="social-link-footer">
                  <FaFacebook />
                </Link>
                <Link to="/" className="social-link-footer">
                  <FaTwitter />
                </Link>
                <Link to="/" className="social-link-footer">
                  <FaInstagram />
                </Link>
                <Link to="/" className="social-link-footer">
                 <IoLogoLinkedin />
                </Link>
                <Link to="/" className="social-link-footer">
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="footer-widget">
              <h4 className="footer-widget-title">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/collection">Collection</Link>
                </li>
                <li>
                  <Link to="/team">Our Team</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="footer-widget">
              <h4 className="footer-widget-title">Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <FaAddressCard />
                  <div>
                    <h5>Address</h5>
                    <p>123 Business Street, Tech City, TC 12345</p>
                  </div>
                </div>
                <div className="contact-item">
                  <FaPhoneAlt />
                  <div>
                    <h5>Phone</h5>
                    <p>+91 99540 22020</p>
                  </div>
                </div>
                <div className="contact-item">
                  <MdEmail />
                  <div>
                    <h5>Email</h5>
                    <p>care@prrahi.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="newsletter-section">
              <h4 className="newsletter-title">Brand owned and Marketed by:</h4>
              <p className="newsletter-description">
                Stay updated with our latest news and offers
              </p>
              <form className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    required
                  />
                  <button className="btn btn-primary" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button
        id="scrollToTop"
        className="scroll-to-top-btn"
        title="Scroll to Top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </footer>
  );
}

export default Footer;
