import { createFileRoute } from '@tanstack/react-router'
import Limerence from "../../../components/IssueArticles/andscene/limerence/victorian"

export const Route = createFileRoute('/Issues/andscene/limerence')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Limerence />
}
