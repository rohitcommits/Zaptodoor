import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Dashboard/Sidebar";
import DashboardHome from "../components/layout/Dashboard/DashboardHome";
import DriverTable from "../components/layout/Dashboard/Driver";
import RestaurantTable from "../components/layout/Dashboard/Restaurant/Restaurant";
import UsersTable from "../components/layout/Dashboard/Users";
import OrderTable from "../components/layout/Dashboard/Orders";
import MainCategoryTable from "../components/layout/Dashboard/MainCategory";
import CategoriesTable from "../components/layout/Dashboard/Categories"; // ← Add this
import SubCategoriesTable from "../components/layout/Dashboard/SubCategories"; // ←
import TicketsTable from "../components/layout/Dashboard/Tickets"; // ← Add this
import SendNotification from "../components/layout/Dashboard/SendNotifications";
import LiveStatus from "../components/layout/Dashboard/LiveStatus";
import Banners from "../components/layout/Dashboard/Banners";
import FAQ from "../components/layout/Dashboard/Faq";
import WebBanners from "../components/layout/Dashboard/WebBanners";
import Pages from "../components/layout/Dashboard/Pages";
import Services from "../components/layout/Dashboard/Services";
import ChooseUs from "../components/layout/Dashboard/ChooseUs";
import Enquiries from "../components/layout/Dashboard/Enquiries";
import FooterCertificates from "../components/layout/Dashboard/FooterCertificates.js";
import DevFeedback from "../components/layout/Dashboard/DevFeedback";
import AddNewRestaurant from "../components/layout/Dashboard/Restaurant/AddRestaurants.js";
import ExportRestaurantsModal from "../components/layout/Dashboard/Restaurant/ExportRestaurantsModal.js";
import PressRelease from "../components/layout/Dashboard/PressRelease.js";

// Routes mein add karein


// Routes mein add karein




// Routes mein add karein


// Routes mein add karein



const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const t = isDark
    ? { bg: "#0c1018", pageBg: "#0c1018", text: "#94a3b8" }
    : { bg: "#f1f5f9", pageBg: "#f1f5f9", text: "#64748b" };

  const styles = {
    appContainer: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      backgroundColor: t.bg,
    },
    mainContent: {
      flex: 1,
      overflowY: "auto",
      backgroundColor: t.pageBg,
      position: "relative",
    },
    themeToggle: {
      position: "fixed",
      top: "18px",
      right: "24px",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: isDark ? "#141824" : "#ffffff",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
      borderRadius: "10px",
      padding: "7px 12px",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
    },
    toggleIcon: {
      fontSize: "13px",
      color: isDark ? "#fbbf24" : "#6366f1",
    },
    toggleLabel: {
      fontSize: "12px",
      fontWeight: "500",
      color: t.text,
    },
    placeholderPage: {
      padding: "40px",
      color: t.text,
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.appContainer}>
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      <main style={styles.mainContent}>
        {/* Theme Toggle Button */}
        {/* <div
          style={styles.themeToggle}
          onClick={() => setIsDark(!isDark)}
          title="Toggle theme"
        >
          <span style={styles.toggleIcon}>
            {isDark ? "☀️" : "🌙"}
          </span>
          <span style={styles.toggleLabel}>{isDark ? "Light" : "Dark"}</span>
        </div> */}

        <Routes>
          <Route path="/" element={<DashboardHome isDark={isDark} />} />
          <Route path="/analytics" element={<div style={styles.placeholderPage}>Analytics Page</div>} />
          <Route path="/users" element={<div style={styles.placeholderPage}>Users Page</div>} />
          <Route path="/settings" element={<div style={styles.placeholderPage}>Settings Page</div>} />
          <Route path="/reports" element={<div style={styles.placeholderPage}>Reports Page</div>} />
          <Route path="/messages" element={<div style={styles.placeholderPage}>Messages Page</div>} />
          <Route path="/Drivers" element={<DriverTable isDark={isDark} />} />
          <Route path="/Restaurant" element={<RestaurantTable isDark={isDark} />} />
          <Route path="/Userstable" element={<UsersTable isDark={isDark} />} />
          <Route path="/orders" element={<OrderTable isDark={isDark} />} />
          <Route path="/maincategories" element={<MainCategoryTable isDark={isDark} />} />
          <Route path="/categories" element={<CategoriesTable isDark={isDark} />} /> ← Add this
          <Route path="/SubCategories" element={<SubCategoriesTable isDark={isDark} />} /> ← Add this
          <Route path="/tickets" element={<TicketsTable isDark={isDark} />} />
          <Route path="/livestatus" element={<LiveStatus isDark={isDark} />} />
          <Route path="/sendnotifications" element={<SendNotification isDark={isDark} />} />
          <Route path="/banners" element={<Banners isDark={isDark} />} />
          <Route path="/faq" element={<FAQ isDark={isDark} />} />
          <Route path="/WebBanners" element={<WebBanners isDark={isDark} />} />
          <Route path="/pages" element={<Pages isDark={isDark} />} />
          <Route path="/servicesA" element={<Services isDark={isDark} />} />
          <Route path="/ChooseUs" element={<ChooseUs isDark={isDark} />} />
          <Route path="/enquiries" element={<Enquiries isDark={isDark} />} />
          <Route path="/footercertificates" element={<FooterCertificates isDark={isDark} />} />
          <Route path="/devfeedback" element={<DevFeedback isDark={isDark} />} />
          <Route path="/addrestaurant" element={<AddNewRestaurant isDark={isDark} />} />
          <Route path="/ExportRestaurantsModal" element={<ExportRestaurantsModal isDark={isDark} />} />
          
          <Route path="/PressRelease" element={<PressRelease isDark={isDark} />} />
          
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;