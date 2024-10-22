import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {createFileRoute, Link, Outlet} from '@tanstack/react-router'
import {Box, Button, Card, CardContent, CircularProgress, Grid2, Stack, Typography} from "@mui/material";
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
        <Grid2 container spacing={2} sx={{mt: 4, mb: 10, mx: "auto"}}>
          {exercises ?
            exercises.map((exercise, ndx): ReactNode => {
              return (
                <Grid2 key={ndx} size={4} sx={{height: "auto"}}>
                  <Card variant="outlined" sx={{height: "100%"}}>
                    <CardContent className="mui-card-content">
                      <Stack spacing={4}>
                        <Typography variant="h5" sx={{marginTop: 2, marginBottom: 2}}>{exercise.name}</Typography>
                        <img
                          src={exercise.imageUrl}
                          alt={"Photo of " + exercise.name}
                          loading="lazy"
                          style={{height: 190, mx: "auto"}}
                        />
                        <Typography variant="body2" sx={{
                          height: 120,
                          wordWrap: "break-word",
                          overflowY: "scroll"
                        }}>{exercise.description}</Typography>
                        <Button
                          component={Link}
                          to={exercise.videoUrl}
                          disabled={exercise.videoUrl.length === 0}
                          sx={{
                            display: "block",
                            fontSize: 12,
                            width: 330,
                            overflow: 'hidden',
                            whiteSpace: "nowrap",
                            textOverflow: 'ellipsis',
                          }}>
                            {exercise.videoUrl ? exercise.videoUrl : "No video linked"}
                        </Button>
                        <Typography variant="body2" sx={{
                          color: 'text.secondary',
                          my: 2
                        }}>Tags: {exercise.tags ? exercise.tags.map((t): string => {
                          return t.name;
                        }).join(', ') : ""}</Typography>
                      </Stack>
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
