import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./styles/style.css"
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Render the app
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  // Initialize Analytics
  import("./analytics").then(({ initAnalytics }) => {
    initAnalytics();
  });

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
