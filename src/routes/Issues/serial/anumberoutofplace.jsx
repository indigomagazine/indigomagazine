import { createFileRoute } from "@tanstack/react-router";
import Article from "../../../components/IssueArticles/serial/anumberoutofplace";

export const Route = createFileRoute("/Issues/serial/anumberoutofplace")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Article />;
}
