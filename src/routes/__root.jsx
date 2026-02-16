import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import AnalyticsTracker from "../components/Analytics/AnalyticsTracker";

const RootLayout = () => (
  <>
    <AnalyticsTracker />
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
