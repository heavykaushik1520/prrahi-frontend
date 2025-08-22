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
import logo from '../../assets/images/logo/praahi-logo - Copy.jpeg';
import Waves from "../waves/Waves";


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
              <img src={logo} alt="Logo" />
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
              <li >
                <Link className="nav-about" to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  Hello!<p className="navbar-links-text">I am PrRahi</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Signature<p className="navbar-links-text">Collection</p>
                </Link>
              </li>
              <li>
                <Link to="/team" onClick={() => setIsMobileMenuOpen(false)}>
                  The Backbone <p className="navbar-links-text">Founders Team</p>
                </Link>
              </li>
               <li>
                <Link
                  to="/news"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                 What's up <p className="navbar-links-text">News & Happenings</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lets' Meet<p className="navbar-links-text">Contact</p>
                </Link>
              </li>

              <li className="d-block">
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
                    style={{ fontSize: "30px", position: "relative" , color : "black" }}
                  />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount || 0}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

        </div>
         
      </header>
      <Waves/>
     
    </>
  );
}

export default Navbar;
