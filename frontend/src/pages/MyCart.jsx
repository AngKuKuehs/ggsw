import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const navigate = useNavigate();

  // Dummy cart items (replace this with real cart state later)
  const cartItems = [
    {
      id: 1,
      name: "Meiji Milk (2L)",
      price: 2.99,
      quantity: 1,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Cadbury Chocolate",
      price: 1.49,
      quantity: 2,
      image: "https://via.placeholder.com/300",
    },
  ];

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
            {cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
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

