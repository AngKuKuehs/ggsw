import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CheckoutForm from "../components/CheckoutForm";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom"; // 

const CheckoutPage = () => {
  const navigate = useNavigate(); // 

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: ""
  });  

  const cartTotal = 19.96; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Order:", formData);
    navigate("/order-success"); // 
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10"
        >
          {/* Left: Form */}
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