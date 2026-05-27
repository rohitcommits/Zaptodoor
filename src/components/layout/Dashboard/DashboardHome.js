import React, { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

// ===================== CUSTOM COMPONENTS =====================

const Card = ({ children, style }) => (
  <div style={{ ...style, transition: "all 0.3s ease" }}>{children}</div>
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

const Progress = ({ value, style }) => (
  <div style={{ height: "6px", borderRadius: "3px", overflow: "hidden", ...style }}>
    <div style={{ width: `${value}%`, height: "100%", background: "#6c63ff", transition: "width 0.3s ease" }} />
  </div>
);

const Separator = ({ orientation = "horizontal", style }) => (
  <div style={{
    ...(orientation === "horizontal" ? { height: "1px", width: "100%" } : { width: "1px", height: "100%" }),
    ...style
  }} />
);

// Dropdown Components
const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.Children.map(children, child => {
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, { onClick: () => setOpen(!open) });
        }
        if (child.type === DropdownMenuContent && open) {
          return React.cloneElement(child, { onClose: () => setOpen(false) });
        }
        return child;
      })}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, onClick, asChild }) => {
  if (asChild) return React.cloneElement(children, { onClick });
  return <div onClick={onClick}>{children}</div>;
};

const DropdownMenuContent = ({ children, align, style, onClose }) => (
  <div style={{
    position: "absolute",
    top: "100%",
    right: align === "end" ? 0 : "auto",
    marginTop: "4px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    minWidth: "150px",
    zIndex: 50,
    ...style
  }}>
    {React.Children.map(children, child => {
      if (child.type === DropdownMenuItem) {
        return React.cloneElement(child, { onClick: () => { child.props.onClick?.(); onClose?.(); } });
      }
      return child;
    })}
  </div>
);

const DropdownMenuItem = ({ children, onClick, style }) => (
  <div onClick={onClick} style={{
    padding: "8px 12px",
    fontSize: "12px",
    cursor: "pointer",
    transition: "background 0.15s",
    ...style
  }}>{children}</div>
);

// Select Components
const Select = ({ children, value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const handleSelect = (val) => {
    setSelectedValue(val);
    onValueChange?.(val);
    setOpen(false);
  };
  return (
    <div style={{ position: "relative" }}>
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { onClick: () => setOpen(!open), value: selectedValue });
        }
        if (child.type === SelectContent && open) {
          return React.cloneElement(child, { onSelect: handleSelect });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ children, onClick, value, style }) => (
  <div onClick={onClick} style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    borderRadius: "8px",
    padding: "0 12px",
    height: "32px",
    fontSize: "12px",
    ...style
  }}>
    <span>{value?.charAt(0).toUpperCase() + value?.slice(1)}</span>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
);

const SelectContent = ({ children, onSelect }) => (
  <div style={{
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "4px",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    zIndex: 50,
    overflow: "hidden"
  }}>
    {React.Children.map(children, child => {
      if (child.type === SelectItem) {
        return React.cloneElement(child, { onSelect });
      }
      return child;
    })}
  </div>
);

const SelectItem = ({ children, value, onSelect, style }) => (
  <div onClick={() => onSelect?.(value)} style={{
    padding: "8px 12px",
    fontSize: "12px",
    cursor: "pointer",
    transition: "background 0.15s",
    ...style
  }}>{children}</div>
);

// Tooltip Components
// const TooltipProvider = ({ children }) => <div>{children}</div>;
// const Tooltip = ({ children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div style={{ position: "relative", display: "inline-block" }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
//       {React.Children.map(children, child => {
//         if (child.type === TooltipTrigger) return child;
//         if (child.type === TooltipContent && open) return child;
//         return child;
//       })}
//     </div>
//   );
// };
// const TooltipTrigger = ({ children, asChild }) => asChild ? children : <span>{children}</span>;
// const TooltipContent = ({ children }) => (
//   <div style={{
//     position: "absolute",
//     bottom: "100%",
//     left: "50%",
//     transform: "translateX(-50%)",
//     marginBottom: "8px",
//     padding: "4px 8px",
//     borderRadius: "6px",
//     fontSize: "11px",
//     whiteSpace: "nowrap",
//     zIndex: 50
//   }}>{children}</div>
// );

// ===================== DATA =====================
const salesData = [
  { day: "Mon", revenue: 22400, orders: 310 },
  { day: "Tue", revenue: 38100, orders: 450 },
  { day: "Wed", revenue: 28700, orders: 350 },
  { day: "Thu", revenue: 55200, orders: 500 },
  { day: "Fri", revenue: 42600, orders: 480 },
  { day: "Sat", revenue: 70300, orders: 600 },
  { day: "Sun", revenue: 48900, orders: 550 },
  { day: "Mon", revenue: 60100, orders: 650 },
  { day: "Tue", revenue: 35400, orders: 400 },
  { day: "Wed", revenue: 50800, orders: 550 },
  { day: "Thu", revenue: 65200, orders: 600 },
  { day: "Fri", revenue: 45700, orders: 500 },
];

const categoryPieData = [
  { name: "Electronics", value: 38, color: "#6c63ff" },
  { name: "Apparel", value: 27, color: "#4fd1c5" },
  { name: "Home & Living", value: 18, color: "#f97316" },
  { name: "Accessories", value: 10, color: "#ec4899" },
  { name: "Others", value: 7, color: "#94a3b8" },
];

const trafficPieData = [
  { name: "Organic Search", value: 42, color: "#6c63ff" },
  { name: "Direct", value: 24, color: "#4fd1c5" },
  { name: "Social Media", value: 19, color: "#f97316" },
  { name: "Referral", value: 15, color: "#ec4899" },
];

const customerGrowthData = [
  { month: "Jan", new: 1240, returning: 820 },
  { month: "Feb", new: 1550, returning: 970 },
  { month: "Mar", new: 1380, returning: 1100 },
  { month: "Apr", new: 1920, returning: 1250 },
  { month: "May", new: 1680, returning: 1420 },
  { month: "Jun", new: 2100, returning: 1580 },
];

const radialData = [
  { name: "Revenue", value: 87, fill: "#6c63ff" },
  { name: "Orders", value: 72, fill: "#4fd1c5" },
  { name: "Customers", value: 64, fill: "#f97316" },
  { name: "Conversion", value: 53, fill: "#ec4899" },
];

const topProducts = [
  { name: "MacBook Pro 14\"", category: "Electronics", revenue: "$478,295", units: 2847, growth: 12.4, positive: true },
  { name: "Merino Wool Jacket", category: "Apparel", revenue: "$188,411", units: 1422, growth: 8.1, positive: true },
  { name: "Ceramic Desk Lamp", category: "Home", revenue: "$89,344", units: 1456, growth: -3.2, positive: false },
  { name: "ANC Headphones", category: "Electronics", revenue: "$234,565", units: 985, growth: 21.7, positive: true },
  { name: "Leather Weekender", category: "Accessories", revenue: "$71,032", units: 1996, growth: 5.9, positive: true },
];

const statCards = [
  {
    label: "Total Revenue", value: "$748.14M", change: "+17.98%", positive: true,
    sub: "vs last month",
    gradient: "linear-gradient(135deg,#e0f2fe 0%,#bae6fd 100%)",
    gradientDark: "linear-gradient(135deg,#0c2d48 0%,#0a2038 100%)",
    iconBg: "#0ea5e9", iconColor: "#fff",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Total Orders", value: "3,541", change: "+11.57%", positive: true,
    sub: "vs last month",
    gradient: "linear-gradient(135deg,#dcfce7 0%,#bbf7d0 100%)",
    gradientDark: "linear-gradient(135deg,#052e16 0%,#04231e 100%)",
    iconBg: "#22c55e", iconColor: "#fff",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "New Customers", value: "24.9k", change: "-2.41%", positive: false,
    sub: "vs last month",
    gradient: "linear-gradient(135deg,#fce7f3 0%,#fbcfe8 100%)",
    gradientDark: "linear-gradient(135deg,#3b0a22 0%,#2d0718 100%)",
    iconBg: "#ec4899", iconColor: "#fff",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Conversion Rate", value: "18.0%", change: "+7.21%", positive: true,
    sub: "vs last month",
    gradient: "linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%)",
    gradientDark: "linear-gradient(135deg,#1e1045 0%,#170d36 100%)",
    iconBg: "#7c3aed", iconColor: "#fff",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

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
          {p.name}: {typeof p.value === "number" && p.value > 999 ? `$${(p.value / 1000).toFixed(1)}k` : p.value}
        </p>
      ))}
    </div>
  );
};

// ===================== MORE MENU =====================
const MoreMenu = ({ isDark, items = ["View Details", "Export CSV", "Refresh"] }) => {
  const t = getT(isDark);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" style={{ width: "28px", height: "28px", color: t.textMuted }}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "10px", minWidth: "150px" }}>
        {items.map(i => (
          <DropdownMenuItem key={i} style={{ fontSize: "12px", color: t.text, cursor: "pointer", padding: "8px 12px" }}>
            {i}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ===================== HEADER =====================
const Header = ({ isDark }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "12px 16px" : "12px 28px",
      background: t.surface, borderBottom: `1px solid ${t.border}`,
      position: "sticky", top: 0, zIndex: 50, boxShadow: t.shadowSm,
      flexWrap: "wrap", gap: "12px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: isMobile ? 1 : "auto" }}>
        <Button variant="outline" size="icon" style={{ background: t.surfaceAlt, borderColor: t.border, color: t.textMuted, width: "36px", height: "36px" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Button>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: t.surfaceAlt, border: `1px solid ${t.border}`,
          borderRadius: "10px", padding: "8px 16px",
          width: isMobile ? "100%" : "260px",
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" width="14" height="14">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: "13px", color: t.textMuted }}>Search…</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "50%",
          background: "linear-gradient(135deg,#6c63ff,#4fd1c5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", color: "#fff", fontWeight: 700, cursor: "pointer",
          border: `2px solid ${t.border}`,
        }}>A</div>
      </div>
    </div>
  );
};

// ===================== STAT CARD =====================
const StatCard = ({ card, isDark }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;

  return (
    <Card style={{
      background: isDark ? card.gradientDark : card.gradient,
      border: `1px solid ${t.border}`, borderRadius: "16px",
      boxShadow: t.shadowSm, overflow: "hidden", position: "relative",
    }}>
      <div style={{
        position: "absolute", right: "-18px", top: "-18px",
        width: "96px", height: "96px", borderRadius: "50%",
        background: `${card.iconBg}1a`, pointerEvents: "none",
      }} />
      <CardHeader style={{ paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}>
            {card.label}
          </p>
          <div style={{
            width: isMobile ? "32px" : "40px",
            height: isMobile ? "32px" : "40px",
            borderRadius: "10px", background: card.iconBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: card.iconColor, boxShadow: `0 4px 14px ${card.iconBg}55`, flexShrink: 0,
          }}>
            <card.Icon />
          </div>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: isMobile ? "24px" : "30px", fontWeight: 800, color: isDark ? "#fff" : "#0f172a", lineHeight: 1.1 }}>
          {card.value}
        </p>
      </CardHeader>
      <CardContent style={{ paddingTop: "10px" }}>
        <Separator style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)", marginBottom: "10px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <Badge style={{
            background: card.positive ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
            color: card.positive ? "#10b981" : "#ef4444", border: "none", fontSize: "11px", fontWeight: 700, padding: "3px 8px",
          }}>
            {card.change}
          </Badge>
          <span style={{ fontSize: "11px", color: t.textMuted }}>{card.sub}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// ===================== SALES CHART =====================
const SalesChart = ({ isDark }) => {
  const t = getT(isDark);
  const [period, setPeriod] = useState("weekly");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;

  return (
    <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <CardTitle style={{ fontSize: isMobile ? "14px" : "15px", fontWeight: 700, color: t.text }}>Revenue Overview</CardTitle>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Total earnings and order volume</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: isMobile ? "16px" : "20px", fontWeight: 800, color: t.text }}>$36.1k</p>
              <Badge style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", border: "none", fontSize: "10px", padding: "1px 7px" }}>↑ 2.15%</Badge>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger style={{ width: "90px", height: "28px", fontSize: "11px", background: t.surfaceAlt, borderColor: t.border, color: t.textSub }}>
                <span>{period?.charAt(0).toUpperCase() + period?.slice(1)}</span>
              </SelectTrigger>
              <SelectContent>
                {["daily", "weekly", "monthly", "yearly"].map(v => (
                  <SelectItem key={v} value={v} style={{ fontSize: "12px", color: t.text }}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <MoreMenu isDark={isDark} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
          <AreaChart data={salesData} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gOrd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4fd1c5" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4fd1c5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: t.textMuted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: t.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
            <RechartsTooltip content={<ChartTip isDark={isDark} />} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6c63ff" strokeWidth={2.5} fill="url(#gRev)" />
            <Area type="monotone" dataKey="orders" name="Orders" stroke="#4fd1c5" strokeWidth={2} fill="url(#gOrd)" strokeDasharray="4 2" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// ===================== CATEGORY PIE =====================
const CategoryPie = ({ isDark }) => {
  const t = getT(isDark);
//   const [active, setActive] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;

  return (
    <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <CardTitle style={{ fontSize: isMobile ? "14px" : "15px", fontWeight: 700, color: t.text }}>Sales by Category</CardTitle>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Revenue distribution</p>
          </div>
          <MoreMenu isDark={isDark} />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 180 : 200}>
          <PieChart>
            <Pie
              data={categoryPieData} cx="50%" cy="50%"
              innerRadius={isMobile ? 40 : 50} outerRadius={isMobile ? 70 : 85}
              paddingAngle={3} dataKey="value" labelLine={false}
            >
              {categoryPieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <RechartsTooltip content={<ChartTip isDark={isDark} />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
          {categoryPieData.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: d.color, flexShrink: 0 }} />
                <span style={{ fontSize: "11px", color: t.textMuted }}>{d.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Progress value={d.value} style={{ width: "60px", height: "4px", background: t.surfaceAlt }} />
                <span style={{ fontSize: "12px", fontWeight: 600, color: t.text, minWidth: "28px", textAlign: "right" }}>{d.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ===================== TRAFFIC PIE =====================
const TrafficPie = ({ isDark }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;

  return (
    <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <CardTitle style={{ fontSize: isMobile ? "14px" : "15px", fontWeight: 700, color: t.text }}>Traffic Sources</CardTitle>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Visitor acquisition</p>
          </div>
          <MoreMenu isDark={isDark} />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 180 : 200}>
          <PieChart>
            <Pie data={trafficPieData} cx="50%" cy="50%" outerRadius={isMobile ? 70 : 85} paddingAngle={3} dataKey="value" stroke="none">
              {trafficPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <RechartsTooltip content={<ChartTip isDark={isDark} />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
          {trafficPieData.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: d.color }} />
                <span style={{ fontSize: "11px", color: t.textMuted }}>{d.name}</span>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: t.text }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ===================== CUSTOMER GROWTH BAR =====================
const CustomerGrowthBar = ({ isDark }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;

  return (
    <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <CardTitle style={{ fontSize: isMobile ? "14px" : "15px", fontWeight: 700, color: t.text }}>Customer Growth</CardTitle>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>New vs returning customers</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Badge style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", border: "none", fontSize: "11px", fontWeight: 700 }}>+4% MoM</Badge>
            <MoreMenu isDark={isDark} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, fontSize: isMobile ? "24px" : "28px", fontWeight: 800, color: t.text }}>87%</p>
            <p style={{ margin: 0, fontSize: "11px", color: t.textMuted }}>Retention rate</p>
          </div>
          <Progress value={87} style={{ flex: 1, height: "8px", background: t.surfaceAlt }} />
        </div>
        <ResponsiveContainer width="100%" height={isMobile ? 140 : 160}>
          <BarChart data={customerGrowthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
            <XAxis dataKey="month" tick={{ fontSize: 9, fill: t.textMuted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: t.textMuted }} axisLine={false} tickLine={false} />
            <RechartsTooltip content={<ChartTip isDark={isDark} />} />
            <Bar dataKey="new" name="New" fill="#6c63ff" radius={[4, 4, 0, 0]} />
            <Bar dataKey="returning" name="Returning" fill={isDark ? "#2d3748" : "#e2e8f0"} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <Separator style={{ background: t.border, margin: "12px 0 8px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#6c63ff" }} />
            <span style={{ fontSize: "10px", color: t.textMuted }}>New Customers</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: isDark ? "#2d3748" : "#cbd5e1" }} />
            <span style={{ fontSize: "10px", color: t.textMuted }}>Returning</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ===================== KPI GAUGES =====================
const KpiGauges = ({ isDark }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;

  return (
    <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <CardTitle style={{ fontSize: isMobile ? "14px" : "15px", fontWeight: 700, color: t.text }}>KPI Performance</CardTitle>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>Target achievement rates</p>
          </div>
          <MoreMenu isDark={isDark} />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="90%" data={radialData} startAngle={180} endAngle={-180}>
            <RadialBar minAngle={15} background={{ fill: t.surfaceAlt }} clockWise dataKey="value" cornerRadius={6} />
            <RechartsTooltip content={<ChartTip isDark={isDark} />} />
          </RadialBarChart>
        </ResponsiveContainer>
        <Separator style={{ background: t.border, margin: "8px 0 12px" }} />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "8px" }}>
          {radialData.map(d => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: d.fill, flexShrink: 0 }} />
              <div>
                <p style={{ margin: 0, fontSize: "10px", color: t.textMuted }}>{d.name}</p>
                <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: t.text }}>{d.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ===================== TOP PRODUCTS =====================
const TopProducts = ({ isDark }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;
  const categoryColors = { Electronics: "#6c63ff", Apparel: "#4fd1c5", Home: "#f97316", Accessories: "#ec4899" };

  if (isMobile) {
    return (
      <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
        <CardHeader>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <CardTitle style={{ fontSize: "14px", fontWeight: 700, color: t.text }}>Top Products</CardTitle>
              <p style={{ margin: "2px 0 0", fontSize: "11px", color: t.textMuted }}>By revenue this period</p>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <Button variant="outline" size="sm" style={{ fontSize: "11px", height: "28px", background: t.surfaceAlt, borderColor: t.border, color: t.textSub }}>
                Export
              </Button>
              <MoreMenu isDark={isDark} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {topProducts.map((p, i) => (
            <div key={i} style={{
              padding: "12px", borderBottom: i < topProducts.length - 1 ? `1px solid ${t.border}` : "none",
              cursor: "pointer", borderRadius: "8px", transition: "background 0.15s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "8px",
                  background: `${categoryColors[p.category] || "#94a3b8"}22`,
                  border: `1px solid ${categoryColors[p.category] || "#94a3b8"}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "3px", background: categoryColors[p.category] || "#94a3b8" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: t.text }}>{p.name}</p>
                  <Badge style={{ fontSize: "9px", padding: "2px 6px", background: `${categoryColors[p.category] || "#94a3b8"}11`, color: categoryColors[p.category] || t.textMuted }}>
                    {p.category}
                  </Badge>
                </div>
                <Badge style={{
                  background: p.positive ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                  color: p.positive ? "#10b981" : "#ef4444", border: "none", fontSize: "11px", fontWeight: 700,
                }}>
                  {p.positive ? "↑" : "↓"} {Math.abs(p.growth)}%
                </Badge>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: t.textMuted }}>Revenue</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: t.text }}>{p.revenue}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                <span style={{ fontSize: "12px", color: t.textMuted }}>Units Sold</span>
                <span style={{ fontSize: "13px", color: t.textSub }}>{p.units.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Desktop/Tablet view
  return (
    <Card style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", boxShadow: t.shadowSm }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <CardTitle style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Top Products</CardTitle>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: t.textMuted }}>By revenue this period</p>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <Button variant="outline" size="sm" style={{ fontSize: "11px", height: "28px", background: t.surfaceAlt, borderColor: t.border, color: t.textSub }}>
              Export
            </Button>
            <MoreMenu isDark={isDark} items={["View All Products", "Sort by Units", "Sort by Revenue"]} />
          </div>
        </div>
      </CardHeader>
      <CardContent style={{ paddingTop: 0, overflowX: "auto" }}>
        <div style={{ minWidth: "600px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px", gap: "8px", padding: "0 8px 8px", borderBottom: `1px solid ${t.border}` }}>
            {["Product", "Category", "Revenue", "Units", "Growth"].map(h => (
              <span key={h} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: t.textMuted }}>{h}</span>
            ))}
          </div>
          {topProducts.map((p, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px", gap: "8px", padding: "10px 8px",
              borderBottom: i < topProducts.length - 1 ? `1px solid ${t.border}` : "none", alignItems: "center",
              cursor: "pointer", borderRadius: "8px", transition: "background 0.15s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: `${categoryColors[p.category] || "#94a3b8"}22`,
                  border: `1px solid ${categoryColors[p.category] || "#94a3b8"}44`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: categoryColors[p.category] || "#94a3b8" }} />
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
              </div>
              <Badge style={{ fontSize: "10px", borderColor: `${categoryColors[p.category] || "#94a3b8"}55`, color: categoryColors[p.category] || t.textMuted, background: `${categoryColors[p.category] || "#94a3b8"}11`, width: "fit-content" }}>
                {p.category}
              </Badge>
              <span style={{ fontSize: "13px", fontWeight: 700, color: t.text }}>{p.revenue}</span>
              <span style={{ fontSize: "13px", color: t.textSub }}>{p.units.toLocaleString()}</span>
              <Badge style={{
                background: p.positive ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                color: p.positive ? "#10b981" : "#ef4444", border: "none", fontSize: "11px", fontWeight: 700, width: "fit-content",
              }}>
                {p.positive ? "↑" : "↓"} {Math.abs(p.growth)}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ===================== MAIN DASHBOARD HOME =====================
const DashboardHome = ({ isDark = true }) => {
  const t = getT(isDark);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const getStatsGrid = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(4, 1fr)";
  };

  const getMiddleGrid = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "1fr 280px 280px";
  };

  const getBottomGrid = () => {
    if (isMobile) return "1fr";
    return "1fr 1fr";
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <Header isDark={isDark} />
      <div style={{ padding: isMobile ? "0 16px 24px" : isTablet ? "0 20px 32px" : "0 28px 40px" }}>
        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 16px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: isMobile ? "18px" : "20px", fontWeight: 700, color: t.text }}>Ecommerce Dashboard</h1>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: t.textMuted }}>Welcome back — here's your store performance</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: t.textMuted }}>Dashboards</span>
            <span style={{ color: t.textMuted }}>›</span>
            <Badge style={{ background: "rgba(108,99,255,0.12)", color: "#6c63ff", border: "none", fontSize: "12px", fontWeight: 600 }}>Ecommerce</Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: getStatsGrid(), gap: "16px", marginBottom: "20px" }}>
          {statCards.map(c => <StatCard key={c.label} card={c} isDark={isDark} />)}
        </div>

        {/* Middle Section */}
        <div style={{ display: "grid", gridTemplateColumns: getMiddleGrid(), gap: "16px", marginBottom: "20px", alignItems: "start" }}>
          <SalesChart isDark={isDark} />
          <CategoryPie isDark={isDark} />
          {!isMobile && <TrafficPie isDark={isDark} />}
        </div>
        {isMobile && (
          <div style={{ marginBottom: "20px" }}>
            <TrafficPie isDark={isDark} />
          </div>
        )}

        {/* Bottom Section */}
        <div style={{ display: "grid", gridTemplateColumns: getBottomGrid(), gap: "16px", marginBottom: "20px" }}>
          <CustomerGrowthBar isDark={isDark} />
          <KpiGauges isDark={isDark} />
        </div>

        {/* Top Products */}
        <TopProducts isDark={isDark} />
      </div>
    </div>
  );
};

export default DashboardHome;