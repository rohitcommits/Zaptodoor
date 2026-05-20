import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import appvdo from "../../assets/StorySaver.net-souravbabuvlogs-Video-1779265227770.mp4"
import foodi  from "../../assets/StorySaver.net-gwalior_.foodie-Video-1779266198784.mp4"
import intervdeo from "../../assets/StorySaver.net-mrjeetnews-Video-1779266428208.mp4"

const RAW = [
  {
    video: appvdo,
    tag: "Business",
    title: "ZaptoDoor Grand Opening",
    date: "31.01.2025",
  },

  {
    video:foodi,
    tag: "Business",
    title:
      "ZaptoDoor Partners with Fiserv to Enable Streamlined eCommerce Payments",
    date: "23.10.2024",
  },

  {
    img:
      "https://www.foodpanda.com/wp-content/uploads/2025/04/Image-1-scaled-e1745809628641.jpg",
    tag: "Press Releases",
    title:
      "ZaptoDoor Singapore launches Rider Safety Month",
    date: "07.10.2024",
  },

  {
    video:
      intervdeo,
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

  {
    img:
      "https://www.foodpanda.com/wp-content/uploads/2025/07/foodpanda-home-2-900x506.webp",
    tag: "Business",
    title:
      "ZaptoDoor introduces AI-powered delivery",
    date: "05.09.2025",
  },
];

const CARD_W = 292;
const GAP = 14;
const STEP = CARD_W + GAP;
const INTERVAL = 3000;
const N = RAW.length;
const VISIBLE_FULL = 3;
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
          "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow =
          "0 20px 40px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px) scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* VIDEO / IMAGE */}
      {video ? (
        <video
          src={video}
          style={styles.media}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={img}
          alt={title}
          style={styles.media}
          draggable={false}
        />
      )}

      <div style={styles.overlay} />

      <div style={styles.content}>
        <span style={styles.tag}>{tag}</span>

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
  const [offset, setOffset] = useState(0);

  const timerRef = useRef(null);
  const trackRef = useRef(null);
  const maskRef = useRef(null);

  const isTransitioning = useRef(false);

  const dragStartX = useRef(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (maskRef.current) {
        const width =
          maskRef.current.offsetWidth;

        setOffset(
          Math.round(
            (width -
              VISIBLE_FULL * STEP -
              GAP) /
              2
          )
        );
      }
    };

    measure();

    window.addEventListener(
      "resize",
      measure
    );

    return () =>
      window.removeEventListener(
        "resize",
        measure
      );
  }, []);

  const getTranslate = useCallback(
    (p, extra = 0) => {
      return -(p * STEP - offset) + extra;
    },
    [offset]
  );

  const applyTransform = useCallback(
    (p, anim, extra = 0) => {
      if (!trackRef.current) return;

      trackRef.current.style.transition =
        anim
          ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)"
          : "none";

      trackRef.current.style.transform = `translateX(${getTranslate(
        p,
        extra
      )}px)`;
    },
    [getTranslate]
  );

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (!isTransitioning.current) {
        isTransitioning.current = true;

        setAnimated(true);

        setPos((p) => p + 1);
      }
    }, INTERVAL);
  }, []);

  useEffect(() => {
    startTimer();

    return () =>
      clearInterval(timerRef.current);
  }, [startTimer]);

  useEffect(() => {
    applyTransform(pos, animated);
  }, [pos, animated, applyTransform]);

  const handleTransitionEnd = () => {
    setPos((p) => {
      let np = p;

      if (np >= N * 2) np -= N;
      else if (np < N) np += N;

      if (np !== p)
        applyTransform(np, false);

      return np;
    });

    isTransitioning.current = false;
  };

  const onDragStart = (clientX) => {
    clearInterval(timerRef.current);

    isDragging.current = true;

    dragStartX.current = clientX;

    dragDelta.current = 0;

    setAnimated(false);
  };

  const onDragMove = (clientX) => {
    if (!isDragging.current) return;

    dragDelta.current =
      clientX - dragStartX.current;

    applyTransform(
      pos,
      false,
      dragDelta.current
    );
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;

    isDragging.current = false;

    let newPos = pos;

    if (dragDelta.current < -STEP / 3)
      newPos++;

    else if (
      dragDelta.current >
      STEP / 3
    )
      newPos--;

    if (newPos >= N * 2) newPos -= N;

    if (newPos < N) newPos += N;

    isTransitioning.current = true;

    setAnimated(true);

    setPos(newPos);

    startTimer();
  };

  const fadeStyle = {
    ...styles.fadeLeft,
    width: `${offset}px`,
  };

  const fadeRightStyle = {
    ...styles.fadeRight,
    width: `${offset}px`,
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADING */}
      <div style={styles.headingWrap}>
        <h2 style={styles.heading}>
       Press Release
        </h2>

        <p style={styles.subheading}>
          Stay updated with our latest
          business announcements and
          delivery innovations
        </p>
      </div>

      <div ref={maskRef} style={styles.mask}>
        <div
          ref={trackRef}
          style={{
            ...styles.track,
            cursor: isDragging.current
              ? "grabbing"
              : "grab",
          }}
          onTransitionEnd={
            handleTransitionEnd
          }
          onMouseEnter={() =>
            clearInterval(timerRef.current)
          }
          onMouseLeave={() => {
            if (isDragging.current)
              onDragEnd();
            else startTimer();
          }}
          onMouseDown={(e) =>
            onDragStart(e.clientX)
          }
          onMouseMove={(e) =>
            onDragMove(e.clientX)
          }
          onMouseUp={onDragEnd}
          onTouchStart={(e) =>
            onDragStart(
              e.touches[0].clientX
            )
          }
          onTouchMove={(e) =>
            onDragMove(
              e.touches[0].clientX
            )
          }
          onTouchEnd={onDragEnd}
        >
          {ITEMS.map((item, i) => (
            <NewsCard
              key={i}
              {...item}
            />
          ))}
        </div>

        <div style={fadeStyle} />
        <div style={fadeRightStyle} />
      </div>
    </div>
  );
}

const PAGE_BG = "#ffffff";

const styles = {
  wrapper: {
    width: "100%",
    position: "relative",
    padding: "60px 0",
    background: "#fff",
  },

  headingWrap: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "0 20px",
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "12px",
  },

  subheading: {
    fontSize: "16px",
    color: "#6b7280",
    maxWidth: "650px",
    margin: "0 auto",
    lineHeight: "1.7",
  },

  mask: {
    overflow: "hidden",
    position: "relative",
  },

  track: {
    display: "flex",
    gap: `${GAP}px`,
    willChange: "transform",
    userSelect: "none",
  },

  card: {
    flex: `0 0 ${CARD_W}px`,
    height: "410px",
    borderRadius: "20px",
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
    transition: "all 0.35s ease",
    cursor: "pointer",
  },

  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.03) 100%)",
  },

  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "18px 16px",
  },

  tag: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#fff",
    opacity: 0.9,
    marginBottom: "8px",
    display: "inline-block",
    background:
      "rgba(255,255,255,0.15)",
    padding: "6px 10px",
    borderRadius: "30px",
    backdropFilter: "blur(6px)",
  },

  title: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.4,
    marginBottom: "8px",
  },

  date: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.7)",
  },

  fadeLeft: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to right, ${PAGE_BG} 50%, transparent 100%)`,
    pointerEvents: "none",
    zIndex: 10,
  },

  fadeRight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    background: `linear-gradient(to left, ${PAGE_BG} 50%, transparent 100%)`,
    pointerEvents: "none",
    zIndex: 10,
  },
};