import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Store,
  Bike,
  Users,
  Boxes,
  BarChart3,
  Wallet,
  Headphones,
  ClipboardList,
  Star,
  Zap,
} from "lucide-react";

import { FaGooglePlay, FaApple } from "react-icons/fa";

const ZaptoDoorEcosystemTree = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const nodes = [
    {
      id: "root",
      label: "ZaptoDoor",
      icon: <Zap size={44} />,
      x: 50,
      y: 16,
      color: "#7c3aed",
      bg: "#f5f3ff",
      size: "xl",
      stats: "One Smart Delivery Platform",
    },

    {
      id: "customers",
      label: "Customers",
      icon: <ShoppingBag size={34} />,
      x: 16,
      y: 46,
      color: "#9333ea",
      bg: "#faf5ff",
      stats: "12k+ Active Users",
    },

    {
      id: "business",
      label: "Business Partners",
      icon: <Store size={34} />,
      x: 38,
      y: 46,
      color: "#6d28d9",
      bg: "#f5f3ff",
      stats: "850+ Stores",
    },

    {
      id: "riders",
      label: "Riders",
      icon: <Bike size={34} />,
      x: 62,
      y: 46,
      color: "#7e22ce",
      bg: "#faf5ff",
      stats: "500+ Delivery Riders",
    },

    {
      id: "team",
      label: "ZaptoDoor Team",
      icon: <Users size={34} />,
      x: 84,
      y: 46,
      color: "#581c87",
      bg: "#f3e8ff",
      stats: "24/7 Operations Team",
    },

    {
      id: "orders",
      label: "Orders",
      icon: <Boxes size={20} />,
      x: 10,
      y: 76,
      color: "#9333ea",
      bg: "#faf5ff",
      small: true,
    },

    {
      id: "reviews",
      label: "Reviews",
      icon: <Star size={20} />,
      x: 22,
      y: 76,
      color: "#a855f7",
      bg: "#faf5ff",
      small: true,
    },

    {
      id: "stores",
      label: "Stores",
      icon: <Store size={20} />,
      x: 34,
      y: 76,
      color: "#6d28d9",
      bg: "#f5f3ff",
      small: true,
    },

    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={20} />,
      x: 46,
      y: 76,
      color: "#7c3aed",
      bg: "#ede9fe",
      small: true,
    },

    {
      id: "delivery",
      label: "Delivery",
      icon: <Bike size={20} />,
      x: 58,
      y: 76,
      color: "#9333ea",
      bg: "#faf5ff",
      small: true,
    },

    {
      id: "earnings",
      label: "Earnings",
      icon: <Wallet size={20} />,
      x: 70,
      y: 76,
      color: "#7e22ce",
      bg: "#f5f3ff",
      small: true,
    },

    {
      id: "support",
      label: "Support",
      icon: <Headphones size={20} />,
      x: 82,
      y: 76,
      color: "#6b21a8",
      bg: "#faf5ff",
      small: true,
    },

    {
      id: "management",
      label: "Management",
      icon: <ClipboardList size={20} />,
      x: 94,
      y: 76,
      color: "#581c87",
      bg: "#f3e8ff",
      small: true,
    },
  ];

  const edges = [
    ["root", "customers"],
    ["root", "business"],
    ["root", "riders"],
    ["root", "team"],

    ["customers", "orders"],
    ["customers", "reviews"],

    ["business", "stores"],
    ["business", "analytics"],

    ["riders", "delivery"],
    ["riders", "earnings"],

    ["team", "support"],
    ["team", "management"],
  ];

  const ecosystemItems = [
    {
      id: 1,
      title: "Zaptodoor Rider App",

      description:
        "Earn flexibly on your own schedule. Accept deliveries, navigate smart routes, and maximize your daily earnings.",

      logo:
        "https://zaptodoor.com/upload/file_69733ce12b7270.37050481.webp",

      playstore:
        "https://play.google.com/store/apps/details?id=com.zaptodoor.delivery",

      appstore: "#",
    },

    {
      id: 2,
      title: "Zaptodoor Business App",

      description:
        "Grow your business effortlessly. Manage orders, track deliveries in real-time, and reach more customers.",

      logo:
        "https://zaptodoor.com/upload/file_697b161f5a3f51.12535101.png",

      playstore:
        "https://play.google.com/store/apps/details?id=com.zaptodoor.business",

      appstore: "#",
    },

    {
      id: 3,
      title: "Zaptodoor Customer App",

      description:
        "Get everything delivered fast. Browse local stores, track your orders live, and enjoy quick doorstep delivery.",

      logo:
        "https://zaptodoor.com/upload/file_69733d54bd8048.36718955.webp",

      playstore:
        "https://play.google.com/store/apps/details?id=com.zaptodoor.user",

      appstore: "#",
    },
  ];

  return (
    <section
      style={{
        padding: "90px 20px",
        background:
          "linear-gradient(180deg,#faf5ff 0%, #ffffff 45%, #f5f3ff 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1450px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <span
            style={{
              color: "#7c3aed",
              fontWeight: "700",
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Connected Platform
          </span>

          <h1
            style={{
              fontSize: isMobile
                ? "36px"
                : "clamp(42px,6vw,72px)",
              fontWeight: "900",
              color: "#1e1b4b",
              marginTop: "18px",
              marginBottom: "18px",
              lineHeight: "1",
            }}
          >
            ZaptoDoor Ecosystem
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: isMobile ? "15px" : "18px",
              lineHeight: "1.8",
            }}
          >
            A modern smart-delivery ecosystem connecting customers,
            business partners, riders and operations team together in
            real-time.
          </p>
        </div>

        {/* GRAPH ONLY FOR DESKTOP */}
        {!isMobile && (
          <div
            style={{
              position: "relative",
              height: "760px",
              background: "#ffffff",
              borderRadius: "42px",
              overflow: "hidden",
              border: "1px solid #e9d5ff",
              boxShadow: "0 30px 80px rgba(76,29,149,0.08)",
              marginBottom: "50px",
            }}
          >
            {/* GLOW */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at top, rgba(124,58,237,0.10), transparent 35%)",
              }}
            />

            {/* GRID */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(147,51,234,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.06) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* SVG CONNECTIONS */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {edges.map(([from, to], i) => {
                const fromNode = nodes.find(
                  (n) => n.id === from
                );

                const toNode = nodes.find(
                  (n) => n.id === to
                );

                return (
                  <g key={i}>
                    <line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke={fromNode.color}
                      strokeWidth={
                        activeNode === from ||
                        activeNode === to
                          ? 4
                          : 2.5
                      }
                      opacity={
                        activeNode === from ||
                        activeNode === to
                          ? 1
                          : 0.35
                      }
                    />

                    <circle r="4" fill={fromNode.color}>
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* NODES */}
            {nodes.map((node) => (
              <div
                key={node.id}
                onMouseEnter={() =>
                  setActiveNode(node.id)
                }
                onMouseLeave={() =>
                  setActiveNode(null)
                }
                style={{
                  position: "absolute",
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",

                  minWidth:
                    node.size === "xl"
                      ? "260px"
                      : node.small
                      ? "100px"
                      : "190px",

                  padding:
                    node.size === "xl"
                      ? "36px"
                      : node.small
                      ? "14px 10px"
                      : "26px",

                  borderRadius:
                    node.size === "xl"
                      ? "36px"
                      : node.small
                      ? "20px"
                      : "30px",

                  background: node.bg,

                  border:
                    activeNode === node.id
                      ? `2px solid ${node.color}`
                      : "1px solid #ede9fe",

                  textAlign: "center",

                  boxShadow:
                    activeNode === node.id
                      ? `0 20px 45px ${node.color}25`
                      : "0 10px 30px rgba(76,29,149,0.08)",

                  transition: "all 0.35s ease",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                {/* ICON */}
                <div
                  style={{
                    width:
                      node.size === "xl"
                        ? "84px"
                        : node.small
                        ? "44px"
                        : "66px",

                    height:
                      node.size === "xl"
                        ? "84px"
                        : node.small
                        ? "44px"
                        : "66px",

                    margin: "0 auto 16px",

                    borderRadius: "22px",

                    background: "#ffffff",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    color: node.color,

                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.06)",
                  }}
                >
                  {node.icon}
                </div>

                {/* TITLE */}
                <div
                  style={{
                    color: "#1e1b4b",
                    fontWeight: "800",
                    fontSize:
                      node.size === "xl"
                        ? "30px"
                        : node.small
                        ? "12px"
                        : "18px",
                  }}
                >
                  {node.label}
                </div>

                {/* STATS */}
                {!node.small && node.stats && (
                  <div
                    style={{
                      marginTop: "10px",
                      color: "#64748b",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {node.stats}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* APPS SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(3,1fr)",
            gap: "22px",
          }}
        >
          {ecosystemItems.map((app) => (
            <div
              key={app.id}
              style={{
                background: "#ffffff",
                border: "1px solid #ede9fe",
                borderRadius: "30px",
                padding: isMobile ? "24px" : "28px",
                boxShadow:
                  "0 15px 35px rgba(76,29,149,0.08)",
              }}
            >
              {/* LOGO */}
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  marginBottom: "22px",
                  background: "#f5f3ff",
                }}
              >
                <img
                  src={app.logo}
                  alt={app.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* TITLE */}
              <h3
                style={{
                  fontSize: isMobile ? "24px" : "26px",
                  fontWeight: "800",
                  color: "#1e1b4b",
                  marginBottom: "14px",
                  lineHeight: "1.3",
                }}
              >
                {app.title}
              </h3>

              {/* DESC */}
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.8",
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                {app.description}
              </p>

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {/* PLAYSTORE BUTTON */}
                <a
                  href={app.playstore}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minWidth: "150px",
                    textDecoration: "none",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      background:
                        "linear-gradient(135deg,#7c3aed,#5b21b6)",
                      color: "#fff",
                      border: "none",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      fontSize: "14px",
                      boxShadow:
                        "0 10px 25px rgba(124,58,237,0.25)",
                    }}
                  >
                    <FaGooglePlay size={18} />
                    Play Store
                  </button>
                </a>

                {/* APP STORE BUTTON */}
                <a
                  href={app.appstore}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minWidth: "150px",
                    textDecoration: "none",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      background: "#111827",
                      color: "#fff",
                      border: "none",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <FaApple size={18} />
                    App Store
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZaptoDoorEcosystemTree;