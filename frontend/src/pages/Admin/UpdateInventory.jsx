import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AdminLayout from "../../components/AdminLayout";

const UpdateInventoryPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    stock: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("✅ Product added! (Connect to backend)");
    setFormData({ name: "", sku: "", stock: "", price: "" });
  };

  return (
    <>
      <Header />
      <AdminLayout>
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />
              </div>
            </div>
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

