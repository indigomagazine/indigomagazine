import { createFileRoute } from "@tanstack/react-router";
import AlleyPage from "../../../components/IssueArticles/andscene/alley/AlleyPage";

export const Route = createFileRoute("/Issues/andscene/alley")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AlleyPage />;
}

