import React from "react";

const CheckoutForm = ({ formData, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Full Name"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Address"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="City"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={onChange}
          placeholder="Postal Code"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="Phone Number"
          className="w-full border rounded px-4 py-2"
          required
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
