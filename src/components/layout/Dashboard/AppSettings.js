import React, { useState, useEffect } from "react";

// ===================== THEME =====================
const getT = (isDark) => ({
  bg: isDark ? "#0c1018" : "#f0f4ff",
  surface: isDark ? "#141824" : "#ffffff",
  surfaceAlt: isDark ? "#1c2133" : "#f4f7ff",
  border: isDark ? "rgba(255,255,255,0.07)" : "#e2e8f5",
  text: isDark ? "#f1f5f9" : "#0f172a",
  textMuted: isDark ? "#64748b" : "#94a3b8",
  textSub: isDark ? "#94a3b8" : "#64748b",
  shadow: isDark ? "0 4px 28px rgba(0,0,0,0.45)" : "0 4px 28px rgba(99,102,241,0.10)",
  shadowSm: isDark ? "0 2px 10px rgba(0,0,0,0.35)" : "0 2px 10px rgba(99,102,241,0.07)",
  accent: "#6c63ff",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
});

// ===================== ICONS =====================
const DeliveryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <line x1="8" y1="18" x2="16" y2="18" />
    <circle cx="8.5" cy="18.5" r="2.5" />
    <circle cx="15.5" cy="18.5" r="2.5" />
    <polyline points="12 11 12 8 15 8" />
    <line x1="8" y1="8" x2="4" y2="8" />
  </svg>
);

const MoneyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="6" x2="12" y2="18" />
    <polyline points="12 8 15 10 12 12" />
    <line x1="12" y1="6" x2="9" y2="10" />
  </svg>
);

const GstIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 6h18v12H3z" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="12" y2="14" />
    <path d="M18 14h2v-4h-2" />
  </svg>
);

const ServiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CustomerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const RiderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
    <path d="M5 17h14V5H5z" />
    <line x1="8" y1="9" x2="16" y2="9" />
    <line x1="8" y1="13" x2="14" y2="13" />
  </svg>
);

const RestaurantIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 3v18h18V3H3z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M8 7v4M16 7v4" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// const SaveIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
//     <polyline points="17 21 17 13 7 13 7 21" />
//     <polyline points="7 3 7 8 15 8" />
//   </svg>
// );

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ===================== DUMMY DATA =====================
const DEFAULT_SETTINGS = {
  deliveryCharges: {
    baseCharge: 30,
    perKmCharge: 10,
    freeDeliveryThreshold: 500,
    peakHourMultiplier: 1.5,
    peakHourStart: "19:00",
    peakHourEnd: "22:00",
    zones: [
      { zone: "Zone 1 (0-3km)", charge: 30 },
      { zone: "Zone 2 (3-5km)", charge: 50 },
      { zone: "Zone 3 (5-8km)", charge: 80 },
      { zone: "Zone 4 (8km+)", charge: 120 }
    ]
  },
  minimumOrderValue: {
    default: 99,
    peakHours: 149,
    weekends: 129,
    restaurantSpecific: [
      { restaurantId: "RST_001", name: "Pizza Hut", minOrder: 199 },
      { restaurantId: "RST_002", name: "McDonald's", minOrder: 149 },
      { restaurantId: "RST_003", name: "KFC", minOrder: 179 }
    ]
  },
  gstSettings: {
    gstPercentage: 5,
    cgst: 2.5,
    sgst: 2.5,
    igst: 5,
    enableGst: true,
    gstOnDelivery: true,
    gstOnServiceCharge: true
  },
  serviceCharges: {
    customer: {
      enabled: true,
      percentage: 5,
      maxCharge: 100,
      minCharge: 10,
      description: "Platform fee for using the app"
    },
    rider: {
      enabled: true,
      percentage: 10,
      fixedCharge: 20,
      description: "Commission from delivery earnings"
    },
    restaurant: {
      enabled: true,
      percentage: 15,
      fixedCharge: 500,
      description: "Commission per order + monthly fixed charge"
    }
  }
};

// ===================== COMPONENTS =====================
const Toast = ({ message, type, onClose, isDark }) => {
  const t = getT(isDark);
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000, background: t.surface, border: `1px solid ${type === "error" ? t.danger : t.success}`, borderRadius: "12px", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? t.danger : t.success }} />
      <span style={{ fontSize: "13px", color: type === "error" ? t.danger : t.success }}>{message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}><CloseIcon /></button>
    </div>
  );
};

const ToggleSwitch = ({ checked, onChange, isDark }) => {
  const t = getT(isDark);
  return (
    <button onClick={onChange} style={{
      width: "44px", height: "24px", borderRadius: "30px", border: "none",
      background: checked ? "#22c55e" : t.surfaceAlt,
      cursor: "pointer", transition: "all 0.2s", position: "relative"
    }}>
      <span style={{
        position: "absolute", top: "2px", left: checked ? "22px" : "2px",
        width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
        transition: "all 0.2s"
      }} />
    </button>
  );
};

// ===================== MAIN COMPONENT - APP_SETTINGS =====================
const AppSettings = ({ isDark = true }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("delivery");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [ setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: key ? { ...prev[section], [key]: value } : value
    }));
    showToast("Settings saved successfully");
    setShowModal(false);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: t.bg,
      fontFamily: "'DM Sans', sans-serif",
      padding: isMobile ? "16px" : "24px",
    },
    contentWrapper: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "28px",
    },
    title: {
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: 700,
      background: "linear-gradient(135deg, #6c63ff, #a855f7)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: 0,
    },
    subtitle: {
      fontSize: "13px",
      color: t.textMuted,
      marginTop: "6px",
    },
    tabContainer: {
      display: "flex",
      gap: "12px",
      marginBottom: "32px",
      flexWrap: "wrap",
    },
    tabItem: (isActive) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 28px",
      borderRadius: "14px",
      fontSize: "15px",
      fontWeight: 600,
      background: isActive ? "linear-gradient(135deg, #6c63ff, #a855f7)" : t.surface,
      color: isActive ? "#fff" : t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: isActive ? "0 4px 15px rgba(108,99,255,0.3)" : "none",
    }),
    card: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: "20px",
      overflow: "hidden",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      borderBottom: `1px solid ${t.border}`,
      background: t.surfaceAlt,
      flexWrap: "wrap",
      gap: "12px",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 700,
      color: t.text,
      margin: 0,
    },
    settingsGroup: {
      padding: "20px",
      borderBottom: `1px solid ${t.border}`,
    },
    settingsItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      flexWrap: "wrap",
      gap: "12px",
    },
    settingsLabel: {
      fontSize: "14px",
      fontWeight: 500,
      color: t.text,
    },
    settingsDescription: {
      fontSize: "11px",
      color: t.textMuted,
      marginTop: "2px",
    },
    settingsValue: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    valueDisplay: {
      fontSize: "14px",
      fontWeight: 600,
      color: t.accent,
      background: t.surfaceAlt,
      padding: "6px 12px",
      borderRadius: "8px",
    },
    editButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "6px",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: t.accent,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "12px 16px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: 700,
      color: t.accent,
      borderBottom: `1px solid ${t.border}`,
      background: t.surfaceAlt,
    },
    td: {
      padding: "12px 16px",
      fontSize: "13px",
      color: t.textSub,
      borderBottom: `1px solid ${t.border}`,
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: "24px",
      width: isMobile ? "90%" : "450px",
      maxHeight: "85vh",
      overflow: "auto",
    },
    modalHeader: {
      padding: "20px 24px",
      borderBottom: `1px solid ${t.border}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: "18px",
      fontWeight: 700,
      color: t.text,
    },
    modalBody: {
      padding: "24px",
    },
    modalFooter: {
      padding: "16px 24px",
      borderTop: `1px solid ${t.border}`,
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
    },
    formGroup: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: 600,
      color: t.textMuted,
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "10px 14px",
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      fontSize: "13px",
      color: t.text,
      outline: "none",
    },
    select: {
      width: "100%",
      padding: "10px 14px",
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      fontSize: "13px",
      color: t.text,
      cursor: "pointer",
    },
    cancelBtn: {
      padding: "10px 20px",
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      color: t.textSecondary,
      cursor: "pointer",
    },
    saveBtn: {
      padding: "10px 20px",
      background: "linear-gradient(135deg, #6c63ff, #a855f7)",
      border: "none",
      borderRadius: "12px",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 600,
    },
    serviceCard: {
      background: t.surfaceAlt,
      borderRadius: "16px",
      padding: "16px",
      marginBottom: "16px",
    },
    serviceHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
      flexWrap: "wrap",
      gap: "12px",
    },
    serviceTitle: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "15px",
      fontWeight: 600,
      color: t.text,
    },
  };

  // Delivery Charges Tab
  const renderDeliveryCharges = () => (
    <div>
      <div style={styles.settingsGroup}>
        <h4 style={{ margin: "0 0 16px 0", color: t.text }}>Basic Charges</h4>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Base Delivery Charge</div>
            <div style={styles.settingsDescription}>Fixed charge per delivery</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>₹{settings.deliveryCharges.baseCharge}</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "delivery", field: "baseCharge", label: "Base Delivery Charge", value: settings.deliveryCharges.baseChannel })}>
              <EditIcon />
            </button>
          </div>
        </div>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Per Kilometer Charge</div>
            <div style={styles.settingsDescription}>Additional charge per km beyond base distance</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>₹{settings.deliveryCharges.perKmCharge}/km</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "delivery", field: "perKmCharge", label: "Per Kilometer Charge", value: settings.deliveryCharges.perKmCharge })}>
              <EditIcon />
            </button>
          </div>
        </div>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Free Delivery Threshold</div>
            <div style={styles.settingsDescription}>Orders above this amount get free delivery</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>₹{settings.deliveryCharges.freeDeliveryThreshold}</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "delivery", field: "freeDeliveryThreshold", label: "Free Delivery Threshold", value: settings.deliveryCharges.freeDeliveryThreshold })}>
              <EditIcon />
            </button>
          </div>
        </div>
      </div>

      <div style={styles.settingsGroup}>
        <h4 style={{ margin: "0 0 16px 0", color: t.text }}>Peak Hours</h4>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Peak Hour Multiplier</div>
            <div style={styles.settingsDescription}>Multiplier applied during peak hours</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>{settings.deliveryCharges.peakHourMultiplier}x</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "delivery", field: "peakHourMultiplier", label: "Peak Hour Multiplier", value: settings.deliveryCharges.peakHourMultiplier })}>
              <EditIcon />
            </button>
          </div>
        </div>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Peak Hours</div>
            <div style={styles.settingsDescription}>{settings.deliveryCharges.peakHourStart} - {settings.deliveryCharges.peakHourEnd}</div>
          </div>
          <div style={styles.settingsValue}>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "delivery", field: "peakHours", label: "Peak Hours", value: { start: settings.deliveryCharges.peakHourStart, end: settings.deliveryCharges.peakHourEnd } })}>
              <EditIcon />
            </button>
          </div>
        </div>
      </div>

      <div style={styles.settingsGroup}>
        <h4 style={{ margin: "0 0 16px 0", color: t.text }}>Zone-wise Charges</h4>
        <table style={styles.table}>
          <thead>
            <tr><th style={styles.th}>Zone</th><th style={styles.th}>Charge</th></tr>
          </thead>
          <tbody>
            {settings.deliveryCharges.zones.map((zone, idx) => (
              <tr key={idx}><td style={styles.td}>{zone.zone}</td><td style={styles.td}>₹{zone.charge}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Minimum Order Value Tab
  const renderMinimumOrder = () => (
    <div>
      <div style={styles.settingsGroup}>
        <h4 style={{ margin: "0 0 16px 0", color: t.text }}>Global Settings</h4>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Default Minimum Order Value</div>
            <div style={styles.settingsDescription}>Minimum order amount for all orders</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>₹{settings.minimumOrderValue.default}</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "minOrder", field: "default", label: "Default Minimum Order Value", value: settings.minimumOrderValue.default })}>
              <EditIcon />
            </button>
          </div>
        </div>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Peak Hours Minimum Order</div>
            <div style={styles.settingsDescription}>Minimum order during peak hours</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>₹{settings.minimumOrderValue.peakHours}</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "minOrder", field: "peakHours", label: "Peak Hours Minimum Order", value: settings.minimumOrderValue.peakHours })}>
              <EditIcon />
            </button>
          </div>
        </div>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Weekends Minimum Order</div>
            <div style={styles.settingsDescription}>Minimum order on Saturday & Sunday</div>
          </div>
          <div style={styles.settingsValue}>
            <span style={styles.valueDisplay}>₹{settings.minimumOrderValue.weekends}</span>
            <button style={styles.editButton} onClick={() => setModalContent({ type: "minOrder", field: "weekends", label: "Weekends Minimum Order", value: settings.minimumOrderValue.weekends })}>
              <EditIcon />
            </button>
          </div>
        </div>
      </div>

      <div style={styles.settingsGroup}>
        <h4 style={{ margin: "0 0 16px 0", color: t.text }}>Restaurant-specific Minimum Order</h4>
        <table style={styles.table}>
          <thead>
            <tr><th style={styles.th}>Restaurant</th><th style={styles.th}>Minimum Order</th></tr>
          </thead>
          <tbody>
            {settings.minimumOrderValue.restaurantSpecific.map((rest, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{rest.name}</td>
                <td style={styles.td}>₹{rest.minOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // GST Settings Tab
  const renderGstSettings = () => (
    <div>
      <div style={styles.settingsGroup}>
        <div style={styles.settingsItem}>
          <div>
            <div style={styles.settingsLabel}>Enable GST</div>
            <div style={styles.settingsDescription}>Apply GST on orders</div>
          </div>
          <ToggleSwitch checked={settings.gstSettings.enableGst} onChange={() => handleSave("gstSettings", "enableGst", !settings.gstSettings.enableGst)} isDark={isDark} />
        </div>
      </div>

      {settings.gstSettings.enableGst && (
        <>
          <div style={styles.settingsGroup}>
            <h4 style={{ margin: "0 0 16px 0", color: t.text }}>GST Rates</h4>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Total GST Percentage</div><div style={styles.settingsDescription}>Combined GST rate</div></div>
              <div style={styles.settingsValue}>
                <span style={styles.valueDisplay}>{settings.gstSettings.gstPercentage}%</span>
                <button style={styles.editButton} onClick={() => setModalContent({ type: "gst", field: "gstPercentage", label: "Total GST Percentage", value: settings.gstSettings.gstPercentage })}><EditIcon /></button>
              </div>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>CGST</div><div style={styles.settingsDescription}>Central GST</div></div>
              <span style={styles.valueDisplay}>{settings.gstSettings.cgst}%</span>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>SGST</div><div style={styles.settingsDescription}>State GST</div></div>
              <span style={styles.valueDisplay}>{settings.gstSettings.sgst}%</span>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>IGST</div><div style={styles.settingsDescription}>Inter-state GST</div></div>
              <span style={styles.valueDisplay}>{settings.gstSettings.igst}%</span>
            </div>
          </div>

          <div style={styles.settingsGroup}>
            <h4 style={{ margin: "0 0 16px 0", color: t.text }}>GST Application</h4>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>GST on Delivery Charges</div></div>
              <ToggleSwitch checked={settings.gstSettings.gstOnDelivery} onChange={() => handleSave("gstSettings", "gstOnDelivery", !settings.gstSettings.gstOnDelivery)} isDark={isDark} />
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>GST on Service Charges</div></div>
              <ToggleSwitch checked={settings.gstSettings.gstOnServiceCharge} onChange={() => handleSave("gstSettings", "gstOnServiceCharge", !settings.gstSettings.gstOnServiceCharge)} isDark={isDark} />
            </div>
          </div>
        </>
      )}
    </div>
  );

  // Service Charges Tab
  const renderServiceCharges = () => (
    <div>
      {/* Customer Service Charges */}
      <div style={styles.serviceCard}>
        <div style={styles.serviceHeader}>
          <div style={styles.serviceTitle}><CustomerIcon /> Customer Service Charge</div>
          <ToggleSwitch checked={settings.serviceCharges.customer.enabled} onChange={() => handleSave("serviceCharges", "customer", { ...settings.serviceCharges.customer, enabled: !settings.serviceCharges.customer.enabled })} isDark={isDark} />
        </div>
        {settings.serviceCharges.customer.enabled && (
          <>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Percentage</div><div style={styles.settingsDescription}>Percentage of order value</div></div>
              <div style={styles.settingsValue}>
                <span style={styles.valueDisplay}>{settings.serviceCharges.customer.percentage}%</span>
                <button style={styles.editButton} onClick={() => setModalContent({ type: "serviceCustomer", field: "percentage", label: "Customer Service Charge Percentage", value: settings.serviceCharges.customer.percentage })}><EditIcon /></button>
              </div>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Min Charge</div><div style={styles.settingsDescription}>Minimum service charge</div></div>
              <div style={styles.settingsValue}>
                <span style={styles.valueDisplay}>₹{settings.serviceCharges.customer.minCharge}</span>
                <button style={styles.editButton} onClick={() => setModalContent({ type: "serviceCustomer", field: "minCharge", label: "Minimum Service Charge", value: settings.serviceCharges.customer.minCharge })}><EditIcon /></button>
              </div>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Max Charge</div><div style={styles.settingsDescription}>Maximum service charge</div></div>
              <div style={styles.settingsValue}>
                <span style={styles.valueDisplay}>₹{settings.serviceCharges.customer.maxCharge}</span>
                <button style={styles.editButton} onClick={() => setModalContent({ type: "serviceCustomer", field: "maxCharge", label: "Maximum Service Charge", value: settings.serviceCharges.customer.maxCharge })}><EditIcon /></button>
              </div>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Description</div></div>
              <span style={styles.valueDisplay}>{settings.serviceCharges.customer.description}</span>
            </div>
          </>
        )}
      </div>

      {/* Rider Service Charges */}
      <div style={styles.serviceCard}>
        <div style={styles.serviceHeader}>
          <div style={styles.serviceTitle}><RiderIcon /> Rider Service Charge</div>
          <ToggleSwitch checked={settings.serviceCharges.rider.enabled} onChange={() => handleSave("serviceCharges", "rider", { ...settings.serviceCharges.rider, enabled: !settings.serviceCharges.rider.enabled })} isDark={isDark} />
        </div>
        {settings.serviceCharges.rider.enabled && (
          <>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Percentage</div><div style={styles.settingsDescription}>Commission from delivery earnings</div></div>
              <div style={styles.settingsValue}>
                <span style={styles.valueDisplay}>{settings.serviceCharges.rider.percentage}%</span>
                <button style={styles.editButton} onClick={() => setModalContent({ type: "serviceRider", field: "percentage", label: "Rider Commission Percentage", value: settings.serviceCharges.rider.percentage })}><EditIcon /></button>
              </div>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Fixed Charge</div><div style={styles.settingsDescription}>Per delivery fixed charge</div></div>
              <div style={styles.settingsValue}>
                <span style={styles.valueDisplay}>₹{settings.serviceCharges.rider.fixedCharge}</span>
                <button style={styles.editButton} onClick={() => setModalContent({ type: "serviceRider", field: "fixedCharge", label: "Fixed Charge per Delivery", value: settings.serviceCharges.rider.fixedCharge })}><EditIcon /></button>
              </div>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Description</div></div>
              <span style={styles.valueDisplay}>{settings.serviceCharges.rider.description}</span>
            </div>
          </>
        )}
      </div>

      {/* Restaurant Service Charges */}
      <div style={styles.serviceCard}>
        <div style={styles.serviceHeader}>
          <div style={styles.serviceTitle}><RestaurantIcon /> Restaurant Service Charge</div>
          <ToggleSwitch checked={settings.serviceCharges.restaurant.enabled} onChange={() => handleSave("serviceCharges", "restaurant", { ...settings.serviceCharges.restaurant, enabled: !settings.serviceCharges.restaurant.enabled })} isDark={isDark} />
        </div>
        {settings.serviceCharges.restaurant.enabled && (
          <>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Commission Percentage</div><div style={styles.settingsDescription}>Percentage of order value</div></div>
              <div style={styles.settingsValue}>
                <span style={styles.valueDisplay}>{settings.serviceCharges.restaurant.percentage}%</span>
                <button style={styles.editButton} onClick={() => setModalContent({ type: "serviceRestaurant", field: "percentage", label: "Restaurant Commission Percentage", value: settings.serviceCharges.restaurant.percentage })}><EditIcon /></button>
              </div>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Monthly Fixed Charge</div><div style={styles.settingsDescription}>Fixed monthly fee for restaurants</div></div>
              <div style={styles.settingsValue}>
                <span style={styles.valueDisplay}>₹{settings.serviceCharges.restaurant.fixedCharge}</span>
                <button style={styles.editButton} onClick={() => setModalContent({ type: "serviceRestaurant", field: "fixedCharge", label: "Monthly Fixed Charge", value: settings.serviceCharges.restaurant.fixedCharge })}><EditIcon /></button>
              </div>
            </div>
            <div style={styles.settingsItem}>
              <div><div style={styles.settingsLabel}>Description</div></div>
              <span style={styles.valueDisplay}>{settings.serviceCharges.restaurant.description}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Modal for editing values
  const renderModal = () => {
    if (!modalContent) return null;

    let value = modalContent.value;
    let inputElement = null;

    if (modalContent.type === "delivery" && modalContent.field === "peakHours") {
      inputElement = (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Start Time</label>
            <input type="time" style={styles.input} value={value.start} onChange={(e) => setModalContent({ ...modalContent, value: { ...value, start: e.target.value } })} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>End Time</label>
            <input type="time" style={styles.input} value={value.end} onChange={(e) => setModalContent({ ...modalContent, value: { ...value, end: e.target.value } })} />
          </div>
        </>
      );
    } else {
      inputElement = (
        <div style={styles.formGroup}>
          <label style={styles.label}>{modalContent.label}</label>
          <input type="number" step="0.01" style={styles.input} value={value} onChange={(e) => setModalContent({ ...modalContent, value: parseFloat(e.target.value) })} />
        </div>
      );
    }

    return (
      <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
        <div style={styles.modal} onClick={e => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <div style={styles.modalTitle}>Edit {modalContent.label}</div>
            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}><CloseIcon /></button>
          </div>
          <div style={styles.modalBody}>
            {inputElement}
          </div>
          <div style={styles.modalFooter}>
            <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
            <button style={styles.saveBtn} onClick={() => {
              if (modalContent.type === "delivery" && modalContent.field === "peakHours") {
                handleSave("deliveryCharges", "peakHourStart", modalContent.value.start);
                handleSave("deliveryCharges", "peakHourEnd", modalContent.value.end);
                setShowModal(false);
              } else if (modalContent.type === "delivery") {
                handleSave("deliveryCharges", modalContent.field, modalContent.value);
              } else if (modalContent.type === "minOrder") {
                handleSave("minimumOrderValue", modalContent.field, modalContent.value);
              } else if (modalContent.type === "gst") {
                handleSave("gstSettings", modalContent.field, modalContent.value);
              } else if (modalContent.type === "serviceCustomer") {
                handleSave("serviceCharges", "customer", { ...settings.serviceCharges.customer, [modalContent.field]: modalContent.value });
              } else if (modalContent.type === "serviceRider") {
                handleSave("serviceCharges", "rider", { ...settings.serviceCharges.rider, [modalContent.field]: modalContent.value });
              } else if (modalContent.type === "serviceRestaurant") {
                handleSave("serviceCharges", "restaurant", { ...settings.serviceCharges.restaurant, [modalContent.field]: modalContent.value });
              }
            }}>Save</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>⚙️ App Settings</h1>
          <p style={styles.subtitle}>Configure delivery charges, minimum order, GST, and service charges</p>
        </div>

        {/* Tabs as per image */}
        <div style={styles.tabContainer}>
          <div style={styles.tabItem(activeTab === "delivery")} onClick={() => setActiveTab("delivery")}>
            <DeliveryIcon /> 1) Delivery Charges
          </div>
          <div style={styles.tabItem(activeTab === "minOrder")} onClick={() => setActiveTab("minOrder")}>
            <MoneyIcon /> 2) Minimum Order Value
          </div>
          <div style={styles.tabItem(activeTab === "gst")} onClick={() => setActiveTab("gst")}>
            <GstIcon /> 3) GST Return Setting
          </div>
          <div style={styles.tabItem(activeTab === "service")} onClick={() => setActiveTab("service")}>
            <ServiceIcon /> 4) Service Charges
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              {activeTab === "delivery" && "🚚 Delivery Charges"}
              {activeTab === "minOrder" && "💰 Minimum Order Value"}
              {activeTab === "gst" && "📋 GST Return Settings"}
              {activeTab === "service" && "🔧 Service Charges (Customer / Rider / Restaurant)"}
            </h3>
          </div>
          <div>
            {activeTab === "delivery" && renderDeliveryCharges()}
            {activeTab === "minOrder" && renderMinimumOrder()}
            {activeTab === "gst" && renderGstSettings()}
            {activeTab === "service" && renderServiceCharges()}
          </div>
        </div>
      </div>

      {renderModal()}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} isDark={isDark} />}
    </div>
  );
};

export default AppSettings;