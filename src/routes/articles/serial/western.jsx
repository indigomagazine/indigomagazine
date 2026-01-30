import { createFileRoute } from "@tanstack/react-router";
import ArticlePage from "../../../components/IssueArticles/serial/western/westernPage";

export const Route = createFileRoute("/articles/serial/western")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ArticlePage />;
}
