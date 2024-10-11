import * as React from 'react'
import {createFileRoute} from '@tanstack/react-router'
import {Box} from "@mui/material";

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <Box>
      <h3>Welcome Home!</h3>
    </Box>
  )
}
