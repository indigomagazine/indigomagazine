import { createFileRoute } from "@tanstack/react-router";
import ArticlePage from "../../../components/IssueArticles/serial/western/westernPage";

export const Route = createFileRoute("/Issues/serial/western")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ArticlePage />;
}
