import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ProductCard from "../../components/ProductCard";
import {
  ProductGrid,
  ProductSortBar,
  Breadcrumbs,
} from "../../components/ProductComponents";
import { FiFilter, FiChevronDown, FiChevronUp, FiStar } from "react-icons/fi";

// Dummy data
const DUMMY_PRODUCTS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  name: `Sample Product ${i + 1}`,
  price: (Math.random() * 100).toFixed(2),
  rating: Math.floor(Math.random() * 5) + 1,
  image:
    "https://images.unsplash.com/photo-1604908177524-402c5b7a7f5a?auto=format&fit=crop&w=500&q=60",
}));

const ALL_CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Beverages",
  "Snacks",
  "Bakery",
  "Frozen",
  "Meat",
  "Seafood",
];

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sort, setSort] = useState("");
  const [breadcrumb, setBreadcrumb] = useState(["Home", "Shop"]);
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    setProducts(DUMMY_PRODUCTS);
  }, []);

  const handleSortChange = (value) => {
    setSort(value);
    // Optional: re-sort products
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs
            path={breadcrumb}
            onNavigate={(seg, idx) =>
              setBreadcrumb((prev) => prev.slice(0, idx + 1))
            }
          />

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64">
              <div
                className="flex items-center justify-between cursor-pointer p-4 bg-white rounded-md shadow-sm border mb-4"
                onClick={toggleSidebar}
              >
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <FiFilter /> Filters
                </span>
                {sidebarOpen ? <FiChevronUp /> : <FiChevronDown />}
              </div>

              {sidebarOpen && (
                <div className="bg-white rounded-md p-4 shadow-sm border space-y-6">
                  {/* Category */}
                  <div>
                    <p className="font-medium mb-2">Category</p>
                    <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                      {ALL_CATEGORIES.map((cat) => (
                        <label key={cat} className="text-sm">
                          <input type="checkbox" className="mr-2" />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <p className="font-medium mb-2">Max Price: ${maxPrice}</p>
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Ratings */}
                  <div>
                    <p className="font-medium mb-2">Rating</p>
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((r) => (
                        <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name="rating" />
                          <span className="flex text-yellow-400">
                            {Array.from({ length: r }).map((_, i) => (
                              <FiStar key={i} />
                            ))}
                          </span>
                          & Up
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main content */}
            <div className="flex-1">
              <ProductSortBar
                onSortChange={handleSortChange}
                options={[
                  { value: "low-high", label: "Price: Low to High" },
                  { value: "high-low", label: "Price: High to Low" },
                  { value: "rating", label: "Rating" },
                  { value: "latest", label: "Newest" },
                ]}
              />

              <ProductGrid
                products={products.slice(0, visibleCount)}
                ProductCardComponent={ProductCard}
              />

              {/* Show More */}
              {visibleCount < products.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleShowMore}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    Show More Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductListingPage;
