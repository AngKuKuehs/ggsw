import React from "react";

const CartItemCard = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="px-2 py-1 border rounded text-sm"
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="px-2 py-1 border rounded text-sm"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-sm font-medium text-gray-700">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;