import React, { useState, useEffect } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  CircularProgress,
  Typography
}
  from '@mui/material'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Loading = () => {

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>Cargando</DialogTitle>

        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DialogContentText id="alert-dialog-slide-description" style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              <CircularProgress size={80} /> <br />
            </div>
            <Typography>
              Espere un momento, por favor...
            </Typography>
          </DialogContentText>
        </DialogContent>

      </Dialog>
    </div>
  );
}

export default Loading
