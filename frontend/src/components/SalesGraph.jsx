import React from "react";

const SalesGraph = ({ timeframe, onTimeframeChange }) => {
  return (
    <div className="bg-white rounded-lg p-4 border mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Sales Graph</h3>
        <div className="space-x-2 text-sm">
          {["Weekly", "Monthly", "Yearly"].map((label) => (
            <button
              key={label}
              onClick={() => onTimeframeChange(label.toLowerCase())}
              className={`px-3 py-1 rounded ${timeframe === label.toLowerCase() ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-green-100"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">
        {/* Replace with chart library later */}
        [Graph Placeholder for {timeframe}]
      </div>
    </div>
  );
};

export default SalesGraph;