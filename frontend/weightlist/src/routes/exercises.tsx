import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {createFileRoute, Link, Outlet} from '@tanstack/react-router'
import {Box, Button, Card, CardContent, CircularProgress, Grid2, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {api} from "../../static/js/api";

export const Route = createFileRoute('/exercises')({
  component: ExercisesComponent,
})

function ExercisesComponent() {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  useEffect(() => {
    let ignore = false;
    api.get<Exercise[]>("http://localhost:8080/exercises").then(result => {
      if (!ignore) {
        setExercises(result);
      }
    }, (err) => {
      console.error("Error occurred when fetching data: ", err);
    });
    return () => {
      ignore = true;
    }
  }, []);

  return (
    <React.Fragment>
      <Outlet></Outlet>
      <Box>
        <Box sx={{display: "flex"}}>
          <Typography variant="h3" sx={{m: 4}}>Exercises</Typography>
          <div className="spacer"></div>
          <Button component={Link} to="/create-exercise" sx={{height: 50, m: "auto"}}><AddIcon/> New Exercise</Button>
        </Box>
        {(exercises !== null && exercises.length === 0) &&
            <React.Fragment>
                <Box display="flex"
                     flexDirection="column"
                     gap="20px"
                     justifyContent="center"
                     alignItems="center"
                     minHeight="60vh"
                     margin="auto"
                >
                    <Typography>Nothing here yet! Add a new exercise.</Typography>
                </Box>
            </React.Fragment>
        }
        <Grid2 container spacing={2}>
          {exercises ?
            exercises.map((exercise, ndx): ReactNode => {
              return (
                <Grid2 key={ndx} size={4} sx={{height: 400}}>
                  <Card variant="outlined" sx={{height: "100%"}}>
                    <CardContent className="mui-card-content">
                      <Typography variant="h5" sx={{marginTop: 2, marginBottom: 2}}>{exercise.name}</Typography>
                      <Typography variant="body2" sx={{
                        height: 180,
                        marginTop: 2,
                        marginBottom: 2
                      }}>{exercise.description}</Typography>
                      <Typography>{exercise.imageUrl}</Typography>
                      <Typography>{exercise.videoUrl}</Typography>
                      <Typography sx={{
                        color: 'text.secondary',
                        mb: 1.5,
                        marginTop: 2,
                        marginBottom: 2
                      }}>Tags: {exercise.tags.join(', ')}</Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              )
            }) : (
              <Box display="flex"
                   flexDirection="column"
                   gap="20px"
                   justifyContent="center"
                   alignItems="center"
                   minHeight="60vh"
                   margin="auto"
              >
                <CircularProgress/>
                <span>Loading...</span>
              </Box>
            )}
        </Grid2>
      </Box>
    </React.Fragment>
  )
}
