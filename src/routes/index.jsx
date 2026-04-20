import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Taskbar from "../components/Home/Taskbar";
import HeroSection from "../components/Home/HeroSection";
import Socials from "../components/Home/Socials";
import { FeaturedPromo } from "../components/Home/FeaturedPromo";
import "../styles/homepage.css"

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
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

  return (
    <div className="home-container">
      <Taskbar />

      <HeroSection />

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "dark" ? "☼" : "☾"}
      </button>

      <main className="main-content">
        <FeaturedPromo theme={theme} />

        {/* Spotify Section */}
        <section className="home-spotify">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/63edkl5oqDuaOr89BJv1p7?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <div className="kismet-notes" style={{ color: theme === "dark" ? "white" : "black" }}>
            <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>And Scene….</p>
            <p>
              There’s a moment from a movie that keeps playing in our heads. 
              There’s new beginnings, new endings too. I don’t know where I’m going; I know where I’ll be though. 
            </p>
            <p>
              <em>  Turning page, turning tides. <br /> Look around and play up the stage.<br /></em>
            </p>
            <p>
              <strong>  Everyone wants to know the end but they have to wait for the last page.
              </strong>
            </p>
          </div>
        </section>
      </main>

      <Socials />
    </div>
  );
}
