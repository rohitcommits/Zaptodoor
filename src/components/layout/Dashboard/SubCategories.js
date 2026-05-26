import React, { useState, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoSubCategories = [
  { sn: 868, id: 915, name: "Sanghi Sathi", category: "Salads", products: 0, description: "Fresh salad with special dressing", status: "Active", imageUrl: null, buttonName: "Order Now", buttonLink: "/order/salads" },
  { sn: 867, id: 914, name: "Sanghi Sathi", category: "Salads", products: 0, description: "Classic salad recipe", status: "Active", imageUrl: null, buttonName: "View Menu", buttonLink: "/menu/salads" },
  { sn: 866, id: 913, name: "Pasand Aap Ki Dal", category: "Main Course", products: 0, description: "Special dal prepared with chef's recipe", status: "Active", imageUrl: null, buttonName: "Order Now", buttonLink: "/order/dal" },
  { sn: 865, id: 912, name: "Subz Bahar", category: "Main Course", products: 0, description: "Mixed vegetable curry", status: "Active", imageUrl: null, buttonName: "Explore", buttonLink: "/menu/vegetables" },
  { sn: 864, id: 911, name: "Subz Bahar", category: "Main Course", products: 0, description: "Seasonal vegetable delight", status: "Active", imageUrl: null, buttonName: "Order Now", buttonLink: "/order/subz" },
  { sn: 863, id: 910, name: "Chinese Meals", category: "Combos", products: 0, description: "Complete Chinese meal combo", status: "Active", imageUrl: null, buttonName: "View Combos", buttonLink: "/combos/chinese" },
  { sn: 862, id: 909, name: "Kuch Khaas", category: "Main Course", products: 0, description: "Chef's special recipe", status: "Active", imageUrl: null, buttonName: "Try Now", buttonLink: "/special/kuchkhaas" },
  { sn: 861, id: 908, name: "Rice & Noodles", category: "Chinese", products: 0, description: "Variety of rice and noodle dishes", status: "Active", imageUrl: null, buttonName: "Order Now", buttonLink: "/order/rice-noodles" },
  { sn: 860, id: 907, name: "Chaap Special", category: "Main Course", products: 0, description: "Soya chaap special preparation", status: "Active", imageUrl: null, buttonName: "Explore", buttonLink: "/menu/chaap" },
  { sn: 859, id: 906, name: "South Indian Dishes", category: "South Indian", products: 0, description: "Authentic South Indian cuisine", status: "Active", imageUrl: null, buttonName: "Order Now", buttonLink: "/order/south-indian" },
  { sn: 858, id: 905, name: "Biryani", category: "Biryani", products: 0, description: "Fragrant rice with spices", status: "Active", imageUrl: null, buttonName: "Order Biryani", buttonLink: "/order/biryani" },
  { sn: 857, id: 904, name: "Dine & Biryani", category: "Biryani", products: 0, description: "Premium biryani experience", status: "Active", imageUrl: null, buttonName: "Book Table", buttonLink: "/dine/biryani" },
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

const ImagePlaceholder = ({ name, isDark, imageUrl }) => (
  <div style={{
    width: "36px", height: "36px", borderRadius: "8px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "14px", fontWeight: 500,
    color: isDark ? "#64748b" : "#94a3b8",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
    overflow: "hidden",
  }}>
    {imageUrl ? (
      <img src={imageUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      "🍽️"
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ADD SUB CATEGORY DIALOG COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddSubCategoryDialog = ({ isDark, onClose, onSave, existingIds, existingSnValues }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    buttonName: "",
    buttonLink: "",
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
    
    const maxSn = existingSnValues.length > 0 ? Math.max(...existingSnValues) : 856;
    
    onSave({
      id: newId,
      sn: maxSn + 1,
      name: formData.name,
      category: formData.category || "Uncategorized",
      description: formData.description || "",
      buttonName: formData.buttonName || "",
      buttonLink: formData.buttonLink || "",
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
      maxWidth: "550px",
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
    errorInput: {
      border: "1px solid #ef4444",
    },
    errorText: {
      fontSize: "11px",
      color: "#ef4444",
      marginTop: "4px",
    },
    rowTwoColumns: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
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
          <h3 style={dialogStyles.title}>Add Sub Category</h3>
          <button style={dialogStyles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={dialogStyles.body}>
            {/* Name and ID in two columns */}
            <div style={dialogStyles.rowTwoColumns}>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>
                  Name <span style={dialogStyles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  style={dialogStyles.input}
                  placeholder="Enter sub category name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>
                  Category ID <span style={dialogStyles.required}>*</span>
                </label>
                <input
                  type="number"
                  name="id"
                  style={{ ...dialogStyles.input, ...(idError ? dialogStyles.errorInput : {}) }}
                  placeholder="Enter unique category ID"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
                {idError && <div style={dialogStyles.errorText}>{idError}</div>}
              </div>
            </div>

            {/* Main Category */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Main Category</label>
              <input
                type="text"
                name="category"
                style={dialogStyles.input}
                placeholder="Enter main category (e.g., Salads, Main Course, Biryani)"
                value={formData.category}
                onChange={handleChange}
                list="categoryOptions"
              />
              <datalist id="categoryOptions">
                <option>Salads</option>
                <option>Main Course</option>
                <option>Combos</option>
                <option>Chinese</option>
                <option>South Indian</option>
                <option>Biryani</option>
                <option>Starters</option>
                <option>Desserts</option>
              </datalist>
            </div>

            {/* Description */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Description</label>
              <textarea
                name="description"
                style={dialogStyles.textarea}
                placeholder="Enter sub category description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Button Name and Button Link in two columns */}
            <div style={dialogStyles.rowTwoColumns}>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>Button Name</label>
                <input
                  type="text"
                  name="buttonName"
                  style={dialogStyles.input}
                  placeholder="e.g., Order Now, View Menu"
                  value={formData.buttonName}
                  onChange={handleChange}
                />
              </div>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>Button Link</label>
                <input
                  type="text"
                  name="buttonLink"
                  style={dialogStyles.input}
                  placeholder="e.g., /order, /menu"
                  value={formData.buttonLink}
                  onChange={handleChange}
                />
              </div>
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

            {/* Status */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Status</label>
              <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b" }}>
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === "Active"}
                    onChange={handleChange}
                    style={{ cursor: "pointer" }}
                  />
                  Active
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b" }}>
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === "Inactive"}
                    onChange={handleChange}
                    style={{ cursor: "pointer" }}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div style={dialogStyles.footer}>
            <button type="button" style={dialogStyles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={dialogStyles.saveBtn}>
              Save Sub Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const SubCategoriesTable = ({ isDark = true }) => {
  const [subCategories, setSubCategories] = useState(demoSubCategories);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 10;

  // Get existing IDs for validation
  const existingIds = subCategories.map(sub => sub.id);
  const existingSnValues = subCategories.map(sub => sub.sn);

  // Filter sub categories
  const filteredSubCategories = subCategories.filter(sub =>
    sub.name.toLowerCase().includes(search.toLowerCase()) ||
    sub.category.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);
  const paginatedData = filteredSubCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Selection handlers
  const toggleAll = () => {
    if (selected.size === paginatedData.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginatedData.map(item => item.id)));
    }
  };
  const toggleOne = (id) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
  };

  // Toggle status
  const toggleStatus = (id) => {
    setSubCategories(prev => prev.map(sub =>
      sub.id === id 
        ? { ...sub, status: sub.status === "Active" ? "Inactive" : "Active" }
        : sub
    ));
  };

  // Add new sub category
  const addSubCategory = (newSubCategoryData) => {
    const newSubCategory = {
      sn: newSubCategoryData.sn,
      id: newSubCategoryData.id,
      name: newSubCategoryData.name,
      category: newSubCategoryData.category,
      products: 0,
      description: newSubCategoryData.description,
      buttonName: newSubCategoryData.buttonName,
      buttonLink: newSubCategoryData.buttonLink,
      status: newSubCategoryData.status,
      imageUrl: newSubCategoryData.imageUrl,
    };
    setSubCategories(prev => [newSubCategory, ...prev]);
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
    selectionBar: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: isDark 
        ? "rgba(59,130,246,0.08)" 
        : "rgba(59,130,246,0.04)",
      border: isDark 
        ? "1px solid rgba(59,130,246,0.2)" 
        : "1px solid rgba(59,130,246,0.15)",
      borderRadius: "8px",
      padding: "8px 16px",
      marginBottom: "16px",
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
      minWidth: "1200px",
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
      maxWidth: "180px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    buttonCell: {
      maxWidth: "100px",
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
    linkText: {
      fontSize: "11px",
      color: isDark ? "#64748b" : "#94a3b8",
      display: "block",
      marginTop: "2px",
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
        <h3 style={styles.title}>Sub Categories</h3>
        <div style={{ display: "flex", gap: "16px", flex: 1, justifyContent: "flex-end" }}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}><SearchIcon /></span>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search sub category..."
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

      {/* Selection Bar */}
      {selected.size > 0 && (
        <div style={styles.selectionBar}>
          <span style={{ fontSize: "13px", color: "#93c5fd", fontWeight: 600 }}>
            {selected.size} sub categor{selected.size > 1 ? "ies" : "y"} selected
          </span>
          <div style={{ flex: 1 }} />
          <button onClick={() => setSelected(new Set())} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
            Clear
          </button>
        </div>
      )}

      {/* Sub Categories Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>
                <Checkbox 
                  checked={selected.size === paginatedData.length && paginatedData.length > 0} 
                  onChange={toggleAll} 
                  isDark={isDark} 
                />
              </th>
              <th style={styles.th}>SN</th>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Button</th>
              <th style={styles.th}>Products</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} style={{ background: selected.has(item.id) && isDark ? "rgba(59,130,246,0.07)" : selected.has(item.id) ? "rgba(59,130,246,0.03)" : "transparent" }}>
                <td style={styles.td}>
                  <Checkbox checked={selected.has(item.id)} onChange={() => toggleOne(item.id)} isDark={isDark} />
                </td>
                <td style={styles.td}>{item.sn}</td>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>
                  <ImagePlaceholder name={item.name} isDark={isDark} imageUrl={item.imageUrl} />
                </td>
                <td style={styles.td}><strong>{item.name}</strong></td>
                <td style={styles.td}>{item.category}</td>
                <td style={styles.td}>
                  <span style={styles.descriptionCell} title={item.description}>
                    {item.description || "—"}
                  </span>
                </td>
                <td style={styles.td}>
                  {item.buttonName ? (
                    <div>
                      <span style={styles.buttonBadge}>{item.buttonName}</span>
                      {item.buttonLink && (
                        <span style={styles.linkText}>{item.buttonLink}</span>
                      )}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td style={styles.td}>{item.products}</td>
                <td style={styles.td}><StatusBadge status={item.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} title="View"><EyeIcon /></button>
                    <button style={styles.actionBtn} title="Edit"><EditIcon /></button>
                    <button style={styles.actionBtn} title="Toggle Status" onClick={() => toggleStatus(item.id)}>
                      {item.status === "Active" ? <LockIcon /> : <UnlockIcon />}
                    </button>
                    <button style={styles.actionBtn} title="Delete"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={11} style={styles.emptyState}>
                  No sub categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredSubCategories.length > itemsPerPage && (
        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: isDark ? "#64748b" : "#94a3b8" }}>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredSubCategories.length)} to {Math.min(currentPage * itemsPerPage, filteredSubCategories.length)} of {filteredSubCategories.length} sub categories
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

      {/* Add Sub Category Dialog */}
      {isDialogOpen && (
        <AddSubCategoryDialog
          isDark={isDark}
          onClose={() => setIsDialogOpen(false)}
          onSave={addSubCategory}
          existingIds={existingIds}
          existingSnValues={existingSnValues}
        />
      )}
    </div>
  );
};

export default SubCategoriesTable;