// Dashboard.js
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Dashboard/Sidebar";
import DashboardHome from "../components/layout/Dashboard/DashboardHome";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (itemName, path) => {
    setActiveItem(itemName);
    navigate(`/dashboard/${path}`);
  };

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
        onMenuClick={handleMenuClick}
        isDark={isDark}
      />

      <main style={styles.mainContent}>
        {/* Theme toggle */}
        <div
          style={styles.themeToggle}
          onClick={() => setIsDark(!isDark)}
          title="Toggle theme"
        >
          <i
            className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}
            style={styles.toggleIcon}
          />
          <span style={styles.toggleLabel}>{isDark ? "Light" : "Dark"}</span>
        </div>

        <Routes>
          <Route path="/"          element={<DashboardHome isDark={isDark} />} />
          <Route path="/dashboard" element={<DashboardHome isDark={isDark} />} />
          <Route path="/analytics" element={<div style={styles.placeholderPage}>Analytics</div>} />
          <Route path="/users"     element={<div style={styles.placeholderPage}>Users</div>} />
          <Route path="/settings"  element={<div style={styles.placeholderPage}>Settings</div>} />
          <Route path="/reports"   element={<div style={styles.placeholderPage}>Reports</div>} />
          <Route path="/messages"  element={<div style={styles.placeholderPage}>Messages</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;