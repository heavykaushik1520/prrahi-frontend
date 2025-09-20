
import React, { useState, useEffect, useCallback } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  updateCart,
  deleteCartItem,
} from "../../services/cartServices"; // Corrected import path
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkLoginStatus = () => {
    return !!localStorage.getItem("jwtToken");
  };

  const { fetchCart } = useCart();


  const fetchCartData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setLoading(false);
      const isLoggedIn = checkLoginStatus();
      const response = await getCart(isLoggedIn);
      setCart(response);
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (err.message && err.message.includes("401") && checkLoginStatus()) {
        setError("Session expired. Please log in again to view your cart.");
      } else {
        setError("Failed to load cart. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleUpdateQuantity = async (productId, currentQuantity, delta) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    if (newQuantity === currentQuantity && delta === 0) return;
    setLoading(true);
    try {
      setLoading(false);
      const isLoggedIn = checkLoginStatus(); // Get actual login status
      await updateCart(productId, newQuantity, isLoggedIn);
      await fetchCartData();
    } catch (err) {
      console.error("Error updating cart item quantity:", err);
      setError("Failed to update item quantity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    setLoading(true);
    try {
      setLoading(false);

      // Optimistically remove item from UI
      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter((item) => item.id !== productId),
      }));

      const isLoggedIn = checkLoginStatus();
      await deleteCartItem(productId, isLoggedIn);

      // Refresh count in Navbar
      await fetchCart();

    } catch (err) {
      console.error("Error removing item from cart:", err);
      setError("Failed to remove item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToCheckout = () => {
    const isLoggedIn = !!localStorage.getItem("jwtToken");

    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      navigate("/sign-in", { state: { from: "/checkout" } }); // Optional: save redirect path
    }
  };

  if (loading) {
    return (
      <div className="cart-container loading-state">
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container error-state">
        <p className="error-message">{error}</p>
        <button onClick={fetchCartData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  const cartItems = cart?.products || [];
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.cartItem.quantity,
    0
  );

  return (
    
    <div className="cart-container">
      <h3 className="cart-title">Cart</h3>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-details-wrapper">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={`https://artiststation.co.in/prrahi-api${item.images[0].imageUrl}`}
                      // src={`http://localhost:3000${item.images[0].imageUrl}`}
                      alt={item.name}
                      className="item-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/80x80/cccccc/000000?text=No+Image";
                      }}
                    />
                  ) : (
                    <img
                      src="https://placehold.co/80x80/cccccc/000000?text=No+Image"
                      alt={item.name}
                      className="item-image"
                    />
                  )}
                  <div className="item-info">
                    <h6 className="item-name">{item.name}</h6>
                    <p className="item-price">₹{item.price}</p>
                    <div className="quantity-control">
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.cartItem.quantity,
                            -1
                          )
                        }
                      >
                        −
                      </button>
                      <span className="item-quantity">
                        {item.cartItem.quantity}
                      </span>
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.cartItem.quantity,
                            1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="item-actions">
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <div className="summary-content">
              <h5 className="summary-total-text">TOTAL : ₹{total.toFixed(2)}
                <br></br>
                <p>(INCL. OF ALL TAXES)</p>
              </h5>
              <button
                onClick={handleProceedToCheckout}
                className="checkout-button"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
