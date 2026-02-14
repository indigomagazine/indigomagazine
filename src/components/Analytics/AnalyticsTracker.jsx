import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { trackPageView } from "../../analytics";

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        trackPageView(location.href);
    }, [location.href]);

    return null; // This component handles side effects only
};

export default AnalyticsTracker;
