import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/issues/serial/youcantwisttime")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <iframe
      src="/legacy/articles/serial/youcantwisttime.html"
      title="You Can Twist Time"
      style={{
        width: "100%",
        height: "100vh",
        border: "0",
        display: "block",
      }}
    />
  );
}