import { createFileRoute } from '@tanstack/react-router'
import RuminatingChimera from "../../../components/IssueArticles/andscene/alice/ruminatingchimera"

export const Route = createFileRoute('/Issues/andscene/ruminatingchimera')({
    component: RouteComponent,
})

function RouteComponent() {
    return <RuminatingChimera />
}
