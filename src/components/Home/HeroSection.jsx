
const HeroSection = () => {
    // Vite handles the base path. For assets in 'public', we should use absolute paths
    // but ensure spaces are encoded as %20 for production server compatibility.
    const videoPath = "/legacy/assets/hero%20videos/v-day.vid.mp4";
    const posterPath = "/legacy/assets/hero%20videos/fallback.jpg";

    return (
        <section className="home-hero">
            <div className="overlay"></div>
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
    );
};

export default HeroSection;
