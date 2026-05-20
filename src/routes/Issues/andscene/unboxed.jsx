import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Issues/andscene/unboxed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Issues/andscene/unboxed"!</div>
}
