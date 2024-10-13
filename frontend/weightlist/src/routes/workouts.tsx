import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {createFileRoute} from '@tanstack/react-router'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  List,
  ListItem,
  Modal,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import {api} from "../../static/js/api";
import WorkoutModal from "../components/create-workout-modal";

export const Route = createFileRoute('/workouts')({
  component: WorkoutsComponent,
})

function WorkoutsComponent() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  useEffect(() => {
    let ignore = false;
    api.get<Workout[]>("http://localhost:8080/workouts").then(result => {
      if (!ignore) {
        setWorkouts(result);
      }
    }, (err) => {
      console.error("Error occurred when fetching data: ", err);
    });
    return () => {
      ignore = true;
    }
  }, []);

  function createWorkout() {
    console.log("createWorkout");
  }

  return (
    <React.Fragment>
      <Box>
        <Box sx={{display: "flex"}}>
          <Typography variant="h3" sx={{m: 4}}>Workouts</Typography>
          <div className="spacer"></div>
          <WorkoutModal/>
        </Box>
        <Grid2 container spacing={2}>
          {workouts ?
            workouts.map((workout, ndx): ReactNode => {
              return (
                <Grid2 key={ndx} size={4} sx={{height: 400}}>
                  <Card variant="outlined" sx={{height: "100%"}}>
                    <CardContent className="mui-card-content">
                      <Typography variant="h5" sx={{marginTop: 2, marginBottom: 2}}>{workout.name}</Typography>
                      <Typography variant="body2" sx={{
                        height: 180,
                        marginTop: 2,
                        marginBottom: 2
                      }}>{workout.description}</Typography>
                      <div className="spacer"></div>
                      <Accordion sx={{marginTop: 2, marginBottom: 2}}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon/>}
                          aria-controls="exercise-panel-content"
                          id="exercise-panel-header"
                        >
                          Exercises
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense={true}>
                            {workout.exerciseIds.map((id) => {
                              return (<ListItem>{id}</ListItem>);
                            })}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                      <Typography sx={{
                        color: 'text.secondary',
                        mb: 1.5,
                        marginTop: 2,
                        marginBottom: 2
                      }}>Tags: {workout.tags.join(', ')}</Typography>
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
