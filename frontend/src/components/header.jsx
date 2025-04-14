import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-200 text-sm text-gray-700 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-700" />
          <span>Store Location: Clementi Ave West, Singapore</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="cursor-pointer">Eng ⌄</span>
          <span className="cursor-pointer">SGD ⌄</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white py-4 px-6 flex justify-between items-center">
        {/* Left Links */}
        <nav className="flex gap-6 text-gray-700 font-medium text-sm">
          <span className="cursor-pointer hover:text-green-700">Home ⌄</span>
          <span className="cursor-pointer hover:text-green-700">Shop ⌄</span>
          <span className="cursor-pointer hover:text-green-700">Pages ⌄</span>
          <span className="cursor-pointer hover:text-green-700">Blog ⌄</span>
          <span className="cursor-pointer hover:text-green-700">About Us</span>
        </nav>

        {/* Logo */}
        <div className="text-2xl font-bold text-green-900 flex items-center gap-1">
          <span className="text-green-500 text-2xl">🌱</span> GGSW
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5 text-gray-700 text-lg">
          <div className="flex items-center gap-1 text-sm">
            <FaPhoneAlt />
            <span>(219) 555-0114</span>
          </div>
          <FaSearch className="cursor-pointer" />
          <FaHeart className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <FiShoppingBag />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">2</span>
          </div>
          <FaUser className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;