import {Box, Button, Modal, Typography} from "@mui/material";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";

// @ts-ignore
export default function WorkoutModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} sx={{height: 50, m: "auto"}}><AddIcon/> New Workout</Button>
      <Modal
        aria-labelledby="create-workout-modal"
        aria-describedby="create-new-workout"
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          zIndex: 'modal',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
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
        </Box>
      </Modal>
    </React.Fragment>
  )
}