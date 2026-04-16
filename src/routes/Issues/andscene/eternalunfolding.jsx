import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Issues/andscene/eternalunfolding")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <iframe
      src="/legacy/articles/andscene/eternalunfolding.html"
      title="Eternal Unfolding"
      style={{
        width: "100%",
        height: "100vh",
        border: "0",
        display: "block",
      }}
    />
  );
}