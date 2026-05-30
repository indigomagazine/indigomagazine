import { useState, useEffect, useRef, useCallback } from "react";

const BUNNY_CURSOR = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/bunnycursor.png"
const TRAIL_LENGTH = 15;

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IM+Fell+English:ital@0;1&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{cursor:none!important;background:#d6cfc4;}

  @keyframes fadeRise{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
  @keyframes fallLeaf{0%{transform:translateY(-30px) rotate(0deg);opacity:0}8%{opacity:.55}92%{opacity:.25}100%{transform:translateY(105vh) rotate(540deg);opacity:0}}
  @keyframes knockAnim{0%,100%{opacity:.15;transform:scaleY(.3)}50%{opacity:.85;transform:scaleY(1)}}
  .knock-bar{width:3px;border-radius:2px;animation:knockAnim var(--spd,1.6s) ease-in-out infinite;background:linear-gradient(to top,#c9a96e,transparent);}
`;

function BunnyCursor({ positions }) {
  return (
    <>
      {positions.map((pos, i) => {
        const isHead  = i === positions.length - 1;
        const age     = i / (positions.length - 1);
        const opacity = isHead ? 1 : age * 0.55;
        const scale   = isHead ? 1 : 0.55 + age * 0.38;
        const size    = 44 * scale;
        return (
          <div key={i} style={{
            position:"fixed", left:pos.x, top:pos.y,
            width:size, height:size,
            pointerEvents:"none", zIndex:9999,
            transform:"translate(-50%, -50%)",
            opacity,
            transition: isHead ? "none" : "opacity .05s",
            filter: isHead
              ? "invert(1) drop-shadow(0 0 6px rgba(255,255,255,.5))"
              : `invert(1) drop-shadow(0 0 ${2+age*4}px rgba(201,169,110,${age*0.6}))`,
            mixBlendMode: isHead ? "normal" : "screen",
          }}>
            <img src={BUNNY_CURSOR} alt="" style={{width:"100%",height:"100%",objectFit:"contain",display:"block"}} />
          </div>
        );
      })}
    </>
  );
}

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
  const containerRef   = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [particles, setParticles]           = useState([]);
  const [started, setStarted]               = useState(false);
  const pidRef         = useRef(0);
  const knockRef       = useRef(null);
  const hasUnlockedRef = useRef(false);
  const enteredRef     = useRef(false);

  useEffect(() => {
    const knocking = new Audio("https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/knocking.mp3");
    knocking.loop   = true;
    knocking.volume = 0;
    knockRef.current = knocking;
    return () => { knocking.pause(); };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getScroller = (node) => {
      while (node && node !== document.body) {
        const style    = window.getComputedStyle(node);
        const overflow = style.overflow + style.overflowY;
        if (/auto|scroll/.test(overflow) && node.scrollHeight > node.clientHeight) return node;
        node = node.parentElement;
      }
      return window;
    };

    const scroller = getScroller(el.parentElement);

    const onScroll = () => {
      const scrollTop = scroller === window ? window.scrollY : scroller.scrollTop;
      const target    = window.innerHeight * 0.85;
      const p         = Math.min(scrollTop / target, 1);
      setScrollProgress(p);

      const knock = knockRef.current;
      if (knock && hasUnlockedRef.current) {
        knock.volume       = Math.min(0.15 + p * 0.75, 1);
        knock.playbackRate = 0.85 + p * 0.35;
      }

      if (p >= 0.98 && !enteredRef.current) {
        enteredRef.current = true;
        if (knock) knock.pause();
        onEnter();
      }
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [onEnter]);

  useEffect(() => {
    const CHARS = ["🍃","·","✦","·","∘"];
    const iv = setInterval(() => {
      const id = pidRef.current++;
      const pt = { id, left:Math.random()*100, size:7+Math.random()*9, dur:5+Math.random()*7, delay:Math.random()*1.5, char:CHARS[Math.floor(Math.random()*CHARS.length)] };
      setParticles(prev => [...prev.slice(-20), pt]);
      setTimeout(() => setParticles(prev => prev.filter(x => x.id !== id)), 14000);
    }, 600);
    return () => clearInterval(iv);
  }, []);

  const p          = scrollProgress;
  const darkness   = p * 0.9;
  const innerLight = Math.max(30 - p * 30, 0);

  const handleClick = async () => {
    if (hasUnlockedRef.current) return;
    const knock = knockRef.current;
    if (!knock) return;
    try {
      knock.volume = 0.15;
      await knock.play();
      hasUnlockedRef.current = true;
      setStarted(true);
    } catch (err) {
      console.log("Audio blocked:", err);
    }
  };

  return (
    <div ref={containerRef} style={{ height:"200vh" }} onClick={handleClick}>
      <div style={{ position:"sticky", top:0, width:"100%", height:"100vh", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/AndScene2.png)", backgroundSize:"cover", backgroundPosition:"center top" }} />
        <div style={{ position:"relative", zIndex:5, textAlign:"center", color:"#f5ede0", opacity:Math.max(0,1-p), transform:`translateY(${p*-28}px)` }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(3rem,6vw,5.5rem)", fontWeight:400 }}>
            Follow the<br/>sound
          </h1>
          {!started && (
            <p style={{ fontFamily:"'IM Fell English',serif", fontStyle:"italic", fontSize:"0.85rem", opacity:0.45, marginTop:16, letterSpacing:"0.08em" }}>
              click to begin
            </p>
          )}
        </div>
        <div style={{ position:"absolute", bottom:26, left:"50%", transform:"translateX(-50%)", color:"rgba(245,237,224,.3)", zIndex:6, fontFamily:"'IM Fell English',serif", fontSize:"0.8rem", letterSpacing:"0.08em" }}>
          — scroll to follow —
        </div>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 70% at 50% 50%,transparent ${innerLight}%,rgba(0,0,0,${darkness}) 100%)`, zIndex:7, pointerEvents:"none" }} />
      </div>
      {particles.map(pt => (
        <div key={pt.id} style={{ position:"fixed", left:`${pt.left}vw`, top:"-20px", fontSize:pt.size, animation:`fallLeaf ${pt.dur}s ${pt.delay}s linear forwards`, pointerEvents:"none", color:"rgba(60,90,50,.5)" }}>
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
  p2: `I looked around, puzzled. Looking around to see nothing that could have made such a loud, echoing sound. I had questioned my own sanity and tried to go back to the consolation that I was trying to ask from the world.`,
  p3: `A louder banging this time. My hand froze as the sound rippled through the paper itself. The pages suddenly began to rot from the corners, spreading quickly, eating at themselves insatiably; words dissolving, letters peeling apart like wet skin, paper blackening and folding in on itself as if ashamed of what it was becoming. I watched, petrified, unable to pull away even as the blackened remains of the book crept over my fingertips. It spread up my hands, my wrists, my arms, unraveling me until there was nothing left of us. The ground beneath me abruptly vanished, and I fell, spiraling endlessly through a tunnel of shifting colors and whispering shapes, my screams swallowed before they could exist.`,
  p4: `When I finally fell onto the ground, I gasped. The entrance to a new world was precarious, teetering between dream and reality. A light fog traversed the uncanny scenery, failing to mask the absence of others around me as my shoes sank into the clammy mud. The puddles spread out reflecting not me, but something like me, twisted and twitching with intent. A low, warped hum drifted from nowhere, crawling beneath my skin, a lullaby and a threat in the same breath. A shaky breath slipped from my lips as I could hear distant faded memories bleeding through the cracks in the bark. Yet beneath them all, something darker lingered, coiled and patient. The part of me that thrived on perfection, and the quiet terror of being undone.`,
  p5: `I ran. My feet barely grazing the ground, breathing ragged, the fog pressing in behind me like it was following, like it knew where I was going before I did. My eyes searched desperately for something familiar, anything, even as the strangeness of this world pulled at me from every direction, demanding to be seen.`,
  p6: `Finally, I climbed a tree, its branches swaying under my weight, and perched there, observing cautiously, hoping to make sense of the peculiar scenery around me. This world was familiar and strange all at once, changing with every blink, ideas floated freely like clouds colliding midair, and music I didn't recognize hummed beneath the surface. Weaving together every part of my past, present, and future into one. A hazy mirage shimmered in the distance. Still out of reach. Still calling. I jumped down from the tree and sprinted toward it endlessly, sweat stinging my eyes, lungs screaming for air. The sky overhead was a bruised, lightless gray, the streams below black as ink, colors melting and bleeding into each other as if painted by memory itself.`,
  p7: `A figure stood before me. Not a monster, nor a phantom, but me, sharpened, exaggerated, grotesque. Its smile stretched too wide, a grin that threatened to split its face. Its eyes glinted with cruel knowledge, gleaming with every shortcut I had craved, every lie I had rehearsed, every betrayal I had ever imagined. Its presence pressed into my chest, cold and heavy, like the air itself had turned to iron. Its predatory stillness held my soul in a suffocating grip. Every flaw I had hidden, every petty desire, selfish flicker, every misstep, rippling through the air like a contagion. I shakily took a step back, but it slowly followed. Its every step screeching like nails on a chalkboard. I ran without another thought, but every reflection, every puddle, every flickering screen mirrored its gaze. The woods warped with it; multitudes of branches slithered, shadows twisted into impossible angles, bushes breathed and cracked, and the music wrenched itself into dissonance, a chorus of cracking bark and sighs. I could no longer trust reality. The reflection, the forest, the person I had called myself, they all bled into each other, a fevered hallucination. Every truth I had clung to quavered. And beneath it all, a thrill twisted in my chest, the temptation to surrender to the dark, to the version of myself I had feared most.`,
  p8: `Fear tightened around my ribs, claws digging in. My heart hammered, realizing I couldn't outrun the unnerving persona behind me. I hesitantly turned around, panting as it stood in front of me. I took in its ragged appearance and searched its empty, consuming eyes and then suddenly embraced it tightly with shaky arms, accepting every part of its visceral truth. The reflection trembled within my tightened grasp. Flesh and shadow trembling, it cracked like wet porcelain. A fracture split through its smile, followed by another. And then it collapsed, splintering into ripples of water.`,
  p9: `The woods exhaled. The rain no longer warned; it beckoned. Somewhere, a melody soared, unbroken. I stepped forward as the fog slowly dissipated, into streets that had been built from memory and nightmare alike, into a world I could shape, tempered by fear, but no longer bound by it.`,
};

function ArticleImage({ src, aspect="4/3" }) {
  return (
    <div style={{width:"100%",aspectRatio:aspect,borderRadius:2,overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,.18)"}}>
      <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
    </div>
  );
}

function ArticlePage({ onBack }) {
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  const serif   = { fontFamily:"'IM Fell English',serif" };
  const display = { fontFamily:"'Playfair Display',serif" };
  const body    = { ...serif, fontSize:"clamp(.9rem,1.7vw,1.04rem)", lineHeight:1.88, color:"#2b201a", letterSpacing:".012em" };
  const grid    = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:36, alignItems:"start" };
  const gridRev = { ...grid, direction:"rtl" };
  const ltr     = { direction:"ltr" };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(prev => {
          const updated = { ...prev };
          entries.forEach(entry => {
            const id = entry.target.getAttribute("data-id");
            if (id && entry.isIntersecting) updated[id] = true;
          });
          return updated;
        });
      },
      { threshold:0.15 }
    );
    Object.values(refs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const section = (id, children) => (
    <div
      ref={el => refs.current[id] = el}
      data-id={id}
      style={{
        opacity:   visible[id] ? 1 : 0,
        transform: visible[id] ? "translateY(0px)" : "translateY(28px)",
        transition:"opacity .9s ease, transform .9s cubic-bezier(.16,1,.3,1)",
        willChange:"opacity, transform",
        marginBottom:0,
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{background:"#cfc8be",minHeight:"100vh",paddingBottom:100}}>
      <div style={{background:"#c8c1b6",borderBottom:"1px solid rgba(100,80,60,.15)",padding:"64px 24px 44px",textAlign:"center",position:"relative"}}>
        <button
          onClick={onBack}
          style={{
            position:"absolute", top:20, left:24,
            background:"transparent", border:"none",
            fontFamily:"'IM Fell English',serif", fontStyle:"italic",
            fontSize:"0.78rem", color:"rgba(60,45,30,.4)",
            letterSpacing:"0.06em", cursor:"pointer",
            display:"flex", alignItems:"center", gap:6,
            transition:"color .25s",
            padding:0,
          }}
          onMouseEnter={e => e.currentTarget.style.color="rgba(60,45,30,.85)"}
          onMouseLeave={e => e.currentTarget.style.color="rgba(60,45,30,.4)"}
        >
          ← back
        </button>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <h1 style={{...display,fontSize:"clamp(2.6rem,5vw,4rem)",fontWeight:600,color:"#1a1008",lineHeight:1.12,marginBottom:14}}>
            Ruminating<br/>Chimera
          </h1>
          <p style={{...serif,fontStyle:"italic",fontSize:"1rem",color:"rgba(60,45,30,.55)",letterSpacing:".06em"}}>By: Joanna V.</p>
          <Divider/>
        </div>
      </div>

      <div style={{maxWidth:760,margin:"0 auto",padding:"52px 28px 0"}}>

        {/* b1 — p1 + image1 */}
        {section("b1",
          <div style={grid}>
            <div style={ltr}><p style={body}>{PARAS.p1}</p></div>
            <div style={ltr}><ArticleImage src="https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/image1.png" aspect="3/4"/></div>
          </div>
        )}
        <Divider/>

        {/* b2 — knock + p2 + image2 */}
        {section("b2",
          <div style={gridRev}>
            <div style={ltr}>
              <p style={{...display,fontStyle:"italic",fontSize:"1.15rem",color:"#3a2a18",marginBottom:14}}>Knock, knock.</p>
              <p style={body}>{PARAS.p2}</p>
            </div>
            <div style={ltr}><ArticleImage src="https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/image2.png" aspect="3/4"/></div>
          </div>
        )}
        <Divider/>

        {/* b3 — knock + p3 centered */}
        {section("b3",
          <div style={{textAlign:"center",maxWidth:560,margin:"0 auto"}}>
            <p style={{...display,fontStyle:"italic",fontSize:"1.15rem",color:"#3a2a18",marginBottom:14}}>Knock, knock.</p>
            <p style={{...body,textAlign:"center"}}>{PARAS.p3}</p>
          </div>
        )}
        <Divider/>

        {/* b4 — p4 + image3 */}
        {section("b4",
          <div style={grid}>
            <div style={ltr}><p style={body}>{PARAS.p4}</p></div>
            <div style={ltr}><ArticleImage src="https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/image3.png" aspect="4/5"/></div>
          </div>
        )}
        <Divider/>

        {/* b5 — p5 + image4 */}
        {section("b5",
          <div style={gridRev}>
            <div style={ltr}><p style={body}>{PARAS.p5}</p></div>
            <div style={ltr}><ArticleImage src="https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/image4.jpg" aspect="4/5"/></div>
          </div>
        )}
        <Divider/>

        {/* b6 — p6 centered, no image */}
        {section("b6",
          <p style={{...body,textAlign:"center",maxWidth:580,margin:"0 auto"}}>{PARAS.p6}</p>
        )}
        <Divider/>

        {/* b7 — "I froze." + p7 + image5 */}
        {section("b7",
          <div style={grid}>
            <div style={ltr}>
              <p style={{...display,fontSize:"clamp(1.6rem,3.2vw,2.4rem)",fontStyle:"italic",color:"#1a1008",marginBottom:24}}>I froze.</p>
              <p style={body}>{PARAS.p7}</p>
            </div>
            <div style={ltr}><ArticleImage src="https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/image5.jpg" aspect="4/5"/></div>
          </div>
        )}
        <Divider/>

        {/* b8 — p8 + image6 — no italic */}
        {section("b8",
          <div style={gridRev}>
            <div style={ltr}><p style={body}>{PARAS.p8}</p></div>
            <div style={ltr}><ArticleImage src="https://cdn.indigomagazinetx.com/articlephotos/andscene/alice/image6.jpg" aspect="4/5"/></div>
          </div>
        )}
        <Divider/>

        {/* b9 — p9 centered, same style as p6, no divider above */}
        {section("b9",
          <p style={{...body,textAlign:"center",maxWidth:580,margin:"0 auto"}}>{PARAS.p9}</p>
        )}
        <Divider/>

        {/* b10 — raw notes */}
        {section("b10",
          <p style={{...body,textAlign:"center",maxWidth:580,margin:"0 auto",whiteSpace:"pre-wrap"}}>{PARAS.p10}</p>
        )}

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
   ROOT
══════════════════════════════════════ */
function Root() {
  const [page, setPage] = useState("landing");
  const [trailPositions, setTrailPositions] = useState(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x:-200, y:-200 }))
  );
  const rawPos   = useRef({ x:-200, y:-200 });
  const frameRef = useRef(null);
  const bufRef   = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x:-200, y:-200 })));

  useEffect(() => {
    const onMove = e => { rawPos.current = { x:e.clientX, y:e.clientY }; };
    document.addEventListener("mousemove", onMove);
    const tick = () => {
      const buf  = bufRef.current;
      const head = buf[buf.length - 1];
      const nx = head.x + (rawPos.current.x - head.x) * 0.35;
      const ny = head.y + (rawPos.current.y - head.y) * 0.35;
      bufRef.current = [...buf.slice(1), { x:nx, y:ny }];
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
    window.scrollTo({ top:0 });
    setPage("article");
  }, []);

  const handleBack = useCallback(() => {
    setPage("landing");
    setTimeout(() => window.scrollTo({ top:0 }), 0);
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

export default function RuminatingChimera() {
  return <Root />;
}
