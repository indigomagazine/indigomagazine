import { useState, useEffect, useRef } from "react";
import styles from "./lifeinparadise.module.css";
import "../../../../styles/style.css";
const cover = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/cover.png";
const page1 = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%201.png";
const page2 = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%202.png";
const page3 = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%203_.png";
const page4 = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%204.png";
const page5 = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%205.png";
const page6 = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%206.png";
const page7 = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%207.png";
const page8 = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%208.png";
const backcover = "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/back%20cover.png";


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
        <div className={styles.viewer} style={{ cursor: "auto" }}>
            <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.backgroundVideo}
            >
                <source src="https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/group9vid.mp4" type="video/mp4" loading = "lazy" />
            </video>
            <div
                className={styles.imageContainer}
                ref={containerRef}
                onClick={handlePageClick}
                style={{ cursor: "pointer" }}
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
                            style={{ cursor: canGoPrev ? "pointer" : "default" }}
                        />
                        {currentIndex + 1 < images.length && (
                            <img
                                src={images[currentIndex + 1]}
                                alt={`Page ${currentIndex + 1}`}
                                className={`${styles.halfImage} ${styles.rightPage}`}
                                style={{ cursor: canGoNext ? "pointer" : "default" }}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}