import { createFileRoute } from '@tanstack/react-router'
import NotPage from '../../components/IssueArticles/not/notPage'

export const Route = createFileRoute('/Issues/not')({
    component: RouteComponent,
})

function RouteComponent() {
    return <NotPage />
}
