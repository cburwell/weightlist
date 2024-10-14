import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  ListItem, MenuItem,
  Modal,
  Select, SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import {api} from "../../static/js/api";

interface ChipData {
  key: number;
  label: string;
}

// @ts-ignore
export default function WorkoutModal() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
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
        <Box sx={{
          zIndex: 'modal',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
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
          <FormControl>
            <TextField required label="Required" defaultValue="Enter name..." />
            <TextField label="Required" defaultValue="Enter description..." />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Exercise</InputLabel>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
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
            </Box>
            <Autocomplete
              disablePortal
              options={tags as Tag[]}
              sx={{ width: 300 }}
              getOptionLabel={option => option.name}
              renderInput={(params) => <TextField {...params} label="Tags" />}
            />
          </FormControl>
        </Box>
      </Modal>
    </React.Fragment>
  )
}