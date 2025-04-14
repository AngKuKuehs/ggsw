import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const FlashDealSection = ({ title = "Today's Flash Deals", products = [], viewAllLink = "/deals" }) => {
  return (
    <section className="mb-12">
      {/* Title + View All */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <Link to={viewAllLink} className="text-sm text-green-600 hover:underline">
          View All →
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No deals available right now.</p>
        ) : (
          products.map((product) => <ProductCard key={product.id} {...product} />)
        )}
      </div>
    </section>
  );
};

export default FlashDealSection;