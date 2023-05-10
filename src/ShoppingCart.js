import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShoppingCart({ products }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [distinctProducts, setDistinctProducts] = useState(0);

  useEffect(() => {
    const distinct = [...new Set(cart.map(item => item.id))].length;
    setDistinctProducts(distinct);
  }, [cart]);

  function toggleCart() {
    setShowCart(!showCart);
  }

  function addProduct(product) {
    const itemInCart = cart.find(item => item.id === product.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeProduct(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    const item = cart[itemIndex];
    const newCart = [...cart];
    newCart.splice(itemIndex, 1);
    setCart(newCart);
    const productToUpdate = products.find(item => item.id === id);
    productToUpdate.stock += item.quantity;
  }

  function checkout() {
    setCart([]);
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 6.95;
  const total = subtotal + shipping;

  return (
    <div>
      <button onClick={toggleCart}>Cart ({distinctProducts})</button>
      {showCart && (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => removeProduct(item.id)}>Remove</button>
            </div>
          ))}
          <div>
            <h4>Order Summary</h4>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Est. Shipping: ${shipping.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <Link to="/not-implemented">
              <button>Sign in and Check Out</button>
            </Link>
            <Link to="/">
              <button>Continue Shopping</button>
            </Link>
            <button onClick={checkout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
