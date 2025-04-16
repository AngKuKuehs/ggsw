import React from "react";

const CheckoutForm = ({ formData, onChange }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border">
      {/* Breadcrumbs */}
      <p className="text-sm text-gray-500 mb-6">Information &gt; Shipping &gt; Payment</p>

      {/* Contact Info */}
      <div className="mb-6 space-y-2">
        <label className="block text-sm font-medium text-gray-700">Contact information</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          required
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <label className="inline-flex items-center text-sm text-gray-600 mt-2">
          <input type="checkbox" className="mr-2" /> Email me with news and offers
        </label>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">Shipping address</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="w-full border rounded px-4 py-2 col-span-1"
            value={formData.firstName}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="w-full border rounded px-4 py-2 col-span-1"
            value={formData.lastName}
            onChange={onChange}
            required
          />
        </div>

        <input
          type="text"
          name="company"
          placeholder="Company (optional)"
          className="w-full border rounded px-4 py-2"
          value={formData.company}
          onChange={onChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full border rounded px-4 py-2"
          value={formData.address}
          onChange={onChange}
          required
        />

        <input
          type="text"
          name="apartment"
          placeholder="Apartment, suite, etc. (optional)"
          className="w-full border rounded px-4 py-2"
          value={formData.apartment}
          onChange={onChange}
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full border rounded px-4 py-2"
            value={formData.city}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-full border rounded px-4 py-2"
            value={formData.state}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="ZIP code"
            className="w-full border rounded px-4 py-2"
            value={formData.postalCode}
            onChange={onChange}
            required
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          className="w-full border rounded px-4 py-2"
          value={formData.phone}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
