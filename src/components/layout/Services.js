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
      <div className="services-page">
        <HeaderPage />

        {/* HERO SECTION */}
        <section className="hero-section">
          {/* Floating Shapes */}
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>

          {/* Glow */}
          <div className="hero-glow"></div>

          <h1 data-aos="fade-up" className="hero-title">
            Our <span>Services</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="hero-subtitle"
          >
            Discover what makes Zaptodoor special
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="breadcrumb"
          >
            <span>Home</span>
            <span>›</span>
            <span className="active">Our Services</span>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="services-section">
          <div className="services-container">
            <div className="section-header">
              <h2>
                What We <span>Offer</span>
              </h2>

              <p>
                End-to-end food delivery solutions for customers,
                restaurants and riders
              </p>

              <div className="underline"></div>
            </div>

            <div className="services-grid">
              {services.map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="service-card"
                >
                  <div className="image-wrapper">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="card-content">
                    <h3>{item.title}</h3>

                    <p>{item.desc}</p>

                    <a href={item.link}>{item.btn}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        <style>{`
          *{
            margin:0;
            padding:0;
            box-sizing:border-box;
          }

          html,body{
            overflow-x:hidden;
            width:100%;
          }

          .services-page{
            font-family:'Poppins',sans-serif;
            background:#f8fafc;
            overflow:hidden;
            width:100%;
          }

          /* HERO SECTION */

          .hero-section{
            position:relative;
            min-height:220px;
            width:100%;
            padding:clamp(30px,5vw,70px) clamp(16px,4vw,40px);
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            text-align:center;
            overflow:hidden;
            background:
              linear-gradient(
                135deg,
                #0f172a 0%,
                #1e293b 50%,
                #6d28d9 100%
              );
            border-bottom:1px solid rgba(140,100,255,0.12);
            color:#fff;
          }

          .shape{
            position:absolute;
            border-radius:50%;
            animation:floatShape 6s ease-in-out infinite;
          }

          .shape1{
            width:220px;
            height:220px;
            background:rgba(255,255,255,0.05);
            top:-100px;
            left:-70px;
          }

          .shape2{
            width:180px;
            height:180px;
            background:rgba(168,85,247,0.08);
            bottom:-90px;
            right:-50px;
            animation-duration:8s;
          }

          .hero-glow{
            position:absolute;
            width:400px;
            max-width:90%;
            height:220px;
            background:
              radial-gradient(
                circle,
                rgba(168,85,247,.18),
                transparent 70%
              );
            top:-40px;
            left:50%;
            transform:translateX(-50%);
          }

          .hero-title{
            font-size:clamp(2rem,5vw,4rem);
            font-weight:800;
            line-height:1.1;
            z-index:2;
            word-break:break-word;
          }

          .hero-title span{
            background:
              linear-gradient(
                90deg,
                #c084fc,
                #a855f7,
                #7c3aed
              );
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
          }

          .hero-subtitle{
            margin-top:12px;
            font-size:clamp(.9rem,2vw,1.1rem);
            opacity:.8;
            z-index:2;
            max-width:700px;
            line-height:1.7;
          }

          .breadcrumb{
            display:flex;
            align-items:center;
            justify-content:center;
            flex-wrap:wrap;
            gap:8px;
            margin-top:18px;
            font-size:clamp(.75rem,1.5vw,.9rem);
            opacity:.85;
            z-index:2;
          }

          .breadcrumb .active{
            color:#c084fc;
          }

          /* SERVICES SECTION */

          .services-section{
            width:100%;
            padding:clamp(50px,8vw,100px)
                    clamp(16px,4vw,30px);
          }

          .services-container{
            width:100%;
            max-width:1280px;
            margin:0 auto;
          }

          .section-header{
            text-align:center;
            margin-bottom:clamp(40px,6vw,80px);
          }

          .section-header h2{
            font-size:clamp(2rem,5vw,4rem);
            font-weight:800;
            color:#111827;
            line-height:1.2;
          }

          .section-header h2 span{
            color:#7c3aed;
          }

          .section-header p{
            margin-top:18px;
            color:#6b7280;
            font-size:clamp(.95rem,2vw,1.1rem);
            line-height:1.8;
            max-width:850px;
            margin-left:auto;
            margin-right:auto;
          }

          .underline{
            width:120px;
            height:5px;
            background:#7c3aed;
            margin:24px auto 0;
            border-radius:10px;
          }

          /* GRID */

          .services-grid{
            display:grid;
            grid-template-columns:
              repeat(auto-fit,minmax(320px,1fr));
            gap:clamp(20px,3vw,40px);
            align-items:stretch;
          }

          /* CARD */

          .service-card{
            background:#fff;
            border-radius:28px;
            overflow:hidden;
            box-shadow:
              0 10px 35px rgba(0,0,0,0.08);
            transition:.4s ease;
            display:flex;
            flex-direction:column;
            height:100%;
          }

          .service-card:hover{
            transform:translateY(-10px);
            box-shadow:
              0 20px 50px rgba(0,0,0,0.12);
          }

          .image-wrapper{
            width:100%;
            overflow:hidden;
          }

          .image-wrapper img{
            width:100%;
            height:auto;
            aspect-ratio:16/10;
            object-fit:cover;
            display:block;
            transition:transform .5s ease;
          }

          .service-card:hover img{
            transform:scale(1.05);
          }

          .card-content{
            padding:clamp(20px,4vw,35px);
            display:flex;
            flex-direction:column;
            flex:1;
          }

          .card-content h3{
            font-size:clamp(1.3rem,3vw,1.8rem);
            color:#111827;
            font-weight:700;
            line-height:1.4;
            margin-bottom:16px;
          }

          .card-content p{
            color:#6b7280;
            line-height:1.9;
            font-size:clamp(.9rem,2vw,1rem);
            margin-bottom:28px;
            flex:1;
          }

          .card-content a{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            width:fit-content;
            max-width:100%;
            text-align:center;
            background:
              linear-gradient(
                135deg,
                #7c3aed,
                #9333ea
              );
            color:#fff;
            text-decoration:none;
            padding:clamp(12px,2vw,15px)
                    clamp(18px,3vw,28px);
            border-radius:14px;
            font-size:clamp(.85rem,2vw,1rem);
            font-weight:600;
            transition:.3s ease;
            word-break:break-word;
          }

          .card-content a:hover{
            transform:translateY(-2px);
            box-shadow:
              0 10px 25px rgba(124,58,237,0.3);
          }

          /* FLOATING ANIMATION */

          @keyframes floatShape{
            0%,100%{
              transform:translateY(0px);
            }
            50%{
              transform:translateY(-14px);
            }
          }

          /* =========================
             MOBILE
          ========================== */

          @media(max-width:768px){

            .hero-section{
              min-height:200px;
              padding:40px 16px;
            }

            .services-section{
              padding:50px 14px;
            }

            .services-grid{
              grid-template-columns:1fr;
              gap:24px;
            }

            .service-card{
              border-radius:22px;
            }

            .card-content{
              padding:22px;
            }

            .card-content a{
              width:100%;
            }

            .shape1{
              width:160px;
              height:160px;
            }

            .shape2{
              width:130px;
              height:130px;
            }
          }

          /* =========================
             TABLET
          ========================== */

          @media(min-width:769px) and (max-width:1024px){

            .hero-section{
              min-height:240px;
            }

            .services-grid{
              grid-template-columns:
                repeat(2,1fr);
            }

            .card-content{
              padding:28px;
            }
          }

          /* =========================
             DESKTOP
          ========================== */

          @media(min-width:1025px){

            .services-grid{
              grid-template-columns:
                repeat(3,1fr);
            }
          }

        `}</style>
      </div>
    </>
  );
};

export default ServicesPage;