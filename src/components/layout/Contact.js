import React from "react";
import Footer from "./Footer";
import Headerpage from "./Header2.js";

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  outline: "none",
  background: "#f9fafb",
  fontSize: "15px",
  color: "#111827",
  boxSizing: "border-box",
};

const ContactPage = () => {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "#f4f5fb",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <Headerpage />

      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          minHeight: "120px",
          padding: "20px 15px",
          textAlign: "center",
          background:
            "linear-gradient(135deg,#0b0417 0%,#160a2e 40%,#6d28d9 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* GLOW EFFECT */}
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            background: "rgba(168,85,247,0.16)",
            filter: "blur(40px)",
            borderRadius: "50%",
            top: "-120px",
            left: "-80px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            background: "rgba(124,58,237,0.14)",
            filter: "blur(35px)",
            borderRadius: "50%",
            bottom: "-100px",
            right: "-60px",
          }}
        />

        <h1
          style={{
            fontSize: "clamp(28px,4vw,48px)",
            fontWeight: "700",
            marginBottom: "6px",
            position: "relative",
            zIndex: 2,
            letterSpacing: "-0.5px",
            lineHeight: "1.1",
          }}
        >
          Contact <span style={{ color: "#c084fc" }}>Us</span>
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            fontSize: "13px",
            position: "relative",
            zIndex: 2,
            opacity: 0.9,
            flexWrap: "wrap",
          }}
        >
          <span>Home</span>
          <span>›</span>
          <span style={{ color: "#c084fc" }}>Contact Us</span>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        style={{
          padding: "60px 20px",
          marginTop: "-20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
            gap: "35px",
            alignItems: "stretch",
          }}
        >
          {/* LEFT CARD */}
          <div
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "30px",
              padding: "38px",
              boxShadow: "0 10px 45px rgba(109,40,217,0.12)",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "35px",
                color: "#111827",
                fontWeight: "700",
              }}
            >
              Get in Touch
            </h2>

            {/* ADDRESS */}
            <div
              style={{
                display: "flex",
                gap: "18px",
                marginBottom: "28px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#9333ea)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  boxShadow: "0 10px 25px rgba(124,58,237,0.35)",
                }}
              >
                🏢
              </div>

              <div
                style={{
                  lineHeight: "1.8",
                  color: "#4b5563",
                  fontSize: "15px",
                }}
              >
                <strong style={{ color: "#111827" }}>
                  ZAPTODOOR PRIVATE LIMITED
                </strong>
                <br />
                Gwalior, Madhya Pradesh
              </div>
            </div>

            {/* PHONE */}
            <div
              style={{
                display: "flex",
                gap: "18px",
                marginBottom: "28px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#9333ea)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  boxShadow: "0 10px 25px rgba(124,58,237,0.35)",
                }}
              >
                ☎️
              </div>

              <div style={{ lineHeight: "2" }}>
                <a
                  href="tel:+919200018690"
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
                    fontSize: "15px",
                  }}
                >
                  +91 9200018690
                </a>

                <br />

                <a
                  href="tel:+918370083744"
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
                    fontSize: "15px",
                  }}
                >
                  +91 83700 83744 (IVR)
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div
              style={{
                display: "flex",
                gap: "18px",
                marginBottom: "35px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#9333ea)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  boxShadow: "0 10px 25px rgba(124,58,237,0.35)",
                }}
              >
                📩
              </div>

              <div>
                <a
                  href="mailto:info@zaptodoor.com"
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
                    fontSize: "15px",
                  }}
                >
                  info@zaptodoor.com
                </a>
              </div>
            </div>

            {/* MAP */}
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.662177972788!2d78.17027697498769!3d26.207665490034653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c570bc507f51%3A0xbb925da31503b827!2sZaptodoor!5e0!3m2!1sen!2sin"
                width="100%"
                height="320"
                style={{
                  border: "0",
                }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div
            style={{
              background: "#fff",
              borderRadius: "30px",
              padding: "40px",
              boxShadow: "0 10px 45px rgba(109,40,217,0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "35px",
                color: "#111827",
                fontWeight: "700",
              }}
            >
              Send a Message
            </h2>

            <form>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(220px,1fr))",
                  gap: "20px",
                }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  style={inputStyle}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  style={inputStyle}
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Subject"
                  style={inputStyle}
                />
              </div>

              <textarea
                rows="7"
                placeholder="Write your message..."
                style={{
                  ...inputStyle,
                  marginTop: "20px",
                  resize: "none",
                  paddingTop: "18px",
                }}
              ></textarea>

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "25px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#9333ea)",
                  color: "#fff",
                  border: "none",
                  padding: "17px",
                  borderRadius: "18px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow:
                    "0 12px 30px rgba(124,58,237,0.35)",
                }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;