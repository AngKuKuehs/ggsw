import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSearch,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import { FiShoppingBag, FiChevronDown } from "react-icons/fi";

const Header = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const shopTimeout = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleShopEnter = () => {
    clearTimeout(shopTimeout.current);
    setShopOpen(true);
  };

  const handleShopLeave = () => {
    shopTimeout.current = setTimeout(() => setShopOpen(false), 100);
  };

  return (
    <header className="w-full shadow-sm relative z-50">
      <div className="bg-gray-200 text-sm text-gray-700 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-700" />
          <span>Store Location: Clementi Ave West, Singapore</span>
        </div>
        <div className="flex items-center gap-6">
          <div onClick={() => setLangOpen(!langOpen)} className="cursor-pointer relative">
            Eng <FiChevronDown className="inline text-xs" />
            {langOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-md rounded text-sm text-gray-700 w-28 z-50">
                <div className="px-4 py-2 hover:bg-gray-100">English</div>
                <div className="px-4 py-2 hover:bg-gray-100">中文</div>
              </div>
            )}
          </div>
          <div onClick={() => setCurrencyOpen(!currencyOpen)} className="cursor-pointer relative">
            SGD <FiChevronDown className="inline text-xs" />
            {currencyOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-md rounded text-sm text-gray-700 w-28 z-50">
                <div className="px-4 py-2 hover:bg-gray-100">SGD</div>
                <div className="px-4 py-2 hover:bg-gray-100">USD</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white py-4 px-6 flex justify-between items-center">
        <nav className="flex gap-6 text-gray-700 font-medium text-sm">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <div
            onMouseEnter={handleShopEnter}
            onMouseLeave={handleShopLeave}
            className="relative"
          >
            <span className="cursor-pointer hover:text-green-700 flex items-center gap-1">
              Shop <FiChevronDown className="text-xs" />
            </span>
            {shopOpen && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-md rounded w-44 z-50">
                <Link to="/categories" className="block px-4 py-2 hover:bg-gray-100">Shop All Categories</Link>
                <Link to="/products" className="block px-4 py-2 hover:bg-gray-100">Shop All Products</Link>
              </div>
            )}
          </div>
          <span className="hover:text-green-700 cursor-pointer">Pages</span>
          <span className="hover:text-green-700 cursor-pointer">Blog</span>
          <span className="hover:text-green-700 cursor-pointer">About Us</span>
        </nav>

        <div className="text-2xl font-bold text-green-900 flex items-center gap-1">
          <span className="text-green-500 text-2xl">🌱</span> GGSW
        </div>

        <div className="flex items-center gap-4 text-gray-700 text-lg relative">
          <div className="flex items-center gap-1 text-sm">
            <FaPhoneAlt />
            <span>(219) 555-0114</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <FaSearch
              onClick={handleSearch}
              className="absolute right-2 top-1.5 text-gray-500 cursor-pointer"
            />
          </div>
          <FaHeart className="cursor-pointer" />
          <Link to="/cart" className="relative cursor-pointer">
            <FiShoppingBag />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              2
            </span>
          </Link>
          <Link to="/profile">
            <FaUser className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
