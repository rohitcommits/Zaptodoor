import React, { useState, useRef } from "react";

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

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const Checkbox = ({ checked, onChange, isDark }) => (
  <div onClick={onChange} style={{
    width: "16px", height: "16px", borderRadius: "4px",
    border: checked ? "2px solid #3b82f6" : isDark ? "2px solid #3a4460" : "2px solid #cbd5e1",
    background: checked ? "#3b82f6" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
  }}>
    {checked && (
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoPressReleases = [
  { id: 1, sn: 1, title: "Swadesh Newspaper Headline", description: "<h3>Sample Description</h3><p>This is a sample press release content.</p>", date: "2025-07-12T14:38", status: "Active", imageUrl: null },
  { id: 2, sn: 2, title: "Press Release News", description: "<p>News details about the company expansion.</p>", date: "2025-07-12T07:49", status: "Active", imageUrl: null },
  { id: 3, sn: 3, title: "New Product Launch", description: "<p>Exciting new product coming soon!</p>", date: "2025-07-15T10:00", status: "Hidden", imageUrl: null },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADD/EDIT PRESS RELEASE DIALOG
// ─────────────────────────────────────────────────────────────────────────────
const AddPressReleaseDialog = ({ isDark, onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState({
    title: editingItem?.title || "",
    description: editingItem?.description || "",
    date: editingItem?.date || new Date().toISOString().slice(0, 16),
    status: editingItem?.status || "Active",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingItem?.imageUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => handleImageChange(e.target.files[0]);
  const handleDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setDragActive(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageChange(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave({
      ...formData,
      imageFile,
      imageUrl: imagePreview,
      sn: editingItem?.sn || 0,
    });
    onClose();
  };

  const styles = {
    overlay: {
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)",
    },
    dialog: {
      width: "90%", maxWidth: "600px", background: isDark ? "#141824" : "#ffffff",
      borderRadius: "20px", boxShadow: "0 25px 40px -12px rgba(0,0,0,0.4)",
      overflow: "hidden", animation: "fadeIn 0.2s ease-out",
    },
    header: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "18px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    title: { fontSize: "20px", fontWeight: 700, color: isDark ? "#f1f5f9" : "#0f172a", margin: 0 },
    closeBtn: { background: "none", border: "none", cursor: "pointer", color: isDark ? "#94a3b8" : "#64748b", padding: "4px" },
    body: { padding: "24px", maxHeight: "65vh", overflowY: "auto" },
    formGroup: { marginBottom: "20px" },
    label: { display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600, color: isDark ? "#cbd5e1" : "#334155" },
    required: { color: "#ef4444", marginLeft: "4px" },
    input: {
      width: "100%", padding: "12px 14px", background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "12px",
      fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b", outline: "none", boxSizing: "border-box",
    },
    textarea: {
      width: "100%", padding: "12px 14px", background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "12px",
      fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b", outline: "none",
      fontFamily: "inherit", resize: "vertical", minHeight: "120px", boxSizing: "border-box",
    },
    imageUploadArea: {
      border: `2px dashed ${dragActive ? '#3b82f6' : (isDark ? '#1e2740' : '#e2e8f0')}`,
      borderRadius: "16px", padding: "20px", textAlign: "center", cursor: "pointer",
      background: isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.02)", marginTop: "8px",
    },
    imagePreview: { width: "100%", maxHeight: "140px", objectFit: "cover", borderRadius: "12px", marginTop: "16px" },
    uploadIcon: { display: "flex", justifyContent: "center", marginBottom: "12px" },
    uploadText: { fontSize: "14px", fontWeight: 500, color: isDark ? "#94a3b8" : "#64748b" },
    uploadHint: { fontSize: "11px", color: isDark ? "#4a5568" : "#94a3b8", marginTop: "6px" },
    select: {
      width: "100%", padding: "12px 14px", background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "12px",
      fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b", cursor: "pointer",
    },
    footer: {
      display: "flex", justifyContent: "flex-end", gap: "12px", padding: "16px 24px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#fafcff",
    },
    cancelBtn: {
      padding: "10px 20px", background: "transparent", border: isDark ? "1px solid #2a3a5a" : "1px solid #cbd5e1",
      borderRadius: "10px", fontSize: "14px", fontWeight: 500, color: isDark ? "#94a3b8" : "#475569", cursor: "pointer",
    },
    saveBtn: {
      padding: "10px 24px", background: "#4a6cf7", border: "none", borderRadius: "10px",
      fontSize: "14px", fontWeight: 600, color: "#fff", cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>{editingItem ? "Edit Press Release" : "Add Press Release"}</h3>
          <button style={styles.closeBtn} onClick={onClose}><CloseIcon /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.body}>
            {/* Image */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Image</label>
              <div style={styles.imageUploadArea} onClick={() => fileInputRef.current?.click()}
                   onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} style={{ display: "none" }} />
                <div style={styles.uploadIcon}><UploadIcon /></div>
                <div style={styles.uploadText}>{imagePreview ? "Change Image" : "Upload Image"}</div>
                <div style={styles.uploadHint}>PNG, JPG, WebP up to 10MB</div>
                {imagePreview && <img src={imagePreview} alt="Preview" style={styles.imagePreview} />}
              </div>
            </div>
            {/* Title */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Title <span style={styles.required}>*</span></label>
              <input type="text" name="title" style={styles.input} placeholder="Enter press release title"
                     value={formData.title} onChange={handleChange} required autoFocus />
            </div>
            {/* Description (Rich text area) */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea name="description" style={styles.textarea} placeholder="Enter description (HTML supported)"
                        value={formData.description} onChange={handleChange} />
            </div>
            {/* Date */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Date & Time</label>
              <input type="datetime-local" name="date" style={styles.input} value={formData.date} onChange={handleChange} />
            </div>
            {/* Status */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select name="status" style={styles.select} value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
          </div>
          <div style={styles.footer}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>{editingItem ? "Update" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color }}>
      {status}
    </span>
  );
};

const ImagePlaceholder = ({ isDark, imageUrl, title }) => (
  <div style={{
    width: "50px", height: "50px", borderRadius: "8px", background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0", overflow: "hidden",
  }}>
    {imageUrl ? <img src={imageUrl} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "📄"}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const PressReleaseTable = ({ isDark = true }) => {
  const [items, setItems] = useState(demoPressReleases);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const itemsPerPage = 10;

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleAll = () => {
    if (selected.size === paginatedItems.length) setSelected(new Set());
    else setSelected(new Set(paginatedItems.map(i => i.id)));
  };
  const toggleOne = (id) => {
    const newSet = new Set(selected);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelected(newSet);
  };

  const toggleStatus = (id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: item.status === "Active" ? "Hidden" : "Active" } : item
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this press release?")) {
      setItems(prev => prev.filter(i => i.id !== id));
      setSelected(prev => { const newSet = new Set(prev); newSet.delete(id); return newSet; });
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleView = (item) => {
    alert(`Title: ${item.title}\nDate: ${item.date}\nDescription: ${item.description?.replace(/<[^>]*>/g, '').substring(0, 200)}`);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleSave = (data) => {
    if (editingItem) {
      setItems(prev => prev.map(i =>
        i.id === editingItem.id ? { ...i, ...data, imageUrl: data.imageUrl || i.imageUrl } : i
      ));
    } else {
      const newId = Math.max(...items.map(i => i.id), 0) + 1;
      const newSn = Math.max(...items.map(i => i.sn), 0) + 1;
      setItems(prev => [{ id: newId, sn: newSn, ...data }, ...prev]);
    }
  };

  const styles = {
    container: { background: "transparent", fontFamily: "'Segoe UI', 'DM Sans', sans-serif", padding: "20px 24px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" },
    searchWrapper: { position: "relative", flex: 1, maxWidth: "350px" },
    searchIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#3b82f6" },
    searchInput: {
      width: "100%", padding: "10px 12px 10px 38px", background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "10px",
      fontSize: "13px", color: isDark ? "#f1f5f9" : "#1e293b", outline: "none",
    },
    addBtn: {
      display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "#4a6cf7",
      color: "#fff", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
    },
    selectionBar: {
      display: "flex", alignItems: "center", gap: "12px", background: isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.04)",
      border: isDark ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(59,130,246,0.15)",
      borderRadius: "8px", padding: "8px 16px", marginBottom: "16px",
    },
    tableWrapper: {
      background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px", overflow: "auto",
    },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" },
    th: {
      padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#3b82f6",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#f8fafc", whiteSpace: "nowrap",
    },
    td: {
      padding: "14px 16px", fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b",
      borderBottom: isDark ? "1px solid #1a2035" : "1px solid #f1f5f9",
    },
    actions: { display: "flex", gap: "8px" },
    actionBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px", color: isDark ? "#64748b" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" },
    titleCell: { fontWeight: 600, color: isDark ? "#f1f5f9" : "#1e293b" },
    descriptionCell: { maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: isDark ? "#94a3b8" : "#64748b" },
    footer: {
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#f8fafc",
    },
    pageInfo: { fontSize: "12px", color: isDark ? "#64748b" : "#94a3b8" },
    pagination: { display: "flex", gap: "6px" },
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
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
      <div style={styles.header}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}><SearchIcon /></span>
          <input type="text" style={styles.searchInput} placeholder="Search press release..." value={search}
                 onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <button style={styles.addBtn} onClick={handleAdd}><PlusIcon /> Add</button>
      </div>
      {selected.size > 0 && (
        <div style={styles.selectionBar}>
          <span style={{ fontSize: "13px", color: "#93c5fd", fontWeight: 600 }}>{selected.size} item(s) selected</span>
          <div style={{ flex: 1 }} />
          <button onClick={() => setSelected(new Set())} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>Clear</button>
        </div>
      )}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}><Checkbox checked={selected.size === paginatedItems.length && paginatedItems.length > 0} onChange={toggleAll} isDark={isDark} /></th>
              <th style={styles.th}>SN</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, idx) => {
              const sn = (currentPage - 1) * itemsPerPage + idx + 1;
              return (
                <tr key={item.id} style={{ background: selected.has(item.id) && isDark ? "rgba(59,130,246,0.07)" : selected.has(item.id) ? "rgba(59,130,246,0.03)" : "transparent" }}>
                  <td style={styles.td}><Checkbox checked={selected.has(item.id)} onChange={() => toggleOne(item.id)} isDark={isDark} /></td>
                  <td style={styles.td}>{sn}</td>
                  <td style={styles.td}><ImagePlaceholder isDark={isDark} imageUrl={item.imageUrl} title={item.title} /></td>
                  <td style={{ ...styles.td, ...styles.titleCell }}>{item.title}</td>
                  <td style={{ ...styles.td, ...styles.descriptionCell }} dangerouslySetInnerHTML={{ __html: item.description?.replace(/<[^>]*>/g, '').substring(0, 80) + (item.description?.length > 80 ? "…" : "") || "—" }} />
                  <td style={styles.td}>{new Date(item.date).toLocaleString()}</td>
                  <td style={styles.td}><StatusBadge status={item.status} isDark={isDark} /></td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button style={styles.actionBtn} onClick={() => handleView(item)} title="View"><EyeIcon /></button>
                      <button style={styles.actionBtn} onClick={() => handleEdit(item)} title="Edit"><EditIcon /></button>
                      <button style={styles.actionBtn} onClick={() => toggleStatus(item.id)} title={item.status === "Active" ? "Hide" : "Show"}>
                        {item.status === "Active" ? <HideIcon /> : <ShowIcon />}
                      </button>
                      <button style={styles.actionBtn} onClick={() => handleDelete(item.id)} title="Delete"><DeleteIcon /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {paginatedItems.length === 0 && (
              <tr><td colSpan={8} style={styles.emptyState}>No press releases found</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredItems.length > 0 && (
        <div style={styles.footer}>
          <div style={styles.pageInfo}>Rows: {filteredItems.length} of {filteredItems.length} — Page {currentPage}/{totalPages || 1}</div>
          <div style={styles.pagination}>
            <button style={styles.pageBtn(currentPage === 1, false)} onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>‹</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i+1;
              else if (currentPage <= 3) pageNum = i+1;
              else if (currentPage >= totalPages-2) pageNum = totalPages-4+i;
              else pageNum = currentPage-2+i;
              return pageNum <= totalPages && (
                <button key={pageNum} style={styles.pageBtn(false, currentPage === pageNum)} onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>
              );
            })}
            <button style={styles.pageBtn(currentPage === totalPages, false)} onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>›</button>
          </div>
        </div>
      )}
      {isDialogOpen && (
        <AddPressReleaseDialog isDark={isDark} onClose={() => { setIsDialogOpen(false); setEditingItem(null); }} onSave={handleSave} editingItem={editingItem} />
      )}
    </div>
  );
};

export default PressReleaseTable;