import { createFileRoute } from '@tanstack/react-router'
import AndScenePage from '../../../components/IssueArticles/andscene/AndScenePage'

export const Route = createFileRoute('/Issues/andscene/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AndScenePage />
}
