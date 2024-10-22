import {createFileRoute, useNavigate, useRouter} from '@tanstack/react-router'
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Paper,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import * as React from 'react'
import {useEffect, useState} from 'react'
import {api} from "../../static/js/api";

export const Route = createFileRoute('/create-exercise')({
  component: CreateExerciseComponent,
})

function CreateExerciseComponent() {
  const router = useRouter();
  const [exercise, setExercise] = useState<Exercise>({
    id: null,
    name: "New Exercise",
    description: "",
    imageUrl: "",
    videoUrl: "",
    tags: []
  } as Exercise);
  const [dbTags, setDbTags] = React.useState<Tag[]>([]);

  // Universal input handler
  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setExercise({...exercise, [name]: value});
  };

  const handleTagSelect = (e: any, vs: Tag[]) => {
    setExercise({...exercise, tags: vs});
  }

  const handleClear = () => {
    setExercise({id: null, name: "New Exercise", description: "", imageUrl: "", videoUrl: "", tags: []});
  }

  // TODO: Validate data?
  const runValidation = () => {

  }

  const handleSubmit = () => {
    api.post("http://localhost:8080/exercises", {}, JSON.stringify(exercise)).then((result: any) => {
      if (result.error) {
        console.log(result.status, result.error);
        // TODO: Implement user facing error handling
      }
      else {
        console.log("Success!", result as Exercise);
        void router.navigate({to:"/exercises"});
      }
    });
  }

  useEffect(() => {
    let ignore = false;

    api.get<Tag[]>("http://localhost:8080/tags").then(result => {
      if (!ignore) {
        setDbTags(result);
      }
    }, (err) => {
      console.error("Error occurred when fetching data: ", err);
    });
  }, [exercise]);

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
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "600px",
          mx: "auto",
          my: 4,
          padding: "2rem"
        }}>
        <TextField required name="name" label="Name" placeholder="Enter name..."
                   onChange={handleInputChange} value={exercise.name}/>
        <TextField name="description" label="Description" placeholder="Enter description..."
                   onChange={handleInputChange} value={exercise.description} minRows="3" />
        <TextField name="imageUrl" label="Image URL" placeholder="Enter image URL..." type="url"
                   onChange={handleInputChange} value={exercise.imageUrl}/>
        <TextField name="videoUrl" label="Video URL" placeholder="Enter video URL..." type="url"
                   onChange={handleInputChange} value={exercise.videoUrl}/>
        <Autocomplete
          multiple
          id="tags-standard"
          options={dbTags as Tag[]}
          getOptionLabel={option => option.name}
          onChange={handleTagSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tags"
              placeholder="Enter tag..."
            />
          )}
        />
        <Stack direction="row" spacing={4} sx={{ mr: 2, ml: "auto", pt: 6 }}>
          <Button variant="outlined" onClick={handleClear} >Clear</Button>
          <Button variant="contained" onClick={handleSubmit} >Submit</Button>
        </Stack>
      </FormControl>
    </React.Fragment>
  )
}
