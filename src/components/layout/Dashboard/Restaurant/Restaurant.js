import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ExportRestaurantsModal from "./ExportRestaurantsModal";

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

const apiGetRestaurants = async ({ page, perPage, search, status, ready, onOff }) => {
  const params = new URLSearchParams({
    page,
    limit: perPage,
    ...(search && { search }),
    ...(status && status !== "All" && { status }),
    ...(ready && ready !== "All" && { ready }),
    ...(onOff && onOff !== "All" && { onOff }),
  });
  const res = await fetch(`${API_BASE}/restaurants?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiUpdateRestaurant = async (id, payload) => {
  const res = await fetch(`${API_BASE}/restaurants/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const apiDeleteRestaurants = async (ids) => {
  const res = await fetch(`${API_BASE}/restaurants/bulk-delete`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

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
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
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

const StatusBadge = ({ status }) => {
  const config = {
    Active:   { bg: "rgba(20,184,166,0.15)", color: "#14b8a6", dot: "#14b8a6" },
    Inactive: { bg: "rgba(148,163,184,0.12)", color: "#94a3b8", dot: "#94a3b8" },
  };
  const c = config[status] || config.Inactive;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px 3px 8px", borderRadius: "20px",
      background: c.bg, border: `1px solid ${c.bg}`,
    }}>
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.dot }} />
      <span style={{ fontSize: "11px", fontWeight: 600, color: c.color }}>{status}</span>
    </div>
  );
};

const ReadyBadge = ({ ready }) => {
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

const OnOffBadge = ({ value }) => {
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

const Checkbox = ({ checked, onChange }) => (
  <div onClick={onChange} style={{
    width: "16px", height: "16px", borderRadius: "4px",
    border: checked ? "2px solid #3b82f6" : "2px solid #3a4460",
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

const AvatarPlaceholder = () => (
  <div style={{
    width: "34px", height: "34px", borderRadius: "50%",
    background: "#2a3145", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "12px", fontWeight: 600,
    color: "#64748b", border: "2px solid #3a4460",
  }}>🍔</div>
);

const Toast = ({ message, type, onClose }) => (
  <div style={{
    position: "fixed", bottom: "24px", right: "24px", zIndex: 999,
    background: type === "error" ? "#1a0a0a" : "#0a1a0a",
    border: `1px solid ${type === "error" ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.4)"}`,
    borderRadius: "10px", padding: "12px 18px",
    display: "flex", alignItems: "center", gap: "10px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    animation: "slideUp 0.25s ease",
  }}>
    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? "#ef4444" : "#10b981" }} />
    <span style={{ fontSize: "13px", color: type === "error" ? "#fca5a5" : "#6ee7b7", flex: 1 }}>{message}</span>
    <span onClick={onClose} style={{ cursor: "pointer", color: "#64748b", fontSize: "16px" }}>×</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const RestaurantTable = ({ isDark = true }) => {
  const navigate = useNavigate();
  
  // State
  const [restaurants, setRestaurants] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [readyFilter, setReadyFilter] = useState("All");
  const [onOffFilter, setOnOffFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Handle Add Restaurant Navigation
  const handleAddRestaurant = () => {
    navigate("/dashboard/addrestaurant");
  };

  // Handle Export Click
  const handleExportClick = () => {
    setShowExportModal(true);
  };

  // Handle Export from Modal
  const handleExport = (exportConfig) => {
    console.log("Export Config:", exportConfig);
    
    const selectedFields = exportConfig.selectedFields;
    // const dateRange = exportConfig.dateRange;
    
    // Define headers mapping
    const headers = selectedFields.map(field => {
      const headerMap = {
        id: "ID", orgType: "Org Type", contact: "Contact", email: "Email",
        contactPersonName: "Contact Person Name", prefix: "Prefix", city: "City",
        state: "State", pinCode: "PIN Code", latitude: "Latitude", longitude: "Longitude",
        ownerName: "Owner Name", ownerMobile: "Owner Mobile", otherPersonName: "Other Person Name",
        otherPersonMobile: "Other Person Mobile", bankName: "Bank Name", branch: "Branch",
        bankType: "Bank Type", accountHolder: "Account Holder", accountNumber: "Account Number",
        ifsc: "IFSC", bankMobile: "Bank Mobile", upi: "UPI", commission: "Commission (%)",
        specialCommission: "Special Commission (%)", minimumOrder: "Minimum Order",
        platformCharge: "Platform Charge", handlingCharge: "Handling Charge (%)",
        gst: "GST (%)", orderReceivingCharges: "Order Receiving Charges (%)",
        subscription: "Subscription", paidStatus: "Paid Status", wallet: "Wallet",
        referralCode: "Referral Code", referredBy: "Referred By", mou: "MOU",
        status: "Status", scheduleMode: "Schedule Mode", shiftStart: "Shift Start",
        shiftEnd: "Shift End", openStatus: "Open Status", scheduleApproved: "Schedule Approved",
        isReady: "Is Ready", remarks: "Remarks", createdAt: "Created At", updatedAt: "Updated At"
      };
      return headerMap[field] || field;
    });
    
    // Create CSV data
    const csvData = mappedRestaurants.map(restro => {
      return selectedFields.map(field => {
        const value = restro[field] || '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
    });
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date();
    a.download = `restaurants_export_${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported successfully");
    setShowExportModal(false);
  };

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch restaurants
  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiGetRestaurants({
        page, perPage, search: debouncedSearch,
        status: statusFilter, ready: readyFilter, onOff: onOffFilter,
      });
      
      if (Array.isArray(res)) {
        setRestaurants(res);
        setTotal(res.length);
      } else if (res.data) {
        setRestaurants(res.data);
        setTotal(res.total ?? res.data.length);
      } else {
        setRestaurants([]);
        setTotal(0);
      }
    } catch (err) {
      showToast(`Failed to load: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  }, [page, perPage, debouncedSearch, statusFilter, readyFilter, onOffFilter]);

  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);

  // Map restaurant data
  const mappedRestaurants = restaurants.map((r, idx) => ({
    id: r.id ?? r._id ?? r.restro_id,
    sn: r.sn ?? ((page - 1) * perPage + idx + 1),
    restroId: r.restroId ?? r.restaurant_id ?? r.id,
    status: r.status ?? "Active",
    ready: r.ready ?? "Yes",
    onOff: r.onOff ?? r.on_off ?? "OFF",
    shiftStart: r.shiftStart ?? r.shift_start ?? "",
    shiftEnd: r.shiftEnd ?? r.shift_end ?? "",
    name: r.name ?? r.restro_name ?? r.restaurant_name,
    contact: r.contact ?? r.phone ?? r.mobile,
    password: r.password ?? "********",
    pic: r.pic ?? r.image ?? null,
  }));

  // Selection
  const pageIds = mappedRestaurants.map(r => r.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.has(id));

  const toggleAll = () => {
    setSelected(prev => {
      const next = new Set(prev);
      allPageSelected ? pageIds.forEach(id => next.delete(id)) : pageIds.forEach(id => next.add(id));
      return next;
    });
  };
  const toggleOne = (id) => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const clearSelection = () => setSelected(new Set());

  // Delete handler
  const handleDeleteSelected = async () => {
    try {
      await apiDeleteRestaurants(Array.from(selected));
      showToast(`${selected.size} restaurant(s) deleted`);
      clearSelection();
      setConfirmDelete(false);
      fetchRestaurants();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, "error");
    }
  };

  // Edit handlers
  const openEdit = (restaurant) => {
    setEditRestaurant(restaurant);
    setEditForm({
      name: restaurant.name,
      contact: restaurant.contact,
      password: restaurant.password,
      status: restaurant.status,
      ready: restaurant.ready,
      onOff: restaurant.onOff,
      shiftStart: restaurant.shiftStart,
      shiftEnd: restaurant.shiftEnd,
    });
  };

  const handleEditSave = async () => {
    try {
      await apiUpdateRestaurant(editRestaurant.id, editForm);
      showToast("Restaurant updated successfully");
      setEditRestaurant(null);
      fetchRestaurants();
    } catch (err) {
      showToast(`Update failed: ${err.message}`, "error");
    }
  };

  // Pagination
  const totalPages = Math.ceil(total / perPage);

  // Styles
  const styles = {
    container: { minHeight: "100vh", background: isDark ? "#0d1117" : "#f8fafc", fontFamily: "'DM Sans', sans-serif", padding: "20px 24px" },
    headerActions: { display: "flex", gap: "12px", marginBottom: "20px" },
    addBtn: { background: "#4a6cf7", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px" },
    exportBtn: { background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px" },
    filtersBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "15px" },
    searchWrapper: { position: "relative", flex: 1, maxWidth: "350px" },
    searchInput: { width: "100%", padding: "10px 12px 10px 35px", background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: isDark ? "#f1f5f9" : "#1e293b", outline: "none" },
    searchIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#3b82f6" },
    filterControls: { display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" },
    filterGroup: { display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: isDark ? "#64748b" : "#475569" },
    select: { padding: "6px 10px", background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "6px", color: isDark ? "#f1f5f9" : "#1e293b", cursor: "pointer" },
    showHidden: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: isDark ? "#64748b" : "#475569" },
    selectionBar: { display: "flex", alignItems: "center", gap: "12px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "8px", padding: "8px 16px", marginBottom: "12px" },
    tableWrapper: { background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "1200px" },
    th: { padding: "13px 14px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#3b82f6", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#f8fafc" },
    td: { padding: "12px 14px", borderBottom: isDark ? "1px solid #1a2035" : "1px solid #f1f5f9", fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b" },
    pagination: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#f8fafc" },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideUp { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
        input::placeholder { color: #3a4a6b; }
      `}</style>

      {/* Header Actions */}
      <div style={styles.headerActions}>
        <button style={styles.addBtn} onClick={handleAddRestaurant}>+ Add Restaurant</button>
        <button style={styles.exportBtn} onClick={handleExportClick}>Export CSV</button>
      </div>

      {/* Filters */}
      <div style={styles.filtersBar}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search restaurants — type to filter instantly..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div style={styles.filterControls}>
          <label style={styles.showHidden}>
            <input type="checkbox" /> Show Hidden
          </label>

          <div style={styles.filterGroup}>
            <label>Status:</label>
            <select style={styles.select} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option>All</option><option>Active</option><option>Inactive</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label>Ready:</label>
            <select style={styles.select} value={readyFilter} onChange={(e) => { setReadyFilter(e.target.value); setPage(1); }}>
              <option>All</option><option>Yes</option><option>No</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label>ON/OFF:</label>
            <select style={styles.select} value={onOffFilter} onChange={(e) => { setOnOffFilter(e.target.value); setPage(1); }}>
              <option>All</option><option>ON</option><option>OFF</option>
            </select>
          </div>
        </div>
      </div>

      {/* Selection Bar */}
      {selected.size > 0 && (
        <div style={styles.selectionBar}>
          <span style={{ fontSize: "13px", color: "#93c5fd", fontWeight: 600 }}>
            {selected.size} restaurant{selected.size > 1 ? "s" : ""} selected
          </span>
          <div style={{ flex: 1 }} />
          <button onClick={clearSelection} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
            Clear
          </button>
          <button onClick={() => setConfirmDelete(true)} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <TrashIcon /> Delete
          </button>
        </div>
      )}

      {/* Table */}
      <div style={styles.tableWrapper}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: "40px" }}><Checkbox checked={allPageSelected} onChange={toggleAll} /></th>
                <th style={styles.th}>SN</th>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Pic</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Ready</th>
                <th style={styles.th}>ON/OFF</th>
                <th style={styles.th}>Shift Start</th>
                <th style={styles.th}>Shift End</th>
                <th style={styles.th}>Restro Name</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Password</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: perPage }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 13 }).map((_, j) => (
                      <td key={j} style={styles.td}>
                        <div style={{ height: "14px", background: "#1e2740", borderRadius: "4px", width: j === 0 ? "16px" : "70%" }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : mappedRestaurants.length === 0 ? (
                <tr>
                  <td colSpan={13} style={{ padding: "60px", textAlign: "center", color: isDark ? "#64748b" : "#94a3b8" }}>
                    {debouncedSearch ? "No restaurants match your search" : "No restaurants found"}
                  </td>
                </tr>
              ) : (
                mappedRestaurants.map((restro) => (
                  <tr key={restro.id} style={{ background: selected.has(restro.id) ? "rgba(59,130,246,0.07)" : "transparent" }}>
                    <td style={styles.td}><Checkbox checked={selected.has(restro.id)} onChange={() => toggleOne(restro.id)} /></td>
                    <td style={styles.td}>{restro.sn}</td>
                    <td style={styles.td}>{restro.restroId}</td>
                    <td style={styles.td}><AvatarPlaceholder /></td>
                    <td style={styles.td}><StatusBadge status={restro.status} /></td>
                    <td style={styles.td}><ReadyBadge ready={restro.ready} /></td>
                    <td style={styles.td}><OnOffBadge value={restro.onOff} /></td>
                    <td style={styles.td}>{restro.shiftStart || "-"}</td>
                    <td style={styles.td}>{restro.shiftEnd || "-"}</td>
                    <td style={styles.td}><strong>{restro.name}</strong></td>
                    <td style={styles.td}>{restro.contact}</td>
                    <td style={styles.td}><span style={{ fontFamily: "monospace", fontSize: "11px" }}>{restro.password}</span></td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => openEdit(restro)} style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8" }}><EditIcon /></button>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8" }}><EyeIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: isDark ? "#64748b" : "#94a3b8" }}>
            {loading ? "Loading..." : `Showing ${Math.min((page-1)*perPage+1, total)}–${Math.min(page*perPage, total)} of ${total} restaurants`}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1 || loading} style={{ width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #1e2740", background: "#141824", color: page === 1 ? "#2d3a55" : "#94a3b8", cursor: "pointer" }}>
              <ChevronLeftIcon />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let p = page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
              return p <= totalPages && (
                <button key={p} onClick={() => setPage(p)} style={{ width: "30px", height: "30px", borderRadius: "6px", border: page === p ? "1px solid #3b82f6" : "1px solid #1e2740", background: page === p ? "#1e3a8a" : "#141824", color: page === p ? "#93c5fd" : "#64748b", cursor: "pointer" }}>
                  {p}
                </button>
              );
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages || loading} style={{ width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #1e2740", background: "#141824", color: page === totalPages ? "#2d3a55" : "#94a3b8", cursor: "pointer" }}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editRestaurant && (
        <div onClick={() => setEditRestaurant(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "16px", padding: "28px", width: "420px" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "16px", color: isDark ? "#f1f5f9" : "#1e293b" }}>Edit Restaurant</h3>
            {[{ label: "Restro Name", key: "name" }, { label: "Contact", key: "contact" }, { label: "Password", key: "password" }].map(f => (
              <div key={f.key} style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "11px", color: isDark ? "#64748b" : "#475569", display: "block", marginBottom: "5px" }}>{f.label}</label>
                <input value={editForm[f.key] || ""} onChange={e => setEditForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px", color: isDark ? "#f1f5f9" : "#1e293b" }} />
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              {[{ label: "Status", key: "status", options: ["Active", "Inactive"] }, { label: "Ready", key: "ready", options: ["Yes", "No"] }, { label: "ON/OFF", key: "onOff", options: ["ON", "OFF"] }].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: "11px", color: isDark ? "#64748b" : "#475569", display: "block", marginBottom: "5px" }}>{f.label}</label>
                  <select value={editForm[f.key] || ""} onChange={e => setEditForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px", color: isDark ? "#f1f5f9" : "#1e293b" }}>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setEditRestaurant(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleEditSave} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#1e3a8a", color: "#93c5fd", cursor: "pointer" }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div onClick={() => setConfirmDelete(false)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#141824" : "#ffffff", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", padding: "28px", width: "340px", textAlign: "center" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <TrashIcon style={{ color: "#ef4444" }} />
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: "16px", color: isDark ? "#f1f5f9" : "#1e293b" }}>Delete {selected.size} restaurant{selected.size > 1 ? "s" : ""}?</h3>
            <p style={{ margin: "0 0 20px", fontSize: "13px", color: isDark ? "#64748b" : "#475569" }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setConfirmDelete(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleDeleteSelected} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "rgba(239,68,68,0.15)", color: "#ef4444", cursor: "pointer", fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportRestaurantsModal
          isDark={isDark}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default RestaurantTable;