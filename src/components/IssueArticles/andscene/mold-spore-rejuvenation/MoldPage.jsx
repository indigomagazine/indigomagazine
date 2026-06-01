import { useState, useEffect } from 'react'
import PetriDish from './PetriDish.jsx'
import "./MoldPage.css"

let paperIndex = 0;

const MoldPage = () => {
    let audio = new Audio("./paper_shuffling.mp3");
    /* States for clickable elements (petri dish, papers) */
    const [isFirstFlipped, setFirstFlipped] = useState(false);
    const [isSecondFlipped, setSecondFlipped] = useState(false);
    const [isThirdFlipped, setThirdFlipped] = useState(false);
    const [isFourthFlipped, setFourthFlipped] = useState(false);

    const [isFirstShuffled, setFirstShuffled] = useState(false);
    const [isSecondShuffled, setSecondShuffled] = useState(false);
    const [isThirdShuffled, setThirdShuffled] = useState(false);
    const [isFourthShuffled, setFourthShuffled] = useState(false);

    const [isMobile, setIsMobile] = useState(false);
    
    const petriStyles = [
        {
            top: isMobile ? "" : "13vh", 
            left: isMobile ? "" : "34vw",
            marginBottom: isMobile ? "50px" : "0"
        },
        {
            top: isMobile ? "" : "2vh",
            left: isMobile ? "" : "57vw",
            marginBottom: isMobile ? "75px" : "0"
        },
        {
            top: isMobile ? "" : "32vh",
            left: isMobile ? "" : "78vw",
            marginBottom: isMobile ? "50px" : "0"
        },
        {
            top: isMobile ? "" : "52vh",
            left: isMobile ? "" : "51vw",
            marginBottom: isMobile ? "50px" : "0"
        }
    ];

    const overlayStyles = [
        {
            top: "-154px", 
            left: "-133px"
        },
        {
            top: "-75px",
            left: "-73px",
            height: "425px",
            width: "425px"
        },
        { 
            top: "-150px", 
            height: "425px", 
            width: "425px"
        },
        {
            top: "-32px",
            left: "-120px"
        }
    ];


    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1000);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
    <div className="mold-page-wrapper">
        <div className="paper-wrapper">
            <ul className={`paper-list ${(paperIndex>4) ? "no-hover" : ""}`} onClick={() => {
                paperIndex++;
                if (paperIndex===1) {
                    setFirstShuffled(true);
                    audio.play();
                }
                else if (paperIndex===2) {
                    setSecondShuffled(true);
                    audio.play();
                }
                else if (paperIndex===3) {
                    setThirdShuffled(true);
                    audio.play();
                }
                else if (paperIndex===4) {
                    setFourthShuffled(true);
                    audio.play();
                }
            }}>
                <li className={`paper-list__item ${isFirstShuffled ? 'is-animated' : ''}`} data-paper="0">
                    <div className="paper"></div>
                </li>
                <li className={`paper-list__item ${isSecondShuffled ? 'is-animated' : ''}`} data-paper="1">
                    <div className="paper"></div>
                </li>
                <li className={`paper-list__item ${isThirdShuffled ? 'is-animated' : ''}`} data-paper="2">
                    <div className="paper"></div>
                </li>
                <li className={`paper-list__item ${isFourthShuffled ? 'is-animated' : ''}`} data-paper="3">
                    <div className="paper">
                        <p>Mold Spore Rejuvenation<br />Written by: Zayeed A.</p>
                    </div>
                </li>
            </ul>
        </div>
        <div className="petri-wrapper">
            <div className={`petri-dish ${isFirstFlipped ? 'flipped' : ''}`} onClick={() => {setFirstFlipped(true)}} style={petriStyles[0]}>
                <PetriDish
                  imgFront="./images/final-petris/mold-pink.png"
                  imgBack="./images/final-petris/mold-pink-nomodel.png"
                  imgOverlay="./images/final-petris/mold-pink-mold.png"
                  overlayPosition={ overlayStyles[0] }
                  isActive={isFirstFlipped}
                />
            </div>
            <div className={`petri-dish ${isSecondFlipped ? 'flipped' : ''}`} onClick={() => {setSecondFlipped(true)}} style={petriStyles[1]} >
                <PetriDish
                  imgFront="./images/final-petris/mold-blue.png"
                  imgBack="./images/final-petris/mold-blue-nomodel.png"
                  imgOverlay="./images/final-petris/mold-blue-mold.png"
                  overlayPosition={ overlayStyles[1] }
                  isActive={isSecondFlipped}
                />
            </div>
            <div className={`petri-dish ${isThirdFlipped ? 'flipped' : ''}`} onClick={() => {setThirdFlipped(true)}} style={petriStyles[2]} >
                <PetriDish
                  imgFront="./images/final-petris/mold-green.png"
                  imgBack="./images/final-petris/mold-green-nomodel.png"
                  imgOverlay="./images/final-petris/mold-green-mold.png"
                  overlayPosition={ overlayStyles[2] }
                  isActive={isThirdFlipped}
                />
            </div>
            <div className={`petri-dish ${isFourthFlipped ? 'flipped' : ''}`} onClick={() => {setFourthFlipped(true)}} style={petriStyles[3]}>
                <PetriDish
                  imgFront="./images/final-petris/mold-purp.png"
                  imgBack="./images/final-petris/mold-purp-nomodel.png"
                  imgOverlay="./images/final-petris/mold-purp-mold.png"
                  overlayPosition={ overlayStyles[3] }
                  isActive={isFourthFlipped}
                />
            </div>
        </div>
    </div>
    );
}

export default MoldPage;