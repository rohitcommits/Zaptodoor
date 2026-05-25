import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const DriverIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M5 20v-2a7 7 0 0 1 14 0v2" />
  </svg>
);

const RestaurantIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <circle cx="12" cy="4" r="1.5" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const OnlineIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoDrivers = [
  {
    id: 1,
    name: "akhilesh kumar ahirwar",
    phone: "+916263683580",
    location: "",
    status: "Online",
    lat: null,
    lng: null,
  },
  {
    id: 2,
    name: "Shiva Rajput",
    phone: "+911111111111",
    location: "26.2293113, 78.1840931",
    status: "Online",
    lat: 26.2293113,
    lng: 78.1840931,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const LiveStatus = ({ isDark = true }) => {
  const [drivers] = useState(demoDrivers); // Using drivers, no setter needed
  const [refreshing, setRefreshing] = useState(false);

  const stats = {
    driversOnline: drivers.filter(d => d.status === "Online").length,
    restaurantsOpen: 0,
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const styles = {
    container: {
      background: "transparent",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: "20px 24px",
      maxWidth: "500px",
    },
    // Header Stats
    statsRow: {
      display: "flex",
      gap: "16px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    statCard: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flex: 1,
    },
    statIcon: {
      width: "36px",
      height: "36px",
      borderRadius: "10px",
      background: isDark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#3b82f6",
    },
    statInfo: {
      flex: 1,
    },
    statTitle: {
      fontSize: "11px",
      fontWeight: 500,
      color: isDark ? "#64748b" : "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    statCount: {
      fontSize: "20px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    // Refresh Button
    refreshBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 20px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 500,
      color: isDark ? "#94a3b8" : "#64748b",
      cursor: "pointer",
      marginBottom: "24px",
      transition: "all 0.2s",
    },
    // Drivers List
    driversList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    driverCard: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "16px",
      transition: "all 0.2s",
    },
    driverHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    driverName: {
      fontSize: "15px",
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    driverStatus: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "11px",
      fontWeight: 600,
      color: "#22c55e",
      background: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)",
      padding: "3px 10px",
      borderRadius: "20px",
    },
    driverPhone: {
      fontSize: "12px",
      color: isDark ? "#64748b" : "#94a3b8",
      marginBottom: "6px",
    },
    driverLocation: {
      fontSize: "11px",
      color: isDark ? "#4a5568" : "#cbd5e1",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontFamily: "monospace",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px",
      color: isDark ? "#64748b" : "#94a3b8",
      fontSize: "13px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Stats Row */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <DriverIcon />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statTitle}>Drivers Online</div>
            <div style={styles.statCount}>{stats.driversOnline}</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <RestaurantIcon />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statTitle}>Restaurants Open</div>
            <div style={styles.statCount}>{stats.restaurantsOpen}</div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <button style={styles.refreshBtn} onClick={handleRefresh} disabled={refreshing}>
        <RefreshIcon />
        <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
      </button>

      {/* Drivers List */}
      <div style={styles.driversList}>
        {drivers.map((driver) => (
          <div key={driver.id} style={styles.driverCard}>
            <div style={styles.driverHeader}>
              <span style={styles.driverName}>{driver.name}</span>
              <span style={styles.driverStatus}>
                <OnlineIcon /> {driver.status}
              </span>
            </div>
            <div style={styles.driverPhone}>{driver.phone}</div>
            {driver.location && (
              <div style={styles.driverLocation}>
                <LocationIcon /> {driver.location}
              </div>
            )}
          </div>
        ))}
        {drivers.length === 0 && (
          <div style={styles.emptyState}>
            No drivers online at the moment
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStatus;