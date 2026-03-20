import { createFileRoute } from '@tanstack/react-router'
import ReminiscencePage from '../../components/IssueArticles/reminiscence/reminiscencePage'

export const Route = createFileRoute('/Issues/reminiscence')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ReminiscencePage />
}
