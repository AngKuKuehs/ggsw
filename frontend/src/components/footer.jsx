import React from "react";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-6 pb-6 mt-12">
      <div className="container grid grid-cols-2 md:grid-cols-5 gap-6">

        {/* GGSW Logo + Social Icons */}
        <div>
          <div className="flex gap-4 text-xl">
            <span className="hover:text-primary cursor-pointer"><FaFacebookF /></span>
            <span className="hover:text-primary cursor-pointer"><FaPhoneAlt /></span>
            <span className="hover:text-primary cursor-pointer"><BsChatDots /></span>
          </div>
        </div>

        {/* My Account */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b-2 border-primary inline-block">My Account</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="hover:text-primary cursor-pointer">My Account</li>
            <li className="hover:text-primary cursor-pointer">Order History</li>
            <li className="hover:text-primary cursor-pointer">Shopping Cart</li>
            <li className="hover:text-primary cursor-pointer">Wishlist</li>
          </ul>
        </div>

        {/* Helps */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b-2 border-primary inline-block">Helps</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="hover:text-primary cursor-pointer">Contact</li>
            <li className="hover:text-primary cursor-pointer">FAQs</li>
            <li className="hover:text-primary cursor-pointer">Terms & Condition</li>
            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Proxy */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b-2 border-primary inline-block">Proxy</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="hover:text-primary cursor-pointer">About</li>
            <li className="hover:text-primary cursor-pointer">Shop</li>
            <li className="hover:text-primary cursor-pointer">Product</li>
            <li className="hover:text-primary cursor-pointer">Track Order</li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div className="flex items-end">
          <div className="flex gap-3 mt-6">
            <img
              src="https://thewhisky.sg/wp-content/uploads/2021/10/paynow-logo-2-01.png"
              alt="PayNow"
              className="w-12 cursor-pointer"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJgM8gqqd2SheNICowBUdQvqvdbOLEucY9lw&s"
              alt="Visa"
              className="w-12 cursor-pointer"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"
              alt="Mastercard"
              className="w-12 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
