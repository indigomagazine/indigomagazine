import { useState, useEffect, useRef } from "react";
import styles from "./keyboards.module.css";
import DialogueBox from "./DialogueBox";
import ChoiceButtons from "./ChoiceButtons";
import { scenes, eyeColors } from "./storyFlow";

// Import images
import image1 from "../../../../../assets/serial photos/group 3/tentative final 1.png";
import image2 from "../../../../../assets/serial photos/group 3/tentative final 2.1.png";
import image3 from "../../../../../assets/serial photos/group 3/tentative final 2.2.png";
import image4 from "../../../../../assets/serial photos/group 3/both models.png";
import image5 from "../../../../../assets/serial photos/group 3/chrome.png";
import image6 from "../../../../../assets/serial photos/group 3/nolan.png";
import image7 from "../../../../../assets/serial photos/group 3/keyboard.png";
import image8 from "../../../../../assets/serial photos/group 3/nolan 2.png";
import image9 from "../../../../../assets/serial photos/group 3/tomiwa 1.png";
import image10 from "../../../../../assets/serial photos/group 3/tomiwa 2.png";
import image11 from "../../../../../assets/serial photos/group 3/anotha one.png";

// Import background music
import backgroundMusic from "./audio/Yaka-anima (Sábila Orbe) - Creepy Tears.mp3";

const images = {
  image1: image1,
  image2: image2,
  image3: image3,
  image4: image4,
  image5: image5,
  image6: image6,
  image7: image7,
  image8: image8,
  image9: image9,
  image10: image10,
  image11: image11,
};

// Generate random character string
const generateRandomText = (length = 200) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length)) + " ";
  }
  return result;
};

export default function KeyboardsExperience() {
  const [currentScene, setCurrentScene] = useState("intro");
  const [username, setUsername] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [showUserInput, setShowUserInput] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showLovePrompt, setShowLovePrompt] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [loveInput, setLoveInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorShake, setUsernameErrorShake] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [screenFlashing, setScreenFlashing] = useState(false);
  const [screenPoweredOff, setScreenPoweredOff] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingGlitch, setLoadingGlitch] = useState(false);
  const [currentShutdownImage, setCurrentShutdownImage] = useState(null);
  const [imageFading, setImageFading] = useState(false);
  const [showPoem, setShowPoem] = useState(false);
  
  // Audio ref for background music
  const audioRef = useRef(null);

  // Function to start audio playback
  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Background music started");
          })
          .catch((error) => {
            console.log("Audio play failed:", error);
          });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startAudio();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Preload shutdown sequence images so they're ready when needed
  useEffect(() => {
    const shutdownImages = [images.image1, images.image2, images.image3];
    
    shutdownImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

  // Handle username/eye color input
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && eyeColor.trim()) {
      startAudio();
      triggerGlitch();
      setTimeout(() => {
        setShowUserInput(false);
        setShowLoading(true);
        startLoadingSequence();
      }, 300);
    } else {
      // Show error if validation fails
      setUsernameError(true);
      setUsernameErrorShake(true);
      setTimeout(() => {
        setUsernameErrorShake(false);
        setUsernameError(false);
      }, 1500);
    }
  };

  // Handle loading sequence
  const startLoadingSequence = () => {
    setLoadingProgress(0);

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 15 + 5; // Random increment between 5-20
      progress += increment;

      // Clamp to 100 max
      if (progress > 100) {
        progress = 100;
      }

      // Random glitches during loading
      if (Math.random() > 0.7 && progress < 100) {
        setLoadingGlitch(true);
        setTimeout(() => setLoadingGlitch(false), 150);
      }

      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        // Transition to love prompt after completion
        setTimeout(() => {
          setShowLoading(false);
          setShowLovePrompt(true);
        }, 500);
      }
    }, 300);
  };

  // Handle "I LOVE YOU" input validation
  const handleLoveSubmit = (e) => {
    e.preventDefault();
    const normalizedInput = loveInput.trim().toLowerCase();
    const expectedInput = "i love you";

    if (normalizedInput === expectedInput) {
      // Correct input - proceed to story
      setShowLovePrompt(false);
      triggerGlitch();
    } else {
      // Wrong input - shake and show error
      setIsError(true);
      setErrorShake(true);
      setTimeout(() => {
        setErrorShake(false);
        setIsError(false);
        setLoveInput("");
      }, 1500);
    }
  };

  // Handle choice selection
  const handleChoice = (choiceValue) => {
    // Check if user selected force shutdown
    if (choiceValue === "force_shutdown") {
      triggerShutdown();
    } else {
      triggerGlitch();
      setTimeout(() => {
        setCurrentScene(choiceValue);
      }, 300);
    }
  };

  // Handle shutdown sequence
  const triggerShutdown = () => {
    setIsShuttingDown(true);
    setShowPoem(false);
    setShowRestart(false);
    setCurrentShutdownImage(null);

    // Flash red 5 times (2.5 seconds total)
    setScreenFlashing(true);

    setTimeout(() => {
      setScreenFlashing(false);
      setScreenPoweredOff(true);

      // After fade to black (3s), show images in sequence
      setTimeout(() => {
        showImageSequence();
      }, 3000);
    }, 2500);
  };

  const startPoemSequence = () => {
    setShowPoem(true);
    // Show restart button after text scrolls off screen
    // Check if mobile (screen width <= 768px) and adjust timing accordingly
    const isMobile = window.innerWidth <= 768;
    const animationDuration = isMobile ? 90000 : 65000; // 90s mobile, 65s desktop
    const restartDelay = isMobile 
      ? Math.floor(animationDuration * 0.90) - 5000 // 90% minus 5 seconds for mobile
      : Math.floor(animationDuration * 0.90) - 5000; // 90% minus 5 seconds for desktop
    
    setTimeout(() => {
      setShowRestart(true);
    }, restartDelay);
  };

  // Show images in sequence
  const showImageSequence = () => {
    const shutdownImageOrder = ["image1", "image2", "image3"];
    let currentIndex = 0;

    const showNextImage = () => {
      if (currentIndex < shutdownImageOrder.length) {
        // Fade in image
        setCurrentShutdownImage(shutdownImageOrder[currentIndex]);
        setImageFading(true);

        setTimeout(() => {
          setImageFading(false);

          // Wait a bit then fade out
          setTimeout(() => {
            setImageFading(true);

            setTimeout(() => {
              setCurrentShutdownImage(null);
              setImageFading(false);
              currentIndex++;

              // Small pause before next image
              setTimeout(() => {
                showNextImage();
              }, 500);
            }, 1500); // Fade out duration
          }, 2000); // Display duration
        }, 1500); // Fade in duration
      } else {
        // All images shown, transition to poem sequence
        setTimeout(() => {
          startPoemSequence();
        }, 200);
      }
    };

    showNextImage();
  };

  // Handle restart
  const handleRestart = () => {
    // Reset all state
    setIsShuttingDown(false);
    setShowRestart(false);
    setScreenFlashing(false);
    setScreenPoweredOff(false);
    setCurrentShutdownImage(null);
    setImageFading(false);
    setShowPoem(false);
    setShowUserInput(true);
    setShowLovePrompt(false);
    setCurrentScene("intro");
    setLoveInput("");
    setUsername("");
    setEyeColor("");
    triggerGlitch();
  };

  // Trigger glitch effect
  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 300);
  };

  // Get current scene data
  const scene = scenes[currentScene];

  // Replace placeholders in text
  const getProcessedText = (text) => {
    return text
      .replace(/{username}/g, username)
      .replace(/{eye_color}/g, eyeColor);
  };

  // Render content - audio element is included once at the top level
  const renderContent = () => {
    // Shutdown screen
    if (isShuttingDown) {
      if (showRestart) {
        return (
          <div className={styles.shutdownContainer}>
            <button className={styles.restartButton} onClick={handleRestart}>
              Restart?
            </button>
          </div>
        );
      }

      // Show image sequence
      if (currentShutdownImage) {
        return (
          <div className={styles.shutdownContainer}>
            <img
              src={images[currentShutdownImage]}
              alt="Memory"
              className={`${styles.shutdownImage} ${
                !imageFading ? styles.shutdownImageVisible : ""
              }`}
            />
          </div>
        );
      }

      if (showPoem) {
        return (
          <div className={styles.shutdownContainer}>
          <div className={styles.poemScrollWrapper}>
            <div className={styles.poemScrollContent}>
              <div className={styles.poemSpread}>
                <div className={styles.poemColumn}>
                  <div className={styles.poemSection}>
                    <div className={styles.poemSectionTitle}>ACETYLCHOLINE.</div>
                    <p className={styles.poemLine}>Hand moves to meet your waist.</p>
                    <p className={styles.poemLine}>Lips move to catch your lips.</p>
                    <p className={styles.poemLine}>I move to you.</p>
                  </div>

                  <div className={styles.poemSection}>
                    <div className={styles.poemSectionTitle}>SEROTONIN.</div>
                    <p className={styles.poemLine}>Joy when I see you smile.</p>
                    <p className={styles.poemLine}>It&apos;s as simple as that.</p>
                    <p className={styles.poemLine}>I feel with you.</p>
                  </div>

                  <div className={styles.poemSection}>
                    <div className={styles.poemSectionTitle}>OXYTOCIN.</div>
                    <p className={styles.poemLine}>I love you.</p>
                    <p className={styles.poemLine}>Do you?</p>
                    <p className={styles.poemLine}>I do.</p>
                  </div>

                  <div className={styles.poemSection}>
                    <div className={styles.poemSectionTitle}>ADRENALINE.</div>
                    <p className={styles.poemLine}>I see you across the room.</p>
                    <p className={styles.poemLine}>Your green eyes captivate me.</p>
                    <p className={styles.poemLine}>Your green eyes captivate me.</p>
                  </div>
                </div>

                <div className={styles.poemCenterNote}>
                  <p>Have I already said that?</p>
                  <p>Sorry. I get so lost in you.</p>
                </div>

                <div className={`${styles.poemColumn} ${styles.poemColumnRight}`}>
                  <div className={styles.poemSection}>
                    <div className={styles.poemSectionTitle}>ACETYLCHOLINE.</div>
                    <p className={styles.poemLine}>My hands won&apos;t move to you.</p>
                    <p className={styles.poemLine}>
                      My lips haven&apos;t met yours in weeks.
                    </p>
                    <p className={styles.poemLine}>You move from me.</p>
                  </div>

                  <div className={styles.poemSection}>
                    <div className={styles.poemSectionTitle}>SEROTONIN.</div>
                    <p className={styles.poemLine}>Numbness when I see you smile.</p>
                    <p className={styles.poemLine}>It&apos;s not so simple anymore.</p>
                    <p className={styles.poemLine}>You feel in spite of me.</p>
                  </div>

                  <div className={styles.poemSection}>
                    <div className={styles.poemSectionTitle}>OXYTOCIN.</div>
                    <p className={styles.poemLine}>I hate you.</p>
                    <p className={styles.poemLine}>Do you?</p>
                    <p className={styles.poemLine}>You don&apos;t.</p>
                  </div>

                  <div className={styles.poemSection}>
                    <div className={styles.poemSectionTitle}>ADRENALINE.</div>
                    <p className={styles.poemLine}>
                      I wish you were across the fucking room.
                    </p>
                    <p className={styles.poemLine}>My eyes are seeing red.</p>
                    <p className={styles.poemLine}>My eyes are seeing red.</p>
                  </div>
                </div>
              </div>

              <div className={styles.poemBottomNote}>
                <p>Have you already left me?</p>
                <p>Tell me you love me again.</p>
              </div>

              <div className={styles.poemImageGallery}>
                <img
                  src={images.image5}
                  alt="Editorial Name"
                  className={styles.poemEditorialName}
                />
                {["image4", "image11", "image6", "image7", "image8", "image9", "image10"].map((imgKey) => (
                  <img
                    key={imgKey}
                    src={images[imgKey]}
                    alt="Memory"
                    className={styles.poemGalleryImage}
                  />
                ))}
              </div>

              <div className={styles.poemCredits}>
                <div>Written by: Manogna Bedhu</div>
                <div>Graphics: Sreya Iyer, Sahasra, Manjiri</div>
                <div>Web Development: Ethan Scherwitz</div>
                <div>Photography: Sruja Peruka</div>
                <div>Behind the Scenes: Dorlinda Hickerson</div>
              </div>

              <div className={styles.musicCredit}>
                Music: "Creepy Tears" by Yaka-anima (Sábila Orbe) | Source: Free Music Archive | License: CC BY-NC-ND
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${styles.container} ${
          screenPoweredOff ? styles.containerFadeOut : ""
        }`}
      >
          <div
            className={`${styles.textLinesContainer} ${
              screenFlashing ? styles.textLinesFlashing : ""
            }`}
          >
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
        </div>

        <div
          className={`${styles.screen} ${
            screenFlashing ? styles.screenFlashing : ""
          } ${screenPoweredOff ? styles.screenPowerOff : ""}`}
        >
          <div className={styles.content}>
            <div className={styles.asciiBorder}>
              ⌈ ═══════════════════════════════ ⌉
            </div>

            <div className={styles.dialogueBox}>
              <div className={styles.errorText}>[SYSTEM TERMINATED]</div>
            </div>

            <div className={styles.asciiBorder}>
              ⌊ ═══════════════════════════════ ⌋
            </div>
          </div>
        </div>
      </div>
    );
    }

    // Username/eye color input screen
    if (showUserInput) {
      return (
        <div className={styles.container}>
          <div className={styles.textLinesContainer}>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
          </div>

          <div className={`${styles.screen} ${usernameErrorShake ? styles.shake : ""}`}>
            <div className={styles.content}>
              <div className={styles.asciiBorder}>
                ⌈ ═══════════════════════════════ ⌉
              </div>

              <DialogueBox
                text={usernameError ? "PLEASE COMPLETE ALL FIELDS" : "SYSTEM INITIALIZATION..."}
                type="code"
                showCursor={true}
              />

              <form onSubmit={handleUsernameSubmit}>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    className={`${styles.textInput} ${usernameError ? styles.errorInput : ""}`}
                    placeholder="Enter username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={20}
                    autoFocus
                    disabled={usernameError}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <select
                    className={`${styles.textInput} ${usernameError ? styles.errorInput : ""}`}
                    value={eyeColor}
                    onChange={(e) => setEyeColor(e.target.value)}
                    disabled={usernameError}
                  >
                    <option value="">Select eye color...</option>
                    {eyeColors.map((color) => (
                      <option key={color} value={color}>
                        Eye color: {color}
                      </option>
                    ))}
                  </select>
                </div>

                <ChoiceButtons
                  choices={[{ text: "INITIALIZE", value: "submit" }]}
                  onChoice={() =>
                    handleUsernameSubmit({ preventDefault: () => {} })
                  }
                />
              </form>

              <div className={styles.asciiBorder}>
                ⌊ ═══════════════════════════════ ⌋
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Loading screen
    if (showLoading) {
      return (
        <div className={styles.container}>
          <div className={styles.textLinesContainer}>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
          </div>

          <div
            className={`${styles.screen} ${loadingGlitch ? styles.glitch : ""}`}
          >
            <div className={styles.content}>
              <div className={styles.asciiBorder}>
                ⌈ ═══════════════════════════════ ⌉
              </div>

              <div className={styles.loadingContainer}>
                <div className={styles.loadingTitle}>LOADING ILOVEYOU.EXE...</div>

                <div
                  className={`${styles.loadingBarContainer} ${
                    loadingGlitch ? styles.loadingBarGlitch : ""
                  }`}
                >
                  {Array.from({ length: 20 }).map((_, index) => {
                    const blockThreshold = (index + 1) * 5;
                    const isFilled = loadingProgress >= blockThreshold;
                    return (
                      <div
                        key={index}
                        className={
                          isFilled
                            ? styles.loadingBlock
                            : styles.loadingBlockEmpty
                        }
                      />
                    );
                  })}
                </div>

                <div className={styles.loadingPercent}>
                  {Math.floor(loadingProgress)}%
                </div>
              </div>

              <div className={styles.asciiBorder}>
                ⌊ ═══════════════════════════════ ⌋
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Love input prompt screen
    if (showLovePrompt) {
      return (
        <div className={styles.container}>
          <div className={styles.textLinesContainer}>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
            <div className={styles.textLine}>{generateRandomText(150)}</div>
          </div>

          <div className={`${styles.screen} ${errorShake ? styles.shake : ""}`}>
            <div className={styles.content}>
              <div className={styles.asciiBorder}>
                ⌈ ═══════════════════════════════ ⌉
              </div>

              <div
                className={`${styles.promptText} ${isError ? styles.error : ""}`}
              >
                {isError ? "TRY AGAIN" : "TYPE I LOVE YOU"}
              </div>

              <form onSubmit={handleLoveSubmit}>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    className={`${styles.textInput} ${
                      isError ? styles.errorInput : ""
                    }`}
                    placeholder=""
                    value={loveInput}
                    onChange={(e) => setLoveInput(e.target.value)}
                    autoFocus
                    disabled={isError}
                  />
                </div>
              </form>

              <div className={styles.asciiBorder}>
                ⌊ ═══════════════════════════════ ⌋
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Main experience
    return (
      <div className={styles.container}>
        <div className={styles.textLinesContainer}>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
          <div className={styles.textLine}>{generateRandomText(150)}</div>
        </div>

        <div className={`${styles.screen} ${glitch ? styles.glitch : ""}`}>
          <div className={styles.content}>
            <div className={styles.asciiBorder}>
              ⌈ ═══════════════════════════════ ⌉
            </div>

            <DialogueBox
              text={getProcessedText(scene.text)}
              type={scene.type}
              showCursor={false}
            />

            {scene.image && images[scene.image] && (
              <div className={styles.imageContainer}>
                <img
                  src={images[scene.image]}
                  alt="Scene visual"
                  className={styles.image}
                />
              </div>
            )}

            <ChoiceButtons choices={scene.choices} onChoice={handleChoice} />

            <div className={styles.asciiBorder}>
              ⌊ ═══════════════════════════════ ⌋
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={backgroundMusic}
        preload="auto"
        onLoadedData={() => {
          // Try to play when audio is loaded
          if (audioRef.current) {
            audioRef.current.play().catch(() => {
              // Autoplay blocked, will play on user interaction
            });
          }
        }}
      />
      {renderContent()}
    </>
  );
}
