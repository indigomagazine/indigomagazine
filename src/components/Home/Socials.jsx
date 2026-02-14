
const Socials = () => {
    const socials = [
        { name: "Pinterest", url: "https://pin.it/29ELT8gzs", img: "/legacy/assets/socials/pint.jpg" },
        { name: "Instagram", url: "https://www.instagram.com/utdindigo/", img: "/legacy/assets/socials/inst.png" },
        { name: "TikTok", url: "https://www.tiktok.com", img: "/legacy/assets/socials/tik.jpg" },
        { name: "Spotify", url: "https://open.spotify.com/user/316ijys7qrsyxqfsd4o5yfrmvtuu?si=b59bc6b18e024035", img: "/legacy/assets/socials/spot.png" },
        { name: "Gmail", url: "mailto:indigomagazineutd@gmail.com", img: "/legacy/assets/socials/gmail.webp" }
    ];

    return (
        <footer className="home-socials">
            {socials.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={social.img} alt={social.name} />
                </a>
            ))}
        </footer>
    );
};

export default Socials;
