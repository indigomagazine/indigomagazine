import React from "react";

const IntrapersonalFont = "/fonts/Intrapersonal.otf";
const SinoretaFont = "/fonts/Sinoreta.otf";

export default function Victorian() {
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @font-face { font-family: "Intrapersonal"; src: url(${IntrapersonalFont}) format('opentype'); }
      @font-face { font-family: "Sinoreta"; src: url(${SinoretaFont}) format('opentype'); }
      body { margin: 0; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const card = "/assets/articles/tarot_back.jpg";
  const frontcards = [
    "/assets/articles/Emma_Tarot_Final.jpg",
    "/assets/articles/Arthur_Tarot_Final.jpg",
    "/assets/articles/George_Tarot.jpg",
    "/assets/articles/William%20Tarot%20Card.jpg",
  ];
  // images  for text
  const interpretImages = [
    "/assets/articles/Emma_Final.jpg", // chunk 1: Emma portrait
    "/assets/articles/Emma_Tarot_Final.jpg", // chunk 2: Emma tarot
    "/assets/articles/Dreamy Haze_Final.jpg", // chunk 3: Dreamy Haze portrait
    "/assets/articles/Arthur_Tarot_Final.jpg", // chunk 4: Arthur tarot
    "/assets/articles/Joseph2.jpg", // chunk 5: Joseph portrait
    "/assets/articles/George_Tarot.jpg", // chunk 6: George tarot
    "/assets/articles/William%20Tarot%20Card.jpg", // chunk 7: William tarot
  ];
  // SVG noise grain
  const grainSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
      <filter id='noise'>
        <feTurbulence baseFrequency='0.6' numOctaves='3' stitchTiles='stitch' />
        <feColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0' />
      </filter>
      <rect width='100%' height='100%' filter='url(#noise)' opacity='1' />
    </svg>`;
  const grainDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(grainSvg)}`;
  const [frontFlipped, setFrontFlipped] = React.useState(false);
  // track which fronts are loaded
  const [frontLoaded, setFrontLoaded] = React.useState(() =>
    frontcards.map(() => false)
  );

  // preload fronts and set loaded flags
  React.useEffect(() => {
    frontcards.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setFrontLoaded((prev) => {
          const copy = [...prev];
          copy[idx] = true;
          return copy;
        });
      };
      img.onerror = () => console.warn("Failed to preload tarot front:", src);
    });
  }, []);


  //card states
  const [activeCard, setActiveCard] = React.useState(null);
  const [flipped, setFlipped] = React.useState(false);
  const [revealedCards, setRevealedCards] = React.useState(() =>
    frontcards.map(() => false)
  );
  const [interpretMode, setInterpretMode] = React.useState(false);
  const [interpretHover, setInterpretHover] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const frontFlipTimerRef = React.useRef(null);
  const resetTimeoutRef = React.useRef(null);

  // cleanup timers on unmount
  React.useEffect(() => {
    return () => {
      if (frontFlipTimerRef.current) clearTimeout(frontFlipTimerRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const scheduleClose = (index) => {
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => {
      setRevealedCards((prev) => {
        const copy = [...prev];
        copy[index] = true;
        return copy;
      });
      setActiveCard(null);
      setFlipped(false);
      setFrontFlipped(false);
      document.body.style.pointerEvents = "auto";
    }, 2000);
  };

  // derived clickable flag and timeout refs
  const clickable = Boolean(expanded) && activeCard === null;

  const handleCardClick = (i) => {
    if (!expanded) return setExpanded(true);

    if (revealedCards[i]) return; // already revealed

    console.log("open overlay for card", i, frontcards[i]);
    document.body.style.pointerEvents = "none";
    setActiveCard(i);
    setFrontFlipped(false);
    // back visibility before flip
    setFlipped(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setFlipped(true)));

    // schedule front flip after image load
    if (frontFlipTimerRef.current) clearTimeout(frontFlipTimerRef.current);
    frontFlipTimerRef.current = setTimeout(() => {
      if (frontLoaded[i]) {
        setFrontFlipped(true);
        scheduleClose(i);
        return;
      }
      const img = new Image();
      img.src = frontcards[i];
      img.onload = () => {
        setFrontFlipped(true);
        scheduleClose(i);
      };
      img.onerror = () => {
        console.warn("Front failed to load for", frontcards[i]);
        setFrontFlipped(true);
        scheduleClose(i);
      };
    }, 180);
  };


  const subtitle = expanded
    ? "Some truths reveal themselves only when uncovered."
    : "Tap the cards to get started";

  // once every card has been revealed, replace the subtitle with a button
  const allRevealed = revealedCards.every(Boolean);

  const cards = Array.from({ length: 4 });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        background:
          "linear-gradient(180deg, #fff1f3 0%, #ffe4e6 50%, #ffdde0 100%)",
        overflow: "hidden",
      }}
    >
      <header style={{ paddingTop: "6vh", textAlign: "center" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "Intrapersonal, serif",
            fontSize: "clamp(36px, 6vw, 150px)",
            color: "#000",
            opacity: 0.7
          }}
        >
          {interpretMode ? "Limerence" : "Reveal Your Fortune"}
        </h1>

        {allRevealed && !interpretMode ? (
          <button
            onMouseEnter={() => setInterpretHover(true)}
            onMouseLeave={() => setInterpretHover(false)}
            onClick={() => {
              console.log("Interpret reading");
              setInterpretMode(true);
              setExpanded(false);
            }}
            style={{
              marginTop: "0.6rem",
              fontFamily: "Sinoreta, serif",
              fontSize: "clamp(18px, 2.2vw, 28px)",
              color: "#ffffff",
              background: interpretHover ? "#ff8b8b" : "#FFD2D2",
              border: "none",
              padding: "0.5rem 1.2rem",
              borderRadius: "6px",
              boxShadow: interpretHover ? "0 6px 12px rgba(0,0,0,0.28)" : "0 6px 12px rgba(0,0,0,0.18)",
              cursor: "pointer",
              opacity: allRevealed ? 1 : 0,
              transition: "opacity 220ms ease, transform 180ms ease, box-shadow 180ms ease, background 160ms ease",
              transform: `${allRevealed ? "translateY(0)" : "translateY(6px)"}${interpretHover ? " translateY(-4px) scale(1.02)" : ""}`,
            }}
          >
            Interpret Reading
          </button>
        ) : !interpretMode ? (
          <p
            style={{
              marginTop: "0.6rem",
              fontFamily: "Sinoreta, serif",
              fontSize: "clamp(20px, 2.4vw, 32px)",
              color: "#111",
              cursor: "pointer",
              opacity: 0.7,
            }}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {subtitle}
          </p>
        ) : null}
      </header>

      <main
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "4vh",
        }}
      >
        {interpretMode ? (//taort and picture cards and writing
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              padding: "6vh 3vw",
              display: "flex",
              flexDirection: "column",
              gap: "3.5rem",
            }}
          >


            {/* writing */}
            {(() => {
              const interpretChunks = [
                [
                  "Emma was lonely. A type of loneliness that sat dimly alongside her brightest moments. A faint hum in the undertone of the melody of her life story. Emma wanted to share pieces of herself with someone that treats them with reverence, she wanted to wake up with someone that chooses her everyday– she wanted to choose someone. ",
                  "William noticed that. For all that he admired his daughter, for all the pride he felt in raising her to be a spitting image of his past wife, he could see the yearn in her gaze when she noticed couples across the room. ",
                  "So he brought her to the annual ball. A fancy ballroom filled with upper class people that flaunted their accomplishments to earn a place in society. But really it was an undercover mission to find a suitor for his daughter.",
                  "“Father, that’s killing the mood.” Emma said as they walked up the grand staircase to the venue. The cold air bit at her skin, making her cheeks rosier than her dresser had intended. William looked at his daughter, eyes twinkling with mischeif. “Can’t I be a good father without getting backlash?” ",
                  "While her tone was sharp, a soft smile formed on Emma’s face. “I don’t know if making a social event a secret undercover mission constitutes as good.” He put his hands up in surrender. “You know your old man, if it’s not fun it’s not interesting.” Emma rolled her eyes, her smile didn’t falter. She couldn’t deny the glimmer of excitement that manifested when she stepped into the ballroom. "
                ],
                [
                  "The room was huge. Flowers and ribbons elegantly adorned the staircase shaped the room, leading to a smaller but extravagant floor. Soft lights and buzzing chatter made the atmosphere intimate and charged. Women were unique through their clothing. Having stunning colors, multiple layers, different silhouettes, as if they were portraying their identity through fabric. Men differed in their hair and suit adornments. Some had their hair slicked back with gel and shiny buttons on their coats, while others had untamed hair and delicately embroidered cuffs. They conveyed status and personality through little details.",
                  "The scene stole Emma’s breath. Her presence shifted a tiny part of the ballroom– people noticed her stepping inside their world. A couple introduced themselves as a business partner of William’s. Before she knew it, Emma was swept away into the waves of the annual ball."

                ],
                [
                  "A lot of people told Arthur that he was patient, calming, steady, that he would be the person they would go to if something went wrong.",
                  "He never knew how people decided that. Arthur didn’t feel steady. He didn’t believe that he had everything figured out. His father was doctor, and since a young age he held Arthur to a high standard in everything that he did. That made Arthur in to who he is today– and some of those parts he’s grateful for– but that also means he takes the societal expectation of marrying someone seriously.",
                  "Not marrying would bring suspicion to his family name, and he wants to honor his parents. Though, his fidelity doesn’t help the anxiety that closes his throat when he thinks about the subject. ",
                  "So when George, his friend, nudges his shoulder, pointing out a woman across the ballroom, Arthur doesn’t pay much attention to it– or at least he thought he didn’t",
                  "“That’s Emma Davies over there.” George said, flashing Arthur a big smile. “She’s supposed to be in line to take over her family’s business.” The woman he gestured at was smiling politely at a couple that talked to her. Arthur could faintly hear her voice, sharp and clipped but passionate. ",
                  "He didn’t realize he was staring until George draped an arm over his shoulder. “So is my match making skills made in heaven or what?” He said smugly, his smile turning into something almost devilish. ",
                  "Arthur sighed, the one that George learned to recognize as the I’m annoyed that you called me out but I like that you care sigh. But Arthur couldn’t deny the spark of intrigue that manifested when he had laid his eyes on her. ",
                  "Before he could respond to George, a colleague of his father approached him to advertise his education program. And with that his momentary feelings were forgotten."

                ],
                [
                  "Emma flowed in and out of conversations across the ballroom. She quickly understood that people of the same status clustered together. She found herself at the edge the room, gravitating towards a table filled with complementary pastries. Emma would never admit it, but ever since she noticed the table she had her eyes on this particular chocolate cake. ",
                  "To her demise, she saw a hand take the sweet that she ate with her eyes. It was a man. His hair was slightly messy but refined in its shape. Delicate embroidery adorned the cuffs and pockets of his suit. ",
                  "Arthur’s hair on the back of his neck stood up when he grabbed a chocolate cake from a table full of pastries. He instinctively looked around, his eyes locking with a woman’s. Emma Davies. ",
                  "His heart skipped a beat. It was the same woman that captivated him across the ballroom. She was softer than he expected, her eyes unintentionally shifting between his face and the cake in his hand. He swallowed, taking a second to compose himself.",
                ],
                [
                  "“Do you want it?” Arthur asked, extending the cake to her as if he was expecting her to say yes.",
                  "Emma snapped out of the daze she was in. All the talking she did with the people around her seemed to have affected her more than she thought. A flustered smile formed on her face. She softly laughed. “Was it that obvious?” Arthur didn’t reply, but he smiled.",
                  "She took the cake out of his hands, grabbing a small spoon from the table and taking a bite. Emma visibly relaxed, the sweet tasted exactly as extravagant as she expected it to be. ",
                  "Arthur couldn’t help but think that she resembled a puppy.",
                  "“So, you’re Emma Davies?” He asked, his tone inquisitive and warm. Emma looked up. “Am I really that popular around here?” She replied, a spark of mischief lighting in her eyes. Arthur internally stopped, but before he could think about how to respond, Emma reached out her hand. “I am. It’s nice to meet you. You are…?”"

                ],
                [
                  "He gently took her hand. “Arthur, Arthur Astor.” Emma softly smiled. She noticed how his cheeks were slightly flushed. “So what are you doing here, at an event like this Arthur?” Emma expected a rosy response that covered his real intentions.",
                  "“That’s a great question.” He said with a smile. “I guess you could say family. I’ve got a standard to uphold and I want to do right to my parents.”",
                  "The way he spoke was genuine. His eyes held depth, one that conveyed maturity beyond his years. But underneath that was a softness that drew her in. Emma didn’t realize she was staring until Arthur spoke.",
                  "“What about you?” She pressed her heels into the ground, taking a second to compose herself. “Mainly to network for taking over my family business.” She paused, debating if she should tell him why she was really here. Emma was surprised at the lack of resistance that usually dictated her words. She stared into the crowd. “But also to find a husband, my father’s idea.” Emma gestured to William across the room."

                ],
                [
                  "Arthur followed her gaze, seeing Emma’s father. He was a confident man, he could tell that much from a distance. “Do you want to marry?” Arthur asked thoughtfully.",
                  "Her heart skipped a beat. She wasn’t expecting him to put genuine thought into what she had said. ",
                  "“I do.” Emma replied, her tone softer than before. She didn’t trust herself to look at Arthur directly. “It’s actually something I’ve wanted for awhile…”",
                  "“But?” Arthur gently asked. He noticed how her face was slightly flushed.",
                  "“But I was doubting if I’d find the right person or not.” She said, looking back at him. Arthur felt his heartbeat in his ears. ",
                  "In that moment, something changed between Emma and Arthur. The air around them became quietly charged. The exchange was interrupted, and both of them were pulled apart by their respective responsibilities. But they stole glances at each other throughout the rest of the event. ",
                  "William and George noticed, both of them feeling a satisfaction that comes with seeing someone you love flourish. Something delicate but inevitable was forming, and they had the honor of seeing it happen.",

                ]

              ];

              return interpretChunks.map((paraArray, i) => {
                const flipped = i % 2 === 1; // odd => image left, text right
                const imageSrc = interpretImages[i % interpretImages.length];
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.2rem",
                      rotate: flipped ? "2deg" : "-2deg",
                    }}
                  >
                    {!flipped && (
                      <div style={{ flex: 1, textAlign: "left" }}>
                        {paraArray.map((p, pi) => (
                          <p
                            key={pi}
                            style={{
                              margin: "0 0 0.8rem 0",
                              fontFamily: "Sinoreta, serif",
                              fontSize: "clamp(18px, 2.2vw, 22px)",
                              color: "#111",
                              lineHeight: 1.5,
                              opacity: 0.7
                            }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}

                    <div style={{ width: "clamp(120px, 26vw, 300px)", flexShrink: 0 }}>
                      <img
                        src={imageSrc}
                        alt="illustration"
                        style={{ width: "100%", height: "auto", borderRadius: 0 }}
                      />
                    </div>

                    {flipped && (
                      <div style={{ flex: 1, textAlign: "right" }}>
                        {paraArray.map((p, pi) => (
                          <p
                            key={pi}
                            style={{
                              margin: "0 0 0.8rem 0",
                              fontFamily: "Sinoreta, serif",
                              fontSize: "clamp(18px, 2.2vw, 22px)",
                              color: "#111",
                              lineHeight: 1.5,
                              opacity: 0.7
                            }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              });
            })()}

            {/* <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button
                onClick={() => setInterpretMode(false)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(0,0,0,0.12)",
                  padding: "0.4rem 0.8rem",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Back
              </button> */}
            {/* </div> */}
          </div>
        ) : (

          <div
            className="victorian-cards-row"
            style={{
              padding: "6vh 3vw",
              position: "relative",
              minHeight: "60vh",
              width: "100%",
              maxWidth: "900px",
              cursor: "pointer",
            }}
          >
            {cards.map((_, i) => {
              const center = (cards.length - 1) / 2;

              // fan
              const fanOffset = (i - center) * 8 + "vw";
              const fanRotate = (i - center) * 8;

              // spread
              const spreadOffset = (i - center) * 25 + "vw";
              const spreadRotate = 0;

              return (
                <img
                  key={i}
                  src={revealedCards[i] ? frontcards[i] : card}
                  alt="tarot"
                  onClick={() => {
                    if (!expanded) {
                      setExpanded(true); // first click to spred
                      return;
                    }
                    // indiv card click
                    handleCardClick(i);
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: expanded ? "50%" : "auto",
                    bottom: expanded ? "auto" : 0,
                    width: expanded ? "clamp(160px, 28vw, 260px)" : "clamp(140px, 24vw, 220px)",
                    height: "auto",
                    objectFit: "cover",
                    boxShadow: hoveredIndex === i && !revealedCards[i] ? "0 18px 36px rgba(0,0,0,0.28)" : "0 10px 20px rgba(0,0,0,0.2)",
                    transform: `
            translate(-50%, ${expanded ? "-50%" : "0"})
            translateX(${expanded ? spreadOffset : fanOffset})
            rotate(${expanded ? spreadRotate : fanRotate}deg)
            ${hoveredIndex === i && !revealedCards[i] ? " scale(1.06) translateY(-6px)" : ""}
        `,
                    transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    zIndex: i,
                    cursor: !revealedCards[i] ? "pointer" : "default",
                  }}
                />
              );
            })}

          </div>
        )}
        {activeCard !== null && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              if (frontFlipTimerRef.current) clearTimeout(frontFlipTimerRef.current);
              if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
              setActiveCard(null);
              setFlipped(false);
              setFrontFlipped(false);
            }}
          >
            <div
              style={{
                width: "clamp(160px, 48vw, 420px)",
                height: "clamp(220px, 72vw, 620px)",
                perspective: "1000px",
                position: "relative",
                zIndex: 11, // ensure above overlay
              }}
            >
              {/* BACK CARD */}
              <img
                src={card}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  transform: flipped ? "rotateY(90deg)" : "rotateY(0deg)",
                  transition: "transform 0.35s ease-in-out",
                  borderRadius: "8px",
                }}
              />
              {/* FRONT CARD */}
              <img
                src={frontcards[activeCard]}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  transform: frontFlipped ? "rotateY(0deg)" : "rotateY(-90deg)",
                  transition: "transform 0.35s ease-in-out 0.02s",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        )}
      </main>
      {/* grain overlayy! */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `url("${grainDataUrl}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          mixBlendMode: "multiply",
          opacity: 0.4,
          zIndex: 9999,
        }}
      />
    </div>
  );

}
