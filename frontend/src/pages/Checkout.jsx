import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CheckoutForm from "../components/CheckoutForm";
import CartSummary from "../components/CartSummary";
import { useLocation } from "react-router-dom";
import.meta.env.VITE_BACKEND_URL;

const CheckoutPage = () => {

  const location = useLocation();
  const orderId = location.state?.orderId;

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
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      setOrderData(data);
    };
    fetchOrder();
  }, [orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      });
  
      const data = await response.json();
  
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error:", data);
        alert("Failed to initiate checkout.");
      }
    } catch (error) {
      alert ("An error occurred while processing your request.");
      console.error("Error:", error);
    }
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
          <CartSummary total={orderData?.totalPrice || 0} items={orderData?.orderItems || []} onCheckout={handleSubmit} />
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;