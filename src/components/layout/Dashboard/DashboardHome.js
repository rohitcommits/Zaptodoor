// DashboardHome.js
import React, { useState, useEffect } from "react";

const ORDERS = [
  { id: 553, final_amount: "275", order_status_user: "delivered",  created_at: "2026-05-23 15:04:58", user_name: "Neeraj Verma",  restaurant_name: "Neeraj Verma" },
  { id: 552, final_amount: "242", order_status_user: "cancelled",  created_at: "2026-05-20 22:49:31", user_name: "Mehul",          restaurant_name: "Pandit's Rolls and Momos" },
  { id: 551, final_amount: "337", order_status_user: "cancelled",  created_at: "2026-05-20 16:04:35", user_name: "Yash",           restaurant_name: "Neeraj Verma" },
  { id: 550, final_amount: "260", order_status_user: "cancelled",  created_at: "2026-05-20 16:02:18", user_name: "Yash",           restaurant_name: "Neeraj Verma" },
  { id: 549, final_amount: "285", order_status_user: "cancelled",  created_at: "2026-05-20 15:53:24", user_name: "Yash",           restaurant_name: "Neeraj Verma" },
  { id: 548, final_amount: "262", order_status_user: "cancelled",  created_at: "2026-05-20 15:39:57", user_name: "Neeraj Verma",   restaurant_name: "Neeraj Verma" },
  { id: 547, final_amount: "262", order_status_user: "cancelled",  created_at: "2026-05-20 15:35:33", user_name: "Neeraj Verma",   restaurant_name: "Neeraj Verma" },
  { id: 546, final_amount: "239", order_status_user: "cancelled",  created_at: "2026-05-16 11:26:40", user_name: "Neeraj Verma",   restaurant_name: "Shan E Punjab" },
  { id: 545, final_amount: "254", order_status_user: "delivered",  created_at: "2026-05-12 13:05:40", user_name: "Manglam",        restaurant_name: "Happiness Fast Food Restaurant" },
  { id: 544, final_amount: "310", order_status_user: "cancelled",  created_at: "2026-05-09 13:11:40", user_name: "Ramsharma",      restaurant_name: "MM Chaap DD Nagar" },
];

const STATS = {
  totalOrders: 8, totalDrivers: 182, totalRestaurants: 352,
  liveOrders: 0, onlineRiders: 2, liveRestaurants: 32,
  todayOrders: 0, totalUsers: 2605,
  cashInHand: "1552.00", todayRevenue: "0.00", onlineOrderValue: "0.00",
};

const WEEKLY = [42, 58, 35, 72, 88, 65, 45];
const DAYS   = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ── Inline SVG icon ────────────────────────────────────────────────────────
const Icon = ({ d, size = 15, color = "currentColor", sw = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

const ICONS = {
  package:  "M21 8l-9-5L3 8m18 0v8l-9 5-9-5V8m9 5v5M3 8l9 5",
  users:    ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75","M9 11a4 4 0 100-8 4 4 0 000 8z"],
  store:    ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"],
  moto:     "M5 17a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM5 17H3v-4l2-3h8l3 4h2m-7 0V9",
  cash:     ["M12 1v22","M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"],
  trend:    "M23 6l-9.5 9.5-5-5L1 18",
  calendar: ["M3 4h18v18H3z","M16 2v4M8 2v4M3 10h18"],
  search:   ["M11 19a8 8 0 100-16 8 8 0 000 16z","M21 21l-4.35-4.35"],
  live:     ["M22 12h-4l-3 9L9 3l-3 9H2"],
};

// ── Theme tokens ────────────────────────────────────────────────────────────
const getTheme = (isDark) => isDark
  ? {
      pageBg:           "#0c1018",
      panelBg:          "#141824",
      panelBorder:      "rgba(255,255,255,0.06)",
      titleColor:       "#f1f5f9",
      subColor:         "#475569",
      labelColor:       "#334155",
      statVal:          "#f1f5f9",
      searchBg:         "#0c1018",
      searchBorder:     "rgba(255,255,255,0.08)",
      searchFocus:      "rgba(99,102,241,0.5)",
      searchColor:      "#94a3b8",
      tdBorder:         "rgba(255,255,255,0.04)",
      thBorder:         "rgba(255,255,255,0.06)",
      rowHover:         "#1a1f2e",
      nameColor:        "#cbd5e1",
      restColor:        "#64748b",
      amtColor:         "#fbbf24",
      orderIdColor:     "#475569",
      dateColor:        "#475569",
      barBg:            "rgba(99,102,241,0.25)",
      barBorder:        "rgba(99,102,241,0.18)",
      barActiveBg:      "#6366f1",
      barActiveBorder:  "rgba(99,102,241,0.8)",
      barLabelActive:   "#818cf8",
      barDayColor:      "#475569",
      barDayActive:     "#94a3b8",
      success:          "#10b981",
      danger:           "#f43f5e",
      accent:           "#6366f1",
      accent2:          "#22d3ee",
      liveGlow:         "#10b981",
    }
  : {
      pageBg:           "#f1f5f9",
      panelBg:          "#ffffff",
      panelBorder:      "rgba(0,0,0,0.07)",
      titleColor:       "#0f172a",
      subColor:         "#94a3b8",
      labelColor:       "#c1cbd8",
      statVal:          "#0f172a",
      searchBg:         "#f8fafc",
      searchBorder:     "rgba(0,0,0,0.08)",
      searchFocus:      "rgba(99,102,241,0.4)",
      searchColor:      "#475569",
      tdBorder:         "rgba(0,0,0,0.05)",
      thBorder:         "rgba(0,0,0,0.07)",
      rowHover:         "#f8fafc",
      nameColor:        "#1e293b",
      restColor:        "#94a3b8",
      amtColor:         "#d97706",
      orderIdColor:     "#cbd5e1",
      dateColor:        "#94a3b8",
      barBg:            "rgba(99,102,241,0.1)",
      barBorder:        "rgba(99,102,241,0.15)",
      barActiveBg:      "#6366f1",
      barActiveBorder:  "rgba(99,102,241,0.6)",
      barLabelActive:   "#6366f1",
      barDayColor:      "#cbd5e1",
      barDayActive:     "#64748b",
      success:          "#059669",
      danger:           "#e11d48",
      accent:           "#6366f1",
      accent2:          "#0891b2",
      liveGlow:         "#059669",
    };

// ── Avatar ──────────────────────────────────────────────────────────────────
const Avatar = ({ name, isDark }) => {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const hue = (name.charCodeAt(0) * 37) % 360;
  return (
    <span style={{
      width: 28, height: 28, borderRadius: 7, flexShrink: 0,
      background: isDark ? `hsl(${hue}deg 35% 20%)` : `hsl(${hue}deg 60% 92%)`,
      border: `1px solid hsl(${hue}deg 40% ${isDark ? "35%" : "78%"})`,
      color: isDark ? `hsl(${hue}deg 70% 68%)` : `hsl(${hue}deg 55% 38%)`,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 600,
    }}>{initials}</span>
  );
};

// ── Status badge ────────────────────────────────────────────────────────────
const Badge = ({ status, t }) => {
  const ok = status === "delivered";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 9px", borderRadius: 20,
      fontSize: 10, fontWeight: 600, letterSpacing: "0.03em",
      background: ok ? t.success + "18" : t.danger + "18",
      color:      ok ? t.success       : t.danger,
      border:     `1px solid ${ok ? t.success + "35" : t.danger + "35"}`,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%", background: "currentColor",
        boxShadow: ok ? `0 0 5px ${t.success}` : "none",
      }} />
      {ok ? "Delivered" : "Cancelled"}
    </span>
  );
};

// ── Stat card ───────────────────────────────────────────────────────────────
const StatCard = ({ label, value, iconKey, accent, trend, live, t }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: t.panelBg,
        border: `1px solid ${hovered ? accent + "50" : t.panelBorder}`,
        borderRadius: 14,
        padding: "16px 18px",
        display: "flex", flexDirection: "column", gap: 9,
        transition: "all 0.2s ease",
        cursor: "default",
        boxShadow: hovered ? `0 0 16px ${accent}12` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 10, color: t.labelColor, fontWeight: 600,
          letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
        <span style={{
          width: 30, height: 30, borderRadius: 8,
          background: accent + "18", border: `1px solid ${accent}28`,
          display: "flex", alignItems: "center", justifyContent: "center", color: accent,
        }}>
          <Icon d={ICONS[iconKey]} size={14} sw={2} />
        </span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, color: t.statVal,
        letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {live && <span style={{ width: 6, height: 6, borderRadius: "50%",
            background: t.liveGlow, boxShadow: `0 0 6px ${t.liveGlow}` }} />}
          <span style={{ fontSize: 11, color: live ? t.liveGlow : t.subColor,
            fontWeight: 500 }}>{trend}</span>
        </div>
      )}
    </div>
  );
};

// ── Bar chart ───────────────────────────────────────────────────────────────
const BarChart = ({ t }) => {
  const max = Math.max(...WEEKLY);
  const [activeIdx, setActiveIdx] = useState(null);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150, paddingTop: 24 }}>
      {WEEKLY.map((v, i) => {
        const pct   = (v / max) * 100;
        const isAct = activeIdx === i;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 6 }}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 20,
              background: isAct ? t.accent + "18" : "transparent",
              color: isAct ? t.barLabelActive : "transparent",
              border: isAct ? `1px solid ${t.accent}28` : "1px solid transparent",
              transition: "all 0.15s",
            }}>{v}</span>
            <div style={{
              width: "100%",
              height: `${pct * 1.1}px`,
              borderRadius: "5px 5px 3px 3px",
              background: isAct ? t.barActiveBg : t.barBg,
              border:     `1px solid ${isAct ? t.barActiveBorder : t.barBorder}`,
              transition: "all 0.18s ease",
              cursor: "default",
            }} />
            <span style={{ fontSize: 10, fontWeight: 500,
              color: isAct ? t.barDayActive : t.barDayColor }}>{DAYS[i]}</span>
          </div>
        );
      })}
    </div>
  );
};

// ── Dashboard Home ──────────────────────────────────────────────────────────
const DashboardHome = ({ isDark = true }) => {
  const [search, setSearch] = useState("");
  const [dateStr, setDateStr] = useState("");
  const t = getTheme(isDark);

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString("en-IN", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
    }));
  }, []);

  const filtered = ORDERS.filter(o =>
    o.user_name.toLowerCase().includes(search.toLowerCase()) ||
    o.restaurant_name.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toString().includes(search)
  );

  const overviewCards = [
    { label: "Total orders",    value: STATS.totalOrders,                        iconKey: "package",  accent: t.accent },
    { label: "Total users",     value: STATS.totalUsers.toLocaleString("en-IN"), iconKey: "users",    accent: "#818cf8" },
    { label: "Restaurants",     value: STATS.totalRestaurants,                   iconKey: "store",    accent: "#f59e0b" },
    { label: "Drivers",         value: STATS.totalDrivers,                       iconKey: "moto",     accent: t.success },
    { label: "Cash in hand",    value: "₹" + Number(STATS.cashInHand).toLocaleString("en-IN"), iconKey: "cash", accent: "#34d399" },
    { label: "Today's revenue", value: "₹" + STATS.todayRevenue,                 iconKey: "trend",    accent: t.accent2 },
  ];

  const liveCards = [
    { label: "Live orders",      value: STATS.liveOrders,      iconKey: "live",     accent: t.success, trend: "Active now",   live: true },
    { label: "Online riders",    value: STATS.onlineRiders,    iconKey: "moto",     accent: t.accent2, trend: "Available",    live: true },
    { label: "Live restaurants", value: STATS.liveRestaurants, iconKey: "store",    accent: "#f59e0b", trend: "Open now",     live: true },
    { label: "Today's orders",   value: STATS.todayOrders,     iconKey: "calendar", accent: "#a78bfa", trend: "So far today", live: false },
  ];

  const panel = {
    background: t.panelBg,
    border: `1px solid ${t.panelBorder}`,
    borderRadius: 16,
    padding: "20px 22px",
    marginBottom: 14,
    transition: "background 0.2s, border-color 0.2s",
  };

  const sectionLabel = {
    fontSize: 10, fontWeight: 600, color: t.labelColor,
    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10,
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif",
      background: t.pageBg, minHeight: "100vh", padding: "28px 32px 40px",
      transition: "background 0.2s" }}>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 26,
        paddingBottom: 18, borderBottom: `1px solid ${t.panelBorder}` }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: t.titleColor,
            letterSpacing: "-0.01em" }}>Dashboard</div>
          <div style={{ fontSize: 11, color: t.subColor, marginTop: 2 }}>Welcome back, John</div>
        </div>
        <div style={{ fontSize: 12, color: t.subColor,
          background: t.panelBg, border: `1px solid ${t.panelBorder}`,
          padding: "7px 14px", borderRadius: 10,
          display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%",
            background: t.liveGlow, boxShadow: `0 0 7px ${t.liveGlow}` }} />
          {dateStr}
        </div>
      </div>

      {/* Overview */}
      <div style={sectionLabel}>Overview</div>
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 12 }}>
        {overviewCards.map((c, i) => <StatCard key={i} {...c} t={t} />)}
      </div>

      {/* Live */}
      <div style={{ ...sectionLabel, marginTop: 8 }}>Live status</div>
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 22 }}>
        {liveCards.map((c, i) => <StatCard key={i} {...c} t={t} />)}
      </div>

      {/* Chart */}
      <div style={panel}>
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: t.titleColor,
            letterSpacing: "-0.01em" }}>Weekly performance</span>
          <span style={{ fontSize: 11, color: t.subColor }}>Orders · Mon – Sun</span>
        </div>
        <BarChart t={t} />
      </div>

      {/* Orders */}
      <div style={panel}>
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 18 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: t.titleColor,
            letterSpacing: "-0.01em" }}>Recent orders</span>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ position: "absolute", left: 10, pointerEvents: "none" }}>
              <Icon d={ICONS.search} size={13} sw={2} color={t.labelColor} />
            </span>
            <input
              type="text"
              placeholder="Search orders…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                background: t.searchBg,
                border: `1px solid ${t.searchBorder}`,
                borderRadius: 10,
                padding: "8px 12px 8px 32px",
                fontSize: 12,
                color: t.searchColor,
                outline: "none",
                width: 210,
                transition: "border-color 0.15s",
              }}
              onFocus={e  => (e.target.style.borderColor = t.searchFocus)}
              onBlur={e   => (e.target.style.borderColor = t.searchBorder)}
            />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                {["Order", "Customer", "Restaurant", "Amount", "Status", "Date"].map(h => (
                  <th key={h} style={{
                    textAlign: "left", padding: "0 12px 12px",
                    fontSize: 10, fontWeight: 600, color: t.labelColor,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                    borderBottom: `1px solid ${t.thBorder}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center",
                  padding: 28, color: t.labelColor, fontSize: 12 }}>No orders found</td></tr>
              )}
              {filtered.map(o => {
                const d = new Date(o.created_at);
                const dateLabel = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
                return (
                  <tr key={o.id}
                    onMouseEnter={e => Array.from(e.currentTarget.cells).forEach(
                      td => (td.style.background = t.rowHover))}
                    onMouseLeave={e => Array.from(e.currentTarget.cells).forEach(
                      td => (td.style.background = "transparent"))}
                    style={{ transition: "background 0.12s", cursor: "default" }}>
                    <td style={{ padding: "12px", borderBottom: `1px solid ${t.tdBorder}`,
                      color: t.orderIdColor, fontFamily: "monospace", fontSize: 11 }}>#{o.id}</td>
                    <td style={{ padding: "12px", borderBottom: `1px solid ${t.tdBorder}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <Avatar name={o.user_name} isDark={isDark} />
                        <span style={{ color: t.nameColor, fontWeight: 500 }}>{o.user_name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px", borderBottom: `1px solid ${t.tdBorder}`,
                      color: t.restColor }}>{o.restaurant_name}</td>
                    <td style={{ padding: "12px", borderBottom: `1px solid ${t.tdBorder}`,
                      color: t.amtColor, fontWeight: 600,
                      fontVariantNumeric: "tabular-nums" }}>₹{o.final_amount}</td>
                    <td style={{ padding: "12px", borderBottom: `1px solid ${t.tdBorder}` }}>
                      <Badge status={o.order_status_user} t={t} />
                    </td>
                    <td style={{ padding: "12px", borderBottom: `1px solid ${t.tdBorder}`,
                      color: t.dateColor, fontVariantNumeric: "tabular-nums" }}>{dateLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;