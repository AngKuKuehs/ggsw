import React from "react";

const BestSellers = ({ items }) => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-semibold text-gray-800 mb-4">Best Sellers</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700">
        Report
      </button>
    </div>
  );
};

export default BestSellers;