import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {createFileRoute, Link, useRouter} from '@tanstack/react-router'
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
import DeleteModal from "../../components/delete-modal";
import {useSnackbar} from 'notistack';

export const Route = createFileRoute('/workouts/')({
  component: WorkoutsComponent,
})

function WorkoutsComponent() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[] | null>(null)
  const {enqueueSnackbar} = useSnackbar();

  const handleDelete = (wid: string | null) => {
    console.log(wid);
    if (wid) {
      api.delete<Workout>(`http://localhost:8080/workouts/${wid}`).then(
        (result) => {
          if ((result as any).ok) {
            console.log(`DELETE success ${wid}`);
            if (workouts) {
              setWorkouts(workouts.filter((w) => {
                return w.id !== wid;
              }));
              enqueueSnackbar(`Deleted exercise #${wid}`, {variant: "success"});
            }
          } else {
            console.error("Error occurred when deleting workout:", (result as any).status, (result as any).statusText);
            enqueueSnackbar(`Delete error`, {variant: "error"});
          }
        });
    }
  }

  useEffect(() => {
    let ignore = false
    api.get<Workout[]>('http://localhost:8080/workouts').then(
      (result) => {
        if ((result as any).status == 401) {
          enqueueSnackbar("Request not authorized, redirecting to login", {variant:"error"});
          void router.navigate({to: '/login'})
        }
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
        {workouts !== null && workouts.length === 0 && (
          <React.Fragment>
            <Box
              display="flex"
              flexDirection="column"
              gap="20px"
              justifyContent="center"
              alignItems="center"
              minHeight="60vh"
              margin="auto"
            >
              <Typography>Nothing here yet! Add a new workout.</Typography>
            </Box>
          </React.Fragment>
        )}
        <Grid2 container spacing={2} sx={{mt: 4, pb: 20, mx: 'auto'}}>
          {workouts ? (
            workouts.map((workout, ndx): ReactNode => {
              return (
                <Grid2 key={ndx} size={12} sx={{height: "auto"}}>
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
                          height: 100,
                          wordWrap: 'break-word',
                          overflowY: 'auto',
                          my: 2
                        }}
                      >
                        {workout.description}
                      </Typography>
                      <Accordion sx={{marginTop: 2, marginBottom: 2}}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon/>}
                          aria-controls="exercise-panel-content"
                          id="exercise-panel-header"
                        >
                          Exercises
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack className="zebra">
                            {workout.exerciseData.map((edata, eNdx) => {
                              return (
                                <ListItem key={eNdx} sx={{gap: 4}}>
                                  <TextField
                                    name="name"
                                    label="Name"
                                    type="text"
                                    value={workout.exerciseData[eNdx].name}
                                    sx={{flexGrow: 1}}
                                    slotProps={{
                                      input: {
                                        readOnly: true,
                                      },
                                    }}
                                  />
                                  <TextField
                                    name="sets"
                                    label="Sets"
                                    type="text"
                                    value={workout.exerciseData[eNdx].sets}
                                    sx={{width: "120px", textAlign: "center"}}
                                    slotProps={{
                                      input: {
                                        readOnly: true,
                                      },
                                    }}
                                  />
                                  <TextField
                                    name="reps"
                                    label="Reps"
                                    type="text"
                                    value={workout.exerciseData[eNdx].reps}
                                    sx={{width: "120px"}}
                                    slotProps={{
                                      input: {
                                        readOnly: true,
                                      },
                                    }}
                                  />
                                </ListItem>
                              )
                            })}
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          my: 2,
                        }}
                      >
                        Tags:
                        {workout.tags
                          ? workout.tags
                            .map((t): string => {
                              return t.name
                            })
                            .join(', ')
                          : ''}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={4}
                        sx={{justifyContent: 'center', pt: 6}}
                      >
                        <Button
                          variant="outlined"
                          component={Link}
                          to={`/workouts/${workout.id}`}
                        >
                          View
                        </Button>
                        <DeleteModal initOpen={false} handleDelete={handleDelete} id={workout.id}></DeleteModal>
                      </Stack>
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