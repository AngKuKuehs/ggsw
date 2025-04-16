import React from "react";
import { FiShoppingBag } from "react-icons/fi";

const ProductCard = ({name, price, image, rating }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 relative">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-52 object-contain mb-4"
      />

      {/* Product Name */}
      <h3 className="text-base font-medium text-gray-800 mb-1">{name}</h3>

      {/* Price */}
      <p className="text-lg font-semibold text-gray-900">${price}</p>

      {/* Star Rating */}
      <div className="flex items-center mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < rating ? "text-orange-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Add to Cart Icon */}
      <button className="absolute bottom-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-green-100 transition">
        <FiShoppingBag className="text-gray-700" />
      </button>
    </div>
  );
};

export default ProductCard;


