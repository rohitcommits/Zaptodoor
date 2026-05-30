import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const EditIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>);
const MenuIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="2" rx="1"/><rect x="3" y="11" width="18" height="2" rx="1"/><rect x="3" y="18" width="18" height="2" rx="1"/></svg>);
const ClockIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const LocationIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const PhoneIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const EmailIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>);
// const StarIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const StatusBadge = ({ status, isDark }) => {
  const config = {
    Active:   { bg: "rgba(20,184,166,0.15)", color: "#14b8a6" },
    Inactive: { bg: "rgba(148,163,184,0.12)", color: "#94a3b8" },
  };
  const c = config[status] || config.Inactive;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "12px", fontSize: "11px",
      fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const ReadyBadge = ({ ready, isDark }) => {
  const config = {
    Yes: { bg: "rgba(20,184,166,0.15)", color: "#14b8a6" },
    No:  { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  };
  const c = config[ready] || config.No;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "12px", fontSize: "11px",
      fontWeight: 600, background: c.bg, color: c.color,
    }}>{ready}</span>
  );
};

const OnOffBadge = ({ value, isDark }) => {
  const config = {
    ON:  { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
    OFF: { bg: "rgba(148,163,184,0.12)", color: "#94a3b8" },
  };
  const c = config[value] || config.OFF;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "12px", fontSize: "11px",
      fontWeight: 700, background: c.bg, color: c.color,
    }}>{value}</span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const RestaurantDetailPage = ({ 
  restaurant, 
  onBack, 
  onEdit, 
  onDelete, 
  onViewSchedule, 
  onViewMenu,
  isDark 
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Handle View Menu click - Navigate to Menus page with restaurant data
  const handleViewMenuClick = () => {
    navigate("/Dashboard/Menus", { 
      state: { 
        restaurant: restaurant,
        fromDetail: true
      } 
    });
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: isDark ? "#0d1117" : "#f8fafc",
      fontFamily: "'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "16px",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      padding: "8px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      color: isDark ? "#e2e8f0" : "#1e293b",
      fontSize: "13px",
    },
    title: {
      fontSize: "24px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
    },
    actionButtons: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    actionBtn: (color) => ({
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      background: color,
      color: "#fff",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    tabs: {
      display: "flex",
      gap: "4px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    tab: (isActive) => ({
      padding: "10px 20px",
      background: isActive ? (isDark ? "#1e3a8a" : "#3b82f6") : "none",
      border: "none",
      borderRadius: "8px 8px 0 0",
      cursor: "pointer",
      color: isActive ? "#fff" : (isDark ? "#94a3b8" : "#64748b"),
      fontWeight: isActive ? 600 : 400,
      fontSize: "13px",
    }),
    card: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "20px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    infoItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px",
      background: isDark ? "#0f1520" : "#f8fafc",
      borderRadius: "10px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      marginBottom: "20px",
    },
    statCard: {
      background: isDark ? "#0f1520" : "#f8fafc",
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
    },
    menuItem: {
      background: isDark ? "#0f1520" : "#f8fafc",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    scheduleItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px",
      color: "#64748b",
      fontSize: "13px",
    },
  };

  const renderMenuItems = () => {
    if (!restaurant.menu || restaurant.menu.length === 0) {
      return <div style={styles.emptyState}>No menu items available</div>;
    }
    return restaurant.menu.map((item) => (
      <div key={item.id} style={styles.menuItem}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>{item.name}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>{item.description}</div>
          <div style={{ fontSize: "10px", display: "inline-block", padding: "2px 8px", borderRadius: "10px", background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>{item.category}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#3b82f6" }}>₹{item.price}</div>
          <span style={{ fontSize: "10px", color: item.isAvailable ? "#10b981" : "#ef4444" }}>{item.isAvailable ? "Available" : "Out of Stock"}</span>
        </div>
      </div>
    ));
  };

  const renderSchedule = () => {
    if (!restaurant.schedule || restaurant.schedule.length === 0) {
      return <div style={styles.emptyState}>No schedule available</div>;
    }
    return restaurant.schedule.map((item, idx) => (
      <div key={idx} style={styles.scheduleItem}>
        <span style={{ fontWeight: 500 }}>{item.day}</span>
        {item.isClosed ? (
          <span style={{ color: "#ef4444", fontWeight: 500 }}>Closed</span>
        ) : (
          <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>{item.openTime} - {item.closeTime}</span>
        )}
      </div>
    ));
  };

  const renderPayments = () => {
    const totalPayments = restaurant.totalPayments || 0;
    const completedPayments = restaurant.completedPayments || 0;
    const pendingPayments = restaurant.pendingPayments || 0;
    const platformFee = Math.round(totalPayments * 0.1);

    return (
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#3b82f6" }}>₹{totalPayments.toLocaleString()}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Total Revenue</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#10b981" }}>₹{completedPayments.toLocaleString()}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Completed</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#f59e0b" }}>₹{pendingPayments.toLocaleString()}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#8b5cf6" }}>₹{platformFee.toLocaleString()}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Platform Fee (10%)</div>
        </div>
      </div>
    );
  };

  if (!restaurant) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Restaurants
        </button>
        <div>
          <h1 style={styles.title}>{restaurant.name}</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>ID: {restaurant.restroId || "N/A"}</p>
        </div>
        <div style={styles.actionButtons}>
          <button style={styles.actionBtn("#4a6cf7")} onClick={handleViewMenuClick}>
            <MenuIcon /> View Menu
          </button>
          <button style={styles.actionBtn("#f59e0b")} onClick={() => onEdit(restaurant)}>
            <EditIcon /> Edit
          </button>
          <button style={styles.actionBtn("#3b82f6")} onClick={() => onViewSchedule(restaurant)}>
            <ClockIcon /> Set Timings
          </button>
          <button style={styles.actionBtn("#ef4444")} onClick={() => onDelete(restaurant)}>
            <TrashIcon /> Delete
          </button>
        </div>
      </div>

      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === "overview")} onClick={() => setActiveTab("overview")}>Overview</button>
        <button style={styles.tab(activeTab === "menu")} onClick={() => setActiveTab("menu")}>Menu</button>
        <button style={styles.tab(activeTab === "schedule")} onClick={() => setActiveTab("schedule")}>Schedule</button>
        <button style={styles.tab(activeTab === "payments")} onClick={() => setActiveTab("payments")}>Payments</button>
        <button style={styles.tab(activeTab === "reviews")} onClick={() => setActiveTab("reviews")}>Reviews</button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#3b82f6" }}>⭐ {restaurant.rating || 0}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Average Rating</div>
              <div style={{ fontSize: "10px", marginTop: "4px" }}>{restaurant.totalRatings || 0} ratings</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#10b981" }}>₹{(restaurant.totalPayments || 0).toLocaleString()}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Total Revenue</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#f59e0b" }}>₹{(restaurant.pendingPayments || 0).toLocaleString()}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Pending Payment</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#8b5cf6" }}>{restaurant.menu?.length || 0}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Menu Items</div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Restaurant Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}><LocationIcon /><div><div style={{ fontSize: "11px", color: "#64748b" }}>Address</div><div style={{ fontSize: "13px" }}>{restaurant.address || "Not specified"}</div></div></div>
              <div style={styles.infoItem}><PhoneIcon /><div><div style={{ fontSize: "11px", color: "#64748b" }}>Contact</div><div style={{ fontSize: "13px" }}>{restaurant.contact || "Not specified"}</div></div></div>
              <div style={styles.infoItem}><EmailIcon /><div><div style={{ fontSize: "11px", color: "#64748b" }}>Email</div><div style={{ fontSize: "13px" }}>{restaurant.email || "Not specified"}</div></div></div>
              <div style={styles.infoItem}><ClockIcon /><div><div style={{ fontSize: "11px", color: "#64748b" }}>Business Hours</div><div style={{ fontSize: "13px" }}>{restaurant.shiftStart || "-"} - {restaurant.shiftEnd || "-"}</div></div></div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>About Restaurant</h3>
            <p style={{ fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{restaurant.description || "No description available"}</p>
            <div style={{ marginTop: "12px" }}>
              <span style={{ fontSize: "11px", color: "#64748b" }}>Cuisine: </span>
              <span style={{ fontSize: "12px", fontWeight: 500 }}>{restaurant.cuisine || "Multi-cuisine"}</span>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Status Information</h3>
            <div style={styles.infoGrid}>
              <div><span style={{ fontSize: "11px", color: "#64748b" }}>Status</span><div><StatusBadge status={restaurant.status || "Inactive"} isDark={isDark} /></div></div>
              <div><span style={{ fontSize: "11px", color: "#64748b" }}>Ready for Orders</span><div><ReadyBadge ready={restaurant.ready || "No"} isDark={isDark} /></div></div>
              <div><span style={{ fontSize: "11px", color: "#64748b" }}>Store Status</span><div><OnOffBadge value={restaurant.onOff || "OFF"} isDark={isDark} /></div></div>
            </div>
          </div>
        </>
      )}

      {/* Menu Tab */}
      {activeTab === "menu" && (
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>🍽️ Menu Items</h3>
          {renderMenuItems()}
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === "schedule" && (
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>🕐 Business Schedule</h3>
          {renderSchedule()}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>💰 Payment Summary</h3>
          {renderPayments()}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>⭐ Customer Reviews</h3>
          <div style={styles.emptyState}>
            {restaurant.totalReviews || 0} total reviews • Average rating {restaurant.rating || 0} ★
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;