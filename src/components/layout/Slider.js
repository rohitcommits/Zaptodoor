import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import appvdo from "../../assets/StorySaver.net-souravbabuvlogs-Video-1779265227770.mp4";
import foodi from "../../assets/StorySaver.net-gwalior_.foodie-Video-1779266198784.mp4";
import intervdeo from "../../assets/StorySaver.net-mrjeetnews-Video-1779266428208.mp4";

const RAW = [
  {
    video: appvdo,
    tag: "Business",
    title: "ZaptoDoor Grand Opening",
    date: "31.01.2025",
  },
  {
    video: foodi,
    tag: "Business",
    title:
      "ZaptoDoor Partners with Fiserv to Enable Streamlined eCommerce Payments",
    date: "23.10.2024",
  },
  {
    video: intervdeo,
    tag: "Business",
    title:
      "ZaptoDoor boosts grocery delivery with new pandamart stores",
    date: "20.01.2026",
  },
  {
    img:
      "https://www.foodpanda.com/wp-content/uploads/2024/10/website_banner_1440x480px.webp",
    tag: "Business",
    title:
      "ZaptoDoor expands cloud kitchen network",
    date: "15.03.2025",
  },
];

const CARD_W = 290;
const GAP = 16;
const STEP = CARD_W + GAP;
const INTERVAL = 3000;

const N = RAW.length;
const VISIBLE = 4;
const ITEMS = [...RAW, ...RAW, ...RAW];

function NewsCard({
  img,
  video,
  tag,
  title,
  date,
}) {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-10px)";
        e.currentTarget.style.boxShadow =
          "0 18px 35px rgba(0,0,0,.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
        e.currentTarget.style.boxShadow =
          "none";
      }}
    >
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          style={styles.media}
        />
      ) : (
        <img
          src={img}
          alt={title}
          draggable={false}
          style={styles.media}
        />
      )}

      <div style={styles.overlay}></div>

      <div style={styles.content}>
        <span style={styles.tag}>
          {tag}
        </span>

        <div style={styles.title}>
          {title}
        </div>

        <div style={styles.date}>
          {date}
        </div>
      </div>
    </div>
  );
}

export default function SimpleSlider() {
  const [pos, setPos] = useState(N);
  const [animated, setAnimated] =
    useState(false);

  const timerRef = useRef(null);
  const trackRef = useRef(null);

  const isTransitioning =
    useRef(false);

  const getTranslate =
    useCallback((p) => {
      return -(p * STEP);
    }, []);

  const applyTransform =
    useCallback(
      (p, anim) => {
        if (!trackRef.current)
          return;

        trackRef.current.style.transition =
          anim
            ? "transform .55s ease"
            : "none";

        trackRef.current.style.transform =
          `translateX(${getTranslate(
            p
          )}px)`;
      },
      [getTranslate]
    );

  const nextSlide =
    useCallback(() => {
      if (
        isTransitioning.current
      )
        return;

      isTransitioning.current = true;

      setAnimated(true);

      setPos(
        (prev) => prev + 1
      );
    }, []);

  const prevSlide =
    useCallback(() => {
      if (
        isTransitioning.current
      )
        return;

      isTransitioning.current = true;

      setAnimated(true);

      setPos(
        (prev) => prev - 1
      );
    }, []);

  const startTimer =
    useCallback(() => {
      clearInterval(
        timerRef.current
      );

      timerRef.current =
        setInterval(() => {
          nextSlide();
        }, INTERVAL);
    }, [nextSlide]);

  useEffect(() => {
    startTimer();

    return () =>
      clearInterval(
        timerRef.current
      );
  }, [startTimer]);

  useEffect(() => {
    applyTransform(
      pos,
      animated
    );
  }, [
    pos,
    animated,
    applyTransform,
  ]);

  const handleTransitionEnd =
    () => {
      setPos((p) => {
        let np = p;

        if (np >= N * 2)
          np -= N;

        if (np < N)
          np += N;

        if (np !== p)
          applyTransform(
            np,
            false
          );

        return np;
      });

      isTransitioning.current = false;
    };

  return (
    <div style={styles.wrapper}>
      <div
        style={
          styles.headingWrap
        }
      >
        <h2
          style={
            styles.heading
          }
        >
          Press Release
        </h2>

        <p
          style={
            styles.subheading
          }
        >
          Stay updated with
          our latest business
          announcements and
          delivery innovations
        </p>
      </div>

      <div style={styles.sliderArea}>
        {/* Left button */}
        <button
          style={{
            ...styles.navBtn,
            left: "-80px",
          }}
          onClick={() => {
            clearInterval(
              timerRef.current
            );
            prevSlide();
            startTimer();
          }}
        >
          ❮
        </button>

        {/* Slider */}
        <div style={styles.mask}>
          <div
            ref={trackRef}
            style={styles.track}
            onTransitionEnd={
              handleTransitionEnd
            }
          >
            {ITEMS.map(
              (item, i) => (
                <NewsCard
                  key={i}
                  {...item}
                />
              )
            )}
          </div>

          {/* White Side Covers */}
          <div
            style={
              styles.leftCover
            }
          />
          <div
            style={
              styles.rightCover
            }
          />
        </div>

        {/* Right button */}
        <button
          style={{
            ...styles.navBtn,
            right: "-80px",
          }}
          onClick={() => {
            clearInterval(
              timerRef.current
            );
            nextSlide();
            startTimer();
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    padding: "70px 0",
    background: "#fff",
  },

  headingWrap: {
    textAlign: "center",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "42px",
    fontWeight: 800,
    marginBottom: "10px",
  },

  subheading: {
    color: "#666",
    maxWidth: "700px",
    margin: "auto",
    lineHeight: 1.7,
  },

  sliderArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  mask: {
    width: `${CARD_W * VISIBLE + GAP * 3}px`,
    overflow: "hidden",
    position: "relative",
  },

  track: {
    display: "flex",
    gap: `${GAP}px`,
  },

  card: {
    flex: `0 0 ${CARD_W}px`,
    height: "420px",
    borderRadius: "24px",
    overflow: "hidden",
    position: "relative",
    transition: ".4s",
    cursor: "pointer",
  },

  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top,rgba(0,0,0,.85),transparent)",
  },

  content: {
    position: "absolute",
    bottom: 0,
    padding: "18px",
  },

  tag: {
    background:
      "rgba(255,255,255,.15)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "30px",
    fontSize: "12px",
  },

  title: {
    marginTop: "14px",
    color: "#fff",
    fontWeight: "700",
    lineHeight: 1.5,
  },

  date: {
    marginTop: "8px",
    color:
      "rgba(255,255,255,.7)",
    fontSize: "13px",
  },

  navBtn: {
    position: "absolute",
    top: "50%",
    transform:
      "translateY(-50%)",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    border: "none",
    background: "#fff",
    boxShadow:
      "0 8px 25px rgba(0,0,0,.15)",
    cursor: "pointer",
    fontSize: "24px",
    zIndex: 100,
  },

  leftCover: {
    position: "absolute",
    left: "-50px",
    top: 0,
    width: "50px",
    height: "100%",
    background: "#fff",
    zIndex: 10,
  },

  rightCover: {
    position: "absolute",
    right: "-50px",
    top: 0,
    width: "50px",
    height: "100%",
    background: "#fff",
    zIndex: 10,
  },
};