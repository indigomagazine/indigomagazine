import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/issues/serial")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}