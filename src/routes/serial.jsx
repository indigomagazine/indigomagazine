import { createFileRoute } from "@tanstack/react-router";
import Serial from "../components/IssueArticles/serial/SerialPage";

export const Route = createFileRoute("/serial")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Serial />;
}
