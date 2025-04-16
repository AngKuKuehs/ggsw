import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import MyCartPage from "./pages/MyCart";
import CheckoutPage from "./pages/Checkout";
import OrderSuccessPage from "./pages/OrderPlaced";
import HomePage from "./pages/Home";
import CategoriesPage from "./pages/Categories";

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
  // Simulated auth (replace with actual auth context later)
  const user = JSON.parse(localStorage.getItem("user")); 
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <Routes>
      {/* Main User Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<MyCartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/categories" element={<CategoriesPage />} />

      {/* Product Pages */}
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inventory"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
            <InventoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inventory/update"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
            <UpdateInventoryPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
