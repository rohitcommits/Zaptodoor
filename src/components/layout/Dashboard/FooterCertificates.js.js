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
const demoCertificates = [
  { id: 1, sn: 1, title: "DPIIT", description: "Department for Promotion of Industry and Internal Trade", link: "https://www.dpiit.gov.in", status: "Active", imageUrl: null },
  { id: 2, sn: 2, title: "Gincube", description: "Gincube certification", link: "https://www.gincube.com", status: "Active", imageUrl: null },
  { id: 3, sn: 3, title: "FSSAI", description: "Food Safety and Standards Authority of India", link: "https://www.fssai.gov.in", status: "Active", imageUrl: null },
  { id: 4, sn: 4, title: "GST", description: "Goods and Services Tax", link: "https://www.gst.gov.in", status: "Hidden", imageUrl: null },
  { id: 5, sn: 5, title: "Smart City", description: "Smart City Mission", link: "https://smartcities.gov.in", status: "Active", imageUrl: null },
  { id: 6, sn: 6, title: "MSME", description: "Micro, Small and Medium Enterprises", link: "https://www.msme.gov.in", status: "Active", imageUrl: null },
  { id: 7, sn: 7, title: "ISO", description: "International Organization for Standardization", link: "https://www.iso.org", status: "Active", imageUrl: null },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADD CERTIFICATE DIALOG COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddCertificateDialog = ({ isDark, onClose, onSave, editingCert }) => {
  const [formData, setFormData] = useState({
    title: editingCert?.title || "",
    description: editingCert?.description || "",
    link: editingCert?.link || "",
    status: editingCert?.status || "Active",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingCert?.imageUrl || null);
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
    
    const maxSn = editingCert?.sn || 0;
    
    onSave({
      title: formData.title,
      description: formData.description || "",
      link: formData.link || "",
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
      maxWidth: "540px",
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
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      background: isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.02)",
      marginTop: "8px",
    },
    imagePreview: {
      width: "100%",
      maxHeight: "140px",
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
    },
    uploadHint: {
      fontSize: "11px",
      color: isDark ? "#4a5568" : "#94a3b8",
      marginTop: "6px",
    },
    select: {
      width: "100%",
      padding: "12px 14px",
      background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "14px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
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
          <h3 style={dialogStyles.title}>{editingCert ? "Edit Certificate" : "Add Footer Certificate"}</h3>
          <button style={dialogStyles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={dialogStyles.body}>
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
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                />
                <div style={dialogStyles.uploadIcon}>
                  <UploadIcon />
                </div>
                <div style={dialogStyles.uploadText}>
                  {imagePreview ? "Change Image" : "Upload Image"}
                </div>
                <div style={dialogStyles.uploadHint}>
                  PNG, JPG, SVG up to 5MB
                </div>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" style={dialogStyles.imagePreview} />
                )}
              </div>
            </div>

            {/* Title Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>
                Title <span style={dialogStyles.required}>*</span>
              </label>
              <input
                type="text"
                name="title"
                style={dialogStyles.input}
                placeholder="Enter certificate title"
                value={formData.title}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            {/* Description Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Description</label>
              <textarea
                name="description"
                style={dialogStyles.textarea}
                placeholder="Enter certificate description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Link URL Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Link URL</label>
              <input
                type="url"
                name="link"
                style={dialogStyles.input}
                placeholder="https://example.com/certificate"
                value={formData.link}
                onChange={handleChange}
              />
            </div>

            {/* Status Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Status</label>
              <select
                name="status"
                style={dialogStyles.select}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
          </div>
          <div style={dialogStyles.footer}>
            <button type="button" style={dialogStyles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={dialogStyles.saveBtn}>
              {editingCert ? "Update" : "Save"}
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
    width: "40px", height: "40px", borderRadius: "8px",
    background: isDark ? "#1e2740" : "#f1f5f9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px",
    border: isDark ? "1px solid #2a3145" : "1px solid #e2e8f0",
    overflow: "hidden",
  }}>
    {imageUrl ? (
      <img src={imageUrl} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      "📜"
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const FooterCertificates = ({ isDark = true }) => {
  const [certificates, setCertificates] = useState(demoCertificates);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const itemsPerPage = 10;

  // Filter certificates
  const filteredCertificates = certificates.filter(cert =>
    cert.title.toLowerCase().includes(search.toLowerCase()) ||
    (cert.description && cert.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const paginatedCertificates = filteredCertificates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle status
  const toggleStatus = (id) => {
    setCertificates(prev => prev.map(cert =>
      cert.id === id ? { ...cert, status: cert.status === "Active" ? "Hidden" : "Active" } : cert
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      setCertificates(prev => prev.filter(cert => cert.id !== id));
    }
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setIsDialogOpen(true);
  };

  const handleView = (cert) => {
    alert(`Title: ${cert.title}\nDescription: ${cert.description || "—"}\nLink: ${cert.link || "—"}`);
  };

  const handleAdd = () => {
    setEditingCert(null);
    setIsDialogOpen(true);
  };

  const handleSaveCert = (certData) => {
    if (editingCert) {
      // Update existing certificate
      setCertificates(prev => prev.map(cert =>
        cert.id === editingCert.id
          ? {
              ...cert,
              title: certData.title,
              description: certData.description,
              link: certData.link,
              status: certData.status,
              imageUrl: certData.imageUrl || cert.imageUrl,
            }
          : cert
      ));
    } else {
      // Add new certificate
      const newId = Math.max(...certificates.map(c => c.id), 0) + 1;
      const newSn = Math.max(...certificates.map(c => c.sn), 0) + 1;
      const newCert = {
        id: newId,
        sn: newSn,
        title: certData.title,
        description: certData.description,
        link: certData.link,
        status: certData.status,
        imageUrl: certData.imageUrl,
      };
      setCertificates(prev => [newCert, ...prev]);
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
      minWidth: "850px",
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
            placeholder="Search footer certificate..."
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

      {/* Certificates Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>SN</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Link URL</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCertificates.map((cert) => (
              <tr key={cert.id}>
                <td style={styles.td}>{cert.sn}</td>
                <td style={styles.td}>
                  <ImagePlaceholder isDark={isDark} imageUrl={cert.imageUrl} title={cert.title} />
                </td>
                <td style={{...styles.td, ...styles.titleCell}}>{cert.title}</td>
                <td style={{...styles.td, ...styles.descriptionCell}} title={cert.description}>
                  {cert.description || "—"}
                </td>
                <td style={styles.td}>
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "none", fontSize: "12px" }}>
                      {cert.link.length > 30 ? cert.link.substring(0, 27) + "..." : cert.link}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td style={styles.td}><StatusBadge status={cert.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionBtn} onClick={() => handleView(cert)} title="View">
                      <EyeIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleEdit(cert)} title="Edit">
                      <EditIcon />
                    </button>
                    <button style={styles.actionBtn} onClick={() => toggleStatus(cert.id)} title={cert.status === "Active" ? "Hide" : "Show"}>
                      {cert.status === "Active" ? <HideIcon /> : <ShowIcon />}
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleDelete(cert.id)} title="Delete">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedCertificates.length === 0 && (
              <tr key="empty">
                <td colSpan={7} style={styles.emptyState}>
                  No certificates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Rows and Pagination */}
      <div style={styles.footer}>
        <div style={styles.pageInfo}>
          Rows: 20 | {filteredCertificates.length} of {filteredCertificates.length} — Page {currentPage}/{totalPages || 1}
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

      {/* Add/Edit Certificate Dialog */}
      {isDialogOpen && (
        <AddCertificateDialog
          isDark={isDark}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingCert(null);
          }}
          onSave={handleSaveCert}
          editingCert={editingCert}
        />
      )}
    </div>
  );
};

export default FooterCertificates;