// src/pages/MyOrders.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { format } from "date-fns";

const MyOrders = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await api("/order", "GET", null, true);
        setOrders(userOrders);
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
        toast.error(err.message || "Session expired. Please login again.");
        logout();
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [logout, navigate]);

  if (loading) {
    return <div className="orders-loading">Loading your orders...</div>;
  }

  if (error) {
    return <div className="orders-error">{error}</div>;
  }

  return (
    <>
    <div className="orders-page-container">
      <h2 className="orders-title">MY ORDERS</h2>
      <div className="orders-container">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-summary">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {format(new Date(order.createdAt), "MMMM d, yyyy h:mm a")}
                </p>
                <p>All taxes Included</p>
              </div>
              <div className="order-items">
                <h4>Items:</h4>
                {order.orderItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <img
                      src={
                        item.product?.images?.[0]?.imageUrl
                         ? `https://artiststation.co.in/prrahi-api${item.product.images[0].imageUrl}`
                          //   ? `http://localhost:3000${item.product.images[0].imageUrl}`
                          : "https://placehold.co/80x80/cccccc/000000?text=No+Image" // Replace with your default image path
                      }
                      alt={item.product?.name || "Product image"}
                      className="item-image"
                    />
                    <div className="item-details">
                      <p>
                        <strong>Product:</strong> {item.product.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{item.priceAtPurchase}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
               <hr></hr>
            </div>
           
          ))
          
        ) 
        
        : (
          <p className="no-orders-message">You have no orders yet.</p>
        )}
        
      </div>
      
    </div>
    </>
  );
};

export default MyOrders;
