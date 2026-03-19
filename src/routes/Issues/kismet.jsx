import { createFileRoute } from '@tanstack/react-router'
import KismetPage from '../../components/IssueArticles/kismet/kismetPage'

export const Route = createFileRoute('/Issues/kismet')({
    component: RouteComponent,
})

function RouteComponent() {
    return <KismetPage />
}
