import * as React from 'react'
import {createFileRoute} from '@tanstack/react-router'
import {Box, Grid2, Typography} from "@mui/material";
import {ReactNode, useEffect, useState} from "react";
import {api} from "../../static/js/api";

export const Route = createFileRoute('/workouts')({
  component: WorkoutsComponent,
})

function WorkoutsComponent() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  useEffect(() => {
    let ignore = false;
    api.get<Workout[]>("http://localhost:8080/workouts").then(result => {
      console.log(result);
      if (!ignore) {
        setWorkouts(result);
      }
    }, (err) => {
      console.log("Error occurred fetching data", err);
    });
    return () => {
      ignore = true;
    }
  }, []);

  return (
    <Box>
      <h3>Workouts</h3>
      <Grid2 container spacing={2}>
        {workouts ?
          workouts.map((workout): ReactNode => { return (
            <Grid2 size={4}>
              <Box>
                <Typography>{workout.name}</Typography>
                <Typography>{workout.description}</Typography>
                <Typography>{workout.exerciseIds.toString()}</Typography>
                <Typography>{workout.tags.join(', ')}</Typography>
              </Box>
            </Grid2>
          )
          }): (<p>Loading...</p>)}
      </Grid2>
    </Box>
  )
}
