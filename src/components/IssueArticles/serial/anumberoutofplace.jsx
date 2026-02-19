import React from "react";
const Matrixtron = "/fonts/matrixtron.ttf";

export default function Article() {
  const [isMobile, setIsMobile] = React.useState(false);

React.useEffect(() => {
  const style = document.createElement("style");
  style.textContent = `
      @font-face {
        font-family: "Matrixtron";
        src: url(${Matrixtron}) format('opentype');
      }
    `;
  document.head.appendChild(style);
  return () => {
    document.head.removeChild(style);
  };
}, []);


  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

const backgroundStyle = {
  backgroundImage:
    "url('https://raw.githubusercontent.com/indigomagazine/website_images/main/SERIAL%20PHOTOS/group%202/matrixbg.gif')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  overflow: "auto",
  position: "relative",
  minHeight: "100vh", 
  width: "100%",
  margin: 0,
  padding: 0,
};

  const leftImages = [
    "https://raw.githubusercontent.com/indigomagazine/website_images/main/SERIAL PHOTOS/group 2/REN_1351 copy.jpg",
    "https://raw.githubusercontent.com/indigomagazine/website_images/main/SERIAL PHOTOS/group 2/REN_1404 copy.jpg",
    "https://raw.githubusercontent.com/indigomagazine/website_images/main/SERIAL PHOTOS/group 2/REN_1535 copy.jpg",
  ];

  const rightImages = [
    "https://raw.githubusercontent.com/indigomagazine/website_images/main/SERIAL PHOTOS/group 2/REN_1545 copy.jpg",
    "https://raw.githubusercontent.com/indigomagazine/website_images/main/SERIAL PHOTOS/group 2/REN_1495 copy.jpg",
    "https://raw.githubusercontent.com/indigomagazine/website_images/main/SERIAL PHOTOS/group 2/REN_1380 copy.jpg",
  ];

  const allImages = [...leftImages, ...rightImages];

  return (
    <div style={backgroundStyle}>
      <div
        style={{
          position: "relative",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        {/* Left + Right floating images (desktop only) */}
        {!isMobile && (
          <>
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "300px",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "100px",
              }}
            >
              {leftImages.map((img, index) => (
                <div
                  key={`left-${index}`}
                  style={{
                    width: "280px",
                    height: "280px",
                    overflow: "hidden",
                    boxShadow: "0 0 20px rgba(0, 255, 0, 0.4)",
                    animation: `float ${3 + index}s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`,
                    opacity: 0.9,
                  }}
                >
                  <img
                    src={img}
                    alt={`Left ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                right: "0",
                top: "300px",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "100px",
              }}
            >
              {rightImages.map((img, index) => (
                <div
                  key={`right-${index}`}
                  style={{
                    width: "280px",
                    height: "280px",
                    overflow: "hidden",
                    boxShadow: "0 0 20px rgba(0, 255, 0, 0.4)",
                    animation: `float ${3 + index}s ease-in-out infinite`,
                    animationDelay: `${index * 0.7}s`,
                    opacity: 0.9,
                  }}
                >
                  <img
                    src={img}
                    alt={`Right ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: isMobile ? "1.5rem 0.5rem" : "3rem 1.5rem",
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Title */}
          <div
            style={{
              textAlign: "center",
              padding: isMobile ? "1rem" : "2rem",
              borderRadius: "0.5rem",
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? "1.8rem" : "2.8rem",
                fontWeight: "bold",
                color: "#4ade80",
                marginBottom: "1rem",
                fontFamily: "Matrixtron, monospace, sans-serif",
                letterSpacing: "0.1em",
                textShadow: "0 0 20px rgba(0, 255, 0, 0.8)",
                lineHeight: "1.2",
              }}
            >
              A NUMBER OUT OF PLACE
            </h1>
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.5rem",
                color: "#86efac",
                fontFamily: "monospace",
                textShadow: "0 0 15px rgba(0, 255, 0, 0.6)",
              }}
            >
              Written by: Nicole C.
            </p>
          </div>

          {/* Article Content with interleaved images (mobile) */}
        <article
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
            width: isMobile ? "100%" : "70%",
            maxWidth: "1000px",       
            padding: isMobile ? "1rem" : "2rem",  
          }}
        >
            <p
              style={{
                color: "#86efac",
                fontFamily: "monospace",
                fontSize: isMobile ? "0.95rem" : "1rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
              }}
            >
            We are constantly surveilled every moment we step outside <br></br>
            Every camera blinks like an eye that refuses to close <br></br>
            We live in codes and the government classifies us <br></br>
            </p>

            {isMobile && (
              <img
                src={allImages[0]}
                alt="Interleaved 1"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  margin: "1rem 0",
                  boxShadow: "0 0 15px rgba(0,255,0,0.4)",
                }}
              />
            )}

            <p
              style={{
                color: "#86efac",
                fontFamily: "monospace",
                fontSize: isMobile ? "0.95rem" : "1rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
              }}
            >
              Even those we try to confide in lets us slip quietly through the cracks <br></br>
              Rebellion hides behind the mask of normalcy<br></br>
            </p>

            {isMobile && (
              <img
                src={allImages[1]}
                alt="Interleaved 2"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  margin: "1rem 0",
                  boxShadow: "0 0 15px rgba(0,255,0,0.4)",
                }}
              />
            )}

            <p
              style={{
                color: "#86efac",
                fontFamily: "monospace",
                fontSize: isMobile ? "0.95rem" : "1rem",
                lineHeight: "1.8",
              }}
            >
            In binary, everything shifts so quickly through our fingers <br></br>
            Slipping away like data in a river of code <br></br>
            Secrets buried in a stream of 0’s and 1’s <br></br>
            We survive only if kept in silence <br></br>
            But silence is not weakness <br></br>
            It's the only language left unbroken <br></br>

            </p>

                        {isMobile && (
              <img
                src={allImages[2]}
                alt="Interleaved 2"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  margin: "1rem 0",
                  boxShadow: "0 0 15px rgba(0,255,0,0.4)",
                }}
              />
            )}


                        <p
              style={{
                color: "#86efac",
                fontFamily: "monospace",
                fontSize: isMobile ? "0.95rem" : "1rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
              }}
            >
              Yet our secrets spill like milk across the table <br></br>
              Are we just numbers out of place? <br></br>
              Digits too low to be considered worthy? <br></br>
              Are we nothing more than error messages? <br></br>
            </p>

                        {isMobile && (
              <img
                src={allImages[3]}
                alt="Interleaved 2"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  margin: "1rem 0",
                  boxShadow: "0 0 15px rgba(0,255,0,0.4)",
                }}
              />
            )}


                                   <p
              style={{
                color: "#86efac",
                fontFamily: "monospace",
                fontSize: isMobile ? "0.95rem" : "1rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
              }}
            >
              Every morning seems to be the same <br></br>
              We grow up learning to live the same way <br></br>
              Numbered, categorized, then reduced <br></br>
            </p>
                        {isMobile && (
              <img
                src={allImages[4]}
                alt="Interleaved 2"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  margin: "1rem 0",
                  boxShadow: "0 0 15px rgba(0,255,0,0.4)",
                }}
              />
            )}

                                               <p
              style={{
                color: "#86efac",
                fontFamily: "monospace",
                fontSize: isMobile ? "0.95rem" : "1rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
              }}
            >
            We are the secret the system cannot erase <br></br>
            A glitch that unsettles the machine <br></br>
            And maybe the most powerful and pure form of rebellion <br></br>
            </p>
                        {isMobile && (
              <img
                src={allImages[5]}
                alt="Interleaved 2"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  margin: "1rem 0",
                  boxShadow: "0 0 15px rgba(0,255,0,0.4)",
                }}
              />
            )}

          </article>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    </div>
  );
}
