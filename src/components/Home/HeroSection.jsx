import { useState, useEffect } from "react";
import heroTitleSrc from "../../assets/logos/HeroTitle.svg";
import heroConfig from "../../data/hero-config.json";

// Import all hero images dynamically using Vite
const allHeroImagesMap = import.meta.glob("../../assets/heroImages/**/*.{png,jpg,jpeg,JPG,PNG}", { eager: true });

// Filter images based on the active group defined in config
const getActiveHeroImages = () => {
    const activeGroup = (heroConfig.activeGroup || "default").toLowerCase();
    let activeImages = [];

    for (const path in allHeroImagesMap) {
        // Determine whether to use group subfolders (all, or specific group)
        if (activeGroup === "all" || path.toLowerCase().includes(`/heroImages/${activeGroup}/`.toLowerCase())) {
            const mod = allHeroImagesMap[path];
            activeImages.push(mod.default || mod);
        }
    }

    // If the folder was misnamed or empty, fallback to ALL images so the hero isn't a blank void
    if (activeImages.length === 0) {
        for (const path in allHeroImagesMap) {
            const mod = allHeroImagesMap[path];
            activeImages.push(mod.default || mod);
        }
    }

    return activeImages;
};

const HERO_IMAGES = getActiveHeroImages();

const HeroSection = () => {
    const [heroImage, setHeroImage] = useState(null);

    useEffect(() => {
        if (HERO_IMAGES.length === 0) return;

        const lastIndex = localStorage.getItem("last_hero_index");
        let randomIndex = Math.floor(Math.random() * HERO_IMAGES.length);

        // Ensure we don't show the same image twice in a row if possible
        if (lastIndex !== null && HERO_IMAGES.length > 1) {
            const lastIdxNum = parseInt(lastIndex, 10);
            if (randomIndex === lastIdxNum) {
                randomIndex = (randomIndex + 1) % HERO_IMAGES.length;
            }
        }

        setHeroImage(HERO_IMAGES[randomIndex]);
        localStorage.setItem("last_hero_index", randomIndex.toString());
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
                    alt="Indigo Magazine"
                    className="hero-title-svg"
                />
            </div>
        </div>
    );
};

export default HeroSection;
