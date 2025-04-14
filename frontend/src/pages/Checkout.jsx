import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CheckoutForm from "../components/CheckoutForm";
import CartSummary from "../components/CartSummary";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [cartTotal] = useState(19.96); // replace with actual cart total logic

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Order:", formData);
    alert("✅ Order placed! Redirecting to confirmation page...");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Left: Checkout form */}
          <div className="md:col-span-2">
            <CheckoutForm formData={formData} onChange={handleChange} />
          </div>

          {/* Right: Summary */}
          <CartSummary total={cartTotal} onCheckout={handleSubmit} />
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;