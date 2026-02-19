import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import issuesSrc from "../../assets/logos/Issues.svg";
import visualArtsSrc from "../../assets/logos/Visual-Arts.svg";
import aboutSrc from "../../assets/logos/About.svg";
import articlesSrc from "../../assets/logos/Articles.svg";

const Taskbar = ({ darkIcons = false }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

        const onScroll = () => {
            const currentY = window.scrollY;
            // show if near top
            if (currentY < 50) {
                setVisible(true);
                lastScrollY = currentY;
                return;
            }

            if (currentY > lastScrollY + 10) {
                // scrolling down
                setVisible(false);
            } else if (currentY < lastScrollY - 10) {
                // scrolling up
                setVisible(true);
            }
            lastScrollY = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const iconStyle = darkIcons ? { filter: 'invert(1) brightness(0)' } : {};

    return (
        <nav className={`nav-container persistent ${visible ? "" : "hidden"}`}>
            {/* Desktop View */}
            <div className="desktop-view">
                <Link to="/" className="nav-logo-link">
                    <img
                        src="/legacy/assets/logos/indigologowhite.png"
                        alt="Indigo Logo"
                        className="nav-logo"
                        style={iconStyle}
                    />
                </Link>
                <div className="nav-links">
                    <Link to="/articles" className="link-bar hvr-fade ARTICLES">
                        <img src={articlesSrc} alt="ARTICLES" className="nav-icon" style={iconStyle} />
                    </Link>
                    <Link to="/issues" className="link-bar hvr-fade CREATIVE">
                        <img src={issuesSrc} alt="ISSUES" className="nav-icon" style={iconStyle} />
                    </Link>
                    <Link to="/visual-arts" className="link-bar hvr-fade VISUALARTS">
                        <img src={visualArtsSrc} alt="VISUAL ARTS" className="nav-icon" style={iconStyle} />
                    </Link>
                    <Link to="/about" className="link-bar hvr-fade ABOUT">
                        <img src={aboutSrc} alt="ABOUT" className="nav-icon" style={iconStyle} />
                    </Link>
                </div>
                <div className="nav-spacer"></div>
            </div>

            {/* Mobile View */}
            <div className="mobile-view">
                <Link to="/" className="mobile-logo-link">
                    <img
                        src="/legacy/assets/logos/indigologowhite.png"
                        alt="Indigo Logo"
                        className="mobile-logo"
                        style={iconStyle}
                    />
                </Link>
                <div className="mobile-links">
                    <Link to="/articles" className="mobile-link">
                        <img src={articlesSrc} alt="ARTICLES" className="mobile-icon" style={iconStyle} />
                    </Link>
                    <Link to="/issues" className="mobile-link">
                        <img src={issuesSrc} alt="ISSUES" className="mobile-icon" style={iconStyle} />
                    </Link>
                    <Link to="/visual-arts" className="mobile-link">
                        <img src={visualArtsSrc} alt="VISUAL ARTS" className="mobile-icon" style={iconStyle} />
                    </Link>
                    <Link to="/about" className="mobile-link">
                        <img src={aboutSrc} alt="ABOUT" className="mobile-icon" style={iconStyle} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Taskbar;
