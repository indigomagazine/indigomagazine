import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Taskbar from "../components/Home/Taskbar";

export const Route = createFileRoute("/visual-arts")({
    component: VisualArts,
});

function VisualArts() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.classList.toggle("light-mode", newTheme === "light");
    };

    useEffect(() => {
        document.body.classList.toggle("light-mode", theme === "light");
    }, [theme]);

    useEffect(() => {
        const floatingPhotos = document.querySelectorAll(".floating-photo-wrapper");
        const positions = [];

        const isOverlapping = (x, y, size) => {
            return positions.some(
                (pos) =>
                    x < pos.x + size &&
                    x + size > pos.x &&
                    y < pos.y + size &&
                    y + size > pos.y
            );
        };

        floatingPhotos.forEach((photo) => {
            let randomX, randomY;
            const size = 250; // Approximating size from CSS (250px)

            // Generate random positions, avoiding overlap (max 50 tries to prevent infinite loop)
            let tries = 0;
            do {
                randomX = Math.floor(Math.random() * (window.innerWidth - size));
                randomY = Math.floor(Math.random() * (window.innerHeight - size));
                tries++;
            } while (isOverlapping(randomX, randomY, size) && tries < 50);

            positions.push({ x: randomX, y: randomY });
            photo.style.left = `${randomX}px`;
            photo.style.top = `${randomY}px`;

            // Add randomized animation delay for natural staggered motion
            const randomDelay = Math.random() * 2; // Between 0-2 seconds
            photo.style.animationDelay = `${randomDelay}s`;
        });

        // Smooth mouse movement interaction
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let animationFrameId;

        const smoothMove = () => {
            // Gradual interpolation to target positions
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            floatingPhotos.forEach((wrapper, index) => {
                const offsetX = currentX / (10 + index); // Gradual movement scaling
                const offsetY = currentY / (10 + index);
                wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });

            animationFrameId = requestAnimationFrame(smoothMove);
        };

        const handleMouseMove = (event) => {
            targetX = event.clientX - window.innerWidth / 2;
            targetY = event.clientY - window.innerHeight / 2;
        };

        const handleTouchMove = (event) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                targetX = touch.clientX - window.innerWidth / 2;
                targetY = touch.clientY - window.innerHeight / 2;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        // Start animation loop
        smoothMove();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="visual-arts-page">
            <button onClick={toggleTheme} className="change-mode">
                {theme === "dark" ? "☼ / ☾" : "☼ / ☾"}
            </button>

            <Taskbar />

            <div className="photo-container">
                <div className="floating-photo-wrapper">
                    <Link to="/articles/serial/anumberoutofplace">
                        <div
                            className="floating-photo"
                            style={{ backgroundImage: "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/a%20number%20out%20of%20place/REN_1404%20copy.jpg')" }}
                        ></div>
                    </Link>
                </div>

                <div className="floating-photo-wrapper">
                    <Link to="/articles/serial/covet">
                        <div
                            className="floating-photo"
                            style={{ backgroundImage: "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/covet/clothes-1.1.JPG')" }}
                        ></div>
                    </Link>
                </div>

                <div className="floating-photo-wrapper">
                    <Link to="/articles/serial/iloveshopping">
                        <div
                            className="floating-photo"
                            style={{ backgroundImage: "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/i%20love%20shopping/BF5T7721.jpg')" }}
                        ></div>
                    </Link>
                </div>

                <div className="floating-photo-wrapper">
                    <Link to="/articles/serial/keyboards">
                        <div
                            className="floating-photo"
                            style={{
                                backgroundImage:
                                    "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/keyboards/nolan%202.png')",
                            }}
                        ></div>
                    </Link>
                </div>

                <div className="floating-photo-wrapper">
                    <Link to="/articles/serial/lifeinparadise">
                        <div
                            className="floating-photo"
                            style={{ backgroundImage: "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%201.png')" }}
                        ></div>
                    </Link>
                </div>

                <div className="floating-photo-wrapper">
                    <Link to="/articles/serial/western">
                        <div
                            className="floating-photo"
                            style={{ backgroundImage: "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/vengeance%20of%20the%20west/both.png')" }}
                        ></div>
                    </Link>
                </div>

                <div className="floating-photo-wrapper">
                    <Link to="/articles/serial/youcantwisttime">
                        <div
                            className="floating-photo"
                            style={{ backgroundImage: "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/you%20can%20twist%20time/final_edited3.png')" }}
                        ></div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
