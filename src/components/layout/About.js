import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header2";

const About = () => {

  // AOS-like animation effect
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
      fontFamily: "'Poppins', Arial, sans-serif",
      paddingTop: "90px",
    },

    // Hero Section
    hero: {
      position: "relative",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "80px 20px",
      textAlign: "center",
      overflow: "hidden",
    },

    heroShape: {
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.1)",
    },

    heroTitle: {
      fontSize: "48px",
      fontWeight: "700",
      color: "#fff",
      marginBottom: "10px",
      position: "relative",
      zIndex: 1,
    },

    heroTitleSpan: {
      color: "#FFD600",
    },

    heroSubtitle: {
      fontSize: "18px",
      color: "rgba(255,255,255,0.9)",
      marginBottom: "20px",
      position: "relative",
      zIndex: 1,
    },

    breadcrumb: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      color: "rgba(255,255,255,0.8)",
      position: "relative",
      zIndex: 1,
    },

    breadcrumbLink: {
      color: "#FFD600",
      textDecoration: "none",
    },

    breadcrumbCurrent: {
      color: "#fff",
    },

    // Content Section
    pageBg: {
      background: "#f8f9fa",
      padding: "60px 20px",
      minHeight: "100vh",
    },

    contentWrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
    },

    contentCard: {
      background: "#fff",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },

    lastUpdated: {
      fontSize: "0.85rem",
      color: "#999",
      marginBottom: "20px",
    },

    mainTitle: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#333",
      lineHeight: 1.3,
    },

    sectionTitle: {
      fontSize: "22px",
      fontWeight: "600",
      marginTop: "30px",
      marginBottom: "15px",
      color: "#333",
    },

    paragraph: {
      marginBottom: "15px",
      fontSize: "16px",
      lineHeight: "1.8",
      color: "#555",
    },

    list: {
      marginBottom: "20px",
      paddingLeft: "20px",
      color: "#555",
    },

    listItem: {
      marginBottom: "10px",
      fontSize: "16px",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.container}>

      {/* Main Header */}
      <Header />

      {/* Hero Section */}
      <div style={styles.hero}>
        <div
          style={{
            ...styles.heroShape,
            width: "300px",
            height: "300px",
            top: "-50px",
            right: "-50px",
          }}
        />

        <div
          style={{
            ...styles.heroShape,
            width: "200px",
            height: "200px",
            bottom: "-30px",
            left: "-30px",
          }}
        />

        <h1 data-aos="fade-up" style={styles.heroTitle}>
          <span style={styles.heroTitleSpan}>About</span> Us
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
          style={styles.heroSubtitle}
        >
          The story behind India's growing food delivery platform
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          style={styles.breadcrumb}
        >
          <a href="/" style={styles.breadcrumbLink}>
            Home
          </a>

          <span>›</span>

          <span style={styles.breadcrumbCurrent}>About Us</span>
        </div>
      </div>

      {/* Content Section */}
      <div style={styles.pageBg}>
        <div style={styles.contentWrapper}>
          <div data-aos="fade-up" style={styles.contentCard}>
            <div style={styles.lastUpdated}>
              Last Updated: 2025-12-09
            </div>

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
                <strong>Direct sourcing:</strong> We cut out the middleman to
                keep costs low.
              </li>

              <li style={styles.listItem}>
                <strong>Reliable delivery partners:</strong> Swift and secure
                delivery, every time.
              </li>

              <li style={styles.listItem}>
                <strong>User-friendly website:</strong> Shopping made as easy
                as a breeze.
              </li>

              <li style={styles.listItem}>
                <strong>Exceptional customer service:</strong> We're here to
                help with whatever you need.
              </li>
            </ul>

            <h3 style={styles.sectionTitle}>Our Team</h3>

            <p style={styles.paragraph}>
              The magic of Zaptodoor comes from our passionate team dedicated
              to making your shopping experience joyful and hassle-free.
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Founder & CEO:</strong> Yash Raj Suri
              </li>

              <li style={styles.listItem}>
                <strong>Managing Director (MD):</strong> Ashishika Suri
              </li>

              <li style={styles.listItem}>
                <strong>Co-Founder:</strong> Purnendu Kumar (Shiva)
              </li>

              <li style={styles.listItem}>
                <strong>Chief Technology Officer (CTO):</strong> Neeraj Verma
              </li>

              <li style={styles.listItem}>
                <strong>Chief Marketing Officer (CMO):</strong> Dujesh Khot
              </li>
            </ul>

            <h3 style={styles.sectionTitle}>Why Choose Zaptodoor?</h3>

            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Variety:</strong> Food, groceries, medicines, fashion,
                dairy products, and parcel delivery services.
              </li>

              <li style={styles.listItem}>
                <strong>Value:</strong> Direct sourcing means better pricing.
              </li>

              <li style={styles.listItem}>
                <strong>Convenience:</strong> Shop from home with doorstep
                delivery.
              </li>

              <li style={styles.listItem}>
                <strong>Speed:</strong> Fast and secure deliveries.
              </li>

              <li style={styles.listItem}>
                <strong>Support:</strong> Friendly customer support anytime.
              </li>
            </ul>

            <p style={styles.paragraph}>
              <strong>
                Ready to transform your shopping experience? Dive into the
                world of Zaptodoor today!
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }

        @media (max-width: 768px) {
          body {
            padding-top: 70px;
          }

          h1 {
            font-size: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;