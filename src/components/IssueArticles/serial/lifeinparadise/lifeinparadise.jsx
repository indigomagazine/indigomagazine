import { useState, useEffect, useRef } from "react";
import styles from "./lifeinparadise.module.css";
import cover from "../../../../assets/serial photos/group9/cover.png";
import page1 from "../../../../assets/serial photos/group9/page 1.png";
import page2 from "../../../../assets/serial photos/group9/page 2.png";
import page3 from "../../../../assets/serial photos/group9/page 3_.png";
import page4 from "../../../../assets/serial photos/group9/page 4.png";
import page5 from "../../../../assets/serial photos/group9/page 5.png";
import page6 from "../../../../assets/serial photos/group9/page 6.png";
import page7 from "../../../../assets/serial photos/group9/page 7.png";
import page8 from "../../../../assets/serial photos/group9/page 8.png";
import backcover from "../../../../assets/serial photos/group9/back cover.png";
import handIdle from "../../../../assets/cursors/hand.png"

const images = [
    cover,
    page1, 
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    backcover
];

export default function LifeInParadise() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    
    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex >= images.length - 1) return prevIndex;
            if (prevIndex === 0) return prevIndex + 1;
            return prevIndex + 2;
        });
    }
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex <= 0) return prevIndex;
            if (prevIndex === 1) return prevIndex - 1;
            return prevIndex - 2;
        });
    }
    
    const handlePageClick = (e) => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX - containerRect.left;
        const containerWidth = containerRect.width;
        
        if (clickX < containerWidth / 2) {
            handlePrev();
        } else {
            handleNext();
        }
    }
    
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: 0,
                behavior: "smooth"
            });
        }
    }, [currentIndex]);
    
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < images.length - 1;
    
    return (
        <div className={styles.viewer} style={{ cursor: `url(${handIdle}), auto` }}>
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className={styles.backgroundVideo}
            >
                <source src="https://raw.githubusercontent.com/indigomagazine/website_images/aacaf7cb745a668672aad04efaa99aae2eae98c0/videos/group9vid.mp4" type="video/mp4" />
            </video>
            <div 
                className={styles.imageContainer} 
                ref={containerRef}
                onClick={handlePageClick}
                style={{ cursor: `url(${handIdle}), pointer` }}
            >
                {currentIndex === 0 ? (
                    <img src={images[0]} alt="Cover" className={styles.singleImage} />
                ) : currentIndex === images.length - 1 ? (
                    <img src={images[images.length - 1]} alt="Back Cover" className={styles.singleImage} />
                ) : (
                    <div className={styles.doubleImage}>
                        <img 
                            src={images[currentIndex]} 
                            alt={`Page ${currentIndex}`} 
                            className={`${styles.halfImage} ${styles.leftPage}`}
                            style={{ cursor: canGoPrev ? `url(${handIdle}), pointer` : 'default' }}
                        />
                        {currentIndex + 1 < images.length && (
                            <img 
                                src={images[currentIndex + 1]} 
                                alt={`Page ${currentIndex + 1}`} 
                                className={`${styles.halfImage} ${styles.rightPage}`}
                                style={{ cursor: canGoNext ? `url(${handIdle}), pointer` : 'default' }}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}