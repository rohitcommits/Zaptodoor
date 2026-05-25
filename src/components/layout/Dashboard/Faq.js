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

// const EyeIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );

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

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
// const demoCategories = [
//   { id: 1, name: "User App", count: 5, active: 3, hidden: 2 },
//   { id: 2, name: "Restaurant App", count: 4, active: 2, hidden: 2 },
//   { id: 3, name: "Driver App", count: 3, active: 1, hidden: 2 },
// ];

const demoFAQs = [
  { id: 1, category: "User App", question: "How to place an order?", answer: "Open the app, browse restaurants, add items to cart, and proceed to checkout.", status: "Active", date: "2026-05-01" },
  { id: 2, category: "User App", question: "How to track my order?", answer: "Go to Orders section and click on Track Order button.", status: "Active", date: "2026-05-01" },
  { id: 3, category: "User App", question: "Payment methods available?", answer: "COD, Credit/Debit Card, UPI, Wallet.", status: "Hidden", date: "2026-05-02" },
  { id: 4, category: "Restaurant App", question: "How to manage menu?", answer: "Login to restaurant panel and go to Menu section.", status: "Active", date: "2026-05-03" },
  { id: 5, category: "Restaurant App", question: "How to view orders?", answer: "Go to Orders section to see all incoming orders.", status: "Hidden", date: "2026-05-03" },
  { id: 6, category: "Driver App", question: "How to accept delivery?", answer: "When you receive an order notification, tap Accept.", status: "Active", date: "2026-05-04" },
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

const StatCard = ({ title, count, isDark }) => (
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

const CategoryTab = ({ name, isActive, onClick, isDark }) => (
  <button onClick={onClick} style={{
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
    transition: "all 0.2s",
  }}>
    {name}
  </button>
);

const FAQItem = ({ faq, isDark, onToggleStatus, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      marginBottom: "12px",
      overflow: "hidden",
    }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: "14px",
            fontWeight: 600,
            color: isDark ? "#f1f5f9" : "#1e293b",
          }}>{faq.question}</div>
          <div style={{
            display: "flex",
            gap: "12px",
            marginTop: "8px",
            fontSize: "11px",
            color: isDark ? "#64748b" : "#94a3b8",
          }}>
            <span>Category: {faq.category}</span>
            <span>Date: {faq.date}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <StatusBadge status={faq.status} isDark={isDark} />
          <div style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
            <ChevronDownIcon />
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div style={{
          padding: "16px",
          borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          background: isDark ? "#0f1520" : "#f8fafc",
        }}>
          <div style={{
            fontSize: "13px",
            color: isDark ? "#94a3b8" : "#64748b",
            lineHeight: 1.5,
            marginBottom: "16px",
          }}>{faq.answer}</div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button onClick={() => onToggleStatus(faq.id)} style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}>
              {faq.status === "Active" ? <HideIcon /> : <ShowIcon />}
              {faq.status === "Active" ? "Hide" : "Show"}
            </button>
            <button onClick={() => onEdit(faq)} style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}>
              <EditIcon /> Edit
            </button>
            <button onClick={() => onDelete(faq.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}>
              <DeleteIcon /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const FAQ = ({ isDark = true }) => {
//   const [categories, setCategories] = useState(demoCategories);
  const [faqs, setFaqs] = useState(demoFAQs);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("manage"); // manage or view

  const stats = {
    // activeCategories: categories.reduce((sum, cat) => sum + cat.active, 0),
    activeFaqs: faqs.filter(f => f.status === "Active").length,
    hiddenFaqs: faqs.filter(f => f.status === "Hidden").length,
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "All Categories" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleStatus = (id) => {
    setFaqs(prev => prev.map(f =>
      f.id === id ? { ...f, status: f.status === "Active" ? "Hidden" : "Active" } : f
    ));
  };

  const handleDelete = (id) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const handleEdit = (faq) => {
    alert(`Edit FAQ: ${faq.question}`);
  };

  const handleAddFAQ = () => {
    alert("Add new FAQ");
  };

  const styles = {
    container: {
      background: "transparent",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    // App Tabs
    appTabs: {
      display: "flex",
      gap: "12px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    appTab: (isActive) => ({
      padding: "8px 20px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 600,
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
    // Search and Actions
    searchSection: {
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
    viewToggle: {
      display: "flex",
      gap: "8px",
    },
    viewBtn: (isActive) => ({
      padding: "6px 16px",
      borderRadius: "8px",
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
    // Stats Row
    statsRow: {
      display: "flex",
      gap: "16px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    // Category Tabs
    categoryTabs: {
      display: "flex",
      gap: "10px",
      marginBottom: "24px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    // FAQ List
    faqList: {
      marginTop: "20px",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px",
      color: isDark ? "#64748b" : "#94a3b8",
      fontSize: "14px",
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
  };

  return (
    <div style={styles.container}>
      {/* App Tabs - User App, Restaurant App, Driver App */}
      <div style={styles.appTabs}>
        <button style={styles.appTab(true)}>User App</button>
        <button style={styles.appTab(false)}>Restaurant App</button>
        <button style={styles.appTab(false)}>Driver App</button>
      </div>

      {/* Search and View Toggle */}
      <div style={styles.searchSection}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={styles.viewToggle}>
          <button style={styles.viewBtn(viewMode === "manage")} onClick={() => setViewMode("manage")}>Manage</button>
          <button style={styles.viewBtn(viewMode === "view")} onClick={() => setViewMode("view")}>View</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsRow}>
        <StatCard title="Active Categories" count={stats.activeCategories} isDark={isDark} />
        <StatCard title="Active FAQs" count={stats.activeFaqs} isDark={isDark} />
        <StatCard title="Hidden FAQs" count={stats.hiddenFaqs} isDark={isDark} />
      </div>

      {/* Category Tabs */}
      <div style={styles.categoryTabs}>
        <CategoryTab 
          name="All Categories" 
          isActive={selectedCategory === "All Categories"} 
          onClick={() => setSelectedCategory("All Categories")} 
          isDark={isDark} 
        />
        {/* {categories.map(cat => (
          <CategoryTab 
            key={cat.id}
            name={cat.name} 
            isActive={selectedCategory === cat.name} 
            onClick={() => setSelectedCategory(cat.name)} 
            isDark={isDark} 
          />
        ))} */}
        <button style={styles.addBtn} onClick={handleAddFAQ}>
          <PlusIcon /> Add FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div style={styles.faqList}>
        {filteredFaqs.length === 0 ? (
          <div style={styles.emptyState}>
            <div>All ({filteredFaqs.length})</div>
            <div style={{ marginTop: "20px" }}>No FAQs found</div>
          </div>
        ) : (
          filteredFaqs.map(faq => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isDark={isDark}
              onToggleStatus={toggleStatus}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FAQ;