import React, { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA (Same as before)
// ─────────────────────────────────────────────────────────────────────────────
const demoOrders = [
  { id: 84, orderId: "#553", status: "Active", date: "2026-05-23 15:04:58", restaurant: "Neeraj Verma", user: "Neeraj Verma", payStatus: "paid", payMethod: "COD", restroStatus: "completed", driverStatus: "delivered", userStatus: "delivered", amount: "275" },
  { id: 83, orderId: "#552", status: "Active", date: "2026-05-20 22:49:31", restaurant: "Pandit's Rolls and Momos", user: "mehul", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "cancelled", userStatus: "cancelled", amount: "242" },
  { id: 82, orderId: "#551", status: "Active", date: "2026-05-20 16:04:35", restaurant: "Neeraj Verma", user: "Yash", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "cancelled", userStatus: "cancelled", amount: "337" },
  { id: 81, orderId: "#550", status: "Active", date: "2026-05-20 16:02:18", restaurant: "Neeraj Verma", user: "Yash", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "cancelled", userStatus: "cancelled", amount: "260" },
  { id: 80, orderId: "#549", status: "Active", date: "2026-05-20 15:53:24", restaurant: "Neeraj Verma", user: "Yash", payStatus: "pending", payMethod: "COD", restroStatus: "cancelled", driverStatus: "cancelled", userStatus: "cancelled", amount: "285" },
  { id: 79, orderId: "#548", status: "Active", date: "2026-05-20 15:39:57", restaurant: "Neeraj Verma", user: "Neeraj Verma", payStatus: "pending", payMethod: "COD", restroStatus: "cancelled", driverStatus: "cancelled", userStatus: "cancelled", amount: "262" },
  { id: 78, orderId: "#547", status: "Active", date: "2026-05-20 15:35:33", restaurant: "Neeraj Verma", user: "Neeraj Verma", payStatus: "pending", payMethod: "COD", restroStatus: "cancelled", driverStatus: "cancelled", userStatus: "cancelled", amount: "262" },
  { id: 77, orderId: "#546", status: "Active", date: "2026-05-16 11:26:40", restaurant: "Shan E Punjab", user: "Neeraj Verma", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "cancelled", userStatus: "cancelled", amount: "239" },
  { id: 76, orderId: "#545", status: "Active", date: "2026-05-12 13:05:40", restaurant: "Happiness Fast Food Restaurant", user: "MANGLAM", payStatus: "paid", payMethod: "COD", restroStatus: "completed", driverStatus: "delivered", userStatus: "delivered", amount: "254" },
  { id: 75, orderId: "#544", status: "Active", date: "2026-05-09 13:11:40", restaurant: "MM Chaap DD Nagar", user: "ramsharma", payStatus: "pending", payMethod: "COD", restroStatus: "cancelled", driverStatus: "cancelled", userStatus: "cancelled", amount: "310" }
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status, isDark }) => {
  const getConfig = () => {
    switch(status) {
      case "Active": return { bg: isDark ? "rgba(20,184,166,0.15)" : "rgba(20,184,166,0.1)", color: "#14b8a6" };
      case "Delivered": return { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" };
      case "Cancelled": return { bg: isDark ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.1)", color: "#ef4444" };
      case "Placed": return { bg: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)", color: "#3b82f6" };
      case "Preparing": return { bg: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)", color: "#f59e0b" };
      case "Ready": return { bg: isDark ? "rgba(168,85,247,0.15)" : "rgba(168,85,247,0.1)", color: "#a855f7" };
      case "On the Way": return { bg: isDark ? "rgba(236,72,153,0.15)" : "rgba(236,72,153,0.1)", color: "#ec4899" };
      default: return { bg: isDark ? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.08)", color: "#94a3b8" };
    }
  };
  const c = getConfig();
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const PayStatusBadge = ({ status, isDark }) => {
  const config = {
    paid: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
    pending: { bg: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)", color: "#f59e0b" },
  };
  const c = config[status] || config.pending;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const Checkbox = ({ checked, onChange, isDark }) => (
  <div onClick={onChange} style={{
    width: "16px", height: "16px", borderRadius: "4px",
    border: checked ? "2px solid #3b82f6" : isDark ? "2px solid #3a4460" : "2px solid #cbd5e1",
    background: checked ? "#3b82f6" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.15s ease",
  }}>
    {checked && (
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT - Fixed with Better Visibility
// ─────────────────────────────────────────────────────────────────────────────
const OrderTable = ({ isDark = true }) => {
  const [orders] = useState(demoOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const itemsPerPage = 10;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(search.toLowerCase()) ||
      order.user.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "All" || order.payMethod === paymentFilter;
    
    let matchesPeriod = true;
    if (periodFilter !== "All") {
      const orderDate = new Date(order.date);
      const today = new Date();
      
      if (periodFilter === "Today") {
        matchesPeriod = orderDate.toDateString() === today.toDateString();
      } else if (periodFilter === "This Week") {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        matchesPeriod = orderDate >= weekAgo;
      } else if (periodFilter === "This Month") {
        matchesPeriod = orderDate.getMonth() === today.getMonth() && 
                        orderDate.getFullYear() === today.getFullYear();
      }
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesPeriod;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Selection handlers
  const toggleAll = () => {
    if (selected.size === paginatedOrders.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginatedOrders.map(o => o.id)));
    }
  };
  const toggleOne = (id) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
  };

  const getContainerPadding = () => {
    if (isMobile) return "12px";
    if (isTablet) return "16px 20px";
    return "20px 24px";
  };

  const getSearchWidth = () => {
    if (isMobile) return "100%";
    if (isTablet) return "280px";
    return "350px";
  };

  const getTableMinWidth = () => {
    // Thoda chota kiya hai taaki mobile pe better dikhe
    if (isMobile) return "900px";
    return "1200px";
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: isDark ? "#0d1117" : "#f8fafc",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: getContainerPadding(),
    },
    contentWrapper: {
      maxWidth: "1600px",
      margin: "0 auto",
      width: "100%",
    },
    header: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "stretch" : "center",
      marginBottom: "20px",
      gap: isMobile ? "16px" : "20px",
    },
    titleSection: {
      flex: isMobile ? "auto" : 1,
    },
    title: {
      fontSize: isMobile ? "20px" : "22px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#0f172a",
      margin: 0,
    },
    subtitle: {
      fontSize: "12px",
      color: isDark ? "#64748b" : "#64748b",
      marginTop: "4px",
    },
    searchWrapper: {
      position: "relative",
      width: getSearchWidth(),
      flexShrink: 0,
    },
    searchIcon: {
      position: "absolute",
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#3b82f6",
    },
    searchInput: {
      width: "100%",
      padding: "11px 16px 11px 42px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "13px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
      transition: "all 0.2s",
      boxSizing: "border-box",
    },
    filtersRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "16px",
      marginBottom: "20px",
      paddingBottom: "12px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    filterGroup: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
      backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
      padding: "4px 12px",
      borderRadius: "12px",
    },
    filterLabel: {
      fontSize: "11px",
      fontWeight: 700,
      color: isDark ? "#64748b" : "#475569",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
    filterButtons: {
      display: "flex",
      gap: "4px",
      flexWrap: "wrap",
    },
    filterBtn: (isActive) => ({
      padding: "4px 10px",
      borderRadius: "16px",
      fontSize: "11px",
      fontWeight: 500,
      background: isActive 
        ? "#3b82f6" 
        : isDark 
          ? "transparent" 
          : "#f1f5f9",
      color: isActive 
        ? "#fff" 
        : isDark 
          ? "#94a3b8" 
          : "#475569",
      border: isActive 
        ? "1px solid #3b82f6" 
        : isDark 
          ? "1px solid #2a3145" 
          : "1px solid #e2e8f0",
      cursor: "pointer",
      transition: "all 0.15s",
    }),
    selectionBar: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: isDark 
        ? "rgba(59,130,246,0.08)" 
        : "rgba(59,130,246,0.04)",
      border: isDark 
        ? "1px solid rgba(59,130,246,0.2)" 
        : "1px solid rgba(59,130,246,0.15)",
      borderRadius: "8px",
      padding: "8px 16px",
      marginBottom: "16px",
    },
    tableCard: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "16px",
      overflow: "hidden",
    },
    tableWrapper: {
      overflowX: "auto",
      overflowY: "hidden",
      WebkitOverflowScrolling: "touch",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: getTableMinWidth(),
    },
    th: {
      padding: "12px 10px",
      textAlign: "left",
      fontSize: "11px",
      fontWeight: 700,
      color: "#3b82f6",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "10px 10px",
      fontSize: "12px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      borderBottom: isDark ? "1px solid #1a2035" : "1px solid #f1f5f9",
    },
    pagination: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "center",
      justifyContent: "space-between",
      gap: isMobile ? "12px" : "0",
      padding: "14px 16px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
    paginationInfo: {
      fontSize: "11px",
      color: isDark ? "#64748b" : "#94a3b8",
    },
    paginationButtons: {
      display: "flex",
      gap: "4px",
    },
    pageBtn: (disabled, isActive) => ({
      width: "28px",
      height: "28px",
      borderRadius: "6px",
      border: isActive 
        ? "1px solid #3b82f6" 
        : isDark 
          ? "1px solid #1e2740" 
          : "1px solid #e2e8f0",
      background: isActive 
        ? "#1e3a8a" 
        : isDark 
          ? "#141824" 
          : "#ffffff",
      color: isActive 
        ? "#93c5fd" 
        : disabled 
          ? isDark ? "#2d3a55" : "#cbd5e1"
          : isDark ? "#94a3b8" : "#64748b",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
    }),
    actionBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "4px",
      color: isDark ? "#64748b" : "#94a3b8",
      transition: "color 0.15s",
    },
    scrollHint: {
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
      padding: "6px 12px",
      fontSize: "10px",
      color: isDark ? "#60a5fa" : "#3b82f6",
      backgroundColor: isDark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.06)",
      borderRadius: "20px",
      width: "fit-content",
      marginLeft: "auto",
      marginRight: "auto",
      gap: "6px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <style>{`
          .custom-scroll::-webkit-scrollbar {
            height: 5px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: ${isDark ? "#1a2035" : "#e2e8f0"};
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: #3b82f6;
            border-radius: 10px;
          }
          button:hover {
            opacity: 0.85;
          }
        `}</style>
        
        {/* Header with Title and Search */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>Orders</h1>
            <p style={styles.subtitle}>Manage and track all customer orders</p>
          </div>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}><SearchIcon /></span>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filters Row - Better organized */}
        <div style={styles.filtersRow}>
          {/* Status Filter */}
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Status:</span>
            <div style={styles.filterButtons}>
              {["All", "Delivered", "Cancelled", "Placed", "Preparing", "Ready", "On the Way"].map(s => (
                <button key={s} style={styles.filterBtn(statusFilter === s)} onClick={() => { setStatusFilter(s); setCurrentPage(1); }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Filter */}
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Payment:</span>
            <div style={styles.filterButtons}>
              {["All", "COD", "Online"].map(p => (
                <button key={p} style={styles.filterBtn(paymentFilter === p)} onClick={() => { setPaymentFilter(p); setCurrentPage(1); }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Period Filter */}
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Period:</span>
            <div style={styles.filterButtons}>
              {["All", "Today", "This Week", "This Month"].map(per => (
                <button key={per} style={styles.filterBtn(periodFilter === per)} onClick={() => { setPeriodFilter(per); setCurrentPage(1); }}>
                  {per}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selection Bar */}
        {selected.size > 0 && (
          <div style={styles.selectionBar}>
            <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600 }}>
              {selected.size} order{selected.size > 1 ? "s" : ""} selected
            </span>
            <div style={{ flex: 1 }} />
            <button onClick={() => setSelected(new Set())} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "11px", cursor: "pointer" }}>
              Clear
            </button>
          </div>
        )}

        {/* Scroll hint - More visible */}
        {isMobile && filteredOrders.length > 0 && (
          <div style={styles.scrollHint}>
            <span>👉</span> Swipe horizontally to see all columns <span>👈</span>
          </div>
        )}

        {/* Orders Table */}
        <div style={styles.tableCard}>
          <div style={styles.tableWrapper} className="custom-scroll">
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}><Checkbox checked={selected.size === paginatedOrders.length && paginatedOrders.length > 0} onChange={toggleAll} isDark={isDark} /></th>
                  <th style={styles.th}>SN</th>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Restaurant</th>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Pay</th>
                  <th style={styles.th}>Method</th>
                  <th style={styles.th}>Restro</th>
                  <th style={styles.th}>Driver</th>
                  <th style={styles.th}>User St.</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, idx) => {
                  const sn = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <tr key={order.id} style={{ background: selected.has(order.id) && isDark ? "rgba(59,130,246,0.07)" : selected.has(order.id) ? "rgba(59,130,246,0.03)" : "transparent" }}>
                      <td style={styles.td}><Checkbox checked={selected.has(order.id)} onChange={() => toggleOne(order.id)} isDark={isDark} /></td>
                      <td style={styles.td}>{sn}</td>
                      <td style={styles.td}>{order.orderId}</td>
                      <td style={styles.td}><StatusBadge status={order.status} isDark={isDark} /></td>
                      <td style={styles.td}>{order.date}</td>
                      <td style={styles.td}>{order.restaurant.length > 15 ? order.restaurant.substring(0, 12) + "..." : order.restaurant}</td>
                      <td style={styles.td}>{order.user}</td>
                      <td style={styles.td}><PayStatusBadge status={order.payStatus} isDark={isDark} /></td>
                      <td style={styles.td}>{order.payMethod}</td>
                      <td style={styles.td}>{order.restroStatus}</td>
                      <td style={styles.td}>{order.driverStatus}</td>
                      <td style={styles.td}>{order.userStatus}</td>
                      <td style={styles.td}>₹{order.amount}</td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button style={styles.actionBtn}><EyeIcon /></button>
                          <button style={styles.actionBtn}><EditIcon /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {paginatedOrders.length === 0 && (
                  <tr>
                    <td colSpan={14} style={{ padding: "50px", textAlign: "center", color: isDark ? "#64748b" : "#94a3b8" }}>
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div style={styles.pagination}>
              <div style={styles.paginationInfo}>
                {Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrders.length)} - {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
              </div>
              <div style={styles.paginationButtons}>
                <button style={styles.pageBtn(currentPage === 1, false)} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  <ChevronLeftIcon />
                </button>
                {Array.from({ length: Math.min(isMobile ? 3 : 5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= (isMobile ? 3 : 5)) pageNum = i + 1;
                  else if (currentPage <= (isMobile ? 2 : 3)) pageNum = i + 1;
                  else if (currentPage >= totalPages - (isMobile ? 1 : 2)) pageNum = totalPages - (isMobile ? 2 : 4) + i;
                  else pageNum = currentPage - (isMobile ? 1 : 2) + i;
                  return pageNum <= totalPages && (
                    <button key={pageNum} style={styles.pageBtn(false, currentPage === pageNum)} onClick={() => setCurrentPage(pageNum)}>
                      {pageNum}
                    </button>
                  );
                })}
                <button style={styles.pageBtn(currentPage === totalPages, false)} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;