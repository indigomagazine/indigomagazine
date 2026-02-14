import videoSrc from "../../assets/hero-videos/V-day.mp4";
import posterSrc from "../../assets/logos/group2.JPG";
import heroTitleSrc from "../../assets/logos/HeroTitle.svg";

const HeroSection = () => {
    return (
        <div className="hero-scroll-track">
            <div className="home-hero">
                <div className="overlay"></div>

                {/* Video Background */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={posterSrc}
                >
                    <source src={videoSrc} type="video/mp4" />
                    {/* Add more sources if needed */}
                </video>

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
