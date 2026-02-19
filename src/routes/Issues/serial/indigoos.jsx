import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/Issues/serial/indigoos")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/legacy/articles/serial/indigoos/index.html");
    }
  }, []);

  return <></>;
}
