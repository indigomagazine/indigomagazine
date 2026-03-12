import React from "react";
import { useEffect, useRef, forwardRef } from "react";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import "./serial.css";



/* Where you will add article data */
/* Make sure to add new item at the top of the list so it appears first */
/* Will add more fields to allow custom colors for titles and tags.  */
const items = [
  {
    id: "article10",
    title: "Life in Paradise",
    description: "By: Kerstin T. & Manjiri C.",
    tags: ["INTERACTIVE", "VISUAL", "MAGAZINE"],
    image: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/group9cover.png",
    to: "/issues/serial/lifeinparadise",
    coverPos: "center center",
  },

  {
    id: "article-7",
    title: "ctrl + c",
    description: "By: Zenah I.",
    tags: ["IMMERSIVE"],
    // Replace with your local asset paths or URLs
    image:
      "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339839/facestretch_sadc29.png",
    // Optional: imageGird for grid view (else uses `image`)
    to: "/issues/serial/indigoos", // path to article
    coverPos: " left 25% top 10%",
    // gridPosL optional: "center center",
  },
  {
    id: "article-5",
    title: "Stomach Ache",
    description: "By: Sanhita Perkari",
    tags: ["INTERACTIVE"],
    // Replace with your local asset paths or URLs
    image: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/stomachache/serialpicture.JPG",
    // Optional: imageGird for grid view (else uses `image`)
    to: "/issues/serial/stomachache", // path to article
    coverPos: "center center",
    // gridPosL optional: "center center",
  },
  {
    id: "article-4",
    title: "Vengeance of the West",
    description: "By: Karishma Pilla",
    tags: ["Western", "Serial Killer"],
    // Replace with your local asset paths or URLs
    image: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/vengeance%20of%20the%20west/teaser.jpg",
    // Optional: imageGird for grid view (else uses `image`)
    to: "/issues/serial/western", // path to article
    coverPos: "center center",
    // gridPosL optional: "center center",
  },
  {
    id: "article-9",
    title: "Covet",
    description: "By: Joanna Virippil",
    tags: ["Hate", "Friendship"],
    // Replace with your local asset paths or URLs
    image: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/covet/9-clothes-2.jpg",
    // Optional: imageGird for grid view (else uses `image`)
    to: "/issues/serial/covet", // path to article
    coverPos: "center center",
    // gridPosL optional: "center center",
  },
  {
    id: "article-8",
    title: "You Can Twist Time",
    description: "By: Jiya Gupta",
    tags: ["SCROLLABLE", "NOVEMBER"],
    // Replace with your local asset paths or URLs
    image: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/you%20can%20twist%20time/final.png",
    // Optional: imageGird for grid view (else uses `image`)
    to: "/issues/serial/youcantwisttime", // path to article
    coverPos: "center center",
    // gridPosL optional: "center center",
  },

  {
    id: "article-3",
    title: "Keyboards",
    description: "By: Manogna Bedhu",
    tags: ["INTERACTIVE", "NOVEMBER"],
    // Replace with your local asset paths or URLs
    image: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/keyboards/anotha%20one.png",
    // Optional: imageGird for grid view (else uses `image`)
    to: "/issues/serial/keyboards", // path to article
    coverPos: "center center",
    // gridPosL optional: "center center",
  },
  {
    id: "article-2",
    title: "A Number Out of Place ",
    description: "By: Nicole C. ",
    tags: ["MATRIX", "NOVEMBER"],
    // Replace with your local asset paths or URLs
    image:
      "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/a%20number%20out%20of%20place/REN_1404%20copy.jpg",
    // Optional: imageGird for grid view (else uses `image`)
    to: "/issues/serial/anumberoutofplace", // path to article
    coverPos: " left 25% top 10%",
    // gridPosL optional: "center center",
  },

  {
    id: "article-1",
    title: "I Love Shopping ",
    description: "By: Zayeed A. ",
    tags: ["FASHION", "NOVEMBER"],
    // Replace with your local asset paths or URLs
    image: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/i%20love%20shopping/BF5T7684.jpg",
    // Optional: imageGird for grid view (else uses `image`)
    to: "/issues/serial/iloveshopping", // path to article
    coverPos: " left 25% top 10%",
    // gridPosL optional: "center center",
  },

  /* Coming soon item*/
  {
    id: "commingSoon",
    description: "",
    image: "../../legacy/assets/backgrounds/More.png",
    imageGrid: "../../legacy/assets/backgrounds/dott.svg",
    gridPos: "top 50% left 50%",
    title: "More Coming Soon",
    to: "",
    blur: true,
  },
  /*
  
  */
];

export default function Serial() {
  const [view, setView] = useState("scroll"); // 'scroll' | 'grid'
  const data = useMemo(() => items, []);

  const [prevView, setPrevView] = useState("scroll");
  const [animClass, setAnimClass] = useState(""); // "slide-in-left" | "slide-in-right" | ""

  // Scroll-hint state
  const [activeIndex, setActiveIndex] = useState(() => {
    const saved = localStorage.getItem("serial_last_index");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showHint, setShowHint] = useState(false);
  const hasScrolled = useRef(false);

  const scrollerRef = useRef(null);
  const isSnappingRef = useRef(false);
  const sectionHRef = useRef(0);

  const [barOpen, setBarOpen] = useState(false);

  // Show bounce hint after 2 s (reset if user already scrolled)
  useEffect(() => {
    if (view !== "scroll") return;

    // If we're starting at a saved position, we've effectively already scrolled
    if (activeIndex > 0) {
      hasScrolled.current = true;
      setShowHint(false);
      return;
    }

    hasScrolled.current = false;
    setShowHint(false);
    const timer = setTimeout(() => {
      if (!hasScrolled.current) setShowHint(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [view]);

  // Track active dot index + hide hint on first scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || view !== "scroll") return;
    const onScroll = () => {
      const h = sectionHRef.current || el.clientHeight;
      const idx = Math.round(el.scrollTop / h);
      if (idx !== activeIndex) {
        setActiveIndex(idx);
        localStorage.setItem("serial_last_index", idx);
      }
      if (!hasScrolled.current) {
        hasScrolled.current = true;
        setShowHint(false);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [view]);

  useEffect(() => {
    const prev = document.body.style.margin;
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    return () => {
      document.body.style.margin = prev;
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || view !== "scroll") return;

    const sections = Array.from(el.querySelectorAll(".snap-section"));
    const getIndex = () => Math.round(el.scrollTop / sectionHRef.current);

    const onResize = () => {
      sectionHRef.current = el.clientHeight;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const onWheel = (e) => {
      // normalize and gate the scroll
      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const threshold = 25; // ignore micro-scrolls / jitters
      if (Math.abs(delta) < threshold) return;

      e.preventDefault();
      isSnappingRef.current = true;

      const cur = getIndex();
      const next = Math.min(
        sections.length - 1,
        Math.max(0, cur + (delta > 0 ? 1 : -1))
      );

      el.scrollTo({ top: next * sectionHRef.current, behavior: "smooth" });

      // release the lock after the smooth scroll finishes
      const release = () => {
        isSnappingRef.current = false;
        el.removeEventListener("scrollend", release);
      };
      el.addEventListener?.("scrollend", release); // supported in modern Chromium
      // fallback timer if scrollend isn’t supported:
      setTimeout(() => {
        isSnappingRef.current = false;
      }, 420);
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    // Restore scroll position
    if (activeIndex > 0) {
      el.scrollTop = activeIndex * el.clientHeight;
    }

    return () => {
      window.removeEventListener("resize", onResize);
      el.removeEventListener("wheel", onWheel);
    };
  }, [view]);

  const handleToggle = (checked) => {
    const next = checked ? "grid" : "scroll";
    // decide direction based on previous view
    const dir =
      prevView === "scroll" && next === "grid"
        ? "slide-in-right"
        : prevView === "grid" && next === "scroll"
          ? "slide-in-left"
          : "";

    setPrevView(next);
    setAnimClass(dir);
    setView(next);

    // clear the animation class after it plays
    window.requestAnimationFrame(() => {
      setTimeout(() => setAnimClass(""), 420); // keep slightly longer than CSS duration
    });
  };

  return (
    <div
      className="mg-root"
      styles={{
        "--drawer-w": "300px",
        "--drawer-h": "80vh",
        "--drawer-bg": "rgba(10,10,10,0.70)",
        "--drawer-color": "#f8d254ff",
        "--drawer-accent": "rgba(255,255,255,0.18)",
        "--drawer-speed": "280ms",
      }}
    >
      <aside
        className={`serial-drawer ${barOpen ? "is-open" : ""}`}
        role="complementary"
        aria-label="Tools"
      >
        <div className="serial-drawer__inner">
          <nav className="drawer-nav" aria-label="Section">
            <Link to="/">Home</Link>
            <Link to="/issues">Issues</Link>
            <Link to="/about">About</Link>
            <Link to="/visual-arts">VisualArts</Link>
          </nav>
        </div>
      </aside>

      {/* Tab / Asset that rides with the drawer edge */}
      <button
        className={`drawer-tab ${barOpen ? "is-open" : ""}`}
        aria-label={barOpen ? "Close tools" : "Open tools"}
        aria-expanded={barOpen}
        onClick={() => setBarOpen((v) => !v)}
      >
        {/* replace with your SVG/PNG */}
        <img src="../../legacy/assets/logos/indigologowhite.png" alt="" />
      </button>

      {/* Your existing view switcher */}
      <div className={`content-stage ${animClass}`}>
        {view === "scroll" ? (
          <ScrollSections ref={scrollerRef} items={data} />
        ) : (
          <GridGallery items={data} />
        )}
      </div>

      {/* Vertical progress dots — top-right */}
      {view === "scroll" && (
        <div className="scroll-dots" aria-hidden="true">
          {data.map((_, i) => (
            <span
              key={i}
              className={`scroll-dot${i === activeIndex ? " is-active" : ""}`}
            />
          ))}
        </div>
      )}

      {/* Bouncing scroll hint chevron */}
      {view === "scroll" && showHint && activeIndex < data.length - 1 && (
        <div className="scroll-hint" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <polyline
              points="6 9 12 15 18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// ScrollSections: swap the src & add a conditional class
const ScrollSections = forwardRef(function ScrollSections({ items }, ref) {
  return (
    <div ref={ref} className="snap-wrapper" aria-label="Feature stories">
      {items.map((it) => (
        <section
          className={`snap-section ${it.comingSoon ? "is-coming-soon" : ""}`}
          key={it.id}
        >
          {/* Disable click if coming soon or no 'to' */}
          {!it.comingSoon && it.to ? (
            <a href={it.to} className="hit-area" aria-label={it.title} />
          ) : null}

          <img
            className={`cover ${it.blur ? "is-blurred" : ""}`}
            src={it.imageScroll || it.image}
            alt={it.title}
            loading="lazy"
            style={{ "--cover-pos": it.coverPos || "center" }}
          />
          <MetaOverlay item={it} />
        </section>
      ))}
    </div>
  );
});

function GridGallery({ items }) {
  return (
    <div className="grid-wrapper" aria-label="All stories (grid)">
      {items.map((it) => (
        <article
          className={`grid-card ${it.comingSoon ? "is-coming-soon" : ""}`}
          key={it.id}
        >
          {/* Disable link for coming soon */}
          {!it.comingSoon && it.to ? (
            <a href={it.to} className="card-link" aria-label={it.title} />
          ) : null}

          <img
            className="thumb"
            src={it.imageGrid || it.image}
            alt={it.title}
            loading="lazy"
            /* grid-only position */
            style={{ "--obj-pos": it.gridPos || "center center" }}
          />

          <div className="card-meta">
            {it.comingSoon && <span className="badge">Coming soon</span>}
          </div>
        </article>
      ))}
    </div>
  );
}

function MetaOverlay({ item }) {
  return (
    <div className="meta">
      <div className="bullet" aria-hidden="true">
        <img src="" alt="" />
      </div>
      <h2 className="title">{item.title}</h2>
      <p className="desc">{item.description}</p>
      {item.tags?.length ? (
        <div className="tags">
          {item.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
