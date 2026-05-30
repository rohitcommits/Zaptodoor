import React, { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// API CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://your-api.com/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
});

// ─────────────────────────────────────────────────────────────────────────────
// API FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────
const apiCreateCoupon = async (payload) => {
  const res = await fetch(`${API_BASE}/coupons`, { method: "POST", headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiUpdateCoupon = async (id, payload) => {
  const res = await fetch(`${API_BASE}/coupons/${id}`, { method: "PUT", headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiDeleteCoupons = async (ids) => {
  const res = await fetch(`${API_BASE}/coupons/bulk-delete`, { method: "DELETE", headers: getAuthHeaders(), body: JSON.stringify({ ids }) });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_COUPONS = [
  { id: "CPN_001", code: "WELCOME20", type: "Promo Code", discount: "20%", discountType: "percentage", maxDiscount: "₹500", minOrder: "₹999", validFrom: "2024-01-01", validTo: "2024-12-31", usageLimit: 1000, usedCount: 345, status: "Active", description: "Welcome discount for new users", applicableOn: "All Products", createdAt: "2024-01-01" },
  { id: "CPN_002", code: "FLAT100", type: "Coupon", discount: "₹100", discountType: "fixed", maxDiscount: "₹100", minOrder: "₹499", validFrom: "2024-02-01", validTo: "2024-03-31", usageLimit: 500, usedCount: 128, status: "Active", description: "Flat ₹100 off on orders above ₹499", applicableOn: "Food & Beverages", createdAt: "2024-02-01" },
  { id: "CPN_003", code: "FESTIVE50", type: "Promo Code", discount: "50%", discountType: "percentage", maxDiscount: "₹1000", minOrder: "₹1999", validFrom: "2024-03-01", validTo: "2024-03-15", usageLimit: 200, usedCount: 67, status: "Active", description: "Festival special 50% off", applicableOn: "All Categories", createdAt: "2024-03-01" },
  { id: "CPN_004", code: "NEWUSER30", type: "Fisherial", discount: "30%", discountType: "percentage", maxDiscount: "₹750", minOrder: "₹1499", validFrom: "2024-01-15", validTo: "2024-06-30", usageLimit: 1000, usedCount: 892, status: "Active", description: "First time user special", applicableOn: "First Order", createdAt: "2024-01-15" },
  { id: "CPN_005", code: "FLAT250", type: "Coupon", discount: "₹250", discountType: "fixed", maxDiscount: "₹250", minOrder: "₹1499", validFrom: "2024-02-10", validTo: "2024-03-10", usageLimit: 300, usedCount: 45, status: "Expired", description: "Flat ₹250 off", applicableOn: "Minimum ₹1499 order", createdAt: "2024-02-10" },
  { id: "CPN_006", code: "REFERRAL15", type: "Fisherial", discount: "15%", discountType: "percentage", maxDiscount: "₹300", minOrder: "₹599", validFrom: "2024-01-01", validTo: "2024-12-31", usageLimit: 5000, usedCount: 1234, status: "Active", description: "Referral reward", applicableOn: "All Orders", createdAt: "2024-01-01" },
  { id: "CPN_007", code: "WEEKEND10", type: "Promo Code", discount: "10%", discountType: "percentage", maxDiscount: "₹200", minOrder: "₹799", validFrom: "2024-03-01", validTo: "2024-03-31", usageLimit: 1000, usedCount: 0, status: "Inactive", description: "Weekend special", applicableOn: "Weekend orders", createdAt: "2024-03-01" },
];

// ─────────────────────────────────────────────────────────────────────────────
// THEME STYLES (matching dashboard exactly)
// ─────────────────────────────────────────────────────────────────────────────
const getThemeStyles = (isDark) => ({
  dark: {
    background: "#0d1117",
    surface: "#141824",
    surfaceLighter: "#1a2035",
    surfaceLightest: "#1e2740",
    border: "#1e2740",
    borderLight: "#2a3145",
    text: "#f1f5f9",
    textPrimary: "#f1f5f9",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    textDim: "#3a4460",
    textOnPrimary: "#ffffff",
    primary: "#3b82f6",
    primaryDark: "#2563eb",
    primaryLight: "#93c5fd",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    glass: "rgba(30, 34, 58, 0.9)",
    placeholder: "#4a4f6e",
  },
  light: {
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceLighter: "#f1f5f9",
    surfaceLightest: "#f8fafc",
    border: "#e2e8f0",
    borderLight: "#cbd5e1",
    text: "#0f172a",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    textMuted: "#64748b",
    textDim: "#94a3b8",
    textOnPrimary: "#ffffff",
    primary: "#6366f1",
    primaryDark: "#4f46e5",
    primaryLight: "#818cf8",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    glass: "rgba(255, 255, 255, 0.9)",
    placeholder: "#9ca3af",
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSIONAL ICONS
// ─────────────────────────────────────────────────────────────────────────────
const CouponIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4M4 6v12c0 1.1.9 2 2 2h14v-6M6 16h.01"/><path d="M13 8h6M13 12h6M13 16h6"/></svg>);
const PlusIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const EditIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>);
const SearchIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const ChevronLeftIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>);
const ChevronRightIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>);
const SpinnerIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" style={{ animation: "spin 0.8s linear infinite", transformOrigin: "center" }}/></svg>);
const CalendarIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const UsersIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const PercentageIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>);
const RupeeIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h12M6 8h12M6 13h6"/><path d="M16 13a5 5 0 1 1 0 10"/></svg>);
const TagIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>);
const CopyIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>);
const CloseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const CheckCircleIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg>);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const StatusBadge = ({ status, ts }) => {
  const config = { 
    Active: { bg: "rgba(16,185,129,0.15)", color: ts.success, dot: ts.success }, 
    Inactive: { bg: "rgba(107,114,128,0.12)", color: ts.textMuted, dot: ts.textMuted }, 
    Expired: { bg: "rgba(239,68,68,0.12)", color: ts.error, dot: ts.error } 
  };
  const c = config[status] || config.Inactive;
  return (<div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 10px 3px 8px", borderRadius: "20px", background: c.bg, border: `1px solid ${c.bg}` }}><div style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.dot }} /><span style={{ fontSize: "11px", fontWeight: 600, color: c.color }}>{status}</span></div>);
};

const DiscountBadge = ({ discount, type, ts }) => {
  return (<span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: ts.primaryDark, padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: ts.primaryLight }}>{type === "percentage" ? <PercentageIcon /> : <RupeeIcon />}{discount}</span>);
};

const Checkbox = ({ checked, onChange, ts }) => (<div onClick={onChange} style={{ width: "16px", height: "16px", borderRadius: "4px", border: checked ? `2px solid ${ts.primary}` : `2px solid ${ts.textDim}`, background: checked ? ts.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{checked && <CheckCircleIcon />}</div>);

const Toast = ({ message, type, onClose, ts }) => (<div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 999, background: ts.surface, border: `1px solid ${type === "error" ? ts.error : ts.success}`, borderRadius: "10px", padding: "12px 18px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", animation: "slideUp 0.25s ease" }}><div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? ts.error : ts.success, flexShrink: 0 }} /><span style={{ fontSize: "13px", color: type === "error" ? ts.error : ts.success, flex: 1 }}>{message}</span><span onClick={onClose} style={{ cursor: "pointer", color: ts.textMuted, fontSize: "16px", lineHeight: 1 }}>×</span></div>);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT (Updated to accept isDark prop)
// ─────────────────────────────────────────────────────────────────────────────
const CouponsTable = ({ isDark = true }) => {
  const ts = getThemeStyles(isDark)[isDark ? 'dark' : 'light'];

  const [coupons, setCoupons] = useState(DUMMY_COUPONS);
  const [total, setTotal] = useState(DUMMY_COUPONS.length);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "", type: "Promo Code", discount: "", discountType: "percentage", maxDiscount: "", minOrder: "",
    validFrom: "", validTo: "", usageLimit: "", description: "", applicableOn: "All Products", status: "Active"
  });
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3500); };

  useEffect(() => { const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 500); return () => clearTimeout(t); }, [search]);

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      let filtered = [...DUMMY_COUPONS];
      if (debouncedSearch) filtered = filtered.filter(c => c.code.toLowerCase().includes(debouncedSearch.toLowerCase()) || c.description.toLowerCase().includes(debouncedSearch.toLowerCase()));
      if (statusFilter !== "All") filtered = filtered.filter(c => c.status === statusFilter);
      if (typeFilter !== "All") filtered = filtered.filter(c => c.type === typeFilter);
      const start = (page - 1) * perPage;
      setCoupons(filtered.slice(start, start + perPage));
      setTotal(filtered.length);
    } catch (err) { showToast(`Failed to load: ${err.message}`, "error"); } finally { setLoading(false); }
  }, [page, perPage, debouncedSearch, statusFilter, typeFilter]);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const mappedCoupons = coupons.map((c, idx) => ({ ...c, sn: ((page - 1) * perPage + idx + 1) }));
  const pageIds = mappedCoupons.map(c => c.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.has(id));
  const toggleAll = () => { setSelected(prev => { const next = new Set(prev); allPageSelected ? pageIds.forEach(id => next.delete(id)) : pageIds.forEach(id => next.add(id)); return next; }); };
  const toggleOne = (id) => { setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }); };
  const clearSelection = () => setSelected(new Set());

  const handleCreateCoupon = async () => {
    if (!formData.code || !formData.discount) { showToast("Please fill required fields", "error"); return; }
    setActionLoading(true);
    try {
      await apiCreateCoupon(formData);
      showToast("Coupon created successfully");
      setShowAddModal(false);
      setFormData({ code: "", type: "Promo Code", discount: "", discountType: "percentage", maxDiscount: "", minOrder: "", validFrom: "", validTo: "", usageLimit: "", description: "", applicableOn: "All Products", status: "Active" });
      fetchCoupons();
    } catch (err) { showToast(`Create failed: ${err.message}`, "error"); } finally { setActionLoading(false); }
  };

  const handleEditCoupon = (coupon) => { setSelectedCoupon(coupon); setFormData(coupon); setShowEditModal(true); };
  const handleUpdateCoupon = async () => { setActionLoading(true); try { await apiUpdateCoupon(selectedCoupon.id, formData); showToast("Coupon updated successfully"); setShowEditModal(false); fetchCoupons(); } catch (err) { showToast(`Update failed: ${err.message}`, "error"); } finally { setActionLoading(false); } };
  const handleDeleteSelected = async () => { setActionLoading(true); try { await apiDeleteCoupons(Array.from(selected)); showToast(`${selected.size} coupon(s) deleted`); clearSelection(); setConfirmDelete(false); fetchCoupons(); } catch (err) { showToast(`Delete failed: ${err.message}`, "error"); } finally { setActionLoading(false); } };
  const copyToClipboard = (code) => { navigator.clipboard.writeText(code); showToast(`Copied: ${code}`); };

  const totalPages = Math.ceil(total / perPage);

  const styles = {
    container: { minHeight: "100vh", background: ts.background, padding: "24px", fontFamily: "'Inter', sans-serif" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" },
    title: { display: "flex", alignItems: "center", gap: "12px" },
    titleIcon: { background: ts.gradient, padding: "10px", borderRadius: "12px", color: "white" },
    titleText: { fontSize: "24px", fontWeight: 700, color: ts.textPrimary },
    addBtn: { background: ts.gradient, border: "none", padding: "12px 24px", borderRadius: "10px", color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" },
    filtersBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "15px" },
    searchWrapper: { position: "relative", flex: 1, maxWidth: "350px" },
    searchInput: { width: "100%", padding: "12px 16px 12px 42px", background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "10px", fontSize: "13px", color: ts.text, outline: "none" },
    searchIcon: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: ts.primary },
    filterGroup: { display: "flex", gap: "12px", alignItems: "center" },
    filterBtn: (isActive) => ({ padding: "8px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, background: isActive ? ts.primary : ts.surface, color: isActive ? "white" : ts.textSecondary, border: `1px solid ${isActive ? ts.primary : ts.border}`, cursor: "pointer" }),
    selectionBar: { display: "flex", alignItems: "center", gap: "12px", background: `${ts.primary}1A`, border: `1px solid ${ts.primary}40`, borderRadius: "10px", padding: "10px 16px", marginBottom: "16px" },
    tableWrapper: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "16px", overflow: "hidden" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "1200px" },
    th: { padding: "16px 14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: ts.primary, borderBottom: `1px solid ${ts.border}`, background: ts.surfaceLighter },
    td: { padding: "14px", borderBottom: `1px solid ${ts.border}`, fontSize: "13px", color: ts.textSecondary },
    pagination: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderTop: `1px solid ${ts.border}` },
    modalOverlay: { position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" },
    modal: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "20px", width: "550px", maxHeight: "85vh", overflow: "auto" },
    modalHeader: { padding: "20px 24px", borderBottom: `1px solid ${ts.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "18px", fontWeight: 700, color: ts.textPrimary, display: "flex", alignItems: "center", gap: "10px" },
    modalBody: { padding: "24px" },
    formGroup: { marginBottom: "16px" },
    label: { display: "block", fontSize: "12px", fontWeight: 600, color: ts.textMuted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" },
    input: { width: "100%", padding: "10px 14px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "10px", fontSize: "13px", color: ts.textPrimary, outline: "none" },
    select: { width: "100%", padding: "10px 14px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "10px", fontSize: "13px", color: ts.textPrimary, cursor: "pointer" },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
    modalFooter: { padding: "16px 24px", borderTop: `1px solid ${ts.border}`, display: "flex", gap: "12px", justifyContent: "flex-end" },
    btnCancel: { padding: "10px 20px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "10px", color: ts.textSecondary, cursor: "pointer", fontSize: "13px" },
    btnSave: { padding: "10px 20px", background: ts.gradient, border: "none", borderRadius: "10px", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
    btnDanger: { padding: "8px 16px", background: `${ts.error}1A`, border: `1px solid ${ts.error}`, borderRadius: "8px", color: ts.error, cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" },
    actionBtn: { background: "none", border: "none", cursor: "pointer", color: ts.textMuted, padding: "6px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px" },
    codeBadge: { background: ts.surfaceLighter, padding: "4px 10px", borderRadius: "8px", fontFamily: "monospace", fontSize: "12px", fontWeight: 600, color: ts.primary, display: "inline-flex", alignItems: "center", gap: "8px" },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${isDark ? "#1a2035" : "#e2e8f0"}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: ${isDark ? "#4a4f6e" : "#94a3b8"}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${isDark ? "#6b7280" : "#64748b"}; }
        input::placeholder { color: ${ts.placeholder}; }
        button { transition: all 0.2s ease; }
        button:hover:not(:disabled) { transform: translateY(-1px); opacity: 0.9; }
        button:active:not(:disabled) { transform: translateY(0); }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.title}>
          <div style={styles.titleIcon}><CouponIcon /></div>
          <h1 style={styles.titleText}>Coupons Management</h1>
        </div>
        <button style={styles.addBtn} onClick={() => setShowAddModal(true)}><PlusIcon /> Create Coupon</button>
      </div>

      {/* Filters */}
      <div style={styles.filtersBar}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}><SearchIcon /></span>
          <input type="text" style={styles.searchInput} placeholder="Search by coupon code or description..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={styles.filterGroup}>
          <span style={{ fontSize: "12px", color: ts.textMuted }}>Status:</span>
          <button style={styles.filterBtn(statusFilter === "All")} onClick={() => { setStatusFilter("All"); setPage(1); }}>All</button>
          <button style={styles.filterBtn(statusFilter === "Active")} onClick={() => { setStatusFilter("Active"); setPage(1); }}>Active</button>
          <button style={styles.filterBtn(statusFilter === "Inactive")} onClick={() => { setStatusFilter("Inactive"); setPage(1); }}>Inactive</button>
          <button style={styles.filterBtn(statusFilter === "Expired")} onClick={() => { setStatusFilter("Expired"); setPage(1); }}>Expired</button>
        </div>
        <div style={styles.filterGroup}>
          <span style={{ fontSize: "12px", color: ts.textMuted }}>Type:</span>
          <button style={styles.filterBtn(typeFilter === "All")} onClick={() => { setTypeFilter("All"); setPage(1); }}>All</button>
          <button style={styles.filterBtn(typeFilter === "Promo Code")} onClick={() => { setTypeFilter("Promo Code"); setPage(1); }}>Promo Code</button>
          <button style={styles.filterBtn(typeFilter === "Coupon")} onClick={() => { setTypeFilter("Coupon"); setPage(1); }}>Coupon</button>
          <button style={styles.filterBtn(typeFilter === "Fisherial")} onClick={() => { setTypeFilter("Fisherial"); setPage(1); }}>Fisherial</button>
        </div>
      </div>

      {/* Selection Bar */}
      {selected.size > 0 && (<div style={styles.selectionBar}><span style={{ fontSize: "13px", color: ts.primaryLight }}>{selected.size} coupon(s) selected</span><div style={{ flex: 1 }} /><button onClick={clearSelection} style={{ padding: "6px 12px", borderRadius: "6px", border: `1px solid ${ts.border}`, background: ts.surfaceLighter, color: ts.textSecondary, fontSize: "12px", cursor: "pointer" }}>Clear</button><button onClick={() => setConfirmDelete(true)} style={styles.btnDanger}><TrashIcon /> Delete</button></div>)}

      {/* Table */}
      <div style={styles.tableWrapper}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead><tr><th style={styles.th}><Checkbox checked={allPageSelected} onChange={toggleAll} ts={ts} /></th><th style={styles.th}>Code</th><th style={styles.th}>Type</th><th style={styles.th}>Discount</th><th style={styles.th}>Min Order</th><th style={styles.th}>Valid Period</th><th style={styles.th}>Usage</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
            <tbody>
              {loading ? Array.from({ length: perPage }).map((_, i) => (<tr key={i}>{Array.from({ length: 9 }).map((_, j) => (<td key={j} style={styles.td}><div style={{ height: "14px", background: ts.surfaceLighter, borderRadius: "4px" }} /></td>))}</tr>)) : mappedCoupons.length === 0 ? (<tr><td colSpan={9} style={{ padding: "60px", textAlign: "center", color: ts.textMuted }}>No coupons found</td></tr>) : mappedCoupons.map((coupon) => (<tr key={coupon.id} style={{ background: selected.has(coupon.id) ? `${ts.primary}0D` : "transparent" }}>
                <td style={styles.td}><Checkbox checked={selected.has(coupon.id)} onChange={() => toggleOne(coupon.id)} ts={ts} /></td>
                <td style={styles.td}><div style={styles.codeBadge}>{coupon.code}<button onClick={() => copyToClipboard(coupon.code)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary, display: "flex", alignItems: "center" }}><CopyIcon /></button></div></td>
                <td style={styles.td}><span style={{ display: "flex", alignItems: "center", gap: "6px" }}><TagIcon /> {coupon.type}</span></td>
                <td style={styles.td}><DiscountBadge discount={coupon.discount} type={coupon.discountType} ts={ts} /></td>
                <td style={styles.td}>₹{coupon.minOrder}</td>
                <td style={styles.td}><div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}><CalendarIcon /> {coupon.validFrom} → {coupon.validTo}</div></td>
                <td style={styles.td}><div style={{ display: "flex", alignItems: "center", gap: "6px" }}><UsersIcon /> {coupon.usedCount} / {coupon.usageLimit}</div></td>
                <td style={styles.td}><StatusBadge status={coupon.status} ts={ts} /></td>
                <td style={styles.td}><div style={{ display: "flex", gap: "6px" }}><button style={styles.actionBtn} onClick={() => handleEditCoupon(coupon)}><EditIcon /></button></div></td>
              </tr>))}
            </tbody>
          </table>
        </div>
        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: ts.textMuted }}>{loading ? "Loading..." : `Showing ${Math.min((page-1)*perPage+1, total)}–${Math.min(page*perPage, total)} of ${total} coupons`}</span>
          <div style={{ display: "flex", gap: "6px" }}><button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={{ width: "32px", height: "32px", borderRadius: "8px", border: `1px solid ${ts.border}`, background: ts.surface, color: ts.textMuted, cursor: "pointer" }}><ChevronLeftIcon /></button>{Array.from({ length: Math.min(5, totalPages) }, (_, i) => { let p = page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i; return p <= totalPages && (<button key={p} onClick={() => setPage(p)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: page === p ? `1px solid ${ts.primary}` : `1px solid ${ts.border}`, background: page === p ? ts.primary : ts.surface, color: page === p ? "white" : ts.textMuted, cursor: "pointer" }}>{p}</button>); })}<button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} style={{ width: "32px", height: "32px", borderRadius: "8px", border: `1px solid ${ts.border}`, background: ts.surface, color: ts.textMuted, cursor: "pointer" }}><ChevronRightIcon /></button></div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showAddModal || showEditModal) && (<div style={styles.modalOverlay} onClick={() => { setShowAddModal(false); setShowEditModal(false); }}><div style={styles.modal} onClick={e => e.stopPropagation()}><div style={styles.modalHeader}><div style={styles.modalTitle}><CouponIcon />{showAddModal ? "Create New Coupon" : "Edit Coupon"}</div><button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} style={{ background: "none", border: "none", cursor: "pointer", color: ts.textMuted }}><CloseIcon /></button></div><div style={styles.modalBody}>
        <div style={styles.formGroup}><label style={styles.label}>Coupon Code *</label><input style={styles.input} value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })} placeholder="e.g., WELCOME20" /></div>
        <div style={styles.row}><div style={styles.formGroup}><label style={styles.label}>Type</label><select style={styles.select} value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}><option>Promo Code</option><option>Coupon</option><option>Fisherial</option></select></div><div style={styles.formGroup}><label style={styles.label}>Status</label><select style={styles.select} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div></div>
        <div style={styles.row}><div style={styles.formGroup}><label style={styles.label}>Discount Type</label><select style={styles.select} value={formData.discountType} onChange={e => setFormData({ ...formData, discountType: e.target.value })}><option value="percentage">Percentage (%)</option><option value="fixed">Fixed Amount (₹)</option></select></div><div style={styles.formGroup}><label style={styles.label}>Discount Value *</label><input style={styles.input} value={formData.discount} onChange={e => setFormData({ ...formData, discount: e.target.value })} placeholder={formData.discountType === "percentage" ? "e.g., 20%" : "e.g., ₹100"} /></div></div>
        <div style={styles.row}><div style={styles.formGroup}><label style={styles.label}>Max Discount</label><input style={styles.input} value={formData.maxDiscount} onChange={e => setFormData({ ...formData, maxDiscount: e.target.value })} placeholder="e.g., ₹500" /></div><div style={styles.formGroup}><label style={styles.label}>Min Order Value</label><input style={styles.input} value={formData.minOrder} onChange={e => setFormData({ ...formData, minOrder: e.target.value })} placeholder="e.g., ₹999" /></div></div>
        <div style={styles.row}><div style={styles.formGroup}><label style={styles.label}>Valid From</label><input type="date" style={styles.input} value={formData.validFrom} onChange={e => setFormData({ ...formData, validFrom: e.target.value })} /></div><div style={styles.formGroup}><label style={styles.label}>Valid To</label><input type="date" style={styles.input} value={formData.validTo} onChange={e => setFormData({ ...formData, validTo: e.target.value })} /></div></div>
        <div style={styles.row}><div style={styles.formGroup}><label style={styles.label}>Usage Limit</label><input type="number" style={styles.input} value={formData.usageLimit} onChange={e => setFormData({ ...formData, usageLimit: e.target.value })} placeholder="Max uses" /></div><div style={styles.formGroup}><label style={styles.label}>Applicable On</label><select style={styles.select} value={formData.applicableOn} onChange={e => setFormData({ ...formData, applicableOn: e.target.value })}><option>All Products</option><option>First Order</option><option>Food & Beverages</option><option>All Categories</option></select></div></div>
        <div style={styles.formGroup}><label style={styles.label}>Description</label><textarea style={{ ...styles.input, resize: "vertical", minHeight: "60px" }} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Coupon description..." /></div>
      </div><div style={styles.modalFooter}><button style={styles.btnCancel} onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>Cancel</button><button style={styles.btnSave} onClick={showAddModal ? handleCreateCoupon : handleUpdateCoupon} disabled={actionLoading}>{actionLoading ? <><SpinnerIcon /> Saving...</> : (showAddModal ? "Create Coupon" : "Save Changes")}</button></div></div></div>)}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (<div style={styles.modalOverlay} onClick={() => setConfirmDelete(false)}><div style={{ ...styles.modal, width: "400px" }} onClick={e => e.stopPropagation()}><div style={styles.modalHeader}><div style={styles.modalTitle}><TrashIcon /> Delete Coupons</div><button onClick={() => setConfirmDelete(false)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.textMuted }}><CloseIcon /></button></div><div style={styles.modalBody}><p style={{ color: ts.textPrimary }}>Are you sure you want to delete <strong>{selected.size}</strong> coupon(s)?</p><p style={{ fontSize: "12px", color: ts.textMuted }}>This action cannot be undone.</p></div><div style={styles.modalFooter}><button style={styles.btnCancel} onClick={() => setConfirmDelete(false)}>Cancel</button><button style={{ ...styles.btnSave, background: ts.error }} onClick={handleDeleteSelected} disabled={actionLoading}>{actionLoading ? "Deleting..." : "Yes, Delete"}</button></div></div></div>)}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} ts={ts} />}
    </div>
  );
};

// Export component that accepts isDark prop directly
const CouponsPage = ({ isDark = true }) => {
  return <CouponsTable isDark={isDark} />;
};

export default CouponsPage;