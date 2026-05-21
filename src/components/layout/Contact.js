import React from "react";
import Footer from "./Footer";
import Headerpage from "./Header2.js";

const ContactPage = () => {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "#f8fafc",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
        <Headerpage/>
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          height: "120px",
          padding: "20px",
          textAlign: "center",
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#6d28d9 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
            top: "-100px",
            left: "-80px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            bottom: "-100px",
            right: "-60px",
          }}
        />

        <h1
          style={{
            fontSize: "34px",
            fontWeight: "700",
            marginBottom: "6px",
            position: "relative",
            zIndex: 2,
            lineHeight: "1",
          }}
        >
          Contact <span style={{ color: "#c084fc" }}>Us</span>
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            fontSize: "13px",
            position: "relative",
            zIndex: 2,
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
            alignItems: "start",
          }}
        >
          {/* LEFT CARD */}
          <div
            style={{
              background: "#fff",
              borderRadius: "28px",
              padding: "35px",
              boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "35px",
                color: "#111827",
              }}
            >
              Get in Touch
            </h2>

            {/* ADDRESS */}
            <div
              style={{
                display: "flex",
                gap: "18px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  minWidth: "55px",
                  height: "55px",
                  borderRadius: "14px",
                  background: "#7c3aed",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                📍
              </div>

              <div
                style={{
                  lineHeight: "1.8",
                  color: "#4b5563",
                }}
              >
                <strong>ZAPTODOOR PRIVATE LIMITED</strong>
                <br />
                Gwalior, Madhya Pradesh
              </div>
            </div>

            {/* PHONE */}
            <div
              style={{
                display: "flex",
                gap: "18px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  minWidth: "55px",
                  height: "55px",
                  borderRadius: "14px",
                  background: "#7c3aed",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                📞
              </div>

              <div
                style={{
                  lineHeight: "2",
                }}
              >
                <a
                  href="tel:+919200018690"
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
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
              }}
            >
              <div
                style={{
                  minWidth: "55px",
                  height: "55px",
                  borderRadius: "14px",
                  background: "#7c3aed",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                ✉️
              </div>

              <div>
                <a
                  href="mailto:info@zaptodoor.com"
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
                  }}
                >
                  info@zaptodoor.com
                </a>
              </div>
            </div>

            {/* MAP */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.662177972788!2d78.17027697498769!3d26.207665490034653!2m3!1f0!2f0!3f0!2i1024!2i768!4f13.1!3m3!1m2!1s0x3976c570bc507f51%3A0xbb925da31503b827!2sZaptodoor!5e0!3m2!1sen!2sin"
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
              borderRadius: "28px",
              padding: "35px",
              boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "35px",
                color: "#111827",
              }}
            >
              Send a Message
            </h2>

            <form>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "22px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Full Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Your Name"
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "14px",
                      border: "1px solid #ddd",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Email *
                  </label>

                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "14px",
                      border: "1px solid #ddd",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Phone *
                  </label>

                  <input
                    type="tel"
                    placeholder="10-digit number"
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "14px",
                      border: "1px solid #ddd",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Message subject"
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "14px",
                      border: "1px solid #ddd",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: "22px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  Message *
                </label>

                <textarea
                  rows="7"
                  placeholder="Write your message..."
                  style={{
                    width: "100%",
                    padding: "18px",
                    borderRadius: "18px",
                    border: "1px solid #ddd",
                    resize: "none",
                    outline: "none",
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "25px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#9333ea)",
                  color: "#fff",
                  border: "none",
                  padding: "16px",
                  borderRadius: "16px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default ContactPage;