import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoCategories = [
  { id: 132, imageId: 145, name: "Main Course", mainCategory: "Main Course", subCategories: 10, status: "Active" },
  { id: 131, imageId: 144, name: "ice", mainCategory: "Ice Cream", subCategories: 1, status: "Active" },
  { id: 130, imageId: 143, name: "create new", mainCategory: "Breakfast", subCategories: 1, status: "Active" },
  { id: 129, imageId: 142, name: "Side Dishes", mainCategory: "Breads", subCategories: 0, status: "Active" },
  { id: 128, imageId: 141, name: "Foodiestan", mainCategory: "Breads", subCategories: 0, status: "Active" },
  { id: 127, imageId: 140, name: "Foodiestan", mainCategory: "Breads", subCategories: 0, status: "Active" },
  { id: 126, imageId: 139, name: "unknown", mainCategory: "Breads", subCategories: 0, status: "Active" },
  { id: 125, imageId: 138, name: "Combo", mainCategory: "Breads", subCategories: 0, status: "Active" },
  { id: 124, imageId: 137, name: "Sweets & Desserts", mainCategory: "Breads", subCategories: 1, status: "Active" },
  { id: 123, imageId: 136, name: "Burgers", mainCategory: "Breads", subCategories: 0, status: "Active" },
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const UnlockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status, isDark }) => {
  const config = {
    Active: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
    Inactive: { bg: isDark ? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.08)", color: "#94a3b8" },
  };
  const c = config[status] || config.Active;
  return (
    <span style={{
      display: "inline-block", padding: "4px 12px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const ImagePlaceholder = ({ imageId, isDark }) => (
  <div style={{
    width: "36px", height: "36px", borderRadius: "8px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 600,
    color: isDark ? "#64748b" : "#94a3b8",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
  }}>
    {imageId}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT - Without full page container (fits inside Dashboard)
// ─────────────────────────────────────────────────────────────────────────────
const CategoriesTable = ({ isDark = true }) => {
  const [categories, setCategories] = useState(demoCategories);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter categories
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.mainCategory.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle status
  const toggleStatus = (id) => {
    setCategories(prev => prev.map(cat =>
      cat.id === id 
        ? { ...cat, status: cat.status === "Active" ? "Inactive" : "Active" }
        : cat
    ));
  };

  // Styles based on theme (without minHeight: 100vh)
  const styles = {
    container: {
      background: "transparent", // Dashboard ka background lega
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "16px",
    },
    title: {
      fontSize: "20px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
    },
    searchWrapper: {
      position: "relative",
      flex: 1,
      maxWidth: "350px",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#3b82f6",
    },
    searchInput: {
      width: "100%",
      padding: "10px 12px 10px 38px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "13px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
    },
    addBtn: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 20px",
      background: "#4a6cf7",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
    },
    tableWrapper: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      overflow: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "800px",
    },
    th: {
      padding: "14px 16px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: 700,
      color: "#3b82f6",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "14px 16px",
      fontSize: "13px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      borderBottom: isDark ? "1px solid #1a2035" : "1px solid #f1f5f9",
    },
    actions: {
      display: "flex",
      gap: "8px",
    },
    actionBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "4px",
      color: isDark ? "#64748b" : "#94a3b8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
    pageBtn: (disabled, isActive) => ({
      width: "32px",
      height: "32px",
      borderRadius: "6px",
      border: isActive 
        ? "1px solid #3b82f6" 
        : isDark 
          ? "1px solid #1e2740" 
          : "1px solid #e2e8f0",
      background: isActive 
        ? "#1e3a8a" 
        : isDark 
          ? "#141824" 
          : "#ffffff",
      color: isActive 
        ? "#93c5fd" 
        : disabled 
          ? isDark ? "#2d3a55" : "#cbd5e1"
          : isDark ? "#94a3b8" : "#64748b",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    emptyState: {
      padding: "60px",
      textAlign: "center",
      color: isDark ? "#64748b" : "#94a3b8",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header with Title, Search and Add Button */}
      <div style={styles.header}>
        <h3 style={styles.title}>Categories</h3>
        <div style={{ display: "flex", gap: "16px", flex: 1, justifyContent: "flex-end" }}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}><SearchIcon /></span>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button style={styles.addBtn}>
            <PlusIcon /> Add
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Main Category</th>
              <th style={styles.th}>Sub Categories</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((cat) => (
              <tr key={cat.id}>
                <td style={styles.td}>{cat.id}</td>
                <td style={styles.td}><ImagePlaceholder imageId={cat.imageId} isDark={isDark} /></td>
                <td style={styles.td}><strong>{cat.name}</strong></td>
                <td style={styles.td}>{cat.mainCategory}</td>
                <td style={styles.td}>{cat.subCategories}</td>
                <td style={styles.td}><StatusBadge status={cat.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} title="View"><EyeIcon /></button>
                    <button style={styles.actionBtn} title="Edit"><EditIcon /></button>
                    <button style={styles.actionBtn} title="Toggle Status" onClick={() => toggleStatus(cat.id)}>
                      {cat.status === "Active" ? <LockIcon /> : <UnlockIcon />}
                    </button>
                    <button style={styles.actionBtn} title="Delete"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedCategories.length === 0 && (
              <tr>
                <td colSpan={7} style={styles.emptyState}>
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredCategories.length > itemsPerPage && (
        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: isDark ? "#64748b" : "#94a3b8" }}>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCategories.length)} to {Math.min(currentPage * itemsPerPage, filteredCategories.length)} of {filteredCategories.length} categories
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button 
              style={styles.pageBtn(currentPage === 1, false)} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              return pageNum <= totalPages && (
                <button 
                  key={pageNum} 
                  style={styles.pageBtn(false, currentPage === pageNum)} 
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button 
              style={styles.pageBtn(currentPage === totalPages, false)} 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;