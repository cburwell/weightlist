import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack} from "@mui/material";
import React, {useEffect} from "react";

export default function DeleteModal({initOpen = false, handleDelete, id}: { initOpen: boolean, handleDelete: any, id: string | null }) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleModalDelete = () => {
    handleDelete(id);
    handleClose();
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      setOpen(initOpen);
    }

    return () => {
      ignore = true;
    }
  }, [initOpen]);

  return (
    <React.Fragment>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Box sx={{width: 200 }}>
              Delete this item?
          </Box>
        </DialogTitle>
        <DialogActions>
          <Stack direction="row" spacing={4} sx={{mr: 2, ml: 'auto', p: 2}}>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleModalDelete} autoFocus>
              Delete
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}