import React from "react";
import { Link } from "@tanstack/react-router";

export default function IssueSidebar({ barOpen, setBarOpen }) {
    return (
        <>
            <aside
                className={`serial-drawer ${barOpen ? "is-open" : ""}`}
                role="complementary"
                aria-label="Tools"
            >
                <div className="serial-drawer__inner">
                    <nav className="drawer-nav" aria-label="Section">
                        <Link to="/">Home</Link>
                        <Link to="/issues">Issues</Link>
                        <Link to="/about">About</Link>
                        <Link to="/visual-arts">VisualArts</Link>
                    </nav>
                </div>
            </aside>

            <button
                className={`drawer-tab ${barOpen ? "is-open" : ""}`}
                aria-label={barOpen ? "Close tools" : "Open tools"}
                aria-expanded={barOpen}
                onClick={() => setBarOpen((v) => !v)}
            >
                <img src="/legacy/assets/logos/indigologowhite.png" alt="Toggle Sidebar" />
            </button>
        </>
    );
}
