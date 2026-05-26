import React, { useEffect, useState, useRef } from "react";
import "./unboxed.css";

const sections = [
  {
    id: "intro",
    items: [
      {
        type: "group",
        position: "center",

        children: [
          {
            type: "text",
            content: "Unboxed",
            className: "title-text",
          },

          {
            type: "text",
            content: "Written by Karishma Pilla",
            className: "subtitle-text",
          },
        ],
      },
    ],
  },

  {
    id: "section-2",
    items: [
      {
        type: "image",
        position: "left",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/doll-pose.jpg",
        stringLength: "short",
        orientation: "horizontal"
      },

      {
        type: "text",
        position: "center",
        content:
          "my joints have been freshly oiled\nsmoothly working with my plastic limbs\nas the clothes i hate are stuffed onto my skin\nbut i hold the pose until my joints crack\nbecause that is what they clap for.",
        className: "body-text",
      },

      {
        type: "image",
        position: "right",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/one-doll-1.jpg",
        stringLength: "long",
        orientation: "horizontal"
      },
    ],
  },

  {
    id: "section-3",
    items: [
      {
        type: "image",
        position: "left",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/hanging-clothes-2.jpg",
        stringLength: "long",
        orientation: "horizontal"
      },

      {
        type: "text",
        position: "center",
        content:
          "my lips twitch downwards\nbut the strings pull tight\nand i stitch my mouth back into a smile\nthe expression is etched into my face\npermanent lipstick stained on my lips\nand just like the forever makeup, i can’t\nerase the traitorous thoughts in my head:\nwhat if i just left?",
        className: "body-text",
      },

      {
        type: "image",
        position: "right",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/two-mirror-2.jpg",
        stringLength: "short",
        orientation: "horizontal"
      },
    ],
  },

  {
    id: "section-4",
    items: [
      {
        type: "image",
        position: "left",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/barbie-2.jpg",
        stringLength: "short",
        orientation: "vertical"
      },
      {
        type: "text",
        position: "center",
        content:
          "the strings attached to me\nare pulled in opposite directions\nas i bend and bow to every whim\nfarther than the hinges allow\ncreaking, cracking plastic,\nand i finally SNAP.",
        className: "body-text",
      },
      {
        type: "image",
        position: "right",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone.jpg",
        stringLength: "long",
        orientation: "horizontal"
      },

      
    ],
  },

  {
    id: "section-5",
    items: [
      {
        type: "image",
        position: "left",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/one-mirror-6.jpg",
        stringLength: "long",
        orientation: "horizontal"
      },
      {
        type: "text",
        position: "center",
        content:
          "the box is suffocating as i’m jammed back inside\ni’m not good enough for them, they don’t want me anymore\nbut i’ve had enough.\ni don’t need them.\ni yank my plastic limbs til the strings become taut\nand this time i pull, instead of being pulled\nand finally the strings, the cage, everything SNAPS.",
        className: "body-text",
      },
      {
        type: "image",
        position: "right",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/barbie-1.jpg",
        stringLength: "short",
        orientation: "vertical"
      },
    ],
  },

  {
    id: "section-6",
    items: [
      {
        type: "text",
        position: "left",
        content:
          "the box is easy enough to break out of.\nthe thin plastic is flimsy and i laugh at how\ni thought it was a unbreakable prison.\ni rip out the stitches holding my mouth in place\nand let out a laugh that rings with the\nfreedom of autonomy",
        className: "body-text",
        stringLength: "medium"
      },
      {
        type: "image",
        position: "right",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
        stringLength: "short",
        orientation: "vertical"
      },
    ],
  },

  {
    id: "final-photo",
    items: [
      {
        type: "image",
        position: "center",
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-hanging-dolls-5.jpg",
        hasString: false,
        orientation: "horizontal"
      }
    ]
  }
];

export default function Unboxed() {
  const refs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;

      refs.current.forEach((el, index) => {
        if (!el) return;

        const start = index * viewportH;
        const progress =
          (scrollY - start) / viewportH;

        let opacity;

        if (progress < 0) opacity = 0;
        else if (progress <= 0.7) opacity = 1;
        else if (progress <= 1)
          opacity =
            1 - (progress - 0.7) / 0.3;
        else opacity = 0;

        el.style.opacity = opacity;
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <div className="unboxed-root">
      <div className="unboxed-crossfade-container">
        {sections.map((section, index) => (
          <section
            key={section.id}
            ref={(el) =>
              (refs.current[index] = el)
            }
            className={`unboxed-section ${section.id === "intro" ? "intro-section" : ""}
            ${["section-2", "section-3", "section-4", "section-5"].includes(section.id)
                ? "centered-poem-section"
                : ""}
                ${section.id === "final-photo" ? "final-photo-section" : ""}
            `}
          >
            <div className="unboxed-content">
            {section.items?.map((item, i) => {
              /* image */
              if (item.type === "image") {
                return (
                  <div
                    key={i}
                    className={`unboxed-item ${item.position}`}
                  >
                    <div className="unboxed-hanging">
                      <div
                        className="unboxed-swing"
                        style={{
                          "--rotation":
                            `${item.rotate || 0}deg`,
                          animationDelay:
                            `${i * 0.4}s`,
                        }}
                      >
                        {item.hasString !== false && (
                          <div
                            className={`unboxed-string ${item.stringLength || "medium"
                              }`}
                          />
                        )}

                        <img
                          src={item.src}
                          alt=""
                          className={`unboxed-photo ${item.orientation}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              }

              /* group */
              if (item.type === "group") {
                return (
                  <div
                    key={i}
                    className={`unboxed-item ${item.position}`}
                  >
                    <div className="unboxed-group">
                      {item.children?.map(
                        (child, childIndex) => (
                          <p
                            key={childIndex}
                            className={`unboxed-text ${child.className}`}
                          >
                            {child.content}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                );
              }

              /* text */
              if (item.type === "text") {
                return (
                  <div
                    key={i}
                    className={`unboxed-item ${item.position}`}
                  >
                    <div className={`unboxed-text-panel ${item.className}`}>
                      <div className="lace-inner">
                        {item.content}
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </section>
      ))}
    </div>
    <div
    /* scroll behavior */
      style={{
          height: `${(sections.length - 1) * 100}vh`,
      }}
    />
  </div>
  );
}