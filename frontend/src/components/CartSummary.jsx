// src/components/CartSummary.jsx
import React from "react";

const CartSummary = ({ total = 0, onCheckout = () => {} }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery</span>
        <span>$3.50</span>
      </div>
      <div className="flex justify-between font-bold text-gray-800">
        <span>Total</span>
        <span>${(total + 3.5).toFixed(2)}</span>
      </div>
      <button
        onClick={onCheckout}
        className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;