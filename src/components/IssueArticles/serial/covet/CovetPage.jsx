// src/articles/CovetArticle.jsx
import React, { useRef, useEffect, useMemo } from "react";
import "../covet/covet.css"; // we’ll write skeleton CSS next


// Example data for each spread/page of the article
const spreads = [
   {
    id: "title",
    layout: "title-page",
    title: "Covet",
    created: "Writen by - ",
    writer: "Joanna Virippil",
    imageSrc: "../../legacy/article photos/covet/cereal-1.jpg",
  
    accentColor: "#ff7ecf",
  },
  {
    id: "page-1",
    layout: "image-left-text-right",
    imageSrc: "../../legacy/article photos/covet/cereal-2.jpg",
    rightTextLines: [
      "Greeting in open arms",
      "The same familiar smile between us",
      "Your light and mine",
      "Woven tightly as threads",
      "No beginning no end",
    ],
    accentColor: "#ff7ecf",
  },
  {
    id: "page-2",
    layout: "image-left-text-right",
    imageSrc: "../../legacy/article photos/covet/12-beforeFlick.jpg",
    imageAlt: "Two friends sharing a secret",
    rightTextLines: [
      "We exchanged secrets, glances",
      "Like they were nothing",
      "But meant everything",
      "",
    ],
  },
     {
    id: "page-1-images",
    layout: "image-only",
    imageSrc: "../../legacy/article photos/covet/text2.png"
  },
    {
    id: "page-2",
    layout: "image-left-text-right",
    imageSrc: "../../legacy/article photos/covet/12-beforeFlick.jpg",
    imageAlt: "Two friends sharing a secret",
    rightTextLines: [
      "Mine feeling more a choker.",
      "Dread creeps out from the light",
    ],
  },
  
  {
    id: "page-3",
    layout: "text-left-image-right",
    imageSrc: "../../legacy/article photos/covet/11-flick.jpg",
    imageAlt: "Jewelry flick caught in motion",
    leftTextLines: [
      "Idiosyncrasy that was left unnoticed",
      "subtle discord treads the air",
      "If our hearts are truly united,",
      "why is your light brighter?",
      "Stronger,",
      "Sharper,",
      "Better.",
    ],
  },
  {
    id: "page-4",
    layout: "image-left-text-right",
    imageSrc: "../../legacy/article photos/covet/8-final.jpg",
    imageAlt: "Coat and shoes swapped between friends",
    rightTextLines: [
      "You point out my necklace,",
      "Clutching tightly at your own",
      "Your pristine, polished nails clawing at my nape",
      "You're the same as me aren’t you?",
      "",
      "Bracelets slip, tangled between wrists",
    
    ],
  },
   {
    id: "page-1-images",
    layout: "image-only",
    imageSrc: "../../legacy/article photos/covet/text.png"
  },
  {
    id: "page-6",
    layout: "text-only-l",
    imageAlt: "Two figures pulling away from each other",
    leftTextLines: [
      "Your coat draped over me, a conquest",
      "My shoes on your feet, stomping out my shadow",
    ],
    
  },
  {
    id: "page-5",
    layout: "text-left-image-right",
    imageSrc: "../../legacy/article photos/covet/6-hair.jpg",
    imageAlt: "Jewelry being adjusted in hair",
    leftTextLines: [
      "I drape your shawl across my shoulders",
      "You slip my earrings into your ears",
      "Each exchange a theft, a gift, a wound",
      "Shadows lengthen in our laughter",
    ],
  },
  {
    id: "page-6",
    layout: "text-only-l",
    imageAlt: "Two figures pulling away from each other",
    leftTextLines: [
      "We struggle to escape from each other",
      "Left in a disgraceful manner",
      "I tore my gaze away and fell silent",
      "I've become lost in my feelings",
      "how pathetic",
    ],
    
  },
  {
    id: "page-2-images",
    layout: "image-only",
    imageSrc: "../../legacy/article photos/covet/5-final.jpg"
  },
  {
    id: "page-7",
    layout: "text-only-r",
    imageSrc: "../../legacy/article photos/covet/3-punch.jpg",
    imageAlt: "Punch frozen between two adorned figures",
    leftTextLines: [
      "Gilded strangers in borrowed skins",
      "When your jewels glitter on my hands",
      "And mine sparkle against your throat,",
      "We do not soften.",
      "We stare.",
      "Jealous still,",
      "Hungry still,",
      "Clothed in each other’s stolen light.",
    ],
    
  }, {
    id: "page-3-images",
    layout: "image-only",
    imageSrc: "../../legacy/article photos/covet/3-punch.jpg",
  },
  {
    id: "page-4-images",
    layout: "image-only",
    imageSrc: "../../legacy/article photos/covet/4-punch.jpg",
  }, {
    id: "page-5-images",
    layout: "image-only",
    imageSrc: "../../legacy/article photos/covet/DILC.png",
  },
 

];


export default function CovetArticle() {
  const trackRef = useRef(null);
  const isSnappingRef = useRef(false);
  const slideWRef = useRef(0);

  const data = useMemo(() => spreads, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const slides = Array.from(el.querySelectorAll(".covet-spread"));
    const getIndex = () => Math.round(el.scrollLeft / slideWRef.current);

    const onResize = () => {
      slideWRef.current = el.clientWidth;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const onWheel = (e) => {
      // map vertical wheel → horizontal “page” moves
      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const threshold = 25;
      if (Math.abs(delta) < threshold) return;

      e.preventDefault();
      isSnappingRef.current = true;

      const cur = getIndex();
      const next = Math.min(
        slides.length - 1,
        Math.max(0, cur + (delta > 0 ? 1 : -1))
      );

      el.scrollTo({
        left: next * slideWRef.current,
        behavior: "smooth",
      });

      const release = () => {
        isSnappingRef.current = false;
        el.removeEventListener("scrollend", release);
      };
      el.addEventListener?.("scrollend", release);

      // fallback if scrollend not supported
      setTimeout(() => {
        isSnappingRef.current = false;
      }, 420);
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("resize", onResize);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="covet-root">
      {/* main horizontal track */}
      <div className="covet-track" ref={trackRef}>
        {data.map((spread) => (
          <Spread key={spread.id} {...spread} />
        ))}
      </div>

      {/* Optional little page indicator */}
      <PageDots count={data.length} containerRef={trackRef} />
    </div>
  );
}

function Spread(props) {
  const {
    layout,
    title,
    created,
    writer,
    poemLines,
    rightTextLines,
    leftTextLines,
    imageSrc,
    imageSrc2,
    imageAlt,
    accentColor,
  } = props;
 // NEW: title page (no poem)
  if (layout === "title-page") {
    return (
      <section className="covet-spread covet-spread--title-page">
        <div className="covet-inner covet-cover">
          <div className="covet-cover-text">
            <h1
              className="covet-title covet-title--cover"
              style={accentColor ? { color: accentColor } : undefined}
            >
              {title}
            </h1>
            <div className="covet-cover-meta">
              {created && <span className="covet-cover-created">{created}</span>}
              {writer && <span className="covet-cover-writer">{writer}</span>}
            </div>
          </div>

          <div className="covet-cover-images">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={imageAlt || `${title} cover`}
                className="covet-cover-image primary"
              />
            )}
            {imageSrc2 && (
              <img
                src={imageSrc2}
                alt={imageAlt || `${title} secondary`}
                className="covet-cover-image secondary"
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  // NEW: image-only layout
  if (layout === "image-only") {
    return (
      <section className="covet-spread covet-spread--image-only">
        <div className="covet-inner covet-image-only">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt || "Article image"}
              className="covet-image-only-img main"
            />
          )}
        
        </div>
      </section>
    );
  }

  // existing layouts below
  if (layout === "title-poem") {
    return (
      <section className="covet-spread covet-spread--title-poem">
        <div className="covet-inner">
          <h1
            className="covet-title"
            style={accentColor ? { color: accentColor } : undefined}
          >
            {title}
          </h1>
          <div className="covet-poem">
            {poemLines?.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (layout === "image-left-text-right") {
    return (
      <section className="covet-spread covet-spread--image-left">
        <div className="covet-inner covet-two-col">
          <div className="covet-col">
            <img src={imageSrc} alt={imageAlt} className="covet-image" />
          </div>
          <div className="covet-col covet-text-block">
            {rightTextLines?.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    );
  }

   if (layout === "text-only-r") {
   return (
      <section className="covet-spread covet-spread--text-left">
        <div className="covet-inner covet-two-col">
          <div className="covet-col covet-text-block">
            {leftTextLines?.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

        </div>
      </section>
    );
  }

  if (layout === "text-only-l") {
    return (
      <section className="covet-spread covet-spread--text-left">
        <div className="covet-inner covet-two-col">
          <div className="covet-col covet-text-block">
            {leftTextLines?.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        
        </div>
      </section>
    );
  }

  if (layout === "text-left-image-right") {
    return (
      <section className="covet-spread covet-spread--text-left">
        <div className="covet-inner covet-two-col">
          <div className="covet-col covet-text-block">
            {leftTextLines?.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="covet-col">
            <img src={imageSrc} alt={imageAlt} className="covet-image" />
          </div>
        </div>
      </section>
    );
  }

  // fallback
  return (
    <section className="covet-spread">
      <div className="covet-inner">
        {imageSrc && <img src={imageSrc} alt={imageAlt} className="covet-image" />}
      </div>
    </section>
  );
}

/**
 * Simple page dots that track scroll position (optional)
 */
function PageDots({ count, containerRef }) {
  const [active, setActive] = React.useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth || 1;
      const idx = Math.round(el.scrollLeft / w);
      setActive(idx);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  return (
    <div className="covet-dots">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={`covet-dot ${i === active ? "is-active" : ""}`}
          aria-label={`Go to page ${i + 1}`}
          onClick={() => {
            const el = containerRef.current;
            if (!el) return;
            const w = el.clientWidth;
            el.scrollTo({ left: i * w, behavior: "smooth" });
          }}
        />
      ))}
    </div>
  );
}
