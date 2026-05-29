import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import ExportRestaurantsModal from "./ExportRestaurantsModal";

// ─────────────────────────────────────────────────────────────────────────────
// API CONFIG
// ─────────────────────────────────────────────────────────────────────────────
// const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://your-api.com/api";

// const getAuthHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
// });

// ─────────────────────────────────────────────────────────────────────────────
// EXTENSIVE DUMMY DATA (20+ RESTAURANTS)
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_RESTAURANTS = [
  {
    id: "R001",
    restroId: "R001",
    name: "Pizza Paradise",
    contact: "+91 98765 43210",
    password: "pizza123",
    status: "Active",
    ready: "Yes",
    onOff: "ON",
    shiftStart: "09:00 AM",
    shiftEnd: "11:00 PM",
    pic: null,
    rating: 4.8,
    totalRatings: 1250,
    totalReviews: 892,
    totalPayments: 245000,
    pendingPayments: 45000,
    completedPayments: 200000,
    menu: [
      { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, description: "Classic cheese and tomato pizza", isAvailable: true },
      { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 399, description: "Spicy pepperoni with cheese", isAvailable: true },
      { id: 3, name: "Garlic Bread", category: "Starters", price: 99, description: "Fresh baked garlic bread", isAvailable: true },
      { id: 4, name: "Coca Cola", category: "Beverages", price: 49, description: "Cold drink", isAvailable: true },
    ],
    schedule: [
      { day: "Monday", openTime: "09:00", closeTime: "23:00", isClosed: false },
      { day: "Tuesday", openTime: "09:00", closeTime: "23:00", isClosed: false },
      { day: "Wednesday", openTime: "09:00", closeTime: "23:00", isClosed: false },
      { day: "Thursday", openTime: "09:00", closeTime: "23:00", isClosed: false },
      { day: "Friday", openTime: "09:00", closeTime: "23:00", isClosed: false },
      { day: "Saturday", openTime: "10:00", closeTime: "00:00", isClosed: false },
      { day: "Sunday", openTime: "10:00", closeTime: "22:00", isClosed: false },
    ]
  },
  {
    id: "R002",
    restroId: "R002",
    name: "Burger Factory",
    contact: "+91 87654 32109",
    password: "burger456",
    status: "Active",
    ready: "Yes",
    onOff: "ON",
    shiftStart: "10:00 AM",
    shiftEnd: "10:00 PM",
    pic: null,
    rating: 4.5,
    totalRatings: 980,
    totalReviews: 654,
    totalPayments: 189000,
    pendingPayments: 23000,
    completedPayments: 166000,
    menu: [
      { id: 1, name: "Classic Burger", category: "Burgers", price: 149, description: "Beef patty with lettuce and tomato", isAvailable: true },
      { id: 2, name: "Cheese Burger", category: "Burgers", price: 179, description: "Classic burger with extra cheese", isAvailable: true },
      { id: 3, name: "French Fries", category: "Sides", price: 79, description: "Crispy golden fries", isAvailable: true },
      { id: 4, name: "Milkshake", category: "Beverages", price: 99, description: "Thick creamy milkshake", isAvailable: false },
    ],
    schedule: [
      { day: "Monday", openTime: "10:00", closeTime: "22:00", isClosed: false },
      { day: "Tuesday", openTime: "10:00", closeTime: "22:00", isClosed: false },
      { day: "Wednesday", openTime: "10:00", closeTime: "22:00", isClosed: false },
      { day: "Thursday", openTime: "10:00", closeTime: "22:00", isClosed: false },
      { day: "Friday", openTime: "10:00", closeTime: "23:00", isClosed: false },
      { day: "Saturday", openTime: "11:00", closeTime: "23:00", isClosed: false },
      { day: "Sunday", openTime: "11:00", closeTime: "21:00", isClosed: false },
    ]
  },
  {
    id: "R003",
    restroId: "R003",
    name: "Sushi Central",
    contact: "+91 76543 21098",
    password: "sushi789",
    status: "Active",
    ready: "No",
    onOff: "OFF",
    shiftStart: "11:00 AM",
    shiftEnd: "09:00 PM",
    pic: null,
    rating: 4.9,
    totalRatings: 2100,
    totalReviews: 1543,
    totalPayments: 567000,
    pendingPayments: 89000,
    completedPayments: 478000,
    menu: [
      { id: 1, name: "California Roll", category: "Sushi", price: 299, description: "Crab, avocado, cucumber", isAvailable: true },
      { id: 2, name: "Dragon Roll", category: "Sushi", price: 399, description: "Eel, avocado, cucumber", isAvailable: true },
      { id: 3, name: "Miso Soup", category: "Soups", price: 89, description: "Traditional Japanese soup", isAvailable: true },
      { id: 4, name: "Green Tea", category: "Beverages", price: 49, description: "Fresh brewed green tea", isAvailable: true },
    ],
    schedule: [
      { day: "Monday", openTime: "11:00", closeTime: "21:00", isClosed: false },
      { day: "Tuesday", openTime: "11:00", closeTime: "21:00", isClosed: false },
      { day: "Wednesday", openTime: "11:00", closeTime: "21:00", isClosed: false },
      { day: "Thursday", openTime: "11:00", closeTime: "21:00", isClosed: false },
      { day: "Friday", openTime: "11:00", closeTime: "22:00", isClosed: false },
      { day: "Saturday", openTime: "12:00", closeTime: "22:00", isClosed: false },
      { day: "Sunday", openTime: "12:00", closeTime: "20:00", isClosed: true },
    ]
  },
  {
    id: "R004",
    restroId: "R004",
    name: "Taco Bell Express",
    contact: "+91 65432 10987",
    password: "taco321",
    status: "Inactive",
    ready: "Yes",
    onOff: "OFF",
    shiftStart: "08:00 AM",
    shiftEnd: "08:00 PM",
    pic: null,
    rating: 4.2,
    totalRatings: 560,
    totalReviews: 398,
    totalPayments: 98000,
    pendingPayments: 12000,
    completedPayments: 86000,
    menu: [
      { id: 1, name: "Crunchy Taco", category: "Tacos", price: 89, description: "Crispy shell with seasoned beef", isAvailable: true },
      { id: 2, name: "Soft Taco", category: "Tacos", price: 89, description: "Soft flour tortilla", isAvailable: true },
      { id: 3, name: "Nachos", category: "Sides", price: 129, description: "Cheesy nachos with salsa", isAvailable: true },
      { id: 4, name: "Burrito", category: "Main", price: 199, description: "Large flour tortilla filled", isAvailable: false },
    ],
    schedule: [
      { day: "Monday", openTime: "08:00", closeTime: "20:00", isClosed: false },
      { day: "Tuesday", openTime: "08:00", closeTime: "20:00", isClosed: false },
      { day: "Wednesday", openTime: "08:00", closeTime: "20:00", isClosed: false },
      { day: "Thursday", openTime: "08:00", closeTime: "20:00", isClosed: false },
      { day: "Friday", openTime: "08:00", closeTime: "21:00", isClosed: false },
      { day: "Saturday", openTime: "09:00", closeTime: "21:00", isClosed: false },
      { day: "Sunday", openTime: "09:00", closeTime: "18:00", isClosed: false },
    ]
  },
  {
    id: "R005",
    restroId: "R005",
    name: "Indian Spice",
    contact: "+91 54321 09876",
    password: "spice654",
    status: "Active",
    ready: "Yes",
    onOff: "ON",
    shiftStart: "10:00 AM",
    shiftEnd: "11:30 PM",
    pic: null,
    rating: 4.7,
    totalRatings: 3450,
    totalReviews: 2678,
    totalPayments: 876000,
    pendingPayments: 156000,
    completedPayments: 720000,
    menu: [
      { id: 1, name: "Butter Chicken", category: "Main Course", price: 349, description: "Creamy tomato based curry", isAvailable: true },
      { id: 2, name: "Naan", category: "Breads", price: 39, description: "Tandoor baked flatbread", isAvailable: true },
      { id: 3, name: "Biryani", category: "Rice", price: 299, description: "Aromatic spiced rice", isAvailable: true },
      { id: 4, name: "Gulab Jamun", category: "Desserts", price: 79, description: "Sweet milk dumplings", isAvailable: true },
    ],
    schedule: [
      { day: "Monday", openTime: "10:00", closeTime: "23:30", isClosed: false },
      { day: "Tuesday", openTime: "10:00", closeTime: "23:30", isClosed: false },
      { day: "Wednesday", openTime: "10:00", closeTime: "23:30", isClosed: false },
      { day: "Thursday", openTime: "10:00", closeTime: "23:30", isClosed: false },
      { day: "Friday", openTime: "10:00", closeTime: "00:00", isClosed: false },
      { day: "Saturday", openTime: "11:00", closeTime: "00:00", isClosed: false },
      { day: "Sunday", openTime: "11:00", closeTime: "23:00", isClosed: false },
    ]
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// API FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

const apiGetRestaurants = async ({ page, perPage, search, status, ready, onOff }) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filtered = [...DUMMY_RESTAURANTS];
  
  if (search) {
    filtered = filtered.filter(r => 
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.contact.includes(search) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (status && status !== "All") {
    filtered = filtered.filter(r => r.status === status);
  }
  if (ready && ready !== "All") {
    filtered = filtered.filter(r => r.ready === ready);
  }
  if (onOff && onOff !== "All") {
    filtered = filtered.filter(r => r.onOff === onOff);
  }
  
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  
  return {
    data: paginated,
    total: filtered.length,
    page,
    limit: perPage
  };
};

const apiUpdateRestaurant = async (id, payload) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("Updating restaurant:", id, payload);
  return { success: true, id, ...payload };
};

const apiDeleteRestaurants = async (ids) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("Deleting restaurants:", ids);
  return { success: true, deletedIds: ids };
};

const apiAddRestaurant = async (restaurantData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newId = `R${String(DUMMY_RESTAURANTS.length + 1).padStart(3, '0')}`;
  console.log("Adding restaurant:", restaurantData);
  return { success: true, id: newId, ...restaurantData };
};

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
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
const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="2" rx="1"/>
    <rect x="3" y="11" width="18" height="2" rx="1"/>
    <rect x="3" y="18" width="18" height="2" rx="1"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const PaymentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
    <line x1="16" y1="14" x2="18" y2="14"/>
  </svg>
);
const MoreVerticalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const config = {
    Active:   { bg: "rgba(20,184,166,0.15)", color: "#14b8a6", dot: "#14b8a6" },
    Inactive: { bg: "rgba(148,163,184,0.12)", color: "#94a3b8", dot: "#94a3b8" },
  };
  const c = config[status] || config.Inactive;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px 3px 8px", borderRadius: "20px",
      background: c.bg, border: `1px solid ${c.bg}`,
    }}>
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.dot }} />
      <span style={{ fontSize: "11px", fontWeight: 600, color: c.color }}>{status}</span>
    </div>
  );
};

const ReadyBadge = ({ ready }) => {
  const config = {
    Yes: { bg: "rgba(20,184,166,0.15)", color: "#14b8a6" },
    No:  { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  };
  const c = config[ready] || config.No;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "12px", fontSize: "11px",
      fontWeight: 600, background: c.bg, color: c.color,
    }}>{ready}</span>
  );
};

const OnOffBadge = ({ value }) => {
  const config = {
    ON:  { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
    OFF: { bg: "rgba(148,163,184,0.12)", color: "#94a3b8" },
  };
  const c = config[value] || config.OFF;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "12px", fontSize: "11px",
      fontWeight: 700, background: c.bg, color: c.color,
    }}>{value}</span>
  );
};

const Checkbox = ({ checked, onChange }) => (
  <div onClick={onChange} style={{
    width: "16px", height: "16px", borderRadius: "4px",
    border: checked ? "2px solid #3b82f6" : "2px solid #3a4460",
    background: checked ? "#3b82f6" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.15s ease",
  }}>
    {checked && (
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )}
  </div>
);

const AvatarPlaceholder = ({ name }) => (
  <div style={{
    width: "34px", height: "34px", borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "14px", fontWeight: 600, color: "#fff",
  }}>
    {name?.charAt(0) || "🍔"}
  </div>
);

const Toast = ({ message, type, onClose }) => (
  <div style={{
    position: "fixed", bottom: "24px", right: "24px", zIndex: 999,
    background: type === "error" ? "#1a0a0a" : "#0a1a0a",
    border: `1px solid ${type === "error" ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.4)"}`,
    borderRadius: "10px", padding: "12px 18px",
    display: "flex", alignItems: "center", gap: "10px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    animation: "slideUp 0.25s ease",
  }}>
    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: type === "error" ? "#ef4444" : "#10b981" }} />
    <span style={{ fontSize: "13px", color: type === "error" ? "#fca5a5" : "#6ee7b7", flex: 1 }}>{message}</span>
    <span onClick={onClose} style={{ cursor: "pointer", color: "#64748b", fontSize: "16px" }}>×</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// RESTAURANT MENU MODAL
// ─────────────────────────────────────────────────────────────────────────────
const RestaurantMenuModal = ({ restaurant, onClose, isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const categories = ["all", ...new Set(restaurant.menu?.map(item => item.category) || [])];
  
  const filteredItems = selectedCategory === "all" 
    ? restaurant.menu || [] 
    : (restaurant.menu || []).filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: newQuantity } : i));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 400,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflowY: "auto", padding: "20px"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: isDark ? "#0d1117" : "#ffffff",
        borderRadius: "20px", width: "1000px", maxWidth: "100%",
        maxHeight: "85vh", display: "flex", flexDirection: "column",
        border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: isDark ? "#141824" : "#f8fafc", borderRadius: "20px 20px 0 0"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "20px", color: isDark ? "#f1f5f9" : "#1e293b" }}>
              🍽️ Menu - {restaurant.name}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>
              {restaurant.menu?.length || 0} items available
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setShowCart(!showCart)} style={{
              background: showCart ? "#1e3a8a" : "none", border: "1px solid #3b82f6",
              borderRadius: "8px", padding: "6px 12px", color: "#3b82f6", cursor: "pointer",
              fontSize: "12px", display: "flex", alignItems: "center", gap: "6px"
            }}>
              🛒 Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </button>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b" }}>×</button>
          </div>
        </div>

        {/* Categories */}
        <div style={{ padding: "16px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 16px", borderRadius: "20px", border: "1px solid",
                borderColor: selectedCategory === cat ? "#3b82f6" : (isDark ? "#1e2740" : "#e2e8f0"),
                background: selectedCategory === cat ? "#1e3a8a" : "none",
                color: selectedCategory === cat ? "#93c5fd" : (isDark ? "#94a3b8" : "#64748b"),
                cursor: "pointer", fontSize: "12px"
              }}
            >
              {cat === "all" ? "All Items" : cat}
            </button>
          ))}
        </div>

        {/* Main Content - Menu Items + Cart */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Menu Items */}
          <div style={{ flex: showCart ? 2 : 3, padding: "20px", overflowY: "auto", maxHeight: "calc(85vh - 150px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {filteredItems.map(item => (
                <div key={item.id} style={{
                  background: isDark ? "#141824" : "#f8fafc",
                  borderRadius: "12px", padding: "16px",
                  border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
                  transition: "all 0.2s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                    <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: isDark ? "#f1f5f9" : "#1e293b" }}>
                      {item.name}
                    </h4>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#3b82f6" }}>₹{item.price}</span>
                  </div>
                  <p style={{ fontSize: "11px", color: isDark ? "#94a3b8" : "#64748b", margin: "0 0 12px 0" }}>
                    {item.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontSize: "10px", padding: "2px 8px", borderRadius: "10px",
                      background: item.isAvailable ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                      color: item.isAvailable ? "#22c55e" : "#ef4444"
                    }}>
                      {item.isAvailable ? "Available" : "Out of Stock"}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.isAvailable}
                      style={{
                        padding: "6px 14px", borderRadius: "8px", border: "none",
                        background: item.isAvailable ? "#4a6cf7" : "#3a4460",
                        color: "white", cursor: item.isAvailable ? "pointer" : "not-allowed",
                        fontSize: "11px", fontWeight: 500
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filteredItems.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                No items in this category
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div style={{
              width: "320px", borderLeft: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
              background: isDark ? "#0f1520" : "#ffffff", display: "flex", flexDirection: "column",
              overflowY: "auto", maxHeight: "calc(85vh - 150px)"
            }}>
              <div style={{ padding: "16px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
                <h4 style={{ margin: 0, fontSize: "14px" }}>Your Cart</h4>
              </div>
              <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
                {cart.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#64748b", fontSize: "12px", padding: "20px" }}>Cart is empty</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 500 }}>{item.name}</span>
                        <span style={{ fontSize: "12px", color: "#3b82f6" }}>₹{item.price * item.quantity}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: "24px", height: "24px", borderRadius: "4px", border: "1px solid #1e2740", background: "none", cursor: "pointer" }}>-</button>
                          <span style={{ fontSize: "12px", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: "24px", height: "24px", borderRadius: "4px", border: "1px solid #1e2740", background: "none", cursor: "pointer" }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "11px" }}>Remove</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div style={{ padding: "16px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600 }}>Total:</span>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#3b82f6" }}>₹{totalAmount}</span>
                  </div>
                  <button style={{
                    width: "100%", padding: "10px", background: "#4a6cf7", color: "white",
                    border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600
                  }}>
                    Place Order
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 24px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          background: isDark ? "#141824" : "#f8fafc", borderRadius: "0 0 20px 20px",
          fontSize: "11px", color: "#64748b", textAlign: "center"
        }}>
          <span>⏰ {restaurant.shiftStart} - {restaurant.shiftEnd} | 📞 {restaurant.contact}</span>
        </div>
      </div>
    </div>
  );
};

// Double Confirmation Modal Component
const DoubleConfirmModal = ({ isOpen, onConfirm, onCancel, title, message, isDark }) => {
  const [step, setStep] = useState(1);
  const [confirmText, setConfirmText] = useState("");

  if (!isOpen) return null;

  const handleFirstConfirm = () => setStep(2);
  const handleFinalConfirm = () => { if (confirmText === "CONFIRM") { onConfirm(); setStep(1); setConfirmText(""); } };
  const handleCancel = () => { setStep(1); setConfirmText(""); onCancel(); };

  return (
    <div onClick={handleCancel} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#141824" : "#ffffff", borderRadius: "16px", padding: "28px", width: "380px", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", textAlign: "center" }}>
        {step === 1 ? (
          <>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>{title}</h3>
            <p style={{ margin: "0 0 24px", fontSize: "13px", color: "#94a3b8" }}>{message}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleCancel} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleFirstConfirm} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#ef4444", color: "white", cursor: "pointer" }}>Yes, Proceed</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>Final Confirmation</h3>
            <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#94a3b8" }}>Type <strong style={{ color: "#ef4444" }}>CONFIRM</strong> to permanently delete this item.</p>
            <input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value.toUpperCase())} placeholder="Type CONFIRM" style={{ width: "100%", padding: "10px", marginBottom: "20px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px", textAlign: "center", fontSize: "14px" }} />
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleCancel} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleFinalConfirm} disabled={confirmText !== "CONFIRM"} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: confirmText === "CONFIRM" ? "#ef4444" : "#3a4460", color: confirmText === "CONFIRM" ? "white" : "#64748b", cursor: confirmText === "CONFIRM" ? "pointer" : "not-allowed" }}>Delete Permanently</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Add Restaurant Modal
const AddRestaurantModal = ({ isOpen, onClose, onAdd, isDark }) => {
  const [formData, setFormData] = useState({ name: "", contact: "", password: "", status: "Active", ready: "Yes", onOff: "ON", shiftStart: "09:00 AM", shiftEnd: "09:00 PM" });
  if (!isOpen) return null;
  const handleSubmit = () => { if (!formData.name || !formData.contact) { alert("Please fill required fields"); return; } onAdd(formData); onClose(); setFormData({ name: "", contact: "", password: "", status: "Active", ready: "Yes", onOff: "ON", shiftStart: "09:00 AM", shiftEnd: "09:00 PM" }); };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#141824" : "#ffffff", borderRadius: "16px", padding: "28px", width: "450px", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}><h3 style={{ margin: 0, fontSize: "18px" }}>➕ Add New Restaurant</h3><button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: "20px" }}>×</button></div>
        <div style={{ marginBottom: "16px" }}><label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "5px" }}>Restaurant Name *</label><input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "10px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px" }} /></div>
        <div style={{ marginBottom: "16px" }}><label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "5px" }}>Contact Number *</label><input value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} style={{ width: "100%", padding: "10px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px" }} /></div>
        <div style={{ marginBottom: "16px" }}><label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "5px" }}>Password</label><input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ width: "100%", padding: "10px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px" }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}><div><label style={{ fontSize: "11px", color: "#64748b" }}>Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={{ width: "100%", padding: "8px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "6px" }}><option>Active</option><option>Inactive</option></select></div><div><label style={{ fontSize: "11px", color: "#64748b" }}>Ready</label><select value={formData.ready} onChange={(e) => setFormData({ ...formData, ready: e.target.value })} style={{ width: "100%", padding: "8px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "6px" }}><option>Yes</option><option>No</option></select></div></div>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}><button onClick={onClose} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button><button onClick={handleSubmit} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#4a6cf7", color: "white", cursor: "pointer" }}>Add Restaurant</button></div>
      </div>
    </div>
  );
};

// Action Menu Dropdown Component
const ActionMenuDropdown = ({ restaurant, onEdit, onDelete, onViewSchedule, onViewMenu, onViewDetails, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleAction = (action) => { setIsOpen(false); action(); };
  return (
    <div style={{ position: "relative" }}>
      <button onClick={toggleMenu} className="action-btn" style={{ background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8", padding: "6px 10px", borderRadius: "6px", display: "flex", alignItems: "center" }} title="More Actions"><MoreVerticalIcon /></button>
      {isOpen && (<><div onClick={() => setIsOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 45 }} /><div style={{ position: "absolute", right: 0, top: "100%", marginTop: "8px", background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "10px", padding: "8px 0", minWidth: "170px", zIndex: 50, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)" }}>
        <button onClick={() => handleAction(() => onViewMenu())} style={{ width: "100%", padding: "10px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}><MenuIcon /> View Menu</button>
        <button onClick={() => handleAction(() => onEdit())} style={{ width: "100%", padding: "10px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}><EditIcon /> Edit Restaurant</button>
        <button onClick={() => handleAction(() => onViewDetails())} style={{ width: "100%", padding: "10px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}><EyeIcon /> View Details</button>
        <button onClick={() => handleAction(() => onViewSchedule())} style={{ width: "100%", padding: "10px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}>🕐 Set Timings</button>
        <div style={{ height: "1px", background: isDark ? "#1e2740" : "#e2e8f0", margin: "4px 0" }} />
        <button onClick={() => handleAction(() => onDelete())} style={{ width: "100%", padding: "10px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#ef4444", display: "flex", alignItems: "center", gap: "10px" }}><TrashIcon /> Delete Restaurant</button>
      </div></>)}
    </div>
  );
};

// Full Payment System Modal
const PaymentSystemModal = ({ restaurant, onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState("overview");
  // const transactions = [{ id: "TXN001", date: "2024-03-15", amount: 12500, status: "completed", orderId: "ORD001" }, { id: "TXN002", date: "2024-03-14", amount: 8900, status: "completed", orderId: "ORD002" }, { id: "TXN003", date: "2024-03-13", amount: 4500, status: "pending", orderId: "ORD003" }, { id: "TXN004", date: "2024-03-12", amount: 23000, status: "completed", orderId: "ORD004" }, { id: "TXN005", date: "2024-03-11", amount: 6700, status: "completed", orderId: "ORD005" }];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto", padding: "20px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#0d1117" : "#ffffff", borderRadius: "20px", width: "900px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
        <div style={{ padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: isDark ? "#141824" : "#f8fafc", borderRadius: "20px 20px 0 0" }}>
          <div><h2 style={{ margin: 0, fontSize: "20px" }}>💰 Payment System - {restaurant.name}</h2><p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>Restaurant ID: {restaurant.restroId}</p></div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b" }}>×</button>
        </div>
        <div style={{ display: "flex", gap: "4px", padding: "16px 24px 0 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
          {["overview", "transactions", "settlements"].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 20px", background: activeTab === tab ? (isDark ? "#1e3a8a" : "#3b82f6") : "none", border: "none", borderRadius: "8px 8px 0 0", cursor: "pointer", color: activeTab === tab ? "#fff" : (isDark ? "#94a3b8" : "#64748b"), fontWeight: activeTab === tab ? 600 : 400, fontSize: "13px" }}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>))}
        </div>
        <div style={{ padding: "24px" }}>
          {activeTab === "overview" && (<div><div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}><div style={{ background: isDark ? "#141824" : "#f8fafc", padding: "16px", borderRadius: "12px" }}><span style={{ fontSize: "11px", color: "#64748b" }}>Total Revenue</span><div style={{ fontSize: "24px", fontWeight: 700, color: "#3b82f6" }}>₹{restaurant.totalPayments?.toLocaleString()}</div></div><div style={{ background: isDark ? "#141824" : "#f8fafc", padding: "16px", borderRadius: "12px" }}><span style={{ fontSize: "11px", color: "#64748b" }}>Completed</span><div style={{ fontSize: "24px", fontWeight: 700, color: "#10b981" }}>₹{restaurant.completedPayments?.toLocaleString()}</div></div><div style={{ background: isDark ? "#141824" : "#f8fafc", padding: "16px", borderRadius: "12px" }}><span style={{ fontSize: "11px", color: "#64748b" }}>Pending</span><div style={{ fontSize: "24px", fontWeight: 700, color: "#f59e0b" }}>₹{restaurant.pendingPayments?.toLocaleString()}</div></div><div style={{ background: isDark ? "#141824" : "#f8fafc", padding: "16px", borderRadius: "12px" }}><span style={{ fontSize: "11px", color: "#64748b" }}>Platform Fee</span><div style={{ fontSize: "24px", fontWeight: 700, color: "#8b5cf6" }}>₹{Math.round(restaurant.totalPayments * 0.1).toLocaleString()}</div></div></div></div>)}
        </div>
      </div>
    </div>
  );
};

// Full Reviews & Ratings Modal
const ReviewsRatingsModal = ({ restaurant, onClose, isDark }) => {
  const [filterRating, setFilterRating] = useState("all");
  const allReviews = [{ id: 1, user: "Rajesh Kumar", rating: 5, comment: "Excellent food!", date: "2024-03-15" }, { id: 2, user: "Priya Singh", rating: 4, comment: "Good food!", date: "2024-03-14" }, { id: 3, user: "Amit Patel", rating: 5, comment: "Best restaurant!", date: "2024-03-12" }];
  const filteredReviews = filterRating === "all" ? allReviews : allReviews.filter(r => r.rating === parseInt(filterRating));
  const averageRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
  return (<>
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto", padding: "20px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#0d1117" : "#ffffff", borderRadius: "20px", width: "800px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
        <div style={{ padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: isDark ? "#141824" : "#f8fafc" }}>
          <div><h2 style={{ margin: 0, fontSize: "20px" }}>⭐ Reviews & Ratings - {restaurant.name}</h2><p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>Based on {restaurant.totalRatings} ratings</p></div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b" }}>×</button>
        </div>
        <div style={{ padding: "24px", display: "flex", gap: "32px", flexWrap: "wrap", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: "48px", fontWeight: 700, color: "#fbbf24" }}>{averageRating}</div><div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>{[...Array(5)].map((_, i) => (<span key={i} style={{ fontSize: "18px", color: i < Math.floor(averageRating) ? "#fbbf24" : "#3a4460" }}>★</span>))}</div></div></div>
        <div style={{ padding: "24px", maxHeight: "400px", overflowY: "auto" }}>{filteredReviews.map(review => (<div key={review.id} style={{ padding: "16px", marginBottom: "12px", background: isDark ? "#141824" : "#f8fafc", borderRadius: "12px" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}><span style={{ fontSize: "13px", fontWeight: 600 }}>{review.user}</span><span style={{ fontSize: "10px", color: "#64748b" }}>{review.date}</span></div><div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>{[...Array(5)].map((_, i) => (<span key={i} style={{ fontSize: "12px", color: i < review.rating ? "#fbbf24" : "#3a4460" }}>★</span>))}</div><p style={{ fontSize: "12px", margin: 0 }}>{review.comment}</p></div>))}</div>
      </div>
    </div>
    <select
  value={filterRating}
  onChange={(e) => setFilterRating(e.target.value)}
>
  <option value="all">All</option>
  <option value="5">5 Star</option>
  <option value="4">4 Star</option>
  <option value="3">3 Star</option>
</select>
    </>
  );
};

// Schedule Item Component
const ScheduleItem = ({ item, index, onUpdate, onDelete, isDark }) => {
  const [day, setDay] = useState(item.day);
  const [openTime, setOpenTime] = useState(item.openTime);
  const [closeTime, setCloseTime] = useState(item.closeTime);
  const [isClosed, setIsClosed] = useState(item.isClosed || false);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const handleUpdate = () => onUpdate(index, { day, openTime, closeTime, isClosed });
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px", padding: "8px 0", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
      <select value={day} onChange={(e) => setDay(e.target.value)} style={{ width: "110px", padding: "6px 8px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "6px", fontSize: "12px" }}>{days.map(d => <option key={d} value={d}>{d}</option>)}</select>
      <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}><input type="checkbox" checked={isClosed} onChange={(e) => setIsClosed(e.target.checked)} /> Closed</label>
      {!isClosed && (<><input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} style={{ padding: "6px 8px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "6px", fontSize: "12px", width: "100px" }} /><span>to</span><input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} style={{ padding: "6px 8px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "6px", fontSize: "12px", width: "100px" }} /></>)}
      <button onClick={handleUpdate} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer", fontSize: "11px" }}>Update</button>
      <button onClick={() => onDelete(index)} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", cursor: "pointer", fontSize: "11px" }}>Delete</button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const RestaurantTable = ({ isDark = true }) => {
  // const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [readyFilter, setReadyFilter] = useState("All");
  const [onOffFilter, setOnOffFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(null);
  const [showReviewsModal, setShowReviewsModal] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(null);
  const [scheduleMenuOpenFor, setScheduleMenuOpenFor] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [newScheduleItem, setNewScheduleItem] = useState({ day: "Monday", openTime: "09:00", closeTime: "17:00", isClosed: false });

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3500); };
  const handleAddRestaurantClick = () => setShowAddModal(true);
  const handleAddRestaurant = async (restaurantData) => { try { await apiAddRestaurant(restaurantData); showToast("Restaurant added successfully"); fetchRestaurants(); } catch (err) { showToast(`Failed to add: ${err.message}`, "error"); } };
  const handleExportClick = () => setShowExportModal(true);
  const handleExport = (exportConfig) => { const selectedFields = exportConfig.selectedFields; const headers = selectedFields.map(f => ({ id: "ID", restroId: "Restro ID", name: "Name", contact: "Contact", status: "Status", ready: "Ready", onOff: "ON/OFF", shiftStart: "Shift Start", shiftEnd: "Shift End", rating: "Rating", totalPayments: "Total Payments" }[f] || f)); const csvData = mappedRestaurants.map(r => selectedFields.map(f => r[f] || '').join(',')); const csvContent = [headers.join(','), ...csvData].join('\n'); const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `restaurants_export_${new Date().toISOString().split('T')[0]}.csv`; a.click(); URL.revokeObjectURL(url); showToast("Exported successfully"); setShowExportModal(false); };
  useEffect(() => { const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 500); return () => clearTimeout(t); }, [search]);
  const fetchRestaurants = useCallback(async () => { setLoading(true); try { const res = await apiGetRestaurants({ page, perPage, search: debouncedSearch, status: statusFilter, ready: readyFilter, onOff: onOffFilter }); setRestaurants(res.data || []); setTotal(res.total || 0); } catch (err) { showToast(`Failed to load: ${err.message}`, "error"); } finally { setLoading(false); } }, [page, perPage, debouncedSearch, statusFilter, readyFilter, onOffFilter]);
  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);
  const mappedRestaurants = restaurants.map((r, idx) => ({ id: r.id, sn: (page - 1) * perPage + idx + 1, restroId: r.restroId, status: r.status, ready: r.ready, onOff: r.onOff, shiftStart: r.shiftStart, shiftEnd: r.shiftEnd, name: r.name, contact: r.contact, password: r.password, pic: r.pic, schedule: r.schedule, rating: r.rating, totalRatings: r.totalRatings, totalPayments: r.totalPayments, pendingPayments: r.pendingPayments, completedPayments: r.completedPayments, menu: r.menu }));
  const pageIds = mappedRestaurants.map(r => r.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.has(id));
  const toggleAll = () => setSelected(prev => { const next = new Set(prev); allPageSelected ? pageIds.forEach(id => next.delete(id)) : pageIds.forEach(id => next.add(id)); return next; });
  const toggleOne = (id) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const clearSelection = () => setSelected(new Set());
  const handleDeleteSelected = async () => { try { await apiDeleteRestaurants(Array.from(selected)); showToast(`${selected.size} restaurant(s) deleted`); clearSelection(); setConfirmDelete(null); fetchRestaurants(); } catch (err) { showToast(`Delete failed: ${err.message}`, "error"); } };
  const openEdit = (restaurant) => { setEditRestaurant(restaurant); setEditForm({ name: restaurant.name, contact: restaurant.contact, password: restaurant.password, status: restaurant.status, ready: restaurant.ready, onOff: restaurant.onOff, shiftStart: restaurant.shiftStart, shiftEnd: restaurant.shiftEnd }); };
  const handleEditSave = async () => { try { await apiUpdateRestaurant(editRestaurant.id, editForm); showToast("Restaurant updated successfully"); setEditRestaurant(null); fetchRestaurants(); } catch (err) { showToast(`Update failed: ${err.message}`, "error"); } };
  const handleSingleDelete = (restaurant) => { setConfirmDelete({ id: restaurant.id, name: restaurant.name }); };
  const openScheduleMenu = (restaurant) => { setScheduleMenuOpenFor(restaurant); setScheduleItems(restaurant.schedule && restaurant.schedule.length > 0 ? restaurant.schedule : [{ day: "Monday", openTime: "09:00", closeTime: "17:00", isClosed: false }, { day: "Tuesday", openTime: "09:00", closeTime: "17:00", isClosed: false }, { day: "Wednesday", openTime: "09:00", closeTime: "17:00", isClosed: false }, { day: "Thursday", openTime: "09:00", closeTime: "17:00", isClosed: false }, { day: "Friday", openTime: "09:00", closeTime: "17:00", isClosed: false }, { day: "Saturday", openTime: "09:00", closeTime: "17:00", isClosed: false }, { day: "Sunday", openTime: "09:00", closeTime: "17:00", isClosed: false }]); };
  const closeScheduleMenu = () => { setScheduleMenuOpenFor(null); setScheduleItems([]); };
  const addScheduleItem = () => { if (scheduleItems.some(item => item.day === newScheduleItem.day)) { showToast("Schedule for this day already exists", "error"); return; } setScheduleItems([...scheduleItems, { ...newScheduleItem }]); setNewScheduleItem({ day: "Monday", openTime: "09:00", closeTime: "17:00", isClosed: false }); };
  const updateScheduleItem = (index, updatedItem) => { const updated = [...scheduleItems]; updated[index] = updatedItem; setScheduleItems(updated); };
  const deleteScheduleItem = (index) => setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  const saveSchedule = async () => { try { await apiUpdateRestaurant(scheduleMenuOpenFor.id, { schedule: scheduleItems }); showToast("Opening/Closing times updated successfully"); closeScheduleMenu(); fetchRestaurants(); } catch (err) { showToast(`Failed to save schedule: ${err.message}`, "error"); } };
  const totalPages = Math.ceil(total / perPage);
  const styles = {
    container: { minHeight: "100vh", background: isDark ? "#0d1117" : "#f8fafc", fontFamily: "'DM Sans', sans-serif", padding: "20px 24px" },
    headerActions: { display: "flex", gap: "12px", marginBottom: "20px" },
    addBtn: { background: "#4a6cf7", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px" },
    exportBtn: { background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px" },
    filtersBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "15px" },
    searchWrapper: { position: "relative", flex: 1, maxWidth: "350px" },
    searchInput: { width: "100%", padding: "10px 12px 10px 35px", background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: isDark ? "#f1f5f9" : "#1e293b", outline: "none" },
    searchIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#3b82f6" },
    filterControls: { display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" },
    filterGroup: { display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: isDark ? "#64748b" : "#475569" },
    select: { padding: "6px 10px", background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "6px", color: isDark ? "#f1f5f9" : "#1e293b", cursor: "pointer" },
    showHidden: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: isDark ? "#64748b" : "#475569" },
    selectionBar: { display: "flex", alignItems: "center", gap: "12px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "8px", padding: "8px 16px", marginBottom: "12px" },
    tableWrapper: { background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "1400px" },
    th: { padding: "13px 14px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#3b82f6", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#f8fafc" },
    td: { padding: "12px 14px", borderBottom: isDark ? "1px solid #1a2035" : "1px solid #f1f5f9", fontSize: "13px", color: isDark ? "#e2e8f0" : "#1e293b" },
    pagination: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#f8fafc" },
    actionButton: { background: "none", border: "none", cursor: "pointer", color: isDark ? "#64748b" : "#94a3b8", display: "flex", alignItems: "center", gap: "4px", padding: "6px 10px", borderRadius: "6px", transition: "all 0.2s" },
    clickable: { cursor: "pointer", transition: "all 0.2s ease" },
  };

  return (
    <div style={styles.container}>
      <style>{`@keyframes slideUp { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} } .action-btn:hover { background: rgba(59,130,246,0.1); color: #3b82f6 !important; } .clickable:hover { background: rgba(59,130,246,0.05); transform: scale(1.02); }`}</style>

      <div style={styles.headerActions}>
        <button style={styles.addBtn} onClick={handleAddRestaurantClick}>+ Add Restaurant</button>
        <button style={styles.exportBtn} onClick={handleExportClick}>📊 Export CSV</button>
      </div>

      <div style={styles.filtersBar}>
        <div style={styles.searchWrapper}><span style={styles.searchIcon}><SearchIcon /></span><input type="text" style={styles.searchInput} placeholder="Search by name, ID, or contact..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <div style={styles.filterControls}>
          <label style={styles.showHidden}><input type="checkbox" /> Show Hidden</label>
          <div style={styles.filterGroup}><label>Status:</label><select style={styles.select} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}><option>All</option><option>Active</option><option>Inactive</option></select></div>
          <div style={styles.filterGroup}><label>Ready:</label><select style={styles.select} value={readyFilter} onChange={(e) => { setReadyFilter(e.target.value); setPage(1); }}><option>All</option><option>Yes</option><option>No</option></select></div>
          <div style={styles.filterGroup}><label>ON/OFF:</label><select style={styles.select} value={onOffFilter} onChange={(e) => { setOnOffFilter(e.target.value); setPage(1); }}><option>All</option><option>ON</option><option>OFF</option></select></div>
        </div>
      </div>

      {selected.size > 0 && (
        <div style={styles.selectionBar}>
          <span style={{ fontSize: "13px", color: "#93c5fd", fontWeight: 600 }}>✓ {selected.size} restaurant{selected.size > 1 ? "s" : ""} selected</span>
          <div style={{ flex: 1 }} />
          <button onClick={clearSelection} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>Clear</button>
          <button onClick={() => setConfirmDelete({ ids: Array.from(selected), count: selected.size })} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}><TrashIcon /> Delete</button>
        </div>
      )}

      <div style={styles.tableWrapper}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
  <thead>
    <tr>
      <th style={{ ...styles.th, width: "40px" }}><Checkbox checked={allPageSelected} onChange={toggleAll} /></th>
      <th style={styles.th}>#</th>
      <th style={styles.th}>ID</th>
      <th style={styles.th}>Logo</th>
      <th style={styles.th}>Status</th>
      <th style={styles.th}>Ready</th>
      <th style={styles.th}>ON/OFF</th>
      <th style={styles.th}>Open</th>
      <th style={styles.th}>Close</th>
      <th style={styles.th}>Restaurant</th>
      <th style={styles.th}> Rating</th>
      <th style={styles.th}> Payments</th>
      <th style={styles.th}> Contact</th>
      <th style={styles.th}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      Array.from({ length: perPage }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: 14 }).map((_, j) => (
            <td key={j} style={styles.td}>
              <div style={{ height: "14px", background: "#1e2740", borderRadius: "4px", width: j === 0 ? "16px" : "70%" }} />
            </td>
          ))}
        </tr>
      ))
    ) : mappedRestaurants.length === 0 ? (
      <tr>
        <td colSpan={14} style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>
          {debouncedSearch ? "No restaurants match your search" : "No restaurants found"}
        </td>
      </tr>
    ) : (
      mappedRestaurants.map((restro) => (
        <tr key={restro.id} style={{ background: selected.has(restro.id) ? "rgba(59,130,246,0.07)" : "transparent" }}>
          <td style={styles.td}><Checkbox checked={selected.has(restro.id)} onChange={() => toggleOne(restro.id)} /></td>
          <td style={styles.td}>{restro.sn}</td>
          <td style={styles.td}><span style={{ fontFamily: "monospace", fontSize: "11px", color: "#3b82f6" }}>{restro.restroId}</span></td>
          <td style={styles.td}><AvatarPlaceholder name={restro.name} /></td>
          <td style={styles.td}><StatusBadge status={restro.status} /></td>
          <td style={styles.td}><ReadyBadge ready={restro.ready} /></td>
          <td style={styles.td}><OnOffBadge value={restro.onOff} /></td>
          <td style={styles.td}>{restro.shiftStart || "-"}</td>
          <td style={styles.td}>{restro.shiftEnd || "-"}</td>
          <td style={styles.td}><strong>{restro.name}</strong></td>
          <td style={styles.td}>
            <div className="clickable" style={styles.clickable} onDoubleClick={() => setShowReviewsModal(restro)}>
              <button className="action-btn" style={styles.actionButton}>
                <StarIcon /> {restro.rating} ({restro.totalRatings})
              </button>
            </div>
          </td>
          <td style={styles.td}>
            <div className="clickable" style={styles.clickable} onDoubleClick={() => setShowPaymentModal(restro)}>
              <button className="action-btn" style={styles.actionButton}>
                <PaymentIcon /> ₹{restro.totalPayments?.toLocaleString()}
              </button>
            </div>
          </td>
          <td style={styles.td}>{restro.contact}</td>
          <td style={styles.td}>
            <ActionMenuDropdown
              restaurant={restro}
              onEdit={() => openEdit(restro)}
              onDelete={() => handleSingleDelete(restro)}
              onViewSchedule={() => openScheduleMenu(restro)}
              onViewMenu={() => setShowMenuModal(restro)}
              onViewDetails={() => alert(`Viewing details for ${restro.name}`)}
              isDark={isDark}
            />
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
        </div>

        <div style={styles.pagination}>
          <span style={{ fontSize: "12px", color: "#64748b" }}>{loading ? "Loading..." : `Showing ${Math.min((page-1)*perPage+1, total)}–${Math.min(page*perPage, total)} of ${total} restaurants`}</span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1 || loading} style={{ width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #1e2740", background: "#141824", color: page === 1 ? "#2d3a55" : "#94a3b8", cursor: "pointer" }}><ChevronLeftIcon /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => { let p = page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i; return p <= totalPages && (<button key={p} onClick={() => setPage(p)} style={{ width: "30px", height: "30px", borderRadius: "6px", border: page === p ? "1px solid #3b82f6" : "1px solid #1e2740", background: page === p ? "#1e3a8a" : "#141824", color: page === p ? "#93c5fd" : "#64748b", cursor: "pointer" }}>{p}</button>); })}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages || loading} style={{ width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #1e2740", background: "#141824", color: page === totalPages ? "#2d3a55" : "#94a3b8", cursor: "pointer" }}><ChevronRightIcon /></button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddRestaurantModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddRestaurant} isDark={isDark} />
      <DoubleConfirmModal isOpen={!!confirmDelete} onConfirm={() => { if (confirmDelete?.ids) handleDeleteSelected(); else if (confirmDelete?.id) { const deleteRestaurant = async () => { await apiDeleteRestaurants([confirmDelete.id]); showToast("Restaurant deleted"); fetchRestaurants(); setConfirmDelete(null); }; deleteRestaurant(); } }} onCancel={() => setConfirmDelete(null)} title="Delete Restaurant" message={confirmDelete?.ids ? `Are you sure you want to delete ${confirmDelete.count} restaurants?` : `Are you sure you want to delete "${confirmDelete?.name}"?`} isDark={isDark} />
      {showPaymentModal && <PaymentSystemModal restaurant={showPaymentModal} onClose={() => setShowPaymentModal(null)} isDark={isDark} />}
      {showReviewsModal && <ReviewsRatingsModal restaurant={showReviewsModal} onClose={() => setShowReviewsModal(null)} isDark={isDark} />}
      {showMenuModal && <RestaurantMenuModal restaurant={showMenuModal} onClose={() => setShowMenuModal(null)} isDark={isDark} />}
      {editRestaurant && (<div onClick={() => setEditRestaurant(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#141824" : "#ffffff", borderRadius: "16px", padding: "28px", width: "420px" }}><h3>✏️ Edit Restaurant</h3>{[{ label: "Restro Name", key: "name" }, { label: "Contact", key: "contact" }].map(f => (<div key={f.key} style={{ marginBottom: "14px" }}><label>{f.label}</label><input value={editForm[f.key] || ""} onChange={e => setEditForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px" }} /></div>))}<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>{[{ label: "Status", key: "status", options: ["Active", "Inactive"] }, { label: "Ready", key: "ready", options: ["Yes", "No"] }, { label: "ON/OFF", key: "onOff", options: ["ON", "OFF"] }].map(f => (<div key={f.key}><label>{f.label}</label><select value={editForm[f.key] || ""} onChange={e => setEditForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: isDark ? "#0f1520" : "#f8fafc", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "8px" }}>{f.options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>))}</div><div style={{ display: "flex", gap: "10px" }}><button onClick={() => setEditRestaurant(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button><button onClick={handleEditSave} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#1e3a8a", color: "#93c5fd", cursor: "pointer" }}>💾 Save</button></div></div></div>)}

      {scheduleMenuOpenFor && (<div onClick={closeScheduleMenu} style={{ position: "fixed", inset: 0, zIndex: 250, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}><div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#141824" : "#ffffff", borderRadius: "16px", padding: "24px", width: "680px", maxHeight: "80vh", overflowY: "auto" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}><h3>🕐 Business Hours - {scheduleMenuOpenFor.name}</h3><button onClick={closeScheduleMenu}><CloseIcon /></button></div><div style={{ marginBottom: "24px", maxHeight: "400px", overflowY: "auto" }}>{scheduleItems.map((item, idx) => (<ScheduleItem key={idx} item={item} index={idx} onUpdate={updateScheduleItem} onDelete={deleteScheduleItem} isDark={isDark} />))}</div><div style={{ borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", paddingTop: "16px" }}><h4>➕ Add New Schedule</h4><div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}><select value={newScheduleItem.day} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, day: e.target.value })}><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option></select><label><input type="checkbox" checked={newScheduleItem.isClosed} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, isClosed: e.target.checked })} /> Closed</label>{!newScheduleItem.isClosed && (<><input type="time" value={newScheduleItem.openTime} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, openTime: e.target.value })} /><span>to</span><input type="time" value={newScheduleItem.closeTime} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, closeTime: e.target.value })} /></>)}<button onClick={addScheduleItem}><PlusIcon /> Add</button></div></div><div style={{ display: "flex", gap: "10px", marginTop: "24px", justifyContent: "flex-end" }}><button onClick={closeScheduleMenu}>Cancel</button><button onClick={saveSchedule}>💾 Save All Changes</button></div></div></div>)}

      {showExportModal && <ExportRestaurantsModal isDark={isDark} onClose={() => setShowExportModal(false)} onExport={handleExport} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default RestaurantTable;