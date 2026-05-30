import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA FOR REPORTS
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_SALES_DATA = {
  daily: [
    { date: "2024-02-01", sales: 125000, orders: 450, avgOrderValue: 278 },
    { date: "2024-02-02", sales: 132000, orders: 480, avgOrderValue: 275 },
    { date: "2024-02-03", sales: 148000, orders: 520, avgOrderValue: 285 },
    { date: "2024-02-04", sales: 156000, orders: 580, avgOrderValue: 269 },
    { date: "2024-02-05", sales: 142000, orders: 510, avgOrderValue: 278 },
    { date: "2024-02-06", sales: 138000, orders: 490, avgOrderValue: 282 },
    { date: "2024-02-07", sales: 165000, orders: 600, avgOrderValue: 275 },
  ],
  weekly: [
    { week: "Week 1", sales: 890000, orders: 3200, avgOrderValue: 278 },
    { week: "Week 2", sales: 950000, orders: 3450, avgOrderValue: 275 },
    { week: "Week 3", sales: 1020000, orders: 3700, avgOrderValue: 276 },
    { week: "Week 4", sales: 1100000, orders: 4000, avgOrderValue: 275 },
  ],
  monthly: [
    { month: "Jan 2024", sales: 3500000, orders: 12800, avgOrderValue: 273 },
    { month: "Feb 2024", sales: 3800000, orders: 13900, avgOrderValue: 273 },
    { month: "Mar 2024", sales: 4200000, orders: 15200, avgOrderValue: 276 },
    { month: "Apr 2024", sales: 3900000, orders: 14100, avgOrderValue: 277 },
  ],
  yearly: [
    { year: "2022", sales: 28500000, orders: 105000, avgOrderValue: 271 },
    { year: "2023", sales: 42500000, orders: 156000, avgOrderValue: 272 },
    { year: "2024", sales: 18500000, orders: 68000, avgOrderValue: 272 },
  ]
};

const DUMMY_ORDERS_DATA = [
  { id: "ORD-001", date: "2024-02-15", customer: "Rahul Sharma", restaurant: "Pizza Hut", amount: 450, status: "Delivered", rider: "Rajesh Kumar", payment: "Online" },
  { id: "ORD-002", date: "2024-02-15", customer: "Priya Patel", restaurant: "McDonald's", amount: 320, status: "Delivered", rider: "Suresh Singh", payment: "COD" },
  { id: "ORD-003", date: "2024-02-14", customer: "Amit Verma", restaurant: "KFC", amount: 550, status: "Cancelled", rider: "Amit Patel", payment: "Online" },
  { id: "ORD-004", date: "2024-02-14", customer: "Neha Gupta", restaurant: "Pizza Hut", amount: 280, status: "Delivered", rider: "Rajesh Kumar", payment: "COD" },
  { id: "ORD-005", date: "2024-02-13", customer: "Vikram Singh", restaurant: "Burger King", amount: 380, status: "Delivered", rider: "Suresh Singh", payment: "Online" },
  { id: "ORD-006", date: "2024-02-13", customer: "Anjali Desai", restaurant: "Domino's", amount: 620, status: "Pending", rider: "Pending", payment: "Online" },
  { id: "ORD-007", date: "2024-02-12", customer: "Rajesh Kumar", restaurant: "KFC", amount: 490, status: "Delivered", rider: "Amit Patel", payment: "COD" },
  { id: "ORD-008", date: "2024-02-12", customer: "Priya Sharma", restaurant: "McDonald's", amount: 210, status: "Delivered", rider: "Rajesh Kumar", payment: "Online" },
];

const DUMMY_RIDERS_DATA = [
  { id: "RDR-001", name: "Rajesh Kumar", totalDeliveries: 450, totalEarnings: 45000, rating: 4.8, status: "Active", joinedDate: "2024-01-01", avgDeliveryTime: 28 },
  { id: "RDR-002", name: "Suresh Singh", totalDeliveries: 320, totalEarnings: 32000, rating: 4.6, status: "Active", joinedDate: "2024-01-15", avgDeliveryTime: 32 },
  { id: "RDR-003", name: "Amit Patel", totalDeliveries: 180, totalEarnings: 18000, rating: 4.4, status: "Inactive", joinedDate: "2024-02-01", avgDeliveryTime: 35 },
  { id: "RDR-004", name: "Vikram Mehta", totalDeliveries: 280, totalEarnings: 28000, rating: 4.7, status: "Active", joinedDate: "2024-01-20", avgDeliveryTime: 30 },
  { id: "RDR-005", name: "Pooja Sharma", totalDeliveries: 150, totalEarnings: 15000, rating: 4.9, status: "Active", joinedDate: "2024-02-10", avgDeliveryTime: 26 },
];

const DUMMY_RESTAURANTS_DATA = [
  { id: "RST-001", name: "Pizza Hut", totalOrders: 1250, totalRevenue: 525000, rating: 4.5, status: "Active", joinedDate: "2024-01-01", avgOrderValue: 420 },
  { id: "RST-002", name: "McDonald's", totalOrders: 980, totalRevenue: 392000, rating: 4.3, status: "Active", joinedDate: "2024-01-10", avgOrderValue: 400 },
  { id: "RST-003", name: "KFC", totalOrders: 750, totalRevenue: 337500, rating: 4.2, status: "Inactive", joinedDate: "2024-01-20", avgOrderValue: 450 },
  { id: "RST-004", name: "Burger King", totalOrders: 620, totalRevenue: 248000, rating: 4.4, status: "Active", joinedDate: "2024-02-01", avgOrderValue: 400 },
  { id: "RST-005", name: "Domino's", totalOrders: 890, totalRevenue: 400500, rating: 4.6, status: "Active", joinedDate: "2024-01-05", avgOrderValue: 450 },
];

const DUMMY_CUSTOMERS_DATA = [
  { id: "CUS-001", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", totalOrders: 25, totalSpent: 12500, status: "Active", joinedDate: "2024-01-01" },
  { id: "CUS-002", name: "Priya Patel", email: "priya@example.com", phone: "+91 87654 32109", totalOrders: 18, totalSpent: 8900, status: "Active", joinedDate: "2024-01-10" },
  { id: "CUS-003", name: "Amit Verma", email: "amit@example.com", phone: "+91 76543 21098", totalOrders: 32, totalSpent: 16800, status: "Active", joinedDate: "2024-01-15" },
  { id: "CUS-004", name: "Neha Gupta", email: "neha@example.com", phone: "+91 65432 10987", totalOrders: 12, totalSpent: 5600, status: "Inactive", joinedDate: "2024-02-01" },
  { id: "CUS-005", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 54321 09876", totalOrders: 45, totalSpent: 22500, status: "Active", joinedDate: "2024-01-05" },
];

const DUMMY_REVENUE_DATA = {
  sources: [
    { source: "Commission", amount: 425000, percentage: 65, color: "#6366f1" },
    { source: "Delivery Fee", amount: 150000, percentage: 23, color: "#10b981" },
    { source: "Subscription", amount: 80000, percentage: 12, color: "#f59e0b" },
  ],
  breakdown: [
    { month: "Jan", revenue: 350000, expenses: 245000, profit: 105000 },
    { month: "Feb", revenue: 380000, expenses: 266000, profit: 114000 },
    { month: "Mar", revenue: 420000, expenses: 294000, profit: 126000 },
    { month: "Apr", revenue: 390000, expenses: 273000, profit: 117000 },
    { month: "May", revenue: 410000, expenses: 287000, profit: 123000 },
    { month: "Jun", revenue: 440000, expenses: 308000, profit: 132000 },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// GET THEME STYLES
// ─────────────────────────────────────────────────────────────────────────────
const getThemeStyles = (isDark) => ({
  dark: {
    background: "#0a0c10", surface: "#11131a", surfaceLighter: "#1a1d2e", surfaceLightest: "#22253a",
    border: "#1f2335", borderLight: "#2a2f45", text: "#edf2f8", textSecondary: "#a0a8c0",
    textMuted: "#6b7280", textDim: "#4a4f6e", primary: "#6366f1", primaryDark: "#4f46e5",
    primaryLight: "#a5b4fc", success: "#10b981", warning: "#f59e0b", error: "#ef4444",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", glass: "rgba(30, 34, 58, 0.8)",
  },
  light: {
    background: "#f3f4f6", surface: "#ffffff", surfaceLighter: "#f9fafb", surfaceLightest: "#f3f4f6",
    border: "#e5e7eb", borderLight: "#d1d5db", text: "#111827", textSecondary: "#4b5563",
    textMuted: "#6b7280", textDim: "#9ca3af", primary: "#6366f1", primaryDark: "#4f46e5",
    primaryLight: "#818cf8", success: "#10b981", warning: "#f59e0b", error: "#ef4444",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", glass: "rgba(255, 255, 255, 0.9)",
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const Icons = {
  Sales: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>),
  Orders: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>),
  Rider: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M5 17h14V5H5z"/><line x1="8" y1="9" x2="16" y2="9"/></svg>),
  Restaurant: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18V3H3z"/><circle cx="12" cy="12" r="3"/><path d="M8 7v4M16 7v4"/></svg>),
  Customer: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
  Revenue: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>),
  Download: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
  Search: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  Close: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const StatusBadge = ({ status, ts }) => {
  const config = { 
    Delivered: { bg: "rgba(16,185,129,0.12)", color: ts.success }, 
    Pending: { bg: "rgba(245,158,11,0.12)", color: ts.warning }, 
    Cancelled: { bg: "rgba(239,68,68,0.12)", color: ts.error }, 
    Active: { bg: "rgba(16,185,129,0.12)", color: ts.success }, 
    Inactive: { bg: "rgba(107,114,128,0.12)", color: ts.textMuted } 
  };
  const c = config[status] || config.Inactive;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", background: c.bg, color: c.color, fontSize: "11px", fontWeight: 600 }}>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.color }} />
      {status}
    </span>
  );
};

const StatCard = ({ icon, label, value, change, ts }) => (
  <div style={{ background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "16px", padding: "16px 20px" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
      <div style={{ padding: "8px", background: `${ts.primary}1A`, borderRadius: "12px", color: ts.primary }}>{icon}</div>
      {change && <span style={{ fontSize: "11px", color: change > 0 ? ts.success : ts.error }}>{change > 0 ? `+${change}%` : `${change}%`}</span>}
    </div>
    <div style={{ fontSize: "24px", fontWeight: 700, color: ts.text }}>{value}</div>
    <div style={{ fontSize: "12px", color: ts.textMuted, marginTop: "4px" }}>{label}</div>
  </div>
);

const Toast = ({ message, type, onClose, ts }) => (
  <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 999, background: ts.glass, backdropFilter: "blur(10px)", border: `1px solid ${type === "error" ? ts.error : ts.success}`, borderRadius: "12px", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", animation: "slideIn 0.3s ease" }}>
    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? ts.error : ts.success }} />
    <span style={{ fontSize: "13px", color: type === "error" ? ts.error : ts.success }}>{message}</span>
    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: ts.textMuted }}><Icons.Close /></button>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const ReportsManagement = ({ isDark = true }) => {
  const ts = getThemeStyles(isDark)[isDark ? "dark" : "light"];

  const [activeTab, setActiveTab] = useState("sales");
  const [dateRange, setDateRange] = useState("daily");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => { 
    setToast({ message, type }); 
    setTimeout(() => setToast(null), 3500); 
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) { 
      showToast("No data to export", "error"); 
      return; 
    }
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(h => JSON.stringify(row[h] || "")).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; 
    a.download = `${filename}.csv`; 
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported successfully");
  };

  const sortedOrders = [...DUMMY_ORDERS_DATA].sort((a, b) => {
    const aVal = a[sortBy] || "";
    const bVal = b[sortBy] || "";
    if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const filteredOrders = sortedOrders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.restaurant.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    container: { minHeight: "100vh", background: ts.background, padding: "28px 32px", fontFamily: "'Inter', 'DM Sans', sans-serif" },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" },
    title: { fontSize: "28px", fontWeight: 700, background: ts.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
    subtitle: { fontSize: "13px", color: ts.textMuted, marginLeft: "12px" },
    tabs: { display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap", borderBottom: `1px solid ${ts.border}`, paddingBottom: "12px" },
    tab: (isActive) => ({ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "12px", background: isActive ? ts.primary : "transparent", color: isActive ? "white" : ts.textSecondary, cursor: "pointer", border: "none", fontSize: "14px", fontWeight: 500 }),
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" },
    sectionTitle: { fontSize: "18px", fontWeight: 600, color: ts.text },
    exportBtn: { background: ts.success, border: "none", padding: "10px 20px", borderRadius: "12px", color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px" },
    dateRangeGroup: { display: "flex", gap: "10px", background: ts.surface, padding: "6px", borderRadius: "12px", border: `1px solid ${ts.border}` },
    dateRangeBtn: (isActive) => ({ padding: "6px 16px", borderRadius: "8px", background: isActive ? ts.primary : "transparent", color: isActive ? "white" : ts.textSecondary, border: "none", cursor: "pointer", fontSize: "12px" }),
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "24px" },
    chartCard: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "20px", padding: "20px", marginBottom: "24px" },
    chartTitle: { fontSize: "14px", fontWeight: 600, color: ts.text, marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    tableWrapper: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "20px", overflow: "hidden" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "800px" },
    th: { padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: ts.primary, borderBottom: `1px solid ${ts.border}`, background: ts.surfaceLighter, cursor: "pointer" },
    td: { padding: "16px", borderBottom: `1px solid ${ts.border}`, fontSize: "13px", color: ts.textSecondary },
    searchBar: { display: "flex", alignItems: "center", gap: "12px", background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "14px", padding: "10px 16px", marginBottom: "20px" },
    searchInput: { flex: 1, background: "transparent", border: "none", outline: "none", color: ts.text, fontSize: "13px" },
    revenueSource: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${ts.border}` },
    progressBar: (percentage, color) => ({ width: `${percentage}%`, height: "8px", background: color, borderRadius: "4px" }),
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); }
        * { transition: all 0.2s ease; }
      `}</style>

      {/* Header */}
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.title}>Reports & Analytics</h1>
          <span style={styles.subtitle}>Comprehensive insights into your business performance</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === "sales")} onClick={() => setActiveTab("sales")}><Icons.Sales /> Sales Report</button>
        <button style={styles.tab(activeTab === "orders")} onClick={() => setActiveTab("orders")}><Icons.Orders /> Orders Report</button>
        <button style={styles.tab(activeTab === "riders")} onClick={() => setActiveTab("riders")}><Icons.Rider /> Riders Report</button>
        <button style={styles.tab(activeTab === "restaurants")} onClick={() => setActiveTab("restaurants")}><Icons.Restaurant /> Restaurants Report</button>
        <button style={styles.tab(activeTab === "customers")} onClick={() => setActiveTab("customers")}><Icons.Customer /> Customers Report</button>
        <button style={styles.tab(activeTab === "revenue")} onClick={() => setActiveTab("revenue")}><Icons.Revenue /> Revenue Report</button>
      </div>

      {/* Sales Report Tab */}
      {activeTab === "sales" && (
        <>
          <div style={styles.header}>
            <h2 style={styles.sectionTitle}>Sales Overview</h2>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={styles.dateRangeGroup}>
                <button style={styles.dateRangeBtn(dateRange === "daily")} onClick={() => setDateRange("daily")}>Daily</button>
                <button style={styles.dateRangeBtn(dateRange === "weekly")} onClick={() => setDateRange("weekly")}>Weekly</button>
                <button style={styles.dateRangeBtn(dateRange === "monthly")} onClick={() => setDateRange("monthly")}>Monthly</button>
                <button style={styles.dateRangeBtn(dateRange === "yearly")} onClick={() => setDateRange("yearly")}>Yearly</button>
              </div>
              <button style={styles.exportBtn} onClick={() => exportToCSV(DUMMY_SALES_DATA[dateRange], `${dateRange}_sales_report`)}><Icons.Download /> Export</button>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <StatCard icon={<Icons.Sales />} label="Total Sales" value={`₹${(DUMMY_SALES_DATA[dateRange].reduce((sum, d) => sum + d.sales, 0) / 100000).toFixed(1)}L`} change={12} ts={ts} />
            <StatCard icon={<Icons.Orders />} label="Total Orders" value={DUMMY_SALES_DATA[dateRange].reduce((sum, d) => sum + d.orders, 0)} change={8} ts={ts} />
            <StatCard icon={<Icons.Revenue />} label="Avg Order Value" value={`₹${Math.round(DUMMY_SALES_DATA[dateRange].reduce((sum, d) => sum + d.avgOrderValue, 0) / DUMMY_SALES_DATA[dateRange].length)}`} change={5} ts={ts} />
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>{dateRange === "daily" ? "Date" : dateRange === "weekly" ? "Week" : dateRange === "monthly" ? "Month" : "Year"}</th>
                  <th style={styles.th}>Sales (₹)</th>
                  <th style={styles.th}>Orders</th>
                  <th style={styles.th}>Avg Order Value</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_SALES_DATA[dateRange].map((item, i) => (
                  <tr key={i}>
                    <td style={styles.td}><strong>{item.date || item.week || item.month || item.year}</strong></td>
                    <td style={styles.td}>₹{(item.sales / 1000).toFixed(0)}K</td>
                    <td style={styles.td}>{item.orders}</td>
                    <td style={styles.td}>₹{item.avgOrderValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Orders Report Tab */}
      {activeTab === "orders" && (
        <>
          <div style={styles.header}>
            <h2 style={styles.sectionTitle}>Orders Report</h2>
            <button style={styles.exportBtn} onClick={() => exportToCSV(filteredOrders, "orders_report")}><Icons.Download /> Export</button>
          </div>
          <div style={styles.searchBar}>
            <Icons.Search />
            <input style={styles.searchInput} placeholder="Search by order ID, customer or restaurant..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th} onClick={() => { setSortBy("id"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>Order ID</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Restaurant</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Rider</th>
                  <th style={styles.th}>Payment</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td style={styles.td}>{order.id}</td>
                    <td style={styles.td}>{order.date}</td>
                    <td style={styles.td}>{order.customer}</td>
                    <td style={styles.td}>{order.restaurant}</td>
                    <td style={styles.td}>₹{order.amount}</td>
                    <td style={styles.td}><StatusBadge status={order.status} ts={ts} /></td>
                    <td style={styles.td}>{order.rider}</td>
                    <td style={styles.td}>{order.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Riders Report Tab */}
      {activeTab === "riders" && (
        <>
          <div style={styles.header}>
            <h2 style={styles.sectionTitle}>Riders Performance Report</h2>
            <button style={styles.exportBtn} onClick={() => exportToCSV(DUMMY_RIDERS_DATA, "riders_report")}><Icons.Download /> Export</button>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Rider Name</th>
                  <th style={styles.th}>Total Deliveries</th>
                  <th style={styles.th}>Total Earnings</th>
                  <th style={styles.th}>Rating</th>
                  <th style={styles.th}>Avg Delivery Time</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_RIDERS_DATA.map(rider => (
                  <tr key={rider.id}>
                    <td style={styles.td}><strong>{rider.name}</strong></td>
                    <td style={styles.td}>{rider.totalDeliveries}</td>
                    <td style={styles.td}>₹{rider.totalEarnings}</td>
                    <td style={styles.td}>⭐ {rider.rating}</td>
                    <td style={styles.td}>{rider.avgDeliveryTime} min</td>
                    <td style={styles.td}><StatusBadge status={rider.status} ts={ts} /></td>
                    <td style={styles.td}>{rider.joinedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Restaurants Report Tab */}
      {activeTab === "restaurants" && (
        <>
          <div style={styles.header}>
            <h2 style={styles.sectionTitle}>Restaurants Performance Report</h2>
            <button style={styles.exportBtn} onClick={() => exportToCSV(DUMMY_RESTAURANTS_DATA, "restaurants_report")}><Icons.Download /> Export</button>
          </div>
          <div style={styles.tableWrapper}>
           <table style={styles.table}>
  <thead>
    <tr>
      <th style={styles.th}>Restaurant Name</th>
      <th style={styles.th}>Total Orders</th>
      <th style={styles.th}>Total Revenue</th>
      <th style={styles.th}>Avg Order Value</th>
      <th style={styles.th}>Rating</th>
      <th style={styles.th}>Status</th>
      <th style={styles.th}>Joined Date</th>
    </tr>
  </thead>

  <tbody>
    {DUMMY_RESTAURANTS_DATA.map((rest) => (
      <tr key={rest.id}>
        <td style={styles.td}>
          <strong>{rest.name}</strong>
        </td>

        <td style={styles.td}>
          {rest.totalOrders}
        </td>

        <td style={styles.td}>
          ₹{(rest.totalRevenue / 1000).toFixed(0)}K
        </td>

        <td style={styles.td}>
          ₹{rest.avgOrderValue}
        </td>

        <td style={styles.td}>
          ⭐ {rest.rating}
        </td>

        <td style={styles.td}>
          <StatusBadge status={rest.status} ts={ts} />
        </td>

        <td style={styles.td}>
          {rest.joinedDate}
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        </>
      )}

      {/* Customers Report Tab */}
      {activeTab === "customers" && (
        <>
          <div style={styles.header}>
            <h2 style={styles.sectionTitle}>Customers Report</h2>
            <button style={styles.exportBtn} onClick={() => exportToCSV(DUMMY_CUSTOMERS_DATA, "customers_report")}><Icons.Download /> Export</button>
          </div>
          <div style={styles.tableWrapper}>
          <table style={styles.table}>
  <thead>
    <tr>
      <th style={styles.th}>Restaurant Name</th>
      <th style={styles.th}>Total Orders</th>
      <th style={styles.th}>Total Revenue</th>
      <th style={styles.th}>Avg Order Value</th>
      <th style={styles.th}>Rating</th>
      <th style={styles.th}>Status</th>
      <th style={styles.th}>Joined Date</th>
    </tr>
  </thead>
  <tbody>
    {DUMMY_RESTAURANTS_DATA && DUMMY_RESTAURANTS_DATA.length > 0 ? (
      DUMMY_RESTAURANTS_DATA.map((rest) => (
        <tr key={rest.id}>
          <td style={styles.td}>
            <strong>{rest.name}</strong>
          </td>
          <td style={styles.td}>{rest.totalOrders}</td>
          <td style={styles.td}>₹{(rest.totalRevenue / 1000).toFixed(0)}K</td>
          <td style={styles.td}>₹{rest.avgOrderValue}</td>
          <td style={styles.td}>⭐ {rest.rating}</td>
          <td style={styles.td}>
            <StatusBadge status={rest.status} ts={ts} />
          </td>
          <td style={styles.td}>{rest.joinedDate}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: ts.textMuted }}>
          No restaurants found
        </td>
      </tr>
    )}
  </tbody>
</table>
          </div>
        </>
      )}

      {/* Revenue Report Tab */}
      {activeTab === "revenue" && (
        <>
          <div style={styles.header}>
            <h2 style={styles.sectionTitle}>Revenue & Profit Report</h2>
            <button style={styles.exportBtn} onClick={() => exportToCSV(DUMMY_REVENUE_DATA.breakdown, "revenue_report")}><Icons.Download /> Export</button>
          </div>

          <div style={styles.chartCard}>
            <div style={styles.chartTitle}>Revenue Sources</div>
            {DUMMY_REVENUE_DATA.sources.map(source => (
              <div key={source.source} style={styles.revenueSource}>
                <div>
                  <span style={{ fontWeight: 600, color: ts.text }}>{source.source}</span>
                  <br />
                  <span style={{ fontSize: "11px", color: ts.textMuted }}>{source.percentage}% of total</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700, color: source.color }}>₹{(source.amount / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "16px" }}>
              {DUMMY_REVENUE_DATA.sources.map(source => (
                <div key={source.source} style={{ marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                    <span>{source.source}</span>
                    <span>{source.percentage}%</span>
                  </div>
                  <div style={{ background: ts.surfaceLighter, borderRadius: "4px", overflow: "hidden" }}>
                    <div style={styles.progressBar(source.percentage, source.color)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Month</th>
                  <th style={styles.th}>Revenue (₹)</th>
                  <th style={styles.th}>Expenses (₹)</th>
                  <th style={styles.th}>Profit (₹)</th>
                  <th style={styles.th}>Profit Margin</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_REVENUE_DATA.breakdown.map(item => (
                  <tr key={item.month}>
                    <td style={styles.td}><strong>{item.month}</strong></td>
                    <td style={styles.td}>₹{(item.revenue / 1000).toFixed(0)}K</td>
                    <td style={styles.td}>₹{(item.expenses / 1000).toFixed(0)}K</td>
                    {/* <td style={styles.td} style={{ color: ts.success }}>₹{(item.profit / 1000).toFixed(0)}K</td> */}
                    <td style={styles.td}>{Math.round((item.profit / item.revenue) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} ts={ts} />}
    </div>
  );
};

const Reports = ({ isDark = true }) => {
  return <ReportsManagement isDark={isDark} />;
};

export default Reports;