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

// const apiGetDrivers = async ({ page, perPage, search, status, ready, onOff }) => {
//   const params = new URLSearchParams({
//     page,
//     limit: perPage,
//     ...(search && { search }),
//     ...(status && status !== "All" && { status }),
//     ...(ready && ready !== "All" && { ready }),
//     ...(onOff && onOff !== "All" && { onOff }),
//   });
  
//   const res = await fetch(`${API_BASE}/drivers?${params}`, {
//     headers: getAuthHeaders(),
//   });
//   if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//   return res.json();
  
// };

const apiUpdateDriver = async (id, payload) => {
  const res = await fetch(`${API_BASE}/drivers/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiDeleteDrivers = async (ids) => {
  const res = await fetch(`${API_BASE}/drivers/bulk-delete`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiAddDriver = async (payload) => {
  const res = await fetch(`${API_BASE}/drivers`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiVerifyDocuments = async (driverId, documents) => {
  const res = await fetch(`${API_BASE}/drivers/${driverId}/verify-documents`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ documents }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiAssignOrder = async (driverId, orderId, isManual = true) => {
  const res = await fetch(`${API_BASE}/orders/assign`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ driverId, orderId, type: isManual ? "manual" : "auto" }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiGetDriverEarnings = async (driverId) => {
  const res = await fetch(`${API_BASE}/drivers/${driverId}/earnings`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiGetDriverWallet = async (driverId) => {
  const res = await fetch(`${API_BASE}/drivers/${driverId}/wallet`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiGetDriverLiveLocation = async (driverId) => {
  const res = await fetch(`${API_BASE}/drivers/${driverId}/live-location`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiGetDriverDeliveryHistory = async (driverId) => {
  const res = await fetch(`${API_BASE}/drivers/${driverId}/delivery-history`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA FOR DEMO
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_DRIVERS = [
  { id: "DRV_001", driverId: "DRV_001", status: "Active", date: "2024-01-15", ready: "Yes", onOff: "ON", name: "Rajesh Kumar", contact: "+91 98765 43210", password: "******", pic: null, wallet: "₹12,450", earnings: "₹45,230", location: { lat: 28.6139, lng: 77.2090 }, totalDeliveries: 156, rating: 4.8, verified: true, documents: { aadhar: "Verified", license: "Verified", rc: "Verified" } },
  { id: "DRV_002", driverId: "DRV_002", status: "Active", date: "2024-01-20", ready: "Yes", onOff: "ON", name: "Suresh Singh", contact: "+91 87654 32109", password: "******", pic: null, wallet: "₹8,750", earnings: "₹32,100", location: { lat: 28.6140, lng: 77.2080 }, totalDeliveries: 98, rating: 4.5, verified: true, documents: { aadhar: "Verified", license: "Verified", rc: "Pending" } },
  { id: "DRV_003", driverId: "DRV_003", status: "Inactive", date: "2024-02-01", ready: "No", onOff: "OFF", name: "Amit Patel", contact: "+91 76543 21098", password: "******", pic: null, wallet: "₹3,200", earnings: "₹12,500", location: { lat: 28.6120, lng: 77.2100 }, totalDeliveries: 34, rating: 4.2, verified: false, documents: { aadhar: "Pending", license: "Pending", rc: "Pending" } },
  { id: "DRV_004", driverId: "DRV_004", status: "Active", date: "2024-02-10", ready: "Yes", onOff: "ON", name: "Vikram Mehta", contact: "+91 65432 10987", password: "******", pic: null, wallet: "₹15,900", earnings: "₹67,800", location: { lat: 28.6150, lng: 77.2070 }, totalDeliveries: 234, rating: 4.9, verified: true, documents: { aadhar: "Verified", license: "Verified", rc: "Verified" } },
  { id: "DRV_005", driverId: "DRV_005", status: "Active", date: "2024-02-15", ready: "No", onOff: "OFF", name: "Pooja Sharma", contact: "+91 54321 09876", password: "******", pic: null, wallet: "₹5,600", earnings: "₹18,900", location: { lat: 28.6160, lng: 77.2060 }, totalDeliveries: 45, rating: 4.6, verified: false, documents: { aadhar: "Verified", license: "Pending", rc: "Pending" } },
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
// const EyeIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
const EditIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>);
const SearchIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const ChevronLeftIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>);
const ChevronRightIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>);
const PlusIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const LocationIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const WalletIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 12v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5z"/><path d="M22 12h-6a2 2 0 0 0-2 2 2 2 0 0 0 2 2h6"/><line x1="18" y1="9" x2="18" y2="9.01"/></svg>);
const DocumentIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>);
const HistoryIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const OrderIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>);
const EarningsIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>);
const CheckIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>);
// const CloseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const config = { Active: { bg: "rgba(20,184,166,0.15)", color: "#14b8a6", dot: "#14b8a6" }, Inactive: { bg: "rgba(148,163,184,0.12)", color: "#94a3b8", dot: "#94a3b8" } };
  const c = config[status] || config.Inactive;
  return (<div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 10px 3px 8px", borderRadius: "20px", background: c.bg, border: `1px solid ${c.bg}` }}><div style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.dot }} /><span style={{ fontSize: "11px", fontWeight: 600, color: c.color }}>{status}</span></div>);
};

const ReadyBadge = ({ ready }) => {
  const config = { Yes: { bg: "rgba(20,184,166,0.15)", color: "#14b8a6" }, No: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" } };
  const c = config[ready] || config.No;
  return (<span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color }}>{ready}</span>);
};

const OnOffBadge = ({ value }) => {
  const config = { ON: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" }, OFF: { bg: "rgba(148,163,184,0.12)", color: "#94a3b8" } };
  const c = config[value] || config.OFF;
  return (<span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: c.bg, color: c.color }}>{value}</span>);
};

const VerificationBadge = ({ verified }) => {
  return (<span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: verified ? "rgba(20,184,166,0.15)" : "rgba(245,158,11,0.12)", color: verified ? "#14b8a6" : "#f59e0b" }}>{verified ? "Verified" : "Pending"}</span>);
};

const Checkbox = ({ checked, onChange }) => (<div onClick={onChange} style={{ width: "16px", height: "16px", borderRadius: "4px", border: checked ? "2px solid #3b82f6" : "2px solid #3a4460", background: checked ? "#3b82f6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s ease" }}>{checked && (<svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>)}</div>);

const AvatarPlaceholder = ({ name }) => { const initial = name ? name.charAt(0).toUpperCase() : "D"; return (<div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 600, color: "#fff", border: "2px solid #2a3145" }}>{initial}</div>); };

const Toast = ({ message, type, onClose }) => (<div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 999, background: type === "error" ? "#1a0a0a" : "#0a1a0a", border: `1px solid ${type === "error" ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.4)"}`, borderRadius: "10px", padding: "12px 18px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "slideUp 0.25s ease" }}><div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? "#ef4444" : "#10b981" }} /><span style={{ fontSize: "13px", color: type === "error" ? "#fca5a5" : "#6ee7b7", flex: 1 }}>{message}</span><span onClick={onClose} style={{ cursor: "pointer", color: "#64748b", fontSize: "16px" }}>×</span></div>);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const DriverTable = () => {
  // State
  const [drivers, setDrivers] = useState(DUMMY_DRIVERS);
  const [total, setTotal] = useState(DUMMY_DRIVERS.length);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [readyFilter, setReadyFilter] = useState("All");
  const [onOffFilter, setOnOffFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [editDriver, setEditDriver] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDriver, setNewDriver] = useState({});
  
  // New state for enhanced features
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAssignOrderModal, setShowAssignOrderModal] = useState(false);
  const [assignOrderData, setAssignOrderData] = useState({ orderId: "", type: "manual" });
  const [driverEarnings, setDriverEarnings] = useState(null);
  const [driverWallet, setDriverWallet] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [driverHistory, setDriverHistory] = useState([]);

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3500); };

  // Debounce search
  useEffect(() => { const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 500); return () => clearTimeout(t); }, [search]);

  // Fetch drivers
  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    try {
      let filtered = [...DUMMY_DRIVERS];
      if (debouncedSearch) {
        filtered = filtered.filter(d => d.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || d.contact.includes(debouncedSearch));
      }
      if (statusFilter !== "All") filtered = filtered.filter(d => d.status === statusFilter);
      if (readyFilter !== "All") filtered = filtered.filter(d => d.ready === readyFilter);
      if (onOffFilter !== "All") filtered = filtered.filter(d => d.onOff === onOffFilter);
      const start = (page - 1) * perPage;
      setDrivers(filtered.slice(start, start + perPage));
      setTotal(filtered.length);
    } catch (err) { showToast(`Failed to load: ${err.message}`, "error"); } 
    finally { setLoading(false); }
  }, [page, perPage, debouncedSearch, statusFilter, readyFilter, onOffFilter]);

  useEffect(() => { fetchDrivers(); }, [fetchDrivers]);

  const mappedDrivers = drivers.map((d, idx) => ({ ...d, sn: ((page - 1) * perPage + idx + 1) }));

  // Selection
  const pageIds = mappedDrivers.map(d => d.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.has(id));
  const toggleAll = () => { setSelected(prev => { const next = new Set(prev); allPageSelected ? pageIds.forEach(id => next.delete(id)) : pageIds.forEach(id => next.add(id)); return next; }); };
  const toggleOne = (id) => { setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }); };
  const clearSelection = () => setSelected(new Set());

  // Add Driver
  const handleAddDriver = async () => {
    setActionLoading(true);
    try {
      await apiAddDriver(newDriver);
      showToast("Driver added successfully");
      setShowAddModal(false);
      setNewDriver({});
      fetchDrivers();
    } catch (err) { showToast(`Add failed: ${err.message}`, "error"); } 
    finally { setActionLoading(false); }
  };

  // Delete handler
  const handleDeleteSelected = async () => {
    setActionLoading(true);
    try {
      await apiDeleteDrivers(Array.from(selected));
      showToast(`${selected.size} driver(s) deleted`);
      clearSelection();
      setConfirmDelete(false);
      fetchDrivers();
    } catch (err) { showToast(`Delete failed: ${err.message}`, "error"); } 
    finally { setActionLoading(false); }
  };

  // Edit handlers
  const openEdit = (driver) => { setEditDriver(driver); setEditForm({ name: driver.name, contact: driver.contact, password: driver.password, status: driver.status, ready: driver.ready, onOff: driver.onOff }); };
  const handleEditSave = async () => { setActionLoading(true); try { await apiUpdateDriver(editDriver.id, editForm); showToast("Driver updated successfully"); setEditDriver(null); fetchDrivers(); } catch (err) { showToast(`Update failed: ${err.message}`, "error"); } finally { setActionLoading(false); } };

  // Document Verification
  const handleVerifyDocuments = async (driver) => {
    setSelectedDriver(driver);
    setShowDocumentsModal(true);
  };

  const verifyDocument = async (docType) => {
    setActionLoading(true);
    try {
      await apiVerifyDocuments(selectedDriver.id, { [docType]: "Verified" });
      showToast(`${docType} verified successfully`);
      setShowDocumentsModal(false);
      fetchDrivers();
    } catch (err) { showToast(`Verification failed: ${err.message}`, "error"); } 
    finally { setActionLoading(false); }
  };

  // Earnings
  const handleViewEarnings = async (driver) => {
    setSelectedDriver(driver);
    setShowEarningsModal(true);
    setActionLoading(true);
    try {
      const earnings = await apiGetDriverEarnings(driver.id);
      setDriverEarnings(earnings || { total: driver.earnings, breakdown: { weekly: "₹8,500", monthly: "₹32,000", yearly: "₹1,85,000" } });
    } catch (err) { setDriverEarnings({ total: driver.earnings, breakdown: { weekly: "₹8,500", monthly: "₹32,000", yearly: "₹1,85,000" } }); } 
    finally { setActionLoading(false); }
  };

  // Wallet
  const handleViewWallet = async (driver) => {
    setSelectedDriver(driver);
    setShowWalletModal(true);
    setActionLoading(true);
    try {
      const wallet = await apiGetDriverWallet(driver.id);
      setDriverWallet(wallet || { balance: driver.wallet, transactions: [{ date: "2024-02-01", amount: "+₹5,000", type: "credit" }, { date: "2024-01-28", amount: "-₹2,500", type: "debit" }] });
    } catch (err) { setDriverWallet({ balance: driver.wallet, transactions: [{ date: "2024-02-01", amount: "+₹5,000", type: "credit" }, { date: "2024-01-28", amount: "-₹2,500", type: "debit" }] }); } 
    finally { setActionLoading(false); }
  };

  // Live Location
  const handleViewLocation = async (driver) => {
    setSelectedDriver(driver);
    setShowLocationModal(true);
    setActionLoading(true);
    try {
      const location = await apiGetDriverLiveLocation(driver.id);
      setDriverLocation(location || driver.location);
    } catch (err) { setDriverLocation(driver.location); } 
    finally { setActionLoading(false); }
  };

  // Delivery History
  const handleViewHistory = async (driver) => {
    setSelectedDriver(driver);
    setShowHistoryModal(true);
    setActionLoading(true);
    try {
      const history = await apiGetDriverDeliveryHistory(driver.id);
      setDriverHistory(history || [{ id: "DEL-001", date: "2024-02-15", amount: "₹250", status: "completed", restaurant: "Pizza Hut", customer: "John Doe" }, { id: "DEL-002", date: "2024-02-14", amount: "₹180", status: "completed", restaurant: "McDonald's", customer: "Jane Smith" }, { id: "DEL-003", date: "2024-02-13", amount: "₹320", status: "cancelled", restaurant: "KFC", customer: "Bob Wilson" }]);
    } catch (err) { setDriverHistory([{ id: "DEL-001", date: "2024-02-15", amount: "₹250", status: "completed", restaurant: "Pizza Hut", customer: "John Doe" }, { id: "DEL-002", date: "2024-02-14", amount: "₹180", status: "completed", restaurant: "McDonald's", customer: "Jane Smith" }]); } 
    finally { setActionLoading(false); }
  };

  // Assign Order
  const handleAssignOrder = async (driver) => {
    setSelectedDriver(driver);
    setAssignOrderData({ orderId: "", type: "manual" });
    setShowAssignOrderModal(true);
  };

  const submitAssignOrder = async () => {
    if (!assignOrderData.orderId) { showToast("Please enter Order ID", "error"); return; }
    setActionLoading(true);
    try {
      await apiAssignOrder(selectedDriver.id, assignOrderData.orderId, assignOrderData.type === "manual");
      showToast(`Order ${assignOrderData.orderId} assigned to ${selectedDriver.name} (${assignOrderData.type})`);
      setShowAssignOrderModal(false);
    } catch (err) { showToast(`Assignment failed: ${err.message}`, "error"); } 
    finally { setActionLoading(false); }
  };

  const totalPages = Math.ceil(total / perPage);

  // Export CSV
  const exportToCSV = () => {
    const headers = ['SN', 'ID', 'Status', 'Date', 'Ready', 'ON/OFF', 'Driver Name', 'Contact', 'Verified', 'Wallet'];
    const csvData = mappedDrivers.map(d => [d.sn, d.driverId, d.status, d.date, d.ready, d.onOff, d.name, d.contact, d.verified ? "Yes" : "No", d.wallet]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drivers.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported successfully");
  };

  const styles = {
    container: { minHeight: "100vh", background: "#0d1117", fontFamily: "'DM Sans', sans-serif", padding: "20px 24px" },
    headerActions: { display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" },
    addBtn: { background: "#4a6cf7", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" },
    exportBtn: { background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px" },
    filtersBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "15px" },
    searchWrapper: { position: "relative", flex: 1, maxWidth: "350px" },
    searchInput: { width: "100%", padding: "10px 12px 10px 35px", background: "#141824", border: "1px solid #1e2740", borderRadius: "8px", fontSize: "13px", color: "#f1f5f9", outline: "none" },
    searchIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#3b82f6" },
    filterControls: { display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" },
    filterGroup: { display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#64748b" },
    filterButtons: { display: "flex", gap: "6px" },
    filterBtn: (isActive) => ({ padding: "4px 10px", borderRadius: "6px", fontSize: "12px", background: isActive ? "#3b82f6" : "transparent", color: isActive ? "#fff" : "#64748b", border: isActive ? "1px solid #3b82f6" : "1px solid #1e2740", cursor: "pointer" }),
    selectionBar: { display: "flex", alignItems: "center", gap: "12px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "8px", padding: "8px 16px", marginBottom: "12px" },
    tableWrapper: { background: "#141824", border: "1px solid #1e2740", borderRadius: "12px", overflow: "hidden" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "1400px" },
    th: { padding: "13px 14px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#3b82f6", borderBottom: "1px solid #1e2740", background: "#0f1520" },
    td: { padding: "12px 14px", borderBottom: "1px solid #1a2035", fontSize: "13px", color: "#e2e8f0" },
    pagination: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #1e2740", background: "#0f1520" },
    actionButton: { background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "4px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px" },
  };

  return (
    <div style={styles.container}>
      <style>{`@keyframes slideUp { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} } input::placeholder { color: #3a4a6b; }`}</style>

      {/* Header Actions */}
      <div style={styles.headerActions}>
        <button style={styles.addBtn} onClick={() => setShowAddModal(true)}><PlusIcon /> Add Driver</button>
        <button style={styles.exportBtn} onClick={exportToCSV}>Export CSV</button>
      </div>

      {/* Filters */}
      <div style={styles.filtersBar}>
        <div style={styles.searchWrapper}><span style={styles.searchIcon}><SearchIcon /></span><input type="text" style={styles.searchInput} placeholder="Search drivers..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <div style={styles.filterControls}>
          <div style={styles.filterGroup}><label>Status:</label><div style={styles.filterButtons}><button style={styles.filterBtn(statusFilter === "All")} onClick={() => { setStatusFilter("All"); setPage(1); }}>All</button><button style={styles.filterBtn(statusFilter === "Active")} onClick={() => { setStatusFilter("Active"); setPage(1); }}>Active</button><button style={styles.filterBtn(statusFilter === "Inactive")} onClick={() => { setStatusFilter("Inactive"); setPage(1); }}>Inactive</button></div></div>
          <div style={styles.filterGroup}><label>Ready:</label><div style={styles.filterButtons}><button style={styles.filterBtn(readyFilter === "All")} onClick={() => { setReadyFilter("All"); setPage(1); }}>All</button><button style={styles.filterBtn(readyFilter === "Yes")} onClick={() => { setReadyFilter("Yes"); setPage(1); }}>Yes</button><button style={styles.filterBtn(readyFilter === "No")} onClick={() => { setReadyFilter("No"); setPage(1); }}>No</button></div></div>
          <div style={styles.filterGroup}><label>ON/OFF:</label><div style={styles.filterButtons}><button style={styles.filterBtn(onOffFilter === "All")} onClick={() => { setOnOffFilter("All"); setPage(1); }}>All</button><button style={styles.filterBtn(onOffFilter === "ON")} onClick={() => { setOnOffFilter("ON"); setPage(1); }}>ON</button><button style={styles.filterBtn(onOffFilter === "OFF")} onClick={() => { setOnOffFilter("OFF"); setPage(1); }}>OFF</button></div></div>
        </div>
      </div>

      {/* Selection Bar */}
      {selected.size > 0 && (<div style={styles.selectionBar}><span style={{ fontSize: "13px", color: "#93c5fd", fontWeight: 600 }}>{selected.size} driver{selected.size > 1 ? "s" : ""} selected</span><div style={{ flex: 1 }} /><button onClick={clearSelection} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>Clear</button><button onClick={() => setConfirmDelete(true)} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}><TrashIcon /> Delete Selected</button></div>)}

      {/* Table */}
      <div style={styles.tableWrapper}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead><tr><th style={{ ...styles.th, width: "40px" }}><Checkbox checked={allPageSelected} onChange={toggleAll} /></th><th style={styles.th}>SN</th><th style={styles.th}>ID</th><th style={styles.th}>Pic</th><th style={styles.th}>Status</th><th style={styles.th}>Date</th><th style={styles.th}>Ready</th><th style={styles.th}>ON/OFF</th><th style={styles.th}>Driver Name</th><th style={styles.th}>Contact</th><th style={styles.th}>Verification</th><th style={styles.th}>Wallet</th><th style={styles.th}>Actions</th></tr></thead>
            <tbody>
              {loading ? Array.from({ length: perPage }).map((_, i) => (<tr key={i}>{Array.from({ length: 13 }).map((_, j) => (<td key={j} style={styles.td}><div style={{ height: "14px", background: "#1e2740", borderRadius: "4px", width: j === 0 ? "16px" : "70%" }} /></td>))}</tr>)) : mappedDrivers.length === 0 ? (<tr><td colSpan={13} style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>{debouncedSearch ? "No drivers match your search" : "No drivers found"}</td></tr>) : mappedDrivers.map((driver) => (<tr key={driver.id} style={{ background: selected.has(driver.id) ? "rgba(59,130,246,0.07)" : "transparent" }}>
                <td style={styles.td}><Checkbox checked={selected.has(driver.id)} onChange={() => toggleOne(driver.id)} /></td>
                <td style={styles.td}>{driver.sn}</td>
                <td style={styles.td}>{driver.driverId}</td>
                <td style={styles.td}><AvatarPlaceholder name={driver.name} /></td>
                <td style={styles.td}><StatusBadge status={driver.status} /></td>
                <td style={styles.td}>{driver.date}</td>
                <td style={styles.td}><ReadyBadge ready={driver.ready} /></td>
                <td style={styles.td}><OnOffBadge value={driver.onOff} /></td>
                <td style={styles.td}><strong>{driver.name}</strong></td>
                <td style={styles.td}>{driver.contact}</td>
                <td style={styles.td}><VerificationBadge verified={driver.verified} /></td>
                <td style={styles.td}>{driver.wallet}</td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <button style={styles.actionButton} onClick={() => openEdit(driver)} title="Edit"><EditIcon /></button>
                    <button style={styles.actionButton} onClick={() => handleVerifyDocuments(driver)} title="Verify Documents"><DocumentIcon /></button>
                    <button style={styles.actionButton} onClick={() => handleViewEarnings(driver)} title="Earnings"><EarningsIcon /></button>
                    <button style={styles.actionButton} onClick={() => handleViewWallet(driver)} title="Wallet"><WalletIcon /></button>
                    <button style={styles.actionButton} onClick={() => handleViewLocation(driver)} title="Live Location"><LocationIcon /></button>
                    <button style={styles.actionButton} onClick={() => handleViewHistory(driver)} title="Delivery History"><HistoryIcon /></button>
                    <button style={styles.actionButton} onClick={() => handleAssignOrder(driver)} title="Assign Order"><OrderIcon /></button>
                  </div>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: "#64748b" }}>{loading ? "Loading..." : `Showing ${Math.min((page-1)*perPage+1, total)}–${Math.min(page*perPage, total)} of ${total} drivers`}</span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1 || loading} style={{ width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #1e2740", background: "#141824", color: page === 1 ? "#2d3a55" : "#94a3b8", cursor: "pointer" }}><ChevronLeftIcon /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => { let p = page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i; return p <= totalPages && (<button key={p} onClick={() => setPage(p)} style={{ width: "30px", height: "30px", borderRadius: "6px", border: page === p ? "1px solid #3b82f6" : "1px solid #1e2740", background: page === p ? "#1e3a8a" : "#141824", color: page === p ? "#93c5fd" : "#64748b", cursor: "pointer" }}>{p}</button>); })}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages || loading} style={{ width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #1e2740", background: "#141824", color: page === totalPages ? "#2d3a55" : "#94a3b8", cursor: "pointer" }}><ChevronRightIcon /></button>
          </div>
        </div>
      </div>

      {/* Add Driver Modal */}
      {showAddModal && (<div onClick={() => setShowAddModal(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "16px", padding: "28px", width: "420px" }}><h3 style={{ margin: "0 0 20px", fontSize: "16px", color: "#f1f5f9" }}>Add New Driver</h3>{[{ label: "Driver Name", key: "name" }, { label: "Contact", key: "contact" }, { label: "Password", key: "password" }].map(f => (<div key={f.key} style={{ marginBottom: "14px" }}><label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>{f.label}</label><input value={newDriver[f.key] || ""} onChange={e => setNewDriver(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "#0f1520", border: "1px solid #1e2740", borderRadius: "8px", color: "#f1f5f9" }} /></div>))}<div style={{ display: "flex", gap: "10px", marginTop: "10px" }}><button onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button><button onClick={handleAddDriver} disabled={actionLoading} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#1e3a8a", color: "#93c5fd", cursor: "pointer" }}>{actionLoading ? "Adding..." : "Add Driver"}</button></div></div></div>)}

      {/* Edit Modal */}
      {editDriver && (<div onClick={() => setEditDriver(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "16px", padding: "28px", width: "420px" }}><h3 style={{ margin: "0 0 20px", fontSize: "16px", color: "#f1f5f9" }}>Edit Driver</h3>{[{ label: "Driver Name", key: "name" }, { label: "Contact", key: "contact" }, { label: "Password", key: "password" }].map(f => (<div key={f.key} style={{ marginBottom: "14px" }}><label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>{f.label}</label><input value={editForm[f.key] || ""} onChange={e => setEditForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "#0f1520", border: "1px solid #1e2740", borderRadius: "8px", color: "#f1f5f9" }} /></div>))}<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>{[{ label: "Status", key: "status", options: ["Active", "Inactive"] }, { label: "Ready", key: "ready", options: ["Yes", "No"] }, { label: "ON/OFF", key: "onOff", options: ["ON", "OFF"] }].map(f => (<div key={f.key}><label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>{f.label}</label><select value={editForm[f.key] || ""} onChange={e => setEditForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "#0f1520", border: "1px solid #1e2740", borderRadius: "8px", color: "#f1f5f9" }}>{f.options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>))}</div><div style={{ display: "flex", gap: "10px" }}><button onClick={() => setEditDriver(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button><button onClick={handleEditSave} disabled={actionLoading} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#1e3a8a", color: "#93c5fd", cursor: "pointer" }}>{actionLoading ? "Saving..." : "Save Changes"}</button></div></div></div>)}

      {/* Document Verification Modal */}
      {showDocumentsModal && selectedDriver && (<div onClick={() => setShowDocumentsModal(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "16px", padding: "28px", width: "400px" }}><h3 style={{ margin: "0 0 20px", fontSize: "16px", color: "#f1f5f9" }}>Document Verification</h3><p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>Driver: <strong>{selectedDriver.name}</strong></p><div style={{ marginBottom: "15px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e2740" }}><span style={{ fontSize: "13px" }}>Aadhar Card</span>{selectedDriver.documents?.aadhar === "Verified" ? <span style={{ color: "#14b8a6" }}>Verified <CheckIcon /></span> : <button onClick={() => verifyDocument("aadhar")} style={{ padding: "4px 12px", borderRadius: "6px", background: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: "11px" }}>Verify</button>}</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e2740" }}><span style={{ fontSize: "13px" }}>Driver License</span>{selectedDriver.documents?.license === "Verified" ? <span style={{ color: "#14b8a6" }}>Verified <CheckIcon /></span> : <button onClick={() => verifyDocument("license")} style={{ padding: "4px 12px", borderRadius: "6px", background: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: "11px" }}>Verify</button>}</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}><span style={{ fontSize: "13px" }}>RC Book</span>{selectedDriver.documents?.rc === "Verified" ? <span style={{ color: "#14b8a6" }}>Verified <CheckIcon /></span> : <button onClick={() => verifyDocument("rc")} style={{ padding: "4px 12px", borderRadius: "6px", background: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: "11px" }}>Verify</button>}</div></div><button onClick={() => setShowDocumentsModal(false)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Close</button></div></div>)}

      {/* Earnings Modal */}
      {showEarningsModal && selectedDriver && (<div onClick={() => setShowEarningsModal(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "16px", padding: "28px", width: "400px" }}><h3 style={{ margin: "0 0 20px", fontSize: "16px", color: "#f1f5f9" }}>Driver Earnings</h3><p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>{selectedDriver.name}</p><div style={{ background: "#0f1520", borderRadius: "12px", padding: "20px", marginBottom: "20px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: 700, color: "#14b8a6" }}>{driverEarnings?.total || selectedDriver.earnings}</div><div style={{ fontSize: "12px", color: "#64748b", marginTop: "5px" }}>Total Earnings</div></div><div style={{ marginBottom: "20px" }}><div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e2740" }}><span>Weekly</span><span style={{ fontWeight: 600 }}>{driverEarnings?.breakdown?.weekly || "₹8,500"}</span></div><div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e2740" }}><span>Monthly</span><span style={{ fontWeight: 600 }}>{driverEarnings?.breakdown?.monthly || "₹32,000"}</span></div><div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}><span>Yearly</span><span style={{ fontWeight: 600 }}>{driverEarnings?.breakdown?.yearly || "₹1,85,000"}</span></div></div><button onClick={() => setShowEarningsModal(false)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Close</button></div></div>)}

      {/* Wallet Modal */}
      {showWalletModal && selectedDriver && (<div onClick={() => setShowWalletModal(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "16px", padding: "28px", width: "450px" }}><h3 style={{ margin: "0 0 20px", fontSize: "16px", color: "#f1f5f9" }}>Driver Wallet</h3><p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>{selectedDriver.name}</p><div style={{ background: "#0f1520", borderRadius: "12px", padding: "20px", marginBottom: "20px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: 700, color: "#f59e0b" }}>{driverWallet?.balance || selectedDriver.wallet}</div><div style={{ fontSize: "12px", color: "#64748b", marginTop: "5px" }}>Current Balance</div></div><h4 style={{ fontSize: "13px", color: "#3b82f6", marginBottom: "10px" }}>Recent Transactions</h4><div>{driverWallet?.transactions?.map((tx, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1e2740" }}><span style={{ fontSize: "12px", color: "#64748b" }}>{tx.date}</span><span style={{ fontWeight: 600, color: tx.type === "credit" ? "#14b8a6" : "#ef4444" }}>{tx.amount}</span></div>))}</div><button onClick={() => setShowWalletModal(false)} style={{ width: "100%", marginTop: "20px", padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Close</button></div></div>)}

      {/* Live Location Modal */}
      {showLocationModal && selectedDriver && (<div onClick={() => setShowLocationModal(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "16px", padding: "28px", width: "500px" }}><h3 style={{ margin: "0 0 20px", fontSize: "16px", color: "#f1f5f9" }}>Live Location</h3><p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>{selectedDriver.name} • Status: {selectedDriver.onOff}</p><div style={{ background: "#0f1520", borderRadius: "12px", padding: "20px", textAlign: "center", minHeight: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><LocationIcon /><div style={{ fontSize: "12px", color: "#64748b", marginTop: "10px" }}>Latitude: {driverLocation?.lat || "28.6139"}</div><div style={{ fontSize: "12px", color: "#64748b" }}>Longitude: {driverLocation?.lng || "77.2090"}</div><div style={{ fontSize: "11px", color: "#14b8a6", marginTop: "10px" }}>📍 Last updated: Just now</div><div style={{ marginTop: "15px", padding: "8px 16px", background: "#1e3a8a", borderRadius: "8px", fontSize: "12px", color: "#93c5fd" }}>Map integration available with Google Maps API</div></div><button onClick={() => setShowLocationModal(false)} style={{ width: "100%", marginTop: "20px", padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Close</button></div></div>)}

      {/* Delivery History Modal */}
      {showHistoryModal && selectedDriver && (<div onClick={() => setShowHistoryModal(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "16px", padding: "28px", width: "650px", maxHeight: "80vh", overflow: "auto" }}><h3 style={{ margin: "0 0 20px", fontSize: "16px", color: "#f1f5f9" }}>Delivery History</h3><p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>{selectedDriver.name} • Total Deliveries: {selectedDriver.totalDeliveries} • Rating: ⭐ {selectedDriver.rating}</p><table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr style={{ borderBottom: "1px solid #1e2740" }}><th style={{ textAlign: "left", padding: "10px", fontSize: "12px", color: "#3b82f6" }}>Order ID</th><th style={{ textAlign: "left", padding: "10px", fontSize: "12px", color: "#3b82f6" }}>Date</th><th style={{ textAlign: "left", padding: "10px", fontSize: "12px", color: "#3b82f6" }}>Restaurant</th><th style={{ textAlign: "left", padding: "10px", fontSize: "12px", color: "#3b82f6" }}>Customer</th><th style={{ textAlign: "left", padding: "10px", fontSize: "12px", color: "#3b82f6" }}>Amount</th><th style={{ textAlign: "left", padding: "10px", fontSize: "12px", color: "#3b82f6" }}>Status</th></tr></thead><tbody>{driverHistory.map((delivery, i) => (<tr key={i} style={{ borderBottom: "1px solid #1a2035" }}><td style={{ padding: "10px", fontSize: "12px" }}>{delivery.id}</td><td style={{ padding: "10px", fontSize: "12px", color: "#64748b" }}>{delivery.date}</td><td style={{ padding: "10px", fontSize: "12px" }}>{delivery.restaurant}</td><td style={{ padding: "10px", fontSize: "12px" }}>{delivery.customer}</td><td style={{ padding: "10px", fontSize: "12px", fontWeight: 600 }}>{delivery.amount}</td><td style={{ padding: "10px" }}><span style={{ color: delivery.status === "completed" ? "#14b8a6" : "#ef4444", fontSize: "11px", fontWeight: 600 }}>{delivery.status}</span></td></tr>))}</tbody></table><button onClick={() => setShowHistoryModal(false)} style={{ width: "100%", marginTop: "20px", padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Close</button></div></div>)}

      {/* Assign Order Modal */}
      {showAssignOrderModal && selectedDriver && (<div onClick={() => setShowAssignOrderModal(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "16px", padding: "28px", width: "400px" }}><h3 style={{ margin: "0 0 20px", fontSize: "16px", color: "#f1f5f9" }}>Assign Order</h3><p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>Driver: <strong>{selectedDriver.name}</strong></p><div style={{ marginBottom: "15px" }}><label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>Order ID</label><input value={assignOrderData.orderId} onChange={e => setAssignOrderData(p => ({ ...p, orderId: e.target.value }))} placeholder="Enter Order ID" style={{ width: "100%", padding: "9px 12px", background: "#0f1520", border: "1px solid #1e2740", borderRadius: "8px", color: "#f1f5f9" }} /></div><div style={{ marginBottom: "20px" }}><label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>Assignment Type</label><select value={assignOrderData.type} onChange={e => setAssignOrderData(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "#0f1520", border: "1px solid #1e2740", borderRadius: "8px", color: "#f1f5f9" }}><option value="manual">Manual Assignment</option><option value="auto">Auto Assignment</option></select></div><div style={{ display: "flex", gap: "10px" }}><button onClick={() => setShowAssignOrderModal(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button><button onClick={submitAssignOrder} disabled={actionLoading} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#1e3a8a", color: "#93c5fd", cursor: "pointer" }}>{actionLoading ? "Assigning..." : "Assign Order"}</button></div></div></div>)}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (<div onClick={() => setConfirmDelete(false)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: "#141824", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", padding: "28px", width: "340px", textAlign: "center" }}><div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><TrashIcon /></div><h3 style={{ margin: "0 0 8px", fontSize: "16px", color: "#f1f5f9" }}>Delete {selected.size} driver{selected.size > 1 ? "s" : ""}?</h3><p style={{ margin: "0 0 20px", fontSize: "13px", color: "#64748b" }}>This action cannot be undone.</p><div style={{ display: "flex", gap: "10px" }}><button onClick={() => setConfirmDelete(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button><button onClick={handleDeleteSelected} disabled={actionLoading} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "rgba(239,68,68,0.15)", color: "#ef4444", cursor: "pointer", fontWeight: 700 }}>{actionLoading ? "Deleting..." : "Yes, Delete"}</button></div></div></div>)}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DriverTable;