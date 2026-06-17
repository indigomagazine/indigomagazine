import { useState, useRef, useEffect } from 'react';
import "./css/slideshow.css";

const SlideshowContainer = ({slides}) => {
    const slideshow = slides.map((slide, index) => (
        <img className="slide-img" key={ index } src={slide.src} align="middle" />
    ));
    const slideshowSize = slides.length;
    const [index, setIndex] = useState(0);

    const timeoutRef = useRef(null);
    const delay = 15000;
    const [touchPosition, setTouchPosition] = useState(null);

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        /* Go back to previous slide, swiping to prev */
        if (diff < -5) {
            (index > 0) ? setIndex(index - 1) : setIndex(slideshowSize - 1);
            renderDots((index > 0) ? index - 1 : slideshowSize - 1);
            currentImg((index > 0) ? index - 1 : slideshowSize - 1);
        }

        /* Advance to next slide, swiping to next */
        if (diff > 5) {
            (index < slideshowSize - 1) ? setIndex(index + 1) : setIndex(0);
            renderDots((index < slideshowSize - 1) ? index + 1 : 0);
            currentImg((index < slideshowSize - 1) ? index + 1 : 0);
        }

        setTouchPosition(null);
    }

    const resetTimeout = () => {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
    }

    const renderDots = (num) => {
        const dots = document.getElementsByClassName("dot");
        for (let i = 0; i < slideshowSize; i++)
            dots[i].className = (i === num) ? "dot active" : "dot";
    };

    const currentImg = (num) => {
        const imgs = document.getElementsByClassName("slide-img");
        for (let i = 0; i < slideshowSize; i++)
            imgs[i].className = (i === num) ? "slide-img current" : "slide-img";
    };

    useEffect(() => {
        renderDots(index);
        currentImg(index);
        resetTimeout();
        timeoutRef.current = setTimeout(() =>
            setIndex((currentIndex) =>
                currentIndex === slideshowSize - 1 ? 0 : currentIndex + 1
            ),
        delay
        );
        return () => {resetTimeout();};
    }, []);

    return (
        <div className="slideshow-wrapper">
            <div className="slideshow-container centered" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                { slideshow }
            </div>

            <a className="prev" 
                onClick={() => {
                    (index > 0) ? setIndex(index - 1) : setIndex(slideshowSize - 1);
                    renderDots((index > 0) ? index - 1 : slideshowSize - 1);
                    currentImg((index > 0) ? index - 1 : slideshowSize - 1);
            }}>
                &#10094;
            </a>
            <a className="next" 
                onClick={() => {
                    (index < slideshowSize - 1) ? setIndex(index + 1) : setIndex(0);
                    renderDots((index < slideshowSize - 1) ? index + 1 : 0);
                    currentImg((index < slideshowSize - 1) ? index + 1 : 0);
            }}>
                &#10095;
            </a>

            <div className="dot-container centered">
                {slideshow.map((_, idx) => (
                    <div key={ idx } className={`dot${(index === idx) ? " active" : ""}`} onClick={() => {
                        (index < slideshowSize - 1) ? setIndex(index + 1) : setIndex(0);
                        renderDots((index < slideshowSize - 1) ? index + 1 : 0);
                        currentImg((index < slideshowSize - 1) ? index + 1 : 0);
                    }}></div>
                ))}
            </div>
        </div>
    );
};

export default SlideshowContainer;