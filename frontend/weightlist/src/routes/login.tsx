import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {Box} from "@mui/material";

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  return (
    <Box>
      <h3>Log in</h3>
    </Box>
  )
}
