import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const categories = [
  { name: "Fruits", slug: "fruits", image: "/images/fruits.jpg" },
  { name: "Vegetables", slug: "vegetables", image: "/images/vegetables.jpg" },
  { name: "Dairy", slug: "dairy", image: "/images/dairy.jpg" },
  { name: "Bakery", slug: "bakery", image: "/images/bakery.jpg" },
  { name: "Meat", slug: "meat", image: "/images/meat.jpg" },
  { name: "Beverages", slug: "beverages", image: "/images/beverages.jpg" },
];

const CategoriesPage = () => {
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
              to={`/products?category=${cat.slug}`}
              key={cat.slug}
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
