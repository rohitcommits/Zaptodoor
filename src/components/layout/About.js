import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header2";

const About = () => {

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-aos]").forEach((el) => {
      const delay = el.getAttribute("data-aos-delay") || 0;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `all 0.6s ease-out ${delay}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontFamily: "'DM Sans', Arial, sans-serif",
      background: "#08051a",
    },

    hero: {
      position: "relative",
      background: "linear-gradient(160deg, #0f0b28 0%, #1a0e3a 60%, #0c0820 100%)",
      padding: "90px 20px 80px",
      textAlign: "center",
      overflow: "hidden",
      borderBottom: "1px solid rgba(140,100,255,0.12)",
    },

    heroShape: {
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(120,80,255,0.08)",
      pointerEvents: "none",
    },

    heroTitle: {
      fontSize: "clamp(36px, 6vw, 60px)",
      fontWeight: "800",
      color: "#f0eeff",
      marginBottom: "12px",
      position: "relative",
      zIndex: 1,
      fontFamily: "'Syne', sans-serif",
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
    },

    heroTitleSpan: {
      background: "linear-gradient(90deg, #a78bfa, #7c5af5, #c084fc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },

    heroSubtitle: {
      fontSize: "17px",
      color: "rgba(255,255,255,0.45)",
      marginBottom: "24px",
      position: "relative",
      zIndex: 1,
      fontWeight: 300,
    },

    breadcrumb: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      color: "rgba(255,255,255,0.35)",
      position: "relative",
      zIndex: 1,
      fontSize: "14px",
      alignItems: "center",
    },

    breadcrumbLink: {
      color: "#a78bfa",
      textDecoration: "none",
      fontWeight: 500,
    },

    breadcrumbCurrent: {
      color: "rgba(255,255,255,0.65)",
    },

    // ✅ White + purple light background
    pageBg: {
      background: "linear-gradient(160deg, #ffffff 0%, #f5f0ff 50%, #ede5ff 100%)",
      padding: "60px 20px 80px",
      minHeight: "100vh",
    },

    contentWrapper: {
      maxWidth: "860px",
      margin: "0 auto",
    },

    // ✅ Light card for white bg
    contentCard: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "clamp(28px, 5vw, 52px)",
      border: "1px solid rgba(140,100,255,0.2)",
      boxShadow: "0 8px 40px rgba(120,80,255,0.1)",
    },

    lastUpdated: {
      fontSize: "0.8rem",
      color: "#aaa",
      marginBottom: "24px",
      letterSpacing: "0.04em",
    },

    mainTitle: {
      fontSize: "26px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#1a0e3a",
      lineHeight: 1.3,
      fontFamily: "'Syne', sans-serif",
    },

    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginTop: "40px",
      marginBottom: "16px",
      color: "#6d28d9",
      fontFamily: "'Syne', sans-serif",
      paddingLeft: "12px",
      borderLeft: "3px solid rgba(124,90,245,0.7)",
    },

    paragraph: {
      marginBottom: "15px",
      fontSize: "15px",
      lineHeight: "1.85",
      color: "#4b5563",
    },

    list: {
      marginBottom: "20px",
      paddingLeft: "0",
      listStyle: "none",
    },

    listItem: {
      marginBottom: "12px",
      fontSize: "15px",
      lineHeight: "1.7",
      paddingLeft: "22px",
      position: "relative",
      color: "#4b5563",
    },
  };

  return (
    <div style={styles.container}>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
      />

      <Header />

      {/* ── HERO with animations ── */}
      <div style={styles.hero}>

        {/* floating orb shapes */}
        <div style={{ ...styles.heroShape, width:"400px", height:"400px", top:"-100px", right:"-80px" }} />
        <div style={{ ...styles.heroShape, width:"280px", height:"280px", bottom:"-60px", left:"-60px" }} />

        {/* central glow */}
        <div style={{ position:"absolute", top:"-5%", left:"50%", transform:"translateX(-50%)", width:"600px", height:"350px", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(120,80,255,0.18) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />

        {/* animated floating particles */}
        <div className="ztd-particle" style={{ position:"absolute", width:"6px", height:"6px", borderRadius:"50%", background:"rgba(167,139,250,0.5)", top:"20%", left:"15%", animation:"ztdFloat 4s ease-in-out infinite" }} />
        <div className="ztd-particle" style={{ position:"absolute", width:"4px", height:"4px", borderRadius:"50%", background:"rgba(196,181,253,0.4)", top:"60%", left:"80%", animation:"ztdFloat 5.5s ease-in-out infinite 1s" }} />
        <div className="ztd-particle" style={{ position:"absolute", width:"8px", height:"8px", borderRadius:"50%", background:"rgba(139,92,246,0.3)", top:"35%", right:"20%", animation:"ztdFloat 3.8s ease-in-out infinite 0.5s" }} />
        <div className="ztd-particle" style={{ position:"absolute", width:"5px", height:"5px", borderRadius:"50%", background:"rgba(167,139,250,0.35)", bottom:"25%", left:"30%", animation:"ztdFloat 4.8s ease-in-out infinite 1.5s" }} />

        {/* animated ring */}
        <div style={{ position:"absolute", width:"300px", height:"300px", borderRadius:"50%", border:"1px solid rgba(167,139,250,0.1)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"ztdRing 8s linear infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:"480px", height:"480px", borderRadius:"50%", border:"1px solid rgba(124,90,245,0.06)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"ztdRing 14s linear infinite reverse", pointerEvents:"none" }} />

        <h1 data-aos="fade-up" style={styles.heroTitle}>
          <span style={styles.heroTitleSpan}>About</span> Us
        </h1>

        <p data-aos="fade-up" data-aos-delay="100" style={styles.heroSubtitle}>
          The story behind India's growing food delivery platform
        </p>

        <div data-aos="fade-up" data-aos-delay="200" style={styles.breadcrumb}>
          <a href="/" style={styles.breadcrumbLink}>Home</a>
          <span style={{ fontSize:"10px", opacity:0.5 }}>▸</span>
          <span style={styles.breadcrumbCurrent}>About Us</span>
        </div>
      </div>

      {/* ── CONTENT on white/purple bg ── */}
      <div style={styles.pageBg}>
        <div style={styles.contentWrapper}>
          <div data-aos="fade-up" style={styles.contentCard}>

            <div style={styles.lastUpdated}>Last Updated: 2025-12-09</div>

            <h2 style={styles.mainTitle}>Zaptodoor - About Us</h2>

            <p style={styles.paragraph}>
              Welcome to Zaptodoor, your ultimate destination for effortless
              and budget-friendly living! We bring you an amazing range of
              everyday essentials at unbeatable prices, right to your doorstep.
            </p>

            <h3 style={styles.sectionTitle}>Our Mission</h3>

            <p style={styles.paragraph}>
              We're on a mission to become India's top online retailer for
              essential goods. Everyone deserves access to premium quality
              products at pocket-friendly prices.
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong style={{ color:"#6d28d9" }}>Direct sourcing:</strong>{" "}
                We cut out the middleman to keep costs low.
              </li>
              <li style={styles.listItem}>
                <strong style={{ color:"#6d28d9" }}>Reliable delivery partners:</strong>{" "}
                Swift and secure delivery, every time.
              </li>
              <li style={styles.listItem}>
                <strong style={{ color:"#6d28d9" }}>User-friendly website:</strong>{" "}
                Shopping made as easy as a breeze.
              </li>
              <li style={styles.listItem}>
                <strong style={{ color:"#6d28d9" }}>Exceptional customer service:</strong>{" "}
                We're here to help with whatever you need.
              </li>
            </ul>

            <h3 style={styles.sectionTitle}>Our Team</h3>

            <p style={styles.paragraph}>
              The magic of Zaptodoor comes from our passionate team dedicated
              to making your shopping experience joyful and hassle-free.
            </p>

            <ul style={styles.list}>
              {[
                ["Founder & CEO", "Yash Raj Suri"],
                ["Managing Director (MD)", "Ashishika Suri"],
                ["Co-Founder", "Purnendu Kumar (Shiva)"],
                ["Chief Technology Officer (CTO)", "Neeraj Verma"],
                ["Chief Marketing Officer (CMO)", "Dujesh Khot"],
              ].map(([role, name]) => (
                <li key={role} style={styles.listItem}>
                  <strong style={{ color:"#6d28d9" }}>{role}:</strong>{" "}
                  {name}
                </li>
              ))}
            </ul>

            <h3 style={styles.sectionTitle}>Why Choose Zaptodoor?</h3>

            <ul style={styles.list}>
              {[
                ["Variety", "Food, groceries, medicines, fashion, dairy products, and parcel delivery services."],
                ["Value", "Direct sourcing means better pricing."],
                ["Convenience", "Shop from home with doorstep delivery."],
                ["Speed", "Fast and secure deliveries."],
                ["Support", "Friendly customer support anytime."],
              ].map(([label, desc]) => (
                <li key={label} style={styles.listItem}>
                  <strong style={{ color:"#6d28d9" }}>{label}:</strong>{" "}
                  {desc}
                </li>
              ))}
            </ul>

            <p style={{
              ...styles.paragraph,
              marginTop: "32px",
              padding: "20px 24px",
              background: "linear-gradient(135deg, rgba(120,80,255,0.07), rgba(196,181,253,0.12))",
              borderRadius: "12px",
              border: "1px solid rgba(140,100,255,0.25)",
              color: "#374151",
            }}>
              <strong style={{ color:"#6d28d9" }}>
                Ready to transform your shopping experience?
              </strong>{" "}
              Dive into the world of Zaptodoor today!
            </p>

          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        li[style]::before {
          content: "→";
          position: absolute;
          left: 0;
          color: rgba(109,40,217,0.6);
          font-size: 13px;
          top: 2px;
        }

        @keyframes ztdFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50%       { transform: translateY(-18px) scale(1.1); opacity: 1; }
        }

        @keyframes ztdRing {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }

        @media (max-width: 768px) {
          h1 { font-size: 36px !important; }
        }
      `}</style>
    </div>
  );
};

export default About;
