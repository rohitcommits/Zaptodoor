import React, { useState, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoCategories = [
  { id: 132, imageId: 145, name: "Main Course", mainCategory: "Main Course", subCategories: 10, description: "Main course dishes for lunch and dinner", status: "Active", imageUrl: null },
  { id: 131, imageId: 144, name: "ice", mainCategory: "Ice Cream", subCategories: 1, description: "Delicious ice cream flavors", status: "Active", imageUrl: null },
  { id: 130, imageId: 143, name: "create new", mainCategory: "Breakfast", subCategories: 1, description: "Breakfast items", status: "Active", imageUrl: null },
  { id: 129, imageId: 142, name: "Side Dishes", mainCategory: "Breads", subCategories: 0, description: "Side dishes to complement meals", status: "Active", imageUrl: null },
  { id: 128, imageId: 141, name: "Foodiestan", mainCategory: "Breads", subCategories: 0, description: "Foodiestan specials", status: "Active", imageUrl: null },
  { id: 127, imageId: 140, name: "Foodiestan", mainCategory: "Breads", subCategories: 0, description: "Foodiestan specials", status: "Active", imageUrl: null },
  { id: 126, imageId: 139, name: "unknown", mainCategory: "Breads", subCategories: 0, description: "", status: "Active", imageUrl: null },
  { id: 125, imageId: 138, name: "Combo", mainCategory: "Breads", subCategories: 0, description: "Combo meals", status: "Active", imageUrl: null },
  { id: 124, imageId: 137, name: "Sweets & Desserts", mainCategory: "Breads", subCategories: 1, description: "Sweet treats and desserts", status: "Active", imageUrl: null },
  { id: 123, imageId: 136, name: "Burgers", mainCategory: "Breads", subCategories: 0, description: "Juicy burgers", status: "Active", imageUrl: null },
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const UnlockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status, isDark }) => {
  const config = {
    Active: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
    Inactive: { bg: isDark ? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.08)", color: "#94a3b8" },
  };
  const c = config[status] || config.Active;
  return (
    <span style={{
      display: "inline-block", padding: "4px 12px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const ImagePlaceholder = ({ imageId, isDark, imageUrl }) => (
  <div style={{
    width: "36px", height: "36px", borderRadius: "8px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 600,
    color: isDark ? "#64748b" : "#94a3b8",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
    overflow: "hidden",
  }}>
    {imageUrl ? (
      <img src={imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      imageId || "📷"
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ADD CATEGORY DIALOG COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddCategoryDialog = ({ isDark, onClose, onSave, existingIds }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mainCategory: "",
    description: "",
    status: "Active",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [idError, setIdError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear ID error when user types
    if (name === "id") {
      setIdError("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate ID
    const newId = parseInt(formData.id);
    if (!formData.id || isNaN(newId)) {
      setIdError("Please enter a valid ID");
      return;
    }
    if (existingIds.includes(newId)) {
      setIdError("ID already exists. Please use a unique ID");
      return;
    }
    
    if (!formData.name.trim()) {
      return;
    }
    
    onSave({
      id: newId,
      name: formData.name,
      mainCategory: formData.mainCategory || "Uncategorized",
      description: formData.description || "",
      status: formData.status,
      imageFile,
      imageUrl: imagePreview,
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
      backgroundColor: "rgba(0, 0, 0, 0.6)",
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
      borderRadius: "16px",
      boxShadow: "0 20px 35px -10px rgba(0,0,0,0.3)",
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
      maxHeight: "60vh",
      overflowY: "auto",
    },
    formGroup: {
      marginBottom: "20px",
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
      padding: "10px 12px",
      background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "14px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
      transition: "all 0.2s",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "14px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
      transition: "all 0.2s",
      fontFamily: "inherit",
      resize: "vertical",
      minHeight: "80px",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "14px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
      cursor: "pointer",
    },
    errorInput: {
      border: "1px solid #ef4444",
    },
    errorText: {
      fontSize: "11px",
      color: "#ef4444",
      marginTop: "4px",
    },
    imageUploadArea: {
      border: isDark ? "1px dashed #3b82f6" : "1px dashed #3b82f6",
      borderRadius: "12px",
      padding: "16px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      background: isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.02)",
      marginTop: "8px",
    },
    imagePreview: {
      width: "100%",
      maxHeight: "150px",
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
      color: isDark ? "#94a3b8" : "#64748b",
    },
    uploadHint: {
      fontSize: "11px",
      color: isDark ? "#4a5568" : "#94a3b8",
      marginTop: "6px",
    },
    rowTwoColumns: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
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
      padding: "8px 18px",
      background: "transparent",
      border: isDark ? "1px solid #2a3a5a" : "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 500,
      color: isDark ? "#94a3b8" : "#475569",
      cursor: "pointer",
    },
    saveBtn: {
      padding: "8px 20px",
      background: "#4a6cf7",
      border: "none",
      borderRadius: "8px",
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
          <h3 style={dialogStyles.title}>Add New Category</h3>
          <button style={dialogStyles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={dialogStyles.body}>
            {/* ID and Name in two columns */}
            <div style={dialogStyles.rowTwoColumns}>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>
                  ID <span style={dialogStyles.required}>*</span>
                </label>
                <input
                  type="number"
                  name="id"
                  style={{ ...dialogStyles.input, ...(idError ? dialogStyles.errorInput : {}) }}
                  placeholder="Enter category ID"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
                {idError && <div style={dialogStyles.errorText}>{idError}</div>}
              </div>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>
                  Name <span style={dialogStyles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  style={dialogStyles.input}
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Main Category */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Main Category</label>
              <input
                type="text"
                name="mainCategory"
                style={dialogStyles.input}
                placeholder="Enter main category (e.g., Breads, Ice Cream, Breakfast)"
                value={formData.mainCategory}
                onChange={handleChange}
                list="mainCategoryOptions"
              />
              <datalist id="mainCategoryOptions">
                <option>Breads</option>
                <option>Ice Cream</option>
                <option>Breakfast</option>
                <option>Main Course</option>
                <option>Burgers</option>
                <option>Side Dishes</option>
                <option>Sweets & Desserts</option>
              </datalist>
            </div>

            {/* Description */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Description</label>
              <textarea
                name="description"
                style={dialogStyles.textarea}
                placeholder="Enter category description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Image Upload */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Image</label>
              <div 
                style={dialogStyles.imageUploadArea}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <div style={dialogStyles.uploadIcon}>
                  <UploadIcon />
                </div>
                <div style={dialogStyles.uploadText}>
                  {imagePreview ? "Change Image" : "Click to upload image"}
                </div>
                <div style={dialogStyles.uploadHint}>
                  Supports JPG, PNG, GIF (Max 5MB)
                </div>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" style={dialogStyles.imagePreview} />
                )}
              </div>
            </div>
          </div>
          <div style={dialogStyles.footer}>
            <button type="button" style={dialogStyles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={dialogStyles.saveBtn}>
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT - With Dialog
// ─────────────────────────────────────────────────────────────────────────────
const CategoriesTable = ({ isDark = true }) => {
  const [categories, setCategories] = useState(demoCategories);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 10;

  // Get existing IDs for validation
  const existingIds = categories.map(cat => cat.id);

  // Filter categories
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.mainCategory.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle status
  const toggleStatus = (id) => {
    setCategories(prev => prev.map(cat =>
      cat.id === id 
        ? { ...cat, status: cat.status === "Active" ? "Inactive" : "Active" }
        : cat
    ));
  };

  // Add new category
  const addCategory = (newCategoryData) => {
    const newImageId = Math.max(...categories.map(c => c.imageId), 0) + 1;
    const newCategory = {
      id: newCategoryData.id,
      imageId: newImageId,
      name: newCategoryData.name,
      mainCategory: newCategoryData.mainCategory,
      subCategories: 0,
      description: newCategoryData.description,
      status: newCategoryData.status,
      imageUrl: newCategoryData.imageUrl,
    };
    setCategories(prev => [newCategory, ...prev]);
  };

  // Styles based on theme
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
    title: {
      fontSize: "20px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
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
      padding: "8px 20px",
      background: "#4a6cf7",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
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
    descriptionCell: {
      maxWidth: "200px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
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
      
      {/* Header with Title, Search and Add Button */}
      <div style={styles.header}>
        <h3 style={styles.title}>Categories</h3>
        <div style={{ display: "flex", gap: "16px", flex: 1, justifyContent: "flex-end" }}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}><SearchIcon /></span>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button style={styles.addBtn} onClick={() => setIsDialogOpen(true)}>
            <PlusIcon /> Add
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Main Category</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Sub Categories</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((cat) => (
              <tr key={cat.id}>
                <td style={styles.td}>{cat.id}</td>
                <td style={styles.td}>
                  <ImagePlaceholder imageId={cat.imageId} isDark={isDark} imageUrl={cat.imageUrl} />
                </td>
                <td style={styles.td}><strong>{cat.name}</strong></td>
                <td style={styles.td}>{cat.mainCategory}</td>
                <td style={styles.td}>
                  <span style={styles.descriptionCell} title={cat.description}>
                    {cat.description || "—"}
                  </span>
                </td>
                <td style={styles.td}>{cat.subCategories}</td>
                <td style={styles.td}><StatusBadge status={cat.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} title="View"><EyeIcon /></button>
                    <button style={styles.actionBtn} title="Edit"><EditIcon /></button>
                    <button style={styles.actionBtn} title="Toggle Status" onClick={() => toggleStatus(cat.id)}>
                      {cat.status === "Active" ? <LockIcon /> : <UnlockIcon />}
                    </button>
                    <button style={styles.actionBtn} title="Delete"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedCategories.length === 0 && (
              <tr>
                <td colSpan={8} style={styles.emptyState}>
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredCategories.length > itemsPerPage && (
        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: isDark ? "#64748b" : "#94a3b8" }}>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCategories.length)} to {Math.min(currentPage * itemsPerPage, filteredCategories.length)} of {filteredCategories.length} categories
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

      {/* Add Category Dialog */}
      {isDialogOpen && (
        <AddCategoryDialog
          isDark={isDark}
          onClose={() => setIsDialogOpen(false)}
          onSave={addCategory}
          existingIds={existingIds}
        />
      )}
    </div>
  );
};

export default CategoriesTable;