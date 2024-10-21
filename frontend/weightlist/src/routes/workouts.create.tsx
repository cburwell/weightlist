import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workouts/create')({
  component: () => <div>Hello /workouts/create!</div>,
})
