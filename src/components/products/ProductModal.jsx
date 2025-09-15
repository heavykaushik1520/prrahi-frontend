// src/components/ProductModal.jsx
import React from 'react';
import { Modal } from 'bootstrap';

function ProductModal({ product, onClose }) {
  if (!product) {
    return null; // Don't render if no product is passed
  }

  const handleClose = () => {
    // Manually close the Bootstrap modal
    const modal = document.getElementById('productModal');
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    // Call the parent's onClose handler to clear the selectedProduct state
    onClose();
  };

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="productModalLabel">
              PRODUCT DETAILS
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
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
                <h4 className="modal-title">{product.name}</h4>
                <p>
                  <strong>Price:</strong> ₹{product.price}
                </p>
                <p>
                  <strong>Weight:</strong> {product.weight}gm
                </p>
                <h5>Description</h5>
                <p>{product.description}</p>
                <p className="product-description">PACK OF 12 BOXES</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;