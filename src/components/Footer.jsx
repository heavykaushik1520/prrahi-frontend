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
import ScrollToTop from "react-scroll-to-top";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="footer-widget">
              <h3 className="footer-widget-title">PrRAHI</h3>
              <p className="footer-description">
                PrRaHi is not just incense — it’s your spiritual partner,
                helping you reconnect with your higher self. Let every stick
                bring you closer to peace, clarity, and divine light.
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
                  <Link to="/contact-us">Contact</Link>
                </li>
                <li>
                  <Link to="/disclaimer">Disclaimer</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/refund-and-cancellation">
                    Refund & Cancellation
                  </Link>
                </li>
                {/* terms-of-service */}
                <li>
                  <Link to="/terms-of-service">Terms Of Service</Link>
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
                    <p>Vaaps Enterprise, Building No 1, Ground Floor</p>
                    <p>Sikaria Compound, Christian Basti, G S Road</p>
                    <p>Guwahati-781005</p>
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
      </div>

      {/* <button>
        <ScrollToTop smooth />
      </button> */}
      <ScrollToTop smooth />
    </footer>
  );
}

export default Footer;
