import React, { useEffect } from "react";
import HeaderPage from "./Header2";
import Footer from "./Footer";

const ServicesPage = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 50,
      });
    }
  }, []);

  const services = [
    {
      title: "Join us as a Franchise",
      image:
        "https://zaptodoor.com/upload/file_6855271635cb59.13563757.webp",
      desc:
        "Join Zaptodoor as a franchise partner, delivering convenience and reliability while growing your business in the booming delivery industry!",
      btn: "Join us as a Franchise →",
      link: "https://zaptodoor.com/join-franchise.php",
    },
    {
      title: "Join us as a Delivery Person",
      image:
        "https://zaptodoor.com/upload/file_685527df0c0616.07457380.webp",
      desc:
        "Join Zaptodoor as a delivery partner and earn while delivering convenience with flexibility and growth opportunities!",
      btn: "Join us as a Delivery Person →",
      link: "https://zaptodoor.com/join-deliveryperson.php",
    },
    {
      title: "Join us as a Restaurant",
      image:
        "https://zaptodoor.com/upload/file_6855280a22e791.19262578.webp",
      desc:
        "Partner with Zaptodoor to grow your restaurant’s customer base and deliver meals seamlessly.",
      btn: "Join us as a Restaurant →",
      link: "https://zaptodoor.com/join-resturant.php",
    },
  ];

  return (
    <>
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          background: "#f8fafc",
          overflowX: "hidden",
        }}
      >
        <HeaderPage />

        {/* HERO SECTION */}
        <section
          style={{
            position: "relative",
            height: "120px",
          

            paddingTop: "clamp(8px,2vw,12px)",
            paddingBottom: "clamp(10px,2vw,20px)",
            paddingLeft: "20px",
            paddingRight: "20px",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            textAlign: "center",
            overflow: "hidden",

            background:
              "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#6d28d9 100%)",

            borderBottom: "1px solid rgba(140,100,255,0.12)",
            color: "#fff",
          }}
        >
          {/* Floating shapes */}
          <div
            style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "50%",
              top: "-100px",
              left: "-70px",
              animation: "floatShape 6s ease-in-out infinite",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "180px",
              height: "180px",
              background: "rgba(168,85,247,0.08)",
              borderRadius: "50%",
              bottom: "-90px",
              right: "-50px",
              animation: "floatShape 8s ease-in-out infinite",
            }}
          />

          {/* glow */}
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "200px",
              background:
                "radial-gradient(circle,rgba(168,85,247,.18),transparent 70%)",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <h1
            data-aos="fade-up"
            style={{
              fontSize: "clamp(24px,4vw,38px)",
              fontWeight: "800",
              margin: "0 0 6px",
              lineHeight: "1",
              zIndex: 2,
            }}
          >
            Our{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,#c084fc,#a855f7,#7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Services
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            style={{
              fontSize: "clamp(12px,2vw,14px)",
              opacity: "0.75",
              margin: 0,
              zIndex: 2,
            }}
          >
            Discover what makes Zaptodoor special
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "8px",
              fontSize: "12px",
              opacity: 0.8,
              zIndex: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span>Home</span>
            <span>›</span>
            <span style={{ color: "#c084fc" }}>
              Our Services
            </span>
          </div>
        </section>

        {/* SERVICES */}
        <section
          style={{
            padding: "80px 20px",
          }}
        >
          <div
            style={{
              maxWidth: "1250px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "70px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(30px,5vw,52px)",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                What We{" "}
                <span style={{ color: "#7c3aed" }}>
                  Offer
                </span>
              </h2>

              <p
                style={{
                  color: "#6b7280",
                  marginTop: "15px",
                  fontSize: "17px",
                }}
              >
                End-to-end food delivery solutions for customers,
                restaurants and riders
              </p>

              <div
                style={{
                  width: "120px",
                  height: "5px",
                  background: "#7c3aed",
                  margin: "22px auto 0",
                  borderRadius: "10px",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(320px,1fr))",
                gap: "35px",
              }}
            >
              {services.map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={{
                    background: "#fff",
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow:
                      "0 10px 35px rgba(0,0,0,0.08)",
                    transition: ".4s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0px)";
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "260px",
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ padding: "30px" }}>
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#111827",
                        marginBottom: "18px",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                        lineHeight: "1.9",
                        marginBottom: "30px",
                        fontSize: "15px",
                      }}
                    >
                      {item.desc}
                    </p>

                    <a
                      href={item.link}
                      style={{
                        display: "inline-block",
                        background:
                          "linear-gradient(135deg,#7c3aed,#9333ea)",
                        color: "#fff",
                        textDecoration: "none",
                        padding: "14px 26px",
                        borderRadius: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {item.btn}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        <style>{`
          @keyframes floatShape{
            0%,100%{
              transform:translateY(0px);
            }
            50%{
              transform:translateY(-12px);
            }
          }

          @media(max-width:768px){
            section{
              padding-left:10px!important;
              padding-right:10px!important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ServicesPage;