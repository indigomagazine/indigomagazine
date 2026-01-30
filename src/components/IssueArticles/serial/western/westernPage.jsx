import React, { useState, useEffect } from 'react';

// Importing images from the legacy folder
import background from "../../../../../../legacy/article photos/western/group4Background.jpg";
import paper from "../../../../../../legacy/article photos/western/group4Paper.jpg";
import hat from "../../../../../../legacy/article photos/western/hat.png";
import both from "../../../../../../legacy/article photos/western/both.png";
import malePose from "../../../../../../legacy/article photos/western/malePose.png";
import moneyShot from "../../../../../../legacy/article photos/western/moneyShot.png";
import table from "../../../../../../legacy/article photos/western/table.png";
import wantedPoster from "../../../../../../legacy/article photos/western/wantedPoster.png";
import moviePoster from "../../../../../../legacy/article photos/western/moviePoster.png";

export default function WesternNewspaper() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // UPDATED: Now using the imported variables instead of string paths
  const images = [
    { src: wantedPoster, alt: 'wanted poster' },
    { src: table, alt: 'table' },
    { src: malePose, alt: 'male pose' },
    { src: moneyShot, alt: 'money shot' },
    { src: both, alt: 'both' },
    { src: hat, alt: 'Sheriff in Hat' },
    { src: moviePoster, alt: 'Movie Poster' }
  ];

  const openModal = (index) => {
    setModalOpen(true);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) {
        if (e.key === 'ArrowLeft') showPrev();
        else if (e.key === 'ArrowRight') showNext();
        else if (e.key === 'Escape') closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <>
<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rye&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@700&family=IM+Fell+English:ital@0;1&display=swap');
        
        body {
          background-image: url('${background}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          font-family: 'IM Fell English', serif;
          margin: 0;
          padding: 25px;
        }

        .newspaper-container {
          background-image: url('${paper}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          max-width: 1000px;
          margin: 20px auto;
          padding: 25px;
          filter: sepia(0.3) brightness(1.0) contrast(1.05);
          border: none;
          box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.6),
            0 12px 32px rgba(0, 0, 0, 0.4),
            0 16px 48px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(70, 50, 30, 0.2),
            0 0 2px 1px rgba(50, 35, 20, 0.3),
            inset 0 0 40px rgba(80, 55, 35, 0.15),
            inset 0 0 80px rgba(100, 70, 45, 0.1);
          clip-path: polygon(
            0.5% 0.8%, 3% 0.4%, 6% 0.7%, 10% 0.3%, 15% 0.6%, 20% 0.4%, 25% 0.5%, 30% 0.3%, 
            35% 0.6%, 40% 0.4%, 45% 0.5%, 50% 0.3%, 55% 0.5%, 60% 0.4%, 65% 0.6%, 
            70% 0.3%, 75% 0.5%, 80% 0.4%, 85% 0.6%, 90% 0.3%, 94% 0.5%, 97% 0.6%, 99.5% 0.8%,
            99.7% 5%, 99.5% 10%, 99.6% 15%, 99.4% 20%, 99.6% 25%, 99.4% 30%, 99.5% 35%,
            99.4% 40%, 99.6% 45%, 99.5% 50%, 99.6% 55%, 99.4% 60%, 99.5% 65%, 99.4% 70%,
            99.6% 75%, 99.5% 80%, 99.6% 85%, 99.4% 90%, 99.6% 95%, 99.7% 98%,
            97% 99.6%, 94% 99.5%, 90% 99.4%, 85% 99.6%, 80% 99.5%, 75% 99.6%, 70% 99.4%,
            65% 99.5%, 60% 99.4%, 55% 99.6%, 50% 99.5%, 45% 99.6%, 40% 99.4%, 35% 99.5%,
            30% 99.4%, 25% 99.6%, 20% 99.4%, 15% 99.6%, 10% 99.4%, 6% 99.6%, 3% 99.5%, 0.5% 99.4%,
            0.4% 95%, 0.5% 90%, 0.4% 85%, 0.6% 80%, 0.4% 75%, 0.5% 70%, 0.4% 65%,
            0.6% 60%, 0.5% 55%, 0.4% 50%, 0.5% 45%, 0.6% 40%, 0.4% 35%, 0.5% 30%,
            0.4% 25%, 0.6% 20%, 0.4% 15%, 0.5% 10%, 0.4% 5%
          );
        }

        .newspaper-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(232, 220, 192, 0.2);
          pointer-events: none;
          z-index: 0;
        }

        header,
        .story-content {
          position: relative;
          z-index: 1;
        }

        header {
          text-align: center;
          border-bottom: 2px solid #333;
          margin-bottom: 20px;
          padding-bottom: 10px;
        }

        .header-line {
          font-family: 'IM Fell English', serif;
          font-weight: 700;
          font-size: 1.5em;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #333;
        }

        hr.header-rule {
          border: 0;
          height: 1px;
          background: #333;
          margin: 10px 0;
        }

        hr.double {
          height: 3px;
          border-top: 1px solid #333;
          border-bottom: 1px solid #333;
        }

        h1 {
          font-family: 'Rye', cursive;
          font-size: 6em;
          color: #222;
          margin: 0;
          line-height: 1;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }

        .sub-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.9em;
          color: #444;
          padding: 5px 10px;
          text-transform: uppercase;
        }

        .story-content {
          column-count: 3;
          column-gap: 25px;
          column-rule: 1px solid #8c6d4f;
          font-size: 13pt;
          line-height: 1.4;
          color: #222;
          text-align: justify;
        }

        .story-content p {
          text-indent: 0;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .story-content p i {
          color: #333;
          font-family: 'IM Fell English', italic;
        }

        .image-container {
          break-inside: avoid;
          text-align: center;
          margin: 15px 0;
        }

        .image-container img {
          max-width: 100%;
          width: 100%;
          padding-top: 15px;
          padding-bottom: 15px;
          height: auto;
          display: block;
          margin: 0 auto;
          opacity: 0.8;
          mix-blend-mode: multiply;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .image-container img:hover {
          transform: scale(1.02);
          opacity: 1;
        }

        .gallery-modal {
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: rgba(10, 8, 5, 0.98);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .film-strip-container {
          max-width: 90%;
          max-height: 85vh;
          position: relative;
          box-shadow: 0 0 100px rgba(200, 180, 150, 0.1);
        }

        .film-strip {
          background-color: #1a1a1a;
          padding: 35px 15px;
          border-radius: 2px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
          position: relative;
          display: inline-block;
        }

        .film-strip::before, .film-strip::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 20px;
          background-image: radial-gradient(#e8dcc0 40%, transparent 45%);
          background-size: 25px 25px;
          background-repeat: repeat-x;
          opacity: 0.7;
        }

        .film-strip::before {
          top: 5px;
        }

        .film-strip::after {
          bottom: 5px;
        }

        .gallery-content {
          display: block;
          max-width: 100%;
          max-height: 70vh;
          width: auto;
          object-fit: contain;
          border: 1px solid #333;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 40px;
          color: #e8dcc0;
          font-size: 60px;
          font-weight: bold;
          cursor: pointer;
          font-family: 'IM Fell English', serif;
          z-index: 1001;
        }

        .prev-btn, .next-btn {
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #e8dcc0;
          font-weight: bold;
          font-size: 50px;
          padding: 20px;
          user-select: none;
          font-family: 'IM Fell English', serif;
          z-index: 1001;
          text-shadow: 0 0 10px rgba(0,0,0,0.8);
        }

        .next-btn { right: 20px; }
        .prev-btn { left: 20px; }

        .prev-btn:hover, .next-btn:hover {
          color: #fff;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 900px) {
          .story-content {
            column-count: 2;
          }
          h1 {
            font-size: 4.5em;
          }
        }

        @media (max-width: 600px) {
          .story-content {
            column-count: 1;
          }
          h1 {
            font-size: 3.5em;
          }
          .sub-header {
            flex-direction: column;
            align-items: center;
            gap: 5px;
          }
          body {
            padding: 10px;
          }
          .newspaper-container {
            padding: 15px;
          }
        }
      `}</style>

      <div className="newspaper-container">
        <header>
          <div className="header-line">The Indigo Dispatch</div>
          <hr className="header-rule double" />
          <h1>Vengeance of the West</h1>
          <hr className="header-rule double" />
          <div className="sub-header">
            <span className="author">By Karishma Pilla</span>
            <span className="date">October 21, 1888</span>
          </div>
          <hr className="header-rule single" />
        </header>

        <main className="story-content">
          <div className="image-container">
            <img src={images[0].src} alt={images[0].alt} onClick={() => openModal(0)} />
          </div>

          <p>They said she rode the wind and burned like fire, but only the guilty ever felt her coming. The sheriff didn't believe in these made-up stories. The saloon was packed tight that night. Smoke curled into the air like snakes, and the piano ground out some familiar, off-tune melody. The scent of spilled whiskey was thick enough to choke a mule.</p>

          <p>The sheriff had just won his third hand of poker when the doors creaked open and silence followed like a disease. Old Cobb limped inside, a dirty shawl covering his body. He pursed his lips and shook his head as everyone stared. Cobb stared straight at the sheriff.</p>

          <p>"She's here. The Outlaw. They found that old banker dead last night."</p>

          <p>The sheriff laughed and raised his glass. "You've been drinking too much snake oil, Cobb. Go on your way now,"</p>

          <p>Cobb didn't move. He simply smiled at the sheriff. "You know, Sheriff, she only goes after people who've sold their souls. She doesn't kill good, honest men. I'd keep that in mind."</p>

          <p>The smile dropped off the sheriff's face, and a sneer came onto his face as he waved Cobb away. That old man had no clue what he was talking about. The sheriff continued at his game. He pulled out a wad of cash from his vest, half of the town's rent money that he had collected the day before last. He slid it into the pool with a smile. The other players simply tilted their hats, grinning. The sheriff knew he would win. He always did. This town was funding his own pockets better than his real salary, or any other job.</p>

          <p>Just as he was about to raise the bet, he felt it. A presence behind him, eyes burning into the back of his neck. He turned around, but all he saw was a flicker of a dark shadow, before it cleared to reveal the usual wall of the saloon.</p>

          <div className="image-container">
            <img src={images[1].src} alt={images[1].alt} onClick={() => openModal(1)} />
          </div>

          <p>The players guffawed. "Alright, Sheriff. Now you're really playing into Cobb's nonsense,"</p>

          <p>The sheriff laughed it off, but something didn't feel right. When he left, the sun was already rising, the echo of laughter still clawing at his back.</p>

          <p>The sun hung low and red, casting long shadows that clung to the dirt like stains that wouldn't wash out. The sheriff's boots crunched against gravel as he walked down the narrow street behind the bank, where the sun couldn't reach. That's where the real business of the town was done. Out of sight, out of law.</p>

          <div className="image-container">
            <img src={images[4].src} alt={images[4].alt} onClick={() => openModal(4)} />
          </div>

          <p>A man was already waiting there, face hidden under a broad-brimmed hat. As the sheriff approached him, the man withdrew a thick envelope, and just by the sweet smell, the sheriff could tell what it was.</p>

          <p>"Two thousand," the man said, handing the envelope over. "And you forget about the eviction notice."</p>

          <p>The sheriff smiled, gold teeth glinting in the early morning sun. "Pleasure doing business with you,"</p>

          <p>He slipped the envelope into his coat, ready to turn away, when a cold wind hissed through the alley. An oil lamp that had been lit the night before flickered once, then went out.</p>

          <p>"What the hell?" the sheriff muttered, drawing his gun. The other man was gone. Had he walked away so quickly? The sheriff hadn't heard footsteps, no goodbye. Only the whisper of boots dragging over dirt. The sheriff spun, eyes darting around the narrow alley. "Who's there?"</p>

          <p>The wind carried a low sound. The sheriff strained his ears to hear it. It was laughter. He tried listening closer, when a sound, a voice became clear.</p>

          <p>"You're next, Sheriff,"</p>

          <p>He aimed his pistol at the shifting shadows, trying to pinpoint the soft, lilting voice. Nothing. Just the shapes of barrels and the uneven wall. He holstered his gun and hurried out of the alley, the image of Cobb's smirk gnawing at the back of his mind. <i>She only goes after people who've sold their souls.</i></p>

          <p>Over the next few days, things started to unravel. The banker's body was still laid out at the undertaker's, and word spread of more deaths. Two men from the sheriff's crew, found cold and stiff near the mines. Each had the same mark burned faintly into their palms: a single blackened circle, like the muzzle of a gun pressed too long against flesh.</p>

          <p>By then, the sheriff had stopped sleeping. He caught glimpses of the Outlaw everywhere. A flash of a veil in the window, the glint of spurs outside his door, a woman's shadow standing still at the edge of a lantern's reach. He'd whirl around and find only emptiness.</p>

          <p>The townsfolk noticed. They didn't whisper much anymore when he passed-they just stared, the kind of stare that meant they were already imagining, hoping for life without him.</p>

          <p>It was nearing dusk when he decided to run. The desert looked endless from his porch, a gray ocean of dust and wind. He saddled his horse with shaking hands, threw a saddlebag over, and mounted up.</p>

          <p>But as he rode out past the gallows, the air changed. It was heavier, quieter, weighing down on his lungs. Even the wind seemed to hold its breath. That's when he saw her.</p>

          <p>She stood in the middle of the road, dark veil fluttering in the still air, hat pulled low over her face. The setting sun bled behind her, turning her silhouette into half woman, half smoke.</p>

          <p>The sheriff yanked on the reins, heart pounding in his throat. "You stay back now," he said, voice cracking. "I don't know who you are, but you stay the hell back."</p>

          <p>She didn't move.</p>

          <p>He slid off his horse and raised his pistol, determined to get rid of her. "You think you're some kind of savior? You think you can scare me?"</p>

          <p>Her voice, when it came, was soft. "You scared yourself, Sheriff."</p>

          <p>The gun slipped in his sweaty hand and fell into the sand. He scrambled to pick it back up.</p>

          <p>"They said you sold your soul for silver," she went on, stepping closer. "But I don't come for souls. I come for debts."</p>

          <div className="image-container">
            <img src={images[3].src} alt={images[3].alt} onClick={() => openModal(3)} />
          </div>

          <p>The sheriff's breath came fast. "You aren't real."</p>

          <p>Her head tilted. "Neither is the justice you deal."</p>

          <p>He aimed the revolver and fired. The bullet cut through smoke. When the haze cleared, she was gone. Only the echo of her boots followed him. Closer, closer, until the sound was right behind him.</p>

          <p>The sheriff tried to turn, tried to run, but something cold pressed against his back. A whisper brushed his ear.</p>

          <p>"This town remembers."</p>

          <p>The desert wind howled once more, carrying off the echo of a single gunshot.</p>

          <p>By morning, they found the sheriff's horse grazing by the gallows. No sign of him. Only his badge lying face down in the dirt, blackened around the edges.</p>

          <p>Some said it was the Outlaw who came for him. Others said he finally faced the weight of what he'd done. But either way, the town was quiet for the first time in years. And when the wind blew through the streets, it carried a strange calm-like the land itself had taken back what was owed.</p>
        </main>
      </div>

      {modalOpen && (
        <div className="gallery-modal" onClick={(e) => {
          if (e.target.className === 'gallery-modal') closeModal();
        }}>
          <span className="close-btn" onClick={closeModal}>&times;</span>
          <span className="prev-btn" onClick={showPrev}>&#10094;</span>
          <span className="next-btn" onClick={showNext}>&#10095;</span>
          
          <div className="film-strip-container">
            <div className="film-strip">
              <img className="gallery-content" src={images[currentIndex].src} alt={images[currentIndex].alt} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}