import React from "react";

const IntrapersonalFont = "/fonts/Intrapersonal.otf";
const SinoretaFont = "/fonts/Sinoreta.otf";

export default function IloveShoppingArticle() {
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: "Intrapersonal";
        src: url(${IntrapersonalFont}) format('opentype');
      }
      @font-face {
        font-family: "Sinoreta";
        src: url(${SinoretaFont}) format('opentype');
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }

      /* ✅ Responsive Fix for Title + Subtitle Overlap */
      @media (max-width: 768px) {
        .title-container svg text {
          font-size: 22px !important;
        }

        .title-container p {
          margin-top: -1.5rem !important;
          font-size: 0.9rem !important;
        }
      }

      @media (max-width: 480px) {
        .title-container svg text {
          font-size: 18px !important;
        }

        .title-container p {
          margin-top: -1rem !important;
          font-size: 0.8rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Spill images
  const cerealImages = [
    "https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/BF5T7721.jpg",
    "https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/BF5T7618.jpg",
    "https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/BF5T7672.jpg",
    "https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/BF5T7640.jpg",
    "https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/BF5T7600.jpg",
    "https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/BF5T7702.jpg",
  ];

  // Positions of scattered images
  const randomPositions = [
    { top: "5%", left: "8%", rotate: "-15deg", size: "clamp(180px, 15vw, 230px)", duration: "8s" },
    { top: "35%", right: "1%", rotate: "20deg", size: "clamp(190px, 16vw, 240px)", duration: "10s" },
    { top: "70%", left: "8%", rotate: "30deg", size: "clamp(180px, 15vw, 230px)", duration: "9s" },
    { top: "70%", right: "8%", rotate: "-25deg", size: "clamp(180px, 16vw, 240px)", duration: "11s" },
    { top: "35%", left: "1%", rotate: "10deg", size: "clamp(190px, 15vw, 240px)", duration: "12s" },
    { top: "5%", right: "8%", rotate: "-20deg", size: "clamp(190px, 16vw, 230px)", duration: "10s" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        backgroundColor: "#fafafa",
        backgroundImage:
          'url("https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/milksplash.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        cursor:
          'url("https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/daintyspoon-removebg-preview%20(1).png") 16 16, auto',
      }}
    >
      {/* Floating cereal spills */}
      {randomPositions.map((pos, i) => (
        <img
          key={i}
          src={cerealImages[i % cerealImages.length]}
          alt="Cereal spill"
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            width: pos.size,
            height: pos.size,
            objectFit: "cover",
            transform: `rotate(${pos.rotate})`,
            opacity: 0.9,
            zIndex: 1,
            pointerEvents: "none",
            animation: `float ${pos.duration} ease-in-out infinite, fadeIn 1s ease-out`,
          }}
        />
      ))}

      {/* Plate + text */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          aspectRatio: "1/1",
          position: "relative",
          zIndex: 2,
          animation: "fadeIn 1.2s ease-out",
        }}
      >
        {/* Plate */}
        <img
          src="https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/group1bg.png" loading="lazy"
          alt="White plate"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />

        {/* Curved title */}
        <div
          className="title-container"
          style={{
            position: "absolute",
            top: "13%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            width: "100%",
            color: "#333",
          }}
        >
          <svg
            viewBox="0 0 500 100"
            style={{ width: "100%", height: "auto", overflow: "visible" }}
          >
            <defs>
              <path id="curve" d="M 50,80 Q 250,10 450,80" fill="transparent" />
            </defs>
            <text
              style={{
                fontSize: "clamp(24px, 4vw, 40px)",
                fontWeight: "bold",
                fill: "#333",
                fontFamily: "Intrapersonal, sans-serif",
              }}
            >
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                I Love Shopping
              </textPath>
            </text>
          </svg>
          <p
            style={{
              marginTop: "-3.5rem",
              fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
              fontFamily: "Sinoreta, Georgia, serif",
              color: "#555",
              letterSpacing: "0.05em",
            }}
          >
            Written by: Zayeed A.
          </p>
        </div>

        {/* Article text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "51%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "35%",
            color: "#333",
          }}
        >
          <p
            style={{
              fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
              lineHeight: 1.3,
              margin: 0,
              fontFamily: "Sinoreta, sans-serif",
            }}
          >
            i like cereal when i like eating at all. <br />
            i like little pieces and i like eating until there is none. <br />
            i like milky white water, i like crumbs coming undone. <br />
            spoons like size{" "}
            <span style={{ fontFamily: "Times New Roman, serif" }}>0</span>'s i
            like silver spoon fun. <br />
            i like consuming and eating and shopping and fucking like no one
            else. <br />
            liking is a lifestyle, love is… <br />
          </p>
        </div>
      </div>
    </div>
  );
}
