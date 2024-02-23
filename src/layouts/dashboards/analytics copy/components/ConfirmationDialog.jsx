import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

export default function ConfirmationDialog({msg="Are you sure you want to delete template: ",handleClick,open,setOpen,title,id}) {

const handleClose = () => {
    setOpen(false);
    };

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Template Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg} <strong>{title}</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
          <Button sx={{color:"red","&:hover":{background:"red",color:"#fff"}}} onClick={()=>handleClick(id)}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
  )
}
