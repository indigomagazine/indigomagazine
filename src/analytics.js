import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-YR952930WP"; // Provided by user

export const initAnalytics = () => {
    ReactGA.initialize(MEASUREMENT_ID);
};

export const trackEvent = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
    });
};

export const trackPageView = (path) => {
    ReactGA.send({ hitType: "pageview", page: path });
};
