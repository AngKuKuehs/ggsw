import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = "http://localhost:5000";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
      const response = await fetch(`${backendUrl}/api/users/profile`, {
        method: "GET",
        credentials: "include", 
      });
        if (response.ok) {
          const data = await response.json()
          setUser(data);
        } else {
          throw new Error("Failed to fetch user profile.");
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/users/logout`, {
        method: "POST",
        credentials: "include", // include cookies
      });

      if (!res.ok) throw new Error("Logout failed");

      setUser(null);
      alert("Logged out successfully!");
      navigate("/login"); // or any other route
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    }
  };

  const handleLoginClick = () => {
    // You can add login logic here if needed
    navigate('/login'); // Redirect to your desired page
  };

  const sidebarItems = [
    { label: "Profile", active: true },
    { label: "Payment methods", hasDot: true },
    { label: "Address" }
  ];

  return (
    <>
      <Header />
      <div className="flex-grow bg-gray-50 w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-5xl flex gap-8">
          {/* Sidebar */}
          <aside className="w-1/4 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm text-gray-500 font-semibold mb-2">Account</h3>
            <ul className="space-y-3">
              {sidebarItems.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex justify-between items-center text-sm px-2 py-1 rounded-md cursor-pointer ${
                    item.active ? "bg-gray-100 font-semibold text-green-700" : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                  {item.hasDot && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Section */}
          <section className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {!user ? (
              <div className="text-gray-500 text-sm"><button
              onClick={handleLoginClick}
              type="button"
              className="w-full bg-yellow-600 text-white p-3 rounded-md hover:bg-yellow-700 transition duration-200"
            >
              Log In
            </button></div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-1">{user.username}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-500 font-semibold mb-2">Manage profile in Linkpass</h3>
                  <div className="bg-blue-50 border border-blue-300 rounded-md p-3 text-sm text-blue-800 flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>Verify your info to secure your account</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-500 font-semibold mb-2">Notifications</h3>
                  <div className="p-3 border border-gray-200 rounded-md text-sm text-gray-600">
                    You have no new notifications.
                  </div>
                </div>

                {/* 🔴 Logout button */}
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline mt-1"
                >
                  Log out
                </button>
              </>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
