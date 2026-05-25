import { useState, useMemo, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// API CONFIG — sirf yahan change karo apna base URL
// ─────────────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://your-api.com/api";

// Auth token helper — adjust karo apne auth system ke hisaab se
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
});

// ─────────────────────────────────────────────────────────────────────────────
// API FUNCTIONS — yahan hain saare backend calls
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch paginated + filtered users
 * Expected response: { data: User[], total: number, page: number, perPage: number }
 * OR flat array: User[]  (total will be derived from array length)
 */
const apiGetUsers = async ({ page, perPage, search }) => {
  const params = new URLSearchParams({
    page,
    limit: perPage,
    ...(search ? { search } : {}),
  });
  const res = await fetch(`${API_BASE}/users?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
  // Expected shape: { data: [...], total: 200 }
  // If your API returns flat array, wrap in: { data: arr, total: arr.length }
};

/**
 * Update a user
 * Expected response: updated User object
 */
const apiUpdateUser = async (id, payload) => {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

/**
 * Delete multiple users
 * Expected response: { success: true } or 200 OK
 */
const apiDeleteUsers = async (ids) => {
  const res = await fetch(`${API_BASE}/users/bulk-delete`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

/**
 * Get single user by ID
 * Expected response: User object
 */
const apiGetUser = async (id) => {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
      style={{ animation: "spin 0.8s linear infinite", transformOrigin: "center" }}
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const Avatar = ({ name = "?", size = 32 }) => {
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const colors = ["#3b4a6b", "#2d4a5a", "#4a3b6b", "#3b5a4a", "#5a3b4a", "#4a4a3b"];
  const colorIndex = (name.charCodeAt(0) || 0) % colors.length;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: colors[colorIndex],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.34, fontWeight: 700, color: "#94a3b8",
      fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
      border: "2px solid #2a3145",
    }}>
      {initials || "?"}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const config = {
    Active:   { bg: "rgba(20,184,166,0.15)",  color: "#14b8a6", border: "rgba(20,184,166,0.3)",  dot: "#14b8a6" },
    Inactive: { bg: "rgba(148,163,184,0.12)", color: "#94a3b8", border: "rgba(148,163,184,0.2)", dot: "#94a3b8" },
    Blocked:  { bg: "rgba(239,68,68,0.12)",   color: "#ef4444", border: "rgba(239,68,68,0.25)",  dot: "#ef4444" },
  };
  const c = config[status] || config.Inactive;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 10px 3px 8px", borderRadius: "20px", background: c.bg, border: `1px solid ${c.border}` }}>
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.dot }} />
      <span style={{ fontSize: "11px", fontWeight: 600, color: c.color, fontFamily: "'DM Sans', sans-serif" }}>{status}</span>
    </div>
  );
};

const Checkbox = ({ checked, indeterminate, onChange }) => (
  <div onClick={onChange} style={{
    width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
    border: checked || indeterminate ? "2px solid #3b82f6" : "2px solid #3a4460",
    background: checked || indeterminate ? "#3b82f6" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.15s ease",
  }}>
    {indeterminate && !checked
      ? <div style={{ width: "8px", height: "2px", background: "#fff", borderRadius: "1px" }} />
      : checked
        ? <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        : null}
  </div>
);

const ColHeader = ({ children }) => (
  <th style={{
    padding: "13px 14px", textAlign: "left", fontSize: "12px",
    fontWeight: 700, letterSpacing: "0.4px", color: "#3b82f6",
    fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
    background: "transparent", borderBottom: "1px solid #1e2740", userSelect: "none",
  }}>
    {children}
  </th>
);

// Skeleton row for loading state
const SkeletonRow = ({ cols }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} style={{ padding: "14px" }}>
        <div style={{
          height: "14px", borderRadius: "6px",
          background: "linear-gradient(90deg, #1e2740 25%, #253050 50%, #1e2740 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s infinite",
          width: i === 0 ? "16px" : i === 4 ? "34px" : "70%",
        }} />
      </td>
    ))}
  </tr>
);

// Toast notification
const Toast = ({ message, type, onClose }) => (
  <div style={{
    position: "fixed", bottom: "24px", right: "24px", zIndex: 999,
    background: type === "error" ? "#1a0a0a" : "#0a1a0a",
    border: `1px solid ${type === "error" ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.4)"}`,
    borderRadius: "10px", padding: "12px 18px",
    display: "flex", alignItems: "center", gap: "10px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    animation: "slideUp 0.25s ease",
    maxWidth: "320px",
  }}>
    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? "#ef4444" : "#10b981", flexShrink: 0 }} />
    <span style={{ fontSize: "13px", color: type === "error" ? "#fca5a5" : "#6ee7b7", fontFamily: "'DM Sans', sans-serif", flex: 1 }}>{message}</span>
    <span onClick={onClose} style={{ cursor: "pointer", color: "#64748b", fontSize: "16px", lineHeight: 1 }}>×</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const UsersTable = ({ isDark = true }) => {
  // ── State ──
  const [users, setUsers]           = useState([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selected, setSelected]     = useState(new Set());
  const [page, setPage]             = useState(1);
  const [perPage]                   = useState(10);
  const [viewUser, setViewUser]     = useState(null);
  const [editUser, setEditUser]     = useState(null);
  const [editForm, setEditForm]     = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [toast, setToast]           = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ── Toast helper ──
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Debounce search (500ms) ──
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  // ── Fetch users ──
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiGetUsers({ page, perPage, search: debouncedSearch });

      // ── Normalize response ──
      // Shape 1: { data: [...], total: 200 }
      // Shape 2: { users: [...], total: 200 }
      // Shape 3: flat array [...]
      // Shape 4: { results: [...], count: 200 }
      if (Array.isArray(res)) {
        setUsers(res);
        setTotal(res.length);
      } else if (res.data) {
        setUsers(res.data);
        setTotal(res.total ?? res.data.length);
      } else if (res.users) {
        setUsers(res.users);
        setTotal(res.total ?? res.count ?? res.users.length);
      } else if (res.results) {
        setUsers(res.results);
        setTotal(res.count ?? res.results.length);
      } else {
        setUsers([]);
        setTotal(0);
      }
    } catch (err) {
      setError(err.message);
      showToast(`Failed to load users: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  }, [page, perPage, debouncedSearch]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // ── Field key mapping — apne API field names yahan map karo ──
  // Agar API "username" return kare aur "name" chahiye, yahan adjust karo
  const mapUser = (u) => ({
    id:       u.id       ?? u._id        ?? u.user_id,
    sn:       u.sn       ?? u.serial_no  ?? u.id ?? u._id,
    status:   u.status   ?? u.is_active === true ? "Active" : u.is_active === false ? "Inactive" : "Active",
    date:     u.date     ?? u.created_at ?? u.createdAt ?? u.joined_at ?? "",
    name:     u.name     ?? u.username   ?? u.full_name ?? u.fullName ?? `${u.first_name || ""} ${u.last_name || ""}`.trim(),
    contact:  u.contact  ?? u.phone      ?? u.mobile    ?? u.phone_number ?? "",
    wallet:   u.wallet   ?? (u.wallet_balance != null ? `₹${u.wallet_balance}` : "₹0"),
    vip:      u.vip      ?? (u.is_vip ? "Yes" : "No"),
    avatar:   u.avatar   ?? u.profile_picture ?? u.photo ?? null,
  });

  const mappedUsers = useMemo(() => users.map(mapUser), [users]);

  // ── Pagination ──
  const totalPages = Math.ceil(total / perPage);

  // ── Selection ──
  const pageIds = mappedUsers.map(u => u.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.has(id));
  const somePageSelected = pageIds.some(id => selected.has(id)) && !allPageSelected;

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

  // ── Edit handlers ──
  const openEdit = (user) => {
    setEditUser(user);
    setEditForm({
      name:    user.name,
      contact: user.contact,
      wallet:  user.wallet,
      status:  user.status,
      vip:     user.vip,
    });
  };

  const handleEditSave = async () => {
    setActionLoading(true);
    try {
      await apiUpdateUser(editUser.id, {
        name:    editForm.name,
        contact: editForm.contact,
        wallet:  editForm.wallet,
        status:  editForm.status,
        vip:     editForm.vip,
      });
      showToast("User updated successfully");
      setEditUser(null);
      fetchUsers(); // refresh table
    } catch (err) {
      showToast(`Update failed: ${err.message}`, "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ── Delete handler ──
  const handleDeleteSelected = async () => {
    setActionLoading(true);
    try {
      await apiDeleteUsers(Array.from(selected));
      showToast(`${selected.size} user(s) deleted`);
      clearSelection();
      setConfirmDelete(false);
      fetchUsers();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ── View single user (optionally refetch full details) ──
  const openView = async (user) => {
    setViewUser(user); // show immediately with table data
    try {
      const full = await apiGetUser(user.id);
      setViewUser(mapUser(full)); // update with full data if API returns more
    } catch {
      // silently keep table data if refetch fails
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes slideUp { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
        input::placeholder { color: #3a4a6b; }
      `}</style>

      {/* ── Top Nav ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: "52px", background: "#0d1117",
        borderBottom: "1px solid #1e2740", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #1e2740", background: "#141824", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </div>
          <div style={{ background: "#1e3a8a", borderRadius: "4px", padding: "3px 10px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Users</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative", cursor: "pointer", color: "#94a3b8" }}>
            <BellIcon />
            <div style={{ position: "absolute", top: "-6px", right: "-8px", background: "#ef4444", borderRadius: "10px", padding: "1px 5px", fontSize: "9px", fontWeight: 700, color: "#fff" }}>8</div>
          </div>
          <div style={{ cursor: "pointer", color: "#94a3b8" }}><SunIcon /></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#6c63ff,#4fd1c5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff" }}>RG</div>
            <div>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif" }}>Rohit Gurjar</p>
              <p style={{ margin: 0, fontSize: "10px", color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>Neeraj</p>
            </div>
          </div>
          <div style={{ cursor: "pointer", color: "#64748b" }}><LogoutIcon /></div>
        </div>
      </div>

      {/* ── Page Body ── */}
      <div style={{ padding: "20px 24px" }}>

        {/* Search + Refresh row */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px", background: "#141824", border: "1px solid #1e2740", borderRadius: "10px", padding: "11px 18px" }}>
            <span style={{ color: "#3b82f6", flexShrink: 0 }}><SearchIcon /></span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users — type to filter instantly..."
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "14px", color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", caretColor: "#3b82f6" }}
            />
            {search && <div onClick={() => setSearch("")} style={{ cursor: "pointer", color: "#64748b", fontSize: "18px", lineHeight: 1 }}>×</div>}
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            style={{
              padding: "0 16px", borderRadius: "10px", border: "1px solid #1e2740",
              background: "#141824", color: loading ? "#3a4460" : "#94a3b8",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", gap: "7px",
              fontSize: "13px", fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <RefreshIcon /> Refresh
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", padding: "10px 16px", marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", color: "#fca5a5", fontFamily: "'DM Sans', sans-serif" }}>⚠ {error}</span>
            <button onClick={fetchUsers} style={{ fontSize: "12px", color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Retry</button>
          </div>
        )}

        {/* Selection bar */}
        {selected.size > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "8px", padding: "8px 16px", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px", color: "#93c5fd", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
              {selected.size} user{selected.size > 1 ? "s" : ""} selected
            </span>
            <div style={{ flex: 1 }} />
            <button onClick={clearSelection} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              Clear
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              disabled={actionLoading}
              style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}
            >
              <TrashIcon /> Delete Selected
            </button>
          </div>
        )}

        {/* Table */}
        <div style={{ background: "#141824", border: "1px solid #1e2740", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
              <thead>
                <tr style={{ background: "#0f1520" }}>
                  <th style={{ padding: "13px 14px", width: "44px", borderBottom: "1px solid #1e2740" }}>
                    <Checkbox checked={allPageSelected} indeterminate={somePageSelected} onChange={toggleAll} />
                  </th>
                  <ColHeader>SN</ColHeader>
                  <ColHeader>Status</ColHeader>
                  <ColHeader>Date</ColHeader>
                  <ColHeader>Pic</ColHeader>
                  <ColHeader>User Name</ColHeader>
                  <ColHeader>Contact</ColHeader>
                  <ColHeader>Password</ColHeader>
                  <ColHeader>Wallet</ColHeader>
                  <ColHeader>VIP</ColHeader>
                  <ColHeader>Actions</ColHeader>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: perPage }).map((_, i) => <SkeletonRow key={i} cols={11} />)
                ) : mappedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={11} style={{ padding: "60px", textAlign: "center", color: "#3a4460", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
                      {debouncedSearch ? "No users match your search" : "No users found"}
                    </td>
                  </tr>
                ) : (
                  mappedUsers.map((user, idx) => {
                    const isSel = selected.has(user.id);
                    const isHov = hoveredRow === user.id;
                    return (
                      <tr
                        key={user.id}
                        onMouseEnter={() => setHoveredRow(user.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          background: isSel ? "rgba(59,130,246,0.07)" : isHov ? "rgba(255,255,255,0.025)" : "transparent",
                          borderBottom: idx < mappedUsers.length - 1 ? "1px solid #1a2035" : "none",
                          transition: "background 0.12s ease",
                        }}
                      >
                        <td style={{ padding: "12px 14px" }}><Checkbox checked={isSel} onChange={() => toggleOne(user.id)} /></td>
                        <td style={{ padding: "12px 14px" }}><span style={{ fontSize: "13px", color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>{user.sn}</span></td>
                        <td style={{ padding: "12px 14px" }}><StatusBadge status={user.status} /></td>
                        <td style={{ padding: "12px 14px" }}><span style={{ fontSize: "12px", color: "#64748b", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{user.date}</span></td>
                        <td style={{ padding: "12px 14px" }}>
                          {user.avatar
                            ? <img src={user.avatar} alt={user.name} style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", border: "2px solid #2a3145" }} />
                            : <Avatar name={user.name} size={34} />}
                        </td>
                        <td style={{ padding: "12px 14px" }}><span style={{ fontSize: "13.5px", fontWeight: 600, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>{user.name}</span></td>
                        <td style={{ padding: "12px 14px" }}><span style={{ fontSize: "13px", color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>{user.contact}</span></td>
                        <td style={{ padding: "12px 14px", textAlign: "center" }}><span style={{ fontSize: "15px", color: "#3a4460" }}>—</span></td>
                        <td style={{ padding: "12px 14px" }}><span style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>{user.wallet}</span></td>
                        <td style={{ padding: "12px 14px" }}>
                          {user.vip === "Yes"
                            ? <span style={{ fontSize: "11px", fontWeight: 700, color: "#f59e0b", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "4px", padding: "2px 7px" }}>YES</span>
                            : <span style={{ fontSize: "13px", color: "#3a4460", fontFamily: "'DM Sans', sans-serif" }}>No</span>}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div onClick={() => openView(user)} onMouseEnter={() => setHoveredBtn(`v-${user.id}`)} onMouseLeave={() => setHoveredBtn(null)} title="View" style={{ cursor: "pointer", color: hoveredBtn === `v-${user.id}` ? "#93c5fd" : "#64748b", transition: "color 0.15s" }}><EyeIcon /></div>
                            <div onClick={() => openEdit(user)} onMouseEnter={() => setHoveredBtn(`e-${user.id}`)} onMouseLeave={() => setHoveredBtn(null)} title="Edit" style={{ cursor: "pointer", color: hoveredBtn === `e-${user.id}` ? "#86efac" : "#64748b", transition: "color 0.15s" }}><EditIcon /></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #1e2740", background: "#0f1520" }}>
            <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>
              {loading ? "Loading…" : `Showing ${Math.min((page-1)*perPage+1, total)}–${Math.min(page*perPage, total)} of ${total} users`}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1||loading} style={{ width:"30px",height:"30px",borderRadius:"6px",border:"1px solid #1e2740",background:"#141824",color:page===1?"#2d3a55":"#94a3b8",cursor:page===1?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <ChevronLeftIcon />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p;
                if (totalPages <= 5) p = i + 1;
                else if (page <= 3) p = i + 1;
                else if (page >= totalPages - 2) p = totalPages - 4 + i;
                else p = page - 2 + i;
                return (
                  <button key={p} onClick={() => setPage(p)} style={{ width:"30px",height:"30px",borderRadius:"6px",border:page===p?"1px solid #3b82f6":"1px solid #1e2740",background:page===p?"#1e3a8a":"#141824",color:page===p?"#93c5fd":"#64748b",fontSize:"12px",fontWeight:page===p?700:400,cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages||loading} style={{ width:"30px",height:"30px",borderRadius:"6px",border:"1px solid #1e2740",background:"#141824",color:page===totalPages?"#2d3a55":"#94a3b8",cursor:page===totalPages?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── View Modal ── */}
      {viewUser && (
        <div onClick={() => setViewUser(null)} style={{ position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#141824",border:"1px solid #1e2740",borderRadius:"16px",padding:"28px",width:"360px",boxShadow:"0 24px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"14px",marginBottom:"20px" }}>
              {viewUser.avatar
                ? <img src={viewUser.avatar} alt={viewUser.name} style={{ width:"52px",height:"52px",borderRadius:"50%",objectFit:"cover",border:"2px solid #2a3145" }} />
                : <Avatar name={viewUser.name} size={52} />}
              <div>
                <h3 style={{ margin:0,fontSize:"17px",fontWeight:700,color:"#f1f5f9",fontFamily:"'DM Sans',sans-serif" }}>{viewUser.name}</h3>
                <p style={{ margin:"3px 0 0",fontSize:"12px",color:"#64748b",fontFamily:"'DM Sans',sans-serif" }}>SN: {viewUser.sn}</p>
              </div>
            </div>
            {[["Status",<StatusBadge status={viewUser.status}/>],["Contact",viewUser.contact],["Joined",viewUser.date],["Wallet",viewUser.wallet],["VIP",viewUser.vip]].map(([label,value])=>(
              <div key={label} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #1e2740" }}>
                <span style={{ fontSize:"12px",color:"#64748b",fontFamily:"'DM Sans',sans-serif" }}>{label}</span>
                {typeof value==="string"?<span style={{ fontSize:"13px",fontWeight:600,color:"#e2e8f0",fontFamily:"'DM Sans',sans-serif" }}>{value}</span>:value}
              </div>
            ))}
            <button onClick={()=>setViewUser(null)} style={{ width:"100%",marginTop:"20px",padding:"10px",borderRadius:"8px",border:"none",background:"#1e3a8a",color:"#93c5fd",fontSize:"13px",fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer" }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editUser && (
        <div onClick={() => setEditUser(null)} style={{ position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#141824",border:"1px solid #1e2740",borderRadius:"16px",padding:"28px",width:"380px",boxShadow:"0 24px 80px rgba(0,0,0,0.6)" }}>
            <h3 style={{ margin:"0 0 20px",fontSize:"16px",fontWeight:700,color:"#f1f5f9",fontFamily:"'DM Sans',sans-serif" }}>Edit User</h3>
            {[{label:"User Name",key:"name"},{label:"Contact",key:"contact"},{label:"Wallet",key:"wallet"}].map(f=>(
              <div key={f.key} style={{ marginBottom:"14px" }}>
                <label style={{ display:"block",fontSize:"11px",fontWeight:600,letterSpacing:"0.5px",color:"#64748b",fontFamily:"'DM Sans',sans-serif",marginBottom:"5px",textTransform:"uppercase" }}>{f.label}</label>
                <input
                  value={editForm[f.key] || ""}
                  onChange={e=>setEditForm(p=>({...p,[f.key]:e.target.value}))}
                  style={{ width:"100%",padding:"9px 12px",boxSizing:"border-box",background:"#0f1520",border:"1px solid #1e2740",borderRadius:"8px",color:"#f1f5f9",fontSize:"13px",fontFamily:"'DM Sans',sans-serif",outline:"none" }}
                />
              </div>
            ))}
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"20px" }}>
              {[{label:"Status",key:"status",options:["Active","Inactive","Blocked"]},{label:"VIP",key:"vip",options:["Yes","No"]}].map(f=>(
                <div key={f.key}>
                  <label style={{ display:"block",fontSize:"11px",fontWeight:600,letterSpacing:"0.5px",color:"#64748b",fontFamily:"'DM Sans',sans-serif",marginBottom:"5px",textTransform:"uppercase" }}>{f.label}</label>
                  <select value={editForm[f.key]||""} onChange={e=>setEditForm(p=>({...p,[f.key]:e.target.value}))} style={{ width:"100%",padding:"9px 12px",background:"#0f1520",border:"1px solid #1e2740",borderRadius:"8px",color:"#f1f5f9",fontSize:"13px",fontFamily:"'DM Sans',sans-serif",outline:"none",cursor:"pointer" }}>
                    {f.options.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ display:"flex",gap:"10px" }}>
              <button onClick={()=>setEditUser(null)} style={{ flex:1,padding:"10px",borderRadius:"8px",border:"1px solid #1e2740",background:"#1a2035",color:"#94a3b8",fontSize:"13px",fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer" }}>Cancel</button>
              <button onClick={handleEditSave} disabled={actionLoading} style={{ flex:1,padding:"10px",borderRadius:"8px",border:"none",background:actionLoading?"#142a5a":"#1e3a8a",color:"#93c5fd",fontSize:"13px",fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:actionLoading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px" }}>
                {actionLoading ? <><SpinnerIcon /> Saving…</> : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Delete Modal ── */}
      {confirmDelete && (
        <div onClick={()=>setConfirmDelete(false)} style={{ position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#141824",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"16px",padding:"28px",width:"340px",boxShadow:"0 24px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ width:"44px",height:"44px",borderRadius:"12px",background:"rgba(239,68,68,0.12)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px" }}>
              <TrashIcon style={{ color:"#ef4444" }} />
            </div>
            <h3 style={{ margin:"0 0 8px",fontSize:"16px",fontWeight:700,color:"#f1f5f9",fontFamily:"'DM Sans',sans-serif" }}>Delete {selected.size} user{selected.size>1?"s":""}?</h3>
            <p style={{ margin:"0 0 20px",fontSize:"13px",color:"#64748b",fontFamily:"'DM Sans',sans-serif",lineHeight:1.5 }}>Yeh action permanent hai aur undo nahi ho sakta.</p>
            <div style={{ display:"flex",gap:"10px" }}>
              <button onClick={()=>setConfirmDelete(false)} style={{ flex:1,padding:"10px",borderRadius:"8px",border:"1px solid #1e2740",background:"#1a2035",color:"#94a3b8",fontSize:"13px",fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer" }}>Cancel</button>
              <button onClick={handleDeleteSelected} disabled={actionLoading} style={{ flex:1,padding:"10px",borderRadius:"8px",border:"none",background:"rgba(239,68,68,0.15)",color:"#ef4444",fontSize:"13px",fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px" }}>
                {actionLoading ? <><SpinnerIcon /> Deleting…</> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)} />}
    </div>
  );
};

export default UsersTable;
