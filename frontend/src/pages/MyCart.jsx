import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  // Sync to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(newQuantity, 1) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
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
      <main className="bg-gray-50 min-h-screen px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            )}
          </div>

          {/* Order Summary */}
          <CartSummary total={cartTotal} onCheckout={handleCheckout} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyCart;

