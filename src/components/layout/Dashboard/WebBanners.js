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

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoWebBanners = [
  { id: 1, sn: 13, title: "Pizza in your Town", subtitle: "All you need is love and a hot pizza.", description: "Best pizza deals in town. Order now and get 20% off on your first order.", buttonName: "Order Now", buttonLink: "/order/pizza", status: "Active", imageUrl: null },
  { id: 2, sn: 12, title: "Zaptodoor", subtitle: "Rich Taste, Royal Plate.", description: "Experience the royal taste with our special royal thali. Limited time offer!", buttonName: "Explore", buttonLink: "/menu/royal", status: "Active", imageUrl: null },
  { id: 3, sn: 11, title: "zaptodoor", subtitle: "Every craving deserves a delicious destination.", description: "Find your favorite dishes from top restaurants near you.", buttonName: "Order Food", buttonLink: "/restaurants", status: "Active", imageUrl: null },
  { id: 4, sn: 10, title: "zaptodoor", subtitle: "From farm freshness to your happy moments.", description: "Fresh organic vegetables and fruits delivered to your doorstep.", buttonName: "Shop Now", buttonLink: "/groceries", status: "Active", imageUrl: null },
  { id: 5, sn: 9, title: "zaptodoor", subtitle: "it's a feeling that starts at the door.", description: "Get the best food delivery experience with our fast service.", buttonName: "Sign Up", buttonLink: "/signup", status: "Active", imageUrl: null },
  { id: 6, sn: 8, title: "Summer Special", subtitle: "Cool down with our summer drinks", description: "Buy 1 Get 1 Free on all cold beverages. Limited period offer!", buttonName: "Grab Deal", buttonLink: "/offers/summer", status: "Hidden", imageUrl: null },
  { id: 7, sn: 7, title: "Lunching Banner", subtitle: "Lunch specials", description: "Special lunch combos starting at just $9.99", buttonName: "View Combos", buttonLink: "/lunch", status: "Hidden", imageUrl: null },
  { id: 8, sn: 6, title: "Weekend Deal", subtitle: "Weekend special offers", description: "Flat 30% off on orders above $30", buttonName: "Order Now", buttonLink: "/offers/weekend", status: "Hidden", imageUrl: null },
  { id: 9, sn: 5, title: "New Arrival", subtitle: "Check out our new menu items", description: "Introducing 10 new dishes from around the world", buttonName: "View Menu", buttonLink: "/menu/new", status: "Active", imageUrl: null },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADD WEB BANNER DIALOG COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddWebBannerDialog = ({ isDark, onClose, onSave, editingBanner }) => {
  const [formData, setFormData] = useState({
    title: editingBanner?.title || "",
    subtitle: editingBanner?.subtitle || "",
    description: editingBanner?.description || "",
    buttonName: editingBanner?.buttonName || "",
    buttonLink: editingBanner?.buttonLink || "",
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
    if (file && file.type.startsWith('image/')) {
      handleImageChange(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return;
    }
    
    const maxSn = editingBanner?.sn || 0;
    
    onSave({
      title: formData.title,
      subtitle: formData.subtitle || "",
      description: formData.description || "",
      buttonName: formData.buttonName || "",
      buttonLink: formData.buttonLink || "",
      status: formData.status,
      imageFile,
      imageUrl: imagePreview,
      sn: maxSn,
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
      maxWidth: "560px",
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
      fontSize: "20px",
      fontWeight: 700,
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
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "13px",
      fontWeight: 600,
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
      padding: "24px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      background: isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.02)",
      marginTop: "8px",
    },
    imagePreview: {
      width: "100%",
      maxHeight: "160px",
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
      gap: "24px",
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
      fontSize: "14px",
      fontWeight: 500,
      color: isDark ? "#94a3b8" : "#475569",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    saveBtn: {
      padding: "10px 24px",
      background: "#4a6cf7",
      border: "none",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: 600,
      color: "#fff",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  return (
    <div style={dialogStyles.overlay} onClick={onClose}>
      <div style={dialogStyles.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={dialogStyles.header}>
          <h3 style={dialogStyles.title}>{editingBanner ? "Edit Web Banner" : "Add Web Banner"}</h3>
          <button style={dialogStyles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={dialogStyles.body}>
            {/* Title Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>
                Title <span style={dialogStyles.required}>*</span>
              </label>
              <input
                type="text"
                name="title"
                style={dialogStyles.input}
                placeholder="Enter banner title"
                value={formData.title}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            {/* Subtitle Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Subtitle</label>
              <input
                type="text"
                name="subtitle"
                style={dialogStyles.input}
                placeholder="Enter banner subtitle"
                value={formData.subtitle}
                onChange={handleChange}
              />
            </div>

            {/* Description Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Description</label>
              <textarea
                name="description"
                style={dialogStyles.textarea}
                placeholder="Enter banner description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Image Upload Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Image</label>
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

            {/* Button Name Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Button Name</label>
              <input
                type="text"
                name="buttonName"
                style={dialogStyles.input}
                placeholder="e.g., Order Now, Learn More, Shop Now"
                value={formData.buttonName}
                onChange={handleChange}
              />
            </div>

            {/* Button Link Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Button Link</label>
              <input
                type="text"
                name="buttonLink"
                style={dialogStyles.input}
                placeholder="e.g., /order, /menu, /offers"
                value={formData.buttonLink}
                onChange={handleChange}
              />
            </div>

            {/* Status Field */}
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
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const ImagePlaceholder = ({ isDark, imageUrl, title }) => (
  <div style={{
    width: "48px", height: "48px", borderRadius: "10px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
    overflow: "hidden",
  }}>
    {imageUrl ? (
      <img src={imageUrl} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      "🎯"
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const WebBanners = ({ isDark = true }) => {
  const [banners, setBanners] = useState(demoWebBanners);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const itemsPerPage = 10;

  // Filter banners
  const filteredBanners = banners.filter(banner =>
    banner.title.toLowerCase().includes(search.toLowerCase()) ||
    (banner.subtitle && banner.subtitle.toLowerCase().includes(search.toLowerCase())) ||
    (banner.description && banner.description.toLowerCase().includes(search.toLowerCase()))
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
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setBanners(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setIsDialogOpen(true);
  };

  const handleView = (banner) => {
    alert(`Title: ${banner.title}\nSubtitle: ${banner.subtitle || "—"}\nDescription: ${banner.description || "—"}\nButton: ${banner.buttonName || "—"}\nLink: ${banner.buttonLink || "—"}`);
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
              subtitle: bannerData.subtitle,
              description: bannerData.description,
              buttonName: bannerData.buttonName,
              buttonLink: bannerData.buttonLink,
              status: bannerData.status,
              imageUrl: bannerData.imageUrl || b.imageUrl,
            }
          : b
      ));
    } else {
      // Add new banner
      const newId = Math.max(...banners.map(b => b.id), 0) + 1;
      const newSn = Math.max(...banners.map(b => b.sn), 0) + 1;
      const newBanner = {
        id: newId,
        sn: newSn,
        title: bannerData.title,
        subtitle: bannerData.subtitle,
        description: bannerData.description,
        buttonName: bannerData.buttonName,
        buttonLink: bannerData.buttonLink,
        status: bannerData.status,
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
      minWidth: "1000px",
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
      transition: "color 0.2s",
    },
    titleCell: {
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#1e293b",
      maxWidth: "180px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    subtitleCell: {
      maxWidth: "180px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: isDark ? "#94a3b8" : "#64748b",
    },
    buttonBadge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "11px",
      fontWeight: 500,
      background: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)",
      color: "#3b82f6",
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
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      
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
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Button</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBanners.map((banner) => (
              <tr key={banner.id}>
                <td style={styles.td}>{banner.sn}</td>
                <td style={styles.td}>
                  <ImagePlaceholder isDark={isDark} imageUrl={banner.imageUrl} title={banner.title} />
                </td>
                <td style={{...styles.td, ...styles.titleCell}} title={banner.title}>
                  {banner.title}
                </td>
                <td style={{...styles.td, ...styles.subtitleCell}} title={banner.subtitle}>
                  {banner.subtitle || "—"}
                </td>
                <td style={{...styles.td, ...styles.subtitleCell}} title={banner.description}>
                  {banner.description || "—"}
                </td>
                <td style={styles.td}>
                  {banner.buttonName ? (
                    <div>
                      <span style={styles.buttonBadge}>{banner.buttonName}</span>
                      {banner.buttonLink && (
                        <div style={{ fontSize: "10px", color: isDark ? "#4a5568" : "#94a3b8", marginTop: "2px" }}>
                          {banner.buttonLink}
                        </div>
                      )}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
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
                <td colSpan={8} style={styles.emptyState}>
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

      {/* Add/Edit Web Banner Dialog */}
      {isDialogOpen && (
        <AddWebBannerDialog
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

export default WebBanners;