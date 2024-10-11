import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {Box} from "@mui/material";

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
})

function SignupComponent() {
  return (
    <Box>
      <h3>Sign up</h3>
    </Box>
  )
}
