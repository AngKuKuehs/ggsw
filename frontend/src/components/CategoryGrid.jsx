import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories = [] }) => {
  return (
    <section className="my-12">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 px-2">Shop by Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No categories found.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryGrid;