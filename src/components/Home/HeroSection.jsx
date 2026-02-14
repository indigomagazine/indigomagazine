
const HeroSection = () => {
    return (
        <section className="home-hero">
            <div className="overlay"></div>
            <video
                autoPlay
                muted
                loop
                playsInline
                poster="/legacy/assets/hero videos/fallback.jpg"
            >
                <source
                    src="/legacy/assets/hero videos/v-day.vid.mp4"
                    type="video/mp4"
                />
            </video>
        </section>
    );
};

export default HeroSection;
