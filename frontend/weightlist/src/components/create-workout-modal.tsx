import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Modal, Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import * as React from "react";
import {Key, useEffect} from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import {api} from "../../static/js/api";

interface ChipData {
  key: number;
  label: string;
}

export default function WorkoutModal(workouts: Workout[]) {
  // TODO: move to global store
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [eid, setEid] = React.useState('');
  // TODO: Change this to be selected exercises
  const [exerciseIds, setExerciseIds] = React.useState<string[]>([]);
  const [newWorkout, setNewWorkout] = React.useState<Workout>(
    {
      id: "",
      name: "New Workout",
      description: "",
      exerciseData: [],
      tags: []
    } as Workout
  );

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleChipDelete = (chipToDelete: string) => () => {
    setNewWorkout({...newWorkout, exerciseData: newWorkout.exerciseData.filter((edata) => edata.eid !== chipToDelete)});
  };

  const handleDeleteExercise = (eid: string) => () => {
    setNewWorkout({...newWorkout, exerciseData: newWorkout.exerciseData.filter((edata) => edata.id !== eid)});
  };

  // Exercise select handler
  const handleExerciseSelectChange = (event: SelectChangeEvent) => {
    if (event) {
      setEid(event.target.value);

      setNewWorkout({...newWorkout, exerciseData: newWorkout.exerciseData.concat(
          {
            "id": event.target.value,
            "name": getExerciseName(event.target.value),
            "sets": "0",
            "reps": "0"
          })});
    }
  };

// Generic input change handler
  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setNewWorkout({...newWorkout, [name]: value});
  };

  const getExerciseName = (eid: string): string => {
    return exercises.filter((es) => es.id === eid).map(e => e.name)[0];
  }

  useEffect(() => {
    let ignore = false;

    api.get<Tag[]>("http://localhost:8080/tags").then(result => {
      if (!ignore) {
        setTags(result);
      }
    }, (err) => {
      console.error("Error occurred when fetching data: ", err);
    });

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
      <Button onClick={handleModalOpen} sx={{height: 50, m: "auto"}}><AddIcon/> New Workout</Button>
      <Modal
        aria-labelledby="create-workout-modal"
        aria-describedby="create-new-workout"
        open={modalOpen}
        onClose={handleModalClose}
      >
        <Stack spacing={4} sx={{
          zIndex: 'modal',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" id="create-workout-modal" className="modal-title">
            Create New Workout
          </Typography>
          <Typography variant="body2" id="create-new-workout" className="modal-description">
            Add details below to create your new workout.
          </Typography>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}>
            <TextField required name="name" label="Name" placeholder="Enter name..." onChange={handleInputChange}
                       value={newWorkout.name}/>
            <TextField name="description" label="Description" placeholder="Enter description..."
                       onChange={handleInputChange} value={newWorkout.description}/>
            <FormControl>
              <InputLabel id="exercise-label">Exercise</InputLabel>
              <Select
                name="exerciseSelect"
                labelId="exercise-select-label"
                id="exercise-select"
                value={eid}
                label="Add exercises to your list"
                onChange={handleExerciseSelectChange}
              >
                {exercises.map((e) => {
                  return (
                    <MenuItem value={e.id} key={e.id}>{e.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            {/*TODO need to maintain a separate array to push values to in order to allow dupes */}
            <Stack className="zebra">
              {newWorkout.exerciseData.map((edata, ndx) => {
                return (
                  <ListItem key={ndx}>
                    {ndx+1}:
                    {edata.name} :
                    <TextField name="sets" label="Sets" type="number" onChange={handleInputChange} value={newWorkout.exerciseData[ndx].sets}/> :
                    <TextField name="reps" label="Reps" type="number" onChange={handleInputChange} value={newWorkout.exerciseData[ndx].reps}/> :
                    <Button onClick={handleDeleteExercise(edata.id)}><CloseIcon /></Button>
                  </ListItem>
                );
              })}
            </Stack>
            <Stack direction="row">
              {exerciseIds.map((data) => {
                return (
                  <ListItem key={"db-" + (data as Key)}>
                    <Chip
                      label={data}
                      onDelete={handleChipDelete(data)}
                    />
                  </ListItem>
                );
              })}
            </Stack>
            <Autocomplete
              multiple
              id="tags-standard"
              options={tags as Tag[]}
              getOptionLabel={option => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Tags"
                  placeholder="Enter tag..."
                />
              )}
            />
          </FormControl>
        </Stack>
      </Modal>
    </React.Fragment>
  )
}