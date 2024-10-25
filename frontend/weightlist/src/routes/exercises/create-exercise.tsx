import {createFileRoute, useRouter} from '@tanstack/react-router'
import {Autocomplete, Box, Button, FormControl, Paper, Stack, TextField, Typography,} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import * as React from 'react'
import {useEffect, useState} from 'react'
import {api} from '../../../static/js/api'
import DeleteModal from "../../components/delete-modal";

export const Route = createFileRoute('/exercises/create-exercise')({
  component: CreateExerciseComponent,
})

export function CreateExerciseComponent(props: any) {
  const router = useRouter()
  const [exercise, setExercise] = useState<Exercise>({
    id: null,
    name: 'New Exercise',
    description: '',
    imageUrl: '',
    videoUrl: '',
    tags: [],
  } as Exercise)
  const [dbTags, setDbTags] = React.useState<Tag[]>([])

  // Universal input handler
  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setExercise({...exercise, [name]: value})
  }

  const handleTagSelect = (e: any, vs: Tag[]) => {
    setExercise({...exercise, tags: vs})
  }

  const handleClear = () => {
    setExercise({
      id: null,
      name: 'New Exercise',
      description: '',
      imageUrl: '',
      videoUrl: '',
      tags: [],
    })
  }

  // TODO: Validate data?
  const runValidation = () => {
  }

  const handleSubmit = () => {
    if (exercise.id) {
      api
        .put(`http://localhost:8080/exercises/${exercise.id}`, {}, JSON.stringify(exercise))
        .then((result: any) => {
          if (!(result as any).error) {
            console.log('PUT Success!', result as Exercise)
          } else {
            console.error("Error occurred when updating exercise:", (result as any).status, (result as any).error)
          }
        });
    } else {
      api
        .post('http://localhost:8080/exercises', {}, JSON.stringify(exercise))
        .then((result: any) => {
          if (!(result as any).error) {
            console.log('POST Success!', result as Exercise)
            void router.navigate({to: '/exercises'})
          } else {
            console.error("Error occurred when creating exercise:", (result as any).status, (result as any).error)
          }
        });
    }
  }

  const handleDelete = (eid: string | null) => {
    if (eid) {
      api.delete<Exercise>(`http://localhost:8080/exercises/${eid}`).then(
        (result) => {
          if ((result as any).ok) {
            console.log(`DELETE success ${eid}`);
            void router.navigate({to: '/exercises'});
          } else {
            console.error("Error occurred when deleting exercise:", (result as any).status, (result as any).statusText)
          }
        }
      )
    }
    else {
      void router.navigate({to: '/exercises'});
    }
  }

  useEffect(() => {
    let ignore = false

    if (props.eid) {
      api.get<Exercise>(`http://localhost:8080/exercises/${props.eid}`).then(
        (result) => {
          if (!(result as any).error) {
            setExercise(result);
          } else {
            console.error('Error occurred when fetching exercise: ', (result as any).status, (result as any).error);
            void router.navigate({to: '/exercises'});
          }
        }
      )
    }

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
          Create New Exercise
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
          value={exercise.name}
        />
        <TextField
          name="description"
          label="Description"
          placeholder="Enter description..."
          onChange={handleInputChange}
          value={exercise.description}
          minRows="3"
        />
        <TextField
          name="imageUrl"
          label="Image URL"
          placeholder="Enter image URL..."
          type="url"
          onChange={handleInputChange}
          value={exercise.imageUrl}
        />
        <TextField
          name="videoUrl"
          label="Video URL"
          placeholder="Enter video URL..."
          type="url"
          onChange={handleInputChange}
          value={exercise.videoUrl}
        />
        <Autocomplete
          multiple
          id="tags-standard"
          options={dbTags as Tag[]}
          getOptionLabel={(option) => option.name}
          onChange={handleTagSelect}
          value={exercise ? exercise.tags : []}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tags"
              placeholder="Enter tag..."
            />
          )}
        />
        <Stack direction="row" spacing={4} sx={{mr: 2, ml: 'auto', pt: 6}}>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          {exercise.id &&
              <DeleteModal initOpen={false} handleDelete={handleDelete} id={exercise.id}></DeleteModal>
          }
          <Button variant="contained" onClick={handleSubmit}>
            {exercise.id ? "Update" : "Submit"}
          </Button>
        </Stack>
      </FormControl>
    </React.Fragment>
  )
}
