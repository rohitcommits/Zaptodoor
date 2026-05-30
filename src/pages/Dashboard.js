import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Dashboard/Sidebar";
// import { useNavigate } from "react-router-dom";



import DashboardHome from "../components/layout/Dashboard/DashboardHome";
import DriverTable from "../components/layout/Dashboard/Driver";
import RestaurantTable from "../components/layout/Dashboard/Restaurant/Restaurant";
import UsersTable from "../components/layout/Dashboard/Users";
import OrderTable from "../components/layout/Dashboard/Orders";
import MainCategoryTable from "../components/layout/Dashboard/MainCategory";
import CategoriesTable from "../components/layout/Dashboard/Categories";
import SubCategoriesTable from "../components/layout/Dashboard/SubCategories";
import TicketsTable from "../components/layout/Dashboard/Tickets";
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
import PaymentSettings from "../components/layout/Dashboard/Restaurant/Payments.js";
import CouponsPage from "../components/layout/Dashboard/CouponsPage.js";
import SupportSystem from "../components/layout/Dashboard/Support.js";
import  Admin from "../components/layout/Dashboard/Admin.js"
import Website from "../components/layout/Dashboard/Website.js";
import NotificationSystem from "../components/layout/Dashboard/Notification .js";
import Reports from "../components/layout/Dashboard/Reports.js";
 import MenuExample from "../components/layout/Dashboard/Menu.js";
 import RatingReview from "../components/layout/Dashboard/RatingReview.js";
 import AppSettings from "../components/layout/Dashboard/AppSettings.js";
 import Locations from "../components/layout/Dashboard/Locations.js";
 import AddNewDriver from "../components/layout/Dashboard/Rider/AddNewRider.js";
 import Admine from "../components/layout/Dashboard/Menu/showmenubyrestrunt.js";







const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

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
      position: "relative",
    },
    mainContent: {
      flex: 1,
      overflowY: "auto",
      backgroundColor: t.pageBg,
      position: "relative",
      // Add padding top on mobile to prevent content from going under the menu button
      paddingTop: isMobile ? "56px" : "0",
    },
    mobileMenuToggle: {
      position: "fixed",
      top: "12px",
      left: "12px",
      zIndex: 1000,
      background: isDark ? "#141824" : "#ffffff",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
      borderRadius: "10px",
      padding: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1)",
      transition: "all 0.2s ease",
    },
    placeholderPage: {
      padding: "40px",
      color: t.text,
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.appContainer}>
      {/* Mobile Menu Toggle - Fixed position, won't affect content flow */}
      {isMobile && (
        <div
          style={styles.mobileMenuToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      )}

      {/* Sidebar with mobile responsiveness */}
      <div style={{
        position: isMobile ? "fixed" : "relative",
        top: 0,
        left: 0,
        height: "100vh",
        transform: isMobile && !isMobileMenuOpen ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 999,
        boxShadow: isMobile && isMobileMenuOpen ? (isDark ? "0 0 20px rgba(0,0,0,0.5)" : "0 0 20px rgba(0,0,0,0.15)") : "none",
      }}>
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          isDark={isDark}
          setIsDark={setIsDark}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 998,
            animation: "fadeIn 0.2s ease",
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<DashboardHome isDark={isDark} />} />
          <Route path="/analytics" element={<div style={styles.placeholderPage}>Analytics Page</div>} />
          <Route path="/users" element={<UsersTable   isDark={isDark} />}/>
          <Route path="/settings" element={<div style={styles.placeholderPage}>Settings Page</div>} />
          <Route path="/reports" element={<div style={styles.placeholderPage}>Reports Page</div>} />
          <Route path="/messages" element={<div style={styles.placeholderPage}>Messages Page</div>} />
          <Route path="/Drivers" element={<DriverTable isDark={isDark} />} />
          <Route path="/Restaurant" element={<RestaurantTable isDark={isDark} />} />
          <Route path="/Userstable" element={<UsersTable isDark={isDark} />} />
          <Route path="/orders" element={<OrderTable isDark={isDark} />} />
          <Route path="/maincategories" element={<MainCategoryTable isDark={isDark} />} />
          <Route path="/categories" element={<CategoriesTable isDark={isDark} />} />
          <Route path="/SubCategories" element={<SubCategoriesTable isDark={isDark} />} />
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
          <Route path="/Payment" element={<PaymentSettings isDark={isDark} />} />
          <Route path="/Coupons" element={<CouponsPage isDark={isDark} />} />
          <Route path="/Support" element={<SupportSystem isDark={isDark} />} />
          <Route path="/Admin" element={<Admin isDark={isDark} />} />
          <Route path="/Website" element={<Website isDark={isDark} />} />
          <Route path="/Notification" element={<NotificationSystem isDark={isDark} />} />
          <Route path="/Reports" element={<Reports isDark={isDark} />} />
          <Route path="/RatingReview" element={<RatingReview isDark={isDark} />} />
          <Route path="/Menu" element={<MenuExample isDark={isDark} />} />
          <Route path="/AppSettings" element={<AppSettings isDark={isDark} />} />
          <Route path="/Locations" element={<Locations isDark={isDark} />} />
          <Route path="/AddNewDriver" element={<AddNewDriver isDark={isDark} />} />
          <Route path="/menus" element={<Admine isDark={isDark} />} />
        </Routes>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;