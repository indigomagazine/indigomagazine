import React from "react";
import "./unboxed.css";

const sections = [
  {
    id: "intro",
    images: [
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
        top: "12%",
        left: "8%",
        rotate: -6,
        width: "260px",
        stringLength: "90px",
      },
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
        top: "38%",
        right: "10%",
        rotate: 5,
        width: "240px",
        stringLength: "70px",
      },
    ],
  },

  {
    id: "section-2",
    images: [
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
        top: "15%",
        left: "20%",
        rotate: -4,
        width: "220px",
        stringLength: "80px",
      },
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
        top: "45%",
        right: "15%",
        rotate: 7,
        width: "260px",
        stringLength: "100px",
      },
    ],
  },

  {
    id: "section-3",
    images: [
      {
        src: "https://cdn.indigomagazinetx.com/articlephotos/andscene/unboxed/everyone-sitting-1.jpg",
        top: "20%",
        left: "5%",
        rotate: -8,
        width: "250px",
        stringLength: "90px",
      },
    ],
  },
];

export default function Unboxed() {
  return (
    <div className="unboxed-root">
      {sections.map((section) => (
        <section key={section.id} className="unboxed-section">
          {section.images.map((img, i) => (
            <div
              key={i}
              className="unboxed-hanging"
              style={{
                top: img.top,
                left: img.left,
                right: img.right,
                transform: `rotate(${img.rotate}deg)`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${5 + i}s`,
              }}
            >
              <div
                className="unboxed-string"
                style={{
                  height: img.stringLength,
                }}
              />

              <img
                src={img.src}
                alt=""
                className="unboxed-photo"
                style={{
                  width: img.width,
                }}
              />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}