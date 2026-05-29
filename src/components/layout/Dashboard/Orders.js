import React, { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const demoOrders = [
  { id: 84, orderId: "#553", status: "Active", date: "2026-05-23 15:04:58", restaurant: "Neeraj Verma", user: "Neeraj Verma", userPhone: "+91 98765 43210", userAddress: "123 Main Street, New Delhi", payStatus: "paid", payMethod: "COD", restroStatus: "completed", driverStatus: "delivered", userStatus: "delivered", amount: "275", items: [{ name: "Pizza", qty: 1, price: 199 }, { name: "Coke", qty: 2, price: 76 }] },
  { id: 83, orderId: "#552", status: "Active", date: "2026-05-20 22:49:31", restaurant: "Pandit's Rolls and Momos", user: "mehul", userPhone: "+91 87654 32109", userAddress: "456 Park Avenue, Mumbai", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "cancelled", userStatus: "cancelled", amount: "242", items: [{ name: "Chicken Roll", qty: 2, price: 242 }] },
  { id: 82, orderId: "#551", status: "Active", date: "2026-05-20 16:04:35", restaurant: "Neeraj Verma", user: "Yash", userPhone: "+91 76543 21098", userAddress: "789 Lake Road, Bangalore", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "cancelled", userStatus: "cancelled", amount: "337", items: [{ name: "Burger", qty: 2, price: 337 }] },
  { id: 81, orderId: "#550", status: "Active", date: "2026-05-20 16:02:18", restaurant: "Neeraj Verma", user: "Yash", userPhone: "+91 76543 21098", userAddress: "789 Lake Road, Bangalore", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "cancelled", userStatus: "cancelled", amount: "260", items: [{ name: "French Fries", qty: 2, price: 260 }] },
  { id: 80, orderId: "#549", status: "Active", date: "2026-05-20 15:53:24", restaurant: "Neeraj Verma", user: "Yash", userPhone: "+91 76543 21098", userAddress: "789 Lake Road, Bangalore", payStatus: "pending", payMethod: "COD", restroStatus: "cancelled", driverStatus: "cancelled", userStatus: "cancelled", amount: "285", items: [{ name: "Pasta", qty: 1, price: 285 }] },
  { id: 79, orderId: "#548", status: "Active", date: "2026-05-20 15:39:57", restaurant: "Neeraj Verma", user: "Neeraj Verma", userPhone: "+91 98765 43210", userAddress: "123 Main Street, New Delhi", payStatus: "pending", payMethod: "COD", restroStatus: "cancelled", driverStatus: "cancelled", userStatus: "cancelled", amount: "262", items: [{ name: "Sandwich", qty: 1, price: 262 }] },
  { id: 78, orderId: "#547", status: "Active", date: "2026-05-20 15:35:33", restaurant: "Neeraj Verma", user: "Neeraj Verma", userPhone: "+91 98765 43210", userAddress: "123 Main Street, New Delhi", payStatus: "pending", payMethod: "COD", restroStatus: "cancelled", driverStatus: "cancelled", userStatus: "cancelled", amount: "262", items: [{ name: "Salad", qty: 1, price: 262 }] },
  { id: 77, orderId: "#546", status: "Active", date: "2026-05-16 11:26:40", restaurant: "Shan E Punjab", user: "Neeraj Verma", userPhone: "+91 98765 43210", userAddress: "123 Main Street, New Delhi", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "cancelled", userStatus: "cancelled", amount: "239", items: [{ name: "Butter Chicken", qty: 1, price: 239 }] },
  { id: 76, orderId: "#545", status: "Active", date: "2026-05-12 13:05:40", restaurant: "Happiness Fast Food Restaurant", user: "MANGLAM", userPhone: "+91 65432 10987", userAddress: "321 Temple Road, Chennai", payStatus: "paid", payMethod: "COD", restroStatus: "completed", driverStatus: "delivered", userStatus: "delivered", amount: "254", items: [{ name: "Veg Thali", qty: 1, price: 254 }] },
  { id: 75, orderId: "#544", status: "Active", date: "2026-05-09 13:11:40", restaurant: "MM Chaap DD Nagar", user: "ramsharma", userPhone: "+91 54321 09876", userAddress: "555 Sector 15, Noida", payStatus: "pending", payMethod: "COD", restroStatus: "cancelled", driverStatus: "cancelled", userStatus: "cancelled", amount: "310", items: [{ name: "Soya Chaap", qty: 2, price: 310 }] },
  { id: 74, orderId: "#543", status: "New", date: "2026-05-24 10:30:00", restaurant: "Pizza Hut", user: "Rahul", userPhone: "+91 98765 12345", userAddress: "111 Cyber City, Gurgaon", payStatus: "pending", payMethod: "COD", restroStatus: "pending", driverStatus: "pending", userStatus: "pending", amount: "450", items: [{ name: "Margherita Pizza", qty: 1, price: 299 }, { name: "Garlic Bread", qty: 1, price: 151 }] },
  { id: 73, orderId: "#542", status: "Preparing", date: "2026-05-24 09:15:00", restaurant: "Domino's", user: "Sneha", userPhone: "+91 87654 23456", userAddress: "222 MG Road, Pune", payStatus: "paid", payMethod: "Online", restroStatus: "preparing", driverStatus: "pending", userStatus: "pending", amount: "680", items: [{ name: "Pepperoni Pizza", qty: 1, price: 499 }, { name: "Coke", qty: 2, price: 181 }] },
  { id: 72, orderId: "#541", status: "Out for Delivery", date: "2026-05-24 08:45:00", restaurant: "KFC", user: "Amit", userPhone: "+91 76543 34567", userAddress: "333 Park Street, Kolkata", payStatus: "paid", payMethod: "Online", restroStatus: "ready", driverStatus: "out_for_delivery", userStatus: "pending", amount: "520", items: [{ name: "Chicken Bucket", qty: 1, price: 520 }] },
  { id: 71, orderId: "#540", status: "Delivered", date: "2026-05-23 20:30:00", restaurant: "McDonald's", user: "Priya", userPhone: "+91 65432 45678", userAddress: "444 Beach Road, Chennai", payStatus: "paid", payMethod: "COD", restroStatus: "completed", driverStatus: "delivered", userStatus: "delivered", amount: "890", items: [{ name: "McSpicy Burger", qty: 2, price: 890 }] },
];

// Available riders for assignment
const availableRiders = [
  { id: 1, name: "Rajesh Kumar", phone: "+91 99887 66554", vehicle: "Bike", status: "Available" },
  { id: 2, name: "Amit Singh", phone: "+91 88776 55443", vehicle: "Scooter", status: "Available" },
  { id: 3, name: "Vikram Sharma", phone: "+91 77665 44332", vehicle: "Bike", status: "Busy" },
  { id: 4, name: "Rohit Verma", phone: "+91 66554 33221", vehicle: "Cycle", status: "Available" },
  { id: 5, name: "Neha Gupta", phone: "+91 55443 22110", vehicle: "Scooter", status: "Available" },
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
// const EditIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//   </svg>
// );
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
const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="6" width="18" height="12" rx="2"/>
    <circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
  </svg>
);
const RefundIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 10h18M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
    <path d="M14 10l-4 4m0-4l4 4"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status, isDark }) => {
  const getConfig = () => {
    switch(status) {
      case "Active": return { bg: isDark ? "rgba(20,184,166,0.15)" : "rgba(20,184,166,0.1)", color: "#14b8a6" };
      case "Delivered": return { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" };
      case "Cancelled": return { bg: isDark ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.1)", color: "#ef4444" };
      case "New": return { bg: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)", color: "#3b82f6" };
      case "Preparing": return { bg: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)", color: "#f59e0b" };
      case "Ready": return { bg: isDark ? "rgba(168,85,247,0.15)" : "rgba(168,85,247,0.1)", color: "#a855f7" };
      case "Out for Delivery": return { bg: isDark ? "rgba(236,72,153,0.15)" : "rgba(236,72,153,0.1)", color: "#ec4899" };
      default: return { bg: isDark ? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.08)", color: "#94a3b8" };
    }
  };
  const c = getConfig();
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const PayStatusBadge = ({ status, isDark }) => {
  const config = {
    paid: { bg: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)", color: "#22c55e" },
    pending: { bg: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)", color: "#f59e0b" },
  };
  const c = config[status] || config.pending;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600, background: c.bg, color: c.color,
    }}>{status}</span>
  );
};

const Checkbox = ({ checked, onChange, isDark }) => (
  <div onClick={onChange} style={{
    width: "16px", height: "16px", borderRadius: "4px",
    border: checked ? "2px solid #3b82f6" : isDark ? "2px solid #3a4460" : "2px solid #cbd5e1",
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

// ─────────────────────────────────────────────────────────────────────────────
// MODAL COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// 5. Order Details Modal
const OrderDetailsModal = ({ order, onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState("items");

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: isDark ? "#141824" : "#ffffff",
        borderRadius: "20px", width: "700px", maxWidth: "100%",
        maxHeight: "85vh", overflowY: "auto",
        border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0"
      }}>
        <div style={{
          padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: isDark ? "#0f1520" : "#f8fafc"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "18px" }}>📋 Order Details</h2>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>{order.orderId}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}><CloseIcon /></button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", padding: "16px 24px 0 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
          {["items", "customer", "payment", "status"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 16px", background: activeTab === tab ? (isDark ? "#1e3a8a" : "#3b82f6") : "none",
              border: "none", borderRadius: "8px 8px 0 0", cursor: "pointer",
              color: activeTab === tab ? "#fff" : (isDark ? "#94a3b8" : "#64748b"),
              fontSize: "12px", fontWeight: activeTab === tab ? 600 : 400
            }}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
          ))}
        </div>

        <div style={{ padding: "24px" }}>
          {activeTab === "items" && (
            <div>
              <h4 style={{ margin: "0 0 16px 0", fontSize: "14px" }}>Order Items</h4>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" }}>
                  <span>{item.name} x {item.qty}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontWeight: 700, borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", marginTop: "8px" }}>
                <span>Total Amount</span>
                <span style={{ color: "#3b82f6" }}>₹{order.amount}</span>
              </div>
            </div>
          )}
          {activeTab === "customer" && (
            <div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Customer Name</label>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>{order.user}</div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Phone Number</label>
                <div style={{ fontSize: "14px" }}>{order.userPhone}</div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Delivery Address</label>
                <div style={{ fontSize: "14px" }}>{order.userAddress}</div>
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Restaurant</label>
                <div style={{ fontSize: "14px" }}>{order.restaurant}</div>
              </div>
            </div>
          )}
          {activeTab === "payment" && (
            <div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Payment Status</label>
                <div><PayStatusBadge status={order.payStatus} isDark={isDark} /></div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Payment Method</label>
                <div style={{ fontSize: "14px" }}>{order.payMethod}</div>
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Order Amount</label>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#3b82f6" }}>₹{order.amount}</div>
              </div>
            </div>
          )}
          {activeTab === "status" && (
            <div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Order Status</label>
                <div><StatusBadge status={order.status} isDark={isDark} /></div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Restaurant Status</label>
                <div style={{ fontSize: "14px" }}>{order.restroStatus}</div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Driver Status</label>
                <div style={{ fontSize: "14px" }}>{order.driverStatus}</div>
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b" }}>Order Date</label>
                <div style={{ fontSize: "14px" }}>{order.date}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "16px 24px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 20px", background: "#1e3a8a", color: "#93c5fd", border: "none", borderRadius: "8px", cursor: "pointer" }}>Close</button>
        </div>
      </div>
    </div>
  );
};

// 6. Assign Rider Modal
const AssignRiderModal = ({ order, onClose, onAssign, isDark }) => {
  const [selectedRider, setSelectedRider] = useState(null);
  const [searchRider, setSearchRider] = useState("");

  const filteredRiders = availableRiders.filter(rider => 
    rider.name.toLowerCase().includes(searchRider.toLowerCase()) ||
    rider.phone.includes(searchRider)
  );

  const handleAssign = () => {
    if (selectedRider) {
      onAssign(order.id, selectedRider);
      onClose();
    }
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: isDark ? "#141824" : "#ffffff",
        borderRadius: "20px", width: "550px", maxWidth: "100%",
        border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0"
      }}>
        <div style={{
          padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "18px" }}>🛵 Assign Rider</h2>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>Order: {order.orderId} - {order.restaurant}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}><CloseIcon /></button>
        </div>

        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "6px" }}>Search Rider</label>
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchRider}
              onChange={(e) => setSearchRider(e.target.value)}
              style={{
                width: "100%", padding: "10px", background: isDark ? "#0f1520" : "#f8fafc",
                border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
                borderRadius: "8px", fontSize: "13px"
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "6px" }}>Available Riders</label>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {filteredRiders.map(rider => (
                <div
                  key={rider.id}
                  onClick={() => setSelectedRider(rider)}
                  style={{
                    padding: "12px", marginBottom: "8px", borderRadius: "10px",
                    background: selectedRider?.id === rider.id ? (isDark ? "#1e3a8a" : "#e0e7ff") : (isDark ? "#0f1520" : "#f8fafc"),
                    border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
                    cursor: "pointer", transition: "all 0.15s"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{rider.name}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{rider.phone}</div>
                    </div>
                    <div>
                      <span style={{
                        fontSize: "10px", padding: "2px 8px", borderRadius: "12px",
                        background: rider.status === "Available" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                        color: rider.status === "Available" ? "#22c55e" : "#ef4444"
                      }}>{rider.status}</span>
                      <div style={{ fontSize: "10px", color: "#64748b", marginTop: "4px" }}>{rider.vehicle}</div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredRiders.length === 0 && (
                <div style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>No riders found</div>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button>
          <button onClick={handleAssign} disabled={!selectedRider} style={{
            padding: "8px 20px", borderRadius: "8px", border: "none",
            background: selectedRider ? "#4a6cf7" : "#3a4460",
            color: selectedRider ? "white" : "#64748b",
            cursor: selectedRider ? "pointer" : "not-allowed"
          }}>Assign Rider</button>
        </div>
      </div>
    </div>
  );
};

// 7. Order Refund Modal
const OrderRefundModal = ({ order, onClose, onRefund, isDark }) => {
  const [refundAmount, setRefundAmount] = useState(order.amount);
  const [refundReason, setRefundReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("Original Payment Method");

  const handleRefund = () => {
    if (refundAmount > 0 && refundReason) {
      onRefund(order.id, { amount: refundAmount, reason: refundReason, method: refundMethod });
      onClose();
    }
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: isDark ? "#141824" : "#ffffff",
        borderRadius: "20px", width: "500px", maxWidth: "100%",
        border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0"
      }}>
        <div style={{
          padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "18px" }}>💰 Order Refund</h2>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>Order: {order.orderId}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}><CloseIcon /></button>
        </div>

        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "6px" }}>Original Amount</label>
            <div style={{ fontSize: "14px" }}>₹{order.amount}</div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "6px" }}>Refund Amount *</label>
            <input
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(Number(e.target.value))}
              style={{
                width: "100%", padding: "10px", background: isDark ? "#0f1520" : "#f8fafc",
                border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
                borderRadius: "8px", fontSize: "13px"
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "6px" }}>Refund Method</label>
            <select
              value={refundMethod}
              onChange={(e) => setRefundMethod(e.target.value)}
              style={{
                width: "100%", padding: "10px", background: isDark ? "#0f1520" : "#f8fafc",
                border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
                borderRadius: "8px", fontSize: "13px"
              }}
            >
              <option>Original Payment Method</option>
              <option>Wallet</option>
              <option>Bank Transfer</option>
              <option>Coupon Code</option>
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "6px" }}>Refund Reason *</label>
            <textarea
              rows="3"
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              placeholder="Why is this order being refunded?"
              style={{
                width: "100%", padding: "10px", background: isDark ? "#0f1520" : "#f8fafc",
                border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
                borderRadius: "8px", fontSize: "13px", resize: "vertical"
              }}
            />
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #1e2740", background: "#1a2035", color: "#94a3b8", cursor: "pointer" }}>Cancel</button>
          <button onClick={handleRefund} disabled={!refundReason || refundAmount <= 0} style={{
            padding: "8px 20px", borderRadius: "8px", border: "none",
            background: refundReason && refundAmount > 0 ? "#ef4444" : "#3a4460",
            color: refundReason && refundAmount > 0 ? "white" : "#64748b",
            cursor: refundReason && refundAmount > 0 ? "pointer" : "not-allowed"
          }}>Process Refund</button>
        </div>
      </div>
    </div>
  );
};

// 8. Order Tracking Modal
const OrderTrackingModal = ({ order, onClose, isDark }) => {
  const steps = [
    { name: "Order Placed", status: "completed", time: order.date },
    { name: "Order Confirmed", status: order.status !== "New" ? "completed" : "current", time: order.status !== "New" ? order.date : null },
    { name: "Preparing Food", status: order.restroStatus === "preparing" || order.restroStatus === "completed" ? "completed" : order.restroStatus === "pending" ? "pending" : "pending", time: null },
    { name: "Ready for Pickup", status: order.restroStatus === "ready" || order.restroStatus === "completed" ? "completed" : "pending", time: null },
    { name: "Out for Delivery", status: order.driverStatus === "out_for_delivery" || order.driverStatus === "delivered" ? "completed" : "pending", time: null },
    { name: "Delivered", status: order.driverStatus === "delivered" ? "completed" : "pending", time: order.driverStatus === "delivered" ? new Date().toLocaleString() : null },
  ];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: isDark ? "#141824" : "#ffffff",
        borderRadius: "20px", width: "550px", maxWidth: "100%",
        border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0"
      }}>
        <div style={{
          padding: "20px 24px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "18px" }}>📍 Order Tracking</h2>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>{order.orderId} - {order.restaurant}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}><CloseIcon /></button>
        </div>

        <div style={{ padding: "24px" }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "40px", position: "relative" }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  background: step.status === "completed" ? "#22c55e" : step.status === "current" ? "#3b82f6" : isDark ? "#2a3145" : "#e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {step.status === "completed" && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  {step.status === "current" && (
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }} />
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div style={{
                    position: "absolute", top: "24px", left: "11px",
                    width: "2px", height: "calc(100% - 8px)",
                    background: step.status === "completed" ? "#22c55e" : isDark ? "#2a3145" : "#e2e8f0"
                  }} />
                )}
              </div>
              <div style={{ flex: 1, paddingLeft: "12px" }}>
                <div style={{ fontWeight: 600, fontSize: "13px" }}>{step.name}</div>
                {step.time && <div style={{ fontSize: "10px", color: "#64748b" }}>{step.time}</div>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "16px 24px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Delivery Address</div>
            <div style={{ fontSize: "12px" }}>{order.userAddress}</div>
          </div>
          <button onClick={onClose} style={{ padding: "8px 16px", background: "#1e3a8a", color: "#93c5fd", border: "none", borderRadius: "8px", cursor: "pointer" }}>Close</button>
        </div>
      </div>
    </div>
  );
};

// Action Menu Dropdown for Order Actions
const OrderActionMenu = ({ order, onViewDetails, onAssignRider, onRefund, onTrackOrder, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: isDark ? "#64748b" : "#94a3b8", padding: "6px 10px",
          borderRadius: "6px", fontSize: "16px"
        }}
      >
        ⋮
      </button>
      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 45 }} />
          <div style={{
            position: "absolute", right: 0, top: "100%", marginTop: "8px",
            background: isDark ? "#141824" : "#ffffff",
            border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0",
            borderRadius: "10px", padding: "6px 0", minWidth: "170px", zIndex: 50
          }}>
            <button onClick={() => { onViewDetails(); setIsOpen(false); }} style={{ width: "100%", padding: "8px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
              <EyeIcon /> Order Details
            </button>
            <button onClick={() => { onAssignRider(); setIsOpen(false); }} style={{ width: "100%", padding: "8px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
              <TruckIcon /> Assign Rider
            </button>
            <button onClick={() => { onRefund(); setIsOpen(false); }} style={{ width: "100%", padding: "8px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
              <RefundIcon /> Order Refund
            </button>
            <button onClick={() => { onTrackOrder(); setIsOpen(false); }} style={{ width: "100%", padding: "8px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
              <LocationIcon /> Track Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const OrderTable = ({ isDark = true }) => {
  const [orders] = useState(demoOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const itemsPerPage = 10;
  const [quickFilter, setQuickFilter] = useState("all");

  // Modal states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null); // details, assign, refund, tracking

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

const matchesQuickFilter = (order) => {
  switch (quickFilter) {

    case "all":
      return true;

    case "new":
      return (
        order.status === "New" ||
        (
          order.restroStatus === "pending" &&
          order.driverStatus === "pending"
        )
      );

    case "accepted_preparing_out":
      return (
        ["Preparing", "Ready", "Out for Delivery", "Active"].includes(order.status) ||
        ["preparing", "ready", "out_for_delivery"].includes(order.restroStatus)
      );

    case "delivered":
      return (
        order.status === "Delivered" ||
        (
          order.restroStatus === "completed" &&
          order.driverStatus === "delivered"
        )
      );

    case "cancelled":
      return (
        order.status === "Cancelled" ||
        order.restroStatus === "cancelled"
      );

    default:
      return true;
  }
};

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(search.toLowerCase()) ||
      order.user.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "All" || order.payMethod === paymentFilter;
    const matchesQuick = matchesQuickFilter(order);
    
    let matchesPeriod = true;
    if (periodFilter !== "All") {
      const orderDate = new Date(order.date);
      const today = new Date();
      if (periodFilter === "Today") matchesPeriod = orderDate.toDateString() === today.toDateString();
      else if (periodFilter === "This Week") { const weekAgo = new Date(); weekAgo.setDate(today.getDate() - 7); matchesPeriod = orderDate >= weekAgo; }
      else if (periodFilter === "This Month") matchesPeriod = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
    }
    return matchesSearch && matchesStatus && matchesPayment && matchesPeriod && matchesQuick;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleAll = () => {
    if (selected.size === paginatedOrders.length) setSelected(new Set());
    else setSelected(new Set(paginatedOrders.map(o => o.id)));
  };
  const toggleOne = (id) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
  };

  const getQuickFilterCounts = () => ({
    all: orders.length,
    new: orders.filter(o => o.status === "New" || (o.restroStatus === "pending" && o.driverStatus === "pending")).length,
    accepted_preparing_out: orders.filter(o => ["Preparing", "Ready", "Out for Delivery", "Active"].includes(o.status) || ["preparing", "ready", "out_for_delivery"].includes(o.restroStatus)).length,
    delivered: orders.filter(o => o.status === "Delivered" || (o.restroStatus === "completed" && o.driverStatus === "delivered")).length,
    cancelled: orders.filter(o => o.status === "Cancelled" || o.restroStatus === "cancelled").length,
  });
  const counts = getQuickFilterCounts();

  // Action handlers
  const handleViewDetails = (order) => { setSelectedOrder(order); setModalType("details"); };
  const handleAssignRider = (order) => { setSelectedOrder(order); setModalType("assign"); };
  const handleRefund = (order) => { setSelectedOrder(order); setModalType("refund"); };
  const handleTrackOrder = (order) => { setSelectedOrder(order); setModalType("tracking"); };
  const handleAssign = (orderId, rider) => { alert(`Rider ${rider.name} assigned to order ${orderId}`); };
  const handleRefundProcess = (orderId, refundData) => { alert(`Refund of ₹${refundData.amount} processed for order ${orderId}`); };

  const styles = {
    container: { minHeight: "100vh", background: isDark ? "#0d1117" : "#f8fafc", fontFamily: "'Segoe UI', sans-serif", padding: isMobile ? "12px" : isTablet ? "16px 20px" : "20px 24px" },
    contentWrapper: { maxWidth: "1600px", margin: "0 auto", width: "100%" },
    header: { display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", marginBottom: "20px", gap: isMobile ? "16px" : "20px" },
    titleSection: { flex: isMobile ? "auto" : 1 },
    title: { fontSize: isMobile ? "20px" : "22px", fontWeight: 700, color: isDark ? "#f1f5f9" : "#0f172a", margin: 0 },
    subtitle: { fontSize: "12px", color: "#64748b", marginTop: "4px" },
    searchWrapper: { position: "relative", width: isMobile ? "100%" : isTablet ? "280px" : "350px", flexShrink: 0 },
    searchIcon: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#3b82f6" },
    searchInput: { width: "100%", padding: "11px 16px 11px 42px", background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "12px", fontSize: "13px", color: isDark ? "#f1f5f9" : "#1e293b", outline: "none", boxSizing: "border-box" },
    quickActionsRow: { display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px", padding: "12px 16px", background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "16px" },
    quickActionBtn: (isActive, type) => ({ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "40px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: "none", background: isActive ? type === "new" ? "#3b82f6" : type === "accepted" ? "#f59e0b" : type === "delivered" ? "#22c55e" : type === "cancelled" ? "#ef4444" : isDark ? "#1e3a8a" : "#e2e8f0" : isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9", color: isActive ? "#ffffff" : isDark ? "#94a3b8" : "#475569" }),
    quickBtnCount: { background: "rgba(0,0,0,0.2)", padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 },
    filtersRow: { display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "20px", paddingBottom: "12px", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0" },
    filterGroup: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)", padding: "4px 12px", borderRadius: "12px" },
    filterLabel: { fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" },
    filterBtn: (isActive) => ({ padding: "4px 10px", borderRadius: "16px", fontSize: "11px", fontWeight: 500, background: isActive ? "#3b82f6" : isDark ? "transparent" : "#f1f5f9", color: isActive ? "#fff" : isDark ? "#94a3b8" : "#475569", border: isActive ? "1px solid #3b82f6" : isDark ? "1px solid #2a3145" : "1px solid #e2e8f0", cursor: "pointer" }),
    selectionBar: { display: "flex", alignItems: "center", gap: "12px", background: isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.04)", border: isDark ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(59,130,246,0.15)", borderRadius: "8px", padding: "8px 16px", marginBottom: "16px" },
    tableCard: { background: isDark ? "#141824" : "#ffffff", border: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden" },
    tableWrapper: { overflowX: "auto", WebkitOverflowScrolling: "touch" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: isMobile ? "900px" : "1200px" },
    th: { padding: "12px 10px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#3b82f6", borderBottom: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#f8fafc", whiteSpace: "nowrap" },
    td: { padding: "10px 10px", fontSize: "12px", color: isDark ? "#e2e8f0" : "#1e293b", borderBottom: isDark ? "1px solid #1a2035" : "1px solid #f1f5f9" },
    pagination: { display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: isMobile ? "12px" : "0", padding: "14px 16px", borderTop: isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isDark ? "#0f1520" : "#f8fafc" },
    paginationInfo: { fontSize: "11px", color: "#64748b" },
    paginationButtons: { display: "flex", gap: "4px" },
    pageBtn: (disabled, isActive) => ({ width: "28px", height: "28px", borderRadius: "6px", border: isActive ? "1px solid #3b82f6" : isDark ? "1px solid #1e2740" : "1px solid #e2e8f0", background: isActive ? "#1e3a8a" : isDark ? "#141824" : "#ffffff", color: isActive ? "#93c5fd" : disabled ? isDark ? "#2d3a55" : "#cbd5e1" : isDark ? "#94a3b8" : "#64748b", cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }),
    scrollHint: { display: isMobile ? "flex" : "none", alignItems: "center", justifyContent: "center", marginBottom: "10px", padding: "6px 12px", fontSize: "10px", color: "#3b82f6", backgroundColor: isDark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.06)", borderRadius: "20px", width: "fit-content", margin: "0 auto 10px auto", gap: "6px" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <style>{`.custom-scroll::-webkit-scrollbar { height: 5px; } .custom-scroll::-webkit-scrollbar-track { background: ${isDark ? "#1a2035" : "#e2e8f0"}; border-radius: 10px; } .custom-scroll::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; } button:hover { opacity: 0.85; }`}</style>

        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>Orders</h1>
            <p style={styles.subtitle}>Manage and track all customer orders</p>
          </div>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}><SearchIcon /></span>
            <input type="text" style={styles.searchInput} placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div style={styles.quickActionsRow}>
          <button style={styles.quickActionBtn(quickFilter === "all", "all")} onClick={() => { setQuickFilter("all"); setCurrentPage(1); }}>📋 All Orders <span style={styles.quickBtnCount}>{counts.all}</span></button>
          <button style={styles.quickActionBtn(quickFilter === "new", "new")} onClick={() => { setQuickFilter("new"); setCurrentPage(1); }}>🆕 New Orders <span style={styles.quickBtnCount}>{counts.new}</span></button>
          <button style={styles.quickActionBtn(quickFilter === "accepted_preparing_out", "accepted")} onClick={() => { setQuickFilter("accepted_preparing_out"); setCurrentPage(1); }}>🍳 Active Orders <span style={styles.quickBtnCount}>{counts.accepted_preparing_out}</span></button>
          <button style={styles.quickActionBtn(quickFilter === "delivered", "delivered")} onClick={() => { setQuickFilter("delivered"); setCurrentPage(1); }}>✅ Delivered <span style={styles.quickBtnCount}>{counts.delivered}</span></button>
          <button style={styles.quickActionBtn(quickFilter === "cancelled", "cancelled")} onClick={() => { setQuickFilter("cancelled"); setCurrentPage(1); }}>❌ Cancelled <span style={styles.quickBtnCount}>{counts.cancelled}</span></button>
        </div>

        <div style={styles.filtersRow}>
          <div style={styles.filterGroup}><span style={styles.filterLabel}>Status:</span><div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}> {["All", "New", "Active", "Delivered", "Cancelled", "Preparing", "Ready", "Out for Delivery"].map(s => (<button key={s} style={styles.filterBtn(statusFilter === s)} onClick={() => { setStatusFilter(s); setCurrentPage(1); }}>{s}</button>))} </div></div>
          <div style={styles.filterGroup}><span style={styles.filterLabel}>Payment:</span><div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}> {["All", "COD", "Online"].map(p => (<button key={p} style={styles.filterBtn(paymentFilter === p)} onClick={() => { setPaymentFilter(p); setCurrentPage(1); }}>{p}</button>))} </div></div>
          <div style={styles.filterGroup}><span style={styles.filterLabel}>Period:</span><div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}> {["All", "Today", "This Week", "This Month"].map(per => (<button key={per} style={styles.filterBtn(periodFilter === per)} onClick={() => { setPeriodFilter(per); setCurrentPage(1); }}>{per}</button>))} </div></div>
        </div>

        {selected.size > 0 && (<div style={styles.selectionBar}><span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600 }}>✓ {selected.size} order{selected.size > 1 ? "s" : ""} selected</span><div style={{ flex: 1 }} /><button onClick={() => setSelected(new Set())} style={{ padding: "4px 12px", borderRadius: "6px", border: "1px solid #3b4460", background: "#1e2740", color: "#94a3b8", fontSize: "11px", cursor: "pointer" }}>Clear</button></div>)}

        {isMobile && filteredOrders.length > 0 && (<div style={styles.scrollHint}><span>👉</span> Swipe horizontally to see all columns <span>👈</span></div>)}

        <div style={styles.tableCard}>
          <div style={styles.tableWrapper} className="custom-scroll">
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}><Checkbox checked={selected.size === paginatedOrders.length && paginatedOrders.length > 0} onChange={toggleAll} isDark={isDark} /></th>
                  <th style={styles.th}>SN</th><th style={styles.th}>ID</th><th style={styles.th}>Status</th><th style={styles.th}>Date</th>
                  <th style={styles.th}>Restaurant</th><th style={styles.th}>User</th><th style={styles.th}>Pay</th><th style={styles.th}>Method</th>
                  <th style={styles.th}>Restro</th><th style={styles.th}>Driver</th><th style={styles.th}>User St.</th><th style={styles.th}>Amount</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, idx) => {
                  const sn = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <tr key={order.id} style={{ background: selected.has(order.id) ? (isDark ? "rgba(59,130,246,0.07)" : "rgba(59,130,246,0.03)") : "transparent" }}>
                      <td style={styles.td}><Checkbox checked={selected.has(order.id)} onChange={() => toggleOne(order.id)} isDark={isDark} /></td>
                      <td style={styles.td}>{sn}</td>
                      <td style={styles.td}>{order.orderId}</td>
                      <td style={styles.td}><StatusBadge status={order.status} isDark={isDark} /></td>
                      <td style={styles.td}>{order.date}</td>
                      <td style={styles.td}>{order.restaurant.length > 15 ? order.restaurant.substring(0, 12) + "..." : order.restaurant}</td>
                      <td style={styles.td}>{order.user}</td>
                      <td style={styles.td}><PayStatusBadge status={order.payStatus} isDark={isDark} /></td>
                      <td style={styles.td}>{order.payMethod}</td>
                      <td style={styles.td}>{order.restroStatus}</td>
                      <td style={styles.td}>{order.driverStatus}</td>
                      <td style={styles.td}>{order.userStatus}</td>
                      <td style={styles.td}>₹{order.amount}</td>
                      <td style={styles.td}>
                        <OrderActionMenu
                          order={order}
                          onViewDetails={() => handleViewDetails(order)}
                          onAssignRider={() => handleAssignRider(order)}
                          onRefund={() => handleRefund(order)}
                          onTrackOrder={() => handleTrackOrder(order)}
                          isDark={isDark}
                        />
                      </td>
                    </tr>
                  );
                })}
                {paginatedOrders.length === 0 && (<tr><td colSpan={14} style={{ padding: "50px", textAlign: "center", color: "#64748b" }}>No orders found</td></tr>)}
              </tbody>
            </table>
          </div>

          {filteredOrders.length > 0 && (
            <div style={styles.pagination}>
              <div style={styles.paginationInfo}>{Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrders.length)} - {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}</div>
              <div style={styles.paginationButtons}>
                <button style={styles.pageBtn(currentPage === 1, false)} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeftIcon /></button>
                {Array.from({ length: Math.min(isMobile ? 3 : 5, totalPages) }, (_, i) => {
                  let pageNum; if (totalPages <= (isMobile ? 3 : 5)) pageNum = i + 1;
                  else if (currentPage <= (isMobile ? 2 : 3)) pageNum = i + 1;
                  else if (currentPage >= totalPages - (isMobile ? 1 : 2)) pageNum = totalPages - (isMobile ? 2 : 4) + i;
                  else pageNum = currentPage - (isMobile ? 1 : 2) + i;
                  return pageNum <= totalPages && (<button key={pageNum} style={styles.pageBtn(false, currentPage === pageNum)} onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>);
                })}
                <button style={styles.pageBtn(currentPage === totalPages, false)} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRightIcon /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {modalType === "details" && selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setModalType(null)} isDark={isDark} />}
      {modalType === "assign" && selectedOrder && <AssignRiderModal order={selectedOrder} onClose={() => setModalType(null)} onAssign={handleAssign} isDark={isDark} />}
      {modalType === "refund" && selectedOrder && <OrderRefundModal order={selectedOrder} onClose={() => setModalType(null)} onRefund={handleRefundProcess} isDark={isDark} />}
      {modalType === "tracking" && selectedOrder && <OrderTrackingModal order={selectedOrder} onClose={() => setModalType(null)} isDark={isDark} />}
    </div>
  );
};

export default OrderTable;