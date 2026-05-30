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
const StarIcon = ({ filled = false, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CustomerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const RestaurantIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 3v18h18V3H3z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M8 7v4M16 7v4" />
  </svg>
);

const RiderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
    <path d="M5 17h14V5H5z" />
    <line x1="8" y1="9" x2="16" y2="9" />
    <line x1="8" y1="13" x2="14" y2="13" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3" />
  </svg>
);

// const ReplyIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//   </svg>
// );

// ===================== DUMMY DATA =====================
const DUMMY_CUSTOMER_REVIEWS = [
  { id: "REV_001", customerName: "Rajesh Kumar", customerImage: "👨", rating: 5, title: "Great food!", comment: "Amazing pizza! Delivery was super fast. Will order again.", date: "2024-05-20", restaurant: "Pizza Hut", orderId: "ORD_001", status: "Published", reply: null, helpful: 45 },
  { id: "REV_002", customerName: "Priya Sharma", customerImage: "👩", rating: 4, title: "Good experience", comment: "Food was tasty but delivery took a bit longer.", date: "2024-05-19", restaurant: "McDonald's", orderId: "ORD_002", status: "Published", reply: "Thank you for your feedback! We'll work on delivery times.", helpful: 32 },
  { id: "REV_003", customerName: "Amit Singh", customerImage: "👨", rating: 2, title: "Not satisfied", comment: "Burger was cold and fries were soggy.", date: "2024-05-18", restaurant: "KFC", orderId: "ORD_003", status: "Pending", reply: null, helpful: 12 },
  { id: "REV_004", customerName: "Neha Gupta", customerImage: "👩", rating: 5, title: "Excellent service!", comment: "Best Chinese food in town! Highly recommended.", date: "2024-05-17", restaurant: "Chinese Wok", orderId: "ORD_004", status: "Published", reply: "Thank you for your kind words!", helpful: 67 },
  { id: "REV_005", customerName: "Vikram Mehta", customerImage: "👨", rating: 3, title: "Average", comment: "Food was okay, portion size could be better.", date: "2024-05-16", restaurant: "Pizza Hut", orderId: "ORD_005", status: "Published", reply: null, helpful: 8 },
];

const DUMMY_RESTAURANT_RATINGS = [
  { id: "RST_001", name: "Pizza Hut", image: "🍕", avgRating: 4.5, totalReviews: 1250, rating5: 650, rating4: 350, rating3: 150, rating2: 70, rating1: 30, status: "Active", lastReviewed: "2024-05-20" },
  { id: "RST_002", name: "McDonald's", image: "🍔", avgRating: 4.3, totalReviews: 980, rating5: 450, rating4: 300, rating3: 150, rating2: 50, rating1: 30, status: "Active", lastReviewed: "2024-05-19" },
  { id: "RST_003", name: "KFC", image: "🍗", avgRating: 4.2, totalReviews: 750, rating5: 320, rating4: 250, rating3: 120, rating2: 40, rating1: 20, status: "Active", lastReviewed: "2024-05-18" },
  { id: "RST_004", name: "Chinese Wok", image: "🥡", avgRating: 4.7, totalReviews: 560, rating5: 380, rating4: 120, rating3: 40, rating2: 15, rating1: 5, status: "Active", lastReviewed: "2024-05-17" },
];

const DUMMY_RIDER_RATINGS = [
  { id: "RDR_001", name: "Rajesh Kumar", image: "👨", phone: "+91 98765 43210", avgRating: 4.8, totalRatings: 450, rating5: 380, rating4: 50, rating3: 15, rating2: 3, rating1: 2, status: "Active", totalDeliveries: 450, joinDate: "2024-01-01" },
  { id: "RDR_002", name: "Suresh Singh", image: "👨", phone: "+91 87654 32109", avgRating: 4.6, totalRatings: 320, rating5: 250, rating4: 45, rating3: 15, rating2: 6, rating1: 4, status: "Active", totalDeliveries: 320, joinDate: "2024-01-15" },
  { id: "RDR_003", name: "Amit Patel", image: "👨", phone: "+91 76543 21098", avgRating: 4.4, totalRatings: 180, rating5: 120, rating4: 35, rating3: 15, rating2: 6, rating1: 4, status: "Inactive", totalDeliveries: 180, joinDate: "2024-02-01" },
  { id: "RDR_004", name: "Vikram Singh", image: "👨", phone: "+91 65432 10987", avgRating: 4.9, totalRatings: 280, rating5: 250, rating4: 25, rating3: 3, rating2: 1, rating1: 1, status: "Active", totalDeliveries: 280, joinDate: "2024-01-10" },
];

// ===================== COMPONENTS =====================
const StatusBadge = ({ status, isDark }) => {
  const t = getT(isDark);
  const configs = {
    Active: { bg: "rgba(34,197,94,0.15)", color: t.success, label: "Active" },
    Inactive: { bg: "rgba(239,68,68,0.15)", color: t.danger, label: "Inactive" },
    Published: { bg: "rgba(34,197,94,0.15)", color: t.success, label: "Published" },
    Pending: { bg: "rgba(245,158,11,0.15)", color: t.warning, label: "Pending" },
  };
  const config = configs[status] || configs.Inactive;
  return (
    <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: config.bg, color: config.color }}>
      {config.label}
    </span>
  );
};

const StarRating = ({ rating, size = 14, showNumber = false }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} style={{ color: star <= rating ? "#f59e0b" : "#e2e8f0" }}>
            <StarIcon filled={star <= rating} size={size} />
          </span>
        ))}
      </div>
      {showNumber && <span style={{ fontSize: "12px", fontWeight: 600 }}>{rating}</span>}
    </div>
  );
};

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

// ===================== MAIN COMPONENT - RATING_REVIEW =====================
const RatingReview = ({ isDark = true }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("customer");
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [toast, setToast] = useState(null);

  // Data states
  const [customerReviews, setCustomerReviews] = useState(DUMMY_CUSTOMER_REVIEWS);
  const [restaurantRatings, setRestaurantRatings] = useState(DUMMY_RESTAURANT_RATINGS);
  const [riderRatings, setRiderRatings] = useState(DUMMY_RIDER_RATINGS);

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

  const handleReply = (review) => {
    setSelectedReview(review);
    setReplyText(review.reply || "");
    setShowReplyModal(true);
  };

  const handleSubmitReply = () => {
    setCustomerReviews(customerReviews.map(review => 
      review.id === selectedReview.id ? { ...review, reply: replyText, status: "Published" } : review
    ));
    showToast("Reply posted successfully");
    setShowReplyModal(false);
    setReplyText("");
  };

  const handleToggleStatus = (item, type) => {
    const newStatus = item.status === "Active" ? "Inactive" : "Active";
    if (type === "restaurant") {
      setRestaurantRatings(restaurantRatings.map(rest => rest.id === item.id ? { ...rest, status: newStatus } : rest));
      showToast(`Restaurant ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
    } else if (type === "rider") {
      setRiderRatings(riderRatings.map(rider => rider.id === item.id ? { ...rider, status: newStatus } : rider));
      showToast(`Rider ${newStatus === "Active" ? "activated" : "deactivated"} successfully`);
    }
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
    searchWrapper: {
      position: "relative",
      width: isMobile ? "100%" : "260px",
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
    filterWrapper: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    filterSelect: {
      padding: "8px 12px",
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: "10px",
      fontSize: "12px",
      color: t.text,
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "14px 16px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: 700,
      color: t.accent,
      borderBottom: `1px solid ${t.border}`,
      background: t.surfaceAlt,
    },
    td: {
      padding: "14px 16px",
      fontSize: "13px",
      color: t.textSub,
      borderBottom: `1px solid ${t.border}`,
    },
    reviewCard: {
      background: t.surfaceAlt,
      borderRadius: "16px",
      padding: "16px",
      marginBottom: "12px",
    },
    reviewHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "12px",
      flexWrap: "wrap",
      gap: "8px",
    },
    customerInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    customerAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: t.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
    },
    reviewContent: {
      marginBottom: "12px",
    },
    reviewTitle: {
      fontSize: "14px",
      fontWeight: 600,
      color: t.text,
      marginBottom: "6px",
    },
    reviewComment: {
      fontSize: "13px",
      color: t.textSub,
      lineHeight: "1.5",
    },
    replySection: {
      background: t.surface,
      borderRadius: "12px",
      padding: "12px",
      marginTop: "12px",
      borderLeft: `3px solid ${t.accent}`,
    },
    replyText: {
      fontSize: "12px",
      color: t.textMuted,
      fontStyle: "italic",
    },
    replyButton: {
      padding: "6px 12px",
      borderRadius: "8px",
      fontSize: "11px",
      fontWeight: 500,
      background: t.accent,
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
    ratingBar: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "8px",
    },
    ratingLabel: {
      width: "30px",
      fontSize: "12px",
      fontWeight: 600,
      color: t.text,
    },
    ratingBarFill: {
      flex: 1,
      height: "8px",
      background: t.border,
      borderRadius: "4px",
      overflow: "hidden",
    },
    ratingBarProgress: (percentage) => ({
      width: `${percentage}%`,
      height: "100%",
      background: t.warning,
      borderRadius: "4px",
    }),
    ratingCount: {
      width: "40px",
      fontSize: "11px",
      color: t.textMuted,
      textAlign: "right",
    },
    actionButtons: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    toggleBtn: (isActive) => ({
      padding: "4px 12px",
      borderRadius: "20px",
      border: "none",
      fontSize: "11px",
      fontWeight: 500,
      cursor: "pointer",
      background: isActive ? t.success : t.warning,
      color: "#fff",
    }),
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
      width: isMobile ? "90%" : "500px",
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
  };

  // Customer Reviews Tab
  const renderCustomerReviews = () => {
    let filtered = customerReviews.filter(review => 
      review.customerName.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase()) ||
      review.restaurant.toLowerCase().includes(search.toLowerCase())
    );
    
    if (filterRating !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(filterRating));
    }

    return (
      <div>
        {filtered.map(review => (
          <div key={review.id} style={styles.reviewCard}>
            <div style={styles.reviewHeader}>
              <div style={styles.customerInfo}>
                <div style={styles.customerAvatar}>{review.customerImage}</div>
                <div>
                  <div style={{ fontWeight: 600, color: t.text }}>{review.customerName}</div>
                  <div style={{ fontSize: "11px", color: t.textMuted }}>{review.date} • Order: {review.orderId}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <StarRating rating={review.rating} size={14} showNumber={false} />
                <StatusBadge status={review.status} isDark={isDark} />
              </div>
            </div>
            <div style={styles.reviewContent}>
              <div style={styles.reviewTitle}>{review.title}</div>
              <div style={styles.reviewComment}>{review.comment}</div>
              <div style={{ fontSize: "11px", color: t.textMuted, marginTop: "8px" }}>
                Restaurant: {review.restaurant} • Helpful: {review.helpful}
              </div>
            </div>
            {review.reply && (
              <div style={styles.replySection}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: t.accent, marginBottom: "4px" }}>Admin Reply:</div>
                <div style={styles.replyText}>{review.reply}</div>
              </div>
            )}
            {!review.reply && review.status === "Published" && (
              <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
                <button style={styles.replyButton} onClick={() => handleReply(review)}>Reply to Review</button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Restaurant Ratings Tab
  const renderRestaurantRatings = () => {
    const filtered = restaurantRatings.filter(rest => 
      rest.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Restaurant</th>
            <th style={styles.th}>Avg Rating</th>
            <th style={styles.th}>Total Reviews</th>
            <th style={styles.th}>Rating Distribution</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(rest => {
            const total = rest.totalReviews;
            return (
              <tr key={rest.id}>
                <td style={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "24px" }}>{rest.image}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: t.text }}>{rest.name}</div>
                      <div style={{ fontSize: "11px", color: t.textMuted }}>Last reviewed: {rest.lastReviewed}</div>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "18px", fontWeight: 700, color: t.warning }}>{rest.avgRating}</span>
                    <StarRating rating={rest.avgRating} size={12} />
                  </div>
                </td>
                <td style={styles.td}>{rest.totalReviews.toLocaleString()}</td>
                <td style={styles.td}>
                  <div style={{ minWidth: "180px" }}>
                    <div style={styles.ratingBar}>
                      <span style={styles.ratingLabel}>5 ★</span>
                      <div style={styles.ratingBarFill}>
                        <div style={styles.ratingBarProgress((rest.rating5 / total) * 100)} />
                      </div>
                      <span style={styles.ratingCount}>{rest.rating5}</span>
                    </div>
                    <div style={styles.ratingBar}>
                      <span style={styles.ratingLabel}>4 ★</span>
                      <div style={styles.ratingBarFill}>
                        <div style={styles.ratingBarProgress((rest.rating4 / total) * 100)} />
                      </div>
                      <span style={styles.ratingCount}>{rest.rating4}</span>
                    </div>
                    <div style={styles.ratingBar}>
                      <span style={styles.ratingLabel}>3 ★</span>
                      <div style={styles.ratingBarFill}>
                        <div style={styles.ratingBarProgress((rest.rating3 / total) * 100)} />
                      </div>
                      <span style={styles.ratingCount}>{rest.rating3}</span>
                    </div>
                  </div>
                </td>
                <td style={styles.td}><StatusBadge status={rest.status} isDark={isDark} /></td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button onClick={() => handleToggleStatus(rest, "restaurant")} style={styles.toggleBtn(rest.status === "Active")}>
                      {rest.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // Rider Ratings Tab
  const renderRiderRatings = () => {
    const filtered = riderRatings.filter(rider => 
      rider.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Rider</th>
            <th style={styles.th}>Avg Rating</th>
            <th style={styles.th}>Total Ratings</th>
            <th style={styles.th}>Total Deliveries</th>
            <th style={styles.th}>Join Date</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(rider => (
            <tr key={rider.id}>
              <td style={styles.td}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "24px" }}>{rider.image}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: t.text }}>{rider.name}</div>
                    <div style={{ fontSize: "11px", color: t.textMuted }}>{rider.phone}</div>
                  </div>
                </div>
              </td>
              <td style={styles.td}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: t.warning }}>{rider.avgRating}</span>
                  <StarRating rating={rider.avgRating} size={12} />
                </div>
              </td>
              <td style={styles.td}>{rider.totalRatings.toLocaleString()}</td>
              <td style={styles.td}>{rider.totalDeliveries.toLocaleString()}</td>
              <td style={styles.td}>{rider.joinDate}</td>
              <td style={styles.td}><StatusBadge status={rider.status} isDark={isDark} /></td>
              <td style={styles.td}>
                <div style={styles.actionButtons}>
                  <button onClick={() => handleToggleStatus(rider, "rider")} style={styles.toggleBtn(rider.status === "Active")}>
                    {rider.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>⭐ Rating & Reviews</h1>
          <p style={styles.subtitle}>Manage customer reviews, restaurant ratings, and rider feedback</p>
        </div>

        {/* Tabs as per image */}
        <div style={styles.tabContainer}>
          <div style={styles.tabItem(activeTab === "customer")} onClick={() => { setActiveTab("customer"); setSearch(""); setFilterRating("all"); }}>
            <CustomerIcon /> 1) Customer Reviews
          </div>
          <div style={styles.tabItem(activeTab === "restaurant")} onClick={() => { setActiveTab("restaurant"); setSearch(""); }}>
            <RestaurantIcon /> 2) Restaurant Rating
          </div>
          <div style={styles.tabItem(activeTab === "rider")} onClick={() => { setActiveTab("rider"); setSearch(""); }}>
            <RiderIcon /> 3) Rider Rating
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              {activeTab === "customer" && "📝 Customer Reviews"}
              {activeTab === "restaurant" && "🍔 Restaurant Ratings"}
              {activeTab === "rider" && "🛵 Rider Ratings"}
            </h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <div style={styles.searchWrapper}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></span>
                <input style={styles.searchInput} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              {activeTab === "customer" && (
                <div style={styles.filterWrapper}>
                  <FilterIcon />
                  <select style={styles.filterSelect} value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            {activeTab === "customer" && renderCustomerReviews()}
            {activeTab === "restaurant" && renderRestaurantRatings()}
            {activeTab === "rider" && renderRiderRatings()}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div style={styles.modalOverlay} onClick={() => setShowReplyModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Reply to Review</div>
              <button onClick={() => setShowReplyModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}>
                <CloseIcon />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", color: t.textMuted, marginBottom: "8px" }}>Customer Review:</div>
                <div style={{ background: t.surfaceAlt, padding: "12px", borderRadius: "12px" }}>
                  <div style={{ fontWeight: 600, color: t.text }}>{selectedReview?.title}</div>
                  <div style={{ fontSize: "12px", color: t.textSub }}>{selectedReview?.comment}</div>
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Reply</label>
                <textarea
                  style={styles.textarea}
                  rows="4"
                  placeholder="Write your reply to this review..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowReplyModal(false)}>Cancel</button>
              <button style={styles.saveBtn} onClick={handleSubmitReply}>Post Reply</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} isDark={isDark} />}
    </div>
  );
};

export default RatingReview;