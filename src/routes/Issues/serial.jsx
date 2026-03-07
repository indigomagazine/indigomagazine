import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Issues/serial")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}