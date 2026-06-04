import { createFileRoute } from "@tanstack/react-router";
import MoldPage from "../../../components/IssueArticles/andscene/mold-spore-rejuvenation/MoldPage";

export const Route = createFileRoute("/Issues/andscene/moldspore")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MoldPage />
}