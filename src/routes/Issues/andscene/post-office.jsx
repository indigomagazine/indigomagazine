import { createFileRoute } from '@tanstack/react-router'
import AlphaCentauri from '../../../components/IssueArticles/andscene/alpha-centauri/AlphaCentauri'

export const Route = createFileRoute('/Issues/andscene/post-office')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AlphaCentauri />
}