import React, { useState, } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION - Apne panel ke hisaab se yahan change karo
// ─────────────────────────────────────────────────────────────────────────────
export const ADMIN_CONFIG = {
  // API Endpoints
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://your-api.com/api",
    endpoints: {
      getAdmins: "/admins",
      createAdmin: "/admins",
      updateAdmin: "/admins/:id",
      deleteAdmin: "/admins/bulk-delete",
      getRoles: "/roles",
      createRole: "/roles",
      updateRole: "/roles/:id",
      getPermissions: "/permissions",
    }
  },
  
  // Role configuration
  roles: {
    "Super Admin": { color: "#ef4444", icon: "👑", level: 1, description: "Full system access" },
    "Sub Admin": { color: "#f59e0b", icon: "👤", level: 2, description: "Limited admin access" },
    "Customer Care": { color: "#10b981", icon: "💬", level: 3, description: "Support and customer management" },
    "Finance Admin": { color: "#8b5cf6", icon: "💰", level: 4, description: "Financial operations" },
    "Restaurant Manager": { color: "#06b6d4", icon: "🍽️", level: 5, description: "Restaurant management" },
  },
  
  // Permissions configuration
  permissions: [
    { id: "full_access", category: "System", label: "Full System Access", description: "Complete access to all features" },
    { id: "manage_admins", category: "Admin", label: "Manage Admins", description: "Create, edit, delete admin users" },
    { id: "manage_roles", category: "Admin", label: "Manage Roles", description: "Create and edit roles" },
    { id: "manage_permissions", category: "Admin", label: "Manage Permissions", description: "Assign permissions to roles" },
    { id: "manage_users", category: "Users", label: "Manage Users", description: "View, edit, delete customer users" },
    { id: "view_orders", category: "Orders", label: "View Orders", description: "View all orders" },
    { id: "manage_orders", category: "Orders", label: "Manage Orders", description: "Edit, cancel, update orders" },
    { id: "manage_coupons", category: "Marketing", label: "Manage Coupons", description: "Create and edit coupons" },
    { id: "view_reports", category: "Reports", label: "View Reports", description: "Access analytics and reports" },
    { id: "view_customers", category: "Support", label: "View Customers", description: "View customer details" },
    { id: "handle_tickets", category: "Support", label: "Handle Tickets", description: "Manage customer support tickets" },
    { id: "send_notifications", category: "Communications", label: "Send Notifications", description: "Send push notifications" },
    { id: "view_finance", category: "Finance", label: "View Finance", description: "View financial data" },
    { id: "manage_payouts", category: "Finance", label: "Manage Payouts", description: "Process driver payouts" },
    { id: "manage_restaurants", category: "Restaurants", label: "Manage Restaurants", description: "Add, edit, delete restaurants" },
    { id: "manage_menu", category: "Restaurants", label: "Manage Menu", description: "Edit restaurant menus" },
  ],
  
  // Table columns configuration
  tableColumns: {
    admins: [
      { key: "name", label: "Admin", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "role", label: "Role", sortable: true },
      { key: "status", label: "Status", sortable: true },
      { key: "lastLogin", label: "Last Login", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ],
    subadmins: [
      { key: "name", label: "Admin", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "permissions", label: "Permissions", sortable: false },
      { key: "status", label: "Status", sortable: true },
      { key: "createdAt", label: "Created", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ],
    customercare: [
      { key: "name", label: "Agent", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "tickets", label: "Tickets Handled", sortable: true },
      { key: "status", label: "Status", sortable: true },
      { key: "lastActive", label: "Last Active", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ],
  },
  
  // Features toggle
  features: {
    showStatsCards: true,
    showBulkActions: true,
    showExport: true,
    showRolePermissions: true,
    showCustomerCare: true,
    showSearchFilter: true,
  },
  
  // Pagination settings
  pagination: {
    defaultPerPage: 10,
    perPageOptions: [10, 25, 50, 100],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA - API se connect karne se pehle test ke liye
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_ADMINS = [
  { id: "ADM_001", name: "Rajesh Kumar", email: "rajesh@admin.com", role: "Super Admin", status: "Active", lastLogin: "2024-02-15 10:30 AM", createdAt: "2024-01-01", ticketsHandled: 0, phone: "+91 98765 43210" },
  { id: "ADM_002", name: "Priya Sharma", email: "priya@admin.com", role: "Sub Admin", status: "Active", lastLogin: "2024-02-14 03:45 PM", createdAt: "2024-01-10", ticketsHandled: 0, phone: "+91 87654 32109" },
  { id: "ADM_003", name: "Amit Verma", email: "amit@admin.com", role: "Customer Care", status: "Active", lastLogin: "2024-02-15 09:15 AM", createdAt: "2024-01-15", ticketsHandled: 156, phone: "+91 76543 21098" },
  { id: "ADM_004", name: "Neha Gupta", email: "neha@admin.com", role: "Sub Admin", status: "Inactive", lastLogin: "2024-02-10 11:00 AM", createdAt: "2024-01-20", ticketsHandled: 0, phone: "+91 65432 10987" },
  { id: "ADM_005", name: "Vikram Singh", email: "vikram@admin.com", role: "Customer Care", status: "Active", lastLogin: "2024-02-13 02:30 PM", createdAt: "2024-01-25", ticketsHandled: 89, phone: "+91 54321 09876" },
  { id: "ADM_006", name: "Anjali Desai", email: "anjali@admin.com", role: "Super Admin", status: "Active", lastLogin: "2024-02-15 08:45 AM", createdAt: "2024-02-01", ticketsHandled: 0, phone: "+91 43210 98765" },
];

// ─────────────────────────────────────────────────────────────────────────────
// GET THEME STYLES - Based on isDark prop
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
// ICONS COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const Icons = {
  Admin: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
  SubAdmin: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  Shield: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L3 7v7c0 5 9 8 9 8s9-3 9-8V7l-9-5z"/></svg>),
  CustomerCare: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>),
  Plus: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
  Edit: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>),
  Trash: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>),
  Search: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  ChevronLeft: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>),
  ChevronRight: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>),
  Close: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  Check: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>),
  Dashboard: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>),
  Download: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
};

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const Avatar = ({ name, ts }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (<div style={{ width: "36px", height: "36px", borderRadius: "12px", background: ts.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "white" }}>{initials}</div>);
};

const StatusBadge = ({ status, ts }) => {
  const config = { Active: { bg: "rgba(16,185,129,0.12)", color: ts.success }, Inactive: { bg: "rgba(107,114,128,0.12)", color: ts.textMuted } };
  const c = config[status] || config.Inactive;
  return (<span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", background: c.bg, color: c.color, fontSize: "11px", fontWeight: 600 }}><div style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.color }} />{status}</span>);
};

const RoleBadge = ({ role, ts }) => {
  const roleConfig = ADMIN_CONFIG.roles[role] || { color: ts.textMuted };
  const bg = roleConfig.color ? `rgba(${parseInt(roleConfig.color.slice(1,3), 16)}, ${parseInt(roleConfig.color.slice(3,5), 16)}, ${parseInt(roleConfig.color.slice(5,7), 16)}, 0.12)` : ts.surfaceLighter;
  return (<span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: bg, color: roleConfig.color || ts.textMuted }}>{role}</span>);
};

const Checkbox = ({ checked, onChange, ts }) => (<div onClick={onChange} style={{ width: "18px", height: "18px", borderRadius: "6px", border: checked ? `2px solid ${ts.primary}` : `2px solid ${ts.textDim}`, background: checked ? ts.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>{checked && <Icons.Check />}</div>);

const Toast = ({ message, type, onClose, ts }) => (
  <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 999, background: ts.glass, backdropFilter: "blur(10px)", border: `1px solid ${type === "error" ? ts.error : ts.success}`, borderRadius: "12px", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", animation: "slideIn 0.3s ease" }}>
    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? ts.error : ts.success }} />
    <span style={{ fontSize: "13px", color: type === "error" ? ts.error : ts.success }}>{message}</span>
    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: ts.textMuted }}><Icons.Close /></button>
  </div>
);

const StatCard = ({ icon, label, value, change, ts }) => (
  <div style={{ background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "16px", padding: "16px 20px", transition: "all 0.3s ease" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
      <div style={{ padding: "8px", background: `${ts.primary}1A`, borderRadius: "12px", color: ts.primary }}>{icon}</div>
      {change && <span style={{ fontSize: "11px", color: change > 0 ? ts.success : ts.error }}>{change > 0 ? `+${change}%` : `${change}%`}</span>}
    </div>
    <div style={{ fontSize: "24px", fontWeight: 700, color: ts.text, marginBottom: "4px" }}>{value}</div>
    <div style={{ fontSize: "12px", color: ts.textMuted }}>{label}</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AdminManagement = ({ isDark = true, customAdmins = null }) => {
  const ts = getThemeStyles(isDark)[isDark ? "dark" : "light"];

  const [activeTab, setActiveTab] = useState("admins");
  const [admins, ] = useState(customAdmins || DUMMY_ADMINS);
  const [roles, ] = useState(Object.entries(ADMIN_CONFIG.roles).map(([name, config], index) => ({
    id: `role_${index + 1}`, name, description: config.description, 
    userCount: admins.filter(a => a.role === name).length, 
    permissions: [`manage_${name.toLowerCase().replace(" ", "_")}`, "view_orders"],
    color: config.color, icon: config.icon
  })));
  const [permissions] = useState(ADMIN_CONFIG.permissions);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(ADMIN_CONFIG.pagination.defaultPerPage);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [ setSelectedAdmin] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "Sub Admin", status: "Active", password: "", phone: "" });
  const [roleFormData, setRoleFormData] = useState({ name: "", description: "", permissions: [] });
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder,] = useState("asc");

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3500); };

  const filteredAdmins = admins
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || 
                a.email.toLowerCase().includes(search.toLowerCase()) || 
                a.role.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") return a[sortBy] > b[sortBy] ? 1 : -1;
      return a[sortBy] < b[sortBy] ? 1 : -1;
    });
  
  const paginatedAdmins = filteredAdmins.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredAdmins.length / perPage);

  const stats = {
    totalAdmins: admins.length,
    activeAdmins: admins.filter(a => a.status === "Active").length,
    superAdmins: admins.filter(a => a.role === "Super Admin").length,
    supportAgents: admins.filter(a => a.role === "Customer Care").length,
  };

  const handleAddAdmin = () => { 
    setFormData({ name: "", email: "", role: "Sub Admin", status: "Active", password: "", phone: "" }); 
    setShowAddModal(true); 
  };
  
  const handleEditAdmin = (admin) => { 
    setSelectedAdmin(admin); 
    setFormData(admin); 
    setShowEditModal(true); 
  };
  
  const handleSaveAdmin = () => { 
    if (!formData.name || !formData.email) { showToast("Please fill required fields", "error"); return; }
    showToast(`${formData.name} ${showAddModal ? "added" : "updated"} successfully`); 
    setShowAddModal(false); setShowEditModal(false); 
  };
  
  const handleDeleteSelected = () => { 
    showToast(`${selected.size} admin(s) deleted`); 
    setSelected(new Set()); 
    setConfirmDelete(false); 
  };

  const handleAddRole = () => { 
    setRoleFormData({ name: "", description: "", permissions: [] }); 
    setSelectedRole(null); 
    setShowRoleModal(true); 
  };
  
  const handleEditRole = (role) => { 
    setSelectedRole(role); 
    setRoleFormData(role); 
    setShowRoleModal(true); 
  };
  
  const handleSaveRole = () => { 
    if (!roleFormData.name) { showToast("Please enter role name", "error"); return; }
    showToast(`Role ${roleFormData.name} ${selectedRole ? "updated" : "created"} successfully`); 
    setShowRoleModal(false); 
  };

  const handlePermissionToggle = (permId) => {
    setRoleFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId) ? prev.permissions.filter(p => p !== permId) : [...prev.permissions, permId]
    }));
  };

  const toggleAll = () => {
    if (selected.size === paginatedAdmins.length) setSelected(new Set());
    else setSelected(new Set(paginatedAdmins.map(a => a.id)));
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Role", "Status", "Last Login", "Phone"];
    const data = paginatedAdmins.map(a => [a.name, a.email, a.role, a.status, a.lastLogin, a.phone || ""]);
    const csv = [headers, ...data].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "admins.csv"; a.click();
    URL.revokeObjectURL(url);
    showToast("Exported successfully");
  };

  const styles = {
    container: { minHeight: "100vh", background: ts.background, padding: "28px 32px", fontFamily: "'Inter', 'DM Sans', sans-serif", transition: "all 0.3s ease" },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" },
    welcomeSection: { display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" },
    title: { fontSize: "28px", fontWeight: 700, background: ts.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
    subtitle: { fontSize: "13px", color: ts.textMuted },
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" },
    tabs: { display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap", borderBottom: `1px solid ${ts.border}`, paddingBottom: "12px" },
    tab: (isActive) => ({ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "12px", background: isActive ? ts.primary : "transparent", color: isActive ? "white" : ts.textSecondary, cursor: "pointer", border: "none", fontSize: "14px", fontWeight: 500, transition: "all 0.2s" }),
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" },
    sectionTitle: { fontSize: "18px", fontWeight: 600, color: ts.text },
    addBtn: { background: ts.gradient, border: "none", padding: "10px 20px", borderRadius: "12px", color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", transition: "transform 0.2s" },
    searchBar: { display: "flex", alignItems: "center", gap: "12px", background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "14px", padding: "10px 16px", marginBottom: "20px" },
    searchInput: { flex: 1, background: "transparent", border: "none", outline: "none", color: ts.text, fontSize: "13px", fontFamily: "inherit" },
    tableWrapper: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "20px", overflow: "hidden" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "800px" },
    th: { padding: "16px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: ts.primary, borderBottom: `1px solid ${ts.border}`, background: ts.surfaceLighter, cursor: "pointer" },
    td: { padding: "16px", borderBottom: `1px solid ${ts.border}`, fontSize: "13px", color: ts.textSecondary },
    pagination: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderTop: `1px solid ${ts.border}`, flexWrap: "wrap", gap: "12px" },
    perPageSelect: { padding: "6px 10px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "8px", color: ts.text, cursor: "pointer" },
    modalOverlay: { position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" },
    modal: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "24px", width: "550px", maxHeight: "85vh", overflow: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" },
    modalHeader: { padding: "20px 24px", borderBottom: `1px solid ${ts.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: ts.surface, zIndex: 1 },
    modalTitle: { fontSize: "18px", fontWeight: 700, color: ts.text, display: "flex", alignItems: "center", gap: "10px" },
    modalBody: { padding: "24px" },
    formGroup: { marginBottom: "18px" },
    label: { display: "block", fontSize: "12px", fontWeight: 600, color: ts.textMuted, marginBottom: "6px", letterSpacing: "0.3px" },
    input: { width: "100%", padding: "10px 14px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "12px", fontSize: "13px", color: ts.text, outline: "none", transition: "border 0.2s" },
    select: { width: "100%", padding: "10px 14px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "12px", fontSize: "13px", color: ts.text, cursor: "pointer" },
    modalFooter: { padding: "16px 24px", borderTop: `1px solid ${ts.border}`, display: "flex", gap: "12px", justifyContent: "flex-end" },
    btnCancel: { padding: "10px 20px", background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "12px", color: ts.textSecondary, cursor: "pointer", fontSize: "13px", fontWeight: 500 },
    btnSave: { padding: "10px 20px", background: ts.gradient, border: "none", borderRadius: "12px", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
    btnDanger: { padding: "10px 20px", background: `${ts.error}1A`, border: `1px solid ${ts.error}`, borderRadius: "12px", color: ts.error, cursor: "pointer", fontSize: "13px", fontWeight: 500 },
    roleCard: { background: ts.surfaceLighter, borderRadius: "16px", padding: "20px", border: `1px solid ${ts.border}`, transition: "all 0.2s", cursor: "pointer", "&:hover": { transform: "translateY(-2px)" } },
    permissionGroup: { marginBottom: "24px" },
    permissionCategory: { fontSize: "14px", fontWeight: 600, color: ts.primary, marginBottom: "12px", paddingBottom: "6px", borderBottom: `1px solid ${ts.border}` },
    permissionItem: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: `1px solid ${ts.border}`, transition: "all 0.2s", "&:hover": { background: `${ts.primary}08` } },
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

      {/* Top Bar - No theme toggle button */}
      <div style={styles.topBar}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.title}>Admin Management</h1>
          <span style={styles.subtitle}>Manage administrators, roles & permissions</span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {ADMIN_CONFIG.features.showExport && (
            <button onClick={exportToCSV} style={{ ...styles.btnSave, background: ts.success }}>
              <Icons.Download /> Export
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {ADMIN_CONFIG.features.showStatsCards && (
        <div style={styles.statsGrid}>
          <StatCard icon={<Icons.Admin />} label="Total Admins" value={stats.totalAdmins} change={12} ts={ts} />
          <StatCard icon={<Icons.Dashboard />} label="Active Admins" value={stats.activeAdmins} change={8} ts={ts} />
          <StatCard icon={<Icons.Shield />} label="Super Admins" value={stats.superAdmins} ts={ts} />
          <StatCard icon={<Icons.CustomerCare />} label="Support Agents" value={stats.supportAgents} change={5} ts={ts} />
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === "admins")} onClick={() => setActiveTab("admins")}><Icons.Admin /> All Admins</button>
        <button style={styles.tab(activeTab === "subadmins")} onClick={() => setActiveTab("subadmins")}><Icons.SubAdmin /> Sub Admins</button>
        {ADMIN_CONFIG.features.showRolePermissions && (
          <button style={styles.tab(activeTab === "roles")} onClick={() => setActiveTab("roles")}><Icons.Shield /> Roles & Permissions</button>
        )}
        {ADMIN_CONFIG.features.showCustomerCare && (
          <button style={styles.tab(activeTab === "customercare")} onClick={() => setActiveTab("customercare")}><Icons.CustomerCare /> Customer Care</button>
        )}
      </div>

      {/* All Admins Tab */}
      {activeTab === "admins" && (
        <>
          <div style={styles.header}>
            <h2 style={styles.sectionTitle}>All Administrators</h2>
            <button style={styles.addBtn} onClick={handleAddAdmin}><Icons.Plus /> Add New Admin</button>
          </div>
          {ADMIN_CONFIG.features.showSearchFilter && (
            <div style={styles.searchBar}>
              <Icons.Search /><input style={styles.searchInput} placeholder="Search by name, email or role..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          )}
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {ADMIN_CONFIG.features.showBulkActions && <th style={styles.th}><Checkbox checked={selected.size === paginatedAdmins.length && paginatedAdmins.length > 0} onChange={toggleAll} ts={ts} /></th>}
                  {ADMIN_CONFIG.tableColumns.admins.map(col => (
                    <th key={col.key} style={styles.th} onClick={() => col.sortable && setSortBy(col.key)}>
                      {col.label} {sortBy === col.key && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedAdmins.map(admin => (
                  <tr key={admin.id}>
                    {ADMIN_CONFIG.features.showBulkActions && <td style={styles.td}><Checkbox checked={selected.has(admin.id)} onChange={() => { const newSet = new Set(selected); newSet.has(admin.id) ? newSet.delete(admin.id) : newSet.add(admin.id); setSelected(newSet); }} ts={ts} /></td>}
                    <td style={styles.td}><div style={{ display: "flex", alignItems: "center", gap: "12px" }}><Avatar name={admin.name} ts={ts} /><strong style={{ color: ts.text }}>{admin.name}</strong></div></td>
                    <td style={styles.td}>{admin.email}</td>
                    <td style={styles.td}><RoleBadge role={admin.role} ts={ts} /></td>
                    <td style={styles.td}><StatusBadge status={admin.status} ts={ts} /></td>
                    <td style={styles.td}>{admin.lastLogin}</td>
                    <td style={styles.td}><button onClick={() => handleEditAdmin(admin)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary, padding: "6px", borderRadius: "8px" }}><Icons.Edit /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.pagination}>
              <span>{`${(page-1)*perPage+1}-${Math.min(page*perPage, filteredAdmins.length)} of ${filteredAdmins.length} admins`}</span>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} style={styles.perPageSelect}>
                  {ADMIN_CONFIG.pagination.perPageOptions.map(opt => <option key={opt} value={opt}>{opt} per page</option>)}
                </select>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={{ padding: "6px 12px", borderRadius: "10px", border: `1px solid ${ts.border}`, background: ts.surface, cursor: "pointer" }}><Icons.ChevronLeft /></button>
                  <span style={{ padding: "6px 12px", color: ts.text }}>{page} / {totalPages}</span>
                  <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} style={{ padding: "6px 12px", borderRadius: "10px", border: `1px solid ${ts.border}`, background: ts.surface, cursor: "pointer" }}><Icons.ChevronRight /></button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sub Admins Tab */}
      {activeTab === "subadmins" && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>Sub Administrators</h2><button style={styles.addBtn} onClick={handleAddAdmin}><Icons.Plus /> Add Sub Admin</button></div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead><tr>{ADMIN_CONFIG.tableColumns.subadmins.map(col => <th key={col.key} style={styles.th}>{col.label}</th>)}</tr></thead>
              <tbody>{paginatedAdmins.filter(a => a.role === "Sub Admin").map(admin => (<tr key={admin.id}><td style={styles.td}><div style={{ display: "flex", alignItems: "center", gap: "12px" }}><Avatar name={admin.name} ts={ts} /><strong style={{ color: ts.text }}>{admin.name}</strong></div></td><td style={styles.td}>{admin.email}</td><td style={styles.td}><span style={{ fontSize: "11px", padding: "4px 10px", background: `${ts.primary}1A`, borderRadius: "20px", color: ts.primary }}>Limited Access</span></td><td style={styles.td}><StatusBadge status={admin.status} ts={ts} /></td><td style={styles.td}>{admin.createdAt}</td><td style={styles.td}><button onClick={() => handleEditAdmin(admin)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}><Icons.Edit /></button></td></tr>))}</tbody>
            </table>
          </div>
        </>
      )}

      {/* Roles Tab */}
      {activeTab === "roles" && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>Roles & Permissions</h2><button style={styles.addBtn} onClick={handleAddRole}><Icons.Plus /> Create New Role</button></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
            {roles.map(role => (<div key={role.id} style={styles.roleCard} onClick={() => handleEditRole(role)}><div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}><span style={{ fontSize: "28px" }}>{role.icon}</span><div><h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: ts.text }}>{role.name}</h3><p style={{ fontSize: "12px", color: ts.textMuted, marginTop: "2px" }}>{role.description}</p></div></div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}><span style={{ fontSize: "11px", padding: "4px 10px", background: `${ts.primary}1A`, borderRadius: "20px", color: ts.primary }}>{role.userCount} users</span><span style={{ fontSize: "11px", color: ts.textMuted }}>{role.permissions.length} permissions</span></div></div>))}
          </div>
        </>
      )}

      {/* Customer Care Tab */}
      {activeTab === "customercare" && ADMIN_CONFIG.features.showCustomerCare && (
        <>
          <div style={styles.header}><h2 style={styles.sectionTitle}>Customer Care Team</h2><button style={styles.addBtn} onClick={handleAddAdmin}><Icons.Plus /> Add Support Agent</button></div>
          <div style={styles.tableWrapper}>
          <table style={styles.table}>
  <thead>
    <tr>
      {ADMIN_CONFIG.tableColumns.customercare.map(col => (
        <th key={col.key} style={styles.th}>{col.label}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {paginatedAdmins.filter(a => a.role === "Customer Care").map(admin => (
      <tr key={admin.id}>
        <td style={styles.td}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar name={admin.name} ts={ts} />
            <strong style={{ color: ts.text }}>{admin.name}</strong>
            <span style={{ fontSize: "10px", color: ts.success, background: `${ts.success}1A`, padding: "2px 8px", borderRadius: "20px" }}>
              Online
            </span>
          </div>
        </td>
        <td style={styles.td}>{admin.email}</td>
        <td style={styles.td}>
          <span style={{ fontWeight: 600, color: ts.primary }}>{admin.ticketsHandled}</span> tickets
        </td>
        <td style={styles.td}>
          <StatusBadge status={admin.status} ts={ts} />
        </td>
        <td style={styles.td}>{admin.lastLogin}</td>
        <td style={styles.td}>
          <button onClick={() => handleEditAdmin(admin)} style={{ background: "none", border: "none", cursor: "pointer", color: ts.primary }}>
            <Icons.Edit />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        </>
      )}

      {/* Bulk Delete Bar */}
      {ADMIN_CONFIG.features.showBulkActions && selected.size > 0 && (
        <div style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "50px", padding: "8px 20px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 100 }}>
          <span style={{ fontSize: "13px", color: ts.text }}>{selected.size} item(s) selected</span>
          <button onClick={() => setSelected(new Set())} style={styles.btnCancel}>Cancel</button>
          <button onClick={() => setConfirmDelete(true)} style={styles.btnDanger}><Icons.Trash /> Delete</button>
        </div>
      )}

      {/* Add/Edit Admin Modal */}
      {(showAddModal || showEditModal) && (<div style={styles.modalOverlay} onClick={() => { setShowAddModal(false); setShowEditModal(false); }}><div style={styles.modal} onClick={e => e.stopPropagation()}><div style={styles.modalHeader}><div style={styles.modalTitle}><Icons.Admin />{showAddModal ? "Add New Administrator" : "Edit Administrator"}</div><button onClick={() => { setShowAddModal(false); setShowEditModal(false); }}><Icons.Close /></button></div><div style={styles.modalBody}><div style={styles.formGroup}><label style={styles.label}>Full Name *</label><input style={styles.input} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter full name" /></div><div style={styles.formGroup}><label style={styles.label}>Email Address *</label><input style={styles.input} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email address" /></div><div style={styles.formGroup}><label style={styles.label}>Phone Number</label><input style={styles.input} value={formData.phone || ""} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter phone number" /></div><div style={styles.formGroup}><label style={styles.label}>Role</label><select style={styles.select} value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>{Object.keys(ADMIN_CONFIG.roles).map(role => <option key={role} value={role}>{role}</option>)}</select></div><div style={styles.formGroup}><label style={styles.label}>Status</label><select style={styles.select} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div><div style={styles.formGroup}><label style={styles.label}>Password {showAddModal && "*"}</label><input type="password" style={styles.input} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder={showAddModal ? "Enter password" : "Leave blank to keep current"} /></div></div><div style={styles.modalFooter}><button style={styles.btnCancel} onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>Cancel</button><button style={styles.btnSave} onClick={handleSaveAdmin}>Save Admin</button></div></div></div>)}

      {/* Role Modal */}
      {showRoleModal && (<div style={styles.modalOverlay} onClick={() => setShowRoleModal(false)}><div style={{ ...styles.modal, width: "600px" }} onClick={e => e.stopPropagation()}><div style={styles.modalHeader}><div style={styles.modalTitle}><Icons.Shield />{selectedRole ? "Edit Role" : "Create New Role"}</div><button onClick={() => setShowRoleModal(false)}><Icons.Close /></button></div><div style={styles.modalBody}><div style={styles.formGroup}><label style={styles.label}>Role Name</label><input style={styles.input} value={roleFormData.name} onChange={e => setRoleFormData({ ...roleFormData, name: e.target.value })} placeholder="e.g., Marketing Manager" /></div><div style={styles.formGroup}><label style={styles.label}>Description</label><textarea style={{ ...styles.input, resize: "vertical", minHeight: "70px" }} rows="2" value={roleFormData.description} onChange={e => setRoleFormData({ ...roleFormData, description: e.target.value })} placeholder="Describe the role responsibilities" /></div><label style={styles.label}>Assign Permissions</label>{Object.entries(permissions.reduce((acc, perm) => { if (!acc[perm.category]) acc[perm.category] = []; acc[perm.category].push(perm); return acc; }, {})).map(([category, perms]) => (<div key={category} style={styles.permissionGroup}><div style={styles.permissionCategory}>{category}</div>{perms.map(perm => (<div key={perm.id} style={styles.permissionItem}><Checkbox checked={roleFormData.permissions.includes(perm.id)} onChange={() => handlePermissionToggle(perm.id)} ts={ts} /><div><div style={{ fontSize: "13px", fontWeight: 500, color: ts.text }}>{perm.label}</div><div style={{ fontSize: "10px", color: ts.textMuted }}>{perm.description}</div></div></div>))}</div>))}</div><div style={styles.modalFooter}><button style={styles.btnCancel} onClick={() => setShowRoleModal(false)}>Cancel</button><button style={styles.btnSave} onClick={handleSaveRole}>Save Role</button></div></div></div>)}

      {/* Delete Confirmation */}
      {confirmDelete && (<div style={styles.modalOverlay} onClick={() => setConfirmDelete(false)}><div style={{ ...styles.modal, width: "400px" }} onClick={e => e.stopPropagation()}><div style={styles.modalHeader}><div style={styles.modalTitle}><Icons.Trash /> Confirm Delete</div><button onClick={() => setConfirmDelete(false)}><Icons.Close /></button></div><div style={styles.modalBody}><p>Are you sure you want to delete <strong>{selected.size}</strong> admin(s)?</p><p style={{ fontSize: "12px", color: ts.textMuted }}>This action cannot be undone.</p></div><div style={styles.modalFooter}><button style={styles.btnCancel} onClick={() => setConfirmDelete(false)}>Cancel</button><button style={styles.btnDanger} onClick={handleDeleteSelected}>Yes, Delete</button></div></div></div>)}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} ts={ts} />}
    </div>
  );
};

// Main export component
const Admin = ({ isDark = true, customAdmins = null }) => {
  return <AdminManagement isDark={isDark} customAdmins={customAdmins} />;
};

export default Admin;