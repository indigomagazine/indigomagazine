import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Taskbar from "../components/Home/Taskbar";

export const Route = createFileRoute("/issues")({
  component: Issues,
});

function Issues() {
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
        <a href="/serial" className="issue">
          <img
            src="/legacy/article photos/ILoveShopping/love is.jpg"
            alt="Serial: Issue 10"
          />
          <div className="issue-title">Serial</div>
        </a>

        {/* NOT Issue */}
        <a href="/legacy/NOT.html" className="issue">
          <img src="/legacy/article photos/laQuinta/F1-3.JPG" alt="NOT: Issue 09" />
          <div className="issue-title">NOT</div>
        </a>

        {/* Kismet Issue */}
        <a href="/legacy/kismet.html" className="issue">
          <img src="/legacy/photos/group4/kismet.png" alt="Kismet: Issue 09" />
          <div className="issue-title">Kismet</div>
        </a>

        {/* Reminiscence Issue */}
        <a href="/legacy/reminiscence.html" className="issue">
          <img
            src="/legacy/photos/issue covers/reminiscence2.jpeg"
            alt="Reminiscence: Issue 08"
          />
          <div className="issue-title">Reminiscence</div>
        </a>
      </div>
    </div>
  );
}
