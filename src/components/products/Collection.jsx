// src/components/Collection.jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Assuming the api.js file is in this path
import { updateCart } from "../../services/cartServices";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import WavesAnimation from "../waves/WavesAnimation";

function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { fetchCart } = useCart();

  const page = 1;
  const limit = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api(`/products?page=${page}&limit=${limit}`);
        console.log(response.products);
        setProducts(response.products);
      } catch (err) {
        setError("Failed to fetch products. " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      // Check if a user is logged in
      const isLoggedIn = !!user; // `user` is null if not logged in
      await updateCart(productId, 1, isLoggedIn);
      alert("Product added to cart!");
      await fetchCart();
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

  return (
    <>
    
      <section
        className="collection-section text-center"
        id="collection-component"
      >
        <div className="row g-4 px-5">
          {products.map((product) => (
            <div className="col-lg-4 col-md-6 col-12" key={product.id}>
              <div className="product-card">
                <div className="product-image-container">
                  {/* 
                  <img
                    src={`https://artiststation.co.in/prrahi-api${product.images[0]?.imageUrl}`}
                    alt={product.name}
                    className="product-image"
                  />
                   */}
                  
                  <img
                    src={
                      product.images[0]
                        ? `https://artiststation.co.in/prrahi-api${product.images[0].imageUrl}`
                        : "https://placehold.co/800x600/E5E7EB/4B5563?text=Your+Image+Here" // Use a default image path
                    }
                    alt={product.name}
                    className="product-image "
                  />
                  <div className="product-overlay">
                    <button className="btn btn-light btn-sm">Quick View</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-description">(INCL. OF ALL TAXES)</p>
                  {/* <p className="product-description">{product.description}</p> */}
                  <div className="product-actions d-flex justify-content-between">
                    <button
                      className="btn btn-primary read-more-btn"
                      data-bs-toggle="modal"
                      data-bs-target={`#productModal-${product.id}`}
                    >
                      Read More
                    </button>
                    <button
                      className="btn btn-primary read-more-btn"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Modals based on fetched products */}
      {products.map((product) => (
        <div
          className="modal fade"
          id={`productModal-${product.id}`}
          tabIndex="-1"
          aria-labelledby={`productModal-${product.id}Label`}
          aria-hidden="true"
          key={`modal-${product.id}`}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id={`productModal-${product.id}Label`}
                >
                  PRODUCT DETAILS
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img
                    src={
                      product.images[0]
                        ? `https://artiststation.co.in/prrahi-api${product.images[0].imageUrl}`
                        : "https://placehold.co/800x600/E5E7EB/4B5563?text=Your+Image+Here" // Use a default image path
                    }
                    alt={product.name}
                    className="img-fluid"
                  />
                  </div>
                  <div className="col-md-6">
                    <h4
                      className="modal-title"
                      id={`productModal-${product.id}Label`}
                    >
                      {product.name}
                    </h4>
                    <p>
                      <strong>Price:</strong> ₹{product.price}
                    </p>
                    <p>
                      <strong>Weight:</strong> {product.weight}gm
                    </p>
                    {/* <h5>Description</h5>
                    <p>{product.description}</p> */}
                   
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Collection;
