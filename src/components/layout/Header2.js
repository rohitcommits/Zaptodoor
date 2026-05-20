import { useState } from "react";
import logo from "../../assets/logozaptodoor.png";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function HeaderPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />

      {/* HEADER WRAPPER */}
      <header
        style={{
          width: "100%",
          height: "75px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          boxSizing: "border-box",
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          style={{
            width: "130px",
            height: "55px",
            objectFit: "contain"
          }}
        />

        {/* NAV LINKS */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            gap: "25px",
            alignItems: "center",
            color: "#fff"
          }}
        >
          <strong style={{ cursor: "pointer" }}>Home</strong>

          <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
            <strong>About Us</strong>
          </Link>

          <strong>Press Release</strong>
          <strong>Services</strong>
          <strong>Contact</strong>
        </div>

        {/* GET APP BUTTON */}
        <button
          className="desktop-nav"
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "1px solid rgba(180,140,255,0.5)",
            background: "rgba(124,58,237,0.25)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.zaptodoor.user"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <i className="bi bi-google-play"></i>
            Get the App
          </a>
        </button>

        {/* MOBILE BUTTON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsDrawerOpen(true)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          <Menu size={28} />
        </button>
      </header>

      {/* FIX SPACE FOR FIXED HEADER (IMPORTANT) */}
      <div style={{ height: "75px" }} />

      {/* MOBILE DRAWER */}
      {isDrawerOpen && (
        <>
          <div
            onClick={() => setIsDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 2000
            }}
          />

          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "80%",
              maxWidth: "320px",
              height: "100%",
              background: "#111827",
              zIndex: 3000,
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "25px"
            }}
          >
            <button
              onClick={() => setIsDrawerOpen(false)}
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                color: "#fff"
              }}
            >
              <X size={28} />
            </button>

            <strong style={{ color: "#fff" }}>Home</strong>
            <Link to="/about" style={{ color: "#fff" }}>About Us</Link>
            <strong style={{ color: "#fff" }}>Press Release</strong>
            <strong style={{ color: "#fff" }}>Services</strong>
            <strong style={{ color: "#fff" }}>Contact</strong>
          </div>
        </>
      )}

      {/* RESPONSIVE */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default HeaderPage;