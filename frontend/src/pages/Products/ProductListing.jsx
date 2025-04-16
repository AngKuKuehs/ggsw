import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Add useLocation
import Header from "../../components/header";
import Footer from "../../components/footer";
import ProductCard from "../../components/ProductCard";
import {
  ProductGrid,
  ProductSortBar,
  Breadcrumbs,
} from "../../components/ProductComponents";
import { FiFilter, FiChevronDown, FiChevronUp, FiStar } from "react-icons/fi";

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
  const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products
  const [visibleCount, setVisibleCount] = useState(12);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sort, setSort] = useState("");
  const [breadcrumb, setBreadcrumb] = useState(["Home", "Shop"]);
  const [maxPrice, setMaxPrice] = useState(100);

  const location = useLocation(); // Get URL query params

  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
<<<<<<< Updated upstream
        const res = await fetch("http://localhost:5000/api/product");
=======
        // Optionally, modify the fetch to include search query if backend supports it
        const url = searchQuery
          ? `${backendUrl}/api/product?search=${encodeURIComponent(searchQuery)}`
          : `${backendUrl}/api/product`;
        const res = await fetch(url);
>>>>>>> Stashed changes
        const data = await res.json();
        let fetchedProducts = data?.products || data;

        // If backend doesn't handle search, filter client-side
        if (searchQuery && !url.includes("search")) {
          fetchedProducts = fetchedProducts.filter((product) =>
            product.name?.toLowerCase().includes(searchQuery) ||
            product.description?.toLowerCase().includes(searchQuery)
          );
        }

        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Initialize filtered products
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [searchQuery]); // Re-fetch or filter when searchQuery changes

  // Handle sorting (apply to filteredProducts)
  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    if (sort === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "latest") {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredProducts(sortedProducts);
  }, [sort, products]); // Re-sort when sort or products change

  const handleSortChange = (value) => {
    setSort(value);
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
                        <label
                          key={r}
                          className="flex items-center gap-2 text-sm cursor-pointer"
                        >
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

              {filteredProducts.length === 0 && searchQuery ? (
                <div className="text-center py-10">
                  <p className="text-gray-600 text-lg">
                    No matches found for "{searchQuery}".
                  </p>
                </div>
              ) : (
                <>
                  <ProductGrid
                    products={filteredProducts.slice(0, visibleCount)}
                    ProductCardComponent={ProductCard}
                  />

                  {/* Show More */}
                  {visibleCount < filteredProducts.length && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleShowMore}
                        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                      >
                        Show More Products
                      </button>
                    </div>
                  )}
                </>
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
