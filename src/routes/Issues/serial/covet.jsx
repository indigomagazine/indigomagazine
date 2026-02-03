import { createFileRoute } from "@tanstack/react-router";
import ArticlePage from "../../../components/IssueArticles/serial/covet/CovetPage";

export const Route = createFileRoute("/Issues/serial/covet")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ArticlePage />;
}
