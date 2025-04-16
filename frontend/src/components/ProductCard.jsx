import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({ _id, id, name, price, rating, image }) => {
  const productId = id || _id;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click
    e.preventDefault(); // Prevent navigation

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
  );
};

export default ProductCard;



