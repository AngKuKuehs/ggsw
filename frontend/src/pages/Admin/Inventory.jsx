import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AdminLayout from "../../components/AdminLayout";

const InventoryPage = () => {
  // Example product data (replace with backend data later)
  const products = [
    { id: 1, name: "Organic Milk", sku: "MILK001", stock: 42, price: "$2.99" },
    { id: 2, name: "Fresh Bread", sku: "BREAD002", stock: 20, price: "$3.55" },
    { id: 3, name: "Basmati Rice", sku: "RICE003", stock: 10, price: "$5.99" },
    { id: 4, name: "Almond Butter", sku: "ALM004", stock: 0, price: "$6.99" },
  ];

  const handleUpdateClick = () => {
    alert("🛠️ Inventory update triggered. Connect to backend API here.");
  };

  return (
    <>
      <Header />

      <AdminLayout>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Product Inventory</h2>
          <button
            onClick={handleUpdateClick}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Update Inventory
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-lg text-sm text-left">
            <thead className="bg-gray-100 border-b text-gray-600">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">In Stock</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isLow = product.stock === 0;
                return (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.sku}</td>
                    <td className="py-3 px-4">{product.stock}</td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isLow
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {isLow ? "Out of Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>

      <Footer />
    </>
  );
};

export default InventoryPage;
