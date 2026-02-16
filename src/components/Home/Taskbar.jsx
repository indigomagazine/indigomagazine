import { Link } from "@tanstack/react-router";
import issuesSrc from "../../assets/logos/Issues.svg";
import visualArtsSrc from "../../assets/logos/Visual-Arts.svg";
import aboutSrc from "../../assets/logos/About.svg";

const Taskbar = () => {
    return (
        <nav className="nav-container persistent">
            <Link to="/" className="nav-logo-link">
                <img
                    src="/legacy/assets/logos/indigologowhite.png"
                    alt="Indigo Logo"
                    className="nav-logo"
                />
            </Link>
            <div className="nav-links">
                <a href="/legacy/creative.html" className="link-bar hvr-fade CREATIVE">
                    <img src={issuesSrc} alt="ISSUES" className="nav-icon" />
                </a>
                <a href="/legacy/visualarts.html" className="link-bar hvr-fade VISUALARTS">
                    <img src={visualArtsSrc} alt="VISUAL ARTS" className="nav-icon" />
                </a>
                <a href="/legacy/about.html" className="link-bar hvr-fade ABOUT">
                    <img src={aboutSrc} alt="ABOUT" className="nav-icon" />
                </a>
            </div>
            <div className="nav-spacer"></div>
        </nav>
    );
};

export default Taskbar;
