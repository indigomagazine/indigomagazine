 import { useState, useEffect, useRef, useCallback } from "react";

const BG_IMAGE     = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/AndScene2.png"
const BUNNY_CURSOR = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/bunnycursor.png"

const TRAIL_LENGTH = 15; // number of ghost bunnies

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IM+Fell+English:ital@0;1&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{cursor:none!important;background:#d6cfc4;}

  @keyframes fadeRise{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
  @keyframes shaftHop{
    0%  {transform:translateX(-50%) translateY(0px)  rotate(0deg);opacity:1}
    30% {transform:translateX(-50%) translateY(14px) rotate(-6deg)}
    60% {transform:translateX(-50%) translateY(30px) rotate(4deg)}
    85% {transform:translateX(-50%) translateY(42px) rotate(0deg);opacity:0.2}
    86% {transform:translateX(-50%) translateY(0px)  rotate(0deg);opacity:0}
    100%{transform:translateX(-50%) translateY(0px)  rotate(0deg);opacity:1}
  }
  @keyframes arrowFloat{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(8px);opacity:1}}
  @keyframes knockAnim{0%,100%{opacity:.15;transform:scaleY(.3)}50%{opacity:.85;transform:scaleY(1)}}
  @keyframes fallLeaf{0%{transform:translateY(-30px) rotate(0deg);opacity:0}8%{opacity:.55}92%{opacity:.25}100%{transform:translateY(105vh) rotate(540deg);opacity:0}}
  @keyframes tunnelFly{0%{transform:scale(.2);opacity:.9}100%{transform:scale(4);opacity:0}}
  @keyframes articleFadeIn{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}

  .knock-bar{width:3px;border-radius:2px;animation:knockAnim var(--spd,1.6s) ease-in-out infinite;background:linear-gradient(to top,#c9a96e,transparent);}
`;

/* ─── Multiplying Bunny Cursor with trail ─── */
function BunnyCursor({ positions }) {
  return (
    <>
      {positions.map((pos, i) => {
        const isHead = i === positions.length - 1;
        // older trails are smaller and more transparent
        const age    = i / (positions.length - 1);         // 0=oldest 1=newest
        const opacity = isHead ? 1 : age * 0.55;
        const scale   = isHead ? 1 : 0.55 + age * 0.38;
        const size    = 44 * scale;
        // mix-blend-mode difference gives a cool invert effect on dark bg
        return (
          <div
            key={i}
            style={{
              position:      "fixed",
              left:          pos.x,
              top:           pos.y,
              width:         size,
              height:        size,
              pointerEvents: "none",
              zIndex:        9999,
              transform:     `translate(-50%, -50%)`,
              opacity,
              transition:    isHead ? "none" : "opacity .05s",
              filter:        isHead
                ? "invert(1) drop-shadow(0 0 6px rgba(255,255,255,.5))"
                : `invert(1) drop-shadow(0 0 ${2 + age*4}px rgba(201,169,110,${age*0.6}))`,
              mixBlendMode:  isHead ? "normal" : "screen",
            }}
          >
            <img
              src={BUNNY_CURSOR}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          </div>
        );
      })}
    </>
  );
}

/* ─── Ornamental Corner ─── */
function OrnamentCorner() {
  return (
    <svg viewBox="0 0 200 200" fill="none" style={{width:"100%",height:"100%"}}>
      <g stroke="#111" strokeWidth="1.5" opacity=".88" fill="none">
        <circle cx="22" cy="22" r="10" fill="#111" opacity=".8"/>
        <circle cx="22" cy="22" r="5"  fill="#060606"/>
        <path d="M32,12 Q55,-8 78,12 Q101,32 88,58"/>
        <path d="M12,32 Q-8,55 12,78 Q32,101 58,88"/>
        <circle cx="82" cy="6"  r="6" fill="#111" opacity=".65"/>
        <circle cx="6"  cy="82" r="6" fill="#111" opacity=".65"/>
        <path d="M64,2  Q88,18 76,42 Q64,66 88,76"/>
        <path d="M2,64  Q18,88 42,76 Q66,64 76,88"/>
        <path d="M100,38 Q114,12 138,24"/>
        <path d="M38,100 Q12,114 24,138"/>
        <circle cx="44" cy="44" r="3.5" fill="#111" opacity=".45"/>
      </g>
    </svg>
  );
}

/* ─── Decorative divider ─── */
function Divider() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,margin:"36px auto",maxWidth:320,opacity:.45}}>
      <div style={{flex:1,height:1,background:"#6b5c4a"}}/>
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M9,1 L10.8,6.8 L17,7 L12.2,10.8 L14,17 L9,13.4 L4,17 L5.8,10.8 L1,7 L7.2,6.8 Z" fill="#8a7055" opacity=".7"/>
      </svg>
      <div style={{flex:1,height:1,background:"#6b5c4a"}}/>
    </div>
  );
}

/* ══════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════ */
function LandingPage({ onEnter }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [particles, setParticles] = useState([]);
  const [started, setStarted] = useState(false);  // ← moved here, top of component

  const pidRef = useRef(0);
  const knockRef = useRef(null);
  const hasUnlockedRef = useRef(false);

  /* INIT AUDIO */
useEffect(() => {
  const knocking = new Audio(
    "https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/knocking.mp3"
  );
  knocking.loop = true;
  knocking.volume = 0;

  // TEMP DEBUG
  knocking.addEventListener("canplaythrough", () => console.log("✅ audio loaded"));
  knocking.addEventListener("error", (e) => console.log("❌ audio error", e));

  knockRef.current = knocking;
}, []);

  /* SCROLL → AUDIO REACTIVITY */
  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
      setScrollProgress(p);

      const knock = knockRef.current;
      if (knock && hasUnlockedRef.current) {
        knock.volume = Math.min(0.15 + p * 0.75, 1);  // starts at 0.15, reaches 0.9 at full scroll
        knock.playbackRate = 0.85 + p * 0.35;
        if (p >= 0.98) {
          knock.pause();
          onEnter();
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onEnter]);

  /* PARTICLES */
  useEffect(() => {
    const CHARS = ["🍃", "·", "✦", "·", "∘"];
    const iv = setInterval(() => {
      const id = pidRef.current++;
      const pt = {
        id,
        left: Math.random() * 100,
        size: 7 + Math.random() * 9,
        dur: 5 + Math.random() * 7,
        delay: Math.random() * 1.5,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
      };
      setParticles((prev) => [...prev.slice(-20), pt]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((x) => x.id !== id));
      }, 14000);
    }, 600);
    return () => clearInterval(iv);
  }, []);

  const p = scrollProgress;
  const darkness = p * 0.9;
  const innerLight = Math.max(30 - p * 30, 0);

  /* CLICK HANDLER to unlock audio */
const handleClick = async () => {
  if (hasUnlockedRef.current) return;
  const knock = knockRef.current;
  if (!knock) return;
  try {
    knock.volume = 0.15;  // ← audible from the start, not 0
    await knock.play();
    hasUnlockedRef.current = true;
    setStarted(true);
  } catch (err) {
    console.log("Audio blocked:", err);
  }
};

  return (
    <div style={{ height: "200vh" }} onClick={handleClick}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/AndScene2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />

        {/* title */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            textAlign: "center",
            color: "#f5ede0",
            opacity: Math.max(0, 1 - p),
            transform: `translateY(${p * -28}px)`,
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(3rem,6vw,5.5rem)",
              fontWeight: 400,
            }}
          >
            Follow the
            <br />
            sound
          </h1>
          {!started && (
            <p style={{
              fontFamily: "'IM Fell English',serif",
              fontStyle: "italic",
              fontSize: "0.85rem",
              opacity: 0.45,
              marginTop: 16,
              letterSpacing: "0.08em",
            }}>
              click to begin
            </p>
          )}
        </div>

        {/* scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(245,237,224,.3)",
            zIndex: 6,
          }}
        >
          — scroll to follow —
        </div>

        {/* vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 70% 70% at 50% 50%,transparent ${innerLight}%,rgba(0,0,0,${darkness}) 100%)`,
            zIndex: 7,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* particles */}
      {particles.map((pt) => (
        <div
          key={pt.id}
          style={{
            position: "fixed",
            left: `${pt.left}vw`,
            top: "-20px",
            fontSize: pt.size,
            animation: `fallLeaf ${pt.dur}s ${pt.delay}s linear forwards`,
            pointerEvents: "none",
            color: "rgba(60,90,50,.5)",
          }}
        >
          {pt.char}
        </div>
      ))}
    </div>
  );
}
/* ══════════════════════════════════════
   ARTICLE PAGE
══════════════════════════════════════ */
const PARAS = {
  p1: `The house, if you could call it that with any sincerity, was too empty for my own well-being. It was a silence that pressed against the walls and got into your lungs if you stayed too long, and a hollow, resonant kind of emptiness that insists upon itself, pressing its cold fingers in every corner, every crack in the plaster, every unswept threshold, until the very air becomes an accusation. I could not breathe in it. And so, as I had always done, driven by some desperate and half-conscious impulse that I would not have dignified with the name of hope, I left. Through the front door, past the crooked gate, down the muddied path until the cobblestones disappeared entirely and there was only grass, then trees, then the vast and wordless indifference of open sky. Here, at last, I had found my momentary solace once again. I sank against the base of the rough bark of an old tree, let the sunlight fall across my face with something almost like forgiveness, and opened the book that I had carried with me, not to read it, but simply to hold it, as one holds the hand of someone long gone.`,
  p2: `A louder banging this time. My hand froze as the sound rippled through the paper itself. The pages suddenly began to rot from the corners, spreading quickly, eating at themselves insatiably; words dissolving, letters peeling apart like wet skin, paper blackening and folding in on itself as if ashamed of what it was becoming. I watched, petrified, unable to pull away even as the blackened remains of the book crept over my fingertips. It spread up my hands, my wrists, my arms, unraveling me until there was nothing left of us. The ground beneath me abruptly vanished, and I fell, spiraling endlessly through a tunnel of shifting colors and whispering shapes, my screams swallowed before they could exist.`,
  p3: `When I finally fell onto the ground, I gasped. The entrance to a new world was precarious, teetering between dream and reality. A light fog traversed the uncanny scenery, failing to mask the absence of others around me as my shoes sank into the clammy mud. The puddles spread out reflecting not me, but something like me, twisted and twitching with intent. A low, warped hum drifted from nowhere, crawling beneath my skin, a lullaby and a threat in the same breath. A shaky breath slipped from my lips as I could hear distant faded memories bleeding through the cracks in the bark. Yet beneath them all, something darker lingered, coiled and patient. The part of me that thrived on perfection, and the quiet terror of being undone.`,
  p4: `I ran. My feet barely grazing the ground, breathing ragged, the fog pressing in behind me like it was following, like it knew where I was going before I did. My eyes searched desperately for something familiar, anything, even as the strangeness of this world pulled at me from every direction, demanding to be seen.`,
  p5: `Finally, I climbed a tree, its branches swaying under my weight, and perched there, observing cautiously, hoping to make sense of the peculiar scenery around me. This world was familiar and strange all at once, changing with every blink, ideas floated freely like clouds colliding midair, and music I didn't recognize hummed beneath the surface. Weaving together every part of my past, present, and future into one. A hazy mirage shimmered in the distance. Still out of reach. Still calling. I jumped down from the tree and sprinted toward it endlessly, sweat stinging my eyes, lungs screaming for air. The sky overhead was a bruised, lightless gray, the streams below black as ink, colors melting and bleeding into each other as if painted by memory itself.`,
  p6: `A figure stood before me. Not a monster, nor a phantom, but me, sharpened, exaggerated, grotesque. Its smile stretched too wide, a grin that threatened to split its face. Its eyes glinted with cruel knowledge, gleaming with every shortcut I had craved, every lie I had rehearsed, every betrayal I had ever imagined. Its presence pressed into my chest, cold and heavy, like the air itself had turned to iron. Its predatory stillness held my soul in a suffocating grip. Every flaw I had hidden, every petty desire, selfish flicker, every misstep, rippling through the air like a contagion. I shakily took a step back, but it slowly followed. Its every step screeching like nails on a chalkboard. I ran without another thought, but every reflection, every puddle, every flickering screen mirrored its gaze. The woods warped with it; multitudes of branches slithered, shadows twisted into impossible angles, bushes breathed and cracked, and the music wrenched itself into dissonance, a chorus of cracking bark and sighs. I could no longer trust reality. The reflection, the forest, the person I had called myself, they all bled into each other, a fevered hallucination. Every truth I had clung to quavered. And beneath it all, a thrill twisted in my chest, the temptation to surrender to the dark, to the version of myself I had feared most.`,
  p7: `Fear tightened around my ribs, claws digging in. My heart hammered, realizing I couldn't outrun the unnerving persona behind me. I hesitantly turned around, panting as it stood in front of me. I took in its ragged appearance and searched its empty, consuming eyes and then suddenly embraced it tightly with shaky arms, accepting every part of its visceral truth. The reflection trembled within my tightened grasp. Flesh and shadow trembling, it cracked like wet porcelain. A fracture split through its smile, followed by another. And then it collapsed, splintering into ripples of water.`,
  p8: `The woods exhaled. The rain no longer warned; it beckoned. Somewhere, a melody soared, unbroken. I stepped forward as the fog slowly dissipated, into streets that had been built from memory and nightmare alike, into a world I could shape, tempered by fear, but no longer bound by it.`,
};

function ArticleImage({ label, aspect="4/3" }) {
  return (
    <div style={{width:"100%",aspectRatio:aspect,background:"linear-gradient(135deg,#c5bdb0,#a89d8e)",borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,.18)"}}>
      <span style={{color:"rgba(80,60,40,.4)",fontFamily:"'IM Fell English',serif",fontStyle:"italic",fontSize:".85rem"}}>{label}</span>
    </div>
  );
}

function ArticlePage({ onBack }) {
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  const serif   = { fontFamily:"'IM Fell English',serif" };
  const display = { fontFamily:"'Playfair Display',serif" };
  const body    = {
    ...serif,
    fontSize:"clamp(.9rem,1.7vw,1.04rem)",
    lineHeight:1.88,
    color:"#2b201a",
    letterSpacing:".012em"
  };

  const grid    = {
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    gap:36,
    alignItems:"start"
  };

  const gridRev = { ...grid, direction:"rtl" };
  const ltr     = { direction:"ltr" };

  /* ───────────────────────────────
     SCROLL REVEAL (IntersectionObserver)
  ─────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const updated = { ...prev };

          entries.forEach((entry) => {
            const id = entry.target.getAttribute("data-id");
            if (!id) return;

            if (entry.isIntersecting) {
              updated[id] = true;
            }
          });

          return updated;
        });
      },
      {
        threshold: 0.15
      }
    );

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ───────────────────────────────
     SWIPE / BACK NAV
  ─────────────────────────────── */
  useEffect(() => {
    let startY = 0;

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      if (window.scrollY <= 0 && currentY - startY > 80) {
        onBack();
      }
    };

    const onWheel = (e) => {
      if (window.scrollY <= 0 && e.deltaY < -20) {
        onBack();
      }
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("wheel", onWheel);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("wheel", onWheel);
    };
  }, [onBack]);

  /* ───────────────────────────────
     SECTION WRAPPER (FIXED)
  ─────────────────────────────── */
  const section = (id, children) => (
    <div
      ref={(el) => (refs.current[id] = el)}
      data-id={id}
      style={{
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? "translateY(0px)" : "translateY(28px)",
        transition: "opacity .9s ease, transform .9s cubic-bezier(.16,1,.3,1)",
        willChange: "opacity, transform",
        marginBottom: 0,
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{background:"#cfc8be",minHeight:"100vh",paddingBottom:100}}>

      {/* HEADER */}
      <div style={{background:"#c8c1b6",borderBottom:"1px solid rgba(100,80,60,.15)",padding:"64px 24px 44px",textAlign:"center"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>

          <h1 style={{...display,fontSize:"clamp(2.6rem,5vw,4rem)",fontWeight:600,color:"#1a1008",lineHeight:1.12,marginBottom:14}}>
            Ruminating<br/>Chimera
          </h1>

          <p style={{...serif,fontStyle:"italic",fontSize:"1rem",color:"rgba(60,45,30,.55)",letterSpacing:".06em"}}>
            By: Joanna V.
          </p>

          <Divider/>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:760,margin:"0 auto",padding:"52px 28px 0"}}>

        {section("b1",
          <div style={grid}>
            <div style={ltr}>
              <p style={{...display,fontStyle:"italic",fontSize:"1.15rem",color:"#3a2a18",marginBottom:14}}>
                Knock, knock.
              </p>
              <p style={body}>{PARAS.p1}</p>
            </div>
            <div style={ltr}><ArticleImage label="image 1" aspect="3/4"/></div>
          </div>
        )}
        <Divider/>

        {section("b2",
          <div style={gridRev}>
            <div style={ltr}>
              <p style={{...display,fontStyle:"italic",fontSize:"1.15rem",color:"#3a2a18",marginBottom:14}}>
                Knock, knock.
              </p>
              <p style={body}>{PARAS.p2}</p>
            </div>
            <div style={ltr}><ArticleImage label="image 2" aspect="3/4"/></div>
          </div>
        )}
        <Divider/>

        {section("b3",
          <p style={{...body,textAlign:"center",maxWidth:560,margin:"0 auto"}}>
            {PARAS.p3}
          </p>
        )}
        <Divider/>

        {section("b4",
          <div style={grid}>
            <div style={ltr}><p style={body}>{PARAS.p4}</p></div>
            <div style={ltr}><ArticleImage label="image 3" aspect="4/5"/></div>
          </div>
        )}
        <Divider/>

        {section("b5",
          <div style={gridRev}>
            <div style={ltr}><p style={body}>{PARAS.p5}</p></div>
            <div style={ltr}><ArticleImage label="image 4" aspect="4/5"/></div>
          </div>
        )}
        <Divider/>

        {section("b6",
          <div style={{textAlign:"center",maxWidth:580,margin:"0 auto"}}>
            <p style={{...display,fontSize:"clamp(1.6rem,3.2vw,2.4rem)",fontStyle:"italic",color:"#1a1008",marginBottom:30}}>
              I froze.
            </p>
            <p style={body}>{PARAS.p6}</p>
          </div>
        )}
        <Divider/>

        {section("b7",
          <div style={grid}>
            <div style={ltr}><p style={body}>{PARAS.p7}</p></div>
            <div style={ltr}><ArticleImage label="image 5" aspect="4/5"/></div>
          </div>
        )}
        <Divider/>

        {section("b8",
          <p style={{...body,textAlign:"center",maxWidth:520,margin:"0 auto",fontStyle:"italic"}}>
            {PARAS.p8}
          </p>
        )}

        {/* END ORNAMENT */}
        <div style={{textAlign:"center",marginTop:56,opacity:.3}}>
          <svg width="60" height="20" viewBox="0 0 60 20">
            <line x1="0" y1="10" x2="22" y2="10" stroke="#6b5c4a" strokeWidth="1"/>
            <circle cx="30" cy="10" r="4" fill="none" stroke="#6b5c4a" strokeWidth="1"/>
            <line x1="38" y1="10" x2="60" y2="10" stroke="#6b5c4a" strokeWidth="1"/>
          </svg>
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ROOT APP — cursor trail logic lives here
══════════════════════════════════════ */
export default function App() {
  const [page, setPage]           = useState("landing");
  // Ring buffer of cursor positions for the trail
  const [trailPositions, setTrailPositions] = useState(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  );
  const rawPos   = useRef({ x: -200, y: -200 });
  const frameRef = useRef(null);
  const bufRef   = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })));

  // Smooth trail via rAF
  useEffect(() => {
    const onMove = e => { rawPos.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener("mousemove", onMove);

    const tick = () => {
      // shift buffer: newest at end
      const buf  = bufRef.current;
      const head = buf[buf.length - 1];
      // lerp head toward raw
      const nx = head.x + (rawPos.current.x - head.x) * 0.35;
      const ny = head.y + (rawPos.current.y - head.y) * 0.35;
      bufRef.current = [...buf.slice(1), { x: nx, y: ny }];
      setTrailPositions([...bufRef.current]);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleEnter = useCallback(() => {
    window.scrollTo({ top: 0 });
    setPage("article");
  }, []);

  const handleBack = useCallback(() => {
  setPage("landing");
  setTimeout(() => window.scrollTo({ top: 0 }), 0);
}, []);

  return (
    <>
      <style>{fontStyle}</style>
      <BunnyCursor positions={trailPositions} />
      {page === "landing"
        ? <LandingPage onEnter={handleEnter} />
        : <ArticlePage onBack={handleBack} />
      }
    </>
  );
}