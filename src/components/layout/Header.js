import { useState } from "react";
import logo from "../../assets/logozaptodoor.png";

import Bg2video from "../../assets/IMG_1531.MOV";
import { MapPin, Search, Menu, X } from "lucide-react";
import bulk from "../../assets/image copy.png";
import mom from "../../assets/image copy 2.png";
import food from "../../assets/image copy 3.png";
import { Link } from "react-router-dom";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const cards = [
    {
      title: "EAT IN",
      image: food,
    },
    {
      title: "Take Away",
      image:
        "https://www.shutterstock.com/shutterstock/photos/2314029789/display_1500/stock-photo-espresso-coffee-extraction-from-a-professional-coffee-machine-with-a-bottomless-filter-close-up-of-2314029789.jpg",
    },
    {
      title: "mom chef",
      image: mom,
    },
    {
      title: "bulk",
      image: bulk,
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            zIndex: -2,
          }}
        >
          <source src={Bg2video} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: -1,
          }}
        />

        {/* Navbar */}
        <div
          style={{
            width: "100%",
            height: "75px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 40px",
            boxSizing: "border-box",
            color: "#fff",
            flexWrap: "wrap",
            gap: "10px",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "130px",
              height: "55px",
              objectFit: "contain",
            }}
          />

          {/* Desktop Navigation */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              gap: "25px",
              fontSize: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <strong>Home</strong>
            <Link
              to="/About"
              onClick={() => setIsDrawerOpen(false)}
              style={{
                color: "inherit",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              <strong
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                About Us
              </strong>
            </Link>
            <strong>Press Release</strong>
            <strong>Services</strong>
            <strong>Contact</strong>
          </div>

          <button
            className="desktop-nav"
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "1px solid rgba(180,140,255,0.5)",
              background: "rgba(180,140,255,0.2)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
              fontWeight: "bold",
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
                gap: "8px",
              }}
            >
              <i className="bi bi-google-play"></i>
              Get the App
            </a>
          </button>

          {/* Hamburger Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsDrawerOpen(true)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "10px",
            }}
          >
            <Menu size={30} />
          </button>
        </div>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setIsDrawerOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 2000,
                backdropFilter: "blur(5px)",
              }}
            />

            {/* Drawer */}
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "80%",
                maxWidth: "350px",
                height: "100vh",
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                zIndex: 3000,
                padding: "30px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.3s ease",
                boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  alignSelf: "flex-end",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <X size={30} />
              </button>

              {/* Navigation Links */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                  fontSize: "20px",
                }}
              >
                <strong
                  style={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Home
                </strong>
                <Link
                  to="/about"
                  onClick={() => setIsDrawerOpen(false)}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  <strong
                    style={{
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                    }}
                  >
                    About Us
                  </strong>
                </Link>
                <strong
                  style={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Press Release
                </strong>
                <strong
                  style={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Services
                </strong>
                <strong
                  style={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Contact
                </strong>
              </div>

              {/* Get App Button */}
              <button
                style={{
                  padding: "15px 20px",
                  borderRadius: "10px",
                  border: "1px solid rgba(180,140,255,0.5)",
                  background: "rgba(180,140,255,0.2)",
                  backdropFilter: "blur(10px)",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%",
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
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <i className="bi bi-google-play"></i>
                  Get the App
                </a>
              </button>
            </div>
          </>
        )}

        {/* Hero Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "60px",
            paddingBottom: "40px",
            color: "#bdc3c7",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Heading */}
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 55px)",
                textAlign: "center",
                width: "90%",
                maxWidth: "950px",
                lineHeight: "1.3",
                color: "#bdc3c7",
                marginBottom: "15px",
              }}
            >
              Welcome To <b style={{ color: "#6c5ce7" }}>Zaptodoor</b>Food
              delivery !
            </h1>

            {/* Right side under heading */}
            <a
              href="https://play.google.com/store/apps/details?id=com.zaptodoor.user"
              target="_blank"
              rel="noreferrer"
              style={{
                width: "90%",
                maxWidth: "800px",
                display: "flex",
                justifyContent: "flex-end",
                textDecoration: "none",
              }}
            ></a>
          </div>

          {/* Search Inputs */}
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "900px",
              marginTop: "25px",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {/* LOCATION */}
            <div
              style={{
                position: "relative",
                flex: "1 1 250px",
                minWidth: "200px",
              }}
            >
              <MapPin
                size={20}
                color="white"
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                }}
              />

              <input
                type="text"
                placeholder="Enter delivery location"
                style={{
                  width: "100%",
                  padding: "18px 18px 18px 45px",
                  borderRadius: "15px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  background: "rgba(0,0,0,0.45)",
                  color: "#fff",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* SEARCH */}
            <div
              style={{
                position: "relative",
                flex: "1.5 1 300px",
                minWidth: "200px",
              }}
            >
              <Search
                size={20}
                color="white"
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                }}
              />

              <input
                type="text"
                placeholder="Search restaurant, food..."
                style={{
                  width: "100%",
                  padding: "18px 18px 18px 45px",
                  borderRadius: "15px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  background: "rgba(0,0,0,0.45)",
                  color: "#fff",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "60px",
              flexWrap: "wrap",
              justifyContent: "center",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            {cards.map((item) => (
              <div
                key={item.title}
                style={{
                  width: "clamp(230px, 90vw, 260px)",
                  height: "230px",
                  borderRadius: "30px",
                  padding: "25px",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(15px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px) scale(1)";
                }}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -2,
                  }}
                />

                {/* Dark Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(rgba(0,0,0,0.5), rgba(108,92,231,0.6))",
                    zIndex: -1,
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    fontSize: "45px",
                    marginBottom: "15px",
                  }}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h2
                  style={{
                    position: "absolute",
                    left: "25px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    margin: 0,
                    fontSize: "clamp(22px, 4vw, 28px)",
                    fontWeight: "bold",
                    color: "#fff",
                    width: "70%",
                  }}
                >
                  {item.title.toUpperCase()}
                </h2>

                {/* Offer */}
                <p
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    fontSize: "clamp(16px, 3vw, 20px)",
                    fontWeight: "bold",
                    color: "#fff",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  }}
                >
                  UPTO{" "}
                  <span
                    style={{
                      color: "#FFD700",
                      fontSize: "clamp(20px, 4vw, 24px)",
                    }}
                  >
                    60% OFF
                  </span>
                </p>

                {/* Arrow Button */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#6c5ce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "25px",
                    boxShadow: "0 5px 15px rgba(108,92,231,0.6)",
                  }}
                >
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default Header;
