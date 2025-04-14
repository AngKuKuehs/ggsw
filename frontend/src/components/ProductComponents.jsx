import React from "react";
import { FiShoppingBag, FiChevronRight } from "react-icons/fi";

// ProductGrid – displays a list of ProductCards
export const ProductGrid = ({ products = [], ProductCardComponent }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, idx) => (
        <ProductCardComponent key={product.id || idx} {...product} />
      ))}
    </div>
  );
};

// ProductFilterSidebar – UI for filters (callbacks passed in from parent)
export const ProductFilterSidebar = ({
  filters = {},
  onCategoryChange,
  onPriceChange,
  onRatingChange,
}) => {
  return (
    <aside className="w-full md:w-64 p-4 border-r border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Filter Products</h3>

      {/* Category Filter */}
      {filters.categories && (
        <div className="mb-6">
          <p className="font-medium mb-2">Category</p>
          <div className="flex flex-col gap-2">
            {filters.categories.map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  onChange={() => onCategoryChange?.(cat)}
                />{" "}
                {cat}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Filter */}
      {filters.priceRange && (
        <div className="mb-6">
          <p className="font-medium mb-2">Price</p>
          <input
            type="range"
            min={filters.priceRange[0]}
            max={filters.priceRange[1]}
            onChange={(e) => onPriceChange?.(e.target.value)}
            className="w-full"
          />
        </div>
      )}

      {/* Rating Filter */}
      {filters.rating && (
        <div>
          <p className="font-medium mb-2">Rating</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <span
                key={r}
                className="text-yellow-400 cursor-pointer"
                onClick={() => onRatingChange?.(r)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

// ProductSortBar – Sorting dropdown
export const ProductSortBar = ({ onSortChange, options = [] }) => {
  return (
    <div className="flex justify-end mb-4">
      <select
        onChange={(e) => onSortChange?.(e.target.value)}
        className="border rounded p-2 text-sm"
      >
        <option value="">Sort by</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// ProductDetails – modular single product display
export const ProductDetails = ({
  product = {},
  onAddToCart,
  showReviews = true,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Image */}
      <div className="md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Info */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-green-600 text-lg font-semibold mb-4">
          ${product.price}
        </p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <QuantitySelector />

        <AddToCartButton onClick={() => onAddToCart?.(product)} />

        {showReviews && <ProductReviewSection reviews={product.reviews} />}
      </div>
    </div>
  );
};

// QuantitySelector – controlled by parent
export const QuantitySelector = ({ quantity = 1, onChange }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        onClick={() => onChange?.(Math.max(1, quantity - 1))}
        className="px-3 py-1 border rounded"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => onChange?.(quantity + 1)}
        className="px-3 py-1 border rounded"
      >
        +
      </button>
    </div>
  );
};

// AddToCartButton – trigger passed from parent
export const AddToCartButton = ({ onClick }) => {
  return (
    <button
      className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition mb-6"
      onClick={onClick}
    >
      <FiShoppingBag className="inline-block mr-2" />
      Add to Cart
    </button>
  );
};

// ProductReviewSection – accepts review array
export const ProductReviewSection = ({ reviews = [] }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>

      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((review, i) => (
          <div key={i} className="border-b pb-2">
            <p className="text-sm font-semibold">{review.name}</p>
            <p className="text-xs text-gray-500 mb-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} className={idx < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
              ))}
            </p>
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Breadcrumbs – navigation path
export const Breadcrumbs = ({ path = [], onNavigate }) => {
  return (
    <div className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-1">
      {path.map((segment, idx) => (
        <span key={idx} className="inline-flex items-center">
          <button
            className="hover:underline"
            onClick={() => onNavigate?.(segment, idx)}
          >
            {segment}
          </button>
          {idx < path.length - 1 && (
            <FiChevronRight className="mx-2 text-gray-400" />
          )}
        </span>
      ))}
    </div>
  );
};