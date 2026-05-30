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
const CategoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="3" width="8" height="8" rx="2" />
    <rect x="3" y="13" width="8" height="8" rx="2" />
    <rect x="13" y="13" width="8" height="8" rx="2" />
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const OfferIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 12l-1.5 1.5L16 16l-4 4-4-4-2.5-2.5L4 12l8-8 8 8z" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EditPenIcon = () => (
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

// const SearchIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="8" />
//     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//   </svg>
// );

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ===================== DUMMY DATA =====================
const DUMMY_CATEGORIES = [
  { id: "CAT_001", name: "Pizza", description: "Delicious cheesy pizzas", image: "🍕", status: "Active", order: 1, createdAt: "2024-01-01" },
  { id: "CAT_002", name: "Burgers", description: "Juicy grilled burgers", image: "🍔", status: "Active", order: 2, createdAt: "2024-01-05" },
  { id: "CAT_003", name: "Chinese", description: "Authentic Indo-Chinese", image: "🥡", status: "Inactive", order: 3, createdAt: "2024-01-10" },
  { id: "CAT_004", name: "Beverages", description: "Soft drinks & shakes", image: "🥤", status: "Active", order: 4, createdAt: "2024-01-15" },
  { id: "CAT_005", name: "Desserts", description: "Sweet treats and desserts", image: "🍰", status: "Active", order: 5, createdAt: "2024-01-20" },
];

const DUMMY_RESTAURANTS = [
  { id: "RST_001", name: "Pizza Hut", email: "contact@pizzahut.com", phone: "+91 98765 43210", address: "MG Road, Delhi", status: "Active", rating: 4.5, totalOrders: 1250, image: "🍕", createdAt: "2024-01-01" },
  { id: "RST_002", name: "McDonald's", email: "contact@mcdonalds.com", phone: "+91 87654 32109", address: "Connaught Place, Delhi", status: "Active", rating: 4.3, totalOrders: 980, image: "🍔", createdAt: "2024-01-10" },
  { id: "RST_003", name: "KFC", email: "contact@kfc.com", phone: "+91 76543 21098", address: "Saket, Delhi", status: "Inactive", rating: 4.2, totalOrders: 750, image: "🍗", createdAt: "2024-01-20" },
];

const DUMMY_OFFERS = [
  { id: "OFF_001", title: "Flat 50% Off", description: "On all pizzas", code: "PIZZA50", discount: "50%", minOrder: 299, validTill: "2024-12-31", status: "Active", type: "restaurant", createdAt: "2024-01-01" },
  { id: "OFF_002", title: "Free Delivery", description: "On orders above ₹499", code: "FREEDEL", discount: "Free Delivery", minOrder: 499, validTill: "2024-12-31", status: "Active", type: "platform", createdAt: "2024-01-10" },
  { id: "OFF_003", title: "₹100 Cashback", description: "On first order", code: "FIRST100", discount: "₹100", minOrder: 199, validTill: "2024-06-30", status: "Inactive", type: "restaurant", createdAt: "2024-01-15" },
];

// ===================== COMPONENTS =====================
const StatusBadge = ({ status, isDark }) => {
  const t = getT(isDark);
  const configs = {
    Active: { bg: "rgba(34,197,94,0.15)", color: t.success, label: "Active" },
    Inactive: { bg: "rgba(239,68,68,0.15)", color: t.danger, label: "Inactive" },
    Published: { bg: "rgba(34,197,94,0.15)", color: t.success, label: "Published" },
    Draft: { bg: "rgba(245,158,11,0.15)", color: t.warning, label: "Draft" },
  };
  const config = configs[status] || configs.Inactive;
  return (
    <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: config.bg, color: config.color }}>
      {config.label}
    </span>
  );
};

// const ToggleSwitch = ({ checked, onChange, isDark }) => {
//   const t = getT(isDark);
//   return (
//     <button onClick={onChange} style={{
//       width: "44px", height: "24px", borderRadius: "30px", border: "none",
//       background: checked ? "#22c55e" : t.surfaceAlt,
//       cursor: "pointer", transition: "all 0.2s", position: "relative"
//     }}>
//       <span style={{
//         position: "absolute", top: "2px", left: checked ? "22px" : "2px",
//         width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
//         transition: "all 0.2s"
//       }} />
//     </button>
//   );
// };

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

// ===================== MAIN COMPONENT - MENU =====================
const Menu = ({ isDark = true }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeMenu, setActiveMenu] = useState("all-category");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);

  // Data states
  const [categories, setCategories] = useState(DUMMY_CATEGORIES);
  const [restaurants, setRestaurants] = useState(DUMMY_RESTAURANTS);
  const [offers, setOffers] = useState(DUMMY_OFFERS);

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

  const handleAdd = () => {
    setModalMode("add");
    setSelectedItem(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (item, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "category") {
        setCategories(categories.filter(cat => cat.id !== item.id));
        showToast("Category deleted successfully");
      } else if (type === "restaurant") {
        setRestaurants(restaurants.filter(rest => rest.id !== item.id));
        showToast("Restaurant deleted successfully");
      } else if (type === "offer") {
        setOffers(offers.filter(off => off.id !== item.id));
        showToast("Offer deleted successfully");
      }
    }
  };

  const handleStatusToggle = (item, type) => {
    const newStatus = item.status === "Active" ? "Inactive" : "Active";
    if (type === "category") {
      setCategories(categories.map(cat => cat.id === item.id ? { ...cat, status: newStatus } : cat));
      showToast(`Category ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
    } else if (type === "restaurant") {
      setRestaurants(restaurants.map(rest => rest.id === item.id ? { ...rest, status: newStatus } : rest));
      showToast(`Restaurant ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
    } else if (type === "offer") {
      setOffers(offers.map(off => off.id === item.id ? { ...off, status: newStatus } : off));
      showToast(`Offer ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
    }
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newId = `${activeMenu === "all-category" ? "CAT" : activeMenu === "offers" ? "OFF" : "RST"}_${Date.now()}`;
      const newItem = { ...formData, id: newId, createdAt: new Date().toISOString().split('T')[0] };
      
      if (activeMenu === "all-category") {
        setCategories([...categories, newItem]);
        showToast("Category added successfully");
      } else if (activeMenu === "offers") {
        setOffers([...offers, newItem]);
        showToast("Offer added successfully");
      } else {
        setRestaurants([...restaurants, newItem]);
        showToast("Restaurant added successfully");
      }
    } else {
      if (activeMenu === "all-category") {
        setCategories(categories.map(cat => cat.id === selectedItem.id ? { ...formData, id: selectedItem.id, createdAt: selectedItem.createdAt } : cat));
        showToast("Category updated successfully");
      } else if (activeMenu === "offers") {
        setOffers(offers.map(off => off.id === selectedItem.id ? { ...formData, id: selectedItem.id, createdAt: selectedItem.createdAt } : off));
        showToast("Offer updated successfully");
      } else {
        setRestaurants(restaurants.map(rest => rest.id === selectedItem.id ? { ...formData, id: selectedItem.id, createdAt: selectedItem.createdAt } : rest));
        showToast("Restaurant updated successfully");
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
    menuContainer: {
      display: "flex",
      gap: "12px",
      marginBottom: "32px",
      flexWrap: "wrap",
    },
    menuItem: (isActive) => ({
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
    textarea: {
      width: "100%",
      padding: "10px 14px",
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      fontSize: "13px",
      color: t.text,
      outline: "none",
      resize: "vertical",
      fontFamily: "inherit",
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
    emoji: {
      fontSize: "28px",
      marginRight: "8px",
    },
  };

  const renderTableContent = () => {
    if (activeMenu === "all-category") {
      const filtered = categories.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()));
      return (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(cat => (
              <tr key={cat.id}>
                <td style={styles.td}>{cat.order}</td>
                <td style={styles.td}><strong>{cat.name}</strong><br /><span style={{ fontSize: "11px", color: t.textMuted }}>{cat.id}</span></td>
                <td style={styles.td}>{cat.description}</td>
                <td style={styles.td}><span style={styles.emoji}>{cat.image}</span></td>
                <td style={styles.td}><StatusBadge status={cat.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button onClick={() => handleEdit(cat)} style={styles.iconButton} title="Edit"><EditPenIcon /></button>
                    <button onClick={() => handleDelete(cat, "category")} style={styles.deleteBtn}>Delete</button>
                    <button onClick={() => handleStatusToggle(cat, "category")} style={styles.toggleBtn(cat.status === "Active")}>
                      {cat.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeMenu === "add-edit") {
      const filtered = restaurants.filter(rest => rest.name.toLowerCase().includes(search.toLowerCase()));
      return (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Orders</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(rest => (
              <tr key={rest.id}>
                <td style={styles.td}><strong>{rest.name}</strong><br /><span style={{ fontSize: "11px", color: t.textMuted }}>{rest.email}</span></td>
                <td style={styles.td}>{rest.address}</td>
                <td style={styles.td}>{rest.phone}</td>
                <td style={styles.td}>⭐ {rest.rating}</td>
                <td style={styles.td}>{rest.totalOrders}</td>
                <td style={styles.td}><StatusBadge status={rest.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button onClick={() => handleEdit(rest)} style={styles.iconButton} title="Edit"><EditPenIcon /></button>
                    <button onClick={() => handleDelete(rest, "restaurant")} style={styles.deleteBtn}>Delete</button>
                    <button onClick={() => handleStatusToggle(rest, "restaurant")} style={styles.toggleBtn(rest.status === "Active")}>
                      {rest.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeMenu === "offers") {
      const filtered = offers.filter(off => off.title.toLowerCase().includes(search.toLowerCase()));
      return (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Discount</th>
              <th style={styles.th}>Min Order</th>
              <th style={styles.th}>Valid Till</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(offer => (
              <tr key={offer.id}>
                <td style={styles.td}><strong>{offer.title}</strong><br /><span style={{ fontSize: "11px", color: t.textMuted }}>{offer.description}</span></td>
                <td style={styles.td}><code style={{ background: t.surfaceAlt, padding: "4px 8px", borderRadius: "6px" }}>{offer.code}</code></td>
                <td style={styles.td}>{offer.discount}</td>
                <td style={styles.td}>₹{offer.minOrder}</td>
                <td style={styles.td}>{offer.validTill}</td>
                <td style={styles.td}>{offer.type}</td>
                <td style={styles.td}><StatusBadge status={offer.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button onClick={() => handleEdit(offer)} style={styles.iconButton} title="Edit"><EditPenIcon /></button>
                    <button onClick={() => handleDelete(offer, "offer")} style={styles.deleteBtn}>Delete</button>
                    <button onClick={() => handleStatusToggle(offer, "offer")} style={styles.toggleBtn(offer.status === "Active")}>
                      {offer.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  const getModalFields = () => {
    if (activeMenu === "all-category") {
      return (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category Name</label>
            <input style={styles.input} value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter category name" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea style={styles.textarea} value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description" rows="3" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Order</label>
            <input type="number" style={styles.input} value={formData.order || ""} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} placeholder="Display order" />
          </div>
        </>
      );
    } else if (activeMenu === "add-edit") {
      return (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Restaurant Name</label>
            <input style={styles.input} value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter restaurant name" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} value={formData.email || ""} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input style={styles.input} value={formData.phone || ""} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter phone number" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <textarea style={styles.textarea} value={formData.address || ""} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="Enter address" rows="2" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Rating</label>
            <input type="number" step="0.1" style={styles.input} value={formData.rating || ""} onChange={e => setFormData({ ...formData, rating: parseFloat(e.target.value) })} placeholder="Enter rating" />
          </div>
        </>
      );
    } else if (activeMenu === "offers") {
      return (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Offer Title</label>
            <input style={styles.input} value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Enter offer title" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea style={styles.textarea} value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description" rows="2" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Coupon Code</label>
            <input style={styles.input} value={formData.code || ""} onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })} placeholder="Enter coupon code" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Discount</label>
            <input style={styles.input} value={formData.discount || ""} onChange={e => setFormData({ ...formData, discount: e.target.value })} placeholder="e.g., 50% or ₹100" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Minimum Order (₹)</label>
            <input type="number" style={styles.input} value={formData.minOrder || ""} onChange={e => setFormData({ ...formData, minOrder: parseInt(e.target.value) })} placeholder="Minimum order amount" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Valid Till</label>
            <input type="date" style={styles.input} value={formData.validTill || ""} onChange={e => setFormData({ ...formData, validTill: e.target.value })} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Type</label>
            <select style={styles.select} value={formData.type || "restaurant"} onChange={e => setFormData({ ...formData, type: e.target.value })}>
              <option value="restaurant">Restaurant Offer</option>
              <option value="platform">Platform Offer</option>
            </select>
          </div>
        </>
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>🍕 Menu</h1>
          <p style={styles.subtitle}>Complete control over your food delivery platform</p>
        </div>

        {/* Menu Items as per image */}
        <div style={styles.menuContainer}>
          <div style={styles.menuItem(activeMenu === "all-category")} onClick={() => { setActiveMenu("all-category"); setSearch(""); }}>
            <CategoryIcon /> 1) All Category Management
          </div>
          <div style={styles.menuItem(activeMenu === "add-edit")} onClick={() => { setActiveMenu("add-edit"); setSearch(""); }}>
            <EditIcon /> 2) Add / Edit / Delete / Active / Inactive
          </div>
          <div style={styles.menuItem(activeMenu === "offers")} onClick={() => { setActiveMenu("offers"); setSearch(""); }}>
            <OfferIcon /> 3) Offers Management
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              {activeMenu === "all-category" && "📁 All Category Management"}
              {activeMenu === "add-edit" && "🍔 Restaurant Management"}
              {activeMenu === "offers" && "🏷️ Offers Management"}
            </h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <div style={styles.searchWrapper}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}>🔍</span>
                <input style={styles.searchInput} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <button style={styles.addButton} onClick={handleAdd}>
                <PlusIcon /> Add New
              </button>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            {renderTableContent()}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>
                {modalMode === "add" ? "Add" : "Edit"} {activeMenu === "all-category" ? "Category" : activeMenu === "add-edit" ? "Restaurant" : "Offer"}
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}>
                <CloseIcon />
              </button>
            </div>
            <div style={styles.modalBody}>
              {getModalFields()}
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
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} isDark={isDark} />}
    </div>
  );
};

export default Menu;