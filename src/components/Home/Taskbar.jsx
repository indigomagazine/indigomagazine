
import { Link } from "@tanstack/react-router";

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
                <Link to="/issues" className="link-bar hvr-fade CREATIVE"><p className="tabfont">ISSUES</p></Link>
                <Link to="/visual-arts" className="link-bar hvr-fade VISUALARTS"><p className="tabfont">VISUAL ARTS</p></Link>
                <Link to="/about" className="link-bar hvr-fade ABOUT"><p className="tabfont">ABOUT</p></Link>
            </div>
            <div className="nav-spacer"></div>
        </nav>
    );
};

export default Taskbar;
