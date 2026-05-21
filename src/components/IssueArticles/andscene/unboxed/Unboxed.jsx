import React, { useEffect, useRef } from "react";
import "./unboxed.css";

const sections = [
  {
    id: "intro",
    layout: "center",

    texts: [
      {
        content: "Unboxed",
        className: "title-text",
      },
      {
        content: "Written by Karishma Pilla",
        className: "subtitle-text",
      },
    ],
  },

  {
    id: "section-2",
    layout: "left",

    texts: [
      {
        content:
          "my joints have been freshly oiled\nsmoothly working with my plastic limbs\nas the clothes i hate are stuffed onto my skin\nbut i hold the pose until my joints crack\nbecause that is what they clap for.",
        className: "body-text",
      },
    ],

    images: [
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
      },
    ],
  },

  {
    id: "section-3",
    layout: "right",

    texts: [
      {
        content: "my lips twitch downwards\nbut the strings pull tight\nand i stitch my mouth back into a smile\nthe expression is etched into my face\npermanent lipstick stained on my lips\nand just like the forever makeup, i can’t\nerase the traitorous thoughts in my head:\nwhat if i just left?",
        className: "body-text",
      },
    ],

    images: [
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
      },
    ],
  },

  {
    id: "section-4",
    layout: "right",

    texts: [
      {
        content: "the strings attached to me\nare pulled in opposite directions\nas i bend and bow to every whim\nfarther than the hinges allow\ncreaking, cracking plastic,\nand i finally SNAP.\n",
        className: "body-text",
      },
    ],

    images: [
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
      },
    ],
  },

  {
    id: "section-5",
    layout: "left",

    texts: [
      {
        content: "the box is suffocating as i’m jammed back inside\ni’m not good enough for them, they don’t want me anymore\nbut i’ve had enough.\ni don’t need them.\ni yank my plastic limbs til the strings become taut\nand this time i pull, instead of being pulled\nand finally the strings, the cage, everything SNAPS.\n",
        className: "body-text",
      },
    ],

    images: [
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
      },
    ],
  },

  {
    id: "section-6",
    layout: "left",

    texts: [
      {
        content: "the box is easy enough to break out of.\nthe thin plastic is flimsy and i laugh at how\ni thought it was a unbreakable prison.\ni rip out the stitches holding my mouth in place\nand let out a laugh that rings with the\nfreedom of autonomy\n",
        className: "body-text",
      },
    ],

    images: [
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
      },
    ],
  },
];

export default function Unboxed() {
  const trackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${scrollY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="unboxed-root">
        <div className="unboxed-track" ref={trackRef}>
          {sections.map((section) => (
            <section
              key={section.id}
              className={`unboxed-section ${section.layout}`}
            >
              {/* IMAGE GROUP */}
              <div className="unboxed-images">
                {section.images?.map((img, i) => (
                  <div key={i} className="unboxed-hanging">
                    <div
                      className="unboxed-swing"
                      style={{
                        "--rotation": `${img.rotate || 0}deg`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      <div className="unboxed-string" />

                      <img
                        src={img.src}
                        alt=""
                        className="unboxed-photo"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* TEXT */}
              <div className="unboxed-text-wrapper">
                {section.texts?.map((text, i) => (
                  <p
                    key={i}
                    className={`unboxed-text ${text.className}`}
                  >
                    {text.content}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* scroll space */}
      <div
        style={{
          height: `${sections.length * 100}vw`,
        }}
      />
    </>
  );
}