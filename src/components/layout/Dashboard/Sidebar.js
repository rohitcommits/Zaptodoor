import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const menuData = [
  {
    section: "DASHBOARDS",
    items: [
      {
        name: "Dashboards",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
        hasDropdown: false,
        path: "/dashboard"
      },
    ],
  },
  {
    section: "APPS",
    items: [
      {
        name: "Users",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16" fill="currentColor">
            <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z"/>
          </svg>
        ),
        path: "/Dashboard/Userstable"
      },
      {
        name: "Restaurants",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16" fill="currentColor">
            <path d="M127.9 78.4C127.1 70.2 120.2 64 112 64C103.8 64 96.9 70.2 96 78.3L81.9 213.7C80.6 219.7 80 225.8 80 231.9C80 277.8 115.1 315.5 160 319.6L160 544C160 561.7 174.3 576 192 576C209.7 576 224 561.7 224 544L224 319.6C268.9 315.5 304 277.8 304 231.9C304 225.8 303.4 219.7 302.1 213.7L287.9 78.3C287.1 70.2 280.2 64 272 64C263.8 64 256.9 70.2 256.1 78.4L242.5 213.9C241.9 219.6 237.1 224 231.4 224C225.6 224 220.8 219.6 220.2 213.8L207.9 78.6C207.2 70.3 200.3 64 192 64C183.7 64 176.8 70.3 176.1 78.6L163.8 213.8C163.3 219.6 158.4 224 152.6 224C146.8 224 142 219.6 141.5 213.9L127.9 78.4zM512 64C496 64 384 96 384 240L384 352C384 387.3 412.7 416 448 416L480 416L480 544C480 561.7 494.3 576 512 576C529.7 576 544 561.7 544 544L544 96C544 78.3 529.7 64 512 64z" />
          </svg>
        ),
        path: "/Dashboard/Restaurant"
      },
      {
        name: "Riders",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16" fill="currentColor">
            <path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/>
          </svg>
        ),
        hasDropdown: false,
        path: "/Dashboard/Drivers"
      },
        {
        name: "Payments",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16" fill="currentColor">
    <path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/>
  </svg>




        ),
        hasDropdown: false,
        path: "/Dashboard/Payment"
      },
      {
        name: "Orders",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        ),
        hasDropdown: false,
        path: "/Dashboard/orders"
      },
      {
        name: "Coupons",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        ),
        hasDropdown: false,
        path: "/Dashboard/Coupons"
      },
    ],
  },
  {
    section: "DISHES",
    items: [
      {
        name: "Main Categories",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          </svg>
        ),
        hasDropdown: false,
        path: "/Dashboard/maincategories"
      },
      {
        name: "Categories",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
        hasDropdown: false,
        path: "/Dashboard/categories"
      },
      {
        name: "Sub Categories",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        ),
        hasDropdown: false,
        path: "/Dashboard/SubCategories"
      },
    ],
  },
 {
  section: "Reports",
  items: [
    {
      name: "Reports",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
          <polyline points="15 2 21 8 15 8" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="14" x2="16" y2="14" />
          <line x1="12" y1="18" x2="12" y2="18" />
        </svg>
      ),
      path: "/Dashboard/Reports"
    },
  ]
},
  {
    section: "SUPPORT",
    items: [
      {
        name: "Support",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        ),
        path: "/Dashboard/Support"
      },
      {
        name: "Tickets",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        ),
        path: "/Dashboard/tickets"
      },
      {
        name: "Notifications",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        ),
        path: "/Dashboard/Notification"
      },
      {
        name: "Send Notifications",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        ),
        path: "/Dashboard/sendnotifications"
      },
      {
        name: "Live Status",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
          </svg>
        ),
        path: "/Dashboard/livestatus"
      }
    ]
  },
  {
    section: "CONTENT",
    items: [
      {
        name: "Banners",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="9" cy="14" r="1.5" />
          </svg>
        ),
        path: "/Dashboard/banners"
      },
      {
        name: "FAQ",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
        path: "/Dashboard/faq"
      }
    ]
  },
  {
    section: "WEBSITE",
    items: [
      {
        name: "Website",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <circle cx="7" cy="9" r="1" />
          </svg>
        ),
        path: "/Dashboard/Website"
      },
      {
        name: "Web Banners",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <circle cx="7" cy="9" r="1" />
          </svg>
        ),
        path: "/Dashboard/WebBanners"
      },
      {
        name: "Pages",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <line x1="8" y1="8" x2="16" y2="8" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="12" y2="16" />
          </svg>
        ),
        path: "/Dashboard/pages"
      },
      {
        name: "Services",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="8" width="18" height="12" rx="2" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <circle cx="7" cy="16" r="1" />
          </svg>
        ),
        path: "/Dashboard/servicesA"
      },
      {
        name: "Choose Us",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 12v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4" />
            <polyline points="16 8 12 4 8 8" />
            <line x1="12" y1="4" x2="12" y2="16" />
            <circle cx="12" cy="20" r="1" />
          </svg>
        ),
        path: "/Dashboard/ChooseUs"
      },
      {
        name: "Press Release",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <polygon points="9 9 15 12 9 15 9 9" />
            <line x1="18" y1="9" x2="18" y2="15" />
          </svg>
        ),
        path: "/Dashboard/PressRelease"
      },
      {
        name: "Enquiries",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" />
            <circle cx="15" cy="10" r="1" />
          </svg>
        ),
        path: "/Dashboard/enquiries"
      },
      {
        name: "Footer Certificates",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ),
        path: "/Dashboard/footercertificates"
      }
    ]
  },
  {
    section: "DEV FEEDBACK",
    items: [
      {
        name: "Dev Feedback",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
          </svg>
        ),
        path: "/Dashboard/devfeedback"
      }
    ]
  }
];

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const CollapseIcon = ({ collapsed }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
    transition: "transform 0.3s ease",
    transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
  }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const styles = {
  dark: {
    sidebar: { background: "#1a1f2e", border: "1px solid rgba(255,255,255,0.06)" },
    logo: { color: "#fff" },
    logoAccent: { color: "#6c63ff" },
    section: { color: "#4a5568" },
    item: { color: "#94a3b8" },
    itemHover: { background: "rgba(108,99,255,0.12)", color: "#fff" },
    itemActive: { background: "rgba(108,99,255,0.2)", color: "#a89fff" },
    activeBar: { background: "#6c63ff" },
    sub: { color: "#64748b" },
    subHover: { color: "#94a3b8" },
    subActive: { color: "#a89fff" },
    subDot: { background: "#6c63ff" },
    toggle: { background: "rgba(255,255,255,0.07)", color: "#94a3b8" },
    toggleHover: { background: "rgba(255,255,255,0.12)" },
    collapseBtn: { background: "#252c3d", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" },
  },
  light: {
    sidebar: { background: "#ffffff", border: "1px solid #e8ecf4" },
    logo: { color: "#1e293b" },
    logoAccent: { color: "#6c63ff" },
    section: { color: "#94a3b8" },
    item: { color: "#475569" },
    itemHover: { background: "rgba(108,99,255,0.08)", color: "#1e293b" },
    itemActive: { background: "rgba(108,99,255,0.1)", color: "#6c63ff" },
    activeBar: { background: "#6c63ff" },
    sub: { color: "#94a3b8" },
    subHover: { color: "#475569" },
    subActive: { color: "#6c63ff" },
    subDot: { background: "#6c63ff" },
    toggle: { background: "#f1f5f9", color: "#64748b" },
    toggleHover: { background: "#e2e8f0" },
    collapseBtn: { background: "#f8fafc", border: "1px solid #e2e8f0", color: "#64748b" },
  },
};

const Sidebar = ({
  activeItem = "Dashboards",
  setActiveItem,
  isSidebarCollapsed = false,
  setIsSidebarCollapsed,
  isDark = true,
  setIsDark,
  onMobileClose,
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredToggle, setHoveredToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const theme = isDark ? styles.dark : styles.light;

  const handleNavigation = (path, name) => {
    setActiveItem(name);
    if (path) navigate(path);
    if (isMobile && onMobileClose) onMobileClose();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: isSidebarCollapsed && !isMobile ? "68px" : isMobile ? "260px" : "240px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          boxShadow: isDark ? "4px 0 24px rgba(0,0,0,0.3)" : "4px 0 24px rgba(0,0,0,0.06)",
          ...theme.sidebar,
        }}
      >
        {/* Logo */}
        <div style={{
          padding: isSidebarCollapsed && !isMobile ? "20px 0" : "20px 20px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: (isSidebarCollapsed && !isMobile) ? "center" : "flex-start",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f1f5f9",
          marginBottom: "8px",
          flexShrink: 0,
        }}>
          <div style={{ 
            flexShrink: 0,
            width: (isSidebarCollapsed && !isMobile) ? "32px" : "36px",
            height: (isSidebarCollapsed && !isMobile) ? "32px" : "36px",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#141824" : "#ffffff",
          }}>
            <img 
              src="https://thumbs.dreamstime.com/b/initial-letter-zd-logotype-company-name-colored-blue-grey-swoosh-design-vector-logo-business-company-identity-initial-199364284.jpg"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%236c63ff'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20' font-weight='bold'%3EZD%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          {(!isSidebarCollapsed || isMobile) && (
            <span style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.3px", ...theme.logo }}>
              Admin<span style={theme.logoAccent}>Panel</span>
            </span>
          )}
        </div>

        {/* Scrollable menu */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: "12px",
          scrollbarWidth: "thin",
        }}>
          {menuData.map((group) => (
            <div key={group.section} style={{ marginBottom: "4px" }}>
              {(!isSidebarCollapsed || isMobile) && (
                <div style={{ padding: "12px 20px 4px", fontSize: "10px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", ...theme.section }}>
                  {group.section}
                </div>
              )}
              {(isSidebarCollapsed && !isMobile) && <div style={{ height: "8px" }} />}

              {group.items.map((item) => {
                const active = activeItem === item.name;
                const hovered = hoveredItem === item.name;

                return (
                  <div key={item.name}>
                    <div
                      onClick={() => handleNavigation(item.path, item.name)}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      title={(isSidebarCollapsed && !isMobile) ? item.name : ""}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: (isSidebarCollapsed && !isMobile) ? "10px 0" : "9px 20px",
                        justifyContent: (isSidebarCollapsed && !isMobile) ? "center" : "flex-start",
                        cursor: "pointer",
                        position: "relative",
                        borderRadius: (isSidebarCollapsed && !isMobile) ? "0" : "0 8px 8px 0",
                        margin: (isSidebarCollapsed && !isMobile) ? "2px 0" : "1px 10px 1px 0",
                        transition: "all 0.15s ease",
                        ...(active ? theme.itemActive : hovered ? theme.itemHover : { color: theme.item.color }),
                      }}
                    >
                      {active && (
                        <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "3px", height: "60%", borderRadius: "0 3px 3px 0", ...theme.activeBar }} />
                      )}
                      <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {item.icon}
                      </span>
                      {(!isSidebarCollapsed || isMobile) && (
                        <span style={{ flex: 1, fontSize: "13.5px", fontWeight: active ? 600 : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.name}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom controls */}
        <div style={{
          padding: (isSidebarCollapsed && !isMobile) ? "12px 0" : "12px 16px",
          borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f1f5f9",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: (isSidebarCollapsed && !isMobile) ? "center" : "space-between",
          flexShrink: 0,
        }}>
          <button
            onClick={() => setIsDark(!isDark)}
            onMouseEnter={() => setHoveredToggle(true)}
            onMouseLeave={() => setHoveredToggle(false)}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: (isSidebarCollapsed && !isMobile) ? "7px" : "7px 12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
              transition: "all 0.15s ease",
              ...(hoveredToggle ? theme.toggleHover : theme.toggle),
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            {(!isSidebarCollapsed || isMobile) && (
              <span>{isDark ? "Light" : "Dark"}</span>
            )}
          </button>

          {!isMobile && (
            !isSidebarCollapsed ? (
              <button onClick={() => setIsSidebarCollapsed(true)} title="Collapse Sidebar" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "8px", cursor: "pointer", transition: "all 0.15s ease", ...theme.collapseBtn }}>
                <CollapseIcon collapsed={false} />
              </button>
            ) : (
              <button onClick={() => setIsSidebarCollapsed(false)} title="Expand Sidebar" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "8px", cursor: "pointer", transition: "all 0.15s ease", marginTop: "8px", ...theme.collapseBtn }}>
                <CollapseIcon collapsed={true} />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;