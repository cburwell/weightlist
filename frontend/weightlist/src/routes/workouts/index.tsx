import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {createFileRoute, Link} from '@tanstack/react-router'
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
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import {api} from '../../../static/js/api'
import CloseIcon from '@mui/icons-material/Close'

export const Route = createFileRoute('/workouts/')({
  component: WorkoutsComponent,
})

function WorkoutsComponent() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null)
  const [newWorkout, setNewWorkout] = useState<Workout | null>(null)

  useEffect(() => {
    let ignore = false
    api.get<Workout[]>('http://localhost:8080/workouts').then(
      (result) => {
        if (!ignore) {
          setWorkouts(result)
        }
      },
      (err) => {
        console.error('Error occurred when fetching data: ', err)
      },
    )
    return () => {
      ignore = true
    }
  }, [])

  function createWorkout() {
    console.log('createWorkout')
  }

  const handleNewWorkout = () => {
    setNewWorkout({
      id: '',
      name: 'New Workout',
      description: '',
      exerciseData: [],
      tags: [],
    } as Workout)

    if (newWorkout) workouts?.unshift(newWorkout)
    setWorkouts(workouts)
  }

  const handleDeleteExercise = (eid: string) => () => {
    // setNewWorkout({...newWorkout, exerciseData: newWorkout.exerciseData.filter((edata) => edata.id !== eid)});
  }

  // Generic input change handler
  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    // setNewWorkout({...newWorkout, [name]: value});
  }

  return (
    <React.Fragment>
      <Box>
        <Box sx={{display: 'flex'}}>
          <Typography variant="h3" sx={{m: 4}}>
            Workouts
          </Typography>
          <div className="spacer"></div>
          <Button
            component={Link}
            to="/workouts/create-workout"
            sx={{height: 50, m: 'auto'}}
          >
            <AddIcon/> New Workout
          </Button>
        </Box>
        <Grid2 container spacing={2}>
          {workouts ? (
            workouts.map((workout, ndx): ReactNode => {
              return (
                <Grid2 key={ndx} size={4} sx={{height: 400}}>
                  <Card variant="outlined" sx={{height: '100%'}}>
                    <CardContent className="mui-card-content">
                      <Typography
                        variant="h5"
                        sx={{marginTop: 2, marginBottom: 2}}
                      >
                        {workout.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          height: 180,
                          marginTop: 2,
                          marginBottom: 2,
                        }}
                      >
                        {workout.description}
                      </Typography>
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
                          {/*<List dense={true}>*/}
                          {/*  {workout.exerciseIds.map((id) => {*/}
                          {/*    return (<ListItem>{id}</ListItem>);*/}
                          {/*  })}*/}
                          <Stack className="zebra">
                            {workout.exerciseData.map((edata, eNdx) => {
                              return (
                                <ListItem key={eNdx}>
                                  {eNdx + 1}:{edata.name} :
                                  <TextField
                                    name="sets"
                                    label="Sets"
                                    type="number"
                                    onChange={handleInputChange}
                                    value={workout.exerciseData[eNdx].sets}
                                  />{' '}
                                  :
                                  <TextField
                                    name="reps"
                                    label="Reps"
                                    type="number"
                                    onChange={handleInputChange}
                                    value={workout.exerciseData[eNdx].reps}
                                  />{' '}
                                  :
                                  <Button
                                    onClick={handleDeleteExercise(edata.id)}
                                  >
                                    <CloseIcon/>
                                  </Button>
                                </ListItem>
                              )
                            })}
                          </Stack>
                          {/*</List>*/}
                        </AccordionDetails>
                      </Accordion>
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          mb: 1.5,
                          marginTop: 2,
                          marginBottom: 2,
                        }}
                      >
                        Tags: {workout.tags.join(', ')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              )
            })
          ) : (
            <Box
              display="flex"
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
  );
}