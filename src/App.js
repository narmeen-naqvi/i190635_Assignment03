import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import ShoppingCart from "./ShoppingCart";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  
    // Get the cart from local storage
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the product is already in the cart
    const productInCart = cartFromStorage.find((item) => item.id === product.id);
  
    // If the product is already in the cart, update its quantity
    if (productInCart) {
      const updatedCart = cartFromStorage.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    // If the product is not in the cart, add it
    else {
      cartFromStorage.push({ ...product, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cartFromStorage));
    }
  };
  

  const removeFromCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty - 1 } : item
        )
      );
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  };

  return (
    <Router>
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-2 text-right">
            <a
              href="#"
              data-toggle="modal"
              data-target="#shoppingCartModal"
              className="btn btn-outline-primary"
            >
              Cart ({cartItems.length})
            </a>
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="row">
                {products
                  .filter((product) =>
                    product.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                      <Product product={product} addToCart={addToCart} />
                    </div>
                  ))}
              </div>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
        </Routes>
        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          subtotal={calculateSubtotal()}
        />
      </div>
    </Router>
  );
}

export default App;
