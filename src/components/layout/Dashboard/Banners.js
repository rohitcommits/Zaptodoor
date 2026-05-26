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

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoBanners = [
  { id: 1, title: "ChineseFood", description: "Chinese food cravings hit hard, every single time", status: "Active", created: "5/7/2026", imageUrl: null },
  { id: 2, title: "Delicious", description: "Weekend Menu", status: "Active", created: "5/7/2026", imageUrl: null },
  { id: 3, title: "ChineseFood", description: "Testing new", status: "Hidden", created: "5/7/2026", imageUrl: null },
  { id: 4, title: "Testing new", description: "tyugu", status: "Hidden", created: "5/7/2026", imageUrl: null },
  { id: 5, title: "Testing new", description: "fgh", status: "Hidden", created: "5/7/2026", imageUrl: null },
  { id: 6, title: "FOODMENU", description: "Don't worry—we're here to help", status: "Hidden", created: "5/7/2026", imageUrl: null },
  { id: 7, title: "ARE YOU HUNGRY?", description: "with your online food order!", status: "Hidden", created: "5/7/2026", imageUrl: null },
  { id: 8, title: "Summer Special", description: "Cool discounts on drinks", status: "Active", created: "5/8/2026", imageUrl: null },
  { id: 9, title: "Weekend Deal", description: "Buy 1 Get 1 Free", status: "Hidden", created: "5/8/2026", imageUrl: null },
  { id: 10, title: "New Launch", description: "Try our new pizza", status: "Active", created: "5/9/2026", imageUrl: null },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADD BANNER DIALOG COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddBannerDialog = ({ isDark, onClose, onSave, editingBanner }) => {
  const [formData, setFormData] = useState({
    title: editingBanner?.title || "",
    description: editingBanner?.description || "",
    status: editingBanner?.status || "Active",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingBanner?.imageUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/'))) {
      handleImageChange(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return;
    }
    
    onSave({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      imageFile,
      imageUrl: imagePreview,
      created: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
    });
    onClose();
  };

  const dialogStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    },
    dialog: {
      width: "90%",
      maxWidth: "520px",
      background: isDark ? "#141824" : "#ffffff",
      borderRadius: "20px",
      boxShadow: "0 25px 40px -12px rgba(0,0,0,0.4)",
      overflow: "hidden",
      animation: "fadeIn 0.2s ease-out",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 24px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    title: {
      fontSize: "18px",
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#0f172a",
      margin: 0,
    },
    closeBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: isDark ? "#94a3b8" : "#64748b",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
    },
    body: {
      padding: "24px",
      maxHeight: "65vh",
      overflowY: "auto",
    },
    formGroup: {
      marginBottom: "24px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "13px",
      fontWeight: 500,
      color: isDark ? "#cbd5e1" : "#334155",
    },
    required: {
      color: "#ef4444",
      marginLeft: "4px",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "14px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
      transition: "all 0.2s",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "12px 14px",
      background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "14px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
      transition: "all 0.2s",
      fontFamily: "inherit",
      resize: "vertical",
      minHeight: "80px",
      boxSizing: "border-box",
    },
    imageUploadArea: {
      border: `2px dashed ${dragActive ? '#3b82f6' : (isDark ? '#1e2740' : '#e2e8f0')}`,
      borderRadius: "16px",
      padding: "32px 24px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      background: isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.02)",
      marginTop: "8px",
    },
    imagePreview: {
      width: "100%",
      maxHeight: "180px",
      objectFit: "cover",
      borderRadius: "12px",
      marginTop: "16px",
    },
    uploadIcon: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "12px",
    },
    uploadText: {
      fontSize: "14px",
      fontWeight: 500,
      color: isDark ? "#94a3b8" : "#64748b",
      marginBottom: "6px",
    },
    uploadHint: {
      fontSize: "11px",
      color: isDark ? "#4a5568" : "#94a3b8",
    },
    radioGroup: {
      display: "flex",
      gap: "20px",
      marginTop: "8px",
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      fontSize: "14px",
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    radio: {
      width: "16px",
      height: "16px",
      cursor: "pointer",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      padding: "16px 24px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#fafcff",
    },
    cancelBtn: {
      padding: "10px 20px",
      background: "transparent",
      border: isDark ? "1px solid #2a3a5a" : "1px solid #cbd5e1",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 500,
      color: isDark ? "#94a3b8" : "#475569",
      cursor: "pointer",
    },
    saveBtn: {
      padding: "10px 24px",
      background: "#4a6cf7",
      border: "none",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 600,
      color: "#fff",
      cursor: "pointer",
    },
  };

  return (
    <div style={dialogStyles.overlay} onClick={onClose}>
      <div style={dialogStyles.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={dialogStyles.header}>
          <h3 style={dialogStyles.title}>{editingBanner ? "Edit Banner" : "Add New Banner"}</h3>
          <button style={dialogStyles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={dialogStyles.body}>
            {/* Banner Image Upload */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Banner Image</label>
              <div
                style={dialogStyles.imageUploadArea}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                />
                <div style={dialogStyles.uploadIcon}>
                  <UploadIcon />
                </div>
                <div style={dialogStyles.uploadText}>
                  {imagePreview ? "Change Image" : "Click or drag image here"}
                </div>
                <div style={dialogStyles.uploadHint}>
                  PNG, JPG, WebP up to 10MB
                </div>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" style={dialogStyles.imagePreview} />
                )}
              </div>
            </div>

            {/* Banner Name */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>
                Banner Name <span style={dialogStyles.required}>*</span>
              </label>
              <input
                type="text"
                name="title"
                style={dialogStyles.input}
                placeholder="Enter banner name..."
                value={formData.title}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            {/* Description */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Description</label>
              <textarea
                name="description"
                style={dialogStyles.textarea}
                placeholder="Enter banner description..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Status - Active/Hidden */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Status</label>
              <div style={dialogStyles.radioGroup}>
                <label style={dialogStyles.radioLabel}>
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === "Active"}
                    onChange={handleChange}
                    style={dialogStyles.radio}
                  />
                  Active
                </label>
                <label style={dialogStyles.radioLabel}>
                  <input
                    type="radio"
                    name="status"
                    value="Hidden"
                    checked={formData.status === "Hidden"}
                    onChange={handleChange}
                    style={dialogStyles.radio}
                  />
                  Hidden
                </label>
              </div>
            </div>
          </div>
          <div style={dialogStyles.footer}>
            <button type="button" style={dialogStyles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={dialogStyles.saveBtn}>
              {editingBanner ? "Update Banner" : "Save Banner"}
            </button>
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
    <span style={{
      display: "inline-block", padding: "4px 10px", borderRadius: "20px",
      fontSize: "10px", fontWeight: 600, background: c.bg, color: c.color,
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

const BannerCard = ({ banner, isDark, onToggleStatus, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isDark ? "#141824" : "#ffffff",
        border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "16px",
        position: "relative",
        transition: "all 0.2s",
      }}
    >
      {isHovered && (
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          display: "flex",
          gap: "8px",
          background: isDark ? "rgba(20,24,36,0.9)" : "rgba(255,255,255,0.9)",
          padding: "4px 8px",
          borderRadius: "8px",
          backdropFilter: "blur(4px)",
          zIndex: 10,
        }}>
          <button onClick={() => onToggleStatus(banner.id)} style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8" }}>
            {banner.status === "Active" ? <HideIcon /> : <ShowIcon />}
          </button>
          <button onClick={() => onEdit(banner)} style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8" }}>
            <EditIcon />
          </button>
          <button onClick={() => onDelete(banner.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}>
            <DeleteIcon />
          </button>
        </div>
      )}

      {/* Banner Image */}
      <div style={{
        width: "100%",
        height: "120px",
        background: isDark ? "#1e2740" : "#f1f5f9",
        borderRadius: "10px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32px",
        overflow: "hidden",
      }}>
        {banner.imageUrl ? (
          <img src={banner.imageUrl} alt={banner.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          "🍴"
        )}
      </div>

      {/* Banner Content */}
      <div style={{ marginBottom: "8px" }}>
        <div style={{
          fontSize: "14px",
          fontWeight: 600,
          color: isDark ? "#f1f5f9" : "#1e293b",
          marginBottom: "4px",
        }}>{banner.title}</div>
        <div style={{
          fontSize: "11px",
          color: isDark ? "#64748b" : "#94a3b8",
          marginBottom: "8px",
          lineHeight: 1.4,
        }}>{banner.description}</div>
        <div style={{
          fontSize: "10px",
          color: isDark ? "#4a5568" : "#cbd5e1",
        }}>Created: {banner.created}</div>
      </div>

      {/* Status */}
      <div style={{ marginTop: "8px" }}>
        <StatusBadge status={banner.status} isDark={isDark} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Banners = ({ isDark = true }) => {
  const [banners, setBanners] = useState(demoBanners);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const stats = {
    total: banners.length,
    active: banners.filter(b => b.status === "Active").length,
    hidden: banners.filter(b => b.status === "Hidden").length,
  };

  const filteredBanners = banners.filter(banner =>
    banner.title.toLowerCase().includes(search.toLowerCase()) ||
    banner.description.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setBanners(prev => prev.map(b =>
      b.id === id ? { ...b, status: b.status === "Active" ? "Hidden" : "Active" } : b
    ));
  };

  const handleDelete = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setIsDialogOpen(true);
  };

  const handleAddBanner = () => {
    setEditingBanner(null);
    setIsDialogOpen(true);
  };

  const handleSaveBanner = (bannerData) => {
    if (editingBanner) {
      // Update existing banner
      setBanners(prev => prev.map(b =>
        b.id === editingBanner.id
          ? {
              ...b,
              title: bannerData.title,
              description: bannerData.description,
              status: bannerData.status,
              imageUrl: bannerData.imageUrl || b.imageUrl,
            }
          : b
      ));
    } else {
      // Add new banner
      const newId = Math.max(...banners.map(b => b.id), 0) + 1;
      const newBanner = {
        id: newId,
        title: bannerData.title,
        description: bannerData.description,
        status: bannerData.status,
        created: bannerData.created,
        imageUrl: bannerData.imageUrl,
      };
      setBanners(prev => [newBanner, ...prev]);
    }
  };

  const styles = {
    container: {
      background: "transparent",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    statsRow: {
      display: "flex",
      gap: "16px",
      marginBottom: "24px",
      flexWrap: "wrap",
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
    viewToggle: {
      display: "flex",
      gap: "8px",
      marginBottom: "20px",
    },
    viewBtn: (isActive) => ({
      padding: "6px 14px",
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
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "20px",
    },
    listContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "12px 16px",
    },
    listImage: {
      width: "60px",
      height: "60px",
      background: isDark ? "#1e2740" : "#f1f5f9",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      overflow: "hidden",
    },
    listContent: {
      flex: 1,
    },
    listTitle: {
      fontSize: "14px",
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    listDesc: {
      fontSize: "11px",
      color: isDark ? "#64748b" : "#94a3b8",
    },
    listActions: {
      display: "flex",
      gap: "8px",
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
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      
      {/* Stats Cards */}
      <div style={styles.statsRow}>
        <StatCard title="Total Banners" count={stats.total} isDark={isDark} />
        <StatCard title="Active" count={stats.active} isDark={isDark} />
        <StatCard title="Hidden" count={stats.hidden} isDark={isDark} />
      </div>

      {/* Search and Add Button */}
      <div style={styles.header}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search banners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button style={styles.addBtn} onClick={handleAddBanner}>
          <PlusIcon /> Add Banner
        </button>
      </div>

      {/* View Toggle */}
      <div style={styles.viewToggle}>
        <button style={styles.viewBtn(viewMode === "grid")} onClick={() => setViewMode("grid")}>Grid View</button>
        <button style={styles.viewBtn(viewMode === "list")} onClick={() => setViewMode("list")}>List View</button>
      </div>

      {/* Banners Display */}
      {filteredBanners.length === 0 ? (
        <div style={styles.emptyState}>No banners found</div>
      ) : viewMode === "grid" ? (
        <div style={styles.gridContainer}>
          {filteredBanners.map((banner) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              isDark={isDark}
              onToggleStatus={toggleStatus}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div style={styles.listContainer}>
          {filteredBanners.map((banner) => (
            <div key={banner.id} style={styles.listItem}>
              <div style={styles.listImage}>
                {banner.imageUrl ? (
                  <img src={banner.imageUrl} alt={banner.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  "🍴"
                )}
              </div>
              <div style={styles.listContent}>
                <div style={styles.listTitle}>{banner.title}</div>
                <div style={styles.listDesc}>{banner.description}</div>
                <div style={{ fontSize: "10px", color: isDark ? "#4a5568" : "#cbd5e1", marginTop: "4px" }}>Created: {banner.created}</div>
                <div style={{ marginTop: "6px" }}><StatusBadge status={banner.status} isDark={isDark} /></div>
              </div>
              <div style={styles.listActions}>
                <button onClick={() => toggleStatus(banner.id)} style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8" }}>
                  {banner.status === "Active" ? <HideIcon /> : <ShowIcon />}
                </button>
                <button onClick={() => handleEdit(banner)} style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8" }}>
                  <EditIcon />
                </button>
                <button onClick={() => handleDelete(banner.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Banner Dialog */}
      {isDialogOpen && (
        <AddBannerDialog
          isDark={isDark}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingBanner(null);
          }}
          onSave={handleSaveBanner}
          editingBanner={editingBanner}
        />
      )}
    </div>
  );
};

export default Banners;