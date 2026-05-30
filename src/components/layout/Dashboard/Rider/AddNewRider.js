import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// THEME STYLES
// ─────────────────────────────────────────────────────────────────────────────
const getThemeStyles = (isDark) => ({
  dark: {
    background: "#0a0c10",
    surface: "#11131a",
    surfaceLighter: "#1a1d2e",
    surfaceLightest: "#22253a",
    border: "#1f2335",
    borderLight: "#2a2f45",
    text: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textMuted: "#94a3b8",
    textDim: "#64748b",
    placeholder: "#4a4f6e",
    primary: "#6366f1",
    primaryDark: "#4f46e5",
    primaryLight: "#a5b4fc",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    glass: "rgba(30, 34, 58, 0.8)",
    cardBg: "#141824",
    inputBg: "#0f1520",
  },
  light: {
    background: "#f3f4f6",
    surface: "#ffffff",
    surfaceLighter: "#f8fafc",
    surfaceLightest: "#f3f4f6",
    border: "#e2e8f0",
    borderLight: "#cbd5e1",
    text: "#0f172a",
    textSecondary: "#334155",
    textMuted: "#64748b",
    textDim: "#94a3b8",
    placeholder: "#9ca3af",
    primary: "#6366f1",
    primaryDark: "#4f46e5",
    primaryLight: "#818cf8",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    glass: "rgba(255, 255, 255, 0.9)",
    cardBg: "#ffffff",
    inputBg: "#ffffff",
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3v12m0 0-3-3m3 3 3-3M5 21h14" />
    <rect x="3" y="15" width="18" height="5" rx="1" />
  </svg>
);

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT - Add New Driver
// ─────────────────────────────────────────────────────────────────────────────
const AddNewDriver = ({ isDark = true, onBack }) => {
  const t = getThemeStyles(isDark);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("contact");
  
  // Form data state
  const [formData, setFormData] = useState({
    contactNumber: "", primaryNumber: "", secondaryNumber: "", whatsapp: "",
    email: "", password: "", city: "", state: "", pinCode: "",
    currentAddress: "", permanentAddress: "", startingPoint: "",
    firstName: "", lastName: "", displayName: "", fathersName: "",
    dateOfBirth: "", gender: "", bloodGroup: "", language: "",
    aadharNumber: "", dlNumber: "", vehicleRegNo: "", highestEducation: "", panNumber: "",
    bankName: "", branch: "", accountHolder: "", accountNumber: "", ifsc: "", bankMobile: "", upi: "",
    status: "", paid: "", dutyStatus: "", wallet: "", cashLimit: "", cashLimitCheque: "",
    tShirtSize: "", tShirtGiven: "", referralCode: "", referredBy: "", isReady: "",
    cashInHand: "", chequeStatus: "", bagGiven: "",
    personalVerified: "", personalRemarks: "", documentsVerified: "", documentsRemarks: "",
    vehicleVerified: "", vehicleRemarks: "", bankVerified: "", bankRemarks: "",
    emergencyVerified: "", emergencyRemarks: "", familyNumber1: "", familyNumber2: "",
    remarks: "", joinDate: "", createdBy: "", createdAt: "",
  });

  const [documents, setDocuments] = useState({
    profilePicture: null, aadharFront: null, aadharBack: null, panCard: null,
    dlFront: null, dlBack: null, rcFront: null, rcBack: null, resume: null,
    passbook: null, cancelCheque: null,
  });

  const [filledSections, setFilledSections] = useState({
    contact: false, personalInfo: false, documents: false, bankDetails: false,
    workDuty: false, verification: false, familyEmergency: false, meta: false,
  });

  const sections = [
    { id: "contact", label: "Contact", icon: "📞" },
    { id: "personalInfo", label: "Personal Info", icon: "👤" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "bankDetails", label: "Bank Details", icon: "🏦" },
    { id: "workDuty", label: "Work & Duty", icon: "⚙️" },
    { id: "verification", label: "Verification", icon: "✅" },
    { id: "familyEmergency", label: "Family/Emergency", icon: "👨‍👩‍👧" },
    { id: "meta", label: "Meta", icon: "ℹ️" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    checkSectionFilled(activeSection, { ...formData, [name]: value });
  };

  const handleFileUpload = (docName, file) => {
    setDocuments({ ...documents, [docName]: file });
  };

  const checkSectionFilled = (section, data) => {
    let isFilled = false;
    switch (section) {
      case "contact": isFilled = !!data.contactNumber || !!data.email || !!data.city; break;
      case "personalInfo": isFilled = !!data.firstName || !!data.lastName; break;
      case "documents": isFilled = !!data.aadharNumber || !!data.dlNumber; break;
      case "bankDetails": isFilled = !!data.bankName || !!data.accountNumber; break;
      case "workDuty": isFilled = !!data.status || !!data.dutyStatus; break;
      case "verification": isFilled = !!data.personalVerified || !!data.documentsVerified; break;
      case "familyEmergency": isFilled = !!data.familyNumber1; break;
      case "meta": isFilled = !!data.remarks; break;
      default: isFilled = false;
    }
    setFilledSections(prev => ({ ...prev, [section]: isFilled }));
  };

  const completedCount = Object.values(filledSections).filter(v => v === true).length;
  const progressPercentage = (completedCount / sections.length) * 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Data:", formData);
    console.log("Documents:", documents);
    alert("Driver created successfully!");
    if (onBack) onBack();
  };

  const handleCancel = () => {
    if (onBack) onBack();
    else alert("Form cancelled");
  };

  const FileUploadField = ({ label, docKey }) => (
    <label style={styles.uploadBox}>
      <input type="file" style={{ display: "none" }} onChange={(e) => handleFileUpload(docKey, e.target.files[0])} />
      <div style={styles.uploadLabel}>
        <UploadIcon />
        <span style={{ color: t.textSecondary }}>{documents[docKey] ? documents[docKey].name : label}</span>
      </div>
    </label>
  );

  const styles = {
    container: {
      background: isDark ? "#0d1117" : "#f8fafc",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "16px 24px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0d1117" : "#f8fafc",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    backBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: isDark ? "#94a3b8" : "#64748b",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "14px",
      padding: "8px 12px",
      borderRadius: "8px",
    },
    headerTitle: {
      fontSize: "20px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
      flex: 1,
    },
    // Progress Bar Styles
    progressContainer: {
      padding: "12px 24px",
      background: isDark ? "#0d1117" : "#f8fafc",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    progressHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    progressLabel: {
      fontSize: "12px",
      fontWeight: 600,
      color: isDark ? "#64748b" : "#475569",
    },
    progressPercent: {
      fontSize: "12px",
      fontWeight: 700,
      color: "#4a6cf7",
    },
    progressBarBg: {
      background: isDark ? "#1e2740" : "#e2e8f0",
      borderRadius: "10px",
      height: "6px",
      overflow: "hidden",
    },
    progressBarFill: {
      background: "linear-gradient(90deg, #4a6cf7, #8b5cf6)",
      width: `${progressPercentage}%`,
      height: "100%",
      borderRadius: "10px",
      transition: "width 0.3s ease",
    },
    // Section Buttons
    sectionButtons: {
      display: "flex",
      gap: "8px",
      padding: "16px 24px",
      overflowX: "auto",
      background: isDark ? "#0d1117" : "#f8fafc",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      scrollbarWidth: "thin",
    },
    sectionBtn: (isActive, isCompleted) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 16px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s",
      background: isActive 
        ? "#4a6cf7" 
        : isDark 
          ? "#141824" 
          : "#ffffff",
      border: isActive 
        ? "1px solid #4a6cf7" 
        : isDark 
          ? "1px solid #1e2740" 
          : "1px solid #e2e8f0",
      color: isActive 
        ? "#ffffff" 
        : isDark 
          ? "#94a3b8" 
          : "#64748b",
      whiteSpace: "nowrap",
    }),
    completedDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#10b981",
    },
    // Form Container
    formContainer: {
      flex: 1,
      overflowY: "auto",
      padding: "24px",
    },
    formCard: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: "24px",
    },
    formTitle: {
      fontSize: "18px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      marginBottom: "20px",
      paddingBottom: "12px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
    },
    formGrid3: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    label: {
      fontSize: "12px",
      fontWeight: 600,
      color: isDark ? "#64748b" : "#475569",
      letterSpacing: "0.3px",
    },
    input: {
      padding: "10px 14px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "13px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      outline: "none",
      transition: "all 0.2s",
    },
    select: {
      padding: "10px 14px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "13px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      outline: "none",
      cursor: "pointer",
    },
    textarea: {
      padding: "10px 14px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "13px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      outline: "none",
      fontFamily: "inherit",
      resize: "vertical",
      minHeight: "80px",
    },
    documentGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "16px",
    },
    uploadBox: {
      border: isDark ? "1px dashed #1e2740" : "1px dashed #cbd5e1",
      borderRadius: "12px",
      padding: "16px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      background: isDark ? "#0f1520" : "#f8fafc",
    },
    uploadLabel: {
      fontSize: "12px",
      color: isDark ? "#64748b" : "#94a3b8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
    fixedButtons: {
      position: "sticky",
      bottom: 0,
      padding: "16px 24px",
      background: isDark ? "#0d1117" : "#f8fafc",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      zIndex: 10,
    },
    cancelBtn: {
      padding: "10px 24px",
      background: "transparent",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 600,
      color: isDark ? "#94a3b8" : "#64748b",
      cursor: "pointer",
    },
    createBtn: {
      padding: "10px 24px",
      background: "#4a6cf7",
      border: "none",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 600,
      color: "#fff",
      cursor: "pointer",
    },
    infoRow: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "12px 0",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    infoLabel: {
      fontSize: "12px",
      fontWeight: 600,
      color: isDark ? "#64748b" : "#475569",
      width: "120px",
    },
    infoValue: {
      fontSize: "13px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      flex: 1,
    },
    navButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "24px",
      paddingTop: "20px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    navBtn: {
      padding: "8px 20px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc",
      color: isDark ? "#94a3b8" : "#64748b",
    },
    navBtnPrimary: {
      padding: "8px 20px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
      background: "#4a6cf7",
      border: "none",
      color: "#fff",
    },
  };

  const renderForm = () => {
    switch (activeSection) {
      case "contact":
        return (
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}><label style={styles.label}>📞 Contact Number *</label><input style={styles.input} name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+91 98765 43210" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>📱 Primary Number</label><input style={styles.input} name="primaryNumber" value={formData.primaryNumber} onChange={handleChange} placeholder="Primary contact" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>📱 Secondary Number</label><input style={styles.input} name="secondaryNumber" value={formData.secondaryNumber} onChange={handleChange} placeholder="Secondary contact" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>💬 WhatsApp</label><input style={styles.input} name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp number" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>✉️ Email *</label><input style={styles.input} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="driver@example.com" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>🔒 Password</label><input style={styles.input} name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>🏙️ City</label><input style={styles.input} name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>🗺️ State</label><input style={styles.input} name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>📍 PIN Code</label><input style={styles.input} name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="6-digit PIN" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>🏠 Current Address</label><textarea style={styles.textarea} name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Current address" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>🏠 Permanent Address</label><textarea style={styles.textarea} name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Permanent address" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>🚩 Starting Point</label><input style={styles.input} name="startingPoint" value={formData.startingPoint} onChange={handleChange} placeholder="Starting location" /></div>
          </div>
        );

      case "personalInfo":
        return (
          <>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}><label style={styles.label}>👤 First Name *</label><input style={styles.input} name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>👤 Last Name *</label><input style={styles.input} name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>✨ Display Name</label><input style={styles.input} name="displayName" value={formData.displayName} onChange={handleChange} placeholder="Display name" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>👨 Father's Name</label><input style={styles.input} name="fathersName" value={formData.fathersName} onChange={handleChange} placeholder="Father's name" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>🎂 Date of Birth</label><input style={styles.input} name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} /></div>
              <div style={styles.inputGroup}><label style={styles.label}>⚥ Gender</label><select style={styles.select} name="gender" value={formData.gender} onChange={handleChange}><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
              <div style={styles.inputGroup}><label style={styles.label}>🩸 Blood Group</label><select style={styles.select} name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}><option value="">Select</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option></select></div>
              <div style={styles.inputGroup}><label style={styles.label}>🌐 Language</label><input style={styles.input} name="language" value={formData.language} onChange={handleChange} placeholder="Preferred language" /></div>
            </div>
            <div style={styles.sectionSubtitle}>📸 Profile Picture</div>
            <FileUploadField label="Click to upload profile picture" docKey="profilePicture" />
          </>
        );

      case "documents":
        return (
          <>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}><label style={styles.label}>🆔 Aadhar Number</label><input style={styles.input} name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} placeholder="12-digit Aadhar" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>🚗 DL Number</label><input style={styles.input} name="dlNumber" value={formData.dlNumber} onChange={handleChange} placeholder="Driving license number" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>🏍️ Vehicle Registration No.</label><input style={styles.input} name="vehicleRegNo" value={formData.vehicleRegNo} onChange={handleChange} placeholder="Vehicle number" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>🎓 Highest Education</label><input style={styles.input} name="highestEducation" value={formData.highestEducation} onChange={handleChange} placeholder="e.g., Graduate" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>📇 PAN Number</label><input style={styles.input} name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="PAN card number" /></div>
            </div>
            <div style={styles.sectionSubtitle}>📎 Document Uploads</div>
            <div style={styles.documentGrid}>
              <FileUploadField label="Aadhar Front" docKey="aadharFront" />
              <FileUploadField label="Aadhar Back" docKey="aadharBack" />
              <FileUploadField label="PAN Card" docKey="panCard" />
              <FileUploadField label="DL Front" docKey="dlFront" />
              <FileUploadField label="DL Back" docKey="dlBack" />
              <FileUploadField label="RC Front" docKey="rcFront" />
              <FileUploadField label="RC Back" docKey="rcBack" />
              <FileUploadField label="Resume" docKey="resume" />
            </div>
          </>
        );

      case "bankDetails":
        return (
          <>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}><label style={styles.label}>🏦 Bank Name</label><input style={styles.input} name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank name" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>📍 Branch</label><input style={styles.input} name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch name" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>👤 Account Holder</label><input style={styles.input} name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Account holder name" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>🔢 Account Number</label><input style={styles.input} name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account number" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>🏛️ IFSC</label><input style={styles.input} name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="IFSC code" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>📱 Bank Mobile</label><input style={styles.input} name="bankMobile" value={formData.bankMobile} onChange={handleChange} placeholder="Registered mobile" /></div>
              <div style={styles.inputGroup}><label style={styles.label}>💳 UPI</label><input style={styles.input} name="upi" value={formData.upi} onChange={handleChange} placeholder="UPI ID" /></div>
            </div>
            <div style={styles.sectionSubtitle}>📎 Bank Documents</div>
            <div style={styles.documentGrid}>
              <FileUploadField label="Passbook" docKey="passbook" />
              <FileUploadField label="Cancel Cheque" docKey="cancelCheque" />
            </div>
          </>
        );

      case "workDuty":
        return (
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}><label style={styles.label}>📊 Status</label><select style={styles.select} name="status" value={formData.status} onChange={handleChange}><option value="">Select...</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="On Leave">On Leave</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>💰 Paid</label><select style={styles.select} name="paid" value={formData.paid} onChange={handleChange}><option value="">Select...</option><option value="Paid">Paid</option><option value="Unpaid">Unpaid</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>⏰ Duty Status</label><select style={styles.select} name="dutyStatus" value={formData.dutyStatus} onChange={handleChange}><option value="">Select...</option><option value="On Duty">On Duty</option><option value="Off Duty">Off Duty</option><option value="Break">Break</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>👛 Wallet</label><input style={styles.input} name="wallet" value={formData.wallet} onChange={handleChange} placeholder="Wallet balance" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>💵 Cash Limit</label><input style={styles.input} name="cashLimit" value={formData.cashLimit} onChange={handleChange} placeholder="Cash limit" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>💵 Cash Limit Cheque</label><input style={styles.input} name="cashLimitCheque" value={formData.cashLimitCheque} onChange={handleChange} placeholder="Cheque limit" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>👕 T-Shirt Size</label><select style={styles.select} name="tShirtSize" value={formData.tShirtSize} onChange={handleChange}><option value="">Select...</option><option value="XS">XS</option><option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option><option value="XXL">XXL</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>👕 T-Shirt Given</label><select style={styles.select} name="tShirtGiven" value={formData.tShirtGiven} onChange={handleChange}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>🔗 Referral Code</label><input style={styles.input} name="referralCode" value={formData.referralCode} onChange={handleChange} placeholder="Referral code" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>👥 Referred By</label><input style={styles.input} name="referredBy" value={formData.referredBy} onChange={handleChange} placeholder="Referrer name" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>✅ Is Ready</label><select style={styles.select} name="isReady" value={formData.isReady} onChange={handleChange}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>💵 Cash in Hand</label><input style={styles.input} name="cashInHand" value={formData.cashInHand} onChange={handleChange} placeholder="Cash amount" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>📝 Cheque Status</label><select style={styles.select} name="chequeStatus" value={formData.chequeStatus} onChange={handleChange}><option value="">Select...</option><option value="Pending">Pending</option><option value="Cleared">Cleared</option><option value="Bounced">Bounced</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>🎒 Bag Given</label><select style={styles.select} name="bagGiven" value={formData.bagGiven} onChange={handleChange}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
          </div>
        );

      case "verification":
        return (
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}><label style={styles.label}>✅ Personal Verified</label><select style={styles.select} name="personalVerified" value={formData.personalVerified} onChange={handleChange}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option><option value="Pending">Pending</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>📝 Remarks (Personal)</label><input style={styles.input} name="personalRemarks" value={formData.personalRemarks} onChange={handleChange} placeholder="Remarks" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>✅ Documents Verified</label><select style={styles.select} name="documentsVerified" value={formData.documentsVerified} onChange={handleChange}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option><option value="Pending">Pending</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>📝 Remarks (Documents)</label><input style={styles.input} name="documentsRemarks" value={formData.documentsRemarks} onChange={handleChange} placeholder="Remarks" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>✅ Vehicle Verified</label><select style={styles.select} name="vehicleVerified" value={formData.vehicleVerified} onChange={handleChange}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option><option value="Pending">Pending</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>📝 Remarks (Vehicle)</label><input style={styles.input} name="vehicleRemarks" value={formData.vehicleRemarks} onChange={handleChange} placeholder="Remarks" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>✅ Bank Verified</label><select style={styles.select} name="bankVerified" value={formData.bankVerified} onChange={handleChange}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option><option value="Pending">Pending</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>📝 Remarks (Bank)</label><input style={styles.input} name="bankRemarks" value={formData.bankRemarks} onChange={handleChange} placeholder="Remarks" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>✅ Emergency Verified</label><select style={styles.select} name="emergencyVerified" value={formData.emergencyVerified} onChange={handleChange}><option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option><option value="Pending">Pending</option></select></div>
            <div style={styles.inputGroup}><label style={styles.label}>📝 Remarks (Emergency)</label><input style={styles.input} name="emergencyRemarks" value={formData.emergencyRemarks} onChange={handleChange} placeholder="Remarks" /></div>
          </div>
        );

      case "familyEmergency":
        return (
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}><label style={styles.label}>👨‍👩‍👧 Family Number 1</label><input style={styles.input} name="familyNumber1" value={formData.familyNumber1} onChange={handleChange} placeholder="Emergency contact 1" /></div>
            <div style={styles.inputGroup}><label style={styles.label}>👨‍👩‍👧 Family Number 2</label><input style={styles.input} name="familyNumber2" value={formData.familyNumber2} onChange={handleChange} placeholder="Emergency contact 2" /></div>
          </div>
        );

      case "meta":
        return (
          <>
            <div style={styles.inputGroup}><label style={styles.label}>📝 Remarks</label><textarea style={styles.textarea} name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Additional remarks" /></div>
            <div style={{ marginTop: "20px" }}>
              <div style={styles.infoRow}><div style={styles.infoLabel}>📅 Join Date</div><div style={styles.infoValue}><input style={styles.input} name="joinDate" type="date" value={formData.joinDate} onChange={handleChange} /></div></div>
              <div style={styles.infoRow}><div style={styles.infoLabel}>👤 Created By</div><div style={styles.infoValue}><input style={styles.input} name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Admin name" /></div></div>
              <div style={styles.infoRow}><div style={styles.infoLabel}>🕐 Created At</div><div style={styles.infoValue}><input style={styles.input} name="createdAt" type="datetime-local" value={formData.createdAt} onChange={handleChange} /></div></div>
            </div>
          </>
        );

      default: return null;
    }
  };

  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const isLastSection = currentIndex === sections.length - 1;
  const isFirstSection = currentIndex === 0;

  const goToNext = () => { if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1].id); };
  const goToPrev = () => { if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id); };

  return (
    <div style={styles.container}>
      <style>{`
        input::placeholder, textarea::placeholder, select:invalid { color: ${t.placeholder}; opacity: 0.7; }
        input:focus, textarea:focus, select:focus { border-color: ${t.primary}; box-shadow: 0 0 0 3px ${t.primary}20; outline: none; }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); }
        [style*="uploadBox"]:hover { border-color: ${t.primary} !important; background: ${t.primary}10 !important; }
        select option { background: ${t.inputBg}; color: ${t.text}; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={handleCancel}><BackIcon /> Back</button>
        <h2 style={styles.headerTitle}>Add New Driver</h2>
        <div style={{ width: "80px" }} />
      </div>

      {/* Progress Meter */}
      <div style={styles.progressContainer}>
        <div style={styles.progressHeader}>
          <span style={styles.progressLabel}>Form Completion</span>
          <span style={styles.progressPercent}>{Math.round(progressPercentage)}%</span>
        </div>
        <div style={styles.progressBarBg}><div style={styles.progressBarFill} /></div>
      </div>

      {/* Section Buttons */}
      <div style={styles.sectionButtons}>
        {sections.map((section) => (
          <button key={section.id} style={styles.sectionBtn(activeSection === section.id)} onClick={() => setActiveSection(section.id)}>
            <span>{section.icon}</span>
            <span>{section.label}</span>
            {filledSections[section.id] && <CheckCircleIcon />}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div style={styles.formContainer}>
        <div style={styles.formCard}>
          <div style={styles.formTitle}>{sections.find(s => s.id === activeSection)?.label}</div>
          <form onSubmit={handleSubmit}>
            {renderForm()}
            <div style={styles.navButtons}>
              <button type="button" style={styles.navBtn} onClick={goToPrev} disabled={isFirstSection}><ChevronLeftIcon /> Previous</button>
              {!isLastSection ? (
                <button type="button" style={styles.navBtnPrimary} onClick={goToNext}>Next <ChevronRightIcon /></button>
              ) : (
                <button type="submit" style={styles.navBtnPrimary} onClick={handleSubmit}>✨ Create Driver</button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Fixed Buttons */}
      <div style={styles.fixedButtons}>
        <button style={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
        <button style={styles.createBtn} onClick={handleSubmit}>Create Driver</button>
      </div>
    </div>
  );
};

export default AddNewDriver;