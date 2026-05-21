import { useState, useEffect } from "react";
import logo from "../../assets/logozaptodoor.png";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Press Release", to: null },
  { label: "Services", to: null },
  { label: "Contact", to: null },
];

function HeaderPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => to && location.pathname === to;

  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />

      <header
        style={{
          width: "100%",
          height: "70px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          boxSizing: "border-box",
          background: scrolled
            ? "rgba(8, 5, 22, 0.85)"
            : "rgba(8, 5, 22, 0.4)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(140, 100, 255, 0.15)"
            : "1px solid rgba(255,255,255,0.06)",
          transition: "all 0.35s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── Glow strip ── */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: scrolled ? "60%" : "0%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.5), transparent)",
          transition: "width 0.6s ease",
          pointerEvents: "none",
        }} />

        {/* LOGO */}
        <img
          src={logo}
          alt="Zaptodoor"
          style={{ width: "120px", height: "46px", objectFit: "contain" }}
        />

        {/* DESKTOP NAV */}
        <nav
          className="ztd-desktop"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          {NAV.map(({ label, to }) => {
            const active = isActive(to);
            const inner = (
              <span
                style={{
                  position: "relative",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: active ? 500 : 400,
                  color: active ? "#fff" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  display: "inline-block",
                  background: active ? "rgba(120,80,255,0.15)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "#fff";
                  if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                {label}
                {active && (
                  <span style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "18px",
                    height: "2px",
                    borderRadius: "2px",
                    background: "linear-gradient(90deg, #a78bfa, #7c5af5)",
                  }} />
                )}
              </span>
            );
            return to ? (
              <Link key={label} to={to} style={{ textDecoration: "none" }}>{inner}</Link>
            ) : (
              <span key={label}>{inner}</span>
            );
          })}
        </nav>

        {/* CTA BUTTON */}
        <a
          className="ztd-desktop"
          href="https://play.google.com/store/apps/details?id=com.zaptodoor.user"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 20px",
            borderRadius: "50px",
            background: "linear-gradient(135deg, #7c5af5 0%, #5535cc 100%)",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.02em",
            boxShadow: "0 0 0 1px rgba(120,80,255,0.3), 0 4px 16px rgba(100,60,220,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 0 0 1px rgba(140,100,255,0.5), 0 8px 24px rgba(100,60,220,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 0 1px rgba(120,80,255,0.3), 0 4px 16px rgba(100,60,220,0.35)";
          }}
        >
          <i className="bi bi-google-play" style={{ fontSize: "13px" }} />
          Get the App
        </a>

        {/* HAMBURGER */}
        <button
          className="ztd-mobile"
          onClick={() => setIsDrawerOpen(true)}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: "10px",
          }}
        >
          <Menu size={20} />
        </button>
      </header>

      {/* SPACER */}
      <div style={{ height: "70px" }} />

      {/* MOBILE DRAWER */}
      {isDrawerOpen && (
        <>
          {/* backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.65)",
              zIndex: 2000,
              backdropFilter: "blur(4px)",
            }}
          />

          {/* panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "75%",
              maxWidth: "300px",
              height: "100%",
              background: "linear-gradient(160deg, #0d0a22 0%, #120e2a 100%)",
              zIndex: 3000,
              padding: "24px 20px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "0",
              borderLeft: "1px solid rgba(140,100,255,0.15)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
              animation: "ztdSlide 0.3s cubic-bezier(0.16,1,0.3,1)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {/* top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <img src={logo} alt="logo" style={{ width: "100px", height: "38px", objectFit: "contain" }} />
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  cursor: "pointer",
                  padding: "7px",
                  borderRadius: "8px",
                  display: "flex",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* links */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
              {NAV.map(({ label, to }) => {
                const active = isActive(to);
                const inner = (
                  <div
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                      padding: "13px 16px",
                      borderRadius: "10px",
                      background: active ? "rgba(120,80,255,0.15)" : "transparent",
                      borderLeft: active ? "2px solid #a78bfa" : "2px solid transparent",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <span style={{
                      color: active ? "#c4b5fd" : "rgba(255,255,255,0.75)",
                      fontSize: "16px",
                      fontWeight: active ? 500 : 400,
                    }}>
                      {label}
                    </span>
                  </div>
                );
                return to ? (
                  <Link key={label} to={to} style={{ textDecoration: "none" }}>{inner}</Link>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>

            {/* divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "20px 0" }} />

            {/* CTA */}
            <a
              href="https://play.google.com/store/apps/details?id=com.zaptodoor.user"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #7c5af5 0%, #5535cc 100%)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                boxShadow: "0 4px 20px rgba(100,60,220,0.35)",
              }}
            >
              <i className="bi bi-google-play" />
              Get the App
            </a>
          </div>
        </>
      )}

      <style>{`
        @keyframes ztdSlide {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @media (max-width: 768px) {
          .ztd-desktop { display: none !important; }
          .ztd-mobile  { display: flex !important; }
        }
        @media (min-width: 769px) {
          .ztd-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default HeaderPage;
