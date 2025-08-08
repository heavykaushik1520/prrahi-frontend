import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { useAuth } from "../../context/AuthContext";
import {
  RiShoppingCart2Line,
  RiMenu3Line,
  RiCloseLine,
  RiUser3Line,
} from "react-icons/ri";
import { useCart } from "../../context/CartContext";
import WavesAnimation from "../waves/WavesAnimation";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { cartCount, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">
              <img src={"assets/images/logo/praahi-logo.jpeg"} alt="Logo" />
            </Link>
          </div>

          <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </div>

          <nav className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/team" onClick={() => setIsMobileMenuOpen(false)}>
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>

              <li className="d-block d-sm-none">
                <div className="navbar-icons flex items-center gap-8 pr-4 ">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/my-profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="profile-icon"
                      >
                        <RiUser3Line />
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="login-button"
                    >
                      LOGIN
                    </Link>
                  )}
                </div>
              </li>

              <li>
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cart-icon"
                >
                  <RiShoppingCart2Line
                    style={{ fontSize: "30px", position: "relative" }}
                  />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount || 0}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="navbar-icons flex items-center gap-8 pr-4 d-none d-sm-block">
            {isAuthenticated ? (
              <>
                <Link
                  to="/my-profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="profile-icon"
                >
                  <RiUser3Line />
                </Link>
              </>
            ) : (
              <Link
                to="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="login-button"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
