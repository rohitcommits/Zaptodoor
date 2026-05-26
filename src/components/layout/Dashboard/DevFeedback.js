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

// const FilterIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3" />
//   </svg>
// );

// const SortIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <polyline points="9 16 12 19 15 16" />
//     <polyline points="9 8 12 5 15 8" />
//   </svg>
// );

const PriorityHighIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoFeedbacks = [
  { id: 40, title: "Add some new feature in admin", type: "Feature", priority: "Urgent", platform: "Admin Panel", points: 7, author: "Yash suri", date: "07 Apr 2026", time: "07:58 am", status: "Pending" },
  { id: 39, title: "Restaurant or user Ke beach distance", type: "Bug", priority: "Urgent", platform: "User App", points: 1, author: "Yash suri", date: "06 Apr 2026", time: "01:32 am", status: "In Progress" },
  { id: 37, title: "admin password change option", type: "Bug", priority: "Urgent", platform: "Admin Panel", points: 1, author: "Yash suri", date: "03 Apr 2026", time: "09:56 pm", status: "Pending" },
  { id: 36, title: "check the image most urgent work", type: "Bug", priority: "Urgent", platform: "Admin Panel", points: 1, author: "Yash suri", date: "03 Apr 2026", time: "09:52 pm", status: "Pending" },
  { id: 35, title: "admin password change option for all user", type: "Feature", priority: "Normal", platform: "Admin Panel", points: 3, author: "Rohit", date: "02 Apr 2026", time: "10:30 am", status: "Completed" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// const StatusBadge = ({ status, isDark }) => {
//   const config = {
//     Pending: { bg: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)", color: "#f59e0b" },
//     "In Progress": { bg: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)", color: "#3b82f6" },
//     Completed: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
//   };
//   const c = config[status] || config.Pending;
//   return (
//     <span style={{
//       display: "inline-block", padding: "3px 10px", borderRadius: "20px",
//       fontSize: "10px", fontWeight: 600, background: c.bg, color: c.color,
//     }}>{status}</span>
//   );
// };

const TypeBadge = ({ type, isDark }) => {
  const config = {
    Feature: { bg: isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.1)", color: "#8b5cf6" },
    Bug: { bg: isDark ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.1)", color: "#ef4444" },
  };
  const c = config[type] || config.Feature;
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: "12px",
      fontSize: "10px", fontWeight: 500, background: c.bg, color: c.color,
    }}>{type}</span>
  );
};

const PriorityBadge = ({ priority, isDark }) => {
  const config = {
    Urgent: { bg: isDark ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.1)", color: "#ef4444" },
    Normal: { bg: isDark ? "rgba(148,163,184,0.15)" : "rgba(148,163,184,0.1)", color: "#94a3b8" },
  };
  const c = config[priority] || config.Normal;
  return (
    <span style={{
      fontSize: "10px", fontWeight: 600, color: c.color,
    }}>
      <PriorityHighIcon /> {priority}
    </span>
  );
};

const StatCard = ({ title, count, isDark }) => (
  <div style={{
    background: isDark ? "#141824" : "#ffffff",
    border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "12px 20px",
    textAlign: "center",
    flex: 1,
    minWidth: "80px",
  }}>
    <div style={{
      fontSize: "24px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
    }}>{count}</div>
    <div style={{
      fontSize: "11px",
      fontWeight: 500,
      color: isDark ? "#64748b" : "#94a3b8",
      marginTop: "4px",
    }}>{title}</div>
  </div>
);

const TabButton = ({ label, isActive, onClick, isDark }) => (
  <button onClick={onClick} style={{
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
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
  }}>{label}</button>
);

const FeedbackCard = ({ feedback, isDark, onStatusChange }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "12px",
      transition: "all 0.2s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#3b82f6",
          }}>#{feedback.id}</span>
          <span style={{
            fontSize: "14px",
            fontWeight: 600,
            color: isDark ? "#f1f5f9" : "#1e293b",
          }}>{feedback.title}</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <select 
            value={feedback.status} 
            onChange={(e) => onStatusChange(feedback.id, e.target.value)}
            style={{
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "11px",
              background: isDark ? "#0f1520" : "#f8fafc",
              border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
              color: isDark ? "#e2e8f0" : "#1e293b",
              cursor: "pointer",
            }}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={() => setExpanded(!expanded)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: isDark ? "#64748b" : "#94a3b8",
          }}>
            {expanded ? "▲" : "▼"}
          </button>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
        <TypeBadge type={feedback.type} isDark={isDark} />
        <PriorityBadge priority={feedback.priority} isDark={isDark} />
        <span style={{
          fontSize: "11px",
          color: isDark ? "#64748b" : "#94a3b8",
        }}>{feedback.platform}</span>
        <span style={{
          fontSize: "11px",
          fontWeight: 600,
          color: isDark ? "#e2e8f0" : "#1e293b",
        }}>{feedback.points} point(s)</span>
      </div>
      
      <div style={{
        fontSize: "11px",
        color: isDark ? "#64748b" : "#94a3b8",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}>
        <span>by {feedback.author}</span>
        <span>•</span>
        <span>{feedback.date}, {feedback.time}</span>
      </div>
      
      {expanded && (
        <div style={{
          marginTop: "12px",
          paddingTop: "12px",
          borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          fontSize: "12px",
          color: isDark ? "#94a3b8" : "#64748b",
        }}>
          <div>Created: {feedback.date}, {feedback.time}</div>
          <div>Updated: {feedback.date}, {feedback.time}</div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const DevFeedback = ({ isDark = true }) => {
  const [feedbacks, setFeedbacks] = useState(demoFeedbacks);
  const [selectedTab, setSelectedTab] = useState("All");
  const [sortBy, setSortBy] = useState("Priority");
  const [sortOrder, setSortOrder] = useState("desc");

  const platforms = ["All", "User App", "Vendor App", "Rider App", "Website", "Admin Panel", "Other"];
  
  const stats = {
    pending: feedbacks.filter(f => f.status === "Pending").length,
    inProgress: feedbacks.filter(f => f.status === "In Progress").length,
    completed: feedbacks.filter(f => f.status === "Completed").length,
    total: feedbacks.length,
  };

  // Filter by platform
  let filteredFeedbacks = selectedTab === "All" 
    ? feedbacks 
    : feedbacks.filter(f => f.platform === selectedTab);

  // Sort
  filteredFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    if (sortBy === "Priority") {
      const priorityOrder = { Urgent: 0, Normal: 1 };
      return sortOrder === "asc" 
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortBy === "Serial (ID)") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortBy === "Date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const handleStatusChange = (id, newStatus) => {
    setFeedbacks(prev => prev.map(f => 
      f.id === id ? { ...f, status: newStatus } : f
    ));
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const styles = {
    container: {
      background: "transparent",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    title: {
      fontSize: "20px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      marginBottom: "20px",
    },
    statsRow: {
      display: "flex",
      gap: "12px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    tabsRow: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      gap: "16px",
    },
    tabs: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
    sortSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    sortLabel: {
      fontSize: "12px",
      fontWeight: 500,
      color: isDark ? "#64748b" : "#475569",
    },
    sortButtons: {
      display: "flex",
      gap: "6px",
    },
    sortBtn: (isActive) => ({
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "12px",
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
    orderBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: isDark ? "#64748b" : "#94a3b8",
      fontSize: "12px",
      padding: "5px 8px",
      borderRadius: "6px",
    },
    feedbackList: {
      marginTop: "20px",
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
      <h2 style={styles.title}>Dev Feedback</h2>

      {/* Stats Cards */}
      <div style={styles.statsRow}>
        <StatCard title="Pending" count={stats.pending} isDark={isDark} />
        <StatCard title="In Progress" count={stats.inProgress} isDark={isDark} />
        <StatCard title="Completed" count={stats.completed} isDark={isDark} />
        <StatCard title="Total" count={stats.total} isDark={isDark} />
      </div>

      {/* Tabs and Sort */}
      <div style={styles.tabsRow}>
        <div style={styles.tabs}>
          {platforms.map(platform => (
            <TabButton 
              key={platform}
              label={platform}
              isActive={selectedTab === platform}
              onClick={() => setSelectedTab(platform)}
              isDark={isDark}
            />
          ))}
        </div>
        
        <div style={styles.sortSection}>
          <span style={styles.sortLabel}>Sort by:</span>
          <div style={styles.sortButtons}>
            <button style={styles.sortBtn(sortBy === "Priority")} onClick={() => setSortBy("Priority")}>Priority</button>
            <button style={styles.sortBtn(sortBy === "Serial (ID)")} onClick={() => setSortBy("Serial (ID)")}>Serial (ID)</button>
            <button style={styles.sortBtn(sortBy === "Date")} onClick={() => setSortBy("Date")}>Date</button>
          </div>
          <button style={styles.orderBtn} onClick={toggleSortOrder}>
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div style={styles.feedbackList}>
        {filteredFeedbacks.length === 0 ? (
          <div style={styles.emptyState}>No feedback found</div>
        ) : (
          filteredFeedbacks.map(feedback => (
            <FeedbackCard 
              key={feedback.id}
              feedback={feedback}
              isDark={isDark}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DevFeedback;