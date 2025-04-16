import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroSlider from "../components/HeroSlider";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [flashDeals, setFlashDeals] = useState([]);
  const [categories, setCategories] = useState([]);

   useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/categories`, {
            method: "GET",
            credentials: "include"
          });
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      fetchCategories();
    }, []);

    useEffect(() => {
      const fetchFlashDeals = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/top`, {
            method: "GET",
            credentials: "include"
          });
          const data = await response.json();
          setFlashDeals(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      fetchFlashDeals();
    }, []);

  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen px-6">
        {/* Hero Banner */}
        <HeroSlider />

        {/* Flash Deals */}
        <section className="py-10 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Flash Deals</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {flashDeals.slice(0,4).map((product) => (
              <Link to="/products" key={product.id} className="block">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-10 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                image={cat.image}
                slug={cat.slug}
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





