import React, { useState, useEffect } from "react";

// ===================== THEME =====================
const getT = (isDark) => ({
  bg: isDark ? "#0c1018" : "#f0f4ff",
  surface: isDark ? "#141824" : "#ffffff",
  surfaceAlt: isDark ? "#1c2133" : "#f4f7ff",
  border: isDark ? "rgba(255,255,255,0.07)" : "#e2e8f5",
  text: isDark ? "#f1f5f9" : "#0f172a",
  textMuted: isDark ? "#64748b" : "#94a3b8",
  textSub: isDark ? "#94a3b8" : "#64748b",
  shadow: isDark ? "0 4px 28px rgba(0,0,0,0.45)" : "0 4px 28px rgba(99,102,241,0.10)",
  shadowSm: isDark ? "0 2px 10px rgba(0,0,0,0.35)" : "0 2px 10px rgba(99,102,241,0.07)",
  accent: "#6c63ff",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
});

// ===================== ICONS =====================
// const LocationIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );

const DivisionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="12" y1="8" x2="12" y2="16" />
  </svg>
);

const AreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

// const ZoneIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <circle cx="12" cy="12" r="10" />
//     <line x1="2" y1="12" x2="22" y2="12" />
//     <line x1="12" y1="2" x2="12" y2="22" />
//   </svg>
// );

const DeliveryRadiusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2a15 15 0 0 0 0 20" />
    <path d="M12 2a15 15 0 0 1 0 20" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// const TrashIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
//   </svg>
// );

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ===================== DUMMY DATA =====================
const DUMMY_DIVISIONS = [
  { id: "DIV_001", name: "North Delhi", code: "ND", status: "Active", createdAt: "2024-01-01", description: "Northern part of Delhi" },
  { id: "DIV_002", name: "South Delhi", code: "SD", status: "Active", createdAt: "2024-01-02", description: "Southern part of Delhi" },
  { id: "DIV_003", name: "East Delhi", code: "ED", status: "Active", createdAt: "2024-01-03", description: "Eastern part of Delhi" },
  { id: "DIV_004", name: "West Delhi", code: "WD", status: "Inactive", createdAt: "2024-01-04", description: "Western part of Delhi" },
  { id: "DIV_005", name: "Central Delhi", code: "CD", status: "Active", createdAt: "2024-01-05", description: "Central part of Delhi" },
];

const DUMMY_AREAS = [
  { id: "AREA_001", divisionId: "DIV_001", name: "Rajouri Garden", pincode: "110027", status: "Active", deliveryCharge: 30, createdAt: "2024-01-10" },
  { id: "AREA_002", divisionId: "DIV_001", name: "Punjabi Bagh", pincode: "110026", status: "Active", deliveryCharge: 35, createdAt: "2024-01-11" },
  { id: "AREA_003", divisionId: "DIV_002", name: "Saket", pincode: "110017", status: "Active", deliveryCharge: 40, createdAt: "2024-01-12" },
  { id: "AREA_004", divisionId: "DIV_002", name: "Hauz Khas", pincode: "110016", status: "Active", deliveryCharge: 45, createdAt: "2024-01-13" },
  { id: "AREA_005", divisionId: "DIV_003", name: "Laxmi Nagar", pincode: "110092", status: "Inactive", deliveryCharge: 25, createdAt: "2024-01-14" },
  { id: "AREA_006", divisionId: "DIV_003", name: "Preet Vihar", pincode: "110092", status: "Active", deliveryCharge: 30, createdAt: "2024-01-15" },
];

const DUMMY_ZONES = [
  { id: "ZONE_001", name: "Zone A (Premium)", deliveryRadius: 5, baseCharge: 50, status: "Active", color: "#10b981", createdAt: "2024-01-20" },
  { id: "ZONE_002", name: "Zone B (Standard)", deliveryRadius: 8, baseCharge: 40, status: "Active", color: "#3b82f6", createdAt: "2024-01-21" },
  { id: "ZONE_003", name: "Zone C (Economy)", deliveryRadius: 12, baseCharge: 30, status: "Active", color: "#f59e0b", createdAt: "2024-01-22" },
  { id: "ZONE_004", name: "Zone D (Remote)", deliveryRadius: 20, baseCharge: 60, status: "Inactive", color: "#ef4444", createdAt: "2024-01-23" },
];

const DUMMY_DELIVERY_RADIUS = {
  defaultRadius: 10,
  maxRadius: 25,
  minRadius: 3,
  unit: "km",
  enableDynamicRadius: true,
  radiusMultiplier: {
    peakHours: 1.2,
    weekends: 1.1,
    holidays: 1.3
  },
  restrictions: [
    { zone: "Red Zone", allowed: false, message: "Delivery not available in this area" },
    { zone: "Yellow Zone", allowed: true, extraCharge: 20, message: "Extra charge applies" }
  ]
};

// ===================== COMPONENTS =====================
const StatusBadge = ({ status, isDark }) => {
  const t = getT(isDark);
  const configs = {
    Active: { bg: "rgba(34,197,94,0.15)", color: t.success, label: "Active" },
    Inactive: { bg: "rgba(239,68,68,0.15)", color: t.danger, label: "Inactive" },
  };
  const config = configs[status] || configs.Inactive;
  return (
    <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: config.bg, color: config.color }}>
      {config.label}
    </span>
  );
};

const ToggleSwitch = ({ checked, onChange, isDark }) => {
  const t = getT(isDark);
  return (
    <button onClick={onChange} style={{
      width: "44px", height: "24px", borderRadius: "30px", border: "none",
      background: checked ? "#22c55e" : t.surfaceAlt,
      cursor: "pointer", transition: "all 0.2s", position: "relative"
    }}>
      <span style={{
        position: "absolute", top: "2px", left: checked ? "22px" : "2px",
        width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
        transition: "all 0.2s"
      }} />
    </button>
  );
};

const Toast = ({ message, type, onClose, isDark }) => {
  const t = getT(isDark);
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000, background: t.surface, border: `1px solid ${type === "error" ? t.danger : t.success}`, borderRadius: "12px", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? t.danger : t.success }} />
      <span style={{ fontSize: "13px", color: type === "error" ? t.danger : t.success }}>{message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}><CloseIcon /></button>
    </div>
  );
};

// ===================== MAIN COMPONENT - LOCATIONS =====================
const Locations = ({ isDark = true }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("divisions");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);

  // Data states
  const [divisions, setDivisions] = useState(DUMMY_DIVISIONS);
  const [areas, setAreas] = useState(DUMMY_AREAS);
  const [zones, setZones] = useState(DUMMY_ZONES);
  const [deliveryRadius, setDeliveryRadius] = useState(DUMMY_DELIVERY_RADIUS);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleAdd = (type) => {
    setModalMode("add");
    setModalType(type);
    setSelectedItem(null);
    setFormData({ status: "Active" });
    setShowModal(true);
  };

  const handleEdit = (item, type) => {
    setModalMode("edit");
    setModalType(type);
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (item, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "division") {
        setDivisions(divisions.filter(d => d.id !== item.id));
        showToast("Division deleted successfully");
      } else if (type === "area") {
        setAreas(areas.filter(a => a.id !== item.id));
        showToast("Area deleted successfully");
      } else if (type === "zone") {
        setZones(zones.filter(z => z.id !== item.id));
        showToast("Zone deleted successfully");
      }
    }
  };

  const handleStatusToggle = (item, type) => {
    const newStatus = item.status === "Active" ? "Inactive" : "Active";
    if (type === "division") {
      setDivisions(divisions.map(d => d.id === item.id ? { ...d, status: newStatus } : d));
      showToast(`Division ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
    } else if (type === "area") {
      setAreas(areas.map(a => a.id === item.id ? { ...a, status: newStatus } : a));
      showToast(`Area ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
    } else if (type === "zone") {
      setZones(zones.map(z => z.id === item.id ? { ...z, status: newStatus } : z));
      showToast(`Zone ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
    }
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newId = `${modalType === "division" ? "DIV" : modalType === "area" ? "AREA" : "ZONE"}_${Date.now()}`;
      const newItem = { ...formData, id: newId, createdAt: new Date().toISOString().split('T')[0] };
      
      if (modalType === "division") {
        setDivisions([...divisions, newItem]);
        showToast("Division added successfully");
      } else if (modalType === "area") {
        setAreas([...areas, newItem]);
        showToast("Area added successfully");
      } else if (modalType === "zone") {
        setZones([...zones, newItem]);
        showToast("Zone added successfully");
      }
    } else {
      if (modalType === "division") {
        setDivisions(divisions.map(d => d.id === selectedItem.id ? { ...formData, id: selectedItem.id, createdAt: selectedItem.createdAt } : d));
        showToast("Division updated successfully");
      } else if (modalType === "area") {
        setAreas(areas.map(a => a.id === selectedItem.id ? { ...formData, id: selectedItem.id, createdAt: selectedItem.createdAt } : a));
        showToast("Area updated successfully");
      } else if (modalType === "zone") {
        setZones(zones.map(z => z.id === selectedItem.id ? { ...formData, id: selectedItem.id, createdAt: selectedItem.createdAt } : z));
        showToast("Zone updated successfully");
      }
    }
    setShowModal(false);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: t.bg,
      fontFamily: "'DM Sans', sans-serif",
      padding: isMobile ? "16px" : "24px",
    },
    contentWrapper: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "28px",
    },
    title: {
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: 700,
      background: "linear-gradient(135deg, #6c63ff, #a855f7)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: 0,
    },
    subtitle: {
      fontSize: "13px",
      color: t.textMuted,
      marginTop: "6px",
    },
    tabContainer: {
      display: "flex",
      gap: "12px",
      marginBottom: "32px",
      flexWrap: "wrap",
    },
    tabItem: (isActive) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 28px",
      borderRadius: "14px",
      fontSize: "15px",
      fontWeight: 600,
      background: isActive ? "linear-gradient(135deg, #6c63ff, #a855f7)" : t.surface,
      color: isActive ? "#fff" : t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: isActive ? "0 4px 15px rgba(108,99,255,0.3)" : "none",
    }),
    card: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: "20px",
      overflow: "hidden",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      borderBottom: `1px solid ${t.border}`,
      background: t.surfaceAlt,
      flexWrap: "wrap",
      gap: "12px",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 700,
      color: t.text,
      margin: 0,
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 600,
      background: t.accent,
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
    searchWrapper: {
      position: "relative",
      width: isMobile ? "100%" : "260px",
    },
    searchInput: {
      width: "100%",
      padding: "10px 12px 10px 35px",
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      fontSize: "13px",
      color: t.text,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "14px 16px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: 700,
      color: t.accent,
      borderBottom: `1px solid ${t.border}`,
      background: t.surfaceAlt,
    },
    td: {
      padding: "14px 16px",
      fontSize: "13px",
      color: t.textSub,
      borderBottom: `1px solid ${t.border}`,
    },
    actionButtons: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    iconButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "6px",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
    toggleBtn: (isActive) => ({
      padding: "4px 12px",
      borderRadius: "20px",
      border: "none",
      fontSize: "11px",
      fontWeight: 500,
      cursor: "pointer",
      background: isActive ? t.success : t.warning,
      color: "#fff",
    }),
    deleteBtn: {
      padding: "4px 12px",
      borderRadius: "20px",
      border: "none",
      fontSize: "11px",
      fontWeight: 500,
      cursor: "pointer",
      background: t.danger,
      color: "#fff",
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: "24px",
      width: isMobile ? "90%" : "500px",
      maxHeight: "85vh",
      overflow: "auto",
    },
    modalHeader: {
      padding: "20px 24px",
      borderBottom: `1px solid ${t.border}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: "18px",
      fontWeight: 700,
      color: t.text,
    },
    modalBody: {
      padding: "24px",
    },
    formGroup: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: 600,
      color: t.textMuted,
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "10px 14px",
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      fontSize: "13px",
      color: t.text,
      outline: "none",
    },
    select: {
      width: "100%",
      padding: "10px 14px",
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      fontSize: "13px",
      color: t.text,
      cursor: "pointer",
    },
    modalFooter: {
      padding: "16px 24px",
      borderTop: `1px solid ${t.border}`,
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
    },
    cancelBtn: {
      padding: "10px 20px",
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      color: t.textSecondary,
      cursor: "pointer",
    },
    saveBtn: {
      padding: "10px 20px",
      background: "linear-gradient(135deg, #6c63ff, #a855f7)",
      border: "none",
      borderRadius: "12px",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 600,
    },
    settingsGroup: {
      padding: "20px",
      borderBottom: `1px solid ${t.border}`,
    },
    settingsItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      flexWrap: "wrap",
      gap: "12px",
    },
    settingsLabel: {
      fontSize: "14px",
      fontWeight: 500,
      color: t.text,
    },
    settingsDescription: {
      fontSize: "11px",
      color: t.textMuted,
      marginTop: "2px",
    },
    valueDisplay: {
      fontSize: "14px",
      fontWeight: 600,
      color: t.accent,
      background: t.surfaceAlt,
      padding: "6px 12px",
      borderRadius: "8px",
    },
    editButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "6px",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: t.accent,
    },
    colorPreview: {
      width: "24px",
      height: "24px",
      borderRadius: "6px",
      border: `1px solid ${t.border}`,
    },
  };

  // Divisions Tab
  const renderDivisions = () => {
    const filtered = divisions.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Code</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(div => (
            <tr key={div.id}>
              <td style={styles.td}><strong>{div.code}</strong></td>
              <td style={styles.td}>{div.name}</td>
              <td style={styles.td}>{div.description}</td>
              <td style={styles.td}><StatusBadge status={div.status} isDark={isDark} /></td>
              <td style={styles.td}>
                <div style={styles.actionButtons}>
                  <button onClick={() => handleEdit(div, "division")} style={styles.iconButton} title="Edit"><EditIcon /></button>
                  <button onClick={() => handleDelete(div, "division")} style={styles.deleteBtn}>Delete</button>
                  <button onClick={() => handleStatusToggle(div, "division")} style={styles.toggleBtn(div.status === "Active")}>
                    {div.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Areas Tab
  const renderAreas = () => {
    const filtered = areas.filter(a => 
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.pincode.includes(search)
    );
    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Area Name</th>
            <th style={styles.th}>Pincode</th>
            <th style={styles.th}>Division</th>
            <th style={styles.th}>Delivery Charge</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(area => {
            const division = divisions.find(d => d.id === area.divisionId);
            return (
              <tr key={area.id}>
                <td style={styles.td}><strong>{area.name}</strong></td>
                <td style={styles.td}>{area.pincode}</td>
                <td style={styles.td}>{division?.name || "-"}</td>
                <td style={styles.td}>₹{area.deliveryCharge}</td>
                <td style={styles.td}><StatusBadge status={area.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button onClick={() => handleEdit(area, "area")} style={styles.iconButton} title="Edit"><EditIcon /></button>
                    <button onClick={() => handleDelete(area, "area")} style={styles.deleteBtn}>Delete</button>
                    <button onClick={() => handleStatusToggle(area, "area")} style={styles.toggleBtn(area.status === "Active")}>
                      {area.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // Zones Tab
//   const renderZones = () => {
//     const filtered = zones.filter(z => 
//       z.name.toLowerCase().includes(search.toLowerCase())
//     );
//     return (
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Zone Name</th>
//             <th style={styles.th}>Delivery Radius</th>
//             <th style={styles.th}>Base Charge</th>
//             <th style={styles.th}>Color</th>
//             <th style={styles.th}>Status</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map(zone => (
//             <tr key={zone.id}>
//               <td style={styles.td}><strong>{zone.name}</strong></td>
//               <td style={styles.td}>{zone.deliveryRadius} km</td>
//               <td style={styles.td}>₹{zone.baseCharge}</td>
//               <td style={styles.td}><div style={{ ...styles.colorPreview, background: zone.color }} /></td>
//               <td style={styles.td}><StatusBadge status={zone.status} isDark={isDark} /></td>
//               <td style={styles.td}>
//                 <div style={styles.actionButtons}>
//                   <button onClick={() => handleEdit(zone, "zone")} style={styles.iconButton} title="Edit"><EditIcon /></button>
//                   <button onClick={() => handleDelete(zone, "zone")} style={styles.deleteBtn}>Delete</button>
//                   <button onClick={() => handleStatusToggle(zone, "zone")} style={styles.toggleBtn(zone.status === "Active")}>
//                     {zone.status === "Active" ? "Deactivate" : "Activate"}
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

  // Delivery Radius Tab
  const renderDeliveryRadius = () => (
    <div>
      <div style={styles.settingsGroup}>
        <h4 style={{ margin: "0 0 16px 0", color: t.text }}>Radius Settings</h4>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Default Delivery Radius</div>
            <div style={styles.settingsDescription}>Standard delivery distance</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>{deliveryRadius.defaultRadius} {deliveryRadius.unit}</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "radius", field: "defaultRadius", label: "Default Delivery Radius", value: deliveryRadius.defaultRadius })}>
              <EditIcon />
            </button>
          </div>
        </div>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Maximum Radius</div>
            <div style={styles.settingsDescription}>Maximum delivery distance allowed</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>{deliveryRadius.maxRadius} {deliveryRadius.unit}</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "radius", field: "maxRadius", label: "Maximum Delivery Radius", value: deliveryRadius.maxRadius })}>
              <EditIcon />
            </button>
          </div>
        </div>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Minimum Radius</div>
            <div style={styles.settingsDescription}>Minimum delivery distance</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>{deliveryRadius.minRadius} {deliveryRadius.unit}</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "radius", field: "minRadius", label: "Minimum Delivery Radius", value: deliveryRadius.minRadius })}>
              <EditIcon />
            </button>
          </div>
        </div>
      </div>

      <div style={styles.settingsGroup}>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Enable Dynamic Radius</div>
            <div style={styles.settingsDescription}>Adjust radius based on demand/time</div>
          </div>
          <ToggleSwitch checked={deliveryRadius.enableDynamicRadius} onChange={() => setDeliveryRadius({ ...deliveryRadius, enableDynamicRadius: !deliveryRadius.enableDynamicRadius })} isDark={isDark} />
        </div>
      </div>

      {deliveryRadius.enableDynamicRadius && (
        <div style={styles.settingsGroup}>
          <h4 style={{ margin: "0 0 16px 0", color: t.text }}>Radius Multipliers</h4>
          <div style={styles.settingsItem}>
            <div><div style={styles.settingsLabel}>Peak Hours Multiplier</div><div style={styles.settingsDescription}>x{deliveryRadius.radiusMultiplier.peakHours}</div></div>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "radiusMultiplier", field: "peakHours", label: "Peak Hours Multiplier", value: deliveryRadius.radiusMultiplier.peakHours })}><EditIcon /></button>
          </div>
          <div style={styles.settingsItem}>
            <div><div style={styles.settingsLabel}>Weekends Multiplier</div><div style={styles.settingsDescription}>x{deliveryRadius.radiusMultiplier.weekends}</div></div>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "radiusMultiplier", field: "weekends", label: "Weekends Multiplier", value: deliveryRadius.radiusMultiplier.weekends })}><EditIcon /></button>
          </div>
          <div style={styles.settingsItem}>
            <div><div style={styles.settingsLabel}>Holidays Multiplier</div><div style={styles.settingsDescription}>x{deliveryRadius.radiusMultiplier.holidays}</div></div>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "radiusMultiplier", field: "holidays", label: "Holidays Multiplier", value: deliveryRadius.radiusMultiplier.holidays })}><EditIcon /></button>
          </div>
        </div>
      )}

      <div style={styles.settingsGroup}>
        <h4 style={{ margin: "0 0 16px 0", color: t.text }}>Area Restrictions</h4>
        <table style={styles.table}>
          <thead>
            <tr><th style={styles.th}>Zone Type</th><th style={styles.th}>Allowed</th><th style={styles.th}>Extra Charge</th><th style={styles.th}>Message</th></tr>
          </thead>
          <tbody>
            {deliveryRadius.restrictions.map((rest, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{rest.zone}</td>
                <td style={styles.td}>{rest.allowed ? "✅ Yes" : "❌ No"}</td>
                <td style={styles.td}>{rest.extraCharge ? `₹${rest.extraCharge}` : "-"}</td>
                <td style={styles.td}>{rest.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Modal content state
  const [modalContent, setModalContent] = useState(null);

  // Render modal for delivery radius editing
  const renderRadiusModal = () => {
    if (!modalContent) return null;

    return (
      <div style={styles.modalOverlay} onClick={() => setModalContent(null)}>
        <div style={styles.modal} onClick={e => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <div style={styles.modalTitle}>Edit {modalContent.label}</div>
            <button onClick={() => setModalContent(null)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}><CloseIcon /></button>
          </div>
          <div style={styles.modalBody}>
            <div style={styles.formGroup}>
              <label style={styles.label}>{modalContent.label}</label>
              <input type="number" step="0.1" style={styles.input} value={modalContent.value} onChange={(e) => setModalContent({ ...modalContent, value: parseFloat(e.target.value) })} />
            </div>
          </div>
          <div style={styles.modalFooter}>
            <button style={styles.cancelBtn} onClick={() => setModalContent(null)}>Cancel</button>
            <button style={styles.saveBtn} onClick={() => {
              if (modalContent.type === "radius") {
                setDeliveryRadius({ ...deliveryRadius, [modalContent.field]: modalContent.value });
              } else if (modalContent.type === "radiusMultiplier") {
                setDeliveryRadius({
                  ...deliveryRadius,
                  radiusMultiplier: { ...deliveryRadius.radiusMultiplier, [modalContent.field]: modalContent.value }
                });
              }
              showToast("Delivery radius settings updated");
              setModalContent(null);
            }}>Save</button>
          </div>
        </div>
      </div>
    );
  };

  // Render modal for add/edit
  const renderFormModal = () => {
    if (!showModal) return null;

    return (
      <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
        <div style={styles.modal} onClick={e => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <div style={styles.modalTitle}>
              {modalMode === "add" ? "Add" : "Edit"} {modalType === "division" ? "Division" : modalType === "area" ? "Area" : "Zone"}
            </div>
            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}><CloseIcon /></button>
          </div>
          <div style={styles.modalBody}>
            {modalType === "division" && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Division Name</label>
                  <input style={styles.input} value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter division name" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Division Code</label>
                  <input style={styles.input} value={formData.code || ""} onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })} placeholder="Enter division code" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea style={styles.input} rows="2" value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description" />
                </div>
              </>
            )}
            {modalType === "area" && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Area Name</label>
                  <input style={styles.input} value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter area name" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Pincode</label>
                  <input style={styles.input} value={formData.pincode || ""} onChange={e => setFormData({ ...formData, pincode: e.target.value })} placeholder="Enter pincode" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Division</label>
                  <select style={styles.select} value={formData.divisionId || ""} onChange={e => setFormData({ ...formData, divisionId: e.target.value })}>
                    <option value="">Select Division</option>
                    {divisions.map(div => <option key={div.id} value={div.id}>{div.name}</option>)}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Delivery Charge (₹)</label>
                  <input type="number" style={styles.input} value={formData.deliveryCharge || ""} onChange={e => setFormData({ ...formData, deliveryCharge: parseInt(e.target.value) })} placeholder="Enter delivery charge" />
                </div>
              </>
            )}
            {modalType === "zone" && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Zone Name</label>
                  <input style={styles.input} value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter zone name" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Delivery Radius (km)</label>
                  <input type="number" step="0.5" style={styles.input} value={formData.deliveryRadius || ""} onChange={e => setFormData({ ...formData, deliveryRadius: parseFloat(e.target.value) })} placeholder="Enter radius" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Base Charge (₹)</label>
                  <input type="number" style={styles.input} value={formData.baseCharge || ""} onChange={e => setFormData({ ...formData, baseCharge: parseInt(e.target.value) })} placeholder="Enter base charge" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Zone Color</label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <div style={{ ...styles.colorPreview, background: formData.color || "#6c63ff" }} />
                    <input type="color" style={{ width: "60px", height: "36px", border: `1px solid ${t.border}`, borderRadius: "8px" }} value={formData.color || "#6c63ff"} onChange={e => setFormData({ ...formData, color: e.target.value })} />
                  </div>
                </div>
              </>
            )}
            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select style={styles.select} value={formData.status || "Active"} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div style={styles.modalFooter}>
            <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
            <button style={styles.saveBtn} onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>📍 Location Management</h1>
          <p style={styles.subtitle}>Manage divisions, areas, zones, and delivery radius</p>
        </div>

        {/* Tabs as per image */}
        <div style={styles.tabContainer}>
          <div style={styles.tabItem(activeTab === "divisions")} onClick={() => { setActiveTab("divisions"); setSearch(""); }}>
            <DivisionIcon /> 1) Division / Create
          </div>
          <div style={styles.tabItem(activeTab === "areas")} onClick={() => { setActiveTab("areas"); setSearch(""); }}>
            <AreaIcon /> 2) Area / Zones
          </div>
          <div style={styles.tabItem(activeTab === "deliveryRadius")} onClick={() => { setActiveTab("deliveryRadius"); setSearch(""); }}>
            <DeliveryRadiusIcon /> 3) Delivery Radius
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              {activeTab === "divisions" && "🏢 Divisions"}
              {activeTab === "areas" && "📍 Areas & Zones"}
              {activeTab === "deliveryRadius" && "📏 Delivery Radius Settings"}
            </h3>
            {(activeTab === "divisions" || activeTab === "areas") && (
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <div style={styles.searchWrapper}>
                  <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></span>
                  <input style={styles.searchInput} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <button style={styles.addButton} onClick={() => handleAdd(activeTab === "divisions" ? "division" : "area")}>
                  <PlusIcon /> Add New
                </button>
              </div>
            )}
            {activeTab === "deliveryRadius" && (
              <div style={styles.searchWrapper}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></span>
                <input style={styles.searchInput} placeholder="Search zones..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            )}
          </div>
          <div style={{ overflowX: "auto" }}>
            {activeTab === "divisions" && renderDivisions()}
            {activeTab === "areas" && renderAreas()}
            {activeTab === "deliveryRadius" && renderDeliveryRadius()}
          </div>
        </div>
      </div>

      {renderFormModal()}
      {renderRadiusModal()}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} isDark={isDark} />}
    </div>
  );
};

export default Locations;