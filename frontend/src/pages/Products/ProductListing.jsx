import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ProductCard from "../../components/ProductCard";
import {
  ProductGrid,
  ProductSortBar,
  Breadcrumbs,
} from "../../components/ProductComponents";
import { FiFilter, FiChevronDown, FiChevronUp, FiStar } from "react-icons/fi";
import { useSearchParams } from "react-router";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sort, setSort] = useState("");
  const [breadcrumb, setBreadcrumb] = useState(["Home", "Shop"]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/category/categories`, {
          credentials: "include",
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryParam && categories.length > 0) {
      const cat = categories.find(
        (c) => c.name.toLowerCase() === categoryParam.toLowerCase()
      );
      if (cat) {
        setSelectedCategories([cat._id]);
      }
    }
  }, [categories, categoryParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/product`, {
          credentials: "include",
        });
        const data = await response.json();
        const allProducts = data.products || data;
        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name?.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sort === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

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
                  {/* Category Filter */}
                  <div>
                    <p className="font-medium mb-2">Category</p>
                    <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                      {categories.map((cat) => (
                        <label key={cat._id} className="text-sm">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedCategories.includes(cat._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, cat._id]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter((id) => id !== cat._id)
                                );
                              }
                            }}
                          />
                          {cat.name}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <p className="font-medium mb-2">Max Price: ${maxPrice}</p>
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Rating Filter (placeholder) */}
                  <div>
                    <p className="font-medium mb-2">Rating</p>
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((r) => (
                        <label
                          key={r}
                          className="flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <input type="radio" name="rating" disabled />
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

            {/* Product Display */}
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

              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600 text-lg">
                    No matches found{searchQuery && ` for "${searchQuery}"`}.
                  </p>
                </div>
              ) : (
                <>
                  <ProductGrid
                    products={filteredProducts.slice(0, visibleCount)}
                    ProductCardComponent={ProductCard}
                  />

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