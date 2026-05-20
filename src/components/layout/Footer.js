import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const SLIDES = [
  "https://zaptodoor.com/upload/file_6943cc4977abe7.93552575.png",
  "https://zaptodoor.com/upload/685523ab8cc81.png",
  "https://zaptodoor.com/upload/685523ab8cb77.png",
  "https://zaptodoor.com/upload/685523ab8d0d3.png",
  "https://zaptodoor.com/upload/68552540dd938.png",
  "https://zaptodoor.com/upload/685523ab8d2d7.png",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [showMore, setShowMore] = useState(false);

  return (
    <footer style={styles.footer}>
      {/* TOP SECTION */}
      <div style={styles.topSection}>
        {/* LEFT SIDE */}
        <div style={styles.logoSection}>
          <img
            src="https://zaptodoor.com/upload/file_697cd2ac092d56.33530713.png"
            alt=""
            style={styles.logo}
          />

          {/* SMALL SLIDER */}
          <div style={{ marginTop: "26px" }}>
            <h3 style={styles.heading}>Certified Partners</h3>
            {/* 
            <VerticalSlider /> */}
            <HorizontalSlider />
          </div>
        </div>

        {/* COMPANY */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Company</h3>

          <ul style={styles.list}>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Vendor Partner</li>
            <li>Delivery Partner</li>
            <li>Careers</li>
            <li>Team</li>
          </ul>
        </div>

        {/* LEGAL */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Legal</h3>

          <ul style={styles.list}>
            <li>Privacy Policy</li>

            <li>Cancellation Policy</li>

            <li>Terms & Conditions</li>

            <li>Shipping Policy</li>

            <li>Refund Policy</li>
          </ul>
        </div>

        {/* ADDRESS */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Contact Address</h3>

          <div style={styles.address}>
            <b>Office Address:</b>

            <p>
              ZAPTODOOR PRIVATE LIMITED
              <br />
              G.Incube, Moti Mahal, Smart City Incubation Center,
              <br />
              Lashkar, Gwalior, Madhya Pradesh - 474007
            </p>

            {showMore && (
              <>
                <b>Registered Address:</b>

                <p>
                  ZAPTODOOR PRIVATE LIMITED
                  <br />
                  171, New Colony No.2, Birlana, Pole No.14, Birlanagar,
                  <br />
                  Birla Nagar, Gird, Gwalior - 474004, Madhya Pradesh, India
                </p>
              </>
            )}

            <button
              onClick={() => setShowMore(!showMore)}
              style={styles.viewBtn}
            >
              {showMore ? "Hide Registered Address" : "Registered Address"}
            </button>
          </div>
        </div>

        {/* SOCIAL */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Social Links</h3>

          <div style={styles.socialWrap}>
            <div style={styles.socialIcon}>
              <FaLinkedinIn />
            </div>

            <div style={styles.socialIcon}>
              <FaInstagram />
            </div>

            <div style={styles.socialIcon}>
              <FaFacebookF />
            </div>

            <div style={styles.socialIcon}>
              <FaYoutube />
            </div>

            <div style={styles.socialIcon}>
              <FaXTwitter />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={styles.bottomSection}>
        <h2 style={styles.bottomText}>
          For better experience,
          <br />
          download the Zaptodoor app now
        </h2>

        <div style={styles.storeWrap}>
          {/* APP BUTTONS */}
          <div style={styles.storeButtons}>
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt=""
              style={styles.storeImg}
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt=""
              style={styles.storeImg}
            />
          </div>

          {/* COPYRIGHT */}
          <p style={styles.copy}>© {currentYear} Zaptodoor Limited</p>
        </div>
      </div>
    </footer>
  );
}

// const sliderStyles = {
//   wrapper: {
//     width: "90px",
//     height: "160px",
//     overflow: "hidden",
//     borderRadius: "18px",
//     background:
//       "rgba(255,255,255,0.06)",
//     border:
//       "1px solid rgba(255,255,255,0.08)",
//     padding: "8px",
//     marginTop: "14px",
//     backdropFilter: "blur(10px)"
//   },

//   track: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "14px",
//     transition: "0.7s ease"
//   },

//   card: {
//     width: "60px",
//     height: "60px",
//     borderRadius: "16px",
//     overflow: "hidden",
//     background: "#fff",
//     margin: "0 auto",
//     boxShadow:
//       "0 8px 18px rgba(0,0,0,0.35)"
//   },

//   img: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover"
//   }
// };
const sliderStyles = {
  wrapper: {
    width: "180px",
    height: "90px",
    overflow: "hidden",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "8px",
    marginTop: "14px",
    backdropFilter: "blur(10px)",
  },

  track: {
    display: "flex",
    flexDirection: "row",
    gap: "14px",
    transition: "0.7s ease",
  },

  card: {
    width: "80px",
    height: "80px",
    borderRadius: "16px",
    overflow: "hidden",
    background: "#fff",
    flexShrink: 0,
    boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

const styles = {
  footer: {
    background:
      "linear-gradient(135deg, #000000 0%, #140021 35%, #2b004d 70%, #4c1d95 100%)",
    padding: "60px 70px 30px",
    fontFamily: "sans-serif",
    color: "#fff",
  },

  topSection: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "45px",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    paddingBottom: "45px",
  },

  logoSection: {
    minWidth: "260px",
    flex: 1.2,
  },

  logo: {
    width: "220px",
    marginBottom: "12px",
  },

  column: {
    minWidth: "180px",
    flex: 1,
  },

  heading: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "18px",
    color: "#fff",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    fontSize: "17px",
    lineHeight: "1.5",
    color: "rgba(255,255,255,0.78)",
    cursor: "pointer",
  },

  address: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "rgba(255,255,255,0.78)",
  },

  viewBtn: {
    marginTop: "12px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#7c3aed,#9333ea)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 6px 18px rgba(124,58,237,0.35)",
  },

  socialWrap: {
    display: "flex",
    gap: "18px",
    marginTop: "16px",
    flexWrap: "wrap",
  },

  socialIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "0.3s",
  },

  bottomSection: {
    paddingTop: "35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "30px",
  },

  bottomText: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#fff",
    maxWidth: "620px",
    lineHeight: "1.4",
  },

  storeWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "18px",
    minWidth: "320px",
  },

  storeButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "18px",
    flexWrap: "wrap",
  },
  copy: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.72)",
    textAlign: "center",
    margin: 0,
  },

  storeImg: {
    height: "65px",
    cursor: "pointer",
    filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.35))",
  },
};
function HorizontalSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={sliderStyles.wrapper}>
      <div
        style={{
          ...sliderStyles.track,
          transform: `translateX(-${index * 78}px)`,
        }}
      >
        {SLIDES.concat(SLIDES).map((img, i) => (
          <div key={i} style={sliderStyles.card}>
            <img src={img} alt="" style={sliderStyles.img} />
          </div>
        ))}
      </div>
    </div>
  );
}
