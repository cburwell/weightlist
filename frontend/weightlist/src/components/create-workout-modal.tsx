import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {api} from "../../static/js/api";

interface ChipData {
  key: number;
  label: string;
}

// @ts-ignore
export default function WorkoutModal() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    {key: 0, label: 'Angular'},
    {key: 1, label: 'jQuery'},
    {key: 2, label: 'Polymer'},
    {key: 3, label: 'React'},
    {key: 4, label: 'Vue.js'},
  ]);
  const [exercise, setExercise] = React.useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleChipDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setExercise(event.target.value);
  };

  useEffect(() => {
    let ignore = false;
    api.get<Tag[]>("http://localhost:8080/tags").then(result => {
      console.log(result);
      if (!ignore) {
        setTags(result);
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
          width: "auto",
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
            <TextField required label="Name" placeholder="Enter name..."/>
            <TextField label="Description" placeholder="Enter description..."/>
            <FormControl sx={{m: 1, minWidth: 120}}>
              <InputLabel id="exercise-label">Exercise</InputLabel>
              <Select
                labelId="exercise-select-label"
                id="exercise-select"
                value={exercise}
                label="Add exercises to your list"
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Bicep curls</MenuItem>
                <MenuItem value={2}>Squats</MenuItem>
                <MenuItem value={3}>OHP</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row">
              {chipData.map((data) => {
                return (
                  <ListItem key={data.key}>
                    <Chip
                      label={data.label}
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