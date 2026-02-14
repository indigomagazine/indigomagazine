import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Taskbar from "../components/Home/Taskbar";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
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

  // Force body class on mount
  useEffect(() => {
    document.body.classList.toggle("light-mode", theme === "light");
  }, []);

  return (
    <div className="about-page">
      <button onClick={toggleTheme} className="change-mode">
        {theme === "dark" ? "☼ / ☾" : "☼ / ☾"}
      </button>

      <Taskbar />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h1 className="mission-statement-header">Who We Are</h1>
      <div className="mission-statement">
        <p>
          Indigo Magazine is UT Dallas’s first completely student-run creative
          magazine, exploring different abstract themes through the lens of
          writing, photography, and design. We amplify creativity through
          different forms of media for the students, by the students.
        </p>
      </div>

      <h1 className="officer-heading">Officers</h1>

      <div className="officer-section">
        <div className="officer-card">
          <img src="/legacy/photos/officers/manjiri.jpg" alt="Manjiri" />
          <h2>
            Editor-in-Chief: <br /> Manjiri C.
          </h2>
        </div>

        <div className="officer-card">
          <img
            src="https://github.com/indigomagazine/website_images/blob/main/officer%20pics/sanhita.jpg?raw=true"
            alt="Sanhita"
          />
          <h2>
            Writing Head: <br /> Sanhita P.
          </h2>
        </div>

        <div className="officer-card">
          <img
            src="https://github.com/indigomagazine/website_images/blob/main/officer%20pics/lauren.png?raw=true"
            alt="Lauren Lowndes"
          />
          <h2>
            Creative Head: <br /> Lauren L.
          </h2>
        </div>

        <div className="officer-card">
          <img
            src="https://github.com/indigomagazine/website_images/blob/main/officer%20pics/sreya.jpg?raw=true"
            alt="Sreya I."
          />
          <h2>
            Creative Director: <br /> Sreya I.
          </h2>
        </div>

        <div className="officer-card">
          <img
            src="https://github.com/indigomagazine/website_images/blob/main/officer%20pics/nicole.jpg?raw=true"
            alt="Nicole C."
          />
          <h2>
            Graphics Head: <br /> Nicole C.
          </h2>
        </div>

        <div className="officer-card">
          <img
            src="https://github.com/indigomagazine/website_images/blob/main/officer%20pics/alaynna.jpg?raw=true"
            alt="Alaynna"
          />
          <h2>
            Social & Events: <br /> Alaynna O.
          </h2>
        </div>

        <div className="officer-card">
          <img
            src="https://github.com/indigomagazine/website_images/blob/main/officer%20pics/dhiraj.jpg?raw=true"
            alt="Dhiraj"
          />
          <h2>
            Social & Events: <br /> Dhiraj A.
          </h2>
        </div>

        <div className="officer-card">
          <img
            src="https://github.com/indigomagazine/website_images/blob/main/officer%20pics/jeslin.jpg?raw=true"
            alt="Jeslin"
          />
          <h2>
            Logistics: <br /> Jeslin M.
          </h2>
        </div>

        <div className="officer-card">
          <img src="/legacy/photos/officers/emmagonzalez.jpg" alt="Emma Gonzalez" />
          <h2>
            Web Development: <br /> Emma Gonzalez
          </h2>
        </div>
      </div>
    </div>
  );
}
