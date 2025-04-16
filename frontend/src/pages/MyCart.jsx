import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const MyCart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const initialLoad = useRef(true); // Track initial load

  // Load cart items (runs once on mount)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Validate data format
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

  // Sync to localStorage (skips initial load)
  useEffect(() => {
    if (!initialLoad.current) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    initialLoad.current = false;
  }, [cartItems]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Prevent 0 or negative quantities
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen px-4 sm:px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">My Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>

          <CartSummary total={cartTotal} onCheckout={handleCheckout} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyCart;

