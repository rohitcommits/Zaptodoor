import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const ExportRestaurantsModal = ({ isDark = true, onClose, onExport }) => {
  const [selectedFields, setSelectedFields] = useState({
    // Personal Info
    id: true,
    orgType: true,
    contact: true,
    email: true,
    contactPersonName: true,
    prefix: true,
    city: true,
    state: true,
    pinCode: true,
    latitude: false,
    longitude: false,
    
    // Owner Details
    ownerName: true,
    ownerMobile: true,
    otherPersonName: true,
    otherPersonMobile: true,
    
    // Documents
    bannerImage: false,
    roundLogo: false,
    horizontalLogo: false,
    aadharFront: false,
    aadharBack: false,
    panCard: false,
    gstNumber: false,
    gstImage: false,
    foodLicenseImage: false,
    foodLicenseNo: false,
    
    // Bank Details
    bankName: true,
    branch: true,
    bankType: true,
    accountHolder: true,
    accountNumber: true,
    ifsc: true,
    bankMobile: true,
    upi: false,
    bankPassbook: false,
    cancelCheque: false,
    
    // Business Settings
    commission: true,
    specialCommission: true,
    minimumOrder: true,
    platformCharge: true,
    handlingCharge: true,
    gst: true,
    orderReceivingCharges: true,
    subscription: true,
    paidStatus: true,
    wallet: true,
    referralCode: true,
    referredBy: true,
    mou: true,
    
    // Status & Schedule
    status: true,
    scheduleMode: false,
    shiftStart: false,
    shiftEnd: false,
    openStatus: false,
    scheduleApproved: false,
    isReady: false,
    
    // Verification
    personalInfoVerified: false,
    personalInfoRemarks: false,
    documentsVerified: false,
    documentsRemarks: false,
    bankVerified: false,
    bankRemarks: false,
    
    // Meta
    remarks: false,
    createdAt: true,
    updatedAt: false,
  });

  const [dateRange, setDateRange] = useState("All Time");
  const [customDate, setCustomDate] = useState({ start: "", end: "" });
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    ownerDetails: false,
    documents: false,
    bankDetails: false,
    businessSettings: false,
    statusSchedule: false,
    verification: false,
    meta: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleField = (field) => {
    setSelectedFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const selectAll = () => {
    const allTrue = {};
    Object.keys(selectedFields).forEach(key => {
      allTrue[key] = true;
    });
    setSelectedFields(allTrue);
  };

  const selectNone = () => {
    const allFalse = {};
    Object.keys(selectedFields).forEach(key => {
      allFalse[key] = false;
    });
    setSelectedFields(allFalse);
  };

  const resetDefaults = () => {
    setSelectedFields({
      id: true, orgType: true, contact: true, email: true, contactPersonName: true,
      prefix: true, city: true, state: true, pinCode: true, latitude: false, longitude: false,
      ownerName: true, ownerMobile: true, otherPersonName: true, otherPersonMobile: true,
      bannerImage: false, roundLogo: false, horizontalLogo: false, aadharFront: false,
      aadharBack: false, panCard: false, gstNumber: false, gstImage: false,
      foodLicenseImage: false, foodLicenseNo: false,
      bankName: true, branch: true, bankType: true, accountHolder: true, accountNumber: true,
      ifsc: true, bankMobile: true, upi: false, bankPassbook: false, cancelCheque: false,
      commission: true, specialCommission: true, minimumOrder: true, platformCharge: true,
      handlingCharge: true, gst: true, orderReceivingCharges: true, subscription: true,
      paidStatus: true, wallet: true, referralCode: true, referredBy: true, mou: true,
      status: true, scheduleMode: false, shiftStart: false, shiftEnd: false, openStatus: false,
      scheduleApproved: false, isReady: false,
      personalInfoVerified: false, personalInfoRemarks: false, documentsVerified: false,
      documentsRemarks: false, bankVerified: false, bankRemarks: false,
      remarks: false, createdAt: true, updatedAt: false,
    });
  };

  const selectedCount = Object.values(selectedFields).filter(v => v === true).length;

  const handleExport = () => {
    const exportData = {
      dateRange,
      customDate: dateRange === "Custom" ? customDate : null,
      selectedFields: Object.keys(selectedFields).filter(key => selectedFields[key]),
    };
    if (onExport) onExport(exportData);
    else console.log("Export Data:", exportData);
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      background: isDark ? "#141824" : "#ffffff",
      borderRadius: "16px",
      width: "90%",
      maxWidth: "900px",
      maxHeight: "85vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 24px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    title: {
      fontSize: "18px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
    },
    closeBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: isDark ? "#64748b" : "#94a3b8",
      padding: "4px",
    },
    content: {
      flex: 1,
      overflowY: "auto",
      padding: "20px 24px",
    },
    // Top bar
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px",
      marginBottom: "20px",
      paddingBottom: "16px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    fieldCount: {
      fontSize: "13px",
      color: isDark ? "#64748b" : "#94a3b8",
    },
    actionButtons: {
      display: "flex",
      gap: "12px",
    },
    actionBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: 500,
      color: "#3b82f6",
      padding: "4px 8px",
    },
    // Date Range
    dateRangeSection: {
      marginBottom: "24px",
      paddingBottom: "16px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    dateRangeTitle: {
      fontSize: "14px",
      fontWeight: 600,
      color: isDark ? "#e2e8f0" : "#1e293b",
      marginBottom: "12px",
    },
    dateRangeButtons: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "16px",
    },
    dateBtn: (isActive) => ({
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 500,
      background: isActive ? "#3b82f6" : isDark ? "transparent" : "#f1f5f9",
      color: isActive ? "#fff" : isDark ? "#94a3b8" : "#475569",
      border: isActive ? "1px solid #3b82f6" : isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      cursor: "pointer",
    }),
    customDateRow: {
      display: "flex",
      gap: "16px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    dateInput: {
      padding: "8px 12px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "13px",
      color: isDark ? "#e2e8f0" : "#1e293b",
    },
    // Sections
    section: {
      marginBottom: "20px",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      cursor: "pointer",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    sectionTitle: {
      fontSize: "14px",
      fontWeight: 600,
      color: isDark ? "#e2e8f0" : "#1e293b",
    },
    sectionContent: {
      paddingTop: "12px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "10px",
    },
    checkboxItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      cursor: "pointer",
    },
    checkboxLabel: {
      fontSize: "12px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      cursor: "pointer",
    },
    subSection: {
      marginLeft: "20px",
      marginTop: "8px",
      marginBottom: "8px",
    },
    subSectionTitle: {
      fontSize: "12px",
      fontWeight: 600,
      color: isDark ? "#64748b" : "#475569",
      marginBottom: "8px",
      marginTop: "8px",
    },
    // Footer
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "12px",
      padding: "16px 24px",
      borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    cancelBtn: {
      padding: "8px 20px",
      background: "transparent",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 500,
      color: isDark ? "#94a3b8" : "#64748b",
      cursor: "pointer",
    },
    downloadBtn: {
      padding: "8px 20px",
      background: "#4a6cf7",
      border: "none",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 600,
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };

  const CheckboxItem = ({ label, field }) => (
    <label style={styles.checkboxItem}>
      <input
        type="checkbox"
        style={styles.checkbox}
        checked={selectedFields[field] || false}
        onChange={() => toggleField(field)}
      />
      <span style={styles.checkboxLabel}>{label}</span>
    </label>
  );

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h3 style={styles.title}>Export Restaurants to CSV</h3>
          <button style={styles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Top Bar */}
          <div style={styles.topBar}>
            <span style={styles.fieldCount}>{selectedCount} fields selected</span>
            <div style={styles.actionButtons}>
              <button style={styles.actionBtn} onClick={selectAll}>Select All</button>
              <button style={styles.actionBtn} onClick={selectNone}>Select None</button>
              <button style={styles.actionBtn} onClick={resetDefaults}>Reset Defaults</button>
            </div>
          </div>

          {/* Date Range Section */}
          <div style={styles.dateRangeSection}>
            <div style={styles.dateRangeTitle}>Date Range (Joined / Created)</div>
            <div style={styles.dateRangeButtons}>
              {["All Time", "Today", "This Week", "Prev Week", "This Month", "Prev Month", "Custom"].map(range => (
                <button
                  key={range}
                  style={styles.dateBtn(dateRange === range)}
                  onClick={() => setDateRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            {dateRange === "Custom" && (
              <div style={styles.customDateRow}>
                <input
                  type="date"
                  style={styles.dateInput}
                  value={customDate.start}
                  onChange={e => setCustomDate({ ...customDate, start: e.target.value })}
                  placeholder="Start Date"
                />
                <span>to</span>
                <input
                  type="date"
                  style={styles.dateInput}
                  value={customDate.end}
                  onChange={e => setCustomDate({ ...customDate, end: e.target.value })}
                  placeholder="End Date"
                />
              </div>
            )}
          </div>

          {/* Personal Info Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => toggleSection("personalInfo")}>
              <span style={styles.sectionTitle}>Personal Info</span>
              {expandedSections.personalInfo ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {expandedSections.personalInfo && (
              <div style={styles.sectionContent}>
                <CheckboxItem label="ID" field="id" />
                <CheckboxItem label="Org Type" field="orgType" />
                <CheckboxItem label="Contact" field="contact" />
                <CheckboxItem label="Email" field="email" />
                <CheckboxItem label="Contact Person Name" field="contactPersonName" />
                <CheckboxItem label="Prefix" field="prefix" />
                <CheckboxItem label="City" field="city" />
                <CheckboxItem label="State" field="state" />
                <CheckboxItem label="PIN Code" field="pinCode" />
                <CheckboxItem label="Latitude" field="latitude" />
                <CheckboxItem label="Longitude" field="longitude" />
              </div>
            )}
          </div>

          {/* Owner Details Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => toggleSection("ownerDetails")}>
              <span style={styles.sectionTitle}>Owner Details</span>
              {expandedSections.ownerDetails ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {expandedSections.ownerDetails && (
              <div style={styles.sectionContent}>
                <CheckboxItem label="Owner Name" field="ownerName" />
                <CheckboxItem label="Owner Mobile" field="ownerMobile" />
                <CheckboxItem label="Other Person Name" field="otherPersonName" />
                <CheckboxItem label="Other Person Mobile" field="otherPersonMobile" />
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => toggleSection("documents")}>
              <span style={styles.sectionTitle}>Documents</span>
              {expandedSections.documents ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {expandedSections.documents && (
              <div style={styles.sectionContent}>
                <CheckboxItem label="Banner Image" field="bannerImage" />
                <CheckboxItem label="Round Logo" field="roundLogo" />
                <CheckboxItem label="Horizontal Logo" field="horizontalLogo" />
                <CheckboxItem label="Aadhar Front" field="aadharFront" />
                <CheckboxItem label="Aadhar Back" field="aadharBack" />
                <CheckboxItem label="Pan Card" field="panCard" />
                <CheckboxItem label="GST Number" field="gstNumber" />
                <CheckboxItem label="GST Image" field="gstImage" />
                <CheckboxItem label="Food License Image" field="foodLicenseImage" />
                <CheckboxItem label="Food License No." field="foodLicenseNo" />
              </div>
            )}
          </div>

          {/* Bank Details Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => toggleSection("bankDetails")}>
              <span style={styles.sectionTitle}>Bank Details</span>
              {expandedSections.bankDetails ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {expandedSections.bankDetails && (
              <div style={styles.sectionContent}>
                <CheckboxItem label="Bank Name" field="bankName" />
                <CheckboxItem label="Branch" field="branch" />
                <CheckboxItem label="Bank Type" field="bankType" />
                <CheckboxItem label="Account Holder" field="accountHolder" />
                <CheckboxItem label="Account Number" field="accountNumber" />
                <CheckboxItem label="IFSC" field="ifsc" />
                <CheckboxItem label="Bank Mobile" field="bankMobile" />
                <CheckboxItem label="UPI" field="upi" />
                <CheckboxItem label="Bank Passbook" field="bankPassbook" />
                <CheckboxItem label="Cancel Cheque" field="cancelCheque" />
              </div>
            )}
          </div>

          {/* Business Settings Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => toggleSection("businessSettings")}>
              <span style={styles.sectionTitle}>Business Settings</span>
              {expandedSections.businessSettings ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {expandedSections.businessSettings && (
              <div style={styles.sectionContent}>
                <CheckboxItem label="Commission (%)" field="commission" />
                <CheckboxItem label="Special Commission (%)" field="specialCommission" />
                <CheckboxItem label="Minimum Order" field="minimumOrder" />
                <CheckboxItem label="Platform Charge" field="platformCharge" />
                <CheckboxItem label="Handling Charge (%)" field="handlingCharge" />
                <CheckboxItem label="GST (%)" field="gst" />
                <CheckboxItem label="Order Receiving Charges (%)" field="orderReceivingCharges" />
                <CheckboxItem label="Subscription" field="subscription" />
                <CheckboxItem label="Paid Status" field="paidStatus" />
                <CheckboxItem label="Wallet" field="wallet" />
                <CheckboxItem label="Referral Code" field="referralCode" />
                <CheckboxItem label="Referred By" field="referredBy" />
                <CheckboxItem label="MOU" field="mou" />
              </div>
            )}
          </div>

          {/* Status & Schedule Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => toggleSection("statusSchedule")}>
              <span style={styles.sectionTitle}>Status & Schedule</span>
              {expandedSections.statusSchedule ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {expandedSections.statusSchedule && (
              <div style={styles.sectionContent}>
                <CheckboxItem label="Status" field="status" />
                <CheckboxItem label="Schedule Mode" field="scheduleMode" />
                <CheckboxItem label="Shift Start" field="shiftStart" />
                <CheckboxItem label="Shift End" field="shiftEnd" />
                <CheckboxItem label="Open Status" field="openStatus" />
                <CheckboxItem label="Schedule Approved" field="scheduleApproved" />
                <CheckboxItem label="Is Ready" field="isReady" />
              </div>
            )}
          </div>

          {/* Verification Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => toggleSection("verification")}>
              <span style={styles.sectionTitle}>Verification</span>
              {expandedSections.verification ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {expandedSections.verification && (
              <div style={styles.sectionContent}>
                <CheckboxItem label="Personal Info Verified" field="personalInfoVerified" />
                <CheckboxItem label="Remarks (Personal)" field="personalInfoRemarks" />
                <CheckboxItem label="Documents Verified" field="documentsVerified" />
                <CheckboxItem label="Remarks (Documents)" field="documentsRemarks" />
                <CheckboxItem label="Bank Verified" field="bankVerified" />
                <CheckboxItem label="Remarks (Bank)" field="bankRemarks" />
              </div>
            )}
          </div>

          {/* Meta Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => toggleSection("meta")}>
              <span style={styles.sectionTitle}>Meta</span>
              {expandedSections.meta ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {expandedSections.meta && (
              <div style={styles.sectionContent}>
                <CheckboxItem label="Remarks" field="remarks" />
                <CheckboxItem label="Created At" field="createdAt" />
                <CheckboxItem label="Updated At" field="updatedAt" />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.downloadBtn} onClick={handleExport}>
            <DownloadIcon /> Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportRestaurantsModal;