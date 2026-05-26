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

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const PriorityHighIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoFeedbacks = [
  { id: 40, title: "Add some new feature in admin", type: "Feature", priority: "Urgent", platform: "Admin Panel", points: 7, author: "Yash suri", date: "07 Apr 2026", time: "07:58 am", status: "Pending", description: "Need to add new feature in admin panel for better management", imageUrl: null },
  { id: 39, title: "Restaurant or user Ke beach distance", type: "Bug", priority: "Urgent", platform: "User App", points: 1, author: "Yash suri", date: "06 Apr 2026", time: "01:32 am", status: "In Progress", description: "Distance calculation issue between restaurant and user", imageUrl: null },
  { id: 37, title: "admin password change option", type: "Bug", priority: "Urgent", platform: "Admin Panel", points: 1, author: "Yash suri", date: "03 Apr 2026", time: "09:56 pm", status: "Pending", description: "Admin should be able to change password", imageUrl: null },
  { id: 36, title: "check the image most urgent work", type: "Bug", priority: "Urgent", platform: "Admin Panel", points: 1, author: "Yash suri", date: "03 Apr 2026", time: "09:52 pm", status: "Pending", description: "Image upload issue need to fix urgently", imageUrl: null },
  { id: 35, title: "admin password change option for all user", type: "Feature", priority: "Normal", platform: "Admin Panel", points: 3, author: "Rohit", date: "02 Apr 2026", time: "10:30 am", status: "Completed", description: "Add password change functionality for all users", imageUrl: null },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADD FEEDBACK DIALOG COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddFeedbackDialog = ({ isDark, onClose, onSave, editingFeedback }) => {
  const [formData, setFormData] = useState({
    title: editingFeedback?.title || "",
    platform: editingFeedback?.platform || "User App",
    category: editingFeedback?.type || "Bug",
    points: editingFeedback?.points || 1,
    description: editingFeedback?.description || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingFeedback?.imageUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const [pointsList, setPointsList] = useState([
    editingFeedback?.description?.split('\n')[0] || "Describe the issue or change needed..."
  ]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePointsChange = (index, value) => {
    const newPoints = [...pointsList];
    newPoints[index] = value;
    setPointsList(newPoints);
    setFormData(prev => ({
      ...prev,
      description: newPoints.join('\n'),
    }));
  };

  const addPoint = () => {
    setPointsList([...pointsList, ""]);
  };

  const removePoint = (index) => {
    const newPoints = pointsList.filter((_, i) => i !== index);
    setPointsList(newPoints);
    setFormData(prev => ({
      ...prev,
      description: newPoints.join('\n'),
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
    
    onSave({
      title: formData.title,
      platform: formData.platform,
      type: formData.category,
      points: formData.points,
      description: pointsList.filter(p => p.trim()).join('\n'),
      imageFile,
      imageUrl: imagePreview,
      status: "Pending",
      author: "Current User",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
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
      maxWidth: "580px",
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
    rowTwoColumns: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    pointsItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "10px",
    },
    pointsNumber: {
      width: "28px",
      height: "28px",
      borderRadius: "6px",
      background: isDark ? "#1e2740" : "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: 600,
      color: isDark ? "#94a3b8" : "#64748b",
      flexShrink: 0,
    },
    pointsInput: {
      flex: 1,
      padding: "8px 12px",
      background: isDark ? "#0d1117" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "13px",
      color: isDark ? "#f1f5f9" : "#1e293b",
      outline: "none",
    },
    removePointBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "4px",
      color: "#ef4444",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    addPointBtn: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      background: "transparent",
      border: isDark ? "1px solid #3b82f6" : "1px solid #3b82f6",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: 500,
      color: "#3b82f6",
      cursor: "pointer",
      marginTop: "8px",
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
          <h3 style={dialogStyles.title}>{editingFeedback ? "Edit Feedback" : "New Feedback"}</h3>
          <button style={dialogStyles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={dialogStyles.body}>
            {/* Topic / Title Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>
                Topic / Title <span style={dialogStyles.required}>*</span>
              </label>
              <input
                type="text"
                name="title"
                style={dialogStyles.input}
                placeholder="e.g. Fix login page layout issues"
                value={formData.title}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            {/* Platform and Category in two columns */}
            <div style={dialogStyles.rowTwoColumns}>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>Platform *</label>
                <select
                  name="platform"
                  style={dialogStyles.select}
                  value={formData.platform}
                  onChange={handleChange}
                  required
                >
                  <option value="User App">User App</option>
                  <option value="Vendor App">Vendor App</option>
                  <option value="Rider App">Rider App</option>
                  <option value="Website">Website</option>
                  <option value="Admin Panel">Admin Panel</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={dialogStyles.formGroup}>
                <label style={dialogStyles.label}>Category *</label>
                <select
                  name="category"
                  style={dialogStyles.select}
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                  <option value="Change">Change</option>
                  <option value="UI Fix">UI Fix</option>
                </select>
              </div>
            </div>

            {/* Points Field */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Points</label>
              <input
                type="number"
                name="points"
                style={{ ...dialogStyles.input, width: "100px" }}
                placeholder="Points"
                value={formData.points}
                onChange={handleChange}
                min="1"
              />
            </div>

            {/* Points List / Description */}
            <div style={dialogStyles.formGroup}>
              <label style={dialogStyles.label}>Description / Points</label>
              {pointsList.map((point, index) => (
                <div key={index} style={dialogStyles.pointsItem}>
                  <div style={dialogStyles.pointsNumber}>{index + 1}</div>
                  <input
                    type="text"
                    style={dialogStyles.pointsInput}
                    placeholder="Describe the issue or change needed..."
                    value={point}
                    onChange={(e) => handlePointsChange(index, e.target.value)}
                  />
                  {pointsList.length > 1 && (
                    <button type="button" style={dialogStyles.removePointBtn} onClick={() => removePoint(index)}>
                      <TrashIcon />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" style={dialogStyles.addPointBtn} onClick={addPoint}>
                <PlusIcon /> Add Point
              </button>
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
          </div>
          <div style={dialogStyles.footer}>
            <button type="button" style={dialogStyles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={dialogStyles.saveBtn}>
              {editingFeedback ? "Update" : "Submit"}
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
    Pending: { bg: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)", color: "#f59e0b" },
    "In Progress": { bg: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)", color: "#3b82f6" },
    Completed: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
  };
  const c = config[status] || config.Pending;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "20px",
      fontSize: "10px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const TypeBadge = ({ type, isDark }) => {
  const config = {
    Feature: { bg: isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.1)", color: "#8b5cf6" },
    Bug: { bg: isDark ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.1)", color: "#ef4444" },
    Change: { bg: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)", color: "#3b82f6" },
    "UI Fix": { bg: isDark ? "rgba(16,185,129,0.15)" : "rgba(16,185,129,0.1)", color: "#10b981" },
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
      display: "flex", alignItems: "center", gap: "3px",
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
        flexWrap: "wrap",
      }}>
        <span>by {feedback.author}</span>
        <span>•</span>
        <span>{feedback.date}, {feedback.time}</span>
        {feedback.status !== "Completed" && (
          <>
            <span>•</span>
            <StatusBadge status={feedback.status} isDark={isDark} />
          </>
        )}
      </div>
      
      {expanded && (
        <div style={{
          marginTop: "12px",
          paddingTop: "12px",
          borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          fontSize: "12px",
          color: isDark ? "#94a3b8" : "#64748b",
        }}>
          <div><strong>Description:</strong></div>
          <div style={{ whiteSpace: "pre-wrap", marginTop: "8px" }}>{feedback.description}</div>
          {feedback.imageUrl && (
            <div style={{ marginTop: "12px" }}>
              <img src={feedback.imageUrl} alt="Feedback" style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px" }} />
            </div>
          )}
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);

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

  const handleAddFeedback = () => {
    setEditingFeedback(null);
    setIsDialogOpen(true);
  };

  const handleSaveFeedback = (feedbackData) => {
    if (editingFeedback) {
      // Update existing feedback
      setFeedbacks(prev => prev.map(f =>
        f.id === editingFeedback.id
          ? {
              ...f,
              title: feedbackData.title,
              platform: feedbackData.platform,
              type: feedbackData.type,
              points: feedbackData.points,
              description: feedbackData.description,
              imageUrl: feedbackData.imageUrl || f.imageUrl,
            }
          : f
      ));
    } else {
      // Add new feedback
      const newId = Math.max(...feedbacks.map(f => f.id), 0) + 1;
      const newFeedback = {
        id: newId,
        ...feedbackData,
        priority: feedbackData.type === "Bug" ? "Urgent" : "Normal",
      };
      setFeedbacks(prev => [newFeedback, ...prev]);
    }
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
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "16px",
    },
    title: {
      fontSize: "20px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
    },
    addBtn: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 18px",
      background: "#4a6cf7",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
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
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      
      {/* Header with Title and Add Button */}
      <div style={styles.header}>
        <h2 style={styles.title}>Dev Feedback</h2>
        <button style={styles.addBtn} onClick={handleAddFeedback}>
          <PlusIcon /> New Feedback
        </button>
      </div>

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

      {/* Add/Edit Feedback Dialog */}
      {isDialogOpen && (
        <AddFeedbackDialog
          isDark={isDark}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingFeedback(null);
          }}
          onSave={handleSaveFeedback}
          editingFeedback={editingFeedback}
        />
      )}
    </div>
  );
};

export default DevFeedback;