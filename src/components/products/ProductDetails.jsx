// src/components/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { updateCart } from "../../services/cartServices";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import ShoppingTopBanner from "../top/ShoppingTopBanner";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { fetchCart } = useCart();
  const [zoomState, setZoomState] = useState({
    x: 0,
    y: 0,
    isZoomed: false,
  });

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
      const isLoggedIn = !!user;
      await updateCart(product.id, 1, isLoggedIn);
      alert("Product added to cart!");
      await fetchCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add product to cart.");
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomState({
      x,
      y,
      isZoomed: true,
      mouseX: e.clientX - left,
      mouseY: e.clientY - top,
    });
  };

  const handleMouseEnter = () => {
    setZoomState({ ...zoomState, isZoomed: true });
  };

  const handleMouseLeave = () => {
    setZoomState({ ...zoomState, isZoomed: false });
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

  const imageUrl = product.images[0]
    ? `https://artiststation.co.in/prrahi-api${product.images[0].imageUrl}`
    : "https://placehold.co/800x600/E5E7EB/4B5563?text=Your+Image+Here";

  return (
    <>
      <ShoppingTopBanner />
      <section className="product-detail-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="image-container">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="img-fluid"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                />
                {zoomState.isZoomed && (
                  <div
                    className="magnifying-glass"
                    style={{
                      top: zoomState.mouseY,
                      left: zoomState.mouseX,
                      backgroundImage: `url(${imageUrl})`,
                      backgroundPosition: `${zoomState.x}% ${zoomState.y}%`,
                    }}
                  ></div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-price">₹{product.price}</p>
              <p className="product-description">(INCL. OF ALL TAXES)</p>
              <hr />
              <h5>Description</h5>
              <p>{product.description}</p>
              <p className="product-description" id="boxcount-12">
                PACK OF 12 BOXES
              </p>
              <p>
                <strong>Weight:</strong> {product.weight}gm
              </p>
              <button
                className="btn btn-primary read-more-btn"
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
