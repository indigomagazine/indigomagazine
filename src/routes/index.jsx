import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import Taskbar from "../components/Home/Taskbar";
import HeroSection from "../components/Home/HeroSection";
import Socials from "../components/Home/Socials";
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

  const quizRef = useRef(null);
  const [isQuizVisible, setIsQuizVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility to trigger animation restart
        setIsQuizVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (quizRef.current) {
      observer.observe(quizRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      <Taskbar />

      <HeroSection />

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "dark" ? "☼" : "☾"}
      </button>

      <main className="main-content">
        {/* Quiz Promo Section - Replacing Featured Article */}
        <section ref={quizRef} className={`quiz-promo-section ${isQuizVisible ? 'is-visible' : ''}`}>
          <h2 className="quiz-main-title">
            <span>What kind of Valentine</span> <br className="desktop-only" /> <span>are you?</span>
          </h2>
          <div className="quiz-line-black"></div>

          <button
            className="quiz-take-button"
            onClick={() => {
              import("../analytics").then(({ trackEvent }) => {
                trackEvent("Quiz", "Start", "Homepage Button");
                navigate({ to: "/quiz" });
              });
            }}
          >
            TAKE THE QUIZ!
          </button>
        </section>

        {/* Spotify Section */}
        <section className="home-spotify">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/5eDmyZuTRxBJre5FCuJdT5?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <div className="kismet-notes" style={{ color: theme === "dark" ? "white" : "black" }}>
            <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>SERIAL</p>
            <p>
              Look at all that you have around you. Notice what you’re missing– how
              you can never keep up with all that you’re inundated with.
            </p>
            <p>
              You can’t salvage your greed. Your mind is consumed with everything
              about yourself, yet there’s nothing to observe on the inside.
            </p>
            <p>
              <em>Feed yourself with cravings<br />Hungry for more of nothing<br /></em>
            </p>
            <p>
              <strong>Keep feeding, and revel at all the places it doesn’t take you.</strong>
            </p>
          </div>
        </section>
      </main>

      <Socials />
    </div>
  );
}
