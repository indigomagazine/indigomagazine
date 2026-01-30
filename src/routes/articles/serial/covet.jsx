import { createFileRoute } from "@tanstack/react-router";
import ArticlePage from "../../../components/IssueArticles/serial/covet/CovetPage";

export const Route = createFileRoute("/articles/serial/covet")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ArticlePage />;
}
