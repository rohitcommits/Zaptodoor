import React from "react";
import Footer from "./Footer";
import Headerpage from "./Header2.js";

import {
  Building2,
  PhoneCall,
  Mail,
} from "lucide-react";

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  outline: "none",
  background: "#f9fafb",
  fontSize: "14px",
  color: "#111827",
  boxSizing: "border-box",
};

const iconBoxStyle = {
  minWidth: "50px",
  height: "50px",
  borderRadius: "14px",
  background: "#ffffff",
  color: "#7c3aed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #ede9fe",
  boxShadow: "0 8px 20px rgba(124,58,237,0.12)",
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
        {/* Glow Effects */}
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
            lineHeight: "1.1",
          }}
        >
          Contact <span style={{ color: "#c084fc" }}>Us</span>
        </h1>

        <div
          style={{
            display: "flex",
            gap: "6px",
            fontSize: "13px",
            opacity: 0.9,
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
          padding: "50px 20px",
          marginTop: "-20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1050px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "22px",
            alignItems: "stretch",
          }}
        >
          {/* LEFT CARD */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 15px 40px rgba(15,23,42,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "26px",
                marginBottom: "28px",
                color: "#111827",
                fontWeight: "700",
              }}
            >
              Get in Touch
            </h2>

            {/* Address */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div style={iconBoxStyle}>
                <Building2 size={22} />
              </div>

              <div
                style={{
                  lineHeight: "1.7",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                <strong style={{ color: "#111827" }}>
                  ZAPTODOOR PRIVATE LIMITED
                </strong>
                <br />
                Gwalior, Madhya Pradesh
              </div>
            </div>

            {/* Phone */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div style={iconBoxStyle}>
                <PhoneCall size={22} />
              </div>

              <div style={{ lineHeight: "1.9" }}>
                <a
                  href="tel:+919200018690"
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
                    fontSize: "14px",
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
                    fontSize: "14px",
                  }}
                >
                  +91 83700 83744 (IVR)
                </a>
              </div>
            </div>

            {/* Email */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "28px",
              }}
            >
              <div style={iconBoxStyle}>
                <Mail size={22} />
              </div>

              <a
                href="mailto:info@zaptodoor.com"
                style={{
                  color: "#4b5563",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                info@zaptodoor.com
              </a>
            </div>

            {/* Map */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.662177972788!2d78.17027697498769!3d26.207665490034653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c570bc507f51%3A0xbb925da31503b827!2sZaptodoor!5e0!3m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: "0" }}
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "30px",
              boxShadow: "0 15px 40px rgba(15,23,42,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "26px",
                  marginBottom: "10px",
                  color: "#111827",
                  fontWeight: "700",
                }}
              >
                Send a Message
              </h2>

              {/* Description */}
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  marginBottom: "24px",
                  lineHeight: "1.7",
                }}
              >
                Have questions or need assistance? Fill out
                the form below and our team will contact you
                shortly.
              </p>

              {/* Badges */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "25px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "24/7 Support",
                  "Fast Response",
                  "Secure Contact",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      background: "#f3e8ff",
                      color: "#7c3aed",
                      padding: "8px 14px",
                      borderRadius: "30px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <form>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(200px,1fr))",
                    gap: "16px",
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
                  rows="6"
                  placeholder="Write your message..."
                  style={{
                    ...inputStyle,
                    marginTop: "16px",
                    resize: "none",
                  }}
                />

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    background:
                      "linear-gradient(135deg,#7c3aed,#9333ea)",
                    color: "#fff",
                    border: "none",
                    padding: "15px",
                    borderRadius: "16px",
                    fontSize: "15px",
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

            {/* Footer note */}
            <div
              style={{
                marginTop: "25px",
                textAlign: "center",
                borderTop: "1px solid #f1f5f9",
                paddingTop: "16px",
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Usually replies within{" "}
              <strong>24 hours</strong>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;