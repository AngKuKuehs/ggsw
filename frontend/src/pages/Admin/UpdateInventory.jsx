import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AdminLayout from "../../components/AdminLayout";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const CATEGORY_OPTIONS = [
  { label: "Fruits", value: "fruits", id: "fruits_id" },
  { label: "Vegetables", value: "vegetables", id: "67ff699c53c719ffd4a01078" },
  { label: "Dairy", value: "dairy", id: "dairy_id" },
  { label: "Bakery", value: "bakery", id: "bakery_id" },
  { label: "Meat", value: "meat", id: "meat_id" },
  { label: "Beverages", value: "beverages", id: "beverages_id" },
];

const getCategoryId = (value) =>
  CATEGORY_OPTIONS.find((cat) => cat.value === value)?.id || "";

const INITIAL_FORM_STATE = {
  name: "",
  description: "",
  price: "",
  category: "",
  quantity: "",
  brand: "",
  image: null,
};

const UpdateInventoryPage = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ["name", "description", "price", "category", "quantity", "brand", "image"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return `The ${field} field is required.`;
      }
    }
    return null;
  };

  const resetForm = () => setFormData(INITIAL_FORM_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      return alert(validationError);
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "category") {
        data.append("category", getCategoryId(value));
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await fetch(`${BackendURL}/api/product`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        resetForm();
      } else {
        alert(`Error: ${result.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <>
      <Header />
      <AdminLayout>
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="">-- Select Category --</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-gray-50"
              required
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </AdminLayout>
      <Footer />
    </>
  );
};

export default UpdateInventoryPage;
