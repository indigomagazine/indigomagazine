import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import SlideshowContainer from "../components/Slideshow/SlideshowContainer.jsx";
import Taskbar from "../components/Home/Taskbar";

export const Route = createFileRoute("/slideshow")({
  component: Slideshow,
});

function Slideshow() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const images = [
        "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/a%20number%20out%20of%20place/REN_1404%20copy.jpg')",
        "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/covet/clothes-1.1.JPG')",
        "url('https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/i%20love%20shopping/BF5T7721.jpg')",
        "/legacy/article photos/western/hat.png",
        "/legacy/article photos/western/wantedPoster.png",
    ]
    
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.classList.toggle("light-mode", newTheme === "light");
    };

    useEffect(() => {
        document.body.classList.toggle("light-mode", theme === "light");
    }, [theme]);

    return (
        <div>
            <Taskbar />
            <SlideshowContainer slides={ images } />
            <button onClick={toggleTheme} className="change-mode">
                {theme === "dark" ? "☼ / ☾" : "☼ / ☾"}
            </button>
        </div>
    );
}
