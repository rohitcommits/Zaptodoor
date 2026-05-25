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
const demoServices = [
  { 
    id: 1, 
    sn: 5, 
    title: "Join us as a Franchise", 
    description: "Join Zaptodoor as a franchise partner, delivering convenience and reliability while growing your business in the booming delivery industry!", 
    button: "Join us as a Franchise", 
    status: "Active", 
    image: null 
  },
  { 
    id: 2, 
    sn: 4, 
    title: "Join us as a Delivery Person", 
    description: "Join Zaptodoor as a delivery partner and earn while delivering convenience with flexibility and growth opportunities!", 
    button: "Join us as a Delivery Person", 
    status: "Active", 
    image: null 
  },
  { 
    id: 3, 
    sn: 3, 
    title: "Join us as a Sales Executive", 
    description: "Join Zaptodoor as a Sales Executive and drive growth by building valuable partnerships in the delivery industry!", 
    button: "Join us as a Sales Executive", 
    status: "Hidden", 
    image: null 
  },
  { 
    id: 4, 
    sn: 2, 
    title: "Join us as a Restaurant", 
    description: "Partner with Zaptodoor to grow your restaurant's customer base and deliver meals seamlessly. Expand your reach and boost your business today!", 
    button: "Join us as a Restaurant", 
    status: "Active", 
    image: null 
  },
  { 
    id: 5, 
    sn: 1, 
    title: "Join Us as a Sales Trainee!", 
    description: "Kickstart your career with Zaptodoor! Gain hands-on experience in sales, develop customer interaction skills, and learn business strategies. Grow your expertise and step into a successful future!", 
    button: "Join Us as a Sales Trainee!", 
    status: "Hidden", 
    image: null 
  },
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

const ImagePlaceholder = ({ sn, isDark }) => (
  <div style={{
    width: "50px", height: "50px", borderRadius: "8px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 500,
    color: isDark ? "#64748b" : "#94a3b8",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
  }}>
    Image
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Services = ({ isDark = true }) => {
  const [services, setServices] = useState(demoServices);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter services
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.description.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle status
  const toggleStatus = (id) => {
    setServices(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === "Active" ? "Hidden" : "Active" } : s
    ));
  };

  const handleDelete = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleEdit = (service) => {
    alert(`Edit service: ${service.title}`);
  };

  const handleView = (service) => {
    alert(`View service: ${service.title}\n\n${service.description}`);
  };

  const handleAddService = () => {
    alert("Add new service");
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
      minWidth: "900px",
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
    descriptionCell: {
      maxWidth: "350px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: isDark ? "#94a3b8" : "#64748b",
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
            placeholder="Search service..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <button style={styles.addBtn} onClick={handleAddService}>
          <PlusIcon /> Add
        </button>
      </div>

      {/* Services Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>SN</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Button</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedServices.map((service) => (
              <tr key={service.id}>
                <td style={styles.td}>{service.sn}</td>
                <td style={styles.td}><ImagePlaceholder sn={service.sn} isDark={isDark} /></td>
                <td style={{...styles.td, ...styles.titleCell}}>{service.title}</td>
                <td style={{...styles.td, ...styles.descriptionCell}} title={service.description}>
                  {service.description}
                </td>
                <td style={styles.td}>{service.button}</td>
                <td style={styles.td}><StatusBadge status={service.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} onClick={() => handleView(service)} title="View">
                      <EyeIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleEdit(service)} title="Edit">
                      <EditIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => toggleStatus(service.id)} title={service.status === "Active" ? "Hide" : "Show"}>
                      {service.status === "Active" ? <HideIcon /> : <ShowIcon />}
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleDelete(service.id)} title="Delete">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedServices.length === 0 && (
              <tr>
                <td colSpan={7} style={styles.emptyState}>
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Rows and Pagination */}
      <div style={styles.footer}>
        <div style={styles.pageInfo}>
          Rows: 20 | {filteredServices.length} of {filteredServices.length} — Page {currentPage}/{totalPages || 1}
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

export default Services;