import {createFileRoute, useRouter} from '@tanstack/react-router'
import React, {ChangeEvent, useEffect, useState} from 'react';
import {api} from "../../../static/js/api";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  ListItem,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteModal from "../../components/delete-modal";
import CloseIcon from "@mui/icons-material/Close";
import UpdateModal from "../../components/update-modal";

export const Route = createFileRoute('/workouts/create-workout')({
  component: CreateWorkoutComponent
})

export function CreateWorkoutComponent(props: any) {
  const router = useRouter()
  const [editMode, setEditMode] = React.useState<boolean>(props.editMode ?? false);
  const [workout, setWorkout] = useState<Workout>({
    id: null,
    name: 'New Workout',
    description: '',
    exerciseData: [],
    tags: [],
  } as Workout)
  const [dbTags, setDbTags] = React.useState<Tag[]>([])
  const [selectedExerciseId, setSelectedExerciseId] = React.useState<string>("");
  const [dbExercises, setDbExercises] = React.useState<Exercise[]>([]);

  // Universal input handler
  const handleInputChange = (e: any) => {
    if (e.target) {
      const {name, value} = e.target
      setWorkout({...workout, [name]: value})
    }
  }

  const handleExerciseDataInputChange = (e: any, eNdx: number) => {
    if (e.target) {
      const {name, value} = e.target;
      // @ts-ignore
      workout.exerciseData[eNdx][name] = value;
      setWorkout({ ...workout });
    }
  }

  const handleTagSelect = (e: any, vs: Tag[]) => {
    setWorkout({...workout, tags: vs})
  }

  const handleClear = () => {
    setWorkout({
      id: null,
      name: 'New Workout',
      description: '',
      exerciseData: [],
      tags: [],
    });
  }

  // TODO: Validate data?
  const runValidation = () => {
  }

  const handleSubmit = () => {
    if (workout.id) {
      api
        .put(`http://localhost:8080/workouts/${workout.id}`, {}, JSON.stringify(workout))
        .then((result: any) => {
          if (!(result as any).error) {
            console.log('PUT Success!', result as Workout)
          } else {
            console.error("Error occurred when updating workout:", (result as any).status, (result as any).error)
          }
        });
    } else {
      api
        .post('http://localhost:8080/workouts', {}, JSON.stringify(workout))
        .then((result: any) => {
          if (!(result as any).error) {
            console.log('POST Success!', result as Workout)
            void router.navigate({to: '/workouts'})
          } else {
            console.error("Error occurred when creating workout:", (result as any).status, (result as any).error)
          }
        });
    }
  }

  const handleDelete = (wid: string | null) => {
    if (wid) {
      api.delete<Workout>(`http://localhost:8080/workouts/${wid}`).then(
        (result) => {
          if ((result as any).ok) {
            console.log(`DELETE success ${wid}`);
            void router.navigate({to: '/workouts'});
          } else {
            console.error("Error occurred when deleting workout:", (result as any).status, (result as any).statusText)
          }
        }
      )
    } else {
      void router.navigate({to: '/workouts'});
    }
  }

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let exToAdd = dbExercises.filter((e) => {
      return e.id === event.target.value
    })[0] as Exercise;
    setWorkout({
      ...workout, exerciseData: workout.exerciseData.concat({
        id: null,
        eid: exToAdd.id,
        name: exToAdd.name,
        sets: "0",
        reps: "0",
      } as ExerciseData)
    });
  }

  const handleDeleteExercise = (eNdx: number) => () => {
    setWorkout({...workout, exerciseData: workout.exerciseData.toSpliced(eNdx, 1)});
  }

  useEffect(() => {
    let ignore = false

    if (props.wid) {
      api.get<Workout>(`http://localhost:8080/workouts/${props.wid}`).then(
        (result) => {
          if (!(result as any).error) {
            setWorkout(result);
          } else {
            console.error('Error occurred when fetching workout: ', (result as any).status, (result as any).error);
            void router.navigate({to: '/workouts'});
          }
        }
      )
    }

    api.get<Exercise[]>(`http://localhost:8080/exercises`).then(
      (result) => {
        if (!(result as any).error) {
          setDbExercises(result);
        } else {
          console.error('Error occurred when fetching exercises: ', (result as any).status, (result as any).error);
        }
      }
    )

    api.get<Tag[]>('http://localhost:8080/tags').then(
      (result) => {
        if (!ignore) {
          if (!(result as any).error) {
            setDbTags(result)
          } else {
            console.error('Error occurred when fetching tags: ', (result as any).status, (result as any).error);
          }
        }
      }
    )
  }, [])

  return (
    <React.Fragment>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h3" sx={{m: 4}}>
          Create New Workout
        </Typography>
        <div className="spacer"></div>
        <Button
          onClick={() => {
            router.history.back()
          }}
          sx={{height: 50, m: 'auto'}}
        >
          <ArrowBackIosIcon/> Back
        </Button>
      </Box>
      <FormControl
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          width: '800px',
          mx: 'auto',
          my: 4,
          padding: '2rem',
        }}
      >
        <TextField
          required
          name="name"
          label="Name"
          placeholder="Enter name..."
          onChange={handleInputChange}
          value={workout.name}
        />
        <TextField
          name="description"
          label="Description"
          placeholder="Enter description..."
          onChange={handleInputChange}
          value={workout.description}
          minRows="3"
        />
        <Typography variant="h6">Exercises</Typography>
        <TextField
          id="exercise-select"
          value={selectedExerciseId}
          label="Add an exercise..."
          select
          onChange={handleSelectChange}
        >
          {dbExercises.map((ex) => {
            return (
              <MenuItem value={ex.id ? ex.id : ""}>{ex.name}</MenuItem>
            );
          })}
        </TextField>
        <Stack className="zebra">
          {workout.exerciseData.map((edata, eNdx) => {
            return (
              <ListItem key={eNdx} sx={{ gap: 4 }}>
                <TextField
                  name="name"
                  label="Name"
                  type="text"
                  value={workout.exerciseData[eNdx].name}
                  sx={{ flexGrow: 1 }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <TextField
                  name="sets"
                  label="Sets"
                  type="number"
                  onChange={(e) => { handleExerciseDataInputChange(e, eNdx)}}
                  value={workout.exerciseData[eNdx].sets}
                  sx={{ width: "120px" }}
                />
                <TextField
                  name="reps"
                  label="Reps"
                  type="number"
                  onChange={(e) => { handleExerciseDataInputChange(e, eNdx)}}
                  value={workout.exerciseData[eNdx].reps}
                  sx={{ width: "120px" }}
                />
                <Button
                  onClick={handleDeleteExercise(eNdx)}
                >
                  <CloseIcon/>
                </Button>
              </ListItem>
            )
          })}
        </Stack>
        <Autocomplete
          multiple
          id="tags-standard"
          options={dbTags as Tag[]}
          getOptionLabel={(option) => option.name}
          onChange={handleTagSelect}
          value={workout ? workout.tags : []}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tags"
              placeholder="Enter tag..."
            />
          )}
        />
        <Stack direction="row" spacing={4} sx={{mr: 2, ml: 'auto', pt: 6, width: "100%", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={handleClear} sx={{ mr: "auto!important" }}>
            Clear
          </Button>
          {workout.id ?
            (
              <React.Fragment>
                <DeleteModal initOpen={false} handleDelete={handleDelete} id={workout.id}></DeleteModal>
                <UpdateModal initOpen={false} handleUpdate={handleSubmit} id={workout.id}/>
              </React.Fragment>
            ) :
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          }
        </Stack>
      </FormControl>
    </React.Fragment>
  )
}
