import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Taskbar from "../../components/Home/Taskbar";

export const Route = createFileRoute("/Issues/")({
  component: RouteComponent,
});

function RouteComponent() {
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

  // Force body class on mount (in case it wasn't set)
  useEffect(() => {
    document.body.classList.toggle("light-mode", theme === "light");
  }, []);

  return (
    <div className="issues-page">
      <button onClick={toggleTheme} className="change-mode">
        {theme === "dark" ? "☼ / ☾" : "☼ / ☾"}
      </button>

      <Taskbar />

      <div className="issues-container">
        <a href="/issues/serial" className="issue">
          <img
            src="https://cdn.indigomagazinetx.com/articlephotos/serial/i%20love%20shopping/i%20love%20shopping%20cover.jpg"
            alt="Serial: Issue 11"
          />
          <div className="issue-title">Serial</div>
        </a>

        {/* NOT Issue */}
        <a href="/issues/not" className="issue">
          <img
            src="https://cdn.indigomagazinetx.com/articlephotos/NOT/la%20quinta/F1-3.JPG"
            alt="NOT: Issue 10"
          />
          <div className="issue-title">NOT</div>
        </a>

        {/* Kismet Issue */}
        <a href="/issues/kismet" className="issue">
          <img
            src="https://cdn.indigomagazinetx.com/articlephotos/kismet/the%20lady%20of%20the%20castle/kismet.png"
            alt="Kismet: Issue 09"
          />
          <div className="issue-title">Kismet</div>
        </a>

        {/* Reminiscence Issue */}
        <a href="/issues/reminiscence" className="issue">
          <img
            src="https://cdn.indigomagazinetx.com/articlephotos/reminiscence/amsterdam/amsterdamfinal.jpeg"
            alt="Reminiscence: Issue 08"
          />
          <div className="issue-title">Reminiscence</div>
        </a>
      </div>
    </div>
  );
}
