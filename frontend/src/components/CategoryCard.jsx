import React from "react";
import { FiArrowRight } from "react-icons/fi";

const CategoryCard = ({ name, image }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition duration-300 p-4 text-center flex flex-col items-center justify-between">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-32 h-32 object-contain mb-4 transition-transform duration-300 hover:scale-105"
      />

      {/* Category Name */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{name}</h3>

      {/* CTA */}
      <button className="flex items-center gap-2 text-sm text-green-700 hover:underline transition">
        Explore <FiArrowRight />
      </button>
    </div>
  );
};

export default CategoryCard;