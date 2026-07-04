import React, { useEffect, useState } from "react";
import { Link , NavLink } from "react-router-dom";
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
              <li className="navbar-list">
                <NavLink  to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </NavLink >
              </li>
              <li className="navbar-list" >
                <NavLink  className="nav-about" to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  Hello!<p className="navbar-links-text">I am PrRahi</p>
                </NavLink >
              </li>
              <li className="navbar-list">
                <NavLink 
                  to="/collection"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shopping<p className="navbar-links-text">Collection</p>
                </NavLink >
              </li>
              <li className="navbar-list">
                <NavLink  to="/team" onClick={() => setIsMobileMenuOpen(false)}>
                  The Backbone <p className="navbar-links-text">Founders Team</p>
                </NavLink >
              </li>
               <li className="navbar-list">
                <NavLink 
                  to="/news"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                 What's up <p className="navbar-links-text">News & Happenings</p>
                </NavLink >
              </li>
               <li className="navbar-list">
                <NavLink 
                  to="/career"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                 Careers<p className="navbar-links-text">Winning Team</p>
                </NavLink >
              </li>
              <li className="navbar-list">
                <NavLink 
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lets' Meet<p className="navbar-links-text">Contact</p>
                </NavLink >
              </li>

              <li className="d-block">
                <div className="navbar-icons flex items-center gap-8 pr-4 ">
                  {isAuthenticated ? (
                    <>
                      <NavLink 
                        to="/my-profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="profile-icon"
                      >
                        <RiUser3Line />
                      </NavLink >
                    </>
                  ) : (
                    <NavLink 
                      to="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="login-button"
                    >
                      LOGIN
                    </NavLink >
                  )}
                </div>
              </li>

              <li className="navbar-list">
                <NavLink 
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cart-icon"
                >
                  <RiShoppingCart2Line
                    style={{ fontSize: "30px", position: "relative" , color : "black" }}
                  />
                  <span className="cart-counter position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {cartCount || 0}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink >
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
