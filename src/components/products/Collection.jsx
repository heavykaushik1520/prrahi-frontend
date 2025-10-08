import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { updateCart } from "../../services/cartServices";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import WavesAnimation from "../waves/WavesAnimation";
import TopBanner from "../top/TopBanner";
import ShoppingTopBanner from "../top/ShoppingTopBanner";

function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { fetchCart } = useCart();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const navigate = useNavigate();

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api(`/products?page=${pageNumber}&limit=${limit}`);
      
      // Update this line to match your API response keys
      setProducts(response.products || []);
      
      // Update this line to match your API response keys
      if (response.totalPages) {
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      setError("Failed to fetch products. " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleAddToCart = async (productId) => {
    try {
      const isLoggedIn = !!user;
      await updateCart(productId, 1, isLoggedIn);
      alert("Product added to cart!");
      await fetchCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add product to cart.");
    }
  };

  const handleReadMore = (productId) => {
    navigate(`/collection/${productId}`);
  };

  const renderPagination = () => {
    // Corrected logic: only render pagination if there's more than one page
    if (totalPages <= 1) {
      return null;
    }

    return (
      <div className="d-flex justify-content-center my-3">
        <nav>
          <ul className="pagination">
            {/* Previous Button */}
            <li className={`page-item ${page === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                Prev
              </button>
            </li>

            {/* Page Number Buttons */}
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${page === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li className={`page-item ${page === totalPages && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => {
                  if (page < totalPages) {
                    setPage(page + 1);
                  }
                }}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
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

  return (
    <>
      <ShoppingTopBanner />
      <section
        className="collection-section text-center"
        id="collection-component"
      >
        <div className="row g-4 px-5">
          {products.map((product) => (
            <div className="col-lg-4 col-md-6 col-12" key={product.id}>
              <div className="product-card">
                <div className="product-image-container">
                  <img
                    src={
                      product.images[0]
                        ? `https://artiststation.co.in/prrahi-api${product.images[0].imageUrl}`
                        : "https://placehold.co/800x600/E5E7EB/4B5563?text=Your+Image+Here"
                    }
                    alt={product.name}
                    className="product-image "
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description" id="boxcount-12">
                    PACK OF 12 BOXES
                  </p>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-description">(INCL. OF ALL TAXES)</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions d-flex justify-content-between">
                    <button
                      className="btn btn-primary read-more-btn"
                      onClick={() => handleReadMore(product.id)}
                    >
                      View Product
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
        {renderPagination()}
      </section>
    </>
  );
}

export default Collection;