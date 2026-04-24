import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Issues/andscene')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
