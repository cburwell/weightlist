import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
})

function SignupComponent() {
  return (
    <div className="p-2">
      <h3>Sign up</h3>
    </div>
  )
}
