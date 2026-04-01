import { useEffect, useState } from "react";
import styles from "./AlleyPage.module.css";
import { ALLEY_POEM_STEPS } from "./alleyPoem.js";

/** Stage once curtains clear (full composition) */
const STAGE_BASE = "/assets/andscene/alley/curtains-open.png";
/** Export these from Photopea: side drapes only — they slide L/R; valance stays fixed on top */
const CURTAIN_LEFT = "/assets/andscene/alley/curtain-left.png";
const CURTAIN_RIGHT = "/assets/andscene/alley/curtain-right.png";
const VALANCE = "/assets/andscene/alley/valance.png";

/** Hold closed curtains before the open animation begins */
const CURTAIN_DELAY_MS = 3200;
/** Duration of curtain slide until drapes clear the frame (must match CSS --curtain-duration) */
const CURTAIN_OPEN_MS = 2200;
/** Spotlight starts this long after the slide *begins* (~end of 2.2s slide with default below) */
const SPOTLIGHT_AFTER_CURTAIN_START_MS = 2000;
const SPOTLIGHT_DELAY_MS = 200;
const POEM_DELAY_MS = 900;
/** Show “next →” after this long once a pair of sentences is visible */
const NEXT_BTN_DELAY_MS = 2000;

export default function AlleyPage() {
  const [started, setStarted] = useState(false);
  const [curtainsDone, setCurtainsDone] = useState(false);
  const [spotlightOn, setSpotlightOn] = useState(false);
  const [poemVisible, setPoemVisible] = useState(false);

  const [poemStep, setPoemStep] = useState(0);
  const [showNextBtn, setShowNextBtn] = useState(false);

  const lastPoemStep = ALLEY_POEM_STEPS.length - 1;

  useEffect(() => {
    const afterOpen = CURTAIN_DELAY_MS + CURTAIN_OPEN_MS;
    const spotlightAt =
      CURTAIN_DELAY_MS + SPOTLIGHT_AFTER_CURTAIN_START_MS + SPOTLIGHT_DELAY_MS;

    const t0 = window.setTimeout(() => setStarted(true), CURTAIN_DELAY_MS);
    const t1 = window.setTimeout(() => setCurtainsDone(true), afterOpen);
    const t2 = window.setTimeout(() => setSpotlightOn(true), spotlightAt);
    const t3 = window.setTimeout(() => setPoemVisible(true), spotlightAt + POEM_DELAY_MS);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (!poemVisible) return;
    setShowNextBtn(false);
    if (poemStep >= lastPoemStep) return;
    const t = window.setTimeout(() => setShowNextBtn(true), NEXT_BTN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [poemVisible, poemStep, lastPoemStep]);

  const sceneClass = [
    styles.scene,
    started && styles.sceneStarted,
    curtainsDone && styles.curtainsDone,
    spotlightOn && styles.spotlightOn,
    poemVisible && styles.poemVisible,
  ]
    .filter(Boolean)
    .join(" ");

  const [lineA, lineB] = ALLEY_POEM_STEPS[poemStep] ?? ["", ""];
  const showNext = showNextBtn && poemStep < lastPoemStep;

  return (
    <div
      className={sceneClass}
      style={{ "--curtain-duration": `${CURTAIN_OPEN_MS}ms` }}
    >
      <div className={styles.stage}>
        <img className={styles.base} src={STAGE_BASE} alt="" aria-hidden />

        <div className={styles.curtainStage} aria-hidden>
          <img className={styles.curtainLeft} src={CURTAIN_LEFT} alt="" />
          <img className={styles.curtainRight} src={CURTAIN_RIGHT} alt="" />
          <img className={styles.valance} src={VALANCE} alt="" />
        </div>

        <div className={styles.spotlightRack} aria-hidden>
          <div className={styles.spotlightVignette} />
          <div className={styles.spotlightBeam} />
        </div>

        <div className={styles.poemWrap}>
          <article className={styles.poem} aria-live="polite">
            <div className={styles.poemScroll}>
              {lineA ? <p>{lineA}</p> : null}
              {lineB ? <p>{lineB}</p> : null}
            </div>
            <div className={styles.poemNextSlot}>
              {showNext ? (
                <button
                  type="button"
                  className={styles.poemNext}
                  onClick={() => setPoemStep((s) => Math.min(s + 1, lastPoemStep))}
                >
                  next →
                </button>
              ) : null}
            </div>
          </article>
        </div>
      </div>

      <div className={styles.grain} aria-hidden />
    </div>
  );
}
