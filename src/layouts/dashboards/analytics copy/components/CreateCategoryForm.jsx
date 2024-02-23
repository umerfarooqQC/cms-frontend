import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { apiClient } from "services/api";

export const CreateCategoryForm = ({ getCategories, open, setOpen }) => {
  const [name, setName] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (name) => {
    const result = await apiClient.createCategory(name);
    if (!result.success) {
      setMessage("There was an error while creating category, please try again");
      setToastOpen(true);
    }

    setMessage("Category Created Successfully");
    setToastOpen(true);
    getCategories();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={message}
        key={"TopCenter"}
      />
      <Dialog
        open={open}
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit(name);
            handleClose();
          },
        }}
      >
        <DialogTitle> Create Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Category Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
