import { useState, useEffect } from "react";
import heroTitleSrc from "../../assets/logos/HeroTitle.svg";

// Import Hero Images
import bunny2 from "../../assets/logos/bunny2.JPG";
import duo3 from "../../assets/logos/duo3.JPG";
import group2 from "../../assets/logos/group2.JPG";
import group3 from "../../assets/logos/Group3.JPG";
import mirror from "../../assets/logos/mirror.JPG";

const HERO_IMAGES = [bunny2, duo3, group2, group3, mirror];

const HeroSection = () => {
    const [heroImage, setHeroImage] = useState(null);

    useEffect(() => {
        // Select a random image on mount to avoid hydration mismatch (if SSR) 
        // or just to ensure it changes on reload.
        const randomIndex = Math.floor(Math.random() * HERO_IMAGES.length);
        setHeroImage(HERO_IMAGES[randomIndex]);
    }, []);

    if (!heroImage) return null; // Avoid flash of empty or wrong content

    return (
        <div className="hero-scroll-track">
            <div className="home-hero">
                <div className="overlay"></div>

                {/* Random Hero Image */}
                <img
                    src={heroImage}
                    alt="Hero Background"
                    className="hero-bg-image"
                />

                {/* Hero Title Image */}
                <img
                    src={heroTitleSrc}
                    alt="Indigo Magazine - What kind of Valentine are you?"
                    className="hero-title-svg"
                />
            </div>
        </div>
    );
};

export default HeroSection;
