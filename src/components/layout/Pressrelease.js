import React, { useState } from "react";
import Footer from "./Footer";
import Headerpage from "./Header2.js";

const PressRelease = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const videos = [
    {
      platform: "Facebook",
      title: "Zaptodoor Featured Video Update",
      desc: "Official Facebook video highlight about the latest Zaptodoor update.",
      src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F943643491569902%2F&show_text=true&width=267&t=0",
      height: "591",
    },
    {
      platform: "Instagram",
      title: "Instagram Reel: Service Highlights",
      desc: "Quick reel showcasing service quality and delivery workflow.",
      src: "https://www.instagram.com/reel/DVOHEbGkX40/embed/captioned",
      height: "591",
    },
    {
      platform: "Facebook",
      title: "Facebook Reel: Team & Operations",
      desc: "Facebook reel featuring team operations highlights.",
      src: "https://www.facebook.com/plugins/video.php?height=448&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F4229225380659044%2F&show_text=true&width=560&t=0",
      height: "563",
    },
  ];

  const articles = [
    {
      image: "https://zaptodoor.com/upload/img_687460cba9d8a7.44249894.webp",
      title: "नईदुनिया – ग्वालियर संस्करण",
      date: "14 July, 2025",
    },
    {
      image: "https://zaptodoor.com/upload/img_687417031a7bc0.13522715.webp",
      title: "दैनिक सत्ता सुधार – भोपाल संस्करण",
      date: "12 July, 2025",
    },
    {
      image: "https://zaptodoor.com/upload/img_68741586431e30.66444278.webp",
      title: "दैनिक नगर चिंगारी – ग्वालियर संस्करण",
      date: "12 July, 2025",
    },
    {
      image: "https://zaptodoor.com/upload/img_6874139d081614.09349484.webp",
      title: "स्वदेश (Swadesh) - ग्वालियर मुख्य संस्करण",
      date: "12 July, 2025",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
        <Headerpage/>
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          height: "120px",
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#6d28d9 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            background: "rgba(255,255,255,0.05)",
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
            marginBottom: "8px",
            zIndex: 2,
          }}
        >
          Press <span style={{ color: "#c084fc" }}>Release</span>
        </h1>

        <p
          style={{
            fontSize: "14px",
            opacity: 0.9,
            zIndex: 2,
          }}
        >
          Latest news, media coverage, and highlights from Zaptodoor
        </p>
      </section>

      {/* MAIN SECTION */}
      <section
        style={{
          padding: "70px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          {/* VIDEO SECTION */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              Press <span style={{ color: "#7c3aed" }}>Videos</span>
            </h2>

            <p
              style={{
                color: "#6b7280",
                fontSize: "17px",
              }}
            >
              Watch our featured media coverage
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "30px",
              marginBottom: "80px",
            }}
          >
            {videos.map((video, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={video.src}
                    width="100%"
                    height={video.height}
                    scrolling="no"
                    style={{
                      border: "none",
                    }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    title={video.title}
                  />
                </div>

                <div
                  style={{
                    padding: "25px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      borderRadius: "30px",
                      background: "#ede9fe",
                      color: "#7c3aed",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "18px",
                    }}
                  >
                    {video.platform}
                  </span>

                  <h3
                    style={{
                      fontSize: "22px",
                      marginBottom: "12px",
                      color: "#111827",
                    }}
                  >
                    {video.title}
                  </h3>

                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: "1.8",
                      fontSize: "15px",
                    }}
                  >
                    {video.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ARTICLES SECTION */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              Press <span style={{ color: "#7c3aed" }}>Articles</span>
            </h2>

            <p
              style={{
                color: "#6b7280",
                fontSize: "17px",
              }}
            >
              Read about our journey and achievements
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "30px",
            }}
          >
            {articles.map((article, index) => (
              <div
                key={index}
                onClick={() => setSelectedArticle(article)}
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    padding: "25px",
                  }}
                >
                  <div
                    style={{
                      color: "#7c3aed",
                      fontSize: "14px",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                  >
                    {article.date}
                  </div>

                  <h3
                    style={{
                      fontSize: "22px",
                      lineHeight: "1.5",
                      color: "#111827",
                    }}
                  >
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedArticle && (
        <div
          onClick={() => setSelectedArticle(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "24px",
              maxWidth: "850px",
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                background: "#111827",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                background: "#fff",
              }}
            />

            <div
              style={{
                padding: "25px",
              }}
            >
              <div
                style={{
                  color: "#7c3aed",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                {selectedArticle.date}
              </div>

              <h2
                style={{
                  fontSize: "28px",
                  lineHeight: "1.5",
                  color: "#111827",
                }}
              >
                {selectedArticle.title}
              </h2>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>

  );
};

export default PressRelease;