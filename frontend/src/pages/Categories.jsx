import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-10 px-4">
          <div className="text-center">Loading categories...</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Shop by Category
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <Link
              to={`/products?category=${cat.name.toLowerCase()}`}
              key={cat.name}
              className="bg-white rounded-lg shadow hover:shadow-md transition border"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center font-medium text-gray-700">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoriesPage;
