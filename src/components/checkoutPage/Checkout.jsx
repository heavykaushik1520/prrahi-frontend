/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { getCart } from "../../services/cartServices"; // Make sure this path is correct
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // Assuming useAuth provides a way to get the token
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailAddress: "",
    address: "",
    fullAddress: "",
    townOrCity: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const [errors, setErrors] = useState({});
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false); // For form submission
  const [cartLoading, setCartLoading] = useState(true); // For cart fetching

  const checkLoginStatus = () => {
    return !!localStorage.getItem("jwtToken");
  };

  const fetchCart = useCallback(async () => {
    setCartLoading(true);
    try {
      const isLoggedIn = checkLoginStatus();
      const response = await getCart(isLoggedIn);
      setCart(response);
    } catch (err) {
      console.error("Error fetching cart in Checkout:", err);
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "mobileNumber",
      "emailAddress",
      "address",
      "fullAddress",
      "townOrCity",
      "state",
      "country",
      "pinCode",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
    }
    if (
      formData.emailAddress &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)
    ) {
      newErrors.emailAddress = "Enter a valid email address";
    }
    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Pin code must be exactly 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!cart || cart.products.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create Order in backend (your /order endpoint)
      const orderPayload = {
        ...formData,
        cartItems: cart.products.map((item) => ({
          productId: item.id,
          quantity: item.cartItem.quantity,
          priceAtPurchase: parseFloat(item.price),
        })),
      };

      const orderResponse = await api("/order", "POST", orderPayload, true);

      if (!orderResponse || !orderResponse.orderId) {
        throw new Error("Failed to create order.");
      }

      const orderId = orderResponse.orderId;
      console.log("✅ Created order with ID:", orderId);

      // Step 2: Create Razorpay Order (backend API /create-order)
      const razorpayOrder = await api(
        "/payment/create-order",
        "POST",
        { orderId },
        true
      );

      if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
        throw new Error("Failed to create Razorpay order.");
      }

      // Step 3: Open Razorpay Checkout
      const options = {
        key: razorpayOrder.key_id, // from backend response
        amount: razorpayOrder.amount, // in paisa
        currency: razorpayOrder.currency,
        name: "PrRaHi Agarbatti", // replace with your store/brand
        description: "Complete your purchase",
        order_id: razorpayOrder.razorpayOrderId, // Razorpay orderId
        handler: async function (response) {
          try {
            // Step 4: Verify Payment
            const verifyResponse = await api(
              "/payment/verify-payment",
              "POST",
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                orderId, // our DB orderId
              },
              true
            );

            if (verifyResponse) {
              alert("Payment successful and order confirmed!");
              navigate("/my-orders");
            }
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.emailAddress,
          contact: formData.mobileNumber,
        },
        notes: {
          address: formData.fullAddress,
        },
        theme: {
          color: "#ffa500", // your brand color
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return <div className="checkout-loading">Loading your cart...</div>;
  }

  const cartItems = cart?.products || [];
  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.cartItem.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container empty-cart-message">
        <p>Your cart is empty. Please add items before checking out.</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ... (Your JSX rendering logic for the checkout page)
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-left">
          <h3 className="section-title">Order Summary</h3>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={
                    item.images?.[0]?.imageUrl
                      ? `https://artiststation.co.in/prrahi-api${item.images[0].imageUrl}`
                      //    ? `http://localhost:3000${item.images[0].imageUrl}`
                         :
                        "https://placehold.co/80x80/cccccc/000000?text=No+Image"
                  }
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <p className="item-category">{item.category}'s</p>
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">₹{item.price}{' '}<span className="product-label-price">
                      ₹{item.labelPrice}
                    </span></p>
                  <p className="item-quantity">
                    Quantity: {item.cartItem.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total:</strong> ₹{total.toFixed(2)}
          </div>
        </div>

        <div className="checkout-right">
          <h2 className="section-title">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
                {errors.firstName && (
                  <div className="error">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
                {errors.lastName && (
                  <div className="error">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                />
                {errors.mobileNumber && (
                  <div className="error">{errors.mobileNumber}</div>
                )}
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
                {errors.emailAddress && (
                  <div className="error">{errors.emailAddress}</div>
                )}
              </div>

              <div className="form-group full-width">
                
                <label>Address Line 2(Apartment /  Building , House No)*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                />
                {errors.address && (
                  <div className="error">{errors.address}</div>
                )}
              </div>
              <div className="form-group full-width">
                <label>Address Line 1(Street . P.O Box)*</label>
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  placeholder="Full Address"
                  required
                />
                {errors.fullAddress && (
                  <div className="error">{errors.fullAddress}</div>
                )}
              </div>

              <div className="form-group">
                <label>Town / City *</label>
                <input
                  type="text"
                  name="townOrCity"
                  value={formData.townOrCity}
                  onChange={handleChange}
                  placeholder="Town/City"
                  required
                />
                {errors.townOrCity && (
                  <div className="error">{errors.townOrCity}</div>
                )}
              </div>
              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
                {errors.state && <div className="error">{errors.state}</div>}
              </div>

              <div className="form-group">
                <label>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
                {errors.country && (
                  <div className="error">{errors.country}</div>
                )}
              </div>

              <div className="form-group">
                <label>Pin Code *</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="Pin Code"
                  required
                />
                {errors.pinCode && (
                  <div className="error">{errors.pinCode}</div>
                )}
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Processing..." : "PROCEED TO PAY"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
