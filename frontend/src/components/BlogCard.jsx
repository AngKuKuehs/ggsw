import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="block bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{blog.title}</h3>
        <p className="text-sm text-gray-600">{blog.excerpt}</p>
        <span className="text-green-600 text-xs font-medium mt-2 inline-block">Read More →</span>
      </div>
    </Link>
  );
};

export default BlogCard;