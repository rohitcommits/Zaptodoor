import React, { useState, useEffect } from 'react';

export const Clone = () => {
  return (
    <div style={styles.app}>
      <HeroSection />
      <FoodHeroSection />
      <WhyChooseUs />
      <OurEcosystem />
      <CTAAppDownload />
      <Footer />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header style={styles.hero}>
      <nav style={{ ...styles.navbar, ...(isSticky ? styles.navbarSticky : {}) }}>
        <div style={styles.logo}>
          <img 
            src="https://zaptodoor.com/upload/file_697cd2ac092d56.33530713.png" 
            alt="Zaptodoor Logo" 
            style={styles.logoImg}
          />
        </div>

        <ul style={{ ...styles.menu, ...(isMenuOpen ? styles.menuActive : {}) }}>
          <li style={styles.closeMenuItem} onClick={closeMenu}>
            <i className="bi bi-x" style={styles.closeIcon}></i>
          </li>
          <li><a href="index.php" style={styles.menuLink}>Home</a></li>
          <li><a href="about-us.php" style={styles.menuLink}>About Us</a></li>
          <li><a href="press-release.php" style={styles.menuLink}>Press Release</a></li>
          <li><a href="services.php" style={styles.menuLink}>Services</a></li>
          <li><a href="contact-us.php" style={styles.menuLink}>Contact</a></li>
        </ul>

        <div style={styles.mobileToggle} onClick={toggleMenu}>
          <i className="bi bi-list" style={styles.mobileToggleIcon}></i>
        </div>

        <a 
          href="https://play.google.com/store/apps/details?id=com.zaptodoor.user" 
          style={styles.downloadBtn}
        >
          Download
        </a>
      </nav>

      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>
          Best Food For <br />
          Your <span style={styles.heroTitleSpan}>Taste</span>
        </h1>
        <p style={styles.heroText}>
          Experience the finest culinary delights delivered straight to your
          doorstep. Fresh ingredients, authentic flavors, and exceptional
          service — that's the Zaptodoor promise.
        </p>
        <div style={styles.storeBtn}>
          <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
              alt="Download on Google Play" 
              style={styles.storeBtnImg}
            />
          </a>
        </div>
      </div>
    </header>
  );
};

// Food Hero Section Component
const FoodHeroSection = () => {
  return (
    <section style={styles.foodHero}>
      {/* Curves */}
      <svg style={{ ...styles.curve, ...styles.curveLeft }} viewBox="0 0 300 600">
        <path d="M150 0 C50 150 250 300 150 600" stroke="#111827" strokeWidth="2" fill="none" opacity="0.25" />
      </svg>
      <svg style={{ ...styles.curve, ...styles.curveRight }} viewBox="0 0 300 600">
        <path d="M150 0 C250 150 50 300 150 600" stroke="#111827" strokeWidth="2" fill="none" opacity="0.25" />
      </svg>

      {/* Floating Images */}
      <img 
        src="https://zaptodoor.com/upload/file_6974665696f4a8.17625123.png"
        style={{ ...styles.foodImg, ...styles.foodImgBurger }}
        alt="Burger"
      />
      <img 
        src="https://zaptodoor.com/upload/file_6974672d4f2a49.06039686.jpg"
        style={{ ...styles.foodImg, ...styles.foodImgPizza }}
        alt="Pizza"
      />

      {/* Text */}
      <div style={styles.foodTextContent}>
        <h1 style={styles.foodTitle}>
          Better food for<br />
          <span style={styles.blueText}>more</span>
          <span style={styles.orangeText}>people</span>
        </h1>
        <p style={styles.foodSubtitle}>
          For over a decade, we've enabled customers to discover
          new tastes — delivered fast and fresh to their doorstep.
        </p>
      </div>

      {/* Stats */}
      <div style={styles.statsCard}>
        <div style={styles.stat}>
          <h3 style={styles.statNumber}>1.6k+</h3>
          <span style={styles.statLabel}>Happy Customers</span>
        </div>
        <div style={styles.divider}></div>
        <div style={styles.stat}>
          <h3 style={styles.statNumber}>361</h3>
          <span style={styles.statLabel}>Restaurant Partners</span>
        </div>
        <div style={styles.divider}></div>
        <div style={styles.stat}>
          <div style={styles.starRating}>
            <span style={styles.star}>★</span>
            <span style={styles.star}>★</span>
            <span style={styles.star}>★</span>
            <span style={styles.star}>☆</span>
            <span style={styles.star}>☆</span>
          </div>
          <span style={styles.statLabel}>3.7 App Rating</span>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Component
const WhyChooseUs = () => {
  const cards = [
    {
      id: 1,
      title: "2 KM Free Delivery",
      description: "Get free delivery on all orders within 2 kilometers radius",
      img: "https://zaptodoor.com/upload/file_6971d9376e0108.33087191.jfif",
      bg: "#fff3e8"
    },
    {
      id: 2,
      title: "Monthly Gifts & Rewards",
      description: "Earn exciting rewards and gifts every month",
      img: "https://zaptodoor.com/upload/file_6971d9a97d17e9.71719349.jfif",
      bg: "#fff1f7"
    },
    {
      id: 3,
      title: "Smart Cart Services",
      description: "Intelligent cart that remembers your preferences",
      img: "https://zaptodoor.com/upload/file_6971d97f539a27.95832544.jfif",
      bg: "#eef6ff"
    },
    {
      id: 4,
      title: "Affordable Pricing",
      description: "Best prices guaranteed on all products",
      img: "https://zaptodoor.com/upload/file_6972434e01c837.49431007.jfif",
      bg: "#f1fff7"
    },
    {
      id: 5,
      title: "Up to 50% OFF",
      description: "Exclusive discounts on your favorite items",
      img: "https://zaptodoor.com/upload/file_697243c5b85a68.36847179.jfif",
      bg: "#f6f1ff"
    }
  ];

  return (
    <section style={styles.chooseSection}>
      <div style={styles.chooseContainer}>
        <div style={styles.chooseHeader}>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <p style={styles.sectionSubtitle}>
            Experience the best delivery service with amazing features
          </p>
        </div>

        <div style={styles.chooseGrid}>
          {cards.map(card => (
            <div style={styles.chooseCard} key={card.id}>
              <div style={{ ...styles.cardImage, backgroundColor: card.bg }}>
                <img src={card.img} alt={card.title} style={styles.cardImg} />
              </div>
              <h5 style={styles.cardTitle}>{card.title}</h5>
              <p style={styles.cardDesc}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTAAppDownload = () => {
  return (
    <section style={styles.ctaSection}>
      <div style={styles.ctaLeft}>
        <div style={styles.brand}>
          <img src="https://zaptodoor.com/upload/file_697cd2ac092d56.33530713.png" alt="Zaptodoor Logo" style={styles.brandImg} />
        </div>
        <div style={styles.ctaTitle}>
          Smarter deliveries for everyday living.
        </div>
        <div style={styles.ctaSubtitle}>
          Download Zaptodoor. Experience seamless delivery
        </div>
        <div style={styles.storeBtn}>
          <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user&pcampaignid=web_share">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" style={styles.storeBtnImg} alt="Google Play" />
          </a>
        </div>
      </div>
      <div style={styles.ctaRight}>
        <img src="https://zaptodoor.com/upload/file_69806ec2dfdb52.18567712.png" alt="Food" style={styles.ctaRightImg} />
      </div>
    </section>
  );
};

// Our Ecosystem Component
const OurEcosystem = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://zaptodoor.com/upload/file_698951e79fc548.92847110.jfif",
    "https://zaptodoor.com/upload/file_6989520c278959.88478691.jfif",
    "https://zaptodoor.com/upload/file_698952258df141.83262518.jfif"
  ];

  const ecosystemItems = [
    {
      id: 1,
      title: "Zaptodoor Rider App",
      description: "Earn flexibly on your own schedule. Accept deliveries, navigate smart routes, and maximize your daily earnings.",
      logo: "https://zaptodoor.com/upload/file_69733ce12b7270.37050481.webp",
      link: "https://play.google.com/store/apps/details?id=com.zaptodoor.delivery"
    },
    {
      id: 2,
      title: "Zaptodoor Business App",
      description: "Grow your business effortlessly. Manage orders, track deliveries in real-time, and reach more customers.",
      logo: "https://zaptodoor.com/upload/file_697b161f5a3f51.12535101.png",
      link: "https://play.google.com/store/apps/details?id=com.zaptodoor.business"
    },
    {
      id: 3,
      title: "Zaptodoor Customer App",
      description: "Get everything delivered fast. Browse local stores, track your orders live, and enjoy quick doorstep delivery.",
      logo: "https://zaptodoor.com/upload/file_69733d54bd8048.36718955.webp",
      link: "https://play.google.com/store/apps/details?id=com.zaptodoor.user"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section style={styles.ecosystem}>
      <div style={styles.ecosystemHeader}>
        <h2 style={styles.ecosystemTitle}><span style={styles.ecosystemOrange}>OUR</span> ECOSYSTEM</h2>
        <p style={styles.ecosystemSubtitle}>Powering customers, businesses, and riders through one seamless platform</p>
      </div>

      <div style={styles.ecoWrapper}>
        {/* Slider */}
        <div style={styles.slider}>
          <div>
            {slides.map((slide, index) => (
              <img 
                key={index}
                src={slide} 
                style={{ ...styles.slide, ...(index === currentSlide ? styles.slideActive : {}) }} 
                alt={`Ecosystem slide ${index + 1}`}
              />
            ))}
          </div>
          <div style={styles.dots}>
            {slides.map((_, index) => (
              <span 
                key={index}
                style={{ ...styles.dot, ...(index === currentSlide ? styles.dotActive : {}) }} 
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Right Items */}
        <div style={styles.ecoList}>
          {ecosystemItems.map(item => (
            <div style={styles.ecoItem} key={item.id}>
              <div style={styles.ecoLeft}>
                <img style={styles.ecoLogo} src={item.logo} alt={item.title} />
                <div style={styles.ecoText}>
                  <h3 style={styles.ecoTextTitle}>{item.title}</h3>
                  <p style={styles.ecoTextDesc}>{item.description}</p>
                </div>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.ecoDownloadBtn}>
                <span style={styles.popupText}>Download Now</span>
                <img style={styles.playImg} src="https://zaptodoor.com/upload/file_69895a8b3d9994.11760170.png" alt="Download" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA App Download Component
// const CTAAppDownload = () => {
//   return (
//     <section style={styles.ctaSection}>
//       <div style={styles.ctaLeft}>
//         <div style={styles.brand}>
//           <img src="https://zaptodoor.com/upload/file_697cd2ac092d56.33530713.png" alt="Zaptodoor Logo" style={styles.brandImg} />
//         </div>
//         <div style={styles.ctaTitle}>
//           Smarter deliveries for everyday living.
//         </div>
//         <div style={styles.ctaSubtitle}>
//           Download Zaptodoor. Experience seamless delivery
//         </div>
//         <div style={styles.storeBtn}>
//           <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user&pcampaignid=web_share">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" style={styles.storeBtnImg} alt="Google Play" />
//           </a>
//         </div>
//       </div>
//       <div style={styles.ctaRight}>
//         <img src="https://zaptodoor.com/upload/file_69806ec2dfdb52.18567712.png" alt="Food" style={styles.ctaRightImg} />
//       </div>
//     </section>
//   );
// };

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.footerTop}>
        <div style={styles.footerRow}>
          {/* About & Support */}
          <div style={styles.footerAbout}>
            <a href="index.php" style={styles.footerLogo}>
              <img src="https://zaptodoor.com/upload/file_697cd2ac092d56.33530713.png" alt="Zaptodoor Logo" style={styles.footerLogoImg} />
            </a>
            <ul style={styles.supportList}>
              <li style={styles.supportListItem}>Customer Support & Vendor Support</li>
              <li style={styles.supportListItem}>IVR: +91 83700 83744</li>
              <li style={styles.supportListItem}>Phone: +91 9200018690</li>
              <li style={styles.supportListItem}>Email: info@zaptodoor.com</li>
            </ul>
            <div style={styles.socialLinks}>
              <a href="https://www.facebook.com/profile.php?id=61570458010555" style={styles.socialLink}><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/zaptodoor" style={styles.socialLink}><i className="bi bi-instagram"></i></a>
              <a href="https://www.linkedin.com/company/zaptodoor-pvt-ltd/" style={styles.socialLink}><i className="bi bi-linkedin"></i></a>
              <a href="https://www.youtube.com/@zaptodoor" style={styles.socialLink}><i className="bi bi-youtube"></i></a>
              <a href="8370083744" style={styles.socialLink}><i className="bi bi-whatsapp"></i></a>
              <a href="https://x.com/zap_to_door" style={styles.socialLink}><i className="bi bi-twitter"></i></a>
            </div>
          </div>

          {/* Useful Links */}
          <div style={styles.footerLinks}>
            <h4 style={styles.footerHeading}>Useful Links</h4>
            <ul style={styles.footerLinkList}>
              <li><a href="index.php" style={styles.footerLink}>Home</a></li>
              <li><a href="about-us.php" style={styles.footerLink}>About Us</a></li>
              <li><a href="contact-us.php" style={styles.footerLink}>Contact Us</a></li>
              <li><a href="services.php" style={styles.footerLink}>Services</a></li>
              <li><a href="our-certifications.php" style={styles.footerLink}>Our Certifications</a></li>
            </ul>
          </div>

          {/* Important Links */}
          <div style={styles.footerLinks}>
            <h4 style={styles.footerHeading}>Important Links</h4>
            <ul style={styles.footerLinkList}>
              <li><a href="privacy-policy.php" style={styles.footerLink}>Privacy Policy</a></li>
              <li><a href="cancellation-policy.php" style={styles.footerLink}>Cancellation Policy</a></li>
              <li><a href="terms-condition.php" style={styles.footerLink}>Terms & Conditions</a></li>
              <li><a href="shipping-policy.php" style={styles.footerLink}>Shipping Policy</a></li>
              <li><a href="refund-policy.php" style={styles.footerLink}>Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div style={styles.footerContact}>
            <h4 style={styles.footerHeading}>Contact Us</h4>
            <span style={styles.contactLabel}>Office address :</span><br />
            <span>ZAPTODOOR PRIVATE LIMITED</span>
            <p style={styles.contactText}>G.Incube, Moti Mahal, Smart City Incubation Center, Lashkar, Gwalior, Madhya Pradesh 474007</p>
            <span style={styles.contactLabel}>Registered address :</span><br />
            <span>ZAPTODOOR PRIVATE LIMITED</span>
            <p style={styles.contactText}>171, New Colony No. 2, Birlana, Pole No. 14, Birlanagar, Birla Nagar, Gird, Gwalior – 474004 Madhya Pradesh, India</p>
          </div>
        </div>

        {/* Certified Logos */}
        <h5 style={styles.certTitle}>
          Certified Quality &<br />
          Government Recognized Partnerships
        </h5>
        <div style={styles.certificates}>
          <img src="https://zaptodoor.com/upload/file_6943cc4977abe7.93552575.png" alt="DPIIT" style={styles.certImg} />
          <img src="https://zaptodoor.com/upload/685523ab8cc81.png" alt="Gincube" style={styles.certImg} />
          <img src="https://zaptodoor.com/upload/685523ab8cb77.png" alt="FSSAI" style={styles.certImg} />
          <img src="https://zaptodoor.com/upload/685523ab8d0d3.png" alt="Smart City" style={styles.certImg} />
          <img src="https://zaptodoor.com/upload/68552540dd938.png" alt="MSME" style={styles.certImg} />
          <img src="https://zaptodoor.com/upload/685523ab8d2d7.png" alt="ISO" style={styles.certImg} />
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={styles.footerBottom}>
        <div style={styles.copyrightContent}>
          <p>© <span>{currentYear}</span> <span style={styles.companyName}>Zaptodoor</span> All Rights Reserved</p>
          <p style={styles.madeWith}>Made with ❤️ for Better Food Delivery Experience</p>
        </div>
      </div>
    </footer>
  );
};

// Styles Object - All inline CSS
const styles = {
  app: {
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: "'Poppins', 'Segoe UI', sans-serif"
  },
  // Hero Section
  hero: {
    width: '100%',
    height: '100vh',
    padding: '30px 80px',
    backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url("https://zaptodoor.com/upload/file_698c2b0f1e0d08.25601906.jfif")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    '@media (maxWidth: 768px)': { padding: '25px', height: 'auto' }
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    transition: '0.3s'
  },
  navbarSticky: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    background: '#000',
    padding: '15px 80px',
    zIndex: 999,
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
  },
  logo: { display: 'flex', alignItems: 'center' },
  logoImg: { height: '38px' },
  menu: {
    listStyle: 'none',
    display: 'flex',
    gap: '32px',
    margin: 0,
    alignItems: 'center'
  },
  menuActive: { '@media (maxWidth: 768px)': { right: 0 } },
  menuLink: { color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 500 },
  closeMenuItem: { display: 'none', '@media (maxWidth: 768px)': { display: 'block', alignSelf: 'flex-end' } },
  closeIcon: { fontSize: '30px', cursor: 'pointer', color: '#fff' },
  mobileToggle: { display: 'none', '@media (maxWidth: 768px)': { display: 'block' } },
  mobileToggleIcon: { fontSize: '28px', cursor: 'pointer', color: '#fff', marginLeft: 'auto' },
  downloadBtn: {
    background: '#fff',
    color: '#000',
    padding: '10px 24px',
    borderRadius: '10px',
    fontWeight: 500,
    textDecoration: 'none',
    display: 'inline-block',
    transition: '0.3s'
  },
  heroContent: { maxWidth: '620px', marginTop: '130px' },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: '62px', lineHeight: '1.15', marginBottom: '22px', color: '#fff' },
  heroTitleSpan: { color: '#f59e0b', fontStyle: 'italic' },
  heroText: { color: '#d1d5db', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' },
  storeBtn: { display: 'inline-block' },
  storeBtnImg: { width: '175px' },
  
  // Food Hero Section
  foodHero: {
    position: 'relative',
    padding: '50px 20px 200px',
    background: '#ffff',
    overflow: 'hidden',
    textAlign: 'center'
  },
  curve: { position: 'absolute', width: '320px', height: '620px', fill: 'none', opacity: 0.25, zIndex: 1 },
  curveLeft: { left: '-130px', top: '-40px' },
  curveRight: { right: '-130px', top: '-40px' },
  foodImg: { position: 'absolute', zIndex: 2, animation: 'float 7s ease-in-out infinite' },
  foodImgBurger: { width: '210px', left: '6%', top: '40%' },
  foodImgPizza: { width: '210px', right: '6%', top: '44%', animationDelay: '1.2s' },
  foodTextContent: { position: 'relative', zIndex: 2, textAlign: 'center' },
  foodTitle: { fontSize: '56px', fontWeight: 800, lineHeight: '1.15', color: '#111827', marginBottom: '22px' },
  blueText: { color: '#2563eb' },
  orangeText: { color: '#f59e0b' },
  foodSubtitle: { maxWidth: '620px', margin: '0 auto', fontSize: '18px', color: '#6b7280', lineHeight: '1.7' },
  statsCard: {
    position: 'absolute',
    left: '50%',
    bottom: '-25px',
    transform: 'translateX(-50%)',
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(14px)',
    boxShadow: 'inset 0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '22px',
    display: 'flex',
    alignItems: 'center',
    padding: '34px 52px',
    gap: '52px',
    zIndex: 3
  },
  stat: { textAlign: 'center', transition: 'transform 0.3s ease' },
  statNumber: { fontSize: '30px', fontWeight: 800, color: '#111827', marginBottom: '6px' },
  statLabel: { fontSize: '14px', color: '#6b7280' },
  starRating: { display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '6px' },
  star: { fontSize: '20px', color: '#fbbf24' },
  divider: { width: '1px', height: '46px', background: '#e5e7eb' },
  
  // Why Choose Us Section
  chooseSection: { padding: '50px 0', background: '#ffffff' },
  chooseContainer: { paddingLeft: '3rem', paddingRight: '3rem', '@media (maxWidth: 768px)': { paddingLeft: '1rem', paddingRight: '1rem' } },
  chooseHeader: { textAlign: 'center' },
  sectionTitle: { fontSize: '42px', fontWeight: 700, marginBottom: '6px', color: '#111827' },
  sectionSubtitle: { fontSize: '16px', color: '#555', marginBottom: '30px' },
  chooseGrid: { display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' },
  chooseCard: {
    background: '#ffffff',
    borderRadius: '22px',
    padding: '18px',
    minHeight: '320px',
    boxShadow: '0 8px 22px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(20% - 1.5rem)',
    '@media (maxWidth: 992px)': { width: 'calc(33.33% - 1.5rem)' },
    '@media (maxWidth: 768px)': { width: 'calc(85% - 1.5rem)', scrollSnapAlign: 'start' }
  },
  cardImage: { height: '180px', borderRadius: '16px', marginBottom: '16px', overflow: 'hidden' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cardTitle: { fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: '#111827' },
  cardDesc: { fontSize: '14px', color: '#666', lineHeight: '1.5', margin: 0 },
  
  // Ecosystem Section
  ecosystem: { padding: '50px 20px 70px', background: '#ffffff' },
  ecosystemHeader: { textAlign: 'center', marginBottom: '45px' },
  ecosystemTitle: { fontSize: '32px', fontWeight: 900, color: '#111827' },
  ecosystemOrange: { color: '#ff6a00' },
  ecosystemSubtitle: { marginTop: '10px', color: '#6b7280' },
  ecoWrapper: { maxWidth: '1150px', margin: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', '@media (maxWidth: 900px)': { gridTemplateColumns: '1fr' } },
  slider: { position: 'relative', width: '100%', borderRadius: '18px', overflow: 'hidden' },
  slide: { width: '100%', display: 'none', borderRadius: '18px' },
  slideActive: { display: 'block' },
  dots: { position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', background: '#fff', opacity: 0.5, cursor: 'pointer', transition: '0.3s' },
  dotActive: { background: '#ff6a00', opacity: 1, transform: 'scale(1.2)' },
  ecoList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  ecoItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px', borderRadius: '16px', background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,.06)' },
  ecoLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  ecoLogo: { width: '48px', height: '48px', borderRadius: '50%' },
  ecoText: {},
  ecoTextTitle: { fontSize: '18px', marginBottom: '4px', color: '#111827' },
  ecoTextDesc: { fontSize: '14px', color: '#6b7280' },
  ecoDownloadBtn: { position: 'relative', display: 'inline-block', textDecoration: 'none' },
  popupText: {
    position: 'absolute',
    bottom: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#000',
    color: '#fff',
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    whiteSpace: 'nowrap',
    opacity: 0,
    pointerEvents: 'none',
    transition: '.25s'
  },
  playImg: { width: '140px', transition: '.3s ease' },
  
  // CTA Section
  ctaSection: {
    background: 'linear-gradient(135deg, #1c1c1c 0%, #111 100%)',
    color: '#fff',
    padding: '20px 50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '40px auto',
    overflow: 'hidden',
    height: '280px'
  },
  ctaLeft: { maxWidth: '600px', marginLeft: '100px' },
  brand: { display: 'flex', alignItems: 'center', marginBottom: '15px' },
  brandImg: { height: '45px' },
  ctaTitle: { fontSize: '28px', fontWeight: 600, margin: '10px 0' },
  ctaSubtitle: { color: '#b5b5b5', fontSize: '15px', marginBottom: '25px' },
  ctaRight: {},
  ctaRightImg: { width: '360px', borderRadius: '12px', marginRight: '80px' },
  
  // Footer Section
  footer: { backgroundColor: '#000000', color: '#fff' },
  footerTop: { paddingTop: '3rem', paddingBottom: '1rem', paddingLeft: '3rem', paddingRight: '3rem' },
  footerRow: { display: 'flex', flexWrap: 'wrap', gap: '2rem' },
  footerAbout: { flex: '2', minWidth: '250px' },
  footerLogo: { display: 'flex', alignItems: 'center', marginBottom: '1rem', textDecoration: 'none' },
  footerLogoImg: { height: '38px' },
  supportList: { listStyle: 'none', marginBottom: '1rem', paddingLeft: 0 },
  supportListItem: { marginBottom: '.5rem', color: '#fff' },
  socialLinks: { display: 'flex', gap: '0.5rem' },
  socialLink: { fontSize: '1.5rem', color: '#fff', marginRight: '.5rem', textDecoration: 'none' },
  footerLinks: { flex: '1', minWidth: '150px' },
  footerHeading: { fontSize: '1.125rem', fontWeight: 600, color: '#ffffff', marginBottom: '1rem' },
  footerLinkList: { listStyle: 'none', paddingLeft: 0 },
  footerLink: { display: 'block', marginBottom: '.5rem', color: '#fff', textDecoration: 'none' },
  footerContact: { flex: '1.5', minWidth: '250px' },
  contactLabel: { fontWeight: 600 },
  contactText: { marginBottom: '1rem', color: '#fff' },
  certTitle: { textAlign: 'center', fontSize: '1.25rem', fontWeight: 600, marginTop: '3rem', color: '#fff', lineHeight: '1.2' },
  certificates: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' },
  certImg: { backgroundColor: '#fff', borderRadius: '12px', padding: '12px', maxWidth: '100px', maxHeight: '100px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', transition: 'transform .2s' },
  footerBottom: { backgroundColor: 'rgba(255, 255, 255, 0.1)', textAlign: 'center', padding: '1.5rem 0', marginTop: '2rem', color: '#fff' },
  copyrightContent: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
  companyName: { fontWeight:34 }}