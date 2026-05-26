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
const demoCertificates = [
  { id: 1, sn: 1, title: "DPIIT", description: "", link: "", status: "Active" },
  { id: 2, sn: 2, title: "Gincube", description: "", link: "", status: "Active" },
  { id: 3, sn: 3, title: "FSSAI", description: "", link: "", status: "Active" },
  { id: 4, sn: 4, title: "GST", description: "GST", link: "", status: "Hidden" },
  { id: 5, sn: 5, title: "Smart City", description: "", link: "", status: "Active" },
  { id: 6, sn: 6, title: "MSME", description: "", link: "", status: "Active" },
  { id: 7, sn: 7, title: "ISO", description: "", link: "", status: "Active" },
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
    fontSize: "18px",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
  }}>
    📜
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const FooterCertificates = ({ isDark = true }) => {
  const [certificates, setCertificates] = useState(demoCertificates);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter certificates
  const filteredCertificates = certificates.filter(cert =>
    cert.title.toLowerCase().includes(search.toLowerCase()) ||
    cert.description.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const paginatedCertificates = filteredCertificates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle status
  const toggleStatus = (id) => {
    setCertificates(prev => prev.map(cert =>
      cert.id === id ? { ...cert, status: cert.status === "Active" ? "Hidden" : "Active" } : cert
    ));
  };

  const handleDelete = (id) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  const handleEdit = (cert) => {
    alert(`Edit certificate: ${cert.title}`);
  };

  const handleView = (cert) => {
    alert(`View certificate: ${cert.title}\nDescription: ${cert.description || "N/A"}\nLink: ${cert.link || "N/A"}`);
  };

  const handleAdd = () => {
    alert("Add new footer certificate");
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
      borderRadius: "4px",
      transition: "color 0.15s",
    },
    titleCell: {
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
    pageInfo: {
      fontSize: "12px",
      color: isDark ? "#64748b" : "#94a3b8",
    },
    pagination: {
      display: "flex",
      gap: "6px",
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
            placeholder="Search footer certificate..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <button style={styles.addBtn} onClick={handleAdd}>
          <PlusIcon /> Add
        </button>
      </div>

      {/* Certificates Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>SN</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Link</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCertificates.map((cert) => (
              <tr key={cert.id}>
                <td style={styles.td}>{cert.sn}</td>
                <td style={styles.td}><ImagePlaceholder isDark={isDark} /></td>
                <td style={{...styles.td, ...styles.titleCell}}>{cert.title}</td>
                <td style={styles.td}>{cert.description || "—"}</td>
                <td style={styles.td}>{cert.link || "—"}</td>
                <td style={styles.td}><StatusBadge status={cert.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} onClick={() => handleView(cert)} title="View">
                      <EyeIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleEdit(cert)} title="Edit">
                      <EditIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => toggleStatus(cert.id)} title={cert.status === "Active" ? "Hide" : "Show"}>
                      {cert.status === "Active" ? <HideIcon /> : <ShowIcon />}
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleDelete(cert.id)} title="Delete">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedCertificates.length === 0 && (
              <tr key="empty">
                <td colSpan={7} style={styles.emptyState}>
                  No certificates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Rows and Pagination */}
      <div style={styles.footer}>
        <div style={styles.pageInfo}>
          Rows: 20 | {filteredCertificates.length} of {filteredCertificates.length} — Page {currentPage}/{totalPages || 1}
        </div>
        <div style={styles.pagination}>
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
    </div>
  );
};

export default FooterCertificates;