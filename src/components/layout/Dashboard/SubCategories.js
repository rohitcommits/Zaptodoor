import React, { useState, useRef, useEffect } from "react";

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
    width: "40px", height: "40px", borderRadius: "10px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", fontWeight: 500,
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "id") setIdError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
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
    if (!formData.name.trim()) return;
    
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
      padding: isMobile ? "16px" : "0",
    },
    dialog: {
      width: "100%",
      maxWidth: isMobile ? "100%" : "550px",
      margin: isMobile ? "0" : "auto",
      background: isDark ? "#141824" : "#ffffff",
      borderRadius: isMobile ? "12px" : "16px",
      boxShadow: "0 20px 35px -10px rgba(0,0,0,0.3)",
      overflow: "hidden",
      animation: "fadeIn 0.2s ease-out",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "14px 20px" : "18px 24px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    title: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: 600,
      color: isDark ? "#f1f5f9" : "#0f172a",
      margin: 0,
    },
    body: {
      padding: isMobile ? "20px" : "24px",
      maxHeight: "60vh",
      overflowY: "auto",
    },
    rowTwoColumns: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "16px",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      padding: isMobile ? "14px 20px" : "16px 24px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#fafcff",
    },
    ...getFormStyles(isDark, isMobile)
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
            <div style={dialogStyles.rowTwoColumns}>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>Name <span style={dialogStyles.required}>*</span></label>
                <input type="text" name="name" style={dialogStyles.input} placeholder="Enter sub category name" value={formData.name} onChange={handleChange} required autoFocus />
              </div>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>Category ID <span style={dialogStyles.required}>*</span></label>
                <input type="number" name="id" style={{ ...dialogStyles.input, ...(idError ? dialogStyles.errorInput : {}) }} placeholder="Enter unique category ID" value={formData.id} onChange={handleChange} required />
                {idError && <div style={dialogStyles.errorText}>{idError}</div>}
              </div>
            </div>
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Main Category</label>
              <input type="text" name="category" style={dialogStyles.input} placeholder="Enter main category" value={formData.category} onChange={handleChange} list="categoryOptions" />
              <datalist id="categoryOptions">
                <option>Salads</option><option>Main Course</option><option>Combos</option>
                <option>Chinese</option><option>South Indian</option><option>Biryani</option>
                <option>Starters</option><option>Desserts</option>
              </datalist>
            </div>
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Description</label>
              <textarea name="description" style={dialogStyles.textarea} placeholder="Enter sub category description" value={formData.description} onChange={handleChange} />
            </div>
            <div style={dialogStyles.rowTwoColumns}>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>Button Name</label>
                <input type="text" name="buttonName" style={dialogStyles.input} placeholder="e.g., Order Now" value={formData.buttonName} onChange={handleChange} />
              </div>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>Button Link</label>
                <input type="text" name="buttonLink" style={dialogStyles.input} placeholder="e.g., /order" value={formData.buttonLink} onChange={handleChange} />
              </div>
            </div>
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Image</label>
              <div style={dialogStyles.imageUploadArea} onClick={() => fileInputRef.current?.click()}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                <div style={dialogStyles.uploadIcon}><UploadIcon /></div>
                <div style={dialogStyles.uploadText}>{imagePreview ? "Change Image" : "Click to upload image"}</div>
                <div style={dialogStyles.uploadHint}>Supports JPG, PNG, GIF (Max 5MB)</div>
                {imagePreview && <img src={imagePreview} alt="Preview" style={dialogStyles.imagePreview} />}
              </div>
            </div>
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Status</label>
              <div style={{ display: "flex", gap: "20px", marginTop: "8px", flexWrap: "wrap" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b" }}>
                  <input type="radio" name="status" value="Active" checked={formData.status === "Active"} onChange={handleChange} /> Active
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b" }}>
                  <input type="radio" name="status" value="Inactive" checked={formData.status === "Inactive"} onChange={handleChange} /> Inactive
                </label>
              </div>
            </div>
          </div>
          <div style={dialogStyles.footer}>
            <button type="button" style={dialogStyles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={dialogStyles.saveBtn}>Save Sub Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const getFormStyles = (isDark, isMobile) => ({
  formGroup: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 500, color: isDark ? "#cbd5e1" : "#334155" },
  required: { color: "#ef4444", marginLeft: "4px" },
  input: {
    width: "100%", padding: "10px 12px", background: isDark ? "#0d1117" : "#f8fafc",
    border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "10px",
    fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b", outline: "none",
    transition: "all 0.2s", boxSizing: "border-box",
  },
  textarea: {
    width: "100%", padding: "10px 12px", background: isDark ? "#0d1117" : "#f8fafc",
    border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "10px",
    fontSize: "14px", color: isDark ? "#f1f5f9" : "#1e293b", outline: "none",
    fontFamily: "inherit", resize: "vertical", minHeight: "80px", boxSizing: "border-box",
  },
  errorInput: { border: "1px solid #ef4444" },
  errorText: { fontSize: "11px", color: "#ef4444", marginTop: "4px" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: isDark ? "#94a3b8" : "#64748b", padding: "4px", display: "flex", borderRadius: "8px" },
  cancelBtn: { padding: isMobile ? "8px 16px" : "8px 18px", background: "transparent", border: isDark ? "1px solid #2a3a5a" : "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: isDark ? "#94a3b8" : "#475569", cursor: "pointer" },
  saveBtn: { padding: isMobile ? "8px 16px" : "8px 20px", background: "#4a6cf7", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: "#fff", cursor: "pointer" },
  imageUploadArea: { border: isDark ? "1px dashed #3b82f6" : "1px dashed #3b82f6", borderRadius: "12px", padding: "16px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.02)", marginTop: "8px" },
  imagePreview: { width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px", marginTop: "12px" },
  uploadIcon: { display: "flex", justifyContent: "center", marginBottom: "8px" },
  uploadText: { fontSize: "13px", color: isDark ? "#94a3b8" : "#64748b" },
  uploadHint: { fontSize: "11px", color: isDark ? "#4a5568" : "#94a3b8", marginTop: "6px" },
});

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT - Professional Layout with Horizontal Scroll
// ─────────────────────────────────────────────────────────────────────────────
const SubCategoriesTable = ({ isDark = true }) => {
  const [subCategories, setSubCategories] = useState(demoSubCategories);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const itemsPerPage = 10;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const existingIds = subCategories.map(sub => sub.id);
  const existingSnValues = subCategories.map(sub => sub.sn);

  const filteredSubCategories = subCategories.filter(sub =>
    sub.name.toLowerCase().includes(search.toLowerCase()) ||
    sub.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);
  const paginatedData = filteredSubCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const toggleStatus = (id) => {
    setSubCategories(prev => prev.map(sub =>
      sub.id === id ? { ...sub, status: sub.status === "Active" ? "Inactive" : "Active" } : sub
    ));
  };

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

  // Professional spacing
  const getContainerPadding = () => {
    if (isMobile) return "16px";
    if (isTablet) return "24px";
    return "28px";
  };

  const getHeaderFlexDirection = () => {
    if (isMobile) return "column";
    return "row";
  };

  const getSearchWidth = () => {
    if (isMobile) return "100%";
    if (isTablet) return "260px";
    return "300px";
  };

  const styles = {
    container: {
      background: isDark ? "#0c1018" : "#f0f4ff",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      padding: getContainerPadding(),
    },
    contentWrapper: {
      maxWidth: "1600px",
      margin: "0 auto",
      width: "100%",
    },
    header: {
      display: "flex",
      flexDirection: getHeaderFlexDirection(),
      justifyContent: "space-between",
      alignItems: isMobile ? "stretch" : "center",
      marginBottom: "24px",
      gap: isMobile ? "16px" : "20px",
    },
    titleSection: {
      flex: isMobile ? "auto" : 1,
    },
    title: {
      fontSize: isMobile ? "22px" : "24px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#0f172a",
      margin: 0,
      letterSpacing: "-0.3px",
    },
    subtitle: {
      fontSize: "13px",
      color: isDark ? "#64748b" : "#64748b",
      marginTop: "6px",
    },
    controlsSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      gap: "12px",
      width: isMobile ? "100%" : "auto",
    },
    searchWrapper: {
      position: "relative",
      width: getSearchWidth(),
      flexShrink: 0,
    },
    searchIcon: {
      position: "absolute",
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#3b82f6",
    },
    searchInput: {
      width: "100%",
      padding: "12px 16px 12px 42px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "14px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
      transition: "all 0.2s",
      boxSizing: "border-box",
    },
    addBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: isMobile ? "12px 20px" : "10px 24px",
      background: "#4a6cf7",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all 0.2s",
      flexShrink: 0,
    },
    selectionBar: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: isDark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.06)",
      border: isDark ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(59,130,246,0.15)",
      borderRadius: "10px",
      padding: "10px 20px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    tableCard: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.05)",
    },
    tableWrapper: {
      overflowX: "auto",
      overflowY: "hidden",
      WebkitOverflowScrolling: "touch",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "1100px",
    },
    th: {
      padding: "16px 20px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: 700,
      color: "#3b82f6",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "16px 20px",
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
    buttonBadge: {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "11px",
      fontWeight: 500,
      background: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)",
      color: "#3b82f6",
    },
    linkText: {
      fontSize: "10px",
      color: isDark ? "#64748b" : "#94a3b8",
      display: "block",
      marginTop: "4px",
    },
    actions: {
      display: "flex",
      gap: "6px",
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
      borderRadius: "8px",
      transition: "all 0.2s",
    },
    pagination: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "center",
      justifyContent: "space-between",
      gap: isMobile ? "16px" : "0",
      padding: "16px 24px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
    paginationInfo: {
      fontSize: "13px",
      color: isDark ? "#64748b" : "#94a3b8",
    },
    paginationButtons: {
      display: "flex",
      gap: "8px",
    },
    pageBtn: (disabled, isActive) => ({
      width: "36px",
      height: "36px",
      borderRadius: "8px",
      border: isActive ? "1px solid #3b82f6" : isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isActive ? "#1e3a8a" : isDark ? "#141824" : "#ffffff",
      color: isActive ? "#93c5fd" : disabled ? (isDark ? "#2d3a55" : "#cbd5e1") : (isDark ? "#94a3b8" : "#64748b"),
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
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
      <div style={styles.contentWrapper}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
          }
          button:hover {
            opacity: 0.85;
            transform: translateY(-1px);
          }
          input:focus, textarea:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
          }
          .custom-scroll::-webkit-scrollbar {
            height: 8px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: ${isDark ? "#1a2035" : "#e2e8f0"};
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: ${isDark ? "#3b82f6" : "#3b82f6"};
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: ${isDark ? "#60a5fa" : "#2563eb"};
          }
        `}</style>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>Sub Categories</h1>
            <p style={styles.subtitle}>Manage your food sub categories and menu items</p>
          </div>
          <div style={styles.controlsSection}>
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
              <PlusIcon /> Add Sub Category
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
            <button onClick={() => setSelected(new Set())} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
              Clear Selection
            </button>
          </div>
        )}

        {/* Table Card */}
        <div style={styles.tableCard}>
          <div style={styles.tableWrapper} className="custom-scroll">
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}><Checkbox checked={selected.size === paginatedData.length && paginatedData.length > 0} onChange={toggleAll} isDark={isDark} /></th>
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
                  <tr key={item.id} style={{ background: selected.has(item.id) && isDark ? "rgba(59,130,246,0.08)" : selected.has(item.id) ? "rgba(59,130,246,0.04)" : "transparent" }}>
                    <td style={styles.td}><Checkbox checked={selected.has(item.id)} onChange={() => toggleOne(item.id)} isDark={isDark} /></td>
                    <td style={styles.td}>{item.sn}</td>
                    <td style={styles.td}>{item.id}</td>
                    <td style={styles.td}><ImagePlaceholder name={item.name} isDark={isDark} imageUrl={item.imageUrl} /></td>
                    <td style={styles.td}><strong>{item.name}</strong></td>
                    <td style={styles.td}>{item.category}</td>
                    <td style={styles.td}>
                      <div style={styles.descriptionCell} title={item.description}>
                        {item.description || "—"}
                      </div>
                    </td>
                    <td style={styles.td}>
                      {item.buttonName ? (
                        <div>
                          <span style={styles.buttonBadge}>{item.buttonName}</span>
                          {item.buttonLink && <span style={styles.linkText}>{item.buttonLink}</span>}
                        </div>
                      ) : "—"}
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
              <div style={styles.paginationInfo}>
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredSubCategories.length)} to {Math.min(currentPage * itemsPerPage, filteredSubCategories.length)} of {filteredSubCategories.length} sub categories
              </div>
              <div style={styles.paginationButtons}>
                <button style={styles.pageBtn(currentPage === 1, false)} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                  return pageNum <= totalPages && (
                    <button key={pageNum} style={styles.pageBtn(false, currentPage === pageNum)} onClick={() => setCurrentPage(pageNum)}>
                      {pageNum}
                    </button>
                  );
                })}
                <button style={styles.pageBtn(currentPage === totalPages, false)} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
              </div>
            </div>
          )}
        </div>

        {/* Add Dialog */}
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
    </div>
  );
};

export default SubCategoriesTable;