import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// THEME STYLES (matching dashboard pattern)
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
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>);
const AddIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const ScanIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12a9 9 0 1 1-9-9m9 0v6m0-6h-6"/><circle cx="12" cy="12" r="3"/></svg>);
const PDFIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>);
const UploadIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>);
const SearchIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const EditIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>);
const ChevronLeftIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>);
const ChevronRightIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>);
const VegIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>);
const NonVegIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M12 2v20"/></svg>);
const ImageIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>);

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY MENU DATA
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_MENU_ITEMS = [
  { id: 207, name: "South Indian Papad (Aplam)", price: "₹29", cp: "₹35", category: "Starters", subCategory: "Veg Reg 20%", veg: true, source: "Direct", status: "On" },
  { id: 206, name: "Rasam + Aplam Small", price: "₹79", cp: "₹95", category: "Starters", subCategory: "Veg Reg 20%", veg: true, source: "Direct", status: "On" },
  { id: 205, name: "Upma", price: "₹129", cp: "₹155", category: "South Indian", subCategory: "Idli Sambar", veg: true, source: "Direct", status: "On" },
  { id: 204, name: "Masala Dosa", price: "₹89", cp: "₹110", category: "South Indian", subCategory: "Dosa", veg: true, source: "Direct", status: "On" },
  { id: 203, name: "Idli Sambar (2 pcs)", price: "₹59", cp: "₹75", category: "South Indian", subCategory: "Idli Sambar", veg: true, source: "Direct", status: "On" },
  { id: 202, name: "Vada Sambar", price: "₹69", cp: "₹85", category: "South Indian", subCategory: "Vada", veg: true, source: "Direct", status: "On" },
  { id: 201, name: "Pongal", price: "₹99", cp: "₹120", category: "South Indian", subCategory: "Rice Items", veg: true, source: "Direct", status: "Off" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const StatusBadge = ({ status, ts }) => {
  const config = {
    On: { bg: "rgba(16,185,129,0.15)", color: ts.success, dot: ts.success },
    Off: { bg: "rgba(107,114,128,0.12)", color: ts.textMuted, dot: ts.textMuted },
  };
  const c = config[status] || config.Off;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 10px 3px 8px", borderRadius: "20px", background: c.bg, border: `1px solid ${c.bg}` }}>
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.dot }} />
      <span style={{ fontSize: "11px", fontWeight: 600, color: c.color }}>{status}</span>
    </div>
  );
};

const VegBadge = ({ isVeg, ts }) => {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: isVeg ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)", color: isVeg ? ts.success : ts.error }}>
      {isVeg ? <VegIcon /> : <NonVegIcon />} {isVeg ? "Veg" : "Non-Veg"}
    </span>
  );
};

const SourceBadge = ({ source, ts }) => {
  return (
    <span style={{ padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 500, background: ts.surfaceLighter, color: ts.textSecondary }}>
      {source}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Admin = ({ isDark = true }) => {
  const navigate = useNavigate();
  const ts = getThemeStyles(isDark)[isDark ? 'dark' : 'light'];
  
  const [menuItems,] = useState(DUMMY_MENU_ITEMS);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Filter menu items based on search
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Toggle selection
  const toggleSelect = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === currentItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(currentItems.map(item => item.id)));
    }
  };

  const styles = {
    container: { minHeight: "100vh", background: ts.background, padding: "24px", fontFamily: "'Inter', sans-serif" },
    
    // Header Section
    header: { marginBottom: "24px" },
    backButton: { display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: ts.primary, cursor: "pointer", fontSize: "14px", fontWeight: 500, marginBottom: "16px", padding: 0 },
    restaurantCard: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "16px", padding: "20px 24px", marginBottom: "20px" },
    restaurantName: { fontSize: "22px", fontWeight: 700, color: ts.textPrimary, marginBottom: "8px" },
    restaurantStats: { display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "16px" },
    statBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: ts.surfaceLighter, borderRadius: "20px", fontSize: "12px", color: ts.textSecondary },
    actionButtons: { display: "flex", gap: "12px", flexWrap: "wrap" },
    btnPrimary: { background: ts.gradient, border: "none", padding: "10px 20px", borderRadius: "10px", color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px" },
    btnSecondary: { background: ts.surfaceLighter, border: `1px solid ${ts.border}`, padding: "10px 20px", borderRadius: "10px", color: ts.textSecondary, fontWeight: 500, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px" },
    
    // Menu Pages Section
    menuPages: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "16px", padding: "20px 24px", marginBottom: "20px" },
    sectionTitle: { fontSize: "16px", fontWeight: 600, color: ts.textPrimary, marginBottom: "16px" },
    pagesGrid: { display: "flex", gap: "12px", flexWrap: "wrap" },
    pageCard: { background: ts.surfaceLighter, border: `1px solid ${ts.border}`, borderRadius: "10px", padding: "12px 20px", cursor: "pointer", transition: "all 0.2s" },
    pageCardActive: { background: ts.primary + "1A", border: `1px solid ${ts.primary}`, color: ts.primary },
    pageCardText: { fontSize: "13px", fontWeight: 500, color: ts.textSecondary },
    
    // Search Bar
    searchWrapper: { position: "relative", marginBottom: "20px" },
    searchInput: { width: "100%", padding: "12px 16px 12px 42px", background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "12px", fontSize: "13px", color: ts.textPrimary, outline: "none" },
    searchIcon: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: ts.primary },
    
    // Table
    tableWrapper: { background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "16px", overflow: "hidden" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "1000px" },
    th: { padding: "16px 14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: ts.primary, borderBottom: `1px solid ${ts.border}`, background: ts.surfaceLighter },
    td: { padding: "14px", borderBottom: `1px solid ${ts.border}`, fontSize: "13px", color: ts.textSecondary },
    checkbox: { width: "16px", height: "16px", borderRadius: "4px", border: `2px solid ${ts.primary}`, background: "transparent", cursor: "pointer" },
    actionBtn: { background: "none", border: "none", cursor: "pointer", color: ts.textMuted, padding: "6px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px" },
    
    // Pagination
    pagination: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderTop: `1px solid ${ts.border}` },
    paginationInfo: { fontSize: "12px", color: ts.textMuted },
    paginationButtons: { display: "flex", gap: "6px" },
    paginationBtn: (disabled) => ({ width: "32px", height: "32px", borderRadius: "8px", border: `1px solid ${ts.border}`, background: ts.surface, color: disabled ? ts.textMuted : ts.textSecondary, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }),
    paginationPageBtn: (isActive) => ({ width: "32px", height: "32px", borderRadius: "8px", border: isActive ? `1px solid ${ts.primary}` : `1px solid ${ts.border}`, background: isActive ? ts.primary : ts.surface, color: isActive ? "white" : ts.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }),
    
    // Image Placeholder
    imagePlaceholder: { width: "36px", height: "36px", borderRadius: "8px", background: ts.surfaceLighter, display: "flex", alignItems: "center", justifyContent: "center", color: ts.textMuted },
    
    // Upload Section
    uploadSection: { marginTop: "20px", padding: "20px", background: ts.surface, border: `1px solid ${ts.border}`, borderRadius: "16px", textAlign: "center" },
    uploadArea: { border: `2px dashed ${ts.border}`, borderRadius: "12px", padding: "40px", cursor: "pointer", transition: "all 0.2s" },
    uploadText: { fontSize: "14px", color: ts.textMuted, marginTop: "12px" },
  };

  // Render page numbers
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => setCurrentPage(i)} style={styles.paginationPageBtn(currentPage === i)}>
          {i}
        </button>
      );
    }
    return pages;
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

      {/* Header Section */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <BackIcon /> Back to Menus
        </button>

        <div style={styles.restaurantCard}>
          <h2 style={styles.restaurantName}>Karnataka cafe Jinsi road (Roxy Pull)</h2>
          <div style={styles.restaurantStats}>
            <span style={styles.statBadge}>📦 207 items</span>
            <span style={styles.statBadge}>💰 Comm: 20%</span>
            <span style={styles.statBadge}>🎯 Special: 10%</span>
            <span style={styles.statBadge}>📈 Price: above 20%</span>
          </div>
          <div style={styles.actionButtons}>
            <button style={styles.btnPrimary}><AddIcon /> Add Item</button>
            <button style={styles.btnSecondary}><ScanIcon /> AI Scan (Image/PDF)</button>
            <button style={styles.btnSecondary}><PDFIcon /> PDF</button>
          </div>
        </div>
      </div>

      {/* Menu Pages Section */}
      <div style={styles.menuPages}>
        <h3 style={styles.sectionTitle}>Menu Pages &amp; PDF</h3>
        <div style={styles.pagesGrid}>
          {["Main Menu", "Breakfast", "Lunch", "Dinner", "Beverages", "Desserts"].map((page, idx) => (
            <div key={idx} style={{ ...styles.pageCard, ...(idx === 0 ? styles.pageCardActive : {}) }}>
              <span style={styles.pageCardText}>{page}</span>
            </div>
          ))}
          <div style={styles.pageCard}>
            <span style={styles.pageCardText}>+ Add Page</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}><SearchIcon /></span>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Menu Items Table */}
      <div style={styles.tableWrapper}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    checked={selectedItems.size === currentItems.length && currentItems.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th style={styles.th}>SN</th>
                <th style={styles.th}>Pic</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>CP</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Veg</th>
                <th style={styles.th}>Source</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={item.id} style={{ background: selectedItems.has(item.id) ? `${ts.primary}0D` : "transparent" }}>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      style={styles.checkbox}
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td style={styles.td}>{item.id}</td>
                  <td style={styles.td}>
                    <div style={styles.imagePlaceholder}>
                      <ImageIcon />
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontWeight: 500, color: ts.textPrimary }}>{item.name}</span>
                    {item.subCategory && <div style={{ fontSize: "11px", color: ts.textMuted, marginTop: "2px" }}>{item.subCategory}</div>}
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontWeight: 600, color: ts.textPrimary }}>{item.price}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: ts.textMuted, textDecoration: "line-through" }}>{item.cp}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "12px" }}>{item.category}</span>
                  </td>
                  <td style={styles.td}>
                    <VegBadge isVeg={item.veg} ts={ts} />
                  </td>
                  <td style={styles.td}>
                    <SourceBadge source={item.source} ts={ts} />
                  </td>
                  <td style={styles.td}>
                    <StatusBadge status={item.status} ts={ts} />
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button style={styles.actionBtn} title="Edit"><EditIcon /></button>
                      <button style={styles.actionBtn} title="Delete"><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={11} style={{ padding: "60px", textAlign: "center", color: ts.textMuted }}>
                    No menu items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <span style={styles.paginationInfo}>
            Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} items
          </span>
          <div style={styles.paginationButtons}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={styles.paginationBtn(currentPage === 1)}
            >
              <ChevronLeftIcon />
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              style={styles.paginationBtn(currentPage === totalPages || totalPages === 0)}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div style={styles.uploadSection}>
        <div style={styles.uploadArea}>
          <UploadIcon />
          <div style={styles.uploadText}>
            <strong>Upload PDF</strong> — Drag and drop or click to browse
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;