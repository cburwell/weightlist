import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {Box} from "@mui/material";

export const Route = createFileRoute('/workouts')({
  component: WorkoutsComponent,
})

function WorkoutsComponent() {
  return (
    <Box>
      <h3>Workouts</h3>
    </Box>
  )
}
