import React from "react";

const DashboardCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-sm p-4 border">
          <p className="text-sm text-gray-500">{card.label}</p>
          <p className="text-xl font-semibold text-gray-800">{card.amount}</p>
          <p className={`text-xs ${card.change > 0 ? "text-green-600" : "text-red-500"}`}>
            {card.change > 0 ? "+" : ""}
            {card.change}% compared to last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;