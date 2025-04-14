import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroSlider from "../components/HeroSlider";
import FlashDealSection from "../components/FlashDealSection";
import CategoryGrid from "../components/CategoryGrid";

const HomePage = () => {
  const [flashDeals, setFlashDeals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // ✅ Dummy flash deal products
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

    // ✅ Dummy categories
    setCategories([
      { id: 1, name: "Vegetables", image: "https://via.placeholder.com/200", count: 120 },
      { id: 2, name: "Meat", image: "https://via.placeholder.com/200", count: 98 },
      { id: 3, name: "Pantry", image: "https://via.placeholder.com/200", count: 40 },
      { id: 4, name: "Fresh Fruit", image: "https://via.placeholder.com/200", count: 77 },
      { id: 5, name: "Bakes", image: "https://via.placeholder.com/200", count: 34 },
    ]);

  }, []);

  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen px-6">
        {/* Hero Banner */}
        <HeroSlider />

        {/* Flash Deals */}
        <FlashDealSection products={flashDeals} />

        {/* Category Grid */}
        <CategoryGrid categories={categories} />

      </main>

      <Footer />
    </>
  );
};

export default HomePage;



