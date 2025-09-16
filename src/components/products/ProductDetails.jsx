// src/components/ProductDetail.jsx

import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"; // Import useParams

import api from "../../services/api";

import { updateCart } from "../../services/cartServices"; // Import updateCart

import { useAuth } from "../../context/AuthContext"; // Import useAuth

import { useCart } from "../../context/CartContext"; // Import useCart

import ShoppingTopBanner from "../top/ShoppingTopBanner";

function ProductDetails() {
  // Get the product ID from the URL parameters

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const { user } = useAuth();

  const { fetchCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      setError(null);

      try {
        const productData = await api(`/products/${id}`);

        setProduct(productData);
      } catch (err) {
        setError("Failed to fetch product details.");

        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) {
      alert("Product not available to add to cart.");

      return;
    }

    try {
      // Check if a user is logged in

      const isLoggedIn = !!user; // `user` is null if not logged in

      await updateCart(product.id, 1, isLoggedIn);

      alert("Product added to cart!");

      await fetchCart(); // Re-fetch the cart to update the UI
    } catch (err) {
      console.error("Failed to add to cart:", err);

      alert("Failed to add product to cart.");
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center my-5 text-danger">{error}</div>;
  }

  if (!product) {
    return <div className="text-center my-5">Product not found.</div>;
  }

  return (
    <>
      <ShoppingTopBanner />

      <section className="product-detail-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={
                  product.images[0]
                    ? `https://artiststation.co.in/prrahi-api${product.images[0].imageUrl}`
                    : "https://placehold.co/800x600/E5E7EB/4B5563?text=Your+Image+Here"
                }
                alt={product.name}
                className="img-fluid"
              />
            </div>

            <div className="col-md-6">
              <h1 className="product-title">{product.name}</h1>

              <p className="product-price">₹{product.price}</p>

              <p className="product-description">(INCL. OF ALL TAXES)</p>

              <hr />

              <h5>Description</h5>

              <p>{product.description}</p>

              <p>
                <strong>Weight:</strong> {product.weight}gm
              </p>

              <p className="product-description">PACK OF 12 BOXES</p>

              <button
                className="btn btn-primary read-more-btn"
                // Implement add to cart functionality here if needed

                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
