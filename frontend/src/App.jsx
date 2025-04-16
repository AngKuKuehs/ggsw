import React, { useState, useEffect } from "react";
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

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/users/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("User data from API:", data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin;

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

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
