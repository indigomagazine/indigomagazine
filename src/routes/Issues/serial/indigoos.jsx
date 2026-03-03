import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Issues/serial/indigoos")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <iframe
      src="/legacy/articles/serial/indigoos/index.html"
      title="IndigoOS"
      style={{
        width: "100%",
        height: "100vh",
        border: "0",
        display: "block",
      }}
    />
  );
}