import React, { useState, useEffect, useCallback } from "react";
import ExportRestaurantsModal from "./ExportRestaurantsModal";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// API CONFIG
// ─────────────────────────────────────────────────────────────────────────────

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
    address: "123 Main Street, Downtown",
    email: "contact@pizzaparadise.com",
    description: "Best pizza in town with authentic Italian taste",
    cuisine: "Italian, Fast Food",
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
    address: "456 Park Avenue",
    email: "contact@burgerfactory.com",
    description: "Juicy burgers made fresh daily",
    cuisine: "American, Fast Food",
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
    address: "789 Ocean Drive",
    email: "contact@sushicentral.com",
    description: "Authentic Japanese sushi experience",
    cuisine: "Japanese, Sushi",
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
    address: "321 Mexican Street",
    email: "contact@tacobell.com",
    description: "Authentic Mexican flavors",
    cuisine: "Mexican, Fast Food",
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
    address: "567 Curry Lane",
    email: "contact@indianspice.com",
    description: "Authentic Indian cuisine with rich flavors",
    cuisine: "Indian, North Indian",
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
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 7L2 7"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// RESTAURANT MENU MODAL
// ─────────────────────────────────────────────────────────────────────────────
const RestaurantMenuModal = ({ restaurant, onClose, isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["all", ...new Set(restaurant.menu?.map(item => item.category) || [])];
  const filteredItems = selectedCategory === "all" ? restaurant.menu || [] : (restaurant.menu || []).filter(item => item.category === selectedCategory);

  if (!restaurant) return null;

  const styles = {
    overlay: {
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflowY: "auto", padding: "20px",
      animation: "fadeIn 0.2s ease",
    },
    modal: {
      background: isDark ? "#141824" : "#ffffff",
      borderRadius: "24px", width: "900px", maxWidth: "100%",
      maxHeight: "85vh", display: "flex", flexDirection: "column",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      animation: "slideUp 0.3s ease",
    },
    header: {
      padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: isDark ? "#0f1520" : "#f8fafc", borderRadius: "24px 24px 0 0"
    },
    categories: {
      padding: "16px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      display: "flex", gap: "10px", flexWrap: "wrap"
    },
    categoryBtn: (isActive) => ({
      padding: "6px 16px", borderRadius: "20px", border: "1px solid",
      borderColor: isActive ? "#3b82f6" : (isDark ? "#1e2740" : "#e2e8f0"),
      background: isActive ? (isDark ? "#1e3a8a" : "#3b82f6") : "none",
      color: isActive ? "#fff" : (isDark ? "#94a3b8" : "#64748b"),
      cursor: "pointer", fontSize: "12px", transition: "all 0.2s"
    }),
    menuList: { padding: "20px", overflowY: "auto", maxHeight: "calc(85vh - 180px)" },
    menuGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" },
    menuCard: {
      background: isDark ? "#0f1520" : "#f8fafc",
      borderRadius: "12px", padding: "16px",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
    },
    menuName: { margin: 0, fontSize: "15px", fontWeight: 600, color: isDark ? "#f1f5f9" : "#1e293b" },
    menuPrice: { fontSize: "16px", fontWeight: 700, color: "#3b82f6" },
    menuDesc: { fontSize: "12px", color: isDark ? "#94a3b8" : "#64748b", margin: "8px 0" },
    footer: {
      padding: "12px 24px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#0f1520" : "#f8fafc", borderRadius: "0 0 24px 24px",
      fontSize: "12px", color: "#64748b", textAlign: "center"
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <h2 style={{ margin: 0, fontSize: "20px", color: isDark ? "#f1f5f9" : "#1e293b" }}>
              🍽️ Menu - {restaurant.name}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>
              {restaurant.menu?.length || 0} items • {categories.length - 1} categories
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b", padding: "8px", borderRadius: "8px" }}>✕</button>
        </div>
        <div style={styles.categories}>
          {categories.map(cat => (
            <button 
              key={cat} 
              style={styles.categoryBtn(selectedCategory === cat)} 
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "📋 All Items" : cat}
            </button>
          ))}
        </div>
        <div style={styles.menuList}>
          <div style={styles.menuGrid}>
            {filteredItems.map(item => (
              <div key={item.id} style={styles.menuCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                  <h4 style={styles.menuName}>{item.name}</h4>
                  <span style={styles.menuPrice}>₹{item.price}</span>
                </div>
                <p style={styles.menuDesc}>{item.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: "10px", color: item.isAvailable ? "#10b981" : "#ef4444" }}>
                    {item.isAvailable ? "✅ Available" : "❌ Out of Stock"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
              No items in this category
            </div>
          )}
        </div>
        <div style={styles.footer}>
          ⏰ {restaurant.shiftStart} - {restaurant.shiftEnd} | 📞 {restaurant.contact} | 📍 {restaurant.address}
        </div>
      </div>
    </div>
  );
};

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
// RESTAURANT DETAIL PAGE (FULL PAGE)
// ─────────────────────────────────────────────────────────────────────────────
const RestaurantDetailPage = ({ restaurant, onBack, onEdit, onDelete, onViewSchedule, onViewMenu, isDark }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const styles = {
    container: {
      minHeight: "100vh",
      background: isDark ? "#0d1117" : "#f8fafc",
      fontFamily: "'DM Sans', sans-serif",
      padding: "20px 24px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "16px",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      padding: "8px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      color: isDark ? "#e2e8f0" : "#1e293b",
      fontSize: "13px",
    },
    title: {
      fontSize: "24px",
      fontWeight: 700,
      color: isDark ? "#f1f5f9" : "#1e293b",
      margin: 0,
    },
    actionButtons: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    actionBtn: (color) => ({
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      background: color,
      color: "#fff",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    tabs: {
      display: "flex",
      gap: "4px",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    tab: (isActive) => ({
      padding: "10px 20px",
      background: isActive ? (isDark ? "#1e3a8a" : "#3b82f6") : "none",
      border: "none",
      borderRadius: "8px 8px 0 0",
      cursor: "pointer",
      color: isActive ? "#fff" : (isDark ? "#94a3b8" : "#64748b"),
      fontWeight: isActive ? 600 : 400,
      fontSize: "13px",
    }),
    card: {
      background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "20px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    infoItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px",
      background: isDark ? "#0f1520" : "#f8fafc",
      borderRadius: "10px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      marginBottom: "20px",
    },
    statCard: {
      background: isDark ? "#0f1520" : "#f8fafc",
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
    },
    menuItem: {
      background: isDark ? "#0f1520" : "#f8fafc",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    scheduleItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px",
      color: "#64748b",
      fontSize: "13px",
    },
  };

  const renderMenuItems = () => {
    if (!restaurant.menu || restaurant.menu.length === 0) {
      return <div style={styles.emptyState}>No menu items available</div>;
    }
    return restaurant.menu.map((item) => (
      <div key={item.id} style={styles.menuItem}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>{item.name}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>{item.description}</div>
          <div style={{ fontSize: "10px", display: "inline-block", padding: "2px 8px", borderRadius: "10px", background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>{item.category}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#3b82f6" }}>₹{item.price}</div>
          <span style={{ fontSize: "10px", color: item.isAvailable ? "#10b981" : "#ef4444" }}>{item.isAvailable ? "Available" : "Out of Stock"}</span>
        </div>
      </div>
    ));
  };

  const renderSchedule = () => {
    if (!restaurant.schedule || restaurant.schedule.length === 0) {
      return <div style={styles.emptyState}>No schedule available</div>;
    }
    return restaurant.schedule.map((item, idx) => (
      <div key={idx} style={styles.scheduleItem}>
        <span style={{ fontWeight: 500 }}>{item.day}</span>
        {item.isClosed ? (
          <span style={{ color: "#ef4444", fontWeight: 500 }}>Closed</span>
        ) : (
          <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>{item.openTime} - {item.closeTime}</span>
        )}
      </div>
    ));
  };

  const renderPayments = () => {
    const totalPayments = restaurant.totalPayments || 0;
    const completedPayments = restaurant.completedPayments || 0;
    const pendingPayments = restaurant.pendingPayments || 0;
    const platformFee = Math.round(totalPayments * 0.1);

    return (
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#3b82f6" }}>₹{totalPayments.toLocaleString()}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Total Revenue</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#10b981" }}>₹{completedPayments.toLocaleString()}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Completed</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#f59e0b" }}>₹{pendingPayments.toLocaleString()}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#8b5cf6" }}>₹{platformFee.toLocaleString()}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Platform Fee (10%)</div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Restaurants
        </button>
        <div>
          <h1 style={styles.title}>{restaurant?.name || "Restaurant Details"}</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>ID: {restaurant?.restroId || "N/A"}</p>
        </div>
        <div style={styles.actionButtons}>
          <button style={styles.actionBtn("#4a6cf7")} onClick={() => onViewMenu(restaurant)}>
            <MenuIcon /> View Menu
          </button>
          <button style={styles.actionBtn("#f59e0b")} onClick={() => onEdit(restaurant)}>
            <EditIcon /> Edit
          </button>
          <button style={styles.actionBtn("#3b82f6")} onClick={() => onViewSchedule(restaurant)}>
            <ClockIcon /> Set Timings
          </button>
          <button style={styles.actionBtn("#ef4444")} onClick={() => onDelete(restaurant)}>
            <TrashIcon /> Delete
          </button>
        </div>
      </div>

      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === "overview")} onClick={() => setActiveTab("overview")}>Overview</button>
        <button style={styles.tab(activeTab === "menu")} onClick={() => setActiveTab("menu")}>Menu</button>
        <button style={styles.tab(activeTab === "schedule")} onClick={() => setActiveTab("schedule")}>Schedule</button>
        <button style={styles.tab(activeTab === "payments")} onClick={() => setActiveTab("payments")}>Payments</button>
        <button style={styles.tab(activeTab === "reviews")} onClick={() => setActiveTab("reviews")}>Reviews</button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#3b82f6" }}>⭐ {restaurant?.rating || 0}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Average Rating</div>
              <div style={{ fontSize: "10px", marginTop: "4px" }}>{restaurant?.totalRatings || 0} ratings</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#10b981" }}>₹{(restaurant?.totalPayments || 0).toLocaleString()}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Total Revenue</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#f59e0b" }}>₹{(restaurant?.pendingPayments || 0).toLocaleString()}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Pending Payment</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#8b5cf6" }}>{restaurant?.menu?.length || 0}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Menu Items</div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Restaurant Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}><LocationIcon /><div><div style={{ fontSize: "11px", color: "#64748b" }}>Address</div><div style={{ fontSize: "13px" }}>{restaurant?.address || "Not specified"}</div></div></div>
              <div style={styles.infoItem}><PhoneIcon /><div><div style={{ fontSize: "11px", color: "#64748b" }}>Contact</div><div style={{ fontSize: "13px" }}>{restaurant?.contact || "Not specified"}</div></div></div>
              <div style={styles.infoItem}><EmailIcon /><div><div style={{ fontSize: "11px", color: "#64748b" }}>Email</div><div style={{ fontSize: "13px" }}>{restaurant?.email || "Not specified"}</div></div></div>
              <div style={styles.infoItem}><ClockIcon /><div><div style={{ fontSize: "11px", color: "#64748b" }}>Business Hours</div><div style={{ fontSize: "13px" }}>{restaurant?.shiftStart || "-"} - {restaurant?.shiftEnd || "-"}</div></div></div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>About Restaurant</h3>
            <p style={{ fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{restaurant?.description || "No description available"}</p>
            <div style={{ marginTop: "12px" }}>
              <span style={{ fontSize: "11px", color: "#64748b" }}>Cuisine: </span>
              <span style={{ fontSize: "12px", fontWeight: 500 }}>{restaurant?.cuisine || "Multi-cuisine"}</span>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Status Information</h3>
            <div style={styles.infoGrid}>
              <div><span style={{ fontSize: "11px", color: "#64748b" }}>Status</span><div><StatusBadge status={restaurant?.status || "Inactive"} /></div></div>
              <div><span style={{ fontSize: "11px", color: "#64748b" }}>Ready for Orders</span><div><ReadyBadge ready={restaurant?.ready || "No"} /></div></div>
              <div><span style={{ fontSize: "11px", color: "#64748b" }}>Store Status</span><div><OnOffBadge value={restaurant?.onOff || "OFF"} /></div></div>
            </div>
          </div>
        </>
      )}

      {/* Menu Tab */}
      {activeTab === "menu" && (
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>🍽️ Menu Items</h3>
          {renderMenuItems()}
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === "schedule" && (
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>🕐 Business Schedule</h3>
          {renderSchedule()}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>💰 Payment Summary</h3>
          {renderPayments()}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>⭐ Customer Reviews</h3>
          <div style={styles.emptyState}>
            {restaurant?.totalReviews || 0} total reviews • Average rating {restaurant?.rating || 0} ★
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE CONFIRMATION MODAL
// ─────────────────────────────────────────────────────────────────────────────
const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel, restaurantName, isDark }) => {
  const [confirmText, setConfirmText] = useState("");
  
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.2s ease",
    },
    modal: {
      background: isDark ? "#141824" : "#ffffff",
      borderRadius: "20px", width: "450px", maxWidth: "90%",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      animation: "scaleIn 0.2s ease",
    },
    header: {
      padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      textAlign: "center",
    },
    body: { padding: "24px", textAlign: "center" },
    footer: { padding: "16px 24px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", gap: "12px", justifyContent: "flex-end" },
    icon: {
      width: "56px", height: "56px", borderRadius: "50%",
      background: "rgba(239,68,68,0.15)",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 16px",
    },
    input: {
      width: "100%", padding: "10px 14px",
      background: isDark ? "#0f1520" : "#f8fafc",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "8px", fontSize: "14px", textAlign: "center",
      color: isDark ? "#f1f5f9" : "#1e293b",
      marginTop: "16px",
    },
    cancelBtn: {
      flex: 1, padding: "10px", borderRadius: "8px",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#1a2035" : "#f1f5f9",
      color: isDark ? "#94a3b8" : "#64748b", cursor: "pointer", fontSize: "13px", fontWeight: 500,
    },
    confirmBtn: {
      flex: 1, padding: "10px", borderRadius: "8px", border: "none",
      background: confirmText === "DELETE" ? "#ef4444" : "#3a4460",
      color: confirmText === "DELETE" ? "white" : "#64748b",
      cursor: confirmText === "DELETE" ? "pointer" : "not-allowed",
      fontSize: "13px", fontWeight: 500,
    },
  };

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.icon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </div>
          <h3 style={{ margin: 0, fontSize: "20px", color: isDark ? "#f1f5f9" : "#1e293b" }}>Delete Restaurant</h3>
          <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#64748b" }}>
            Are you sure you want to delete "{restaurantName}"?
          </p>
        </div>
        <div style={styles.body}>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>
            This action cannot be undone. Type <strong style={{ color: "#ef4444" }}>DELETE</strong> to confirm.
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
            placeholder="Type DELETE to confirm"
            style={styles.input}
            autoFocus
          />
        </div>
        <div style={styles.footer}>
          <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button style={styles.confirmBtn} onClick={onConfirm} disabled={confirmText !== "DELETE"}>Delete Permanently</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EDIT RESTAURANT MODAL (REMOVED - Using navigation instead)
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE MODAL
// ─────────────────────────────────────────────────────────────────────────────
const ScheduleModal = ({ isOpen, restaurant, scheduleItems, onUpdate, onDelete, onAdd, onClose, onSave, isDark }) => {
  const [newSchedule, setNewSchedule] = useState({ day: "Monday", openTime: "09:00", closeTime: "17:00", isClosed: false });
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  if (!isOpen || !restaurant) return null;

  const styles = {
    overlay: {
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.2s ease",
    },
    modal: {
      background: isDark ? "#141824" : "#ffffff",
      borderRadius: "20px", width: "750px", maxWidth: "95%",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      maxHeight: "85vh", display: "flex", flexDirection: "column",
      animation: "scaleIn 0.2s ease",
    },
    header: {
      padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    },
    body: { padding: "20px", overflowY: "auto", flex: 1 },
    footer: { padding: "16px 24px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", gap: "12px", justifyContent: "flex-end" },
    scheduleRow: {
      display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px",
      padding: "10px", background: isDark ? "#0f1520" : "#f8fafc", borderRadius: "10px",
    },
    scheduleItem: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px", marginBottom: "8px",
      background: isDark ? "#0f1520" : "#f8fafc", borderRadius: "10px",
    },
    input: {
      padding: "6px 10px", background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "6px", fontSize: "12px", color: isDark ? "#f1f5f9" : "#1e293b",
    },
    select: {
      padding: "6px 10px", background: isDark ? "#141824" : "#ffffff",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      borderRadius: "6px", fontSize: "12px", cursor: "pointer",
    },
    cancelBtn: {
      padding: "10px 20px", borderRadius: "8px",
      border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
      background: isDark ? "#1a2035" : "#f1f5f9",
      color: isDark ? "#94a3b8" : "#64748b", cursor: "pointer",
    },
    saveBtn: {
      padding: "10px 20px", borderRadius: "8px", border: "none",
      background: "#4a6cf7", color: "white", cursor: "pointer",
    },
    addBtn: {
      padding: "6px 12px", borderRadius: "6px", border: "none",
      background: "#22c55e", color: "white", cursor: "pointer", fontSize: "11px",
    },
    deleteBtn: {
      padding: "4px 10px", borderRadius: "6px", border: "none",
      background: "#ef4444", color: "white", cursor: "pointer", fontSize: "11px",
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={{ margin: 0, fontSize: "18px", color: isDark ? "#f1f5f9" : "#1e293b" }}>
            🕐 Business Hours - {restaurant.name}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>✕</button>
        </div>
        <div style={styles.body}>
          {scheduleItems.map((item, idx) => (
            <div key={idx} style={styles.scheduleItem}>
              <span style={{ fontWeight: 500, width: "100px" }}>{item.day}</span>
              {item.isClosed ? (
                <span style={{ color: "#ef4444" }}>Closed</span>
              ) : (
                <span>{item.openTime} - {item.closeTime}</span>
              )}
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={styles.deleteBtn} onClick={() => onDelete(idx)}>Delete</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "14px" }}>➕ Add New Schedule</h4>
            <div style={styles.scheduleRow}>
              <select style={styles.select} value={newSchedule.day} onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}>
                <input type="checkbox" checked={newSchedule.isClosed} onChange={(e) => setNewSchedule({ ...newSchedule, isClosed: e.target.checked })} /> Closed
              </label>
              {!newSchedule.isClosed && (
                <>
                  <input type="time" style={styles.input} value={newSchedule.openTime} onChange={(e) => setNewSchedule({ ...newSchedule, openTime: e.target.value })} />
                  <span>to</span>
                  <input type="time" style={styles.input} value={newSchedule.closeTime} onChange={(e) => setNewSchedule({ ...newSchedule, closeTime: e.target.value })} />
                </>
              )}
              <button style={styles.addBtn} onClick={() => onAdd(newSchedule)}>+ Add</button>
            </div>
          </div>
        </div>
        <div style={styles.footer}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.saveBtn} onClick={onSave}>💾 Save All Changes</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const RestaurantTable = ({ isDark = true }) => {
  const navigate = useNavigate();
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
  const [toast, setToast] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [scheduleRestaurant, setScheduleRestaurant] = useState(null);
  const [newScheduleItem, setNewScheduleItem] = useState({ day: "Monday", openTime: "09:00", closeTime: "17:00", isClosed: false });

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3500); };
  
  // Navigate to Add Restaurant page for new restaurant
  const handleAddRestaurantClick = () => {
    navigate("/Dashboard/addrestaurant", { state: { mode: "add" } });
  };
  
  // Navigate to Add Restaurant page for editing existing restaurant
  const handleEditRestaurantClick = (restaurant) => {
    navigate("/Dashboard/addrestaurant", { state: { mode: "edit", restaurantData: restaurant } });
  };
  
  const handleAddRestaurant = async (restaurantData) => { try { await apiAddRestaurant(restaurantData); showToast("Restaurant added successfully"); fetchRestaurants(); } catch (err) { showToast(`Failed to add: ${err.message}`, "error"); } };
  const handleExportClick = () => setShowExportModal(true);
  const handleExport = (exportConfig) => { const selectedFields = exportConfig.selectedFields; const headers = selectedFields.map(f => ({ id: "ID", restroId: "Restro ID", name: "Name", contact: "Contact", status: "Status", ready: "Ready", onOff: "ON/OFF", shiftStart: "Shift Start", shiftEnd: "Shift End", rating: "Rating", totalPayments: "Total Payments" }[f] || f)); const csvData = mappedRestaurants.map(r => selectedFields.map(f => r[f] || '').join(',')); const csvContent = [headers.join(','), ...csvData].join('\n'); const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `restaurants_export_${new Date().toISOString().split('T')[0]}.csv`; a.click(); URL.revokeObjectURL(url); showToast("Exported successfully"); setShowExportModal(false); };
  
  useEffect(() => { const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 500); return () => clearTimeout(t); }, [search]);
  
  const fetchRestaurants = useCallback(async () => { setLoading(true); try { const res = await apiGetRestaurants({ page, perPage, search: debouncedSearch, status: statusFilter, ready: readyFilter, onOff: onOffFilter }); setRestaurants(res.data || []); setTotal(res.total || 0); } catch (err) { showToast(`Failed to load: ${err.message}`, "error"); } finally { setLoading(false); } }, [page, perPage, debouncedSearch, statusFilter, readyFilter, onOffFilter]);
  
  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);
  
  const mappedRestaurants = restaurants.map((r, idx) => ({ id: r.id, sn: (page - 1) * perPage + idx + 1, restroId: r.restroId, status: r.status, ready: r.ready, onOff: r.onOff, shiftStart: r.shiftStart, shiftEnd: r.shiftEnd, name: r.name, contact: r.contact, password: r.password, pic: r.pic, schedule: r.schedule, rating: r.rating, totalRatings: r.totalRatings, totalPayments: r.totalPayments, pendingPayments: r.pendingPayments, completedPayments: r.completedPayments, menu: r.menu, address: r.address, email: r.email, description: r.description, cuisine: r.cuisine }));
  
  const pageIds = mappedRestaurants.map(r => r.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.has(id));
  const toggleAll = () => setSelected(prev => { const next = new Set(prev); allPageSelected ? pageIds.forEach(id => next.delete(id)) : pageIds.forEach(id => next.add(id)); return next; });
  const toggleOne = (id) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const clearSelection = () => setSelected(new Set());
  
  const handleDeleteSelected = async () => { try { await apiDeleteRestaurants(Array.from(selected)); showToast(`${selected.size} restaurant(s) deleted`); clearSelection(); setShowDeleteModal(null); fetchRestaurants(); } catch (err) { showToast(`Delete failed: ${err.message}`, "error"); } };
  
  const handleDeleteFromDetail = async (restaurant) => { setShowDeleteModal(restaurant); };
  
  const openScheduleModal = (restaurant) => {
    setScheduleRestaurant(restaurant);
    setScheduleItems(restaurant.schedule && restaurant.schedule.length > 0 ? restaurant.schedule : [
      { day: "Monday", openTime: "09:00", closeTime: "17:00", isClosed: false },
      { day: "Tuesday", openTime: "09:00", closeTime: "17:00", isClosed: false },
      { day: "Wednesday", openTime: "09:00", closeTime: "17:00", isClosed: false },
      { day: "Thursday", openTime: "09:00", closeTime: "17:00", isClosed: false },
      { day: "Friday", openTime: "09:00", closeTime: "17:00", isClosed: false },
      { day: "Saturday", openTime: "09:00", closeTime: "17:00", isClosed: false },
      { day: "Sunday", openTime: "09:00", closeTime: "17:00", isClosed: false }
    ]);
    setShowScheduleModal(true);
  };
  
  const addScheduleItem = () => {
    if (scheduleItems.some(item => item.day === newScheduleItem.day)) {
      showToast("Schedule for this day already exists", "error");
      return;
    }
    setScheduleItems([...scheduleItems, { ...newScheduleItem }]);
    setNewScheduleItem({ day: "Monday", openTime: "09:00", closeTime: "17:00", isClosed: false });
  };
  
  const updateScheduleItem = (index, updatedItem) => { const updated = [...scheduleItems]; updated[index] = updatedItem; setScheduleItems(updated); };
  const deleteScheduleItem = (index) => setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  
  const saveSchedule = async () => {
    try {
      await apiUpdateRestaurant(scheduleRestaurant.id, { schedule: scheduleItems });
      showToast("Opening/Closing times updated successfully");
      setShowScheduleModal(false);
      fetchRestaurants();
      if (showDetailPage && showDetailPage.id === scheduleRestaurant.id) {
        setShowDetailPage({ ...showDetailPage, schedule: scheduleItems });
      }
    } catch (err) {
      showToast(`Failed to save schedule: ${err.message}`, "error");
    }
  };
  
  const totalPages = Math.ceil(total / perPage);
  
  const styles = {
    container: { minHeight: "100vh", background: isDark ? "#0d1117" : "#f8fafc", fontFamily: "'DM Sans', sans-serif", padding: "20px 24px" },
    headerActions: { display: "flex", gap: "12px", marginBottom: "20px" },
    addBtn: { background: "#4a6cf7", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" },
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
    viewMoreBtn: { background: "#3b82f6", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: 500 },
  };

  // If showing detail page, render that instead of table
  if (showDetailPage) {
    return (
      <RestaurantDetailPage
        restaurant={showDetailPage}
        onBack={() => setShowDetailPage(null)}
        onEdit={(restaurant) => handleEditRestaurantClick(restaurant)}
        onDelete={(restaurant) => handleDeleteFromDetail(restaurant)}
        onViewSchedule={(restaurant) => openScheduleModal(restaurant)}
        onViewMenu={(restaurant) => setShowMenuModal(restaurant)}
        isDark={isDark}
      />
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{transform:scale(0.95);opacity:0} to{transform:scale(1);opacity:1} }
      `}</style>

      <div style={styles.headerActions}>
        <button style={styles.addBtn} onClick={handleAddRestaurantClick}>
          <PlusIcon /> Add Restaurant
        </button>
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
          <button onClick={() => setShowDeleteModal({ id: Array.from(selected), name: `${selected.size} restaurants` })} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}><TrashIcon /> Delete</button>
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
                <th style={styles.th}>Rating</th>
                <th style={styles.th}>Payments</th>
                <th style={styles.th}>Contact</th>
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
                <tr><td colSpan={14} style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>{debouncedSearch ? "No restaurants match your search" : "No restaurants found"}</td></tr>
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
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <StarIcon /> {restro.rating} ({restro.totalRatings})
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <PaymentIcon /> ₹{restro.totalPayments?.toLocaleString()}
                      </div>
                    </td>
                    <td style={styles.td}>{restro.contact}</td>
                    <td style={styles.td}>
                      <button style={styles.viewMoreBtn} onClick={() => setShowDetailPage(restro)}>View More</button>
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
      <DeleteConfirmModal
        isOpen={!!showDeleteModal}
        restaurantName={showDeleteModal?.name || ""}
        onConfirm={() => {
          if (showDeleteModal?.id === Array.from(selected) && selected.size > 0) {
            handleDeleteSelected();
          } else if (showDeleteModal?.id) {
            const deleteRestaurant = async () => {
              await apiDeleteRestaurants([showDeleteModal.id]);
              showToast("Restaurant deleted successfully");
              setShowDeleteModal(null);
              fetchRestaurants();
              if (showDetailPage && showDetailPage.id === showDeleteModal.id) {
                setShowDetailPage(null);
              }
            };
            deleteRestaurant();
          } else if (showDeleteModal?.id && Array.isArray(showDeleteModal.id)) {
            handleDeleteSelected();
          }
        }}
        onCancel={() => setShowDeleteModal(null)}
        isDark={isDark}
      />
      
      <ScheduleModal
        isOpen={showScheduleModal}
        restaurant={scheduleRestaurant}
        scheduleItems={scheduleItems}
        onUpdate={updateScheduleItem}
        onDelete={deleteScheduleItem}
        onAdd={addScheduleItem}
        onClose={() => { setShowScheduleModal(false); setScheduleRestaurant(null); }}
        onSave={saveSchedule}
        isDark={isDark}
      />
      
      {showMenuModal && <RestaurantMenuModal restaurant={showMenuModal} onClose={() => setShowMenuModal(null)} isDark={isDark} />}
      {showExportModal && <ExportRestaurantsModal isDark={isDark} onClose={() => setShowExportModal(false)} onExport={handleExport} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default RestaurantTable;