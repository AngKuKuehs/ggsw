// src/pages/MyCart.jsx
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";

const MyCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Meiji Milk (2L)",
      price: 2.99,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Cadbury Chocolate",
      price: 1.49,
      quantity: 3,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">My Cart</h2>
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

          {/* Summary */}
          <CartSummary total={totalPrice} onCheckout={handleCheckout} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyCartPage;