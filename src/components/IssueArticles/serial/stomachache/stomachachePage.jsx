import React, { useEffect, useRef } from "react";
import "./stomachache.css";

import background from "../../../../../legacy/article photos/stomachache/background.jpg";
import firstsection from "../../../../../legacy/article photos/stomachache/firstsection.jpg";
import secondsection from "../../../../../legacy/article photos/stomachache/secondsection.jpg";
import image1 from "../../../../../legacy/article photos/stomachache/image1.JPG";
import image2 from "../../../../../legacy/article photos/stomachache/image2.JPG";
import image3 from "../../../../../legacy/article photos/stomachache/image3.JPG";
import image4 from "../../../../../legacy/article photos/stomachache/image4.JPG";
import image5 from "../../../../../legacy/article photos/stomachache/image5.JPG";
import image6 from "../../../../../legacy/article photos/stomachache/image6.JPG";


export default function StomachachePage() {
  const sections = [
    {
      layout: "center",
      texts: [
        {
          content: `Stomach Ache`,
          className: "title-text",
        },
        {
          content: `Written by Sanhita Perkari`,
          className: "subtitle-text",
        }
      ]
    },
    {
      layout: "left",
      img: image1,
      bg: firstsection,
      texts: [
        {
          content: `I’m fighting the fatigue of feeling full\n\nThe sunlight at the dining table has melted away\nAnd I’m left licking the last of my fudge\nas it pours itself slowly into the creases of my hands`,
          className: "tilted",
        },
      ],
      imgClass: "img-up",
    },
    {
      layout: "right",
      img: image2,
      bg: firstsection,
      texts: [
        {
          content: `Everything that has a sweet quality seems to seep itself into me\n\nIt sinks past my stomach\nIt invades my mind, spoils my composure,\nand dominates my every desire`,
          className: "tiltedother",
        },
      ],
      imgClass: "img-square",
    },
    {
      layout: "center",
      bg: firstsection,
      img: "",
      texts: [
        {
          content: `As my stomach dances around temptation\n\nI yearn for another taste\nI grab another bite`,
          className: "tilted",
        },
      ]
    },
    {
      layout: "center",
      img: image3,
      bg: firstsection,
      imgClass: "img-up",
      texts: []
    },
    {
      layout: "center",
      img: "",
      bg: firstsection,
      texts: [
        {
          content: `Sweetness dominates and secretes the salt beneath my skin\n\nAnd the more I touch, the more I crave`,
          className: "tiltedother",
        },
      ],
      imgClass: "img-square",
    },
    {
      layout: "left",
      img: image4,
      bg: secondsection,
      texts: [
        {
          content: `More, however, suddenly reaches its limit\n\nWhen the sweetness I swallowed turns to sludge in my stomach\nThe pulp thrashes, then weakens, and I start to sit still`,
          className: "tilted",
        },
      ],
      imgClass: "img-up",
    },
    {
      layout: "right",
      img: image5,
      bg: secondsection,
      texts: [
        {
          content: `I feel the pressure in my lungs expand, making room for what’s to come\n\nI crouch over, knees pressed into the floor, expecting to see all the sweetness I was once compelled by`,
          className: "tiltedother",
        },
      ],
      imgClass: "img-square",
    },
    {
      layout: "center",
      img: "",
      bg: secondsection,
      texts: [
        {
          content: `Holding my stomach, I struggle to remember its spoiled charm and fading sweetness`,
          className: "tilted",
        },
      ],
      imgClass: "img-medium",
    },
    {
      layout: "center",
      img: image6,
      bg: secondsection,
      imgClass: "img-up",
      texts: []
    },
    {
      layout: "center",
      texts: [
        {
          content: `I stare at the storm pooling onto the wooden floor and finally surrender to my stomachache`,
          className: "tiltedother",
        },
      ],
    },
  ];

  const refs = useRef([]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      refs.current.forEach((el) => {
        if (el) el.style.opacity = 1;
      });
      return;
    }
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;

      refs.current.forEach((el, index) => {
        const start = index * viewportH;
        const progress = (scrollY - start) / viewportH;

        let opacity;
        if (progress < 0) opacity = 0;
        else if (progress <= 0.7) opacity = 1;
        else if (progress <= 1) opacity = 1 - (progress - 0.7) / 0.3;
        else opacity = 0;

        el.style.opacity = opacity;

        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const darkness = Math.min(0.35 + scrollY / totalHeight * 0.4, 0.75);
        document.documentElement.style.setProperty("--darkness", darkness);

      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="crossfade-container">
        {sections.map((section, i) => (
          <div
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className={`crossfade-section ${section.layout}`}
            style={{
              backgroundImage: section.bg
                ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.65)), url(${section.bg})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {section.img && (
              <img
                src={section.img}
                className={`section-image ${section.imgClass} float-image`}
                alt=""
              />
            )}
            {section.texts?.map((t, j) => (
              <p
                key={j}
                className={`section-text ${t.className} float-text ${t.side || ""}`}
                style={{}}
              >
                {t.content}
              </p>
            ))}
          </div>
        ))}
      </div>
      {window.innerWidth > 768 && (
        <div style={{ height: `${sections.length * 100}vh` }} />
      )}
    </div>
  );
}
