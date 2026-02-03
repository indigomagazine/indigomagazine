import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// youcantwisttimehtml is under legacy/articles/serial/youcantwisttime.html

export const Route = createFileRoute("/Issues/serial/youcantwisttime")({
  component: RouteComponent,
});

function RouteComponent() {
    useEffect(() => {
        if (typeof window !== "undefined") {
        window.location.replace("/legacy/articles/serial/youcantwisttime.html");
        }
    }, []);
    return <></>;
}