import React, { useState} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//   </svg>
// );
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
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
// const FilterIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3"/>
//   </svg>
// );
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
// const CheckIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <polyline points="20 6 9 17 4 12"/>
//   </svg>
// );
// const EyeIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
//   </svg>
// );
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/>
    <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────────────────────────────────────

// Transaction History Data
const transactionHistory = [
  { id: "TXN001", date: "2026-05-24 10:30:00", orderId: "#543", amount: 450, type: "Credit", status: "Success", paymentMethod: "Razorpay", customer: "Rahul Sharma" },
  { id: "TXN002", date: "2026-05-24 09:15:00", orderId: "#542", amount: 680, type: "Credit", status: "Success", paymentMethod: "Razorpay", customer: "Sneha Gupta" },
  { id: "TXN003", date: "2026-05-23 20:30:00", orderId: "#540", amount: 890, type: "Credit", status: "Success", paymentMethod: "COD", customer: "Priya Mehta" },
  { id: "TXN004", date: "2026-05-23 15:04:00", orderId: "#553", amount: 275, type: "Credit", status: "Success", paymentMethod: "COD", customer: "Neeraj Verma" },
  { id: "TXN005", date: "2026-05-22 18:45:00", orderId: "#549", amount: 285, type: "Refund", status: "Success", paymentMethod: "Razorpay", customer: "Yash Kumar" },
  { id: "TXN006", date: "2026-05-22 14:30:00", orderId: "#548", amount: 262, type: "Credit", status: "Failed", paymentMethod: "Razorpay", customer: "Neeraj Verma" },
  { id: "TXN007", date: "2026-05-21 19:20:00", orderId: "#547", amount: 262, type: "Credit", status: "Success", paymentMethod: "COD", customer: "Amit Singh" },
  { id: "TXN008", date: "2026-05-21 12:00:00", orderId: "#546", amount: 239, type: "Wallet", status: "Success", paymentMethod: "Wallet", customer: "Neeraj Verma" },
  { id: "TXN009", date: "2026-05-20 22:49:00", orderId: "#552", amount: 242, type: "Credit", status: "Pending", paymentMethod: "COD", customer: "Mehul" },
  { id: "TXN010", date: "2026-05-20 16:04:00", orderId: "#551", amount: 337, type: "Credit", status: "Success", paymentMethod: "COD", customer: "Yash" },
];

// Refund Management Data
const refundRequests = [
  { id: "REF001", orderId: "#549", customer: "Yash Kumar", amount: 285, reason: "Item not delivered", status: "Approved", date: "2026-05-22", refundMethod: "Razorpay" },
  { id: "REF002", orderId: "#548", customer: "Neeraj Verma", amount: 262, reason: "Wrong item received", status: "Pending", date: "2026-05-23", refundMethod: "Wallet" },
  { id: "REF003", orderId: "#547", customer: "Amit Singh", amount: 262, reason: "Quality issue", status: "Processing", date: "2026-05-23", refundMethod: "Razorpay" },
  { id: "REF004", orderId: "#552", customer: "Mehul", amount: 242, reason: "Late delivery", status: "Pending", date: "2026-05-24", refundMethod: "COD" },
  { id: "REF005", orderId: "#545", customer: "MANGLAM", amount: 254, reason: "Missing items", status: "Completed", date: "2026-05-21", refundMethod: "Wallet" },
];

// Wallet Transactions
const walletTransactions = [
  { id: "WAL001", date: "2026-05-24 10:30:00", customer: "Rahul Sharma", type: "Credit", amount: 100, balance: 450, description: "Order refund #543" },
  { id: "WAL002", date: "2026-05-23 15:00:00", customer: "Neeraj Verma", type: "Debit", amount: 50, balance: 200, description: "Order payment #553" },
  { id: "WAL003", date: "2026-05-22 18:00:00", customer: "Yash Kumar", type: "Credit", amount: 285, balance: 350, description: "Refund for order #549" },
  { id: "WAL004", date: "2026-05-21 12:00:00", customer: "Neeraj Verma", type: "Credit", amount: 239, balance: 250, description: "Order refund #546" },
  { id: "WAL005", date: "2026-05-20 14:30:00", customer: "Priya Mehta", type: "Debit", amount: 100, balance: 150, description: "Wallet payment" },
];

// Payment Report Data
const paymentReport = [
  { date: "2026-05-24", totalOrders: 12, totalAmount: 4560, razorpay: 2890, cod: 1670, wallet: 0, refunds: 0 },
  { date: "2026-05-23", totalOrders: 18, totalAmount: 6780, razorpay: 3450, cod: 2980, wallet: 350, refunds: 285 },
  { date: "2026-05-22", totalOrders: 15, totalAmount: 5240, razorpay: 2670, cod: 2230, wallet: 340, refunds: 262 },
  { date: "2026-05-21", totalOrders: 20, totalAmount: 7890, razorpay: 4010, cod: 3520, wallet: 360, refunds: 0 },
  { date: "2026-05-20", totalOrders: 14, totalAmount: 4820, razorpay: 2210, cod: 2410, wallet: 200, refunds: 239 },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status, type = "default" }) => {
  const configs = {
    Success: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
    Failed: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
    Pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
    Approved: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
    Processing: { bg: "rgba(59,130,246,0.15)", color: "#3b82f6" },
    Completed: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
    Credit: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
    Debit: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
    Wallet: { bg: "rgba(139,92,246,0.15)", color: "#8b5cf6" },
  };
  const config = configs[status] || { bg: "rgba(148,163,184,0.15)", color: "#94a3b8" };
  return <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: config.bg, color: config.color }}>{status}</span>;
};

const ToggleSwitch = ({ checked, onChange, isDark }) => (
  <button onClick={onChange} style={{
    width: "44px", height: "24px", borderRadius: "30px", border: "none",
    background: checked ? "#22c55e" : isDark ? "#2a3145" : "#cbd5e1",
    cursor: "pointer", transition: "all 0.2s", position: "relative"
  }}>
    <span style={{
      position: "absolute", top: "2px", left: checked ? "22px" : "2px",
      width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
      transition: "all 0.2s"
    }} />
  </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const PaymentSettings = ({ isDark = true }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("settings");

  // Payment Settings State
  const [razorpayConfig, setRazorpayConfig] = useState({
    enabled: true,
    keyId: "rzp_test_1234567890",
    keySecret: "••••••••••••••••••••••••",
    webhookSecret: "whsec_••••••••••••••••",
    environment: "production"
  });

  const [codConfig, setCodConfig] = useState({
    enabled: true,
    additionalCharge: 0,
    maxOrderAmount: 5000,
    minOrderAmount: 0
  });

  const [onlineConfig, setOnlineConfig] = useState({
    enabled: true,
    convenienceFee: 10,
    minOrderAmount: 99,
    maxOrderAmount: 10000
  });

  const [walletConfig, setWalletConfig] = useState({
    enabled: true,
    minAddAmount: 10,
    maxAddAmount: 10000,
    cashbackPercent: 5,
    maxCashback: 100,
    autoCreditRefund: true
  });

  // Payment Report State
//   const [reportStartDate, setReportStartDate] = useState("");
//   const [reportEndDate, setReportEndDate] = useState("");
//   const [reportFilter, setReportFilter] = useState("last7days");

  // Transaction History State
  const [transactionSearch, setTransactionSearch] = useState("");
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [transactionPage, setTransactionPage] = useState(1);
  const itemsPerPage = 10;

  // Refund Management State
  const [refundSearch, setRefundSearch] = useState("");
  const [refundFilter, setRefundFilter] = useState("all");
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Wallet State
  const [walletSearch, setWalletSearch] = useState("");
  const [walletFilter, setWalletFilter] = useState("all");
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState("");

  // Edit modal states
  const [editingConfig, setEditingConfig] = useState(null);
  const [tempConfig, setTempConfig] = useState({});

  // Filtered transactions
  const filteredTransactions = transactionHistory.filter(tx => {
    const matchesSearch = tx.orderId.toLowerCase().includes(transactionSearch.toLowerCase()) ||
      tx.customer.toLowerCase().includes(transactionSearch.toLowerCase()) ||
      tx.id.toLowerCase().includes(transactionSearch.toLowerCase());
    const matchesStatus = transactionFilter === "all" || tx.status === transactionFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedTransactions = filteredTransactions.slice((transactionPage - 1) * itemsPerPage, transactionPage * itemsPerPage);
  const totalTransactionPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Filtered refunds
  const filteredRefunds = refundRequests.filter(ref => {
    const matchesSearch = ref.orderId.toLowerCase().includes(refundSearch.toLowerCase()) ||
      ref.customer.toLowerCase().includes(refundSearch.toLowerCase());
    const matchesStatus = refundFilter === "all" || ref.status === refundFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered wallet transactions
  const filteredWallet = walletTransactions.filter(wt => {
    const matchesSearch = wt.customer.toLowerCase().includes(walletSearch.toLowerCase());
    const matchesType = walletFilter === "all" || wt.type === walletFilter;
    return matchesSearch && matchesType;
  });

  const handleSaveConfig = () => {
    if (editingConfig === "razorpay") setRazorpayConfig(tempConfig);
    if (editingConfig === "cod") setCodConfig(tempConfig);
    if (editingConfig === "online") setOnlineConfig(tempConfig);
    if (editingConfig === "wallet") setWalletConfig(tempConfig);
    setEditingConfig(null);
    setTempConfig({});
  };

  const handleRefundAction = (refund, action) => {
    if (action === "approve") {
      alert(`Refund for order ${refund.orderId} has been approved!`);
    } else if (action === "reject") {
      alert(`Refund for order ${refund.orderId} has been rejected.`);
    }
    setShowRefundModal(false);
    setSelectedRefund(null);
  };

  const handleAddMoney = () => {
    if (addMoneyAmount && parseInt(addMoneyAmount) >= walletConfig.minAddAmount) {
      alert(`₹${addMoneyAmount} added to wallet successfully!`);
      setShowAddMoneyModal(false);
      setAddMoneyAmount("");
    } else {
      alert(`Minimum amount to add is ₹${walletConfig.minAddAmount}`);
    }
  };

  const handleExportReport = () => {
    alert("Exporting payment report...");
  };

  const tabs = [
    { id: "settings", label: "⚙️ Payment Settings", icon: "⚙️" },
    { id: "cod", label: "💰 Cash on Delivery / Online", icon: "💰" },
    { id: "wallet", label: "👛 Wallet Payments", icon: "👛" },
    { id: "report", label: "📊 Payment Report", icon: "📊" },
    { id: "transactions", label: "📋 Transaction History", icon: "📋" },
    { id: "refunds", label: "↩️ Refund Management", icon: "↩️" },
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      background: isDark ? "#0d1117" : "#f8fafc",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    contentWrapper: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "24px",
    },
    title: {
      fontSize: "24px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#0f172a",
      margin: 0,
    },
    subtitle: {
      fontSize: "13px",
      color: isDark ? "#64748b" : "#64748b",
      marginTop: "4px",
    },
    tabsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "24px",
      paddingBottom: "12px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    tabButton: (isActive) => ({
      padding: "10px 20px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 600,
      background: isActive ? "#3b82f6" : "transparent",
      color: isActive ? "#fff" : isDark ? "#94a3b8" : "#64748b",
      border: isActive ? "none" : isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      cursor: "pointer",
      transition: "all 0.2s",
    }),
    card: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "16px",
      overflow: "hidden",
    },
    cardHeader: {
      padding: "16px 20px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
    },
    cardBody: {
      padding: "20px",
    },
    configRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    configLabel: {
      fontSize: "13px",
      fontWeight: 500,
      color: isDark ? "#e2e8f0" : "#1e293b",
    },
    configValue: {
      fontSize: "13px",
      color: isDark ? "#94a3b8" : "#64748b",
      fontFamily: "monospace",
    },
    input: {
      padding: "8px 12px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "13px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
    },
    button: (variant = "primary") => ({
      padding: "8px 16px",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      background: variant === "primary" ? "#3b82f6" : variant === "success" ? "#22c55e" : variant === "danger" ? "#ef4444" : isDark ? "#1a2035" : "#e2e8f0",
      color: variant === "primary" || variant === "success" || variant === "danger" ? "#fff" : isDark ? "#94a3b8" : "#64748b",
    }),
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "12px 12px",
      textAlign: "left",
      fontSize: "11px",
      fontWeight: 700,
      color: "#3b82f6",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
    td: {
      padding: "10px 12px",
      fontSize: "12px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      borderBottom: isDark ? "1px solid #1a2035" : "1px solid #f1f5f9",
    },
    searchWrapper: {
      position: "relative",
      width: "250px",
    },
    searchInput: {
      width: "100%",
      padding: "8px 12px 8px 32px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "12px",
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    filterSelect: {
      padding: "8px 12px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "12px",
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
  };

  // Render Settings Tab (Razorpay Configuration)
  const renderRazorpaySettings = () => (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}> Razorpay Configuration</h3>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Enable Razorpay</span>
          <ToggleSwitch checked={razorpayConfig.enabled} onChange={() => setRazorpayConfig({ ...razorpayConfig, enabled: !razorpayConfig.enabled })} isDark={isDark} />
        </div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Key ID</span>
          {editingConfig === "razorpay" ? (
            <input style={styles.input} value={tempConfig.keyId} onChange={(e) => setTempConfig({ ...tempConfig, keyId: e.target.value })} />
          ) : (
            <span style={styles.configValue}>{razorpayConfig.keyId}</span>
          )}
          <button style={styles.button("secondary")} onClick={() => { setEditingConfig("razorpay"); setTempConfig(razorpayConfig); }}><EditIcon /> Edit</button>
        </div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Key Secret</span>
          {editingConfig === "razorpay" ? (
            <input style={styles.input} type="password" value={tempConfig.keySecret} onChange={(e) => setTempConfig({ ...tempConfig, keySecret: e.target.value })} />
          ) : (
            <span style={styles.configValue}>{razorpayConfig.keySecret}</span>
          )}
        </div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Webhook Secret</span>
          {editingConfig === "razorpay" ? (
            <input style={styles.input} value={tempConfig.webhookSecret} onChange={(e) => setTempConfig({ ...tempConfig, webhookSecret: e.target.value })} />
          ) : (
            <span style={styles.configValue}>{razorpayConfig.webhookSecret}</span>
          )}
        </div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Environment</span>
          {editingConfig === "razorpay" ? (
            <select style={styles.filterSelect} value={tempConfig.environment} onChange={(e) => setTempConfig({ ...tempConfig, environment: e.target.value })}>
              <option>sandbox</option><option>production</option>
            </select>
          ) : (
            <span style={styles.configValue}>{razorpayConfig.environment}</span>
          )}
        </div>
        {editingConfig === "razorpay" && (
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
            <button style={styles.button("secondary")} onClick={() => setEditingConfig(null)}>Cancel</button>
            <button style={styles.button("primary")} onClick={handleSaveConfig}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );

  // Render COD/Online Settings Tab
  const renderCODSettings = () => (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}> Cash on Delivery Settings</h3>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Enable COD</span>
          <ToggleSwitch checked={codConfig.enabled} onChange={() => setCodConfig({ ...codConfig, enabled: !codConfig.enabled })} isDark={isDark} />
        </div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Additional Charge (₹)</span>
          {editingConfig === "cod" ? (
            <input style={styles.input} type="number" value={tempConfig.additionalCharge} onChange={(e) => setTempConfig({ ...tempConfig, additionalCharge: parseInt(e.target.value) })} />
          ) : (
            <span style={styles.configValue}>₹{codConfig.additionalCharge}</span>
          )}
        </div>
       {/* COD Settings */}
<div style={styles.card}>
  <div style={styles.cardHeader}>
    <h3 style={styles.cardTitle}>💰 Cash on Delivery Settings</h3>
  </div>
  <div style={styles.cardBody}>
    <div style={styles.configRow}>
      <span style={styles.configLabel}>Enable COD</span>
      <ToggleSwitch checked={codConfig.enabled} onChange={() => setCodConfig({ ...codConfig, enabled: !codConfig.enabled })} isDark={isDark} />
    </div>
    <div style={styles.configRow}>
      <span style={styles.configLabel}>Additional Charge (₹)</span>
      {editingConfig === "cod" ? (
        <input style={styles.input} type="number" value={tempConfig.additionalCharge} onChange={(e) => setTempConfig({ ...tempConfig, additionalCharge: parseInt(e.target.value) })} />
      ) : (
        <span style={styles.configValue}>₹{codConfig.additionalCharge}</span>
      )}
    </div>
    <div style={styles.configRow}>
      <span style={styles.configLabel}>Min Order Amount (₹)</span>
      {editingConfig === "cod" ? (
        <input style={styles.input} type="number" value={tempConfig.minOrderAmount} onChange={(e) => setTempConfig({ ...tempConfig, minOrderAmount: parseInt(e.target.value) })} />
      ) : (
        <span style={styles.configValue}>₹{codConfig.minOrderAmount}</span>
      )}
    </div>
    <div style={styles.configRow}>
      <span style={styles.configLabel}>Max Order Amount (₹)</span>
      {editingConfig === "cod" ? (
        <input style={styles.input} type="number" value={tempConfig.maxOrderAmount} onChange={(e) => setTempConfig({ ...tempConfig, maxOrderAmount: parseInt(e.target.value) })} />
      ) : (
        <span style={styles.configValue}>₹{codConfig.maxOrderAmount}</span>
      )}
    </div>
    
    {editingConfig === "cod" && (
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
        <button style={styles.button("secondary")} onClick={() => setEditingConfig(null)}>Cancel</button>
        <button style={styles.button("primary")} onClick={handleSaveConfig}>Save Changes</button>
      </div>
    )}
  </div>
</div>

{/* Online Payment Settings */}
<div style={{ ...styles.card, marginTop: "16px" }}>
  <div style={styles.cardHeader}>
    <h3 style={styles.cardTitle}> Online Payment Settings</h3>
  </div>
  <div style={styles.cardBody}>
    <div style={styles.configRow}>
      <span style={styles.configLabel}>Enable Online Payments</span>
      <ToggleSwitch checked={onlineConfig.enabled} onChange={() => setOnlineConfig({ ...onlineConfig, enabled: !onlineConfig.enabled })} isDark={isDark} />
    </div>
    <div style={styles.configRow}>
      <span style={styles.configLabel}>Convenience Fee (₹)</span>
      {editingConfig === "online" ? (
        <input style={styles.input} type="number" value={tempConfig.convenienceFee} onChange={(e) => setTempConfig({ ...tempConfig, convenienceFee: parseInt(e.target.value) })} />
      ) : (
        <span style={styles.configValue}>₹{onlineConfig.convenienceFee}</span>
      )}
    </div>
    <div style={styles.configRow}>
      <span style={styles.configLabel}>Min Order Amount (₹)</span>
      {editingConfig === "online" ? (
        <input style={styles.input} type="number" value={tempConfig.minOrderAmount} onChange={(e) => setTempConfig({ ...tempConfig, minOrderAmount: parseInt(e.target.value) })} />
      ) : (
        <span style={styles.configValue}>₹{onlineConfig.minOrderAmount}</span>
      )}
    </div>
    <div style={styles.configRow}>
      <span style={styles.configLabel}>Max Order Amount (₹)</span>
      {editingConfig === "online" ? (
        <input style={styles.input} type="number" value={tempConfig.maxOrderAmount} onChange={(e) => setTempConfig({ ...tempConfig, maxOrderAmount: parseInt(e.target.value) })} />
      ) : (
        <span style={styles.configValue}>₹{onlineConfig.maxOrderAmount}</span>
      )}
    </div>
    
    {editingConfig === "online" && (
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
        <button style={styles.button("secondary")} onClick={() => setEditingConfig(null)}>Cancel</button>
        <button style={styles.button("primary")} onClick={handleSaveConfig}>Save Changes</button>
      </div>
    )}
  </div>
</div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Max Order Amount (₹)</span>
          {editingConfig === "cod" ? (
            <input style={styles.input} type="number" value={tempConfig.maxOrderAmount} onChange={(e) => setTempConfig({ ...tempConfig, maxOrderAmount: parseInt(e.target.value) })} />
          ) : (
            <span style={styles.configValue}>₹{codConfig.maxOrderAmount}</span>
          )}
        </div>
      </div>

      <div style={{ ...styles.cardHeader, marginTop: "16px" }}>
        <h3 style={styles.cardTitle}> Online Payment Settings</h3>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Enable Online Payments</span>
          <ToggleSwitch checked={onlineConfig.enabled} onChange={() => setOnlineConfig({ ...onlineConfig, enabled: !onlineConfig.enabled })} isDark={isDark} />
        </div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Convenience Fee (₹)</span>
          {editingConfig === "online" ? (
            <input style={styles.input} type="number" value={tempConfig.convenienceFee} onChange={(e) => setTempConfig({ ...tempConfig, convenienceFee: parseInt(e.target.value) })} />
          ) : (
            <span style={styles.configValue}>₹{onlineConfig.convenienceFee}</span>
          )}
        </div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Min Order Amount (₹)</span>
          {editingConfig === "online" ? (
            <input style={styles.input} type="number" value={tempConfig.minOrderAmount} onChange={(e) => setTempConfig({ ...tempConfig, minOrderAmount: parseInt(e.target.value) })} />
          ) : (
            <span style={styles.configValue}>₹{onlineConfig.minOrderAmount}</span>
          )}
        </div>
        <div style={styles.configRow}>
          <span style={styles.configLabel}>Max Order Amount (₹)</span>
          {editingConfig === "online" ? (
            <input style={styles.input} type="number" value={tempConfig.maxOrderAmount} onChange={(e) => setTempConfig({ ...tempConfig, maxOrderAmount: parseInt(e.target.value) })} />
          ) : (
            <span style={styles.configValue}>₹{onlineConfig.maxOrderAmount}</span>
          )}
        </div>
        {(editingConfig === "cod" || editingConfig === "online") && (
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
            <button style={styles.button("secondary")} onClick={() => setEditingConfig(null)}>Cancel</button>
            <button style={styles.button("primary")} onClick={handleSaveConfig}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );

  // Render Wallet Payments Tab
  const renderWalletSettings = () => (
    <div>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}> Wallet Configuration</h3>
        </div>
        <div style={styles.cardBody}>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Enable Wallet</span>
            <ToggleSwitch checked={walletConfig.enabled} onChange={() => setWalletConfig({ ...walletConfig, enabled: !walletConfig.enabled })} isDark={isDark} />
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Min Add Amount (₹)</span>
            {editingConfig === "wallet" ? (
              <input style={styles.input} type="number" value={tempConfig.minAddAmount} onChange={(e) => setTempConfig({ ...tempConfig, minAddAmount: parseInt(e.target.value) })} />
            ) : (
              <span style={styles.configValue}>₹{walletConfig.minAddAmount}</span>
            )}
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Max Add Amount (₹)</span>
            {editingConfig === "wallet" ? (
              <input style={styles.input} type="number" value={tempConfig.maxAddAmount} onChange={(e) => setTempConfig({ ...tempConfig, maxAddAmount: parseInt(e.target.value) })} />
            ) : (
              <span style={styles.configValue}>₹{walletConfig.maxAddAmount}</span>
            )}
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Cashback %</span>
            {editingConfig === "wallet" ? (
              <input style={styles.input} type="number" value={tempConfig.cashbackPercent} onChange={(e) => setTempConfig({ ...tempConfig, cashbackPercent: parseInt(e.target.value) })} />
            ) : (
              <span style={styles.configValue}>{walletConfig.cashbackPercent}%</span>
            )}
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Auto Credit Refund to Wallet</span>
            {editingConfig === "wallet" ? (
              <ToggleSwitch checked={tempConfig.autoCreditRefund} onChange={() => setTempConfig({ ...tempConfig, autoCreditRefund: !tempConfig.autoCreditRefund })} isDark={isDark} />
            ) : (
              <span style={styles.configValue}>{walletConfig.autoCreditRefund ? "Enabled" : "Disabled"}</span>
            )}
          </div>
          {editingConfig === "wallet" && (
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
              <button style={styles.button("secondary")} onClick={() => setEditingConfig(null)}>Cancel</button>
              <button style={styles.button("primary")} onClick={handleSaveConfig}>Save Changes</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ ...styles.card, marginTop: "20px" }}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}> Wallet Transactions</h3>
          <button style={styles.button("success")} onClick={() => setShowAddMoneyModal(true)}>+ Add Money</button>
        </div>
        <div style={{ padding: "16px 20px", display: "flex", gap: "12px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
          <div style={styles.searchWrapper}>
            <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}></span>
            <input style={styles.searchInput} placeholder="Search customer..." value={walletSearch} onChange={(e) => setWalletSearch(e.target.value)} />
          </div>
          <select style={styles.filterSelect} value={walletFilter} onChange={(e) => setWalletFilter(e.target.value)}>
            <option value="all">All Types</option><option value="Credit">Credits</option><option value="Debit">Debits</option>
          </select>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead><tr><th style={styles.th}>Date</th><th style={styles.th}>Customer</th><th style={styles.th}>Type</th><th style={styles.th}>Amount</th><th style={styles.th}>Balance</th><th style={styles.th}>Description</th></tr></thead>
            <tbody>{filteredWallet.map(wt => (<tr key={wt.id}><td style={styles.td}>{wt.date}</td><td style={styles.td}>{wt.customer}</td><td style={styles.td}><StatusBadge status={wt.type} /></td><td style={styles.td}>₹{wt.amount}</td><td style={styles.td}>₹{wt.balance}</td><td style={styles.td}>{wt.description}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Payment Report Tab
  const renderPaymentReport = () => {
    const totalStats = paymentReport.reduce((acc, day) => ({
      totalOrders: acc.totalOrders + day.totalOrders,
      totalAmount: acc.totalAmount + day.totalAmount,
      razorpay: acc.razorpay + day.razorpay,
      cod: acc.cod + day.cod,
      wallet: acc.wallet + day.wallet,
      refunds: acc.refunds + day.refunds,
    }), { totalOrders: 0, totalAmount: 0, razorpay: 0, cod: 0, wallet: 0, refunds: 0 });

    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "20px" }}>
          <div style={{ background: isDark ? "#141824" : "#ffffff", padding: "16px", borderRadius: "12px", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Total Orders</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#3b82f6" }}>{totalStats.totalOrders}</div>
          </div>
          <div style={{ background: isDark ? "#141824" : "#ffffff", padding: "16px", borderRadius: "12px", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Total Revenue</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#22c55e" }}>₹{totalStats.totalAmount.toLocaleString()}</div>
          </div>
          <div style={{ background: isDark ? "#141824" : "#ffffff", padding: "16px", borderRadius: "12px", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Razorpay</div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "#8b5cf6" }}>₹{totalStats.razorpay.toLocaleString()}</div>
          </div>
          <div style={{ background: isDark ? "#141824" : "#ffffff", padding: "16px", borderRadius: "12px", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>COD</div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "#f59e0b" }}>₹{totalStats.cod.toLocaleString()}</div>
          </div>
          <div style={{ background: isDark ? "#141824" : "#ffffff", padding: "16px", borderRadius: "12px", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Wallet</div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "#ec4899" }}>₹{totalStats.wallet.toLocaleString()}</div>
          </div>
          <div style={{ background: isDark ? "#141824" : "#ffffff", padding: "16px", borderRadius: "12px", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Refunds</div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "#ef4444" }}>₹{totalStats.refunds.toLocaleString()}</div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Daily Payment Report</h3>
            <button style={styles.button("primary")} onClick={handleExportReport}><DownloadIcon /> Export Report</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Date</th><th style={styles.th}>Orders</th><th style={styles.th}>Total Amount</th><th style={styles.th}>Razorpay</th><th style={styles.th}>COD</th><th style={styles.th}>Wallet</th><th style={styles.th}>Refunds</th></tr></thead>
              <tbody>{paymentReport.map(day => (<tr key={day.date}><td style={styles.td}>{day.date}</td><td style={styles.td}>{day.totalOrders}</td><td style={styles.td}>₹{day.totalAmount.toLocaleString()}</td><td style={styles.td}>₹{day.razorpay.toLocaleString()}</td><td style={styles.td}>₹{day.cod.toLocaleString()}</td><td style={styles.td}>₹{day.wallet.toLocaleString()}</td><td style={styles.td}>₹{day.refunds.toLocaleString()}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Render Transaction History Tab
  const renderTransactionHistory = () => (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}> Transaction History</h3>
      </div>
      <div style={{ padding: "16px 20px", display: "flex", gap: "12px", flexWrap: "wrap", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
        <div style={styles.searchWrapper}>
          <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}></span>
          <input style={styles.searchInput} placeholder="Search by order ID, customer..." value={transactionSearch} onChange={(e) => setTransactionSearch(e.target.value)} />
        </div>
        <select style={styles.filterSelect} value={transactionFilter} onChange={(e) => setTransactionFilter(e.target.value)}>
          <option value="all">All Status</option><option value="Success">Success</option><option value="Pending">Pending</option><option value="Failed">Failed</option>
        </select>
        <button style={styles.button("secondary")}><RefreshIcon /> Refresh</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>TX ID</th><th style={styles.th}>Date</th><th style={styles.th}>Order ID</th><th style={styles.th}>Customer</th><th style={styles.th}>Amount</th><th style={styles.th}>Type</th><th style={styles.th}>Method</th><th style={styles.th}>Status</th></tr></thead>
          <tbody>{paginatedTransactions.map(tx => (<tr key={tx.id}><td style={styles.td}>{tx.id}</td><td style={styles.td}>{tx.date}</td><td style={styles.td}>{tx.orderId}</td><td style={styles.td}>{tx.customer}</td><td style={styles.td}>₹{tx.amount}</td><td style={styles.td}>{tx.type}</td><td style={styles.td}>{tx.paymentMethod}</td><td style={styles.td}><StatusBadge status={tx.status} /></td></tr>))}</tbody>
        </table>
      </div>
      {filteredTransactions.length > 0 && (
        <div style={styles.pagination}>
          <span>{Math.min((transactionPage - 1) * itemsPerPage + 1, filteredTransactions.length)} - {Math.min(transactionPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}</span>
          <div style={{ display: "flex", gap: "4px" }}>
            <button style={{ ...styles.pageBtn(transactionPage === 1, false), width: "28px", height: "28px", borderRadius: "6px" }} onClick={() => setTransactionPage(p => Math.max(1, p - 1))} disabled={transactionPage === 1}><ChevronLeftIcon /></button>
            <span style={{ padding: "4px 10px", fontSize: "12px" }}>{transactionPage} / {totalTransactionPages}</span>
            <button style={{ ...styles.pageBtn(transactionPage === totalTransactionPages, false), width: "28px", height: "28px", borderRadius: "6px" }} onClick={() => setTransactionPage(p => Math.min(totalTransactionPages, p + 1))} disabled={transactionPage === totalTransactionPages}><ChevronRightIcon /></button>
          </div>
        </div>
      )}
    </div>
  );

  // Render Refund Management Tab
  const renderRefundManagement = () => (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>↩ Refund Management</h3>
      </div>
      <div style={{ padding: "16px 20px", display: "flex", gap: "12px", flexWrap: "wrap", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
        <div style={styles.searchWrapper}>
          <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}></span>
          <input style={styles.searchInput} placeholder="Search by order ID, customer..." value={refundSearch} onChange={(e) => setRefundSearch(e.target.value)} />
        </div>
        <select style={styles.filterSelect} value={refundFilter} onChange={(e) => setRefundFilter(e.target.value)}>
          <option value="all">All Status</option><option value="Pending">Pending</option><option value="Processing">Processing</option><option value="Approved">Approved</option><option value="Completed">Completed</option>
        </select>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Refund ID</th><th style={styles.th}>Order ID</th><th style={styles.th}>Customer</th><th style={styles.th}>Amount</th><th style={styles.th}>Reason</th><th style={styles.th}>Date</th><th style={styles.th}>Method</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
          <tbody>{filteredRefunds.map(ref => (<tr key={ref.id}><td style={styles.td}>{ref.id}</td><td style={styles.td}>{ref.orderId}</td><td style={styles.td}>{ref.customer}</td><td style={styles.td}>₹{ref.amount}</td><td style={styles.td}>{ref.reason}</td><td style={styles.td}>{ref.date}</td><td style={styles.td}>{ref.refundMethod}</td><td style={styles.td}><StatusBadge status={ref.status} /></td><td style={styles.td}><button style={styles.button("primary")} onClick={() => { setSelectedRefund(ref); setShowRefundModal(true); }}>View</button></td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );

  // Add Money Modal
  const AddMoneyModal = () => (
    <div onClick={() => setShowAddMoneyModal(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#141824" : "#ffffff", borderRadius: "16px", padding: "24px", width: "400px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}><h3 style={{ margin: 0 }}>Add Money to Wallet</h3><button onClick={() => setShowAddMoneyModal(false)}><CloseIcon /></button></div>
        <div style={{ marginBottom: "16px" }}><label>Amount (Min ₹{walletConfig.minAddAmount})</label><input type="number" style={styles.input} value={addMoneyAmount} onChange={(e) => setAddMoneyAmount(e.target.value)} placeholder="Enter amount" /></div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}><button style={styles.button("secondary")} onClick={() => setShowAddMoneyModal(false)}>Cancel</button><button style={styles.button("success")} onClick={handleAddMoney}>Add Money</button></div>
      </div>
    </div>
  );

  // Refund Detail Modal
  const RefundDetailModal = () => (
    <div onClick={() => setShowRefundModal(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#141824" : "#ffffff", borderRadius: "16px", padding: "24px", width: "450px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}><h3 style={{ margin: 0 }}>Refund Request Details</h3><button onClick={() => setShowRefundModal(false)}><CloseIcon /></button></div>
        {selectedRefund && (<div><div style={{ marginBottom: "12px" }}><label>Refund ID</label><div>{selectedRefund.id}</div></div><div style={{ marginBottom: "12px" }}><label>Order ID</label><div>{selectedRefund.orderId}</div></div><div style={{ marginBottom: "12px" }}><label>Customer</label><div>{selectedRefund.customer}</div></div><div style={{ marginBottom: "12px" }}><label>Amount</label><div style={{ fontSize: "20px", fontWeight: 700, color: "#3b82f6" }}>₹{selectedRefund.amount}</div></div><div style={{ marginBottom: "12px" }}><label>Reason</label><div>{selectedRefund.reason}</div></div><div style={{ marginBottom: "12px" }}><label>Refund Method</label><div>{selectedRefund.refundMethod}</div></div><div style={{ marginBottom: "12px" }}><label>Status</label><div><StatusBadge status={selectedRefund.status} /></div></div><div style={{ display: "flex", gap: "10px", marginTop: "20px" }}><button style={styles.button("danger")} onClick={() => handleRefundAction(selectedRefund, "reject")}>Reject</button><button style={styles.button("success")} onClick={() => handleRefundAction(selectedRefund, "approve")}>Approve Refund</button></div></div>)}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Payment Management</h1>
          <p style={styles.subtitle}>Configure payment gateways, manage transactions, and handle refunds</p>
        </div>

        <div style={styles.tabsContainer}>
          {tabs.map(tab => (
            <button key={tab.id} style={styles.tabButton(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "settings" && renderRazorpaySettings()}
        {activeTab === "cod" && renderCODSettings()}
        {activeTab === "wallet" && renderWalletSettings()}
        {activeTab === "report" && renderPaymentReport()}
        {activeTab === "transactions" && renderTransactionHistory()}
        {activeTab === "refunds" && renderRefundManagement()}
      </div>

      {showAddMoneyModal && <AddMoneyModal />}
      {showRefundModal && <RefundDetailModal />}
    </div>
  );
};

export default PaymentSettings;