import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {Box} from "@mui/material";

export const Route = createFileRoute('/exercises')({
  component: ExercisesComponent,
})

function ExercisesComponent() {
  return (
    <Box>
      <h3>Exercises</h3>
    </Box>
  )
}
