// Sidebar.js
import React, { useState } from "react";

const Sidebar = ({ activeItem, setActiveItem, isSidebarCollapsed, setIsSidebarCollapsed, onMenuClick, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");

  const menuItems = [
    { name: "Dashboard", icon: "fas fa-tachometer-alt", path: "" },
    { name: "Analytics",  icon: "fas fa-chart-line",    path: "analytics" },
    { name: "Users",      icon: "fas fa-users",          path: "users" },
    { name: "Settings",   icon: "fas fa-cog",            path: "settings" },
    { name: "Reports",    icon: "fas fa-file-alt",       path: "reports" },
    { name: "Messages",   icon: "fas fa-envelope",       path: "messages" },
  ];

  // ── Theme tokens ────────────────────────────────────────────────────────────
  const t = isDark
    ? {
        bg:           "#0f1420",
        border:       "rgba(255,255,255,0.06)",
        logoIconBg:   "#1e2740",
        logoIconBorder: "rgba(99,102,241,0.35)",
        logoIconColor: "#818cf8",
        logoText:     "#f1f5f9",
        collapseBtnBg:"rgba(255,255,255,0.06)",
        collapseBtnHover:"rgba(255,255,255,0.12)",
        collapseBtnColor:"#94a3b8",
        navHover:     "rgba(255,255,255,0.05)",
        navActive:    "rgba(99,102,241,0.15)",
        navActiveText:"#818cf8",
        navText:      "#64748b",
        navTextActive:"#818cf8",
        navIconColor: "#475569",
        navIconActive:"#818cf8",
        indicator:    "#6366f1",
        tooltipBg:    "#1e2740",
        tooltipText:  "#f1f5f9",
        tooltipBorder:"rgba(99,102,241,0.25)",
        userBorder:   "rgba(255,255,255,0.06)",
        userNameColor:"#e2e8f0",
        userRoleColor:"#475569",
        logoutColor:  "#475569",
        logoutHover:  "#94a3b8",
      }
    : {
        bg:           "#ffffff",
        border:       "rgba(0,0,0,0.07)",
        logoIconBg:   "#eef2ff",
        logoIconBorder:"rgba(99,102,241,0.2)",
        logoIconColor:"#6366f1",
        logoText:     "#1e293b",
        collapseBtnBg:"rgba(0,0,0,0.04)",
        collapseBtnHover:"rgba(0,0,0,0.08)",
        collapseBtnColor:"#64748b",
        navHover:     "rgba(0,0,0,0.04)",
        navActive:    "rgba(99,102,241,0.1)",
        navActiveText:"#6366f1",
        navText:      "#64748b",
        navTextActive:"#6366f1",
        navIconColor: "#94a3b8",
        navIconActive:"#6366f1",
        indicator:    "#6366f1",
        tooltipBg:    "#1e293b",
        tooltipText:  "#f8fafc",
        tooltipBorder:"transparent",
        userBorder:   "rgba(0,0,0,0.07)",
        userNameColor:"#1e293b",
        userRoleColor:"#94a3b8",
        logoutColor:  "#94a3b8",
        logoutHover:  "#64748b",
      };

  const styles = {
    sidebar: {
      width: isSidebarCollapsed ? "72px" : "260px",
      backgroundColor: t.bg,
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      borderRight: `1px solid ${t.border}`,
      position: "relative",
      height: "100vh",
      overflow: "hidden",
      flexShrink: 0,
    },
    logoContainer: {
      padding: isSidebarCollapsed ? "22px 0" : "22px 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: isSidebarCollapsed ? "center" : "space-between",
      borderBottom: `1px solid ${t.border}`,
      marginBottom: "8px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      cursor: "pointer",
      minWidth: 0,
    },
    logoIcon: {
      width: "36px",
      height: "36px",
      background: t.logoIconBg,
      border: `1px solid ${t.logoIconBorder}`,
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      color: t.logoIconColor,
      flexShrink: 0,
    },
    logoText: {
      fontSize: "16px",
      fontWeight: "600",
      letterSpacing: "-0.01em",
      color: t.logoText,
      display: isSidebarCollapsed ? "none" : "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    collapseBtn: {
      background: t.collapseBtnBg,
      border: `1px solid ${t.border}`,
      color: t.collapseBtnColor,
      cursor: "pointer",
      fontSize: "12px",
      display: "flex",
      padding: "6px 8px",
      borderRadius: "8px",
      transition: "all 0.2s",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    sectionLabel: {
      fontSize: "10px",
      fontWeight: "600",
      color: isDark ? "#334155" : "#c1c9d6",
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      padding: isSidebarCollapsed ? "16px 0 8px" : "16px 20px 8px",
      textAlign: isSidebarCollapsed ? "center" : "left",
      display: isSidebarCollapsed ? "none" : "block",
    },
    navMenu: {
      flex: 1,
      padding: "0 10px",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      overflowY: "auto",
      overflowX: "hidden",
    },
    navItem: (isActive) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: isSidebarCollapsed ? "11px 0" : "10px 12px",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.15s ease",
      position: "relative",
      justifyContent: isSidebarCollapsed ? "center" : "flex-start",
      backgroundColor: isActive ? t.navActive : "transparent",
    }),
    navIcon: (isActive) => ({
      fontSize: "15px",
      minWidth: "20px",
      textAlign: "center",
      color: isActive ? t.navIconActive : t.navIconColor,
      transition: "color 0.15s",
    }),
    navText: (isActive) => ({
      fontSize: "13.5px",
      fontWeight: isActive ? "500" : "400",
      display: isSidebarCollapsed ? "none" : "block",
      whiteSpace: "nowrap",
      color: isActive ? t.navTextActive : t.navText,
      transition: "color 0.15s",
    }),
    activeIndicator: {
      position: "absolute",
      left: "0",
      width: "3px",
      height: "60%",
      backgroundColor: t.indicator,
      borderRadius: "0 3px 3px 0",
    },
    tooltip: {
      position: "fixed",
      backgroundColor: t.tooltipBg,
      color: t.tooltipText,
      border: `1px solid ${t.tooltipBorder}`,
      padding: "5px 11px",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: "500",
      whiteSpace: "nowrap",
      zIndex: 1000,
      pointerEvents: "none",
      boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
      left: "82px",
    },
    userSection: {
      padding: isSidebarCollapsed ? "16px 0" : "16px 14px",
      borderTop: `1px solid ${t.userBorder}`,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: isSidebarCollapsed ? "center" : "flex-start",
    },
    userAvatar: {
      width: "36px",
      height: "36px",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "13px",
      color: "#ffffff",
      cursor: "pointer",
      flexShrink: 0,
      letterSpacing: "0.02em",
    },
    userInfo: {
      display: isSidebarCollapsed ? "none" : "flex",
      flexDirection: "column",
      gap: "1px",
      overflow: "hidden",
      flex: 1,
    },
    userName: {
      fontSize: "13px",
      fontWeight: "500",
      color: t.userNameColor,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    userRole: {
      fontSize: "11px",
      color: t.userRoleColor,
      letterSpacing: "0.02em",
    },
    logoutRow: {
      display: isSidebarCollapsed ? "none" : "flex",
      alignItems: "center",
      gap: "6px",
      marginTop: "8px",
      cursor: "pointer",
      fontSize: "12px",
      color: t.logoutColor,
      transition: "color 0.2s",
      paddingLeft: "2px",
    },
  };

  const handleNavClick = (item) => {
    setActiveItem(item.name);
    onMenuClick(item.name, item.path);
  };

  const handleMouseEnter = (itemName, event) => {
    if (isSidebarCollapsed) {
      setIsHovered(true);
      setHoveredItem(itemName);
      const rect = event.currentTarget.getBoundingClientRect();
      const tooltip = document.getElementById("sb-tooltip");
      if (tooltip) {
        tooltip.style.top = `${rect.top + rect.height / 2 - 14}px`;
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredItem("");
  };

  return (
    <div style={styles.sidebar}>
      {/* Tooltip (collapsed mode) */}
      {isSidebarCollapsed && isHovered && (
        <div id="sb-tooltip" style={styles.tooltip}>{hoveredItem}</div>
      )}

      {/* Logo */}
      <div style={styles.logoContainer}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <i className="fas fa-bolt" />
          </div>
          <span style={styles.logoText}>AdminKit</span>
        </div>
        <button
          style={styles.collapseBtn}
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onMouseEnter={e => (e.currentTarget.style.background = t.collapseBtnHover)}
          onMouseLeave={e => (e.currentTarget.style.background = t.collapseBtnBg)}
          title={isSidebarCollapsed ? "Expand" : "Collapse"}
        >
          <i className={`fas ${isSidebarCollapsed ? "fa-angle-right" : "fa-angle-left"}`} />
        </button>
      </div>

      {/* Nav */}
      <nav style={styles.navMenu}>
        <span style={styles.sectionLabel}>Main menu</span>
        {menuItems.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <div
              key={item.name}
              style={styles.navItem(isActive)}
              onClick={() => handleNavClick(item)}
              onMouseEnter={(e) => {
                handleMouseEnter(item.name, e);
                if (!isActive) e.currentTarget.style.backgroundColor = t.navHover;
              }}
              onMouseLeave={(e) => {
                handleMouseLeave();
                e.currentTarget.style.backgroundColor = isActive ? t.navActive : "transparent";
              }}
            >
              {isActive && <div style={styles.activeIndicator} />}
              <i className={item.icon} style={styles.navIcon(isActive)} />
              <span style={styles.navText(isActive)}>{item.name}</span>
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div style={styles.userSection}>
        <div style={styles.userAvatar}>JD</div>
        <div style={styles.userInfo}>
          <span style={styles.userName}>John Doe</span>
          <span style={styles.userRole}>Administrator</span>
          <div
            style={styles.logoutRow}
            onMouseEnter={e => (e.currentTarget.style.color = t.logoutHover)}
            onMouseLeave={e => (e.currentTarget.style.color = t.logoutColor)}
          >
            <i className="fas fa-sign-out-alt" />
            <span>Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;