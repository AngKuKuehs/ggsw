import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = {
        name: "Angie Yoedzer", 
        email: "yoedzera@gmail.com",
      };
      setUser(data);
    };

    fetchUser();
  }, []);

  const sidebarItems = [
    { label: "Profile", active: true },
    { label: "Payment methods", hasDot: true },
    { label: "Address" },
    { label: "Preferences" },
    { label: "Vouchers", hasDot: true },
    { label: "Lucky draw" },
  ];

  const membershipItems = ["Link membership", "Digital Club"];

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

            <h3 className="text-sm text-gray-500 font-semibold mt-6 mb-2">Membership</h3>
            <ul className="space-y-3">
              {membershipItems.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Section */}
          <section className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {!user ? (
              <div className="text-gray-500 text-sm">Loading profile...</div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-1">{user.name}</h2>
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
                <button className="text-sm text-red-600 hover:underline mt-1">Log out</button>
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