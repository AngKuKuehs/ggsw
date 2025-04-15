import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AdminLayout from "../../components/AdminLayout";
import DashboardCards from "../../components/DashboardCards";
import SalesGraph from "../../components/SalesGraph";
import BestSellers from "../../components/BestSellers";
import RecentOrders from "../../components/RecentOrders";

const AdminDashboard = () => {
  const [graphTimeframe, setGraphTimeframe] = useState("monthly");

  // This data can later come from your backend
  const cardStats = [
    { label: "Total Orders", amount: "$126,500", change: 34.7 },
    { label: "Active Orders", amount: "$8,400", change: 8.2 },
    { label: "Completed Orders", amount: "$114,700", change: 30.1 },
    { label: "Returned Orders", amount: "$3,400", change: -2.8 },
  ];

  const bestSellers = [
    { name: "Organic Milk", price: "$2.99" },
    { name: "Fresh Bread", price: "$3.55" },
    { name: "Premium Basmati Rice", price: "$5.99" },
  ];

  const recentOrders = [
    { product: "Milk", id: "#25426", date: "Nov 8, 2023", customer: "Angie", status: "Delivered", amount: "$20.00" },
    { product: "Tofu", id: "#25425", date: "Nov 7, 2023", customer: "Angie", status: "Canceled", amount: "$14.00" },
    { product: "Tea", id: "#25424", date: "Nov 6, 2023", customer: "David", status: "Delivered", amount: "$12.00" },
    { product: "Coffee", id: "#25423", date: "Nov 5, 2023", customer: "David", status: "Canceled", amount: "$25.00" },
    { product: "Cheese", id: "#25422", date: "Nov 4, 2023", customer: "Bryan", status: "Delivered", amount: "$10.00" },
  ];

  return (
    <>
      <Header />

      <AdminLayout>
        <DashboardCards cards={cardStats} />
        <SalesGraph timeframe={graphTimeframe} onTimeframeChange={setGraphTimeframe} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <BestSellers items={bestSellers} />
          </div>
          <div className="md:col-span-2">
            <RecentOrders orders={recentOrders} />
          </div>
        </div>
      </AdminLayout>

      <Footer />
    </>
  );
};

export default AdminDashboard;
