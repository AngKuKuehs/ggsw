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
    // Dummy flash deal products
    setFlashDeals([
      {
        id: 1,
        name: "Meiji Milk (2L)",
        price: 2.99,
        rating: 4,
        image: "https://via.placeholder.com/300",
      },
      {
        id: 2,
        name: "Cadbury Chocolate",
        price: 1.49,
        rating: 5,
        image: "https://via.placeholder.com/300",
      },
      {
        id: 3,
        name: "Sunshine Toast",
        price: 2.19,
        rating: 4,
        image: "https://via.placeholder.com/300",
      },
      {
        id: 4,
        name: "Coke Mini Cans",
        price: 5.99,
        rating: 5,
        image: "https://via.placeholder.com/300",
      },
    ]);

    // Dummy categories
    setCategories([
      { id: 1, name: "Vegetables", slug: "vegetables", image: "https://via.placeholder.com/200", count: 120 },
      { id: 2, name: "Meat", slug: "meat", image: "https://via.placeholder.com/200", count: 98 },
      { id: 3, name: "Pantry", slug: "pantry", image: "https://via.placeholder.com/200", count: 40 },
      { id: 4, name: "Fresh Fruit", slug: "fruit", image: "https://via.placeholder.com/200", count: 77 },
      { id: 5, name: "Bakes", slug: "bakes", image: "https://via.placeholder.com/200", count: 34 },
    ]);
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
            {flashDeals.map((product) => (
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





