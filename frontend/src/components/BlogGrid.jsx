import React from "react";
import BlogCard from "./BlogCard";

const BlogGrid = ({ blogs = [] }) => {
  return (
    <section className="my-12">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 px-2">From Our Blog</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No blog posts available.</p>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;