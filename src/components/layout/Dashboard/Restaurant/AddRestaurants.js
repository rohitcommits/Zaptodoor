import React, { useState } from "react";

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

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddNewRestaurant = ({ isDark = true, onBack }) => {
  // Current active section
  const [activeSection, setActiveSection] = useState("personalInfo");
  
  // Form data state
  const [formData, setFormData] = useState({
    // Personal Info
    contactPersonName: "",
    restaurantName: "",
    orgType: "",
    prefix: "",
    gender: "",
    contact: "",
    email: "",
    password: "",
    city: "",
    state: "",
    pinCode: "",
    address: "",
    
    // Owner Details
    ownerName: "",
    ownerMobile: "",
    otherPersonName: "",
    otherPersonMobile: "",
    
    // Bank Details
    bankName: "",
    branch: "",
    bankType: "",
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    bankMobile: "",
    upi: "",
    
    // Business Settings
    commission: "",
    specialCommission: "",
    minimumOrder: "",
    platformCharge: "",
    handlingCharge: "",
    gst: "",
    orderReceivingCharges: "",
    subscription: "",
    paidStatus: "",
    wallet: "",
    referralCode: "",
    referredBy: "",
    mou: "",
    
    // Status & Schedule
    status: "",
    scheduleMode: "",
    shiftEnd: "",
    openStatus: "",
    scheduleApproved: "",
    shiftStart: "",
    
    // Verification
    personalInfoVerified: "",
    personalInfoRemarks: "",
    documentsVerified: "",
    documentsRemarks: "",
    bankVerified: "",
    bankRemarks: "",
    
    // Menu
    menuUploaded: "",
    kot: "",
    menuDirection: "",
    menuDirectionType: "",
    menuDirectionValue: "",
    
    // Meta
    remarks: "",
    createdBy: "",
    createdAt: "",
    updatedAt: "",
  });

  const [documents, setDocuments] = useState({
    bannerImage: null,
    roundLogo: null,
    horizontalLogo: null,
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    gstNumber: null,
    gstImage: null,
    foodLicenseImage: null,
    foodLicenseNo: null,
    bankPassbook: null,
    cheque: null,
    menuPage1: null,
    menuPage2: null,
    menuPage3: null,
    menuPage4: null,
    menuPage5: null,
    menuPage6: null,
    menuPage7: null,
    menuPage8: null,
    menuPage9: null,
  });

  // Track filled sections for progress
  const [filledSections, setFilledSections] = useState({
    personalInfo: false,
    ownerDetails: false,
    bankDetails: false,
    businessSettings: false,
    statusSchedule: false,
    verification: false,
    menu: false,
    meta: false,
  });

  const sections = [
    { id: "personalInfo", label: "Personal Info", icon: "👤" },
    { id: "ownerDetails", label: "Owner Details", icon: "👥" },
    { id: "bankDetails", label: "Bank Details", icon: "🏦" },
    { id: "businessSettings", label: "Business Settings", icon: "⚙️" },
    { id: "statusSchedule", label: "Status & Schedule", icon: "📅" },
    { id: "verification", label: "Verification", icon: "✅" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "menu", label: "Menu", icon: "🍽️" },
    { id: "meta", label: "Meta", icon: "ℹ️" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Check if current section is filled
    checkSectionFilled(activeSection, { ...formData, [name]: value });
  };

  const handleFileUpload = (docName, file) => {
    setDocuments({ ...documents, [docName]: file });
  };

  const checkSectionFilled = (section, data) => {
    let isFilled = false;
    switch (section) {
      case "personalInfo":
        isFilled = !!data.contactPersonName || !!data.restaurantName || !!data.contact || !!data.email;
        break;
      case "ownerDetails":
        isFilled = !!data.ownerName || !!data.ownerMobile;
        break;
      case "bankDetails":
        isFilled = !!data.bankName || !!data.accountNumber || !!data.ifsc;
        break;
      case "businessSettings":
        isFilled = !!data.commission || !!data.minimumOrder;
        break;
      case "statusSchedule":
        isFilled = !!data.status;
        break;
      case "verification":
        isFilled = !!data.personalInfoVerified || !!data.documentsVerified || !!data.bankVerified;
        break;
      case "menu":
        isFilled = !!data.menuUploaded;
        break;
      case "meta":
        isFilled = !!data.remarks;
        break;
      default:
        isFilled = false;
    }
    setFilledSections(prev => ({ ...prev, [section]: isFilled }));
  };

  // Calculate progress percentage
  const completedCount = Object.values(filledSections).filter(v => v === true).length;
  const progressPercentage = (completedCount / sections.length) * 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Documents:", documents);
    alert("Restaurant created successfully!");
  };

  const handleCancel = () => {
    if (onBack) onBack();
    else alert("Form cancelled");
  };

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

  const FileUploadField = ({ label, docKey }) => (
    <label style={styles.uploadBox}>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(docKey, e.target.files[0])}
      />
      <div style={styles.uploadLabel}>
        <UploadIcon />
        <span>{documents[docKey] ? documents[docKey].name : label}</span>
      </div>
    </label>
  );

  // Render different section forms
  const renderForm = () => {
    switch (activeSection) {
      case "personalInfo":
        return (
          <>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Contact Person Name</label>
                <input style={styles.input} name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} placeholder="Enter contact person name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Restaurant Name</label>
                <input style={styles.input} name="restaurantName" value={formData.restaurantName} onChange={handleChange} placeholder="Enter restaurant name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Org Type</label>
                <select style={styles.select} name="orgType" value={formData.orgType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="LLP">LLP</option>
                  <option value="Pvt Ltd">Pvt Ltd</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Prefix</label>
                <select style={styles.select} name="prefix" value={formData.prefix} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Gender</label>
                <select style={styles.select} name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Contact</label>
                <input style={styles.input} name="contact" value={formData.contact} onChange={handleChange} placeholder="+91 98765 43210" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input style={styles.input} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="restaurant@example.com" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input style={styles.input} name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>City</label>
                <input style={styles.input} name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>State</label>
                <input style={styles.input} name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>PIN Code</label>
                <input style={styles.input} name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="6-digit PIN" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Address</label>
                <textarea style={styles.textarea} name="address" value={formData.address} onChange={handleChange} placeholder="Full address" />
              </div>
            </div>
          </>
        );

      case "ownerDetails":
        return (
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Owner Name</label>
              <input style={styles.input} name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Full name" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Owner Mobile</label>
              <input style={styles.input} name="ownerMobile" value={formData.ownerMobile} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Other Person Name</label>
              <input style={styles.input} name="otherPersonName" value={formData.otherPersonName} onChange={handleChange} placeholder="Optional" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Other Person Mobile</label>
              <input style={styles.input} name="otherPersonMobile" value={formData.otherPersonMobile} onChange={handleChange} placeholder="Optional" />
            </div>
          </div>
        );

      case "bankDetails":
        return (
          <>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Bank Name</label>
                <input style={styles.input} name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Branch</label>
                <input style={styles.input} name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Bank Type</label>
                <select style={styles.select} name="bankType" value={formData.bankType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Account Holder</label>
                <input style={styles.input} name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Account holder name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Account Number</label>
                <input style={styles.input} name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account number" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>IFSC</label>
                <input style={styles.input} name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="IFSC code" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Bank Mobile</label>
                <input style={styles.input} name="bankMobile" value={formData.bankMobile} onChange={handleChange} placeholder="Registered mobile" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>UPI</label>
                <input style={styles.input} name="upi" value={formData.upi} onChange={handleChange} placeholder="UPI ID" />
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <FileUploadField label="Bank Passbook / Cheque" docKey="bankPassbook" />
            </div>
          </>
        );

      case "businessSettings":
        return (
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Commission (%)</label>
              <input style={styles.input} name="commission" value={formData.commission} onChange={handleChange} placeholder="e.g., 10" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Special Commission (%)</label>
              <input style={styles.input} name="specialCommission" value={formData.specialCommission} onChange={handleChange} placeholder="e.g., 5" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Minimum Order</label>
              <input style={styles.input} name="minimumOrder" value={formData.minimumOrder} onChange={handleChange} placeholder="₹" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Platform Charge</label>
              <input style={styles.input} name="platformCharge" value={formData.platformCharge} onChange={handleChange} placeholder="₹" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Handling Charge (%)</label>
              <input style={styles.input} name="handlingCharge" value={formData.handlingCharge} onChange={handleChange} placeholder="%" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>GST (%)</label>
              <input style={styles.input} name="gst" value={formData.gst} onChange={handleChange} placeholder="%" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Order Receiving Charges (%)</label>
              <input style={styles.input} name="orderReceivingCharges" value={formData.orderReceivingCharges} onChange={handleChange} placeholder="%" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Subscription</label>
              <select style={styles.select} name="subscription" value={formData.subscription} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Paid Status</label>
              <select style={styles.select} name="paidStatus" value={formData.paidStatus} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Wallet</label>
              <input style={styles.input} name="wallet" value={formData.wallet} onChange={handleChange} placeholder="₹" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Referral Code</label>
              <input style={styles.input} name="referralCode" value={formData.referralCode} onChange={handleChange} placeholder="Referral code" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Referred By</label>
              <input style={styles.input} name="referredBy" value={formData.referredBy} onChange={handleChange} placeholder="Referrer" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>MOU</label>
              <select style={styles.select} name="mou" value={formData.mou} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Signed">Signed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        );

      case "statusSchedule":
        return (
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Status</label>
              <select style={styles.select} name="status" value={formData.status} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Schedule Mode</label>
              <select style={styles.select} name="scheduleMode" value={formData.scheduleMode} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Shift Start</label>
              <input style={styles.input} name="shiftStart" type="time" value={formData.shiftStart} onChange={handleChange} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Shift End</label>
              <input style={styles.input} name="shiftEnd" type="time" value={formData.shiftEnd} onChange={handleChange} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Open Status</label>
              <select style={styles.select} name="openStatus" value={formData.openStatus} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Schedule Approved</label>
              <select style={styles.select} name="scheduleApproved" value={formData.scheduleApproved} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        );

      case "verification":
        return (
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Personal Info Verified</label>
              <select style={styles.select} name="personalInfoVerified" value={formData.personalInfoVerified} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Remarks (Personal)</label>
              <input style={styles.input} name="personalInfoRemarks" value={formData.personalInfoRemarks} onChange={handleChange} placeholder="Remarks" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Documents Verified</label>
              <select style={styles.select} name="documentsVerified" value={formData.documentsVerified} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Remarks (Documents)</label>
              <input style={styles.input} name="documentsRemarks" value={formData.documentsRemarks} onChange={handleChange} placeholder="Remarks" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bank Verified</label>
              <select style={styles.select} name="bankVerified" value={formData.bankVerified} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Remarks (Bank)</label>
              <input style={styles.input} name="bankRemarks" value={formData.bankRemarks} onChange={handleChange} placeholder="Remarks" />
            </div>
          </div>
        );

      case "documents":
        return (
          <div>
            <div style={styles.documentGrid}>
              <FileUploadField label="Banner Image" docKey="bannerImage" />
              <FileUploadField label="Round Logo" docKey="roundLogo" />
              <FileUploadField label="Horizontal Logo" docKey="horizontalLogo" />
              <FileUploadField label="Aadhar Front" docKey="aadharFront" />
              <FileUploadField label="Aadhar Back" docKey="aadharBack" />
              <FileUploadField label="Pan Card" docKey="panCard" />
              <FileUploadField label="GST Number" docKey="gstNumber" />
              <FileUploadField label="GST Image" docKey="gstImage" />
              <FileUploadField label="Food License Image" docKey="foodLicenseImage" />
              <FileUploadField label="Food License No." docKey="foodLicenseNo" />
            </div>
          </div>
        );

      case "menu":
        return (
          <>
            <div style={styles.formGrid3}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Menu Uploaded</label>
                <select style={styles.select} name="menuUploaded" value={formData.menuUploaded} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>KOT</label>
                <select style={styles.select} name="kot" value={formData.kot} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
            </div>
            
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <h4 style={{ ...styles.label, marginBottom: "12px", fontSize: "13px" }}>Menu Pages</h4>
              <div style={styles.documentGrid}>
                <FileUploadField label="Menu Page 1" docKey="menuPage1" />
                <FileUploadField label="Menu Page 2" docKey="menuPage2" />
                <FileUploadField label="Menu Page 3" docKey="menuPage3" />
                <FileUploadField label="Menu Page 4" docKey="menuPage4" />
                <FileUploadField label="Menu Page 5" docKey="menuPage5" />
                <FileUploadField label="Menu Page 6" docKey="menuPage6" />
                <FileUploadField label="Menu Page 7" docKey="menuPage7" />
                <FileUploadField label="Menu Page 8" docKey="menuPage8" />
                <FileUploadField label="Menu Page 9" docKey="menuPage9" />
              </div>
            </div>
            
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Menu Direction</label>
                <select style={styles.select} name="menuDirection" value={formData.menuDirection} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="Vertical">Vertical</option>
                  <option value="Horizontal">Horizontal</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Menu Direction Type</label>
                <select style={styles.select} name="menuDirectionType" value={formData.menuDirectionType} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="Grid">Grid</option>
                  <option value="List">List</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Menu Direction Value</label>
                <input style={styles.input} name="menuDirectionValue" value={formData.menuDirectionValue} onChange={handleChange} placeholder="Value" />
              </div>
            </div>
          </>
        );

      case "meta":
        return (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Remarks</label>
              <textarea style={styles.textarea} name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Additional remarks" />
            </div>
            
            <div style={{ marginTop: "20px" }}>
              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>Created By</div>
                <div style={styles.infoValue}>
                  <input style={styles.input} name="createdBy" placeholder="Admin" value={formData.createdBy} onChange={handleChange} />
                </div>
              </div>
              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>Created At</div>
                <div style={styles.infoValue}>
                  <input style={styles.input} name="createdAt" type="datetime-local" value={formData.createdAt} onChange={handleChange} />
                </div>
              </div>
              <div style={styles.infoRow}>
                <div style={styles.infoLabel}>Updated At</div>
                <div style={styles.infoValue}>
                  <input style={styles.input} name="updatedAt" type="datetime-local" value={formData.updatedAt} onChange={handleChange} />
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const goToNext = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const isLastSection = currentIndex === sections.length - 1;
  const isFirstSection = currentIndex === 0;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={handleCancel}>
          <BackIcon /> Back
        </button>
        <h2 style={styles.headerTitle}>Add New Restaurant</h2>
      </div>

      {/* Progress Meter */}
      <div style={styles.progressContainer}>
        <div style={styles.progressHeader}>
          <span style={styles.progressLabel}>Form Completion</span>
          <span style={styles.progressPercent}>{Math.round(progressPercentage)}%</span>
        </div>
        <div style={styles.progressBarBg}>
          <div style={styles.progressBarFill} />
        </div>
      </div>

      {/* Section Buttons */}
      <div style={styles.sectionButtons}>
        {sections.map((section) => (
          <button
            key={section.id}
            style={styles.sectionBtn(activeSection === section.id, filledSections[section.id])}
            onClick={() => setActiveSection(section.id)}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
            {filledSections[section.id] && <CheckCircleIcon />}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div style={styles.formContainer}>
        <div style={styles.formCard}>
          <div style={styles.formTitle}>
            {sections.find(s => s.id === activeSection)?.label}
          </div>
          
          <form onSubmit={handleSubmit}>
            {renderForm()}
            
            {/* Navigation Buttons */}
            <div style={styles.navButtons}>
              <button 
                type="button" 
                style={styles.navBtn}
                onClick={goToPrev}
                disabled={isFirstSection}
              >
                ← Previous
              </button>
              {!isLastSection ? (
                <button 
                  type="button" 
                  style={styles.navBtnPrimary}
                  onClick={goToNext}
                >
                  Next →
                </button>
              ) : (
                <button 
                  type="submit" 
                  style={styles.navBtnPrimary}
                  onClick={handleSubmit}
                >
                  Create Restaurant
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Fixed Buttons */}
      <div style={styles.fixedButtons}>
        <button style={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
        <button style={styles.createBtn} onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
};

export default AddNewRestaurant;