import { createFileRoute } from '@tanstack/react-router'
import Victorian from '../../components/IssueArticles/and scene/victorian/victorian'

export const Route = createFileRoute('/dev/victorian')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Victorian />
}
