import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AdminLayout from "../../components/AdminLayout";

const BackendURL = "http://localhost:5000";

const UpdateInventoryPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    brand: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    switch (true) {
      case !formData.name:
        return alert("Name field is empty");
      case !formData.description:
        return alert("Description field is empty");
      case !formData.price:
        return alert("Price field is empty");
      case !formData.category:
        return alert("Category field is empty");
      case !formData.quantity:
        return alert("Quantity field is empty");
      case !formData.brand:
        return alert("Brand field is empty");
      case !formData.image:
        return alert("Image not selected");
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("quantity", formData.quantity);
      data.append("brand", formData.brand);
      data.append("image", formData.image);

      const response = await fetch(`${BackendURL}/api/product`, {
        method: "POST",
        body: data,
        credentials: "include", // Include cookies
      });

      const result = await response.json();

      if (result.success) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          brand: "",
          image: null,
        });
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
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="beverages">Beverages</option>
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
              type="url"
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




