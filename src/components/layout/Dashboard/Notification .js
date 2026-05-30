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
const PushIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SmsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// const TrashIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
//   </svg>
// );

// const SearchIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
//   </svg>
// );

const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TestIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ===================== COMPONENTS =====================
// const Card = ({ children, style, onClick }) => (
//   <div onClick={onClick} style={{ ...style, transition: "all 0.3s ease", cursor: onClick ? "pointer" : "default" }}>{children}</div>
// );

// const CardHeader = ({ children, style }) => (
//   <div style={{ padding: "16px 20px 0", ...style }}>{children}</div>
// );

// const CardTitle = ({ children, style }) => (
//   <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, ...style }}>{children}</h3>
// );

// const CardContent = ({ children, style }) => (
//   <div style={{ padding: "16px 20px 20px", ...style }}>{children}</div>
// );

// const Badge = ({ children, style }) => (
//   <span style={{
//     display: "inline-flex", alignItems: "center", borderRadius: "6px",
//     padding: "2px 8px", fontSize: "11px", fontWeight: 600, ...style
//   }}>{children}</span>
// );

const Button = ({ children, onClick, variant = "default", size = "default", style, disabled }) => {
//   const t = getT(true);
  const baseStyle = {
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: "8px",
    fontWeight: 500,
    transition: "all 0.15s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    ...(size === "icon" && { width: "36px", height: "36px", padding: 0 }),
    ...(size === "sm" && { padding: "4px 12px", fontSize: "11px", height: "28px" }),
    ...(size === "default" && { padding: "8px 16px", fontSize: "13px" }),
    ...(variant === "outline" && { background: "transparent", border: "1px solid" }),
    ...(variant === "ghost" && { background: "transparent", border: "none" }),
    ...(disabled && { opacity: 0.5 }),
    ...style
  };
  return <button onClick={onClick} style={baseStyle} disabled={disabled}>{children}</button>;
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

const StatusBadge = ({ status, isDark }) => {
  const t = getT(isDark);
  const configs = {
    sent: { bg: "rgba(34,197,94,0.15)", color: t.success, label: "Sent" },
    pending: { bg: "rgba(245,158,11,0.15)", color: t.warning, label: "Pending" },
    failed: { bg: "rgba(239,68,68,0.15)", color: t.danger, label: "Failed" },
    scheduled: { bg: "rgba(59,130,246,0.15)", color: t.info, label: "Scheduled" },
  };
  const config = configs[status] || configs.pending;
  return <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: config.bg, color: config.color }}>{config.label}</span>;
};

// ===================== DUMMY DATA =====================
const notificationHistory = [
  { id: 1, type: "push", title: "Weekend Special Offer", message: "Get 20% off on all orders above ₹499", audience: "All Users", sentAt: "2026-05-24 10:30:00", status: "sent", opens: 1245, clicks: 892 },
  { id: 2, type: "sms", title: "Order Confirmation", message: "Your order #543 has been confirmed", audience: "Customers", sentAt: "2026-05-24 09:15:00", status: "sent", recipients: 450 },
  { id: 3, type: "email", title: "Welcome to our platform", message: "Thank you for joining us!", audience: "New Users", sentAt: "2026-05-23 18:00:00", status: "sent", opens: 2340 },
  { id: 4, type: "push", title: "New Restaurant Added", message: "Check out our new partner restaurant", audience: "All Users", sentAt: "2026-05-23 14:20:00", status: "sent", opens: 3421, clicks: 2100 },
  { id: 5, type: "sms", title: "Delivery Update", message: "Your order is out for delivery", audience: "Customers", sentAt: "2026-05-23 11:00:00", status: "failed", recipients: 120 },
  { id: 6, type: "email", title: "Special Discount", message: "Use code SAVE20 for 20% off", audience: "Subscribers", sentAt: "2026-05-22 16:30:00", status: "sent", opens: 5678 },
  { id: 7, type: "push", title: "Flash Sale", message: "Limited time offer! Up to 50% off", audience: "All Users", sentAt: "2026-05-22 12:00:00", status: "scheduled", opens: 0, clicks: 0 },
];

const emailTemplates = [
  { id: 1, name: "Welcome Email", subject: "Welcome to our platform!", body: "Dear {name}, welcome to our platform...", category: "Onboarding", status: "active" },
  { id: 2, name: "Order Confirmation", subject: "Your order has been confirmed", body: "Dear {name}, your order #{orderId} has been confirmed...", category: "Orders", status: "active" },
  { id: 3, name: "Delivery Update", subject: "Your order is out for delivery", body: "Dear {name}, your order is out for delivery...", category: "Orders", status: "active" },
  { id: 4, name: "Promotional Offer", subject: "Special offer just for you!", body: "Dear {name}, get {discount}% off on your next order...", category: "Marketing", status: "inactive" },
];

const smsTemplates = [
  { id: 1, name: "OTP Verification", message: "Your OTP for login is {otp}. Valid for 10 minutes.", category: "Auth", status: "active" },
  { id: 2, name: "Order Confirmation", message: "Order #{orderId} confirmed. Amount: ₹{amount}", category: "Orders", status: "active" },
  { id: 3, name: "Delivery Update", message: "Your order is out for delivery. Track: {trackingLink}", category: "Orders", status: "active" },
];

const audienceSegments = [
  { id: 1, name: "All Users", count: 24500, description: "All registered users" },
  { id: 2, name: "Active Customers", count: 12800, description: "Users who ordered in last 30 days" },
  { id: 3, name: "New Users", count: 3400, description: "Users who joined in last 7 days" },
  { id: 4, name: "Inactive Users", count: 5600, description: "Users inactive for 30+ days" },
  { id: 5, name: "High Value Customers", count: 2100, description: "Users with order value > ₹1000" },
];

// ===================== MAIN COMPONENT =====================
const NotificationSystem = ({ isDark = true }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("push");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Push Notification State
  const [pushTitle, setPushTitle] = useState("");
  const [pushMessage, setPushMessage] = useState("");
  const [pushAudience, setPushAudience] = useState("All Users");
  const [pushSchedule, setPushSchedule] = useState("now");
  const [pushScheduleDate, setPushScheduleDate] = useState("");
  const [pushImage, setPushImage] = useState(null);
  const [pushDeepLink, setPushDeepLink] = useState("");

  // SMS Notification State
  const [smsMessage, setSmsMessage] = useState("");
  const [smsAudience, setSmsAudience] = useState("All Users");
  const [smsTemplate, setSmsTemplate] = useState("");

  // Email Notification State
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailAudience, setEmailAudience] = useState("All Users");
  const [emailTemplate, setEmailTemplate] = useState("");

  // Settings State
  const [pushSettings, setPushSettings] = useState({
    enabled: true,
    firebaseKey: "AIzaSyB...",
    vapidKey: "BEx...",
    defaultIcon: "/icon.png"
  });
  const [smsSettings, setSmsSettings] = useState({
    enabled: true,
    provider: "Twilio",
    apiKey: "SK...",
    fromNumber: "+1234567890"
  });
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    provider: "SendGrid",
    apiKey: "SG...",
    fromEmail: "noreply@restaurant.com",
    fromName: "Restaurant App"
  });

  const [ setShowTemplateModal] = useState(false);
//   const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
//   const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSendPush = () => {
    if (!pushTitle || !pushMessage) {
      showToast("Please fill title and message", "error");
      return;
    }
    showToast(`Push notification sent to ${pushAudience} successfully!`);
    setPushTitle("");
    setPushMessage("");
  };

  const handleSendSMS = () => {
    if (!smsMessage) {
      showToast("Please enter message", "error");
      return;
    }
    showToast(`SMS sent to ${smsAudience} successfully!`);
    setSmsMessage("");
  };

  const handleSendEmail = () => {
    if (!emailSubject || !emailBody) {
      showToast("Please fill subject and body", "error");
      return;
    }
    showToast(`Email sent to ${emailAudience} successfully!`);
    setEmailSubject("");
    setEmailBody("");
  };

  const handleTestPush = () => {
    showToast("Test push notification sent to your device!", "success");
  };

  const filteredHistory = notificationHistory.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.message.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedHistory = filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const tabs = [
    { id: "push", label: "📱 Push Notification", icon: <PushIcon />, color: t.accent },
    { id: "sms", label: "💬 SMS Notification", icon: <SmsIcon />, color: t.success },
    { id: "email", label: "📧 Email Notification", icon: <EmailIcon />, color: t.info },
    { id: "settings", label: "⚙️ Settings", icon: "⚙️", color: t.warning },
    { id: "history", label: "📜 History", icon: <HistoryIcon />, color: t.textMuted },
  ];

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
      marginBottom: "24px",
    },
    title: {
      fontSize: isMobile ? "22px" : "26px",
      fontWeight: 700,
      color: t.text,
      margin: 0,
    },
    subtitle: {
      fontSize: "13px",
      color: t.textMuted,
      marginTop: "4px",
    },
    tabsContainer: {
      display: "flex",
      gap: "8px",
      marginBottom: "24px",
      flexWrap: "wrap",
      borderBottom: `1px solid ${t.border}`,
      paddingBottom: "12px",
    },
    tabButton: (isActive, color) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 600,
      background: isActive ? color : "transparent",
      color: isActive ? "#fff" : t.textMuted,
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    }),
    card: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: "20px",
      overflow: "hidden",
      marginBottom: "20px",
    },
    cardHeader: {
      padding: "16px 20px",
      borderBottom: `1px solid ${t.border}`,
      background: t.surfaceAlt,
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 700,
      color: t.text,
      margin: 0,
    },
    formGroup: {
      marginBottom: "16px",
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
      transition: "all 0.2s",
    },
    textarea: {
      width: "100%",
      padding: "10px 14px",
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      fontSize: "13px",
      color: t.text,
      outline: "none",
      resize: "vertical",
      fontFamily: "inherit",
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
    button: (variant = "primary") => ({
      padding: "10px 20px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      background: variant === "primary" ? t.accent : variant === "success" ? t.success : variant === "danger" ? t.danger : t.surfaceAlt,
      color: variant === "primary" || variant === "success" || variant === "danger" ? "#fff" : t.text,
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    }),
    configRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: `1px solid ${t.border}`,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "12px 12px",
      textAlign: "left",
      fontSize: "11px",
      fontWeight: 700,
      color: t.accent,
      borderBottom: `1px solid ${t.border}`,
      background: t.surfaceAlt,
    },
    td: {
      padding: "12px 12px",
      fontSize: "12px",
      color: t.textSub,
      borderBottom: `1px solid ${t.border}`,
    },
    searchWrapper: {
      position: "relative",
      width: isMobile ? "100%" : "280px",
    },
    searchInput: {
      width: "100%",
      padding: "10px 12px 10px 35px",
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      fontSize: "13px",
      color: t.text,
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "16px 20px",
      borderTop: `1px solid ${t.border}`,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Notification System</h1>
          <p style={styles.subtitle}>Send push notifications, SMS, and emails to your users</p>
        </div>

        <div style={styles.tabsContainer}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={styles.tabButton(activeTab === tab.id, tab.color)}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Push Notification Tab */}
        {activeTab === "push" && (
          <div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>📱 Send Push Notification</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title *</label>
                  <input
                    style={styles.input}
                    placeholder="Enter notification title"
                    value={pushTitle}
                    onChange={(e) => setPushTitle(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Message *</label>
                  <textarea
                    style={styles.textarea}
                    rows="3"
                    placeholder="Enter notification message"
                    value={pushMessage}
                    onChange={(e) => setPushMessage(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Audience</label>
                  <select style={styles.select} value={pushAudience} onChange={(e) => setPushAudience(e.target.value)}>
                    {audienceSegments.map(seg => <option key={seg.id} value={seg.name}>{seg.name} ({seg.count.toLocaleString()} users)</option>)}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Schedule</label>
                  <select style={styles.select} value={pushSchedule} onChange={(e) => setPushSchedule(e.target.value)}>
                    <option value="now">Send Now</option>
                    <option value="schedule">Schedule for Later</option>
                  </select>
                </div>
                {pushSchedule === "schedule" && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Schedule Date & Time</label>
                    <input type="datetime-local" style={styles.input} value={pushScheduleDate} onChange={(e) => setPushScheduleDate(e.target.value)} />
                  </div>
                )}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Image URL (Optional)</label>
                  <input style={styles.input} placeholder="https://example.com/image.jpg" value={pushImage} onChange={(e) => setPushImage(e.target.value)} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Deep Link (Optional)</label>
                  <input style={styles.input} placeholder="app://order/123" value={pushDeepLink} onChange={(e) => setPushDeepLink(e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                  <Button style={styles.button("success")} onClick={handleTestPush}><TestIcon /> Test</Button>
                  <Button style={styles.button("primary")} onClick={handleSendPush}><SendIcon /> Send Push</Button>
                </div>
              </div>
            </div>

            {/* Push Settings */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>⚙️ Push Notification Settings</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>Enable Push Notifications</span>
                  <ToggleSwitch checked={pushSettings.enabled} onChange={() => setPushSettings({ ...pushSettings, enabled: !pushSettings.enabled })} isDark={isDark} />
                </div>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>Firebase Cloud Messaging Key</span>
                  <span style={{ fontSize: "12px", color: t.textMuted, fontFamily: "monospace" }}>{pushSettings.firebaseKey}</span>
                </div>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>VAPID Key</span>
                  <span style={{ fontSize: "12px", color: t.textMuted, fontFamily: "monospace" }}>{pushSettings.vapidKey}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SMS Notification Tab */}
        {activeTab === "sms" && (
          <div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>💬 Send SMS Notification</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Use Template</label>
                  <select style={styles.select} value={smsTemplate} onChange={(e) => setSmsTemplate(e.target.value)}>
                    <option value="">Select a template...</option>
                    {smsTemplates.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Message *</label>
                  <textarea
                    style={styles.textarea}
                    rows="3"
                    placeholder="Enter SMS message (max 160 characters)"
                    maxLength="160"
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                  />
                  <div style={{ fontSize: "10px", color: t.textMuted, marginTop: "4px", textAlign: "right" }}>
                    {smsMessage.length}/160 characters
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Audience</label>
                  <select style={styles.select} value={smsAudience} onChange={(e) => setSmsAudience(e.target.value)}>
                    {audienceSegments.map(seg => <option key={seg.id} value={seg.name}>{seg.name} ({seg.count.toLocaleString()} users)</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                  <Button style={styles.button("primary")} onClick={handleSendSMS}><SendIcon /> Send SMS</Button>
                </div>
              </div>
            </div>

            {/* SMS Templates */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>📋 SMS Templates</h3>
                <Button style={styles.button("outline")} onClick={() => setShowTemplateModal(true)}><PlusIcon /> Add Template</Button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Message</th><th style={styles.th}>Category</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
                  <tbody>
                    {smsTemplates.map(t => (
                      <tr key={t.id}>
                        <td style={styles.td}>{t.name}</td>
                        <td style={styles.td}>{t.message}</td>
                        <td style={styles.td}>{t.category}</td>
                        <td style={styles.td}><StatusBadge status={t.status} isDark={isDark} /></td>
                        <td style={styles.td}><Button variant="ghost" size="icon"><EditIcon /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SMS Settings */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>⚙️ SMS Settings</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>Enable SMS</span>
                  <ToggleSwitch checked={smsSettings.enabled} onChange={() => setSmsSettings({ ...smsSettings, enabled: !smsSettings.enabled })} isDark={isDark} />
                </div>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>SMS Provider</span>
                  <span style={{ fontSize: "12px", color: t.textMuted }}>{smsSettings.provider}</span>
                </div>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>From Number</span>
                  <span style={{ fontSize: "12px", color: t.textMuted }}>{smsSettings.fromNumber}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Notification Tab */}
        {activeTab === "email" && (
          <div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>📧 Send Email Notification</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Use Template</label>
                  <select style={styles.select} value={emailTemplate} onChange={(e) => setEmailTemplate(e.target.value)}>
                    <option value="">Select a template...</option>
                    {emailTemplates.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Subject *</label>
                  <input style={styles.input} placeholder="Enter email subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Body *</label>
                  <textarea
                    style={styles.textarea}
                    rows="5"
                    placeholder="Enter email body (HTML supported)"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Audience</label>
                  <select style={styles.select} value={emailAudience} onChange={(e) => setEmailAudience(e.target.value)}>
                    {audienceSegments.map(seg => <option key={seg.id} value={seg.name}>{seg.name} ({seg.count.toLocaleString()} users)</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                  <Button style={styles.button("primary")} onClick={handleSendEmail}><SendIcon /> Send Email</Button>
                </div>
              </div>
            </div>

            {/* Email Templates */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>📧 Email Templates</h3>
                <Button style={styles.button("outline")} onClick={() => setShowTemplateModal(true)}><PlusIcon /> Add Template</Button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Subject</th><th style={styles.th}>Category</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
                  <tbody>
                    {emailTemplates.map(t => (
                      <tr key={t.id}>
                        <td style={styles.td}>{t.name}</td>
                        <td style={styles.td}>{t.subject}</td>
                        <td style={styles.td}>{t.category}</td>
                        <td style={styles.td}><StatusBadge status={t.status} isDark={isDark} /></td>
                        <td style={styles.td}><Button variant="ghost" size="icon"><EditIcon /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Email Settings */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>⚙️ Email Settings</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>Enable Email</span>
                  <ToggleSwitch checked={emailSettings.enabled} onChange={() => setEmailSettings({ ...emailSettings, enabled: !emailSettings.enabled })} isDark={isDark} />
                </div>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>Email Provider</span>
                  <span style={{ fontSize: "12px", color: t.textMuted }}>{emailSettings.provider}</span>
                </div>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>From Email</span>
                  <span style={{ fontSize: "12px", color: t.textMuted }}>{emailSettings.fromEmail}</span>
                </div>
                <div style={styles.configRow}>
                  <span style={{ fontSize: "13px", color: t.text }}>From Name</span>
                  <span style={{ fontSize: "12px", color: t.textMuted }}>{emailSettings.fromName}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>⚙️ Global Notification Settings</h3>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={styles.configRow}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>Push Notifications</div>
                <div style={{ fontSize: "11px", color: t.textMuted }}>Send real-time alerts to user devices</div>
                </div>
                <ToggleSwitch checked={pushSettings.enabled} onChange={() => setPushSettings({ ...pushSettings, enabled: !pushSettings.enabled })} isDark={isDark} />
              </div>
              <div style={styles.configRow}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>SMS Notifications</div>
                  <div style={{ fontSize: "11px", color: t.textMuted }}>Send text messages for important updates</div>
                </div>
                <ToggleSwitch checked={smsSettings.enabled} onChange={() => setSmsSettings({ ...smsSettings, enabled: !smsSettings.enabled })} isDark={isDark} />
              </div>
              <div style={styles.configRow}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>Email Notifications</div>
                  <div style={{ fontSize: "11px", color: t.textMuted }}>Send promotional and transactional emails</div>
                </div>
                <ToggleSwitch checked={emailSettings.enabled} onChange={() => setEmailSettings({ ...emailSettings, enabled: !emailSettings.enabled })} isDark={isDark} />
              </div>
              <div style={styles.configRow}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>Daily Notification Limit</div>
                  <div style={{ fontSize: "11px", color: t.textMuted }}>Maximum notifications per user per day</div>
                </div>
                <select style={{ ...styles.select, width: "100px" }}>
                  <option>5</option><option>10</option><option>20</option><option>50</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>📜 Notification History</h3>
              <div style={styles.searchWrapper}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}>🔍</span>
                <input style={styles.searchInput} placeholder="Search notifications..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Type</th><th style={styles.th}>Title/Message</th><th style={styles.th}>Audience</th><th style={styles.th}>Sent At</th><th style={styles.th}>Status</th><th style={styles.th}>Stats</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedHistory.map(n => (
                    <tr key={n.id}>
                      <td style={styles.td}>
                        {n.type === "push" && <PushIcon />}
                        {n.type === "sms" && <SmsIcon />}
                        {n.type === "email" && <EmailIcon />}
                      </td>
                      <td style={styles.td}>
                        <div style={{ fontWeight: 500, color: t.text }}>{n.title}</div>
                        <div style={{ fontSize: "11px", color: t.textMuted }}>{n.message.substring(0, 50)}...</div>
                      </td>
                      <td style={styles.td}>{n.audience}</td>
                      <td style={styles.td}>{n.sentAt}</td>
                      <td style={styles.td}><StatusBadge status={n.status} isDark={isDark} /></td>
                      <td style={styles.td}>
                        {n.opens !== undefined && <div>Opens: {n.opens}</div>}
                        {n.clicks !== undefined && <div>Clicks: {n.clicks}</div>}
                        {n.recipients !== undefined && <div>Recipients: {n.recipients}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ ...styles.button("outline"), padding: "6px 12px" }}><ChevronLeftIcon /></button>
                <span style={{ fontSize: "12px", color: t.text }}>{currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ ...styles.button("outline"), padding: "6px 12px" }}><ChevronRightIcon /></button>
              </div>
            )}
          </div>
        )}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000, background: t.surface, border: `1px solid ${toast.type === "error" ? t.danger : t.success}`, borderRadius: "12px", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: toast.type === "error" ? t.danger : t.success }} />
          <span style={{ fontSize: "13px", color: toast.type === "error" ? t.danger : t.success }}>{toast.message}</span>
          <button onClick={() => setToast(null)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}><CloseIcon /></button>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;