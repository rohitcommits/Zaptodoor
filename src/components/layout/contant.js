import { useState } from "react";
import boy from  "../../assets/image copy 4.png"
import Ecosystem from "../layout/Ecosystem"
import Slider from "./Slider"

export default function Contant() {
  
 const FEATURES = [
  {
    image: "https://zaptodoor.com/upload/file_6971d9376e0108.33087191.jfif",
    bg: "linear-gradient(135deg,#faf5ff,#ede9fe)",
    accent: "#7c3aed",
    title: "2 KM Free Delivery",
    desc: "Zero delivery charge on all orders within 2 km of your location.",
  },

  {
    image: "https://zaptodoor.com/upload/file_6971d9a97d17e9.71719349.jfif",
    bg: "linear-gradient(135deg,#fdf2f8,#fce7f3)",
    accent: "#db2777",
    title: "Monthly Rewards",
    desc: "Earn points on every order and redeem for exciting gifts each month.",
  },

  {
    image: "https://zaptodoor.com/upload/file_6971d97f539a27.95832544.jfif",
    bg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    accent: "#2563eb",
    title: "Smart Cart",
    desc: "Intelligent cart that remembers your preferences and reorders in one tap.",
  },

  {
    image: "https://zaptodoor.com/upload/file_6972434e01c837.49431007.jfif",
    bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    accent: "#16a34a",
    title: "Best Prices",
    desc: "Price-matched across all restaurant partners. Always the best deal.",
  },

  {
    image: "https://zaptodoor.com/upload/file_697243c5b85a68.36847179.jfif",
    bg: "linear-gradient(135deg,#faf5ff,#ede9fe)",
    accent: "#7c3aed",
    title: "Up to 50% Off",
    desc: "Exclusive member-only discounts on your favourite items every day.",
  },
];


const ECOSYSTEM = [
  { logo: 'https://zaptodoor.com/upload/file_69733d54bd8048.36718955.webp', title: 'Customer App', subtitle: 'For Food Lovers', desc: 'Browse local restaurants, track orders live, get doorstep delivery.', color: '#22c55e', link: 'https://play.google.com/store/apps/details?id=com.zaptodoor.user' },
  { logo: 'https://zaptodoor.com/upload/file_697b161f5a3f51.12535101.png', title: 'Business App', subtitle: 'For Restaurant & Store Owners', desc: 'Manage orders, track deliveries live, and grow your customer base.', color: '#3b82f6', link: 'https://play.google.com/store/apps/details?id=com.zaptodoor.business' },
  { logo: 'https://zaptodoor.com/upload/file_69733ce12b7270.37050481.webp', title: 'Rider App', subtitle: 'For Delivery Partners', desc: 'Earn on your own schedule. Smart navigation. Maximise daily income.', color: '#7c3aed', link: 'https://play.google.com/store/apps/details?id=com.zaptodoor.delivery' }
];
const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredBadge, setHoveredBadge] = useState(null);

  return (
    <main style={{ width: '100%', overflowX: 'hidden' }}>
      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 20px 80px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(124,58,237,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: '#22c55e',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'pulse 2s infinite'
              }} />
              Delivering across Gwalior & beyond
            </div>
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: '0 0 24px',
              color: '#0f172a'
            }}>
              Food you love,<br /><em style={{ color: '#7c3aed', fontStyle: 'normal' }}>delivered fast.</em>
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '500px'
            }}>
              Fresh flavours from 361+ restaurant partners, straight to your door.
              Free delivery within 2 km. Every order, every time.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#7c3aed',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                width: 'fit-content',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
              }} target="_blank" rel="noreferrer">
                <i className="bi bi-google-play" /> Order Now
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#f59e0b', fontSize: '18px' }}>
                  {[1,2,3].map(i => <i key={i} className="bi bi-star-fill" />)}
                  <i className="bi bi-star-half" />
                  <i className="bi bi-star" />
                </span>
                <span style={{ color: '#64748b', fontSize: '14px' }}>3.7 · 1,600+ happy customers</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              borderRadius: '40px',
              // padding: '20px',
              boxShadow: '0 25px 50px rgba(124,58,237,0.25)',
              position: 'relative',
              zIndex: 2
            }}>
              <img 
                src={boy} 
                alt="App preview" 
                style={{
                  width: '100%',
                  maxWidth: '980px',
                  height: 'auto',
                  display: 'block',
                  borderRadius:"10%"
                }}
              />
            </div>
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '-10%',
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              animation: 'float 3s ease-in-out infinite',
              zIndex: 1
            }}>
              {/* <img 
                src="https://zaptodoor.com/upload/file_6974665696f4a8.17625123.png" 
                alt="" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              /> */}
            </div>
            <div style={{
              position: 'absolute',
              bottom: '15%',
              right: '-5%',
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              animation: 'float 3s ease-in-out infinite 1s',
              zIndex: 1
            }}>
              {/* <img 
                src="https://zaptodoor.com/upload/file_6974672d4f2a49.06039686.jpg" 
                alt="" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
   <div
  style={{
    background:
      "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
    padding: "30px 20px",
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "25px",
    }}
  >
    {[
      {
        v: "1,600+",
        l: "Happy Customers",
        i: "bi-emoji-smile-fill",
        c: "#7c3aed",
      },
      {
        v: "361",
        l: "Restaurant Partners",
        i: "bi-shop",
        c: "#2563eb",
      },
      {
        v: "2 km",
        l: "Free Delivery Radius",
        i: "bi-bicycle",
        c: "#16a34a",
      },
      {
        v: "50%",
        l: "Max Discount",
        i: "bi-tags-fill",
        c: "#ea580c",
      },
      {
        v: "3.7 ★",
        l: "App Rating",
        i: "bi-star-fill",
        c: "#f59e0b",
      },
    ].map(({ v, l, i, c }) => (
      <div
        key={l}
        style={{
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "22px",
          padding: "35px 20px",
          textAlign: "center",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",
          transition: "all 0.35s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px) scale(1.03)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(124,58,237,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.06)";
        }}
      >
        {/* ICON */}
        <div
          style={{
            width: "70px",
            height: "70px",
            margin: "0 auto 18px",
            borderRadius: "50%",
            background: `${c}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className={`bi ${i}`}
            style={{
              fontSize: "32px",
              color: c,
            }}
          />
        </div>

        {/* VALUE */}
        <strong
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: "#0f172a",
            display: "block",
            marginBottom: "8px",
          }}
        >
          {v}
        </strong>

        {/* LABEL */}
        <span
          style={{
            fontSize: "15px",
            color: "#64748b",
            fontWeight: "500",
            letterSpacing: "0.3px",
          }}
        >
          {l}
        </span>
      </div>
    ))}
  </div>
</div>

      {/* FEATURES */}
{/* HEADING */}
<div
  style={{
    textAlign: "center",
    marginBottom: "40px",
    marginTop: "20px",
  }}
>
  <h2
    style={{
      fontSize: "42px",
      fontWeight: "800",
      color: "#1e293b",
      marginBottom: "12px",
      lineHeight: "1.2",
    }}
  >
    Why Choose Us?
  </h2>

  <p
    style={{
      fontSize: "17px",
      color: "#64748b",
      maxWidth: "650px",
      margin: "0 auto",
      lineHeight: "1.8",
    }}
  >
    Experience the best delivery service with amazing
    features
  </p>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 260px))",
    justifyContent: "center",
    gap: "24px",
    padding: "30px 30px",
  }}
>
  {FEATURES.map((f, i) => (
    <article
      key={i}
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: "18px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #ede9fe",
        boxShadow: "0 10px 30px rgba(124,58,237,0.08)",
        transition: "all 0.35s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-10px) scale(1.03)";
        e.currentTarget.style.boxShadow =
          "0 20px 40px rgba(124,58,237,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(124,58,237,0.08)";
      }}
    >
      {/* TOP GLOW */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: f.bg,
          opacity: 0.6,
        }}
      />

      {/* IMAGE */}
      <div
        style={{
          width: "100%",
          height: "170px",
          borderRadius: "18px",
          overflow: "hidden",
          marginBottom: "18px",
          background: f.bg,
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src={f.image}
          alt={f.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h3
          style={{
            color: f.accent,
            fontSize: "20px",
            fontWeight: "800",
            marginBottom: "10px",
            lineHeight: "1.3",
          }}
        >
          {f.title}
        </h3>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            lineHeight: "1.7",
          }}
        >
          {f.desc}
        </p>
      </div>
    </article>
  ))}
</div>

<Slider />

      {/* DOWNLOAD BANNER */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(124,58,237,0.2) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div>
            <span style={{
              color: '#a78bfa',
              fontWeight: 600,
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              display: 'block'
            }}>Available on Android</span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.2,
              margin: '0 0 16px',
              color: 'white'
            }}>
              Smarter deliveries<br />for everyday living.
            </h2>
            <p style={{ 
              fontSize: '18px', 
              color: '#94a3b8', 
              marginBottom: '32px',
              maxWidth: '500px',
              lineHeight: 1.6
            }}>
              One app. Thousands of flavours. Real-time tracking. Zero hassle.
            </p>
            <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user" target="_blank" rel="noreferrer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                style={{ height: '50px' }}
              />
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="https://zaptodoor.com/upload/file_69806ec2dfdb52.18567712.png" 
              alt="" 
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px' }}
            />
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}

      <Ecosystem/>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @media (max-width: 768px) {
          section {
            padding: 60px 16px !important;
          }
        }
      `}</style>
    </main>
  );
}