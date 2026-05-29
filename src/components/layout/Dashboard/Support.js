import React, { useState, useEffect } from "react";

// ===================== ICONS =====================
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//   </svg>
// );
const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const AttachIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const VideoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);
const MoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
  </svg>
);
// const ReplyIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//   </svg>
// );
const ResolveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
// const FilterIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3"/>
//   </svg>
// );

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

// ===================== SUB-COMPONENTS =====================
const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ ...style, transition: "all 0.3s ease", cursor: onClick ? "pointer" : "default" }}>{children}</div>
);

const CardHeader = ({ children, style }) => (
  <div style={{ padding: "16px 20px 0", ...style }}>{children}</div>
);

const CardTitle = ({ children, style }) => (
  <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, ...style }}>{children}</h3>
);

const CardContent = ({ children, style }) => (
  <div style={{ padding: "16px 20px 20px", ...style }}>{children}</div>
);

const Badge = ({ children, style }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", borderRadius: "6px",
    padding: "2px 8px", fontSize: "11px", fontWeight: 600, ...style
  }}>{children}</span>
);

const Button = ({ children, onClick, variant = "default", size = "default", style }) => {
  const baseStyle = {
    cursor: "pointer", borderRadius: "8px", fontWeight: 500,
    transition: "all 0.15s ease", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px",
    ...(size === "icon" && { width: "36px", height: "36px", padding: 0 }),
    ...(size === "sm" && { padding: "4px 12px", fontSize: "11px", height: "28px" }),
    ...(size === "default" && { padding: "8px 16px", fontSize: "13px" }),
    ...(variant === "outline" && { background: "transparent", border: "1px solid" }),
    ...(variant === "ghost" && { background: "transparent", border: "none" }),
    ...style
  };
  return <button onClick={onClick} style={baseStyle}>{children}</button>;
};

// Status Badge Component
const StatusBadge = ({ status, isDark }) => {
  const configs = {
    open: { bg: "rgba(239,68,68,0.15)", color: "#ef4444", label: "Open" },
    pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b", label: "Pending" },
    in_progress: { bg: "rgba(59,130,246,0.15)", color: "#3b82f6", label: "In Progress" },
    resolved: { bg: "rgba(34,197,94,0.15)", color: "#22c55e", label: "Resolved" },
    closed: { bg: "rgba(148,163,184,0.15)", color: "#94a3b8", label: "Closed" },
  };
  const config = configs[status] || configs.pending;
  return <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: config.bg, color: config.color }}>{config.label}</span>;
};

const PriorityBadge = ({ priority, isDark }) => {
  const configs = {
    high: { bg: "rgba(239,68,68,0.15)", color: "#ef4444", icon: "🔴" },
    medium: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b", icon: "🟡" },
    low: { bg: "rgba(34,197,94,0.15)", color: "#22c55e", icon: "🟢" },
  };
  const config = configs[priority] || configs.medium;
  return <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: config.color }}>{config.icon} {priority}</span>;
};

const TypeIcon = ({ type }) => {
  const icons = {
    customer: { icon: "👤", label: "Customer", color: "#3b82f6" },
    restaurant: { icon: "🏪", label: "Restaurant", color: "#8b5cf6" },
    rider: { icon: "🛵", label: "Rider", color: "#10b981" },
  };
  const config = icons[type] || icons.customer;
  return <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: config.color }}>{config.icon} {config.label}</span>;
};

// ===================== DUMMY DATA =====================

// Tickets Data
const ticketsData = [
  { id: "TKT001", type: "customer", user: "Rahul Sharma", userAvatar: "R", subject: "Order not delivered yet", message: "I placed order #543 yesterday and haven't received it.", status: "open", priority: "high", date: "2026-05-24 10:30:00", lastReply: "2026-05-24 11:00:00", category: "Delivery Issue" },
  { id: "TKT002", type: "restaurant", user: "Pizza Paradise", userAvatar: "P", subject: "Payment settlement delayed", message: "Our restaurant hasn't received payment for orders from last week.", status: "in_progress", priority: "high", date: "2026-05-23 15:20:00", lastReply: "2026-05-23 16:45:00", category: "Payment Issue" },
  { id: "TKT003", type: "rider", user: "Rajesh Kumar", userAvatar: "R", subject: "App navigation issue", message: "The app navigation is showing wrong routes for delivery.", status: "pending", priority: "medium", date: "2026-05-23 09:15:00", lastReply: "2026-05-23 10:30:00", category: "Technical Issue" },
  { id: "TKT004", type: "customer", user: "Priya Mehta", userAvatar: "P", subject: "Wrong item received", message: "I ordered a Margherita pizza but received a Pepperoni pizza.", status: "resolved", priority: "medium", date: "2026-05-22 18:45:00", lastReply: "2026-05-23 09:00:00", category: "Wrong Item" },
  { id: "TKT005", type: "restaurant", user: "Burger Factory", userAvatar: "B", subject: "Menu update request", message: "Need to update our menu items and prices.", status: "closed", priority: "low", date: "2026-05-22 11:30:00", lastReply: "2026-05-22 14:00:00", category: "Account Issue" },
  { id: "TKT006", type: "rider", user: "Amit Singh", userAvatar: "A", subject: "Payment not credited", message: "My delivery earnings for May 20-22 haven't been credited.", status: "open", priority: "high", date: "2026-05-24 08:00:00", lastReply: "2026-05-24 09:30:00", category: "Payment Issue" },
];

// Chat Messages Data
const chatMessagesData = [
  { id: 1, sender: "customer", name: "Rahul Sharma", avatar: "R", message: "Hello, I need help with my order. It's been 2 hours and I haven't received it.", time: "10:30 AM", isRead: true, isOnline: true },
  { id: 2, sender: "support", name: "Support Agent", avatar: "S", message: "Hi Rahul! I'd be happy to help. Could you please share your order ID?", time: "10:32 AM", isRead: true, isOnline: true },
  { id: 3, sender: "customer", name: "Rahul Sharma", avatar: "R", message: "My order ID is #543. The tracking shows delivered but I didn't get it.", time: "10:33 AM", isRead: true, isOnline: true },
  { id: 4, sender: "support", name: "Support Agent", avatar: "S", message: "I apologize for the inconvenience. Let me check the status for you right away.", time: "10:35 AM", isRead: true, isOnline: true },
  { id: 5, sender: "support", name: "Support Agent", avatar: "S", message: "I see your order was marked delivered but the rider marked it incorrectly. I've contacted the rider and your order will be delivered in 10 minutes.", time: "10:36 AM", isRead: false, isOnline: true },
  { id: 6, sender: "customer", name: "Rahul Sharma", avatar: "R", message: "Thank you so much for your help! I really appreciate it.", time: "10:38 AM", isRead: false, isOnline: true },
  { id: 7, sender: "support", name: "Support Agent", avatar: "S", message: "You're welcome! Is there anything else I can help you with?", time: "10:39 AM", isRead: false, isOnline: true },
];

// Quick Questions Data
const quickQuestions = [
  { id: 1, question: "How do I track my order?", answer: "You can track your order from the Orders section in your dashboard. Click on 'Track Order' button next to your order.", category: "Order", helpful: 245 },
  { id: 2, question: "When will I receive my refund?", answer: "Refunds are processed within 5-7 business days after the refund is approved. You'll receive an email confirmation once processed.", category: "Payment", helpful: 189 },
  { id: 3, question: "How to become a delivery partner?", answer: "Please fill out the rider registration form from the Rider section. After verification, you'll be onboarded within 3 days.", category: "Rider", helpful: 156 },
  { id: 4, question: "How to update restaurant menu?", answer: "Go to Restaurant Dashboard > Menu Management > Edit Menu. You can add, edit, or remove items from there.", category: "Restaurant", helpful: 234 },
  { id: 5, question: "What is the commission structure?", answer: "Commission varies based on order value. Standard commission is 15% for orders above ₹500 and 20% for orders below ₹500.", category: "Payment", helpful: 167 },
  { id: 6, question: "How to reset password?", answer: "Click on 'Forgot Password' on the login page and follow the instructions. You'll receive a reset link on your email.", category: "Account", helpful: 312 },
];

// Active Chats Data
const activeChats = [
  { id: 1, name: "Rahul Sharma", type: "customer", lastMessage: "Thank you so much for your help!", time: "10:38 AM", unread: 0, avatar: "R", status: "online" },
  { id: 2, name: "Pizza Paradise", type: "restaurant", lastMessage: "Payment settlement delayed", time: "09:45 AM", unread: 2, avatar: "P", status: "away" },
  { id: 3, name: "Rajesh Kumar", type: "rider", lastMessage: "App navigation issue", time: "09:15 AM", unread: 0, avatar: "R", status: "online" },
  { id: 4, name: "Priya Mehta", type: "customer", lastMessage: "Thank you for resolving", time: "Yesterday", unread: 0, avatar: "P", status: "offline" },
  { id: 5, name: "Burger Factory", type: "restaurant", lastMessage: "Menu update request", time: "Yesterday", unread: 0, avatar: "B", status: "offline" },
];

// ===================== TICKET CARD =====================
const TicketCard = ({ ticket, onClick, isDark }) => {
  const t = getT(isDark);
  return (
    <div onClick={() => onClick(ticket)} style={{
      background: t.surface, border: `1px solid ${t.border}`, borderRadius: "14px", padding: "16px",
      cursor: "pointer", transition: "all 0.2s", marginBottom: "12px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 600, color: "#fff" }}>{ticket.userAvatar}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px", color: t.text }}>{ticket.user}</div>
            <div style={{ fontSize: "11px", color: t.textMuted }}>{ticket.date}</div>
          </div>
        </div>
        <StatusBadge status={ticket.status} isDark={isDark} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontWeight: 600, fontSize: "13px", color: t.text, marginBottom: "4px" }}>{ticket.subject}</div>
        <p style={{ fontSize: "11px", color: t.textMuted, margin: 0 }}>{ticket.message.substring(0, 70)}...</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", paddingTop: "10px", borderTop: `1px solid ${t.border}` }}>
        <TypeIcon type={ticket.type} />
        <PriorityBadge priority={ticket.priority} isDark={isDark} />
      </div>
    </div>
  );
};

// ===================== CHAT MESSAGE COMPONENT =====================
const ChatMessage = ({ message, isDark, isSupport }) => {
  const t = getT(isDark);
  return (
    <div style={{ display: "flex", justifyContent: isSupport ? "flex-start" : "flex-end", marginBottom: "16px" }}>
      <div style={{ display: "flex", gap: "10px", maxWidth: "75%", flexDirection: isSupport ? "row" : "row-reverse" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: isSupport ? "#1e3a8a" : t.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 600, color: "#fff"
        }}>{message.avatar}</div>
        <div style={{
          background: isSupport ? t.surfaceAlt : t.accent,
          borderRadius: "12px", padding: "10px 14px",
          borderTopLeftRadius: isSupport ? "4px" : "12px",
          borderTopRightRadius: isSupport ? "12px" : "4px",
        }}>
          <div style={{ fontSize: "12px", color: isSupport ? t.text : "#fff", marginBottom: "4px" }}>{message.message}</div>
          <div style={{ fontSize: "9px", color: isSupport ? t.textMuted : "rgba(255,255,255,0.7)", marginTop: "4px" }}>{message.time}</div>
        </div>
      </div>
    </div>
  );
};

// ===================== FAQ ACCORDION =====================
const FAQItem = ({ question, answer, isDark, isOpen, onToggle }) => {
  const t = getT(isDark);
  return (
    <div style={{ borderBottom: `1px solid ${t.border}`, padding: "12px 0" }}>
      <div onClick={() => onToggle(question.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 500, fontSize: "13px", color: t.text }}>
        <span>❓ {question.question}</span>
        <span style={{ fontSize: "12px", color: t.accent }}>{isOpen ? "▼" : "▶"}</span>
      </div>
      {isOpen && (
        <div style={{ marginTop: "8px", paddingLeft: "20px" }}>
          <p style={{ fontSize: "12px", color: t.textMuted, lineHeight: 1.5, margin: "0 0 8px 0" }}>{answer}</p>
          <Button variant="ghost" size="sm" style={{ fontSize: "10px", color: t.accent, padding: "4px 8px" }}>Was this helpful? 👍</Button>
        </div>
      )}
    </div>
  );
};

// ===================== MAIN SUPPORT SYSTEM =====================
const SupportSystem = ({ isDark = true }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState(ticketsData);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [chatMessages, setChatMessages] = useState(chatMessagesData);
  const [activeChatsList] = useState(activeChats);
  const [selectedChat, setSelectedChat] = useState(activeChats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [openQuestions, setOpenQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.user.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || ticket.type === typeFilter;
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const paginatedTickets = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  // Stats
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in_progress").length,
    resolved: tickets.filter(t => t.status === "resolved").length,
  };

  const tabs = [
    { id: "tickets", label: "🎫 Tickets", icon: "🎫", count: stats.total },
    { id: "chat", label: "💬 Chat Support", icon: "💬", count: chatMessages.filter(m => !m.isRead).length },
    { id: "faq", label: "❓ FAQ / Questions", icon: "❓", count: quickQuestions.length },
  ];

  const handleReplyToTicket = (ticketId, reply) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: "in_progress", lastReply: new Date().toLocaleString() } : t));
    alert(`Reply sent to ticket ${ticketId}`);
    setShowTicketModal(false);
  };

  const handleResolveTicket = (ticketId) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: "resolved" } : t));
    alert(`Ticket ${ticketId} marked as resolved`);
    setShowTicketModal(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: "support",
        name: "Support Agent",
        avatar: "S",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
        isOnline: true
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage("");
    }
  };

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const getStatsGrid = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(4, 1fr)";
  };

  const getChatLayout = () => {
    if (isMobile) return "1fr";
    return "300px 1fr";
  };

  // Ticket Detail Modal
  const TicketDetailModal = ({ ticket, onClose }) => {
    const [replyMessage, setReplyMessage] = useState("");
    return (
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div onClick={e => e.stopPropagation()} style={{ background: t.surface, borderRadius: "20px", width: "550px", maxWidth: "100%", maxHeight: "85vh", overflowY: "auto", border: `1px solid ${t.border}` }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: t.surfaceAlt }}>
            <div><h2 style={{ margin: 0, fontSize: "18px", color: t.text }}>🎫 Ticket Details</h2><p style={{ margin: "4px 0 0", fontSize: "12px", color: t.textMuted }}>{ticket.id}</p></div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}><CloseIcon /></button>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 600, color: "#fff" }}>{ticket.userAvatar}</div>
              <div><div style={{ fontWeight: 600, fontSize: "16px", color: t.text }}>{ticket.user}</div><div style={{ fontSize: "12px", color: t.textMuted }}>{ticket.category} • {ticket.date}</div></div>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}><StatusBadge status={ticket.status} isDark={isDark} /><PriorityBadge priority={ticket.priority} isDark={isDark} /></div>
            </div>
            <div style={{ marginBottom: "20px" }}><h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: t.text }}>{ticket.subject}</h4><p style={{ margin: 0, fontSize: "13px", lineHeight: 1.6, background: t.surfaceAlt, padding: "12px", borderRadius: "10px", color: t.textSub }}>{ticket.message}</p></div>
            <div style={{ marginBottom: "20px" }}><h4 style={{ margin: "0 0 12px 0", fontSize: "13px", color: t.text }}>💬 Reply to Ticket</h4><textarea rows="3" placeholder="Type your reply here..." value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} style={{ width: "100%", padding: "12px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: "10px", fontSize: "13px", resize: "vertical", color: t.text }} /></div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", paddingTop: "10px", borderTop: `1px solid ${t.border}` }}>
              <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: "8px", border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textMuted, cursor: "pointer" }}>Close</button>
              {ticket.status !== "resolved" && ticket.status !== "closed" && (<button onClick={() => handleResolveTicket(ticket.id)} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: t.success, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}><ResolveIcon /> Mark as Resolved</button>)}
              <button onClick={() => { handleReplyToTicket(ticket.id, replyMessage); onClose(); }} style={{ padding: "8px 20px", borderRadius: "8px", border: "none", background: t.accent, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}><SendIcon /> Send Reply</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: isMobile ? "16px" : isTablet ? "20px" : "24px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ margin: 0, fontSize: isMobile ? "20px" : "24px", fontWeight: 700, color: t.text }}>Support System</h1>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: t.textMuted }}>Manage customer, restaurant, and rider support tickets</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: getStatsGrid(), gap: "16px", marginBottom: "24px" }}>
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>{stats.total}</div>
            <div style={{ fontSize: "12px", color: t.textMuted }}>Total Tickets</div>
          </Card>
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: t.danger }}>{stats.open}</div>
            <div style={{ fontSize: "12px", color: t.textMuted }}>Open Tickets</div>
          </Card>
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: t.info }}>{stats.inProgress}</div>
            <div style={{ fontSize: "12px", color: t.textMuted }}>In Progress</div>
          </Card>
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: t.success }}>{stats.resolved}</div>
            <div style={{ fontSize: "12px", color: t.textMuted }}>Resolved</div>
          </Card>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: `1px solid ${t.border}`, paddingBottom: "12px", flexWrap: "wrap" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
              background: activeTab === tab.id ? t.accent : "transparent", color: activeTab === tab.id ? "#fff" : t.textMuted,
              border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"
            }}>
              {tab.label} {tab.count > 0 && <Badge style={{ background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : t.surfaceAlt, color: activeTab === tab.id ? "#fff" : t.text }}>{tab.count}</Badge>}
            </button>
          ))}
        </div>

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ position: "relative", width: isMobile ? "100%" : "280px" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}>🔍</span>
                <input type="text" placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 12px 10px 35px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "10px", fontSize: "13px", color: t.text }} />
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ padding: "8px 12px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", fontSize: "12px", color: t.text }}>
                  <option value="all">All Types</option><option value="customer">Customers</option><option value="restaurant">Restaurants</option><option value="rider">Riders</option>
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "8px 12px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", fontSize: "12px", color: t.text }}>
                  <option value="all">All Status</option><option value="open">Open</option><option value="pending">Pending</option><option value="in_progress">In Progress</option><option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div style={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}>
              {paginatedTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} onClick={(t) => { setSelectedTicket(t); setShowTicketModal(true); }} isDark={isDark} />)}
              {paginatedTickets.length === 0 && <div style={{ textAlign: "center", padding: "40px", color: t.textMuted }}>No tickets found</div>}
            </div>
            {totalPages > 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "20px", paddingTop: "20px", borderTop: `1px solid ${t.border}` }}>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ width: "32px", height: "32px", borderRadius: "8px", border: `1px solid ${t.border}`, background: t.surface, cursor: "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}><ChevronLeftIcon /></button>
                <span style={{ fontSize: "12px", color: t.text }}>{currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ width: "32px", height: "32px", borderRadius: "8px", border: `1px solid ${t.border}`, background: t.surface, cursor: "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}><ChevronRightIcon /></button>
              </div>
            )}
          </>
        )}

        {/* Chat Support Tab */}
        {activeTab === "chat" && (
          <div style={{ display: "grid", gridTemplateColumns: getChatLayout(), gap: "16px", background: t.surface, borderRadius: "16px", border: `1px solid ${t.border}`, overflow: "hidden", height: "calc(100vh - 280px)", minHeight: "500px" }}>
            {/* Chat List Sidebar */}
            <div style={{ borderRight: `1px solid ${t.border}`, overflowY: "auto" }}>
              <div style={{ padding: "16px", borderBottom: `1px solid ${t.border}` }}>
                <input type="text" placeholder="Search chats..." style={{ width: "100%", padding: "8px 12px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: "8px", fontSize: "12px", color: t.text }} />
              </div>
              {activeChatsList.map(chat => (
                <div key={chat.id} onClick={() => setSelectedChat(chat)} style={{
                  padding: "12px 16px", borderBottom: `1px solid ${t.border}`, cursor: "pointer",
                  background: selectedChat?.id === chat.id ? t.surfaceAlt : "transparent",
                  transition: "background 0.15s"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 600, color: "#fff" }}>{chat.avatar}</div>
                      <div style={{ position: "absolute", bottom: "0", right: "0", width: "10px", height: "10px", borderRadius: "50%", background: chat.status === "online" ? "#22c55e" : chat.status === "away" ? "#f59e0b" : "#94a3b8", border: `2px solid ${t.surface}` }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>{chat.name}</span>
                        <span style={{ fontSize: "10px", color: t.textMuted }}>{chat.time}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", color: t.textMuted }}>{chat.lastMessage}</span>
                        {chat.unread > 0 && <Badge style={{ background: t.accent, color: "#fff", padding: "2px 6px", fontSize: "10px" }}>{chat.unread}</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Messages Area */}
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Chat Header */}
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 600, color: "#fff" }}>{selectedChat?.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px", color: t.text }}>{selectedChat?.name}</div>
                    <div style={{ fontSize: "11px", color: selectedChat?.status === "online" ? t.success : t.textMuted }}>{selectedChat?.status === "online" ? "● Online" : selectedChat?.status === "away" ? "● Away" : "● Offline"}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button variant="outline" size="icon" style={{ width: "32px", height: "32px", borderColor: t.border }}><PhoneIcon /></Button>
                  <Button variant="outline" size="icon" style={{ width: "32px", height: "32px", borderColor: t.border }}><VideoIcon /></Button>
                  <Button variant="outline" size="icon" style={{ width: "32px", height: "32px", borderColor: t.border }}><MoreIcon /></Button>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                {chatMessages.map(msg => <ChatMessage key={msg.id} message={msg} isDark={isDark} isSupport={msg.sender === "support"} />)}
              </div>

              {/* Message Input */}
              <div style={{ padding: "16px 20px", borderTop: `1px solid ${t.border}`, display: "flex", gap: "12px" }}>
                <Button variant="outline" size="icon" style={{ width: "36px", height: "36px", borderColor: t.border }}><AttachIcon /></Button>
                <input type="text" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} style={{ flex: 1, padding: "10px 14px", background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: "12px", fontSize: "13px", color: t.text }} />
                <Button onClick={handleSendMessage} style={{ background: t.accent, color: "#fff", width: "36px", height: "36px", padding: 0 }}><SendIcon /></Button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px" }}>
            <CardHeader><CardTitle style={{ color: t.text }}>❓ Frequently Asked Questions</CardTitle></CardHeader>
            <CardContent>
              {quickQuestions.map(q => <FAQItem key={q.id} question={q} answer={q.answer} isDark={isDark} isOpen={openQuestions.includes(q.id)} onToggle={toggleQuestion} />)}
              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: `1px solid ${t.border}`, textAlign: "center" }}>
                <p style={{ fontSize: "13px", color: t.textMuted }}>Still have questions?</p>
                <Button style={{ background: t.accent, color: "#fff" }}>Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {showTicketModal && selectedTicket && <TicketDetailModal ticket={selectedTicket} onClose={() => setShowTicketModal(false)} />}
    </div>
  );
};

export default SupportSystem;