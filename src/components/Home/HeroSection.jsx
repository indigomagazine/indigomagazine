
const HeroSection = () => {
    // Vite handles the base path. For assets in 'public', we should use absolute paths
    const videoPath = "/legacy/assets/hero%20videos/V-day.mp4";
    const posterPath = "/legacy/assets/hero%20videos/fallback.jpg";

    // Import SVG directly (Vite handles space in filename string)
    const heroTitleUrl = new URL('../../assets/logos/Hero Title.svg', import.meta.url).href;

    return (
        <div className="hero-scroll-track">
            <section className="home-hero">
                <div className="overlay"></div>
                {/* SVG Title Overlay */}
                <img
                    src={heroTitleUrl}
                    className="hero-title-svg"
                    alt="Indigo Magazine - Your Valentine"
                />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={posterPath}
                >
                    <source
                        src={videoPath}
                        type="video/mp4"
                    />
                </video>
            </section>
        </div>
    );
};

export default HeroSection;
