import { createFileRoute } from "@tanstack/react-router";
import KeyboardsExperience from "../../../components/IssueArticles/serial/keyboards/KeyboardsExperience";

export const Route = createFileRoute("/Issues/serial/keyboards")({
  component: RouteComponent,
});

function RouteComponent() {
  return <KeyboardsExperience />;
}
