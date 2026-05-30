import React, { useState, } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_BANNERS = [
  { id: "BNR_001", title: "Summer Sale", subtitle: "Get 50% off on all orders", image: "https://via.placeholder.com/1200x400", status: "Active", order: 1, link: "/summer-sale", createdAt: "2024-01-01" },
  { id: "BNR_002", title: "Weekend Special", subtitle: "Free delivery on orders above ₹499", image: "https://via.placeholder.com/1200x400", status: "Active", order: 2, link: "/weekend-special", createdAt: "2024-01-15" },
  { id: "BNR_003", title: "Festival Offer", subtitle: "Flat ₹100 off", image: "https://via.placeholder.com/1200x400", status: "Inactive", order: 3, link: "/festival-offer", createdAt: "2024-02-01" },
];

const DUMMY_RESTAURANTS = [
  { id: "RST_001", name: "Pizza Hut", email: "contact@pizzahut.com", phone: "+91 98765 43210", address: "MG Road, Delhi", status: "Active", rating: 4.5, totalOrders: 1250, image: "https://via.placeholder.com/200x150", createdAt: "2024-01-01" },
  { id: "RST_002", name: "McDonald's", email: "contact@mcdonalds.com", phone: "+91 87654 32109", address: "Connaught Place, Delhi", status: "Active", rating: 4.3, totalOrders: 980, image: "https://via.placeholder.com/200x150", createdAt: "2024-01-10" },
  { id: "RST_003", name: "KFC", email: "contact@kfc.com", phone: "+91 76543 21098", address: "Saket, Delhi", status: "Inactive", rating: 4.2, totalOrders: 750, image: "https://via.placeholder.com/200x150", createdAt: "2024-01-20" },
];

const DUMMY_RIDERS = [
  { id: "RDR_001", name: "Rajesh Kumar", email: "rajesh@rider.com", phone: "+91 98765 43210", city: "Delhi", status: "Active", totalDeliveries: 450, rating: 4.8, vehicle: "Bike", createdAt: "2024-01-01" },
  { id: "RDR_002", name: "Suresh Singh", email: "suresh@rider.com", phone: "+91 87654 32109", city: "Delhi", status: "Active", totalDeliveries: 320, rating: 4.6, vehicle: "Scooter", createdAt: "2024-01-15" },
  { id: "RDR_003", name: "Amit Patel", email: "amit@rider.com", phone: "+91 76543 21098", city: "Noida", status: "Inactive", totalDeliveries: 180, rating: 4.4, vehicle: "Bike", createdAt: "2024-02-01" },
];

const DUMMY_PAGES = {
  aboutUs: { id: "about", title: "About Us", content: "We are the leading food delivery platform in India, connecting thousands of restaurants with millions of happy customers. Our mission is to deliver happiness, one meal at a time.", lastUpdated: "2024-02-01" },
  privacyPolicy: { id: "privacy", title: "Privacy Policy", content: "We value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.", lastUpdated: "2024-01-15" },
  termsConditions: { id: "terms", title: "Terms and Conditions", content: "By using our platform, you agree to these terms. Please read them carefully before placing any order.", lastUpdated: "2024-01-10" },
  refundPolicy: { id: "refund", title: "Refund Policy", content: "If you're not satisfied with your order, you may be eligible for a refund within 7 days of delivery. Contact our support team for assistance.", lastUpdated: "2024-01-20" },
};

const DUMMY_CONTACT = {
  email: "support@fooddelivery.com",
  phone: "+91 98765 43210",
  address: "123, Connaught Place, New Delhi - 110001",
  workingHours: "9:00 AM - 9:00 PM (Mon-Sun)",
  socialMedia: {
    facebook: "https://facebook.com/fooddelivery",
    instagram: "https://instagram.com/fooddelivery",
    twitter: "https://twitter.com/fooddelivery",
  }
};

const DUMMY_NEWS = [
  { id: "NEWS_001", title: "New Restaurant Partners", content: "We've added 50+ new restaurants to our platform", date: "2024-02-15", status: "Published", author: "Admin", image: "https://via.placeholder.com/400x200" },
  { id: "NEWS_002", title: "Festival Discount", content: "Get flat 30% off on first 3 orders", date: "2024-02-10", status: "Published", author: "Admin", image: "https://via.placeholder.com/400x200" },
  { id: "NEWS_003", title: "New Feature Launch", content: "Track your order live with GPS", date: "2024-02-05", status: "Draft", author: "Admin", image: "https://via.placeholder.com/400x200" },
];

const DUMMY_BLOG = [
  { id: "BLOG_001", title: "Top 10 Restaurants in Delhi", content: "Discover the best dining spots in the capital", date: "2024-02-01", status: "Published", author: "Food Critic", category: "Recommendations", image: "https://via.placeholder.com/600x300" },
  { id: "BLOG_002", title: "Healthy Eating Tips", content: "How to maintain a balanced diet while ordering online", date: "2024-01-25", status: "Published", author: "Nutritionist", category: "Health", image: "https://via.placeholder.com/600x300" },
  { id: "BLOG_003", title: "Behind the Scenes", content: "How we ensure quality delivery", date: "2024-01-20", status: "Draft", author: "Admin", category: "Behind Scenes", image: "https://via.placeholder.com/600x300" },
];

const DUMMY_FAQ = [
  { id: "FAQ_001", question: "How do I place an order?", answer: "Simply browse restaurants, select your items, add to cart, and proceed to checkout.", category: "Orders", order: 1, status: "Active" },
  { id: "FAQ_002", question: "What payment methods are accepted?", answer: "We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery.", category: "Payments", order: 2, status: "Active" },
  { id: "FAQ_003", question: "How can I track my order?", answer: "You can track your order in real-time from the Orders section in your account.", category: "Orders", order: 3, status: "Active" },
  { id: "FAQ_004", question: "What is the delivery time?", answer: "Delivery typically takes 30-45 minutes depending on your location.", category: "Delivery", order: 4, status: "Active" },
  { id: "FAQ_005", question: "How do I cancel my order?", answer: "Orders can be cancelled within 5 minutes of placing them.", category: "Orders", order: 5, status: "Inactive" },
];

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
  Home: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
  Banner: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="21" x2="8" y2="15"/><line x1="16" y1="21" x2="16" y2="15"/><line x1="2" y1="9" x2="22" y2="9"/></svg>),
  Restaurant: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18V3H3z"/><circle cx="12" cy="12" r="3"/><path d="M8 7v4M16 7v4"/></svg>),
  Rider: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M5 17h14V5H5z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/></svg>),
  About: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/></svg>),
  Contact: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
  News: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg>),
  Blog: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>),
  Policy: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L3 7v7c0 5 9 8 9 8s9-3 9-8V7l-9-5z"/></svg>),
  Terms: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>),
  Refund: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>),
  FAQ: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>),
  Plus: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
  Edit: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>),
  Trash: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>),
  Search: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  ChevronLeft: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>),
  ChevronRight: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>),
  Close: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  Check: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>),
  Eye: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>),
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const StatusBadge = ({ status, ts }) => {
  const config = { Active: { bg: "rgba(16,185,129,0.12)", color: ts.success }, Published: { bg: "rgba(16,185,129,0.12)", color: ts.success }, Draft: { bg: "rgba(245,158,11,0.12)", color: ts.warning }, Inactive: { bg: "rgba(107,114,128,0.12)", color: ts.textMuted } };
  const c = config[status] || config.Inactive;
  return (<span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", background: c.bg, color: c.color, fontSize: "11px", fontWeight: 600 }}><div style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.color }} />{status}</span>);
};

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
const WebsiteManagement = ({ isDark = true }) => {
  const ts = getThemeStyles(isDark)[isDark ? "dark" : "light"];

  const [activeTab, setActiveTab] = useState("banners");
  const [banners, ] = useState(DUMMY_BANNERS);
  const [restaurants ] = useState(DUMMY_RESTAURANTS);
  const [riders, ] = useState(DUMMY_RIDERS);
  const [pages] = useState(DUMMY_PAGES);
  const [contact] = useState(DUMMY_CONTACT);
  const [news,] = useState(DUMMY_NEWS);
  const [blog, ] = useState(DUMMY_BLOG);
  const [faq, ] = useState(DUMMY_FAQ);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [ setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3500); };

  const handleAdd = () => { setFormData({}); setSelectedItem(null); setShowAddModal(true); };
  const handleEdit = (item) => { setSelectedItem(item); setFormData(item); setShowEditModal(true); };
  const handleSave = () => { showToast(`${activeTab.slice(0, -1)} ${showAddModal ? "added" : "updated"} successfully`); setShowAddModal(false); setShowEditModal(false); };

  const styles = {
    container: { minHeight: "100vh", background: ts.background, padding: "28px 32px", fontFamily: "'Inter', 'DM Sans', sans-serif" },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" },
    title: { fontSize: "28px", fontWeight: 700, background: ts.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
    subtitle: { fontSize: "13px", color: ts.textMuted, marginLeft: "12px" },
    tabs: { display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap", borderBottom: `1px solid ${ts.border}`, paddingBottom: "12px" },
    tab: (isActive) => ({ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "12px", background: isActive ? ts.primary : "transparent", color: isActive ? "white" : ts.textSecondary, cursor: "pointer", border: "none", fontSize: "14px", fontWeight: 500 }),
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" },
    sectionTitle: { fontSize: "18px", fontWeight: 600, color: ts.text },
    addBtn: { background: ts.gradient, border: "none", padding: "10px 20px", borderRadius: "12px", color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px" },
    searchBar: { display: "flex", alignItems: "center", gap: "12px", background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "14px", padding: "10px 16px", marginBottom: "20px" },
    searchInput: { flex: 1, background: "transparent", border: "none", outline: "none", color: ts.text, fontSize: "13px" },
    tableWrapper: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "20px", overflow: "hidden" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "800px" },
    th: { padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: ts.primary, borderBottom: `1px solid ${ts.border}`, background: ts.surfaceLighter },
    td: { padding: "16px", borderBottom: `1px solid ${ts.border}`, fontSize: "13px", color: ts.textSecondary },
    contentCard: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "20px", padding: "24px", marginBottom: "20px" },
    contentTitle: { fontSize: "16px", fontWeight: 600, color: ts.text, marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    contentText: { fontSize: "13px", color: ts.textSecondary, lineHeight: "1.6", marginBottom: "16px" },
    contactInfo: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "20px" },
    contactItem: { background: ts.surfaceLighter, padding: "16px", borderRadius: "16px", border: `1px solid ${ts.border}` },
    contactLabel: { fontSize: "11px", color: ts.textMuted, marginBottom: "4px", textTransform: "uppercase" },
    contactValue: { fontSize: "14px", fontWeight: 500, color: ts.text },
    modalOverlay: { position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" },
    modal: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "24px", width: "550px", maxHeight: "85vh", overflow: "auto" },
    modalHeader: { padding: "20px 24px", borderBottom: `1px solid ${ts.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "18px", fontWeight: 700, color: ts.text, display: "flex", alignItems: "center", gap: "10px" },
    modalBody: { padding: "24px" },
    formGroup: { marginBottom: "18px" },
    label: { display: "block", fontSize: "12px", fontWeight: 600, color: ts.textMuted, marginBottom: "6px", letterSpacing: "0.3px" },
    input: { width: "100%", padding: "10px 14px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "12px", fontSize: "13px", color: ts.text, outline: "none" },
    textarea: { width: "100%", padding: "10px 14px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "12px", fontSize: "13px", color: ts.text, outline: "none", resize: "vertical", minHeight: "120px" },
    select: { width: "100%", padding: "10px 14px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "12px", fontSize: "13px", color: ts.text, cursor: "pointer" },
    modalFooter: { padding: "16px 24px", borderTop: `1px solid ${ts.border}`, display: "flex", gap: "12px", justifyContent: "flex-end" },
    btnCancel: { padding: "10px 20px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "12px", color: ts.textSecondary, cursor: "pointer" },
    btnSave: { padding: "10px 20px", background: ts.gradient, border: "none", borderRadius: "12px", color: "white", cursor: "pointer", fontWeight: 600 },
    faqItem: { background: ts.surfaceLighter, padding: "16px", borderRadius: "16px", marginBottom: "12px", cursor: "pointer", transition: "all 0.2s" },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); }
        * { transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
      `}</style>

      {/* Header */}
      <div style={styles.topBar}>
        <div><h1 style={styles.title}>Website Management</h1><span style={styles.subtitle}>Manage your website content, pages & listings</span></div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === "banners")} onClick={() => setActiveTab("banners")}><Icons.Banner /> Homepage Banners</button>
        <button style={styles.tab(activeTab === "restaurants")} onClick={() => setActiveTab("restaurants")}><Icons.Restaurant /> Restaurants</button>
        <button style={styles.tab(activeTab === "riders")} onClick={() => setActiveTab("riders")}><Icons.Rider /> Riders</button>
        <button style={styles.tab(activeTab === "about")} onClick={() => setActiveTab("about")}><Icons.About /> About Us</button>
        <button style={styles.tab(activeTab === "contact")} onClick={() => setActiveTab("contact")}><Icons.Contact /> Contact</button>
        <button style={styles.tab(activeTab === "news")} onClick={() => setActiveTab("news")}><Icons.News /> News</button>
        <button style={styles.tab(activeTab === "blog")} onClick={() => setActiveTab("blog")}><Icons.Blog /> Blog</button>
        <button style={styles.tab(activeTab === "privacy")} onClick={() => setActiveTab("privacy")}><Icons.Policy /> Privacy Policy</button>
        <button style={styles.tab(activeTab === "terms")} onClick={() => setActiveTab("terms")}><Icons.Terms /> Terms & Conditions</button>
        <button style={styles.tab(activeTab === "refund")} onClick={() => setActiveTab("refund")}><Icons.Refund /> Refund Policy</button>
        <button style={styles.tab(activeTab === "faq")} onClick={() => setActiveTab("faq")}><Icons.FAQ /> FAQ</button>
      </div>

      {/* Banners Tab */}
      {activeTab === "banners" && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>Homepage Banners</h2><button style={styles.addBtn} onClick={handleAdd}><Icons.Plus /> Add Banner</button></div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Order</th><th style={styles.th}>Title</th><th style={styles.th}>Subtitle</th><th style={styles.th}>Link</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
              <tbody>{banners.map(banner => (<tr key={banner.id}><td style={styles.td}>{banner.order}</td><td style={styles.td}><strong>{banner.title}</strong></td><td style={styles.td}>{banner.subtitle}</td><td style={styles.td}>{banner.link}</td><td style={styles.td}><StatusBadge status={banner.status} ts={ts} /></td><td style={styles.td}><button onClick={() => handleEdit(banner)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></td></tr>))}</tbody>
            </table>
          </div>
        </>
      )}

      {/* Restaurants Tab */}
      {activeTab === "restaurants" && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>Restaurant Listings</h2><button style={styles.addBtn} onClick={handleAdd}><Icons.Plus /> Add Restaurant</button></div>
          <div style={styles.searchBar}><Icons.Search /><input style={styles.searchInput} placeholder="Search restaurants..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Address</th><th style={styles.th}>Rating</th><th style={styles.th}>Orders</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
              <tbody>{restaurants.filter(r => r.name.toLowerCase().includes(search.toLowerCase())).map(rest => (<tr key={rest.id}><td style={styles.td}><strong>{rest.name}</strong><br /><span style={{ fontSize: "11px", color: ts.textMuted }}>{rest.phone}</span></td><td style={styles.td}>{rest.address}</td><td style={styles.td}>⭐ {rest.rating}</td><td style={styles.td}>{rest.totalOrders}</td><td style={styles.td}><StatusBadge status={rest.status} ts={ts} /></td><td style={styles.td}><button onClick={() => handleEdit(rest)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></td></tr>))}</tbody>
            </table>
          </div>
        </>
      )}

      {/* Riders Tab */}
      {activeTab === "riders" && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>Rider Listings</h2><button style={styles.addBtn} onClick={handleAdd}><Icons.Plus /> Add Rider</button></div>
          <div style={styles.searchBar}><Icons.Search /><input style={styles.searchInput} placeholder="Search riders..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>City</th><th style={styles.th}>Vehicle</th><th style={styles.th}>Deliveries</th><th style={styles.th}>Rating</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
              <tbody>{riders.filter(r => r.name.toLowerCase().includes(search.toLowerCase())).map(rider => (<tr key={rider.id}><td style={styles.td}><strong>{rider.name}</strong><br /><span style={{ fontSize: "11px", color: ts.textMuted }}>{rider.phone}</span></td><td style={styles.td}>{rider.city}</td><td style={styles.td}>{rider.vehicle}</td><td style={styles.td}>{rider.totalDeliveries}</td><td style={styles.td}>⭐ {rider.rating}</td><td style={styles.td}><StatusBadge status={rider.status} ts={ts} /></td><td style={styles.td}><button onClick={() => handleEdit(rider)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></td></tr>))}</tbody>
            </table>
          </div>
        </>
      )}

      {/* About Us Tab */}
      {activeTab === "about" && (
        <div style={styles.contentCard}>
          <div style={styles.contentTitle}><span>About Us</span><button onClick={() => handleEdit(pages.aboutUs)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></div>
          <div style={styles.contentText}>{pages.aboutUs.content}</div>
          <div style={{ fontSize: "11px", color: ts.textMuted }}>Last updated: {pages.aboutUs.lastUpdated}</div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <div style={styles.contentCard}>
          <div style={styles.contentTitle}><span>Contact Information</span><button onClick={() => handleEdit(contact)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></div>
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}><div style={styles.contactLabel}>Email</div><div style={styles.contactValue}>{contact.email}</div></div>
            <div style={styles.contactItem}><div style={styles.contactLabel}>Phone</div><div style={styles.contactValue}>{contact.phone}</div></div>
            <div style={styles.contactItem}><div style={styles.contactLabel}>Address</div><div style={styles.contactValue}>{contact.address}</div></div>
            <div style={styles.contactItem}><div style={styles.contactLabel}>Working Hours</div><div style={styles.contactValue}>{contact.workingHours}</div></div>
          </div>
        </div>
      )}

      {/* News Tab */}
      {activeTab === "news" && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>News Management</h2><button style={styles.addBtn} onClick={handleAdd}><Icons.Plus /> Add News</button></div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Title</th><th style={styles.th}>Date</th><th style={styles.th}>Author</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
              <tbody>{news.map(item => (<tr key={item.id}><td style={styles.td}><strong>{item.title}</strong><br /><span style={{ fontSize: "11px", color: ts.textMuted }}>{item.content.substring(0, 60)}...</span></td><td style={styles.td}>{item.date}</td><td style={styles.td}>{item.author}</td><td style={styles.td}><StatusBadge status={item.status} ts={ts} /></td><td style={styles.td}><button onClick={() => handleEdit(item)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></td></tr>))}</tbody>
            </table>
          </div>
        </>
      )}

      {/* Blog Tab */}
      {activeTab === "blog" && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>Blog Management</h2><button style={styles.addBtn} onClick={handleAdd}><Icons.Plus /> Add Blog Post</button></div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Title</th><th style={styles.th}>Category</th><th style={styles.th}>Date</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
              <tbody>{blog.map(post => (<tr key={post.id}><td style={styles.td}><strong>{post.title}</strong></td><td style={styles.td}>{post.category}</td><td style={styles.td}>{post.date}</td><td style={styles.td}><StatusBadge status={post.status} ts={ts} /></td><td style={styles.td}><button onClick={() => handleEdit(post)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></td></tr>))}</tbody>
            </table>
          </div>
        </>
      )}

      {/* Privacy Policy Tab */}
      {activeTab === "privacy" && (
        <div style={styles.contentCard}>
          <div style={styles.contentTitle}><span>Privacy Policy</span><button onClick={() => handleEdit(pages.privacyPolicy)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></div>
          <div style={styles.contentText}>{pages.privacyPolicy.content}</div>
          <div style={{ fontSize: "11px", color: ts.textMuted }}>Last updated: {pages.privacyPolicy.lastUpdated}</div>
        </div>
      )}

      {/* Terms & Conditions Tab */}
      {activeTab === "terms" && (
        <div style={styles.contentCard}>
          <div style={styles.contentTitle}><span>Terms and Conditions</span><button onClick={() => handleEdit(pages.termsConditions)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></div>
          <div style={styles.contentText}>{pages.termsConditions.content}</div>
          <div style={{ fontSize: "11px", color: ts.textMuted }}>Last updated: {pages.termsConditions.lastUpdated}</div>
        </div>
      )}

      {/* Refund Policy Tab */}
      {activeTab === "refund" && (
        <div style={styles.contentCard}>
          <div style={styles.contentTitle}><span>Refund Policy</span><button onClick={() => handleEdit(pages.refundPolicy)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></div>
          <div style={styles.contentText}>{pages.refundPolicy.content}</div>
          <div style={{ fontSize: "11px", color: ts.textMuted }}>Last updated: {pages.refundPolicy.lastUpdated}</div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>FAQ Management</h2><button style={styles.addBtn} onClick={handleAdd}><Icons.Plus /> Add FAQ</button></div>
          <div>{faq.map(faqItem => (<div key={faqItem.id} style={styles.faqItem}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}><span style={{ fontWeight: 600, color: ts.text }}>{faqItem.question}</span><button onClick={() => handleEdit(faqItem)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></div><div style={{ fontSize: "13px", color: ts.textSecondary }}>{faqItem.answer}</div><div style={{ display: "flex", gap: "12px", marginTop: "8px" }}><span style={{ fontSize: "11px", color: ts.textMuted }}>{faqItem.category}</span><StatusBadge status={faqItem.status} ts={ts} /></div></div>))}</div>
        </>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (<div style={styles.modalOverlay} onClick={() => { setShowAddModal(false); setShowEditModal(false); }}><div style={styles.modal} onClick={e => e.stopPropagation()}><div style={styles.modalHeader}><div style={styles.modalTitle}>{showAddModal ? "Add" : "Edit"} {activeTab.slice(0, -1)}</div><button onClick={() => { setShowAddModal(false); setShowEditModal(false); }}><Icons.Close /></button></div><div style={styles.modalBody}><div style={styles.formGroup}><label style={styles.label}>Title / Name</label><input style={styles.input} value={formData.title || formData.name || ""} onChange={e => setFormData({ ...formData, [formData.title ? "title" : "name"]: e.target.value })} /></div><div style={styles.formGroup}><label style={styles.label}>Content / Description</label><textarea style={styles.textarea} value={formData.content || formData.description || ""} onChange={e => setFormData({ ...formData, [formData.content ? "content" : "description"]: e.target.value })} /></div><div style={styles.formGroup}><label style={styles.label}>Status</label><select style={styles.select} value={formData.status || "Active"} onChange={e => setFormData({ ...formData, status: e.target.value })}><option>Active</option><option>Inactive</option><option>Published</option><option>Draft</option></select></div></div><div style={styles.modalFooter}><button style={styles.btnCancel} onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>Cancel</button><button style={styles.btnSave} onClick={handleSave}>Save</button></div></div></div>)}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} ts={ts} />}
    </div>
  );
};

const Website = ({ isDark = true }) => {
  return <WebsiteManagement isDark={isDark} />;
};

export default Website;