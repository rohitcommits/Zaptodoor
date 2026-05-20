import React, { useEffect, useState, useRef } from 'react';

const NAV_LINKS = [
  ['index.php', 'Home'],
  ['about-us.php', 'About Us'],
  ['press-release.php', 'Press Release'],
  ['services.php', 'Services'],
  ['contact-us.php', 'Contact'],
];

const FEATURES = [
  { icon: '🛵', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)', accent: '#ea580c', title: '2 KM Free Delivery', desc: 'Zero delivery charge on all orders within 2 km of your location.' },
  { icon: '🎁', bg: 'linear-gradient(135deg,#fdf2f8,#fce7f3)', accent: '#db2777', title: 'Monthly Rewards', desc: 'Earn points on every order and redeem for exciting gifts each month.' },
  { icon: '🛒', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)', accent: '#2563eb', title: 'Smart Cart', desc: 'Intelligent cart that remembers your preferences and reorders in one tap.' },
  { icon: '💰', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', accent: '#16a34a', title: 'Best Prices', desc: 'Price-matched across all restaurant partners. Always the best deal.' },
  { icon: '🏷️', bg: 'linear-gradient(135deg,#faf5ff,#ede9fe)', accent: '#7c3aed', title: 'Up to 50% Off', desc: 'Exclusive member-only discounts on your favourite items every day.' },
];

const ECOSYSTEM = [
  { logo: 'https://zaptodoor.com/upload/file_69733ce12b7270.37050481.webp', title: 'Rider App', subtitle: 'For Delivery Partners', desc: 'Earn on your own schedule. Smart navigation. Maximise daily income.', color: '#f97316', link: 'https://play.google.com/store/apps/details?id=com.zaptodoor.delivery' },
  { logo: 'https://zaptodoor.com/upload/file_697b161f5a3f51.12535101.png', title: 'Business App', subtitle: 'For Restaurant & Store Owners', desc: 'Manage orders, track deliveries live, and grow your customer base.', color: '#3b82f6', link: 'https://play.google.com/store/apps/details?id=com.zaptodoor.business' },
  { logo: 'https://zaptodoor.com/upload/file_69733d54bd8048.36718955.webp', title: 'Customer App', subtitle: 'For Food Lovers', desc: 'Browse local restaurants, track orders live, get doorstep delivery.', color: '#22c55e', link: 'https://play.google.com/store/apps/details?id=com.zaptodoor.user' },
];

const SOCIALS = [
  { href: 'https://www.facebook.com/profile.php?id=61570458010555', icon: 'bi-facebook', label: 'Facebook' },
  { href: 'https://www.instagram.com/zaptodoor', icon: 'bi-instagram', label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/zaptodoor-pvt-ltd/', icon: 'bi-linkedin', label: 'LinkedIn' },
  { href: 'https://www.youtube.com/@zaptodoor', icon: 'bi-youtube', label: 'YouTube' },
  { href: 'tel:8370083744', icon: 'bi-whatsapp', label: 'WhatsApp' },
  { href: 'https://x.com/zap_to_door', icon: 'bi-twitter-x', label: 'X' },
];

const CERT_IMGS = [
  'https://zaptodoor.com/upload/file_6943cc4977abe7.93552575.png',
  'https://zaptodoor.com/upload/685523ab8cc81.png',
  'https://zaptodoor.com/upload/685523ab8cb77.png',
  'https://zaptodoor.com/upload/685523ab8d0d3.png',
  'https://zaptodoor.com/upload/68552540dd938.png',
  'https://zaptodoor.com/upload/685523ab8d2d7.png',
];

const SLIDES = [
  'https://zaptodoor.com/upload/file_698951e79fc548.92847110.jfif',
  'https://zaptodoor.com/upload/file_6989520c278959.88478691.jfif',
  'https://zaptodoor.com/upload/file_698952258df141.83262518.jfif',
];

export default function LandingPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

      {/* NAVBAR */}
      <header className={`ztd-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="ztd-nav-inner">
          <a href="index.php" className="ztd-logo">
            <img src="https://zaptodoor.com/upload/file_697cd2ac092d56.33530713.png" alt="Zaptodoor" />
          </a>
          <nav className="ztd-links">
            {NAV_LINKS.map(([href, label]) => <a key={label} href={href}>{label}</a>)}
          </nav>
          <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user" className="ztd-nav-cta" target="_blank" rel="noreferrer">
            <i className="bi bi-google-play" /> Get the App
          </a>
          <button className="ztd-ham" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* DRAWER */}
      {drawerOpen && (
        <div className="ztd-overlay" onClick={() => setDrawerOpen(false)}>
          <aside className="ztd-drawer" onClick={e => e.stopPropagation()}>
            <div className="ztd-drawer-head">
              <img src="https://zaptodoor.com/upload/file_697cd2ac092d56.33530713.png" alt="Zaptodoor" height={30} />
              <button onClick={() => setDrawerOpen(false)} aria-label="Close"><i className="bi bi-x-lg" /></button>
            </div>
            <nav className="ztd-drawer-nav">
              {NAV_LINKS.map(([href, label]) => <a key={label} href={href} onClick={() => setDrawerOpen(false)}>{label}</a>)}
            </nav>
            <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user" className="ztd-drawer-cta" target="_blank" rel="noreferrer">
              <i className="bi bi-google-play" /> Download Now
            </a>
          </aside>
        </div>
      )}

      <main>
        {/* HERO */}
        <section className="ztd-hero">
          <div className="ztd-hero-bg" aria-hidden="true" />
          <div className="ztd-wrap ztd-hero-grid">
            <div className="ztd-hero-content">
              <div className="ztd-pill">
                <span className="ztd-dot" /> Delivering across Gwalior &amp; beyond
              </div>
              <h1 className="ztd-h1">
                Food you love,<br /><em>delivered fast.</em>
              </h1>
              <p className="ztd-hero-p">
                Fresh flavours from 361+ restaurant partners, straight to your door.
                Free delivery within 2 km. Every order, every time.
              </p>
              <div className="ztd-hero-actions">
                <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user" className="ztd-btn" target="_blank" rel="noreferrer">
                  <i className="bi bi-google-play" /> Order Now
                </a>
                <div className="ztd-rating">
                  <span className="ztd-stars">
                    {[1,2,3].map(i => <i key={i} className="bi bi-star-fill" />)}
                    <i className="bi bi-star-half" />
                    <i className="bi bi-star" />
                  </span>
                  <span>3.7 · 1,600+ happy customers</span>
                </div>
              </div>
            </div>
            <div className="ztd-hero-visual" aria-hidden="true">
              <div className="ztd-phone-frame">
                <img src="https://zaptodoor.com/upload/file_69806ec2dfdb52.18567712.png" alt="App preview" className="ztd-phone-img" />
              </div>
              <div className="ztd-float ztd-float-1">
                <img src="https://zaptodoor.com/upload/file_6974665696f4a8.17625123.png" alt="" />
              </div>
              <div className="ztd-float ztd-float-2">
                <img src="https://zaptodoor.com/upload/file_6974672d4f2a49.06039686.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="ztd-stats">
          <div className="ztd-stats-inner">
            {[
              { v: '1,600+', l: 'Happy Customers', i: 'bi-emoji-smile' },
              { v: '361', l: 'Restaurant Partners', i: 'bi-shop' },
              { v: '2 km', l: 'Free Delivery Radius', i: 'bi-bicycle' },
              { v: '50%', l: 'Max Discount', i: 'bi-tag' },
              { v: '3.7 ★', l: 'App Rating', i: 'bi-star-half' },
            ].map(({ v, l, i }) => (
              <div className="ztd-stat" key={l}>
                <i className={`bi ${i}`} />
                <strong>{v}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section className="ztd-section ztd-section-alt">
          <div className="ztd-wrap">
            <div className="ztd-head">
              <span className="ztd-eyebrow">Why Zaptodoor</span>
              <h2 className="ztd-h2">Built for<br /><em>everyday cravings</em></h2>
              <p className="ztd-sub">We don't just deliver food — we deliver experiences.</p>
            </div>
            <div className="ztd-features">
              {FEATURES.map((f, i) => (
                <article className="ztd-feat-card" key={i}>
                  <div className="ztd-feat-icon" style={{ background: f.bg }}>
                    <span>{f.icon}</span>
                  </div>
                  <div className="ztd-feat-body">
                    <h3 style={{ color: f.accent }}>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DOWNLOAD BANNER */}
        <section className="ztd-banner">
          <div className="ztd-wrap ztd-banner-inner">
            <div className="ztd-banner-content">
              <span className="ztd-eyebrow light">Available on Android</span>
              <h2 className="ztd-h2 light">Smarter deliveries<br />for everyday living.</h2>
              <p className="ztd-banner-sub">One app. Thousands of flavours. Real-time tracking. Zero hassle.</p>
              <a href="https://play.google.com/store/apps/details?id=com.zaptodoor.user" target="_blank" rel="noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="ztd-play" />
              </a>
            </div>
            <div className="ztd-banner-visual" aria-hidden="true">
              <img src="https://zaptodoor.com/upload/file_69806ec2dfdb52.18567712.png" alt="" />
            </div>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section className="ztd-section ztd-section-alt">
          <div className="ztd-wrap">
            <div className="ztd-head">
              <span className="ztd-eyebrow">Our Platform</span>
              <h2 className="ztd-h2">One ecosystem,<br /><em>three apps</em></h2>
              <p className="ztd-sub">Powering customers, businesses, and riders through one seamless network.</p>
            </div>
            <div className="ztd-eco-grid">
              <div className="ztd-slider">
                {SLIDES.map((src, i) => (
                  <img key={i} src={src} alt={`Ecosystem ${i + 1}`} className={`ztd-slide${i === slide ? ' active' : ''}`} />
                ))}
                <div className="ztd-dots">
                  {SLIDES.map((_, i) => (
                    <button key={i} className={`ztd-dot-btn${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)} aria-label={`Go to slide ${i + 1}`} />
                  ))}
                </div>
              </div>
              <div className="ztd-eco-list">
                {ECOSYSTEM.map((item, i) => (
                  <div className="ztd-eco-card" key={i}>
                    <div className="ztd-eco-left">
                      <div className="ztd-eco-logo" style={{ background: item.color + '18' }}>
                        <img src={item.logo} alt={item.title} />
                      </div>
                      <div>
                        <strong>{item.title}</strong>
                        <span style={{ color: item.color }}>{item.subtitle}</span>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                    <a href={item.link} target="_blank" rel="noreferrer" className="ztd-eco-dl">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="ztd-footer">
        <div className="ztd-footer-top">
          <div className="ztd-wrap ztd-footer-grid">
            <div className="ztd-footer-brand">
              <img src="https://zaptodoor.com/upload/file_697cd2ac092d56.33530713.png" alt="Zaptodoor" className="ztd-footer-logo" />
              <p>Delivering joy across Gwalior — one order at a time.</p>
              <ul>
                <li><i className="bi bi-telephone-fill" /> +91 83700 83744</li>
                <li><i className="bi bi-phone-fill" /> +91 9200018690</li>
                <li><i className="bi bi-envelope-fill" /> info@zaptodoor.com</li>
              </ul>
              <div className="ztd-socials">
                {SOCIALS.map(({ href, icon, label }) => (
                  <a key={icon} href={href} aria-label={label} target="_blank" rel="noreferrer">
                    <i className={`bi ${icon}`} />
                  </a>
                ))}
              </div>
            </div>
            <div className="ztd-footer-col">
              <h4>Useful Links</h4>
              <ul>
                {[['index.php','Home'],['about-us.php','About Us'],['contact-us.php','Contact Us'],['services.php','Services'],['our-certifications.php','Certifications']].map(([href,label]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div className="ztd-footer-col">
              <h4>Legal</h4>
              <ul>
                {[['privacy-policy.php','Privacy Policy'],['cancellation-policy.php','Cancellation Policy'],['terms--conditions.php','Terms & Conditions'],['shipping-policy.php','Shipping Policy'],['refund-policy.php','Refund Policy']].map(([href,label]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div className="ztd-footer-col">
              <h4>Find Us</h4>
              <address>
                <strong>Office</strong>
                G.Incube, Moti Mahal, Smart City Incubation Center, Lashkar, Gwalior, MP 474007
              </address>
              <address>
                <strong>Registered</strong>
                171, New Colony No. 2, Birlana, Pole No. 14, Birlanagar, Gwalior – 474004
              </address>
            </div>
          </div>
        </div>
        <div className="ztd-footer-certs">
          <div className="ztd-wrap ztd-certs-inner">
            <p>Certified quality &amp; government-recognised partnerships</p>
            <div className="ztd-cert-row">
              {CERT_IMGS.map((src, i) => <img key={i} src={src} alt={`Certification ${i + 1}`} />)}
            </div>
          </div>
        </div>
        <div className="ztd-footer-bottom">
          <div className="ztd-wrap ztd-footer-bottom-inner">
            <span>© 2026 <strong>Zaptodoor Private Limited</strong>. All rights reserved.</span>
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════
   CSS
═══════════════════════════════════════ */
const CSS = `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --brand: #FC8019;
  --brand-dk: #d96208;
  --brand-lt: #fff4ea;
  --dark: #111110;
  --body: #3a3935;
  --muted: #706f6b;
  --light: #f6f5f0;
  --white: #ffffff;
  --border: rgba(0,0,0,.07);
  --nav-h: 68px;
  --r: 14px;
  --r-lg: 20px;
  --sh: 0 2px 12px rgba(0,0,0,.07);
  --sh-lg: 0 8px 40px rgba(0,0,0,.12);
}

html { scroll-behavior: smooth; }
body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--white); color: var(--body); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
img { display: block; max-width: 100%; }
a { text-decoration: none; }

/* wrap */
.ztd-wrap { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

/* ── NAV ── */
.ztd-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 900;
  height: var(--nav-h); transition: background .3s, box-shadow .3s;
}
.ztd-nav.scrolled {
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border), var(--sh);
}
.ztd-nav-inner {
  max-width: 1200px; margin: 0 auto; height: 100%;
  padding: 0 32px; display: flex; align-items: center; gap: 28px;
}
.ztd-logo img { height: 34px; }
.ztd-links { display: flex; align-items: center; gap: 2px; margin-left: auto; }
.ztd-links a {
  font-size: 14px; font-weight: 500; padding: 7px 13px; border-radius: 10px;
  color: rgba(255,255,255,.85); transition: background .2s, color .2s;
}
.ztd-nav.scrolled .ztd-links a { color: var(--body); }
.ztd-links a:hover { background: rgba(255,255,255,.13); color: #fff; }
.ztd-nav.scrolled .ztd-links a:hover { background: var(--brand-lt); color: var(--brand); }
.ztd-nav-cta {
  display: flex; align-items: center; gap: 8px;
  background: var(--brand); color: #fff;
  padding: 9px 20px; border-radius: 12px;
  font-size: 14px; font-weight: 600; white-space: nowrap; flex-shrink: 0;
  transition: background .2s, transform .15s;
}
.ztd-nav-cta:hover { background: var(--brand-dk); transform: translateY(-1px); }
.ztd-ham {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 4px; margin-left: auto;
}
.ztd-ham span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: background .3s; }
.ztd-nav.scrolled .ztd-ham span { background: var(--dark); }

/* drawer */
.ztd-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 1000;
  display: flex; justify-content: flex-end; animation: ztdFade .2s;
}
.ztd-drawer {
  width: 280px; height: 100%; background: #fff;
  padding: 24px; display: flex; flex-direction: column; gap: 6px;
  animation: ztdSlide .25s ease;
}
.ztd-drawer-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.ztd-drawer-head button { background: none; border: none; font-size: 20px; cursor: pointer; color: var(--body); }
.ztd-drawer-nav { display: flex; flex-direction: column; gap: 2px; }
.ztd-drawer-nav a { padding: 11px 14px; border-radius: 10px; font-size: 15px; font-weight: 500; color: var(--body); transition: background .2s; }
.ztd-drawer-nav a:hover { background: var(--brand-lt); color: var(--brand); }
.ztd-drawer-cta {
  margin-top: auto; display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--brand); color: #fff;
  padding: 13px; border-radius: 12px; font-size: 15px; font-weight: 600;
}
@keyframes ztdFade { from { opacity: 0 } to { opacity: 1 } }
@keyframes ztdSlide { from { transform: translateX(100%) } to { transform: translateX(0) } }

/* ── HERO ── */
.ztd-hero {
  min-height: 100vh; padding-top: var(--nav-h);
  position: relative; overflow: hidden;
  display: flex; align-items: center;
}
.ztd-hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(135deg, #1c1106 0%, #2d1a00 50%, #0d0d0d 100%);
}
.ztd-hero-bg::after {
  content: ''; position: absolute; inset: 0;
  background: url("https://zaptodoor.com/upload/file_698c2b0f1e0d08.25601906.jfif") center/cover;
  opacity: .15;
}
.ztd-hero-grid {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center; gap: 40px; padding-top: 40px; padding-bottom: 80px;
}
.ztd-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(252,128,25,.14); border: 1px solid rgba(252,128,25,.28);
  color: #fba354; font-size: 13px; font-weight: 600;
  padding: 6px 14px; border-radius: 100px; margin-bottom: 22px; letter-spacing: .3px;
}
.ztd-dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--brand);
  box-shadow: 0 0 0 3px rgba(252,128,25,.28);
  animation: ztdPulse 2s infinite;
}
@keyframes ztdPulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(252,128,25,.28); }
  50% { box-shadow: 0 0 0 7px rgba(252,128,25,.06); }
}
.ztd-h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(38px, 5vw, 62px); font-weight: 800;
  line-height: 1.08; color: #fff;
  letter-spacing: -.5px; margin-bottom: 18px;
}
.ztd-h1 em { color: var(--brand); font-style: italic; }
.ztd-hero-p { font-size: 15px; color: rgba(255,255,255,.6); line-height: 1.75; max-width: 440px; margin-bottom: 36px; }
.ztd-hero-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.ztd-btn {
  display: inline-flex; align-items: center; gap: 9px;
  background: var(--brand); color: #fff;
  padding: 14px 28px; border-radius: 14px;
  font-size: 15px; font-weight: 700;
  box-shadow: 0 4px 24px rgba(252,128,25,.38);
  transition: background .2s, transform .15s;
}
.ztd-btn:hover { background: var(--brand-dk); transform: translateY(-2px); }
.ztd-rating { display: flex; flex-direction: column; gap: 4px; color: rgba(255,255,255,.5); font-size: 12px; }
.ztd-stars { display: flex; gap: 2px; color: #fbbf24; font-size: 13px; }

.ztd-hero-visual {
  position: relative; display: flex; align-items: center; justify-content: center; padding: 40px 0;
}
.ztd-phone-frame {
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
  border-radius: 28px; padding: 12px;
  box-shadow: 0 24px 80px rgba(0,0,0,.5);
}
.ztd-phone-img { width: min(280px, 26vw); border-radius: 20px; object-fit: cover; aspect-ratio: 9/16; }
.ztd-float {
  position: absolute; border-radius: 50%; overflow: hidden;
  border: 4px solid rgba(255,255,255,.1); box-shadow: 0 8px 32px rgba(0,0,0,.4);
}
.ztd-float img { width: 100%; height: 100%; object-fit: cover; }
.ztd-float-1 { width: 96px; height: 96px; left: -8px; top: 64px; animation: ztdFloat 6s ease-in-out infinite; }
.ztd-float-2 { width: 76px; height: 76px; right: -8px; bottom: 84px; animation: ztdFloat 7s ease-in-out infinite reverse; }
@keyframes ztdFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }

/* ── STATS ── */
.ztd-stats { background: var(--dark); border-bottom: 1px solid rgba(255,255,255,.06); }
.ztd-stats-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 32px;
  display: flex; align-items: stretch; flex-wrap: wrap;
}
.ztd-stat {
  flex: 1; min-width: 120px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 4px;
  padding: 26px 12px; border-right: 1px solid rgba(255,255,255,.07);
  text-align: center;
}
.ztd-stat:last-child { border-right: none; }
.ztd-stat > i { font-size: 20px; color: var(--brand); margin-bottom: 2px; }
.ztd-stat strong { font-size: clamp(18px, 2vw, 24px); font-weight: 700; color: #fff; }
.ztd-stat span { font-size: 12px; color: rgba(255,255,255,.4); font-weight: 500; }

/* ── SECTIONS ── */
.ztd-section { padding: 96px 0; }
.ztd-section-alt { background: var(--light); }

.ztd-head { text-align: center; max-width: 520px; margin: 0 auto 56px; }
.ztd-eyebrow {
  display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--brand); margin-bottom: 10px;
}
.ztd-eyebrow.light { color: rgba(252,128,25,.75); }
.ztd-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(26px, 3.5vw, 40px); font-weight: 800;
  line-height: 1.15; color: var(--dark);
  letter-spacing: -.4px; margin-bottom: 12px;
}
.ztd-h2.light { color: #fff; }
.ztd-h2 em { color: var(--brand); font-style: italic; }
.ztd-sub { font-size: 15px; color: var(--muted); line-height: 1.7; }

/* FEATURES */
.ztd-features {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px;
}
.ztd-feat-card {
  background: var(--white); border-radius: var(--r-lg);
  overflow: hidden; border: 1px solid var(--border);
  transition: transform .25s, box-shadow .25s;
}
.ztd-feat-card:hover { transform: translateY(-6px); box-shadow: var(--sh-lg); }
.ztd-feat-icon { height: 150px; display: flex; align-items: center; justify-content: center; font-size: 50px; }
.ztd-feat-body { padding: 16px 18px 20px; }
.ztd-feat-body h3 { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
.ztd-feat-body p { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* BANNER */
.ztd-banner {
  background: linear-gradient(140deg, #1c1106 0%, #0d0d0d 100%);
  overflow: hidden; position: relative;
}
.ztd-banner::before {
  content: ''; position: absolute;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(252,128,25,.1), transparent 70%);
  top: -200px; right: -60px; pointer-events: none;
}
.ztd-banner-inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
.ztd-banner-content { padding: 80px 0; max-width: 500px; }
.ztd-banner-content .ztd-head { text-align: left; margin: 0 0 14px; }
.ztd-banner-sub { font-size: 15px; color: rgba(255,255,255,.45); line-height: 1.7; margin-bottom: 32px; }
.ztd-play { height: 50px; }
.ztd-banner-visual { flex-shrink: 0; width: min(320px, 30vw); }
.ztd-banner-visual img { width: 100%; object-fit: contain; filter: drop-shadow(0 20px 60px rgba(0,0,0,.5)); }

/* ECOSYSTEM */
.ztd-eco-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: start; }
.ztd-slider { position: relative; border-radius: var(--r-lg); overflow: hidden; aspect-ratio: 4/3; background: #111; }
.ztd-slide { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .6s; }
.ztd-slide.active { position: relative; opacity: 1; }
.ztd-dots { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 2; }
.ztd-dot-btn { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.45); border: none; cursor: pointer; transition: background .3s, transform .3s; }
.ztd-dot-btn.active { background: var(--brand); transform: scale(1.3); }
.ztd-eco-list { display: flex; flex-direction: column; gap: 14px; }
.ztd-eco-card {
  background: var(--white); border: 1px solid var(--border); border-radius: var(--r-lg);
  padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 14px;
  transition: transform .2s, box-shadow .2s;
}
.ztd-eco-card:hover { transform: translateY(-3px); box-shadow: var(--sh-lg); }
.ztd-eco-left { display: flex; align-items: flex-start; gap: 14px; flex: 1; }
.ztd-eco-logo { width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.ztd-eco-logo img { width: 36px; height: 36px; object-fit: cover; border-radius: 8px; }
.ztd-eco-card strong { display: block; font-size: 14px; font-weight: 700; color: var(--dark); }
.ztd-eco-card > .ztd-eco-left > div > span { display: block; font-size: 11px; font-weight: 600; margin: 2px 0 6px; }
.ztd-eco-card p { font-size: 13px; color: var(--muted); line-height: 1.55; }
.ztd-eco-dl { flex-shrink: 0; }
.ztd-eco-dl img { height: 32px; }

/* ── FOOTER ── */
.ztd-footer { background: #0d0d0d; }
.ztd-footer-top { border-bottom: 1px solid rgba(255,255,255,.07); padding: 64px 0 48px; }
.ztd-footer-grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px;
}
.ztd-footer-brand .ztd-footer-logo { height: 32px; margin-bottom: 14px; }
.ztd-footer-brand > p { font-size: 14px; color: rgba(255,255,255,.38); line-height: 1.6; margin-bottom: 18px; }
.ztd-footer-brand ul { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.ztd-footer-brand ul li { font-size: 13px; color: rgba(255,255,255,.45); display: flex; align-items: center; gap: 8px; }
.ztd-footer-brand ul li i { color: var(--brand); }
.ztd-socials { display: flex; gap: 7px; flex-wrap: wrap; }
.ztd-socials a {
  width: 34px; height: 34px; border-radius: 9px;
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.09);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.55); font-size: 14px;
  transition: background .2s, color .2s;
}
.ztd-socials a:hover { background: var(--brand); color: #fff; border-color: var(--brand); }
.ztd-footer-col h4 { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.6); margin-bottom: 18px; letter-spacing: 1px; text-transform: uppercase; }
.ztd-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ztd-footer-col ul li a { font-size: 13px; color: rgba(255,255,255,.4); transition: color .2s; }
.ztd-footer-col ul li a:hover { color: var(--brand); }
.ztd-footer-col address { font-style: normal; font-size: 13px; color: rgba(255,255,255,.38); line-height: 1.7; margin-bottom: 16px; }
.ztd-footer-col address strong { display: block; color: rgba(255,255,255,.65); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
.ztd-footer-certs { border-bottom: 1px solid rgba(255,255,255,.07); padding: 28px 0; }
.ztd-certs-inner { text-align: center; }
.ztd-certs-inner > p { font-size: 11px; font-weight: 700; color: rgba(255,255,255,.28); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 18px; }
.ztd-cert-row { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
.ztd-cert-row img { height: 50px; width: 50px; object-fit: contain; background: #fff; border-radius: 10px; padding: 7px; opacity: .8; transition: opacity .2s, transform .2s; }
.ztd-cert-row img:hover { opacity: 1; transform: scale(1.06); }
.ztd-footer-bottom { padding: 18px 0; }
.ztd-footer-bottom-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
.ztd-footer-bottom-inner span { font-size: 13px; color: rgba(255,255,255,.28); }
.ztd-footer-bottom-inner strong { color: rgba(255,255,255,.5); }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .ztd-features { grid-template-columns: repeat(3, 1fr); }
  .ztd-footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 900px) {
  .ztd-hero-grid { grid-template-columns: 1fr; padding-top: 60px; padding-bottom: 60px; }
  .ztd-hero-p { max-width: 100%; }
  .ztd-hero-actions { justify-content: flex-start; }
  .ztd-hero-visual { display: none; }
  .ztd-eco-grid { grid-template-columns: 1fr; }
  .ztd-banner-visual { display: none; }
  .ztd-banner-inner { justify-content: center; }
  .ztd-banner-content { padding: 60px 0; }
}
@media (max-width: 768px) {
  .ztd-links, .ztd-nav-cta { display: none; }
  .ztd-ham { display: flex; }
  .ztd-nav-inner { gap: 0; }
  .ztd-wrap { padding: 0 20px; }
  .ztd-stats-inner { padding: 0 16px; }
  .ztd-stat { flex: 1 1 33%; border-right: none; border-bottom: 1px solid rgba(255,255,255,.07); }
  .ztd-section { padding: 64px 0; }
  .ztd-features { grid-template-columns: repeat(2, 1fr); }
  .ztd-footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .ztd-footer-top { padding: 48px 0 36px; }
  .ztd-hero-content { text-align: center; }
  .ztd-pill, .ztd-hero-actions { justify-content: center; }
}
@media (max-width: 480px) {
  .ztd-features { grid-template-columns: 1fr; }
  .ztd-stat { flex: 1 1 50%; }
  .ztd-eco-card { flex-direction: column; align-items: flex-start; }
}
`;