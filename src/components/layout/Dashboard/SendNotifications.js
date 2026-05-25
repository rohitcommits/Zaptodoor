import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const RestaurantIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <circle cx="12" cy="4" r="1.5" />
  </svg>
);

const RiderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M5 20v-2a7 7 0 0 1 14 0v2" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// const CalendarIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );

const ImageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const AudienceCard = ({ title, count, icon, color, isDark }) => (
  <div style={{
    background: isDark ? "#141824" : "#ffffff",
    border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "16px",
    flex: 1,
    minWidth: "120px",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
      <span style={{ color: color }}>{icon}</span>
      <span style={{ fontSize: "13px", fontWeight: 600, color: isDark ? "#e2e8f0" : "#1e293b" }}>{title}</span>
    </div>
    <div style={{ fontSize: "24px", fontWeight: 700, color: color }}>{count}+</div>
    <div style={{ fontSize: "11px", color: isDark ? "#64748b" : "#94a3b8", marginTop: "4px" }}>reachable</div>
  </div>
);

const RadioCard = ({ label, description, isSelected, onClick, isDark }) => (
  <div onClick={onClick} style={{
    background: isSelected ? (isDark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.05)") : "transparent",
    border: isSelected ? "1px solid #3b82f6" : isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "12px 16px",
    cursor: "pointer",
    transition: "all 0.2s",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{
        width: "16px", height: "16px", borderRadius: "50%",
        border: isSelected ? "2px solid #3b82f6" : isDark ? "2px solid #3a4460" : "2px solid #cbd5e1",
        background: isSelected ? "#3b82f6" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {isSelected && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />}
      </div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: isDark ? "#e2e8f0" : "#1e293b" }}>{label}</div>
        <div style={{ fontSize: "11px", color: isDark ? "#64748b" : "#94a3b8" }}>{description}</div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const SendNotification = ({ isDark = true }) => {
  const [selectedAudience, setSelectedAudience] = useState("users");
  const [deliveryMode, setDeliveryMode] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [deepLink, setDeepLink] = useState("");
//   const [schedule, setSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");

  const stats = {
    users: 20,
    restaurants: 20,
    riders: 20,
  };

  const styles = {
    container: {
      background: "transparent",
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    title: {
      fontSize: "24px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      marginBottom: "24px",
    },
    // Two Column Layout
    twoColumn: {
      display: "flex",
      gap: "24px",
      flexWrap: "wrap",
    },
    leftColumn: {
      flex: 1.2,
      minWidth: "300px",
    },
    rightColumn: {
      flex: 0.8,
      minWidth: "280px",
    },
    // Cards
    card: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: "20px",
      marginBottom: "20px",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    sectionTitle: {
      fontSize: "13px",
      fontWeight: 600,
      color: isDark ? "#94a3b8" : "#64748b",
      marginBottom: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    // Audience Tabs
    audienceTabs: {
      display: "flex",
      gap: "8px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    audienceTab: (isActive) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      borderRadius: "10px",
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
      transition: "all 0.2s",
    }),
    // Radio Group
    radioGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    // Input Fields
    input: {
      width: "100%",
      padding: "12px 14px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "13px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      outline: "none",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "12px 14px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "13px",
      color: isDark ? "#e2e8f0" : "#1e293b",
      outline: "none",
      fontFamily: "inherit",
      resize: "vertical",
      minHeight: "100px",
      boxSizing: "border-box",
    },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: 500,
      color: isDark ? "#64748b" : "#475569",
      marginBottom: "6px",
    },
    charCount: {
      fontSize: "11px",
      color: isDark ? "#64748b" : "#94a3b8",
      textAlign: "right",
      marginTop: "6px",
    },
    previewCard: {
      background: isDark ? "#0f1520" : "#f8fafc",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "16px",
    },
    previewTitle: {
      fontSize: "14px",
      fontWeight: 600,
      color: isDark ? "#e2e8f0" : "#1e293b",
      marginBottom: "8px",
    },
    previewMessage: {
      fontSize: "13px",
      color: isDark ? "#94a3b8" : "#64748b",
      lineHeight: 1.5,
    },
    sendBtn: {
      width: "100%",
      padding: "12px",
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "16px",
    },
    scheduleBtn: {
      width: "100%",
      padding: "10px",
      background: "transparent",
      color: isDark ? "#94a3b8" : "#64748b",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "13px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "8px",
    },
    audienceCards: {
      display: "flex",
      gap: "12px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Send Notification</h1>

      <div style={styles.twoColumn}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Audience Selection */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              <span>🎯</span> AUDIENCE
            </div>
            <div style={styles.audienceTabs}>
              <button style={styles.audienceTab(selectedAudience === "users")} onClick={() => setSelectedAudience("users")}>
                <UsersIcon /> Users
              </button>
              <button style={styles.audienceTab(selectedAudience === "restaurants")} onClick={() => setSelectedAudience("restaurants")}>
                <RestaurantIcon /> Restaurants
              </button>
              <button style={styles.audienceTab(selectedAudience === "riders")} onClick={() => setSelectedAudience("riders")}>
                <RiderIcon /> Riders
              </button>
            </div>

            {/* Audience Stats */}
            <div style={styles.audienceCards}>
              <AudienceCard title="Users" count={stats.users} icon={<UsersIcon />} color="#3b82f6" isDark={isDark} />
              <AudienceCard title="Restaurants" count={stats.restaurants} icon={<RestaurantIcon />} color="#ec4899" isDark={isDark} />
              <AudienceCard title="Riders" count={stats.riders} icon={<RiderIcon />} color="#14b8a6" isDark={isDark} />
            </div>
          </div>

          {/* Delivery Mode */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              <span>📦</span> Delivery Mode
            </div>
            <div style={styles.radioGroup}>
              <RadioCard 
                label="Send to All" 
                description="Broadcast to all" 
                isSelected={deliveryMode === "all"} 
                onClick={() => setDeliveryMode("all")} 
                isDark={isDark} 
              />
              <RadioCard 
                label="Test Send" 
                description="Send to selected" 
                isSelected={deliveryMode === "test"} 
                onClick={() => setDeliveryMode("test")} 
                isDark={isDark} 
              />
              <RadioCard 
                label="Schedule" 
                description="Send later" 
                isSelected={deliveryMode === "schedule"} 
                onClick={() => setDeliveryMode("schedule")} 
                isDark={isDark} 
              />
            </div>
            {deliveryMode === "schedule" && (
              <div style={{ marginTop: "16px" }}>
                <label style={styles.label}>Schedule Date & Time</label>
                <input type="datetime-local" style={styles.input} value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
              </div>
            )}
          </div>

          {/* Notification Composition */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              <span>✏️</span> Composition Notification
            </div>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={styles.label}>Title *</label>
              <input type="text" style={styles.input} placeholder="Notification title..." value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={styles.label}>Message *</label>
              <textarea style={styles.textarea} placeholder="Write your notification message..." value={message} onChange={(e) => setMessage(e.target.value)} maxLength={300} />
              <div style={styles.charCount}>{message.length}/300 characters</div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={styles.label}>Image URL (optional)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: isDark ? "#64748b" : "#94a3b8" }}><ImageIcon /></span>
                <input type="text" style={styles.input} placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>
            </div>

            <div>
              <label style={styles.label}>Deep Link (optional)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: isDark ? "#64748b" : "#94a3b8" }}><LinkIcon /></span>
                <input type="text" style={styles.input} placeholder="app://screen" value={deepLink} onChange={(e) => setDeepLink(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Preview Card */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              <span>👁️</span> Preview
            </div>
            <div style={styles.previewCard}>
              <div style={styles.previewTitle}>{title || "Notification Title"}</div>
              <div style={styles.previewMessage}>{message || "Your message will appear here..."}</div>
            </div>
            <button style={styles.sendBtn}>
              <SendIcon /> Send Notification
            </button>
            <button style={styles.scheduleBtn}>
              <ClockIcon /> Schedule for later
            </button>
          </div>

          {/* Quick Info */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              <span>ℹ️</span> Quick Info
            </div>
            <div style={{ fontSize: "12px", color: isDark ? "#64748b" : "#94a3b8", lineHeight: 1.6 }}>
              <p>• Notifications will be sent instantly to selected audience</p>
              <p>• You can schedule notifications for later delivery</p>
              <p>• Add images to make notifications more engaging</p>
              <p>• Deep links can direct users to specific screens</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;