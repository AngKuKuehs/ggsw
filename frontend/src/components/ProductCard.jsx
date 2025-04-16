import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

<<<<<<< Updated upstream
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
=======
const ProductCard = ({ _id, id, name, price, rating, image }) => {
  const productId = id || _id;

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    e.preventDefault(); 

    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];

    const exists = stored.find((item) => item.id === productId);
    let updatedCart;

    if (exists) {
      updatedCart = stored.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [
        ...stored,
        { id: productId, name, price, image, quantity: 1 },
      ];
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert(`${name} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Link
      to={`/products/${productId}`}
      className="block"
    >
      <div className="w-64 border border-green-400 rounded-xl p-4 shadow-sm hover:shadow-md transition relative">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-contain mb-2"
        />
        <h3 className="text-sm font-semibold text-green-700 mb-1">{name}</h3>
        <p className="text-green-700 font-bold mb-1">
          ${Number(price).toFixed(2)}
        </p>
        <div className="text-yellow-500 text-sm mb-8">
          {"★".repeat(rating)}{"☆".repeat(5 - rating)}
        </div>

        {/* Add to cart button only */}
        <button
          onClick={handleAddToCart}
          className="bg-yellow-300 hover:bg-yellow-400 p-3 rounded-full absolute bottom-3 right-3"
        >
          <FiShoppingBag size={16} />
        </button>
      </div>
    </Link>
>>>>>>> Stashed changes
  );
};

export default ProductCard;



