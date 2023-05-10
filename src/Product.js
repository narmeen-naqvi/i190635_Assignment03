import React, { useState } from "react";

function Product({ product }) {
    const [quantity, setQuantity] = useState(0);
  
    const handleQuantityChange = (event) => {
      setQuantity(parseInt(event.target.value));
    };
  
    const handleAddToCart = () => {
      // handle adding the product to the cart
    };
  
    return (
      <div className="card">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top"
            style={{ maxHeight: "200px" }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/300x300?text=No+Image"
            alt="No Image"
            className="card-img-top"
            style={{ maxHeight: "200px" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>
          <p className="card-text">In stock: {product.stock}</p>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
              aria-label="Quantity"
              min="0"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Product;