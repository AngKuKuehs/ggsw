import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AdminLayout from "../../components/AdminLayout";
import DashboardCards from "../../components/DashboardCards";
import SalesGraph from "../../components/SalesGraph";
import BestSellers from "../../components/BestSellers";
import RecentOrders from "../../components/RecentOrders";

const backendUrl = import.meta.env.VITE_BACKEND_URL

const AdminDashboard = () => {
  const [graphTimeframe, setGraphTimeframe] = useState("monthly");
  const [cardStats, setCardStats] = useState([]);
  const [bestSellers, setTop] = useState([]);

  const fetchJsonSafe = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
  
    const text = await res.text();
  
    try {
      return JSON.parse(text);
    } catch {
      console.error("❌ Not valid JSON from", url, "Raw:", text);
      throw new Error(`Non-JSON response from ${url}`);
    }
  };
  

  const getCardStats = async () => {
    try {
      const totalOrders = await fetchJsonSafe(`${backendUrl}/api/order/total-orders`);
      const totalSales = await fetchJsonSafe(`${backendUrl}/api/order/total-sales`);


      const stats = [
        { label: "Total Orders", amount: totalOrders.totalOrders },
        { label: "Total Sales", amount: `\$${totalSales.totalSales}` },
      ];

      setCardStats(stats);
    } catch (error) {
      console.error("Failed to fetch card stats:", error);
      alert("Failed to get some card stats.");
    }
  };

  const getBestSellers = async () => {
    try {
      const topProds = await fetchJsonSafe(`${backendUrl}/api/product/top`);
      setTop(topProds)
    } catch (error) {
      console.error("Failed to fetch top:", error);
      alert("Failed to get some card stats.");
    }
  }

  useEffect(() => {
    getCardStats();
    getBestSellers();
  }, []);

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
