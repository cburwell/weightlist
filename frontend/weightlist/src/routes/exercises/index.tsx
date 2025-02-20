import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {createFileRoute, Link, Outlet} from '@tanstack/react-router'
import {Box, Button, Card, CardContent, CircularProgress, Grid2, Stack, Typography,} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {api} from '../../../static/js/api'
import DeleteModal from "../../components/delete-modal";
import { useSnackbar } from 'notistack';

export const Route = createFileRoute('/exercises/')({
  component: ExercisesComponent,
})

function ExercisesComponent() {
  const [exercises, setExercises] = useState<Exercise[] | null>(null)
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (eid: string | null) => {
    if (eid) {
      api.delete<Exercise>(`http://localhost:8080/exercises/${eid}`).then(
        (result) => {
          if ((result as any).ok) {
            console.log(`DELETE success ${eid}`);
            if (exercises) {
              setExercises(exercises.filter((e) => {
                return e.id !== eid;
              }));
              enqueueSnackbar(`Deleted exercise #${eid}`, { variant: "success" });
            }
          } else {
            console.error("Error occurred when deleting exercise:", (result as any).status, (result as any).statusText);
            enqueueSnackbar("Delete error", { variant: "error" });
          }
        });
    }
  }

  useEffect(() => {
    api.get<Exercise[]>('http://localhost:8080/exercises').then(
      (result) => {
        if (!(result as any).error) {
          setExercises(result)
        } else {
          console.error("Error occurred when fetching exercises:", (result as any).status, (result as any).error)
        }
      }
    )
  }, [])

  return (
    <React.Fragment>
      <Outlet></Outlet>
      <Box>
        <Box sx={{display: 'flex'}}>
          <Typography variant="h3" sx={{m: 4}}>
            Exercises
          </Typography>
          <div className="spacer"></div>
          <Button
            component={Link}
            to="/exercises/create-exercise"
            sx={{height: 50, m: 'auto'}}
          >
            <AddIcon/> New Exercise
          </Button>
        </Box>
        {exercises !== null && exercises.length === 0 && (
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
              <Typography>Nothing here yet! Add a new exercise.</Typography>
            </Box>
          </React.Fragment>
        )}
        <Grid2 container spacing={2} sx={{mt: 4, pb: 20, mx: 'auto'}}>
          {exercises ? (
            exercises.map((exercise, ndx): ReactNode => {
              return (
                <Grid2 key={ndx} size={4} sx={{height: 'auto'}}>
                  <Card variant="outlined" sx={{height: '100%'}}>
                    <CardContent className="mui-card-content">
                      <Stack spacing={1}>
                        <Typography
                          variant="h5"
                          sx={{marginTop: 2, marginBottom: 2}}
                        >
                          {exercise.name}
                        </Typography>
                        <img
                          src={exercise.imageUrl}
                          alt={
                            exercise.imageUrl ? 'Photo of ' + exercise.name : ''
                          }
                          loading="lazy"
                          style={{
                            height: 190,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            height: 120,
                            wordWrap: 'break-word',
                            overflowY: 'auto',
                          }}
                        >
                          {exercise.description}
                        </Typography>
                        <Button
                          component={Link}
                          to={exercise.videoUrl}
                          disabled={exercise.videoUrl.length === 0}
                          sx={{
                            display: 'block',
                            fontSize: 12,
                            width: 330,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {exercise.videoUrl
                            ? exercise.videoUrl
                            : 'No video linked'}
                        </Button>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            my: 2,
                          }}
                        >
                          Tags:
                          {exercise.tags
                            ? exercise.tags
                              .map((t): string => {
                                return t.name
                              })
                              .join(', ')
                            : ''}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={4}
                        sx={{justifyContent: 'center', pt: 6}}
                      >
                        <Button
                          variant="outlined"
                          component={Link}
                          to={`/exercises/${exercise.id}`}
                        >
                          View
                        </Button>
                        <DeleteModal initOpen={false} handleDelete={handleDelete} id={exercise.id}></DeleteModal>
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
  )
}
