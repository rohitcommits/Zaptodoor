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
const demoChooseUs = [
  { 
    id: 1, 
    sn: 5, 
    title: "2 KM Free Delivery", 
    subtitle: "Free delivery within 2 km", 
    description: "Experience fast & easy online ordering on the ZAPTODOOR app", 
    buttonName: "Learn More",
    buttonLink: "/free-delivery",
    status: "Active", 
    mainImageUrl: null,
    iconImageUrl: null
  },
  { 
    id: 2, 
    sn: 4, 
    title: "Monthly Gifts", 
    subtitle: "Special gifts every month", 
    description: "Get exciting gifts and rewards on your monthly orders", 
    buttonName: "View Gifts",
    buttonLink: "/monthly-gifts",
    status: "Hidden", 
    mainImageUrl: null,
    iconImageUrl: null
  },
  { 
    id: 3, 
    sn: 3, 
    title: "Cart Services", 
    subtitle: "Easy cart management", 
    description: "Seamless cart experience with multiple payment options", 
    buttonName: "Explore",
    buttonLink: "/cart-services",
    status: "Active", 
    mainImageUrl: null,
    iconImageUrl: null
  },
  { 
    id: 4, 
    sn: 2, 
    title: "Affordable Charges", 
    subtitle: "Best pricing in town", 
    description: "Lowest delivery charges and best deals for our customers", 
    buttonName: "See Pricing",
    buttonLink: "/pricing",
    status: "Active", 
    mainImageUrl: null,
    iconImageUrl: null
  },
  { 
    id: 5, 
    sn: 1, 
    title: "Upto 50% off", 
    subtitle: "Limited time offer", 
    description: "Kickstart your career with Zaptodo! Gain sales experience", 
    buttonName: "Grab Deal",
    buttonLink: "/offers",
    status: "Active", 
    mainImageUrl: null,
    iconImageUrl: null
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADD CHOOSE US DIALOG COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddChooseUsDialog = ({ isDark, onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState({
    title: editingItem?.title || "",
    subtitle: editingItem?.subtitle || "",
    description: editingItem?.description || "",
    buttonName: editingItem?.buttonName || "",
    buttonLink: editingItem?.buttonLink || "",
    status: editingItem?.status || "Active",
  });
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(editingItem?.mainImageUrl || null);
  const [iconImageFile, setIconImageFile] = useState(null);
  const [iconImagePreview, setIconImagePreview] = useState(editingItem?.iconImageUrl || null);
  const [mainDragActive, setMainDragActive] = useState(false);
  const [iconDragActive, setIconDragActive] = useState(false);
  const mainFileInputRef = useRef(null);
  const iconFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainImageChange = (file) => {
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconImageChange = (file) => {
    if (file) {
      setIconImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMainFileInput = (e) => {
    const file = e.target.files[0];
    handleMainImageChange(file);
  };

  const handleIconFileInput = (e) => {
    const file = e.target.files[0];
    handleIconImageChange(file);
  };

  const handleMainDragOver = (e) => {
    e.preventDefault();
    setMainDragActive(true);
  };

  const handleMainDragLeave = (e) => {
    e.preventDefault();
    setMainDragActive(false);
  };

  const handleMainDrop = (e) => {
    e.preventDefault();
    setMainDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleMainImageChange(file);
    }
  };

  const handleIconDragOver = (e) => {
    e.preventDefault();
    setIconDragActive(true);
  };

  const handleIconDragLeave = (e) => {
    e.preventDefault();
    setIconDragActive(false);
  };

  const handleIconDrop = (e) => {
    e.preventDefault();
    setIconDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleIconImageChange(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return;
    }
    
    const maxSn = editingItem?.sn || 0;
    
    onSave({
      title: formData.title,
      subtitle: formData.subtitle || "",
      description: formData.description || "",
      buttonName: formData.buttonName || "",
      buttonLink: formData.buttonLink || "",
      status: formData.status,
      mainImageFile,
      mainImageUrl: mainImagePreview,
      iconImageFile,
      iconImageUrl: iconImagePreview,
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
      maxWidth: "600px",
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
    imageUploadArea: (dragActive) => ({
      border: `2px dashed ${dragActive ? '#3b82f6' : (isDark ? '#1e2740' : '#e2e8f0')}`,
      borderRadius: "12px",
      padding: "16px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      background: isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.02)",
      marginTop: "8px",
    }),
    imagePreview: {
      width: "100%",
      maxHeight: "120px",
      objectFit: "cover",
      borderRadius: "8px",
      marginTop: "12px",
    },
    uploadIcon: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "8px",
    },
    uploadText: {
      fontSize: "13px",
      fontWeight: 500,
      color: isDark ? "#94a3b8" : "#64748b",
    },
    uploadHint: {
      fontSize: "11px",
      color: isDark ? "#4a5568" : "#94a3b8",
      marginTop: "4px",
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
          <h3 style={dialogStyles.title}>{editingItem ? "Edit Choose Us" : "Add Choose Us"}</h3>
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
                placeholder="Enter title"
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
                placeholder="Enter subtitle"
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
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Main Image Upload Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Main Image</label>
              <div
                style={dialogStyles.imageUploadArea(mainDragActive)}
                onClick={() => mainFileInputRef.current?.click()}
                onDragOver={handleMainDragOver}
                onDragLeave={handleMainDragLeave}
                onDrop={handleMainDrop}
              >
                <input
                  ref={mainFileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleMainFileInput}
                  style={{ display: "none" }}
                />
                <div style={dialogStyles.uploadIcon}>
                  <UploadIcon />
                </div>
                <div style={dialogStyles.uploadText}>
                  {mainImagePreview ? "Change Main Image" : "Upload Main Image"}
                </div>
                <div style={dialogStyles.uploadHint}>
                  PNG, JPG, WebP up to 10MB
                </div>
                {mainImagePreview && (
                  <img src={mainImagePreview} alt="Main Preview" style={dialogStyles.imagePreview} />
                )}
              </div>
            </div>

            {/* Short Image / Icon Upload Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Short Image / Icon</label>
              <div
                style={dialogStyles.imageUploadArea(iconDragActive)}
                onClick={() => iconFileInputRef.current?.click()}
                onDragOver={handleIconDragOver}
                onDragLeave={handleIconDragLeave}
                onDrop={handleIconDrop}
              >
                <input
                  ref={iconFileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                  onChange={handleIconFileInput}
                  style={{ display: "none" }}
                />
                <div style={dialogStyles.uploadIcon}>
                  <UploadIcon />
                </div>
                <div style={dialogStyles.uploadText}>
                  {iconImagePreview ? "Change Icon" : "Upload Short Image / Icon"}
                </div>
                <div style={dialogStyles.uploadHint}>
                  PNG, JPG, SVG up to 5MB
                </div>
                {iconImagePreview && (
                  <img src={iconImagePreview} alt="Icon Preview" style={dialogStyles.imagePreview} />
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
                placeholder="e.g., Learn More, Shop Now, Read More"
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
                placeholder="e.g., /learn-more, /shop"
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
              {editingItem ? "Update" : "Save"}
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

const ImagePlaceholder = ({ isDark, imageUrl, type }) => (
  <div style={{
    width: "50px", height: "50px", borderRadius: "8px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
    overflow: "hidden",
  }}>
    {imageUrl ? (
      <img src={imageUrl} alt={type} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      type === "main" ? "🖼️" : "🔘"
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const ChooseUs = ({ isDark = true }) => {
  const [items, setItems] = useState(demoChooseUs);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const itemsPerPage = 10;

  // Filter items
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(search.toLowerCase())) ||
    (item.subtitle && item.subtitle.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle status
  const toggleStatus = (id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: item.status === "Active" ? "Hidden" : "Active" } : item
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleView = (item) => {
    alert(`Title: ${item.title}\nSubtitle: ${item.subtitle || "—"}\nDescription: ${item.description || "—"}\nButton: ${item.buttonName || "—"}\nLink: ${item.buttonLink || "—"}`);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Update existing item
      setItems(prev => prev.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              title: itemData.title,
              subtitle: itemData.subtitle,
              description: itemData.description,
              buttonName: itemData.buttonName,
              buttonLink: itemData.buttonLink,
              status: itemData.status,
              mainImageUrl: itemData.mainImageUrl || item.mainImageUrl,
              iconImageUrl: itemData.iconImageUrl || item.iconImageUrl,
            }
          : item
      ));
    } else {
      // Add new item
      const newId = Math.max(...items.map(i => i.id), 0) + 1;
      const newSn = Math.max(...items.map(i => i.sn), 0) + 1;
      const newItem = {
        id: newId,
        sn: newSn,
        title: itemData.title,
        subtitle: itemData.subtitle,
        description: itemData.description,
        buttonName: itemData.buttonName,
        buttonLink: itemData.buttonLink,
        status: itemData.status,
        mainImageUrl: itemData.mainImageUrl,
        iconImageUrl: itemData.iconImageUrl,
      };
      setItems(prev => [newItem, ...prev]);
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
    },
    titleCell: {
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    descriptionCell: {
      maxWidth: "250px",
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
            placeholder="Search choose us..."
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

      {/* Choose Us Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>SN</th>
              <th style={styles.th}>Main Image</th>
              <th style={styles.th}>Icon</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Subtitle</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Button</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>{item.sn}</td>
                <td style={styles.td}>
                  <ImagePlaceholder isDark={isDark} imageUrl={item.mainImageUrl} type="main" />
                </td>
                <td style={styles.td}>
                  <ImagePlaceholder isDark={isDark} imageUrl={item.iconImageUrl} type="icon" />
                </td>
                <td style={{...styles.td, ...styles.titleCell}}>{item.title}</td>
                <td style={styles.td}>{item.subtitle || "—"}</td>
                <td style={{...styles.td, ...styles.descriptionCell}} title={item.description}>
                  {item.description || "—"}
                </td>
                <td style={styles.td}>
                  {item.buttonName ? (
                    <div>
                      <span style={styles.buttonBadge}>{item.buttonName}</span>
                      {item.buttonLink && (
                        <div style={{ fontSize: "10px", color: isDark ? "#4a5568" : "#94a3b8", marginTop: "2px" }}>
                          {item.buttonLink}
                        </div>
                      )}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td style={styles.td}><StatusBadge status={item.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} onClick={() => handleView(item)} title="View">
                      <EyeIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleEdit(item)} title="Edit">
                      <EditIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => toggleStatus(item.id)} title={item.status === "Active" ? "Hide" : "Show"}>
                      {item.status === "Active" ? <HideIcon /> : <ShowIcon />}
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleDelete(item.id)} title="Delete">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan={9} style={styles.emptyState}>
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Rows and Pagination */}
      <div style={styles.footer}>
        <div style={styles.pageInfo}>
          Rows: {filteredItems.length} of {filteredItems.length} — Page {currentPage}/{totalPages || 1}
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

      {/* Add/Edit Choose Us Dialog */}
      {isDialogOpen && (
        <AddChooseUsDialog
          isDark={isDark}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
          editingItem={editingItem}
        />
      )}
    </div>
  );
};

export default ChooseUs;