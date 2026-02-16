import { Link } from "@tanstack/react-router";
import "./css/quiz.css";

const SerialPromo = () => {
    return (
        <div className="serial-promo-container">
            <h2 className="serial-promo-title">Hungry for more?</h2>
            <Link
                to="/serial"
                className="serial-promo-button"
                onClick={() => {
                    import("../../analytics").then(({ trackEvent }) => {
                        trackEvent("Serial", "Click", "Quiz Promo Button");
                    });
                }}
            >
                CEREAL
            </Link>
        </div>
    );
};

export default SerialPromo;
