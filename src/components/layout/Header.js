import { useState } from "react";
import logo from "../../assets/logozaptodoor.png";

import Bg2video from "../../assets/IMG_1531.MOV";
import { MapPin, Search, Menu} from "lucide-react";
import bulk from "../../assets/image copy.png";
import mom from "../../assets/image copy 2.png";
import food from "../../assets/image copy 3.png";
import { Link } from "react-router-dom";

function Header() {

  const [showScanner, setShowScanner] = useState(false);

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
          height: "100vh",
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
            minHeight: "100vh",
            objectFit: "cover",
            objectPosition: "center top",
            zIndex: -2,
          }}
        >
          <source src={Bg2video} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.08)",
            zIndex: -1,
          }}
        />

    <div
  style={{
    width: "100%",
    height: "75px",
    display: "flex",
    alignItems: "center",
    padding: "0 40px",
    color: "#fff",
    zIndex: 1000,
    position: "relative",
  }}
>
  {/* Logo Left */}
  <img
    src={logo}
    alt="logo"
    style={{
      width: "130px",
      height: "55px",
      objectFit: "contain",
      position: "absolute",
      left: "40px",
    }}
  />

  {/* Center Navigation */}
  <div
    className="desktop-nav"
    style={{
      display: "flex",
      gap: "35px",
      margin: "0 auto",
      alignItems: "center",
      fontSize: "17px",
      fontWeight: "600",
    }}
  >
    <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
      Home
    </Link>

    <Link to="/About" style={{ color: "#fff", textDecoration: "none" }}>
      About
    </Link>

    <Link
      to="/Pressrelease"
      style={{ color: "#fff", textDecoration: "none" }}
    >
      Press Release
    </Link>

    <Link
      to="/Services"
      style={{ color: "#fff", textDecoration: "none" }}
    >
      Services
    </Link>

    <Link
      to="/Contact"
      style={{ color: "#fff", textDecoration: "none" }}
    >
      Contact
    </Link>
  </div>

  {/* Mobile Menu */}
  <button
    className="mobile-menu-btn"
    style={{
      display: "none",
      background: "none",
      border: "none",
      color: "#fff",
      position: "absolute",
      right: "40px",
    }}
  >
    <Menu size={30} />
  </button>
</div>
        {/* Hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "60px",
            color: "#fff",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px,5vw,55px)",
              textAlign: "center",
            }}
          >
            Welcome To{" "}
            <span style={{ color: "#6c5ce7" }}>
              Zaptodoor
            </span>{" "}
            Food Delivery
          </h1>

          {/* Search */}
         <div
  style={{
    display: "flex",
    gap: "20px",
    marginTop: "25px",
    width: "90%",
    maxWidth: "900px",
    flexWrap: "wrap",
  }}
>
            <div
              style={{
                flex: 1,
                position: "relative",
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
                }}
              />

              <input
                placeholder="Enter delivery location"
                style={{
                  width: "80%",
                  padding: "18px 18px 18px 45px",
                  borderRadius: "15px",
                  border: "none",
                  background: "rgba(0,0,0,0.4)",
                  color: "#fff",
                }}
              />
            </div>

            <div
              style={{
                flex: 1.5,
                position: "relative",
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
                }}
              />

              <input
                placeholder="Search restaurant..."
                style={{
                  width: "100%",
                  padding: "18px 18px 18px 45px",
                  borderRadius: "15px",
                  border: "none",
                  background: "rgba(0,0,0,0.4)",
                  color: "#fff",
                }}
              />
            </div>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "60px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {cards.map((item) => (
              <div
                key={item.title}
                onClick={() => setShowScanner(true)}
                style={{
                  width: "260px",
                  height: "230px",
                  borderRadius: "30px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(rgba(0,0,0,.4),rgba(108,92,231,.5))",
                  }}
                />

                <h2
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    color: "#fff",
                  }}
                >
                  {item.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Popup */}
      {showScanner && (
        <>
          <div
            onClick={() => setShowScanner(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.7)",
              zIndex: 5000,
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 6000,
              background: "#fff",
              padding: "25px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => setShowScanner(false)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                border: "none",
                background: "none",
                fontSize: "25px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h3
              style={{
                marginBottom: "15px",
                color: "#6c5ce7",
              }}
            >
              Scan QR Code
            </h3>

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://zaptodoor.com"
              alt="scanner"
              style={{
                width: "250px",
                height: "250px",
              }}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Header;