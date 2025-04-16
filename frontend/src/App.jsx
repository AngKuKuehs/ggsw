import { Routes, Route } from "react-router-dom";

// Pages
import MyCartPage from "./pages/MyCart";
import CheckoutPage from "./pages/Checkout";
import OrderSuccessPage from "./pages/OrderPlaced";
import HomePage from "./pages/Home";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import InventoryPage from "./pages/Admin/Inventory";
import UpdateInventoryPage from "./pages/Admin/UpdateInventory";

// Product Pages
import ProductListingPage from "./pages/Products/ProductListing";
import ProductDetailsPage from "./pages/Products/ProductDescription";

// User Pages
import Login from "./pages/User/login";
import Profile from "./pages/User/Profile";
import Register from "./pages/User/Registration";

function App() {
  return (
    <Routes>
      {/* Main User Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<MyCartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />

      {/* Product Pages */}
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/inventory" element={<InventoryPage />} />
      <Route path="/admin/inventory/update" element={<UpdateInventoryPage />} />
    </Routes>
  );
}

export default App;
