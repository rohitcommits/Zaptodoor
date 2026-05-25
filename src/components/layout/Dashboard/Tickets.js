import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoTickets = [
  { id: "#16", source: "Ajendra", sourceType: "User", subject: "delivery related query", status: "Open", date: "09 May 2026", hasAttachment: false },
  { id: "#11", source: "Aditya Hotel", sourceType: "Restaurant", subject: "Cho", status: "Closed", date: "06 May 2026", hasAttachment: true },
  { id: "#15", source: "Shiva Rajput", sourceType: "User", subject: "Testing 2", status: "Open", date: "05 May 2026", hasAttachment: false },
  { id: "#14", source: "Shiva Rajput", sourceType: "User", subject: "Testing", status: "Open", date: "05 May 2026", hasAttachment: false },
  { id: "#10", source: "Tagore Resto", sourceType: "Restaurant", subject: "Testing 3", status: "Open", date: "05 May 2026", hasAttachment: false },
  { id: "#9", source: "Tagore Resto", sourceType: "Restaurant", subject: "testing 2", status: "Open", date: "05 May 2026", hasAttachment: false },
  { id: "#8", source: "Ramesh", sourceType: "User", subject: "Order not received", status: "In Progress", date: "04 May 2026", hasAttachment: true },
  { id: "#7", source: "Punjabi Dhaba", sourceType: "Restaurant", subject: "Payment issue", status: "In Progress", date: "03 May 2026", hasAttachment: false },
  { id: "#6", source: "Suresh", sourceType: "User", subject: "Wrong item delivered", status: "Closed", date: "02 May 2026", hasAttachment: false },
  { id: "#5", source: "Maharaja Hotel", sourceType: "Restaurant", subject: "Menu update request", status: "Closed", date: "01 May 2026", hasAttachment: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

const AttachmentIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status, isDark }) => {
  const config = {
    Open: { bg: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)", color: "#3b82f6" },
    "In Progress": { bg: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)", color: "#f59e0b" },
    Closed: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
  };
  const c = config[status] || config.Open;
  return (
    <span style={{
      display: "inline-block", padding: "4px 12px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const SourceBadge = ({ sourceType, isDark }) => {
  const config = {
    User: { bg: isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.1)", color: "#8b5cf6" },
    Restaurant: { bg: isDark ? "rgba(236,72,153,0.15)" : "rgba(236,72,153,0.1)", color: "#ec4899" },
    Rider: { bg: isDark ? "rgba(20,184,166,0.15)" : "rgba(20,184,166,0.1)", color: "#14b8a6" },
  };
  const c = config[sourceType] || config.User;
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: "12px",
      fontSize: "10px", fontWeight: 500, background: c.bg, color: c.color,
    }}>{sourceType}</span>
  );
};

const StatCard = ({ title, count, color, isDark }) => (
  <div style={{
    background: isDark ? "#141824" : "#ffffff",
    border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "16px 20px",
    textAlign: "center",
    minWidth: "80px",
  }}>
    <div style={{ fontSize: "28px", fontWeight: 700, color: color }}>{count}</div>
    <div style={{ fontSize: "11px", fontWeight: 500, color: isDark ? "#64748b" : "#94a3b8", marginTop: "4px" }}>{title}</div>
  </div>
);

const FilterButton = ({ label, isActive, onClick, isDark }) => (
  <button onClick={onClick} style={{
    padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 500,
    background: isActive ? "#3b82f6" : isDark ? "transparent" : "#f1f5f9",
    color: isActive ? "#fff" : isDark ? "#94a3b8" : "#475569",
    border: isActive ? "1px solid #3b82f6" : isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
    cursor: "pointer",
  }}>{label}</button>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const TicketsTable = ({ isDark = true }) => {
  const [tickets] = useState(demoTickets);  // Removed setTickets - warning fixed
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "Open").length,
    inProgress: tickets.filter(t => t.status === "In Progress").length,
    closed: tickets.filter(t => t.status === "Closed").length,
    users: tickets.filter(t => t.sourceType === "User").length,
    restaurants: tickets.filter(t => t.sourceType === "Restaurant").length,
    riders: tickets.filter(t => t.sourceType === "Rider").length,
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.source.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;
    const matchesSource = sourceFilter === "All" || ticket.sourceType === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const styles = {
    container: { background: "transparent", fontFamily: "'Segoe UI', 'DM Sans', sans-serif", padding: "20px 24px" },
    statsRow: { display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" },
    statsGroup: { display: "flex", gap: "12px", flexWrap: "wrap" },
    divider: { width: "1px", height: "40px", background: isDark ? "#1e2740" : "#e2e8f0", margin: "0 8px" },
    searchSection: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" },
    searchWrapper: { position: "relative", flex: 1, maxWidth: "350px" },
    searchIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#3b82f6" },
    searchInput: {
      width: "100%", padding: "10px 12px 10px 38px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px", fontSize: "13px",
      color: isDark ? "#f1f5f9" : "#1e293b", outline: "none",
    },
    filterGroup: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" },
    filterLabel: { fontSize: "12px", fontWeight: 500, color: isDark ? "#64748b" : "#475569" },
    sourceFilters: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" },
    sourceBtn: (isActive) => ({
      padding: "6px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: 500,
      background: isActive ? "#3b82f6" : isDark ? "transparent" : "#f1f5f9",
      color: isActive ? "#fff" : isDark ? "#94a3b8" : "#475569",
      border: isActive ? "1px solid #3b82f6" : isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
      cursor: "pointer",
    }),
    tableWrapper: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px", overflow: "auto",
    },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "800px" },
    th: {
      padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 700,
      color: "#3b82f6", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc", whiteSpace: "nowrap",
    },
    td: {
      padding: "14px 16px", fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b",
      borderBottom: isDark ? "1px solid #1a2035" : "1px solid #f1f5f9",
    },
    actions: { display: "flex", gap: "8px" },
    actionBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px", color: isDark ? "#64748b" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" },
    attachment: { display: "inline-flex", alignItems: "center", gap: "4px", color: "#f59e0b", fontSize: "11px" },
    sourceCell: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" },
    pagination: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 20px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
    pageBtn: (disabled, isActive) => ({
      width: "32px", height: "32px", borderRadius: "6px",
      border: isActive ? "1px solid #3b82f6" : isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isActive ? "#1e3a8a" : isDark ? "#141824" : "#ffffff",
      color: isActive ? "#93c5fd" : disabled ? isDark ? "#2d3a55" : "#cbd5e1" : isDark ? "#94a3b8" : "#64748b",
      cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    }),
    emptyState: { padding: "60px", textAlign: "center", color: isDark ? "#64748b" : "#94a3b8", fontSize: "14px" },
  };

  return (
    <div style={styles.container}>
      {/* Stats Cards Row */}
      <div style={styles.statsRow}>
        <div style={styles.statsGroup}>
          <StatCard title="Total" count={stats.total} color="#3b82f6" isDark={isDark} />
          <StatCard title="Open" count={stats.open} color="#3b82f6" isDark={isDark} />
          <StatCard title="In Progress" count={stats.inProgress} color="#f59e0b" isDark={isDark} />
          <StatCard title="Closed" count={stats.closed} color="#22c55e" isDark={isDark} />
        </div>
        <div style={styles.divider} />
        <div style={styles.statsGroup}>
          <StatCard title="All Tickets" count={stats.total} color="#8b5cf6" isDark={isDark} />
          <StatCard title="Users" count={stats.users} color="#8b5cf6" isDark={isDark} />
          <StatCard title="Restaurants" count={stats.restaurants} color="#ec4899" isDark={isDark} />
          <StatCard title="Riders" count={stats.riders} color="#14b8a6" isDark={isDark} />
        </div>
      </div>

      {/* Search and Status Filters */}
      <div style={styles.searchSection}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}><SearchIcon /></span>
          <input type="text" style={styles.searchInput} placeholder="Search subject or description..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Status:</span>
          <FilterButton label="All" isActive={statusFilter === "All"} onClick={() => { setStatusFilter("All"); setCurrentPage(1); }} isDark={isDark} />
          <FilterButton label="Open" isActive={statusFilter === "Open"} onClick={() => { setStatusFilter("Open"); setCurrentPage(1); }} isDark={isDark} />
          <FilterButton label="In Progress" isActive={statusFilter === "In Progress"} onClick={() => { setStatusFilter("In Progress"); setCurrentPage(1); }} isDark={isDark} />
          <FilterButton label="Closed" isActive={statusFilter === "Closed"} onClick={() => { setStatusFilter("Closed"); setCurrentPage(1); }} isDark={isDark} />
        </div>
      </div>

      {/* Source Filters */}
      <div style={styles.sourceFilters}>
        <button style={styles.sourceBtn(sourceFilter === "All")} onClick={() => { setSourceFilter("All"); setCurrentPage(1); }}>All</button>
        <button style={styles.sourceBtn(sourceFilter === "User")} onClick={() => { setSourceFilter("User"); setCurrentPage(1); }}>Users</button>
        <button style={styles.sourceBtn(sourceFilter === "Restaurant")} onClick={() => { setSourceFilter("Restaurant"); setCurrentPage(1); }}>Restaurants</button>
        <button style={styles.sourceBtn(sourceFilter === "Rider")} onClick={() => { setSourceFilter("Rider"); setCurrentPage(1); }}>Riders</button>
      </div>

      {/* Tickets Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Source</th>
              <th style={styles.th}>Subject</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td style={styles.td}><span style={{ fontWeight: 600, color: "#3b82f6" }}>{ticket.id}</span></td>
                <td style={styles.td}>
                  <div style={styles.sourceCell}>
                    <span>{ticket.source}</span>
                    <SourceBadge sourceType={ticket.sourceType} isDark={isDark} />
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {ticket.subject}
                    {ticket.hasAttachment && <span style={styles.attachment}><AttachmentIcon /> Attachment</span>}
                  </div>
                </td>
                <td style={styles.td}><StatusBadge status={ticket.status} isDark={isDark} /></td>
                <td style={styles.td}>{ticket.date}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} title="View Ticket"><EyeIcon /></button>
                    <button style={styles.actionBtn} title="Edit"><EditIcon /></button>
                    <button style={styles.actionBtn} title="Delete"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedTickets.length === 0 && (
              <tr>
                <td colSpan={6} style={styles.emptyState}>No tickets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredTickets.length > itemsPerPage && (
        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: isDark ? "#64748b" : "#94a3b8" }}>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredTickets.length)} to {Math.min(currentPage * itemsPerPage, filteredTickets.length)} of {filteredTickets.length} tickets
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button style={styles.pageBtn(currentPage === 1, false)} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              return pageNum <= totalPages && (
                <button key={pageNum} style={styles.pageBtn(false, currentPage === pageNum)} onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>
              );
            })}
            <button style={styles.pageBtn(currentPage === totalPages, false)} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsTable;