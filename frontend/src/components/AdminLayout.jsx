import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart
} from "react-icons/fi";
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-white border-r transition-all duration-200 px-4 py-6`}
      >
        <div className="flex items-center justify-between mb-10">
          {!collapsed && (
            <div className="text-2xl font-bold text-green-600">GGSW Admin</div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl font-bold text-gray-700"
            >
            =
        </button>


        </div>

        <nav className="space-y-4 text-sm">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 hover:text-green-600"
          >
            <FiHome />
            {!collapsed && "Dashboard"}
          </Link>
          <Link
            to="/admin/inventory"
            className="flex items-center gap-2 hover:text-green-600"
          >
            <FiShoppingCart />
            {!collapsed && "Inventory"}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
