import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const HideIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ShowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoWebBanners = [
  { id: 1, sn: 13, title: "Pizza in your Town", subtitle: "All you need is love and a hot pizza.", button: "", status: "Hidden", image: null },
  { id: 2, sn: 12, title: "Zaptodoor", subtitle: "Rich Taste, Royal Plate.", button: "", status: "Active", image: null },
  { id: 3, sn: 11, title: "zaptodoor", subtitle: "Every craving deserves a delicious destination.", button: "", status: "Active", image: null },
  { id: 4, sn: 10, title: "zaptodoor", subtitle: "From farm freshness to your happy moments.", button: "", status: "Active", image: null },
  { id: 5, sn: 9, title: "zaptodoor", subtitle: "it's a feeling that starts at the door.", button: "", status: "Active", image: null },
  { id: 6, sn: 8, title: "New", subtitle: "", button: "", status: "Hidden", image: null },
  { id: 7, sn: 7, title: "Lunaching Banner", subtitle: "", button: "", status: "Hidden", image: null },
  { id: 8, sn: 6, title: "Back", subtitle: "", button: "", status: "Hidden", image: null },
  { id: 9, sn: 5, title: "ffvhjbm", subtitle: "", button: "", status: "Hidden", image: null },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status, isDark }) => {
  const config = {
    Active: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
    Hidden: { bg: isDark ? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.08)", color: "#94a3b8" },
  };
  const c = config[status] || config.Active;
  return (
    <span style={{
      display: "inline-block", padding: "4px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const ImagePlaceholder = ({ isDark }) => (
  <div style={{
    width: "40px", height: "40px", borderRadius: "8px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
  }}>
    🔥
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const WebBanners = ({ isDark = true }) => {
  const [banners, setBanners] = useState(demoWebBanners);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter banners
  const filteredBanners = banners.filter(banner =>
    banner.title.toLowerCase().includes(search.toLowerCase()) ||
    banner.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
  const paginatedBanners = filteredBanners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle status
  const toggleStatus = (id) => {
    setBanners(prev => prev.map(b =>
      b.id === id ? { ...b, status: b.status === "Active" ? "Hidden" : "Active" } : b
    ));
  };

  const handleDelete = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const handleEdit = (banner) => {
    alert(`Edit banner: ${banner.title}`);
  };

  const handleView = (banner) => {
    alert(`View banner: ${banner.title}\n${banner.subtitle}`);
  };

  const handleAddBanner = () => {
    alert("Add new web banner");
  };

  const styles = {
    container: {
      background: "transparent",
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
      padding: "10px 20px",
      background: "#4a6cf7",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
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
    titleCell: {
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    subtitleCell: {
      maxWidth: "250px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: isDark ? "#94a3b8" : "#64748b",
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
      {/* Header with Search and Add Button */}
      <div style={styles.header}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search web banner..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <button style={styles.addBtn} onClick={handleAddBanner}>
          <PlusIcon /> Add
        </button>
      </div>

      {/* Web Banners Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>SN</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Subtitle</th>
              <th style={styles.th}>Button</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBanners.map((banner) => (
              <tr key={banner.id}>
                <td style={styles.td}>{banner.sn}</td>
                <td style={styles.td}><ImagePlaceholder isDark={isDark} /></td>
                <td style={{...styles.td, ...styles.titleCell}}>{banner.title}</td>
                <td style={{...styles.td, ...styles.subtitleCell}}>{banner.subtitle || "—"}</td>
                <td style={styles.td}>{banner.button || "—"}</td>
                <td style={styles.td}><StatusBadge status={banner.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} onClick={() => handleView(banner)} title="View">
                      <EyeIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleEdit(banner)} title="Edit">
                      <EditIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => toggleStatus(banner.id)} title={banner.status === "Active" ? "Hide" : "Show"}>
                      {banner.status === "Active" ? <HideIcon /> : <ShowIcon />}
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleDelete(banner.id)} title="Delete">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedBanners.length === 0 && (
              <tr>
                <td colSpan={7} style={styles.emptyState}>
                  No web banners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredBanners.length > itemsPerPage && (
        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: isDark ? "#64748b" : "#94a3b8" }}>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredBanners.length)} to {Math.min(currentPage * itemsPerPage, filteredBanners.length)} of {filteredBanners.length} banners
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

export default WebBanners;