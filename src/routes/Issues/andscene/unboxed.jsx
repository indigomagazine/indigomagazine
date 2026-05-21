import { createFileRoute } from '@tanstack/react-router'
import Unboxed from '../../../components/IssueArticles/andscene/unboxed/Unboxed'

export const Route = createFileRoute('/Issues/andscene/unboxed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Unboxed />
}