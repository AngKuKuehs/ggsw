import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroSlider from "../components/HeroSlider";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
  const [flashDeals, setFlashDeals] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/product`, {
          credentials: "include",
        });
        const data = await res.json();
        const products = data?.products || data;

        const cheapest = [...products]
          .sort((a, b) => a.price - b.price)
          .slice(0, 4);

        setFlashDeals(cheapest);
      } catch (err) {
        console.error("Error fetching flash deal products:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/category/categories`, {
          credentials: "include",
        });
        const data = await res.json();
        setCategories(data.slice(0, 4)); // ✅ Only display 4 categories
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen px-6">
        <HeroSlider />

        {/* Flash Deals */}
        <section className="py-10 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Flash Deals</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {flashDeals.map((product) => (
              <div key={product._id} className="relative">
                {/* 🟡 Flash Deal Sticker */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10 shadow">
                  FLASH DEAL
                </span>
                <ProductCard
                  _id={product._id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-10 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat._id}
                name={cat.name}
                image={cat.image}
                slug={cat.name.toLowerCase()}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;







