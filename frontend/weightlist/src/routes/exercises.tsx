import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/exercises')({
  component: ExercisesComponent,
})

function ExercisesComponent() {
  return (
    <div className="p-2">
      <h3>Exercises</h3>
    </div>
  )
}
