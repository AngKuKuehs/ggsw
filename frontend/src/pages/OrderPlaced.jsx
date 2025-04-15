import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const OrderSuccessPage = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-md w-full text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank you for your order!</h2>
          <p className="text-gray-600 mb-6">
            Your order was placed successfully. A confirmation has been sent to your email.
          </p>

          {/* Styled Button */}
          <Link
            to="/"
            className="inline-block bg-yellow-400 text-black font-medium px-6 py-3 rounded-full hover:bg-yellow-500 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OrderSuccessPage;
