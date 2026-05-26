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

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AddNewRestaurant = ({ isDark = true, onBack }) => {
  // Section collapse state
  const [sections, setSections] = useState({
    personalInfo: true,
    ownerDetails: true,
    documents: true,
    bankDetails: true,
    businessSettings: true,
    statusSchedule: true,
    verification: true,
    menu: true,
    meta: true,
  });

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

  const toggleSection = (section) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (docName, file) => {
    setDocuments({ ...documents, [docName]: file });
  };

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
      background: "transparent",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
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
    },
    formContainer: {
      flex: 1,
      overflowY: "auto",
      padding: "20px 24px",
      paddingBottom: "80px",
    },
    section: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "16px",
      marginBottom: "16px",
      overflow: "hidden",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      cursor: "pointer",
      background: isDark ? "#0f1520" : "#f8fafc",
      transition: "all 0.2s",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
    },
    sectionIcon: {
      color: isDark ? "#64748b" : "#94a3b8",
      transition: "transform 0.2s",
    },
    sectionContent: {
      padding: "20px 24px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
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
      position: "fixed",
      bottom: 0,
      right: 0,
      left: "auto",
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

  const Section = ({ id, title, children }) => (
    <div style={styles.section}>
      <div style={styles.sectionHeader} onClick={() => toggleSection(id)}>
        <h3 style={styles.sectionTitle}>{title}</h3>
        <div style={styles.sectionIcon}>
          {sections[id] ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>
      {sections[id] && (
        <div style={styles.sectionContent}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={handleCancel}>
          <BackIcon /> Back
        </button>
        <h2 style={styles.headerTitle}>Add New Restaurant</h2>
      </div>

      {/* Scrollable Form */}
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {/* Personal Info Section */}
          <Section id="personalInfo" title="Personal Info">
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Contact Person Name</label>
                <input style={styles.input} name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Restaurant Name</label>
                <input style={styles.input} name="restaurantName" value={formData.restaurantName} onChange={handleChange} />
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
                <input style={styles.input} name="contact" value={formData.contact} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input style={styles.input} name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input style={styles.input} name="password" type="password" value={formData.password} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>City</label>
                <input style={styles.input} name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>State</label>
                <input style={styles.input} name="state" value={formData.state} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>PIN Code</label>
                <input style={styles.input} name="pinCode" value={formData.pinCode} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Address</label>
                <textarea style={styles.textarea} name="address" value={formData.address} onChange={handleChange} />
              </div>
            </div>
          </Section>

          {/* Owner Details Section */}
          <Section id="ownerDetails" title="Owner Details">
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Owner Name</label>
                <input style={styles.input} name="ownerName" value={formData.ownerName} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Owner Mobile</label>
                <input style={styles.input} name="ownerMobile" value={formData.ownerMobile} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Other Person Name</label>
                <input style={styles.input} name="otherPersonName" value={formData.otherPersonName} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Other Person Mobile</label>
                <input style={styles.input} name="otherPersonMobile" value={formData.otherPersonMobile} onChange={handleChange} />
              </div>
            </div>
          </Section>

          {/* Documents Section */}
          <Section id="documents" title="Documents">
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
          </Section>

          {/* Bank Details Section */}
          <Section id="bankDetails" title="Bank Details">
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Bank Name</label>
                <input style={styles.input} name="bankName" value={formData.bankName} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Branch</label>
                <input style={styles.input} name="branch" value={formData.branch} onChange={handleChange} />
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
                <input style={styles.input} name="accountHolder" value={formData.accountHolder} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Account Number</label>
                <input style={styles.input} name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>IFSC</label>
                <input style={styles.input} name="ifsc" value={formData.ifsc} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Bank Mobile</label>
                <input style={styles.input} name="bankMobile" value={formData.bankMobile} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>UPI</label>
                <input style={styles.input} name="upi" value={formData.upi} onChange={handleChange} />
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <FileUploadField label="Bank Passbook / Cheque" docKey="bankPassbook" />
            </div>
          </Section>

          {/* Business Settings Section */}
          <Section id="businessSettings" title="Business Settings">
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Commission (%)</label>
                <input style={styles.input} name="commission" value={formData.commission} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Special Commission (%)</label>
                <input style={styles.input} name="specialCommission" value={formData.specialCommission} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Minimum Order</label>
                <input style={styles.input} name="minimumOrder" value={formData.minimumOrder} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Platform Charge</label>
                <input style={styles.input} name="platformCharge" value={formData.platformCharge} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Handling Charge (%)</label>
                <input style={styles.input} name="handlingCharge" value={formData.handlingCharge} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>GST (%)</label>
                <input style={styles.input} name="gst" value={formData.gst} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Order Receiving Charges (%)</label>
                <input style={styles.input} name="orderReceivingCharges" value={formData.orderReceivingCharges} onChange={handleChange} />
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
                <input style={styles.input} name="wallet" value={formData.wallet} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Referral Code</label>
                <input style={styles.input} name="referralCode" value={formData.referralCode} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Referred By</label>
                <input style={styles.input} name="referredBy" value={formData.referredBy} onChange={handleChange} />
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
          </Section>

          {/* Status & Schedule Section */}
          <Section id="statusSchedule" title="Status & Schedule">
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
          </Section>

          {/* Verification Section - NEW */}
          <Section id="verification" title="Verification">
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
                <input style={styles.input} name="personalInfoRemarks" value={formData.personalInfoRemarks} onChange={handleChange} />
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
                <input style={styles.input} name="documentsRemarks" value={formData.documentsRemarks} onChange={handleChange} />
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
                <input style={styles.input} name="bankRemarks" value={formData.bankRemarks} onChange={handleChange} />
              </div>
            </div>
          </Section>

          {/* Menu Section - NEW */}
          <Section id="menu" title="Menu">
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
                <input style={styles.input} name="menuDirectionValue" value={formData.menuDirectionValue} onChange={handleChange} />
              </div>
            </div>
          </Section>

          {/* Meta Section - NEW */}
          <Section id="meta" title="Meta">
            <div style={styles.inputGroup}>
              <label style={styles.label}>Remarks</label>
              <textarea style={styles.textarea} name="remarks" value={formData.remarks} onChange={handleChange} />
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
          </Section>
        </form>
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