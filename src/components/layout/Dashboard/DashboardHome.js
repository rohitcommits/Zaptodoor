import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, 
} from "recharts";

// ===================== CUSTOM COMPONENTS =====================
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
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "6px",
    padding: "2px 8px",
    fontSize: "11px",
    fontWeight: 600,
    ...style
  }}>{children}</span>
);

const Button = ({ children, onClick, variant = "default", size = "default", style }) => {
  const baseStyle = {
    cursor: "pointer",
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
    ...style
  };
  return <button onClick={onClick} style={baseStyle}>{children}</button>;
};

// const Progress = ({ value, style }) => (
//   <div style={{ height: "6px", borderRadius: "3px", overflow: "hidden", ...style }}>
//     <div style={{ width: `${value}%`, height: "100%", background: "#6c63ff", transition: "width 0.3s ease" }} />
//   </div>
// );

const Separator = ({ orientation = "horizontal", style }) => (
  <div style={{
    ...(orientation === "horizontal" ? { height: "1px", width: "100%" } : { width: "1px", height: "100%" }),
    ...style
  }} />
);

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
  chartGrid: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
  tooltipBg: isDark ? "#1e2535" : "#ffffff",
  accent: "#6c63ff",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
});

// ===================== CHART TOOLTIP =====================
const ChartTip = ({ active, payload, label, isDark }) => {
  const t = getT(isDark);
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: t.tooltipBg, border: `1px solid ${t.border}`,
      borderRadius: "10px", padding: "10px 14px",
      boxShadow: t.shadow, fontSize: "12px",
    }}>
      {label && <p style={{ color: t.textMuted, marginBottom: "6px", fontWeight: 600 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600, margin: "2px 0" }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
};

// ===================== DUMMY DATA =====================
// Live Orders Data
const liveOrdersData = [
  { id: "#553", customer: "Rahul Sharma", restaurant: "Pizza Paradise", amount: 275, status: "preparing", time: "10:30 AM" },
  { id: "#552", customer: "Priya Mehta", restaurant: "Burger Factory", amount: 242, status: "out_for_delivery", time: "10:15 AM" },
  { id: "#551", customer: "Amit Singh", restaurant: "Sushi Central", amount: 337, status: "confirmed", time: "10:00 AM" },
  { id: "#550", customer: "Neha Gupta", restaurant: "Indian Spice", amount: 260, status: "preparing", time: "09:45 AM" },
  { id: "#549", customer: "Rajesh Kumar", restaurant: "Taco Bell", amount: 285, status: "delivered", time: "09:30 AM" },
];

// Weekly Revenue Data
const weeklyRevenueData = [
  { day: "Mon", revenue: 22400, orders: 310 },
  { day: "Tue", revenue: 38100, orders: 450 },
  { day: "Wed", revenue: 28700, orders: 350 },
  { day: "Thu", revenue: 55200, orders: 500 },
  { day: "Fri", revenue: 42600, orders: 480 },
  { day: "Sat", revenue: 70300, orders: 600 },
  { day: "Sun", revenue: 48900, orders: 550 },
];

// Monthly Revenue Data
const monthlyRevenueData = [
  { month: "Jan", revenue: 245000, orders: 2100 },
  { month: "Feb", revenue: 289000, orders: 2450 },
  { month: "Mar", revenue: 312000, orders: 2780 },
  { month: "Apr", revenue: 298000, orders: 2650 },
  { month: "May", revenue: 356000, orders: 3100 },
  { month: "Jun", revenue: 389000, orders: 3450 },
];

// Category Distribution
const categoryData = [
  { name: "Pizza", value: 35, color: "#6c63ff" },
  { name: "Burgers", value: 25, color: "#4fd1c5" },
  { name: "Indian", value: 20, color: "#f97316" },
  { name: "Chinese", value: 12, color: "#ec4899" },
  { name: "Others", value: 8, color: "#94a3b8" },
];

// Order Status Distribution
const orderStatusData = [
  { name: "Delivered", value: 2845, color: "#22c55e" },
  { name: "Pending", value: 342, color: "#f59e0b" },
  { name: "Preparing", value: 156, color: "#3b82f6" },
  { name: "Cancelled", value: 98, color: "#ef4444" },
];

// Revenue by Payment Method
const paymentMethodData = [
  { name: "COD", value: 45, color: "#6c63ff" },
  { name: "Razorpay", value: 38, color: "#4fd1c5" },
  { name: "Wallet", value: 17, color: "#f97316" },
];

// ===================== STAT CARD COMPONENT =====================
const StatCard = ({ icon, label, value, change, positive, bgColor, iconBg, isDark, onClick }) => {
  const t = getT(isDark);
  return (
    <Card onClick={onClick} style={{
      background: isDark ? t.surface : bgColor || "linear-gradient(135deg, #ffffff, #f8fafc)",
      border: `1px solid ${t.border}`, borderRadius: "16px",
      boxShadow: t.shadowSm, overflow: "hidden", position: "relative",
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}>
      <div style={{
        position: "absolute", right: "-18px", top: "-18px",
        width: "96px", height: "96px", borderRadius: "50%",
        background: `${iconBg || "#6c63ff"}1a`, pointerEvents: "none",
      }} />
      <CardHeader style={{ paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}>
            {label}
          </p>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px", background: iconBg || "#6c63ff",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            boxShadow: `0 4px 14px ${iconBg || "#6c63ff"}55`, flexShrink: 0,
          }}>
            {icon}
          </div>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: "28px", fontWeight: 800, color: t.text, lineHeight: 1.1 }}>
          {value}
        </p>
      </CardHeader>
      <CardContent style={{ paddingTop: "10px" }}>
        <Separator style={{ background: t.border, marginBottom: "10px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <Badge style={{
            background: positive ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
            color: positive ? "#10b981" : "#ef4444", border: "none", fontSize: "11px", fontWeight: 700,
          }}>
            {change}
          </Badge>
          <span style={{ fontSize: "11px", color: t.textMuted }}>vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

// ===================== LIVE ORDER CARD =====================
const LiveOrderCard = ({ order, isDark }) => {
  const t = getT(isDark);
  const statusConfig = {
    confirmed: { label: "Confirmed", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
    preparing: { label: "Preparing", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    out_for_delivery: { label: "Out for Delivery", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
    delivered: { label: "Delivered", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
    cancelled: { label: "Cancelled", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  };
  const config = statusConfig[order.status] || statusConfig.confirmed;

  return (
    <div style={{
      background: t.surfaceAlt, borderRadius: "12px", padding: "12px",
      border: `1px solid ${t.border}`, marginBottom: "10px",
      transition: "transform 0.2s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: 700, fontSize: "13px", color: t.text }}>{order.id}</span>
          <Badge style={{ background: config.bg, color: config.color, border: "none", fontSize: "10px" }}>
            {config.label}
          </Badge>
        </div>
        <span style={{ fontSize: "11px", color: t.textMuted }}>{order.time}</span>
      </div>
      <div style={{ fontSize: "12px", color: t.textSub, marginBottom: "4px" }}>
        {order.customer} • {order.restaurant}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#3b82f6" }}>₹{order.amount}</span>
        <Button size="sm" variant="outline" style={{ fontSize: "10px", height: "24px", padding: "0 10px", background: t.surface, borderColor: t.border }}>
          View Details
        </Button>
      </div>
    </div>
  );
};

// ===================== MAIN DASHBOARD =====================
const DashboardHome = ({ isDark = true }) => {
  // const navigate = useNavigate("");
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [liveOrders] = useState(liveOrdersData,"");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  // Stats Data
  const stats = [
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
      label: "Total Orders", value: "3,541", change: "+11.57%", positive: true, iconBg: "#22c55e"
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      label: "Total Revenue", value: "₹7.48L", change: "+17.98%", positive: true, iconBg: "#0ea5e9"
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
      label: "Pending Orders", value: "342", change: "-5.21%", positive: false, iconBg: "#f59e0b"
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
      label: "Delivered Orders", value: "2,845", change: "+8.32%", positive: true, iconBg: "#22c55e"
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="18" y1="6" x2="6" y2="18"/></svg>,
      label: "Cancelled Orders", value: "98", change: "-2.15%", positive: true, iconBg: "#ef4444"
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
      label: "Active Riders", value: "48", change: "+4.35%", positive: true, iconBg: "#8b5cf6"
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      label: "Active Restaurants", value: "156", change: "+12.5%", positive: true, iconBg: "#10b981"
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      label: "Active Customers", value: "24.9k", change: "+7.21%", positive: true, iconBg: "#ec4899"
    },
  ];

  const getStatsGrid = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(4, 1fr)";
  };

  const getMiddleGrid = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "1.5fr 1fr";
  };

  const getBottomGrid = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(2, 1fr)";
  };

  const currentRevenueData = selectedPeriod === "weekly" ? weeklyRevenueData : monthlyRevenueData;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: isMobile ? "16px" : isTablet ? "20px" : "24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ margin: 0, fontSize: isMobile ? "20px" : "24px", fontWeight: 700, color: t.text }}>Dashboard</h1>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: t.textMuted }}>Welcome back! Here's what's happening with your business today.</p>
        </div>

        {/* Stats Cards Grid - 8 Cards */}
        <div style={{ display: "grid", gridTemplateColumns: getStatsGrid(), gap: "16px", marginBottom: "24px" }}>
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} isDark={isDark} />
          ))}
        </div>

        {/* Revenue Chart and Live Orders Section */}
        <div style={{ display: "grid", gridTemplateColumns: getMiddleGrid(), gap: "16px", marginBottom: "24px" }}>
          {/* Revenue Chart */}
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <CardTitle style={{ color: t.text }}>Revenue Overview</CardTitle>
                  <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Order volume & earnings</p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button size="sm" variant={selectedPeriod === "weekly" ? "default" : "outline"} onClick={() => setSelectedPeriod("weekly")} style={{ background: selectedPeriod === "weekly" ? t.accent : "transparent", color: selectedPeriod === "weekly" ? "#fff" : t.textSub, borderColor: t.border, height: "28px" }}>Weekly</Button>
                  <Button size="sm" variant={selectedPeriod === "monthly" ? "default" : "outline"} onClick={() => setSelectedPeriod("monthly")} style={{ background: selectedPeriod === "monthly" ? t.accent : "transparent", color: selectedPeriod === "monthly" ? "#fff" : t.textSub, borderColor: t.border, height: "28px" }}>Monthly</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={isMobile ? 200 : 280}>
                <AreaChart data={currentRevenueData} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={t.accent} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={t.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
                  <XAxis dataKey={selectedPeriod === "weekly" ? "day" : "month"} tick={{ fontSize: 10, fill: t.textMuted }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: t.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                  <RechartsTooltip content={<ChartTip isDark={isDark} />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke={t.accent} strokeWidth={2.5} fill="url(#revenueGradient)" />
                  <Area type="monotone" dataKey="orders" name="Orders" stroke={t.success} strokeWidth={2} fill="none" strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: t.accent }} />
                  <span style={{ fontSize: "11px", color: t.textMuted }}>Revenue</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: t.success }} />
                  <span style={{ fontSize: "11px", color: t.textMuted }}>Orders</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Order Checking */}
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <CardTitle style={{ color: t.text }}>🔄 Live Order Checking</CardTitle>
                  <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Real-time order updates</p>
                </div>
                <Badge style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "none", fontSize: "10px" }}>
                  ● Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent style={{ maxHeight: isMobile ? "300px" : "400px", overflowY: "auto" }}>
              {liveOrders.map(order => (
                <LiveOrderCard key={order.id} order={order} isDark={isDark} />
              ))}
              <Button variant="outline" size="sm" style={{ width: "100%", marginTop: "10px", background: t.surfaceAlt, borderColor: t.border, color: t.textSub }}>
                View All Orders →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Category, Order Status, Payment Method */}
        <div style={{ display: "grid", gridTemplateColumns: getBottomGrid(), gap: "16px" }}>
          {/* Category Distribution */}
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
            <CardHeader>
              <CardTitle style={{ color: t.text }}>Category Distribution</CardTitle>
              <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Sales by category</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={isMobile ? 40 : 50} outerRadius={isMobile ? 70 : 85} paddingAngle={3} dataKey="value" stroke="none">
                    {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip content={<ChartTip isDark={isDark} />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "10px" }}>
                {categoryData.map(c => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: c.color }} />
                    <span style={{ fontSize: "11px", color: t.textMuted }}>{c.name}</span>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: t.text }}>{c.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
            <CardHeader>
              <CardTitle style={{ color: t.text }}>Order Status</CardTitle>
              <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Current order distribution</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
                <BarChart data={orderStatusData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: t.textMuted }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: t.text }} axisLine={false} tickLine={false} width={80} />
                  <RechartsTooltip content={<ChartTip isDark={isDark} />} />
                  <Bar dataKey="value" name="Orders" radius={[0, 4, 4, 0]}>
                    {orderStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Payment Method Distribution - Full Width */}
    <div style={{ marginTop: "16px" }}>
  <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
    <CardHeader>
      <CardTitle style={{ color: t.text }}>Payment Method Distribution</CardTitle>
      <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Revenue by payment type</p>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
        <BarChart data={paymentMethodData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: t.text }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: t.textMuted }} axisLine={false} tickLine={false} />
          <RechartsTooltip content={<ChartTip isDark={isDark} />} />
          <Bar dataKey="value" name="Percentage (%)" radius={[8, 8, 0, 0]}>
            {paymentMethodData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
</div>
      </div>
    </div>
  );
};

export default DashboardHome;