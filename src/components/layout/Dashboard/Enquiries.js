import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="8" />
//     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//   </svg>
// );

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

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Checkbox = ({ checked, onChange, isDark }) => (
  <div onClick={onChange} style={{
    width: "18px", height: "18px", borderRadius: "4px",
    border: checked ? "2px solid #3b82f6" : isDark ? "2px solid #3a4460" : "2px solid #cbd5e1",
    background: checked ? "#3b82f6" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
  }}>
    {checked && (
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoEnquiries = [
  { id: 31, name: "Ram Sharma", phone: "7974442307", date: "4/21/2026", location: "", type: "Franchise", status: "Pending" },
  { id: 30, name: "Ram", phone: "7974442307", date: "4/4/2026", location: "Gwalior, Madhya Pradesh", type: "Franchise", status: "Pending" },
  { id: 29, name: "Neeraj Verma", phone: "09109747086", date: "4/4/2026", location: "Gwalior, Madhya Pradesh", type: "Franchise", status: "Pending" },
  { id: 28, name: "Yash Suri", phone: "09300018690", date: "4/3/2026", location: "Gwalior, Madhya Pradesh", type: "Franchise", status: "Pending" },
  { id: 27, name: "Rohit Sharma", phone: "9876543210", date: "4/2/2026", location: "Delhi", type: "Delivery", status: "Pending" },
  { id: 26, name: "Amit Kumar", phone: "9876543211", date: "4/1/2026", location: "Noida", type: "Restaurant", status: "Pending" },
  { id: 25, name: "Priya Singh", phone: "9876543212", date: "3/31/2026", location: "Ghaziabad", type: "Sales Team", status: "Pending" },
  { id: 24, name: "Contact Us", phone: "9876543213", date: "3/30/2026", location: "", type: "Contact", status: "Pending" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status, isDark }) => {
  const config = {
    Pending: { bg: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)", color: "#f59e0b" },
    Approved: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
    Rejected: { bg: isDark ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.1)", color: "#ef4444" },
  };
  const c = config[status] || config.Pending;
  return (
    <span style={{
      display: "inline-block", padding: "4px 12px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const StatCard = ({ title, count, newCount, color, isDark }) => (
  <div style={{
    background: isDark ? "#141824" : "#ffffff",
    border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "16px 20px",
    textAlign: "center",
    flex: 1,
    minWidth: "100px",
  }}>
    <div style={{
      fontSize: "28px",
      fontWeight: 700,
      color: color,
    }}>{count}</div>
    <div style={{
      fontSize: "11px",
      fontWeight: 500,
      color: isDark ? "#64748b" : "#94a3b8",
      marginTop: "4px",
    }}>{title} · {newCount} new</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Enquiries = ({ isDark = true }) => {
  const [enquiries, setEnquiries] = useState(demoEnquiries);
  const [selected, setSelected] = useState(new Set());
  const [selectedType, setSelectedType] = useState("All");

  // Calculate stats
  const stats = {
    franchise: { count: enquiries.filter(e => e.type === "Franchise").length, new: 31 },
    delivery: { count: enquiries.filter(e => e.type === "Delivery").length, new: 4 },
    restaurant: { count: enquiries.filter(e => e.type === "Restaurant").length, new: 228 },
    salesTeam: { count: enquiries.filter(e => e.type === "Sales Team").length, new: 9 },
    contact: { count: enquiries.filter(e => e.type === "Contact").length, new: 82 },
  };

  // Filter by type
  const filteredEnquiries = selectedType === "All" 
    ? enquiries 
    : enquiries.filter(e => e.type === selectedType);

  // Selection handlers
  const toggleAll = () => {
    if (selected.size === filteredEnquiries.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredEnquiries.map(e => e.id)));
    }
  };
  const toggleOne = (id) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
  };

  const handleEdit = (enquiry) => {
    alert(`Edit enquiry: ${enquiry.name}`);
  };

  const handleDelete = (id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    setSelected(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleView = (enquiry) => {
    alert(`View enquiry\nName: ${enquiry.name}\nPhone: ${enquiry.phone}\nDate: ${enquiry.date}\nLocation: ${enquiry.location || "N/A"}`);
  };

  const styles = {
    container: {
      background: "transparent",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    // Stats Row
    statsRow: {
      display: "flex",
      gap: "12px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    // Type Filters
    typeFilters: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    typeBtn: (isActive) => ({
      padding: "8px 20px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 500,
      background: isActive 
        ? "#3b82f6" 
        : isDark 
          ? "transparent" 
          : "#f1f5f9",
      color: isActive 
        ? "#fff" 
        : isDark 
          ? "#94a3b8" 
          : "#475569",
      border: isActive 
        ? "1px solid #3b82f6" 
        : isDark 
          ? "1px solid #1e2740" 
          : "1px solid #e2e8f0",
      cursor: "pointer",
    }),
    // Selection Bar
    selectionBar: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 0",
      marginBottom: "16px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    // Enquiries List
    enquiriesList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginTop: "16px",
    },
    enquiryItem: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "12px 16px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px",
      transition: "all 0.2s",
    },
    enquiryContent: {
      flex: 1,
    },
    enquiryName: {
      fontSize: "15px",
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    enquiryDetails: {
      fontSize: "12px",
      color: isDark ? "#64748b" : "#94a3b8",
      marginTop: "4px",
    },
    enquiryId: {
      fontSize: "11px",
      fontWeight: 500,
      color: isDark ? "#4a5568" : "#cbd5e1",
      minWidth: "35px",
    },
    actions: {
      display: "flex",
      gap: "8px",
    },
    actionBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "6px",
      color: isDark ? "#64748b" : "#94a3b8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "6px",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px",
      color: isDark ? "#64748b" : "#94a3b8",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Stats Cards */}
      <div style={styles.statsRow}>
        <StatCard title="Franchise" count={stats.franchise.count} newCount={stats.franchise.new} color="#3b82f6" isDark={isDark} />
        <StatCard title="Delivery" count={stats.delivery.count} newCount={stats.delivery.new} color="#10b981" isDark={isDark} />
        <StatCard title="Restaurant" count={stats.restaurant.count} newCount={stats.restaurant.new} color="#f59e0b" isDark={isDark} />
        <StatCard title="Sales Team" count={stats.salesTeam.count} newCount={stats.salesTeam.new} color="#8b5cf6" isDark={isDark} />
        <StatCard title="Contact" count={stats.contact.count} newCount={stats.contact.new} color="#ec4899" isDark={isDark} />
      </div>

      {/* Type Filters */}
      <div style={styles.typeFilters}>
        <button style={styles.typeBtn(selectedType === "All")} onClick={() => setSelectedType("All")}>All</button>
        <button style={styles.typeBtn(selectedType === "Franchise")} onClick={() => setSelectedType("Franchise")}>Franchise</button>
        <button style={styles.typeBtn(selectedType === "Delivery")} onClick={() => setSelectedType("Delivery")}>Delivery</button>
        <button style={styles.typeBtn(selectedType === "Restaurant")} onClick={() => setSelectedType("Restaurant")}>Restaurant</button>
        <button style={styles.typeBtn(selectedType === "Sales Team")} onClick={() => setSelectedType("Sales Team")}>Sales Team</button>
        <button style={styles.typeBtn(selectedType === "Contact")} onClick={() => setSelectedType("Contact")}>Contact</button>
      </div>

      {/* Selection Bar */}
      <div style={styles.selectionBar}>
        <Checkbox 
          checked={selected.size === filteredEnquiries.length && filteredEnquiries.length > 0} 
          onChange={toggleAll} 
          isDark={isDark} 
        />
        <span style={{ fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b" }}>
          Select all ({filteredEnquiries.length})
        </span>
        {selected.size > 0 && (
          <span style={{ fontSize: "12px", color: "#3b82f6", marginLeft: "auto" }}>
            {selected.size} selected
          </span>
        )}
      </div>

      {/* Enquiries List */}
      <div style={styles.enquiriesList}>
        {filteredEnquiries.map((enquiry) => (
          <div key={enquiry.id} style={styles.enquiryItem}>
            <Checkbox checked={selected.has(enquiry.id)} onChange={() => toggleOne(enquiry.id)} isDark={isDark} />
            <div style={styles.enquiryId}>{enquiry.id}</div>
            <div style={styles.enquiryContent}>
              <div style={styles.enquiryName}>{enquiry.name}</div>
              <div style={styles.enquiryDetails}>
                {enquiry.phone} · {enquiry.date}
                {enquiry.location && ` · ${enquiry.location}`}
              </div>
            </div>
            <div style={styles.actions}>
              <StatusBadge status={enquiry.status} isDark={isDark} />
              <button style={styles.actionBtn} onClick={() => handleView(enquiry)} title="View">
                <EyeIcon />
              </button>
              <button style={styles.actionBtn} onClick={() => handleEdit(enquiry)} title="Edit">
                <EditIcon />
              </button>
              <button style={styles.actionBtn} onClick={() => handleDelete(enquiry.id)} title="Delete">
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
        {filteredEnquiries.length === 0 && (
          <div style={styles.emptyState}>
            No enquiries found
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiries;