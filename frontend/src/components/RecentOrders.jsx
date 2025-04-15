import React from "react";

const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
      <table className="w-full text-sm text-left text-gray-600">
        <thead>
          <tr className="border-b">
            <th className="py-2">Product</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2">{order.product}</td>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;