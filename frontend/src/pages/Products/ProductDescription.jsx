import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ProductCard from "../../components/ProductCard";
import {
  QuantitySelector,
  AddToCartButton,
} from "../../components/ProductComponents";
import { FiHeart } from "react-icons/fi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/product/${id}`);
        const data = await res.json();
        setProduct(data.product || data);

        const relatedRes = await fetch(`${backendUrl}/api/product`);
        const relatedData = await relatedRes.json();
        const others = relatedData.products
          ?.filter((p) => p._id !== id)
          .slice(0, 4);
        setRelatedProducts(others || []);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading product details...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-gray-50 py-10 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Product Info */}
          <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-lg shadow-sm mb-10">
            <div className="md:w-1/2 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm object-contain"
              />
            </div>

            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-green-700 font-semibold text-xl mb-1">
                ${Number(product.price).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mb-6">4.0 ★ (42 reviews)</p>

              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  <button className="p-2 border rounded-full hover:bg-gray-100 transition">
                    <FiHeart />
                  </button>
                </div>

                <AddToCartButton
                  onClick={() => {
                    if (!product || !product._id) return;

                    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];

                    const exists = stored.find((item) => item.id === product._id);
                    let updatedCart;

                    if (exists) {
                      updatedCart = stored.map((item) =>
                        item.id === product._id
                          ? { ...item, quantity: item.quantity + quantity }
                          : item
                      );
                    } else {
                      updatedCart = [
                        ...stored,
                        {
                          id: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity,
                        },
                      ];
                    }

                    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                    window.dispatchEvent(new Event("cartUpdated"));
                    alert(`${product.name} added to cart!`);
                  }}
                />
              </div>

              <p className="text-sm text-gray-600">
                Category:{" "}
                <span className="text-gray-800">{product.category}</span>
              </p>
              <p className="text-sm text-gray-600">
                Tags: {(product.tags || []).join(", ")}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
            <div className="flex gap-6 justify-center mb-6">
              {["description", "additional", "feedback"].map((tab) => (
                <span
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm cursor-pointer font-semibold px-2 py-1 transition ${
                    activeTab === tab
                      ? "text-green-700 font-bold"
                      : "text-gray-500 hover:text-green-700"
                  }`}
                >
                  {tab === "description"
                    ? "Descriptions"
                    : tab === "additional"
                    ? "Additional Information"
                    : "Customer Feedback"}
                </span>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "description" && (
              <div className="text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">KEY INFORMATION</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Made from 100% fresh milk</li>
                    <li>Pasteurised and homogenised</li>
                    <li>Rich in protein, calcium, and vitamin B2</li>
                    <li>Family’s choice</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">PRODUCT DETAILS</h4>
                  <p>Origin: Thailand</p>
                  <p>Dietary: Halal</p>
                  <p>Storage: Refrigerated at 4°C or less</p>
                  <p>Type: Pasteurised, Homogenised, Fresh</p>
                  <p>Pack: Plastic Bottle, Multipack</p>
                </div>
              </div>
            )}

            {activeTab === "additional" && (
              <p className="text-sm text-gray-700">More info coming soon.</p>
            )}

            {activeTab === "feedback" && (
              <p className="text-sm text-gray-700">
                Customer reviews will be shown here.
              </p>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-20">
              <h3 className="text-xl font-semibold mb-4 text-center text-slate-800">
                Related Products
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod._id} {...prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailsPage;
