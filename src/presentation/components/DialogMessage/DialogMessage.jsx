import React, { useState, useEffect } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, CircularProgress, Typography } from '@mui/material'
import './DialogMessage.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMessage = (props) => {
  // console.log(props);
  const { handleButtonRead, handleButonReadAndWrite } = props
  const [open, setOpen] = useState(false);
  const [infoDialog, setinfoDialog] = useState(props.info)

  const { title,
    body,
    buttonCancel,
    buttonAccept,
    buttonClose,
    buttonAcceptDialogSave,
    callback,
    buttonRead,
    butonReadAndWrite,
    type
  } = infoDialog

  useEffect(() => {
    // console.log('DIALOGO:::', infoDialog);
    setinfoDialog(props.info)


  }, [props.info])


  const handleCancel = () => {
    props.handleCancelDialog()
  };

  const handleAccept = () => {
    props.handleAcceptDialog(true)
  };

  const handleAcceptDialogSave = () => {
    props.handleAcceptDialogSave(true)
  }

  const handleClose = () => {
    props.handleCloseDialog(true)
  }



  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      // fullWidth
      // className='shadow-drop-2-center'
      // className='scale-up-center'
      >
        {type === 0 ?
          // Messagge
          <>
            <DialogTitle color="primary" style={{ borderBottom: '1px solid #C1C1C1', backgroundColor: '#004E98', color: '#fff' }} variant='h5'>{title}</DialogTitle>
            <DialogContent
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '600px',
                height: 'calc(300px - (64px + 60.5px))',
                padding: '0px'
              }}
            >
              <div id="alert-dialog-slide-description">
                <Typography variant='h6' style={{ fontWeight: 'lighter', padding: '0 56px', textAlign: 'center' }}>
                  {body}
                </Typography>
              </div>
            </DialogContent>
          </>

          : type === 1 ?
            // Loading
            <DialogContent
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '600px',
                height: 'calc(300px - 16px)',
                padding: '0px'
              }}
            >
              <div id="alert-dialog-slide-description" style={{ display: 'flex', flexDirection: 'column', gap: '23px' }}>
                <CircularProgress size={90} style={{ width: '100%', justifyContent: 'center', display: 'flex' }}></CircularProgress> <br />
              </div>
              <Typography style={{ margin: '0px', padding: '0 56px', fontWeight: 'lighter' }}>
                {body && body.length > 0 ? body : 'Espere un momento, por favor...'}
              </Typography>

            </DialogContent>

            : type === 2 ?
              // Success
              <DialogContent
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '600px',
                  height: 'calc(300px - 52.5px)',
                  padding: '0px'
                }}
              >
                <div id="alert-dialog-slide-description" style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
                  <div style={{ width: '100%', justifyContent: 'center', display: 'flex', color: 'green' }}>
                    <CheckCircleOutlineIcon size={320} style={{ fontSize: '144px' }} /> <br />
                  </div>
                  <Typography variant='h6' style={{ fontWeight: 'lighter' }}>
                    {body}
                  </Typography>
                </div>
              </DialogContent>

              : type === 3 ?
                // Error
                <DialogContent
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '600px',
                    height: 'calc(300px - 52.5px)',
                    padding: '0px'
                  }}
                >
                  <div id="alert-dialog-slide-description" style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                    <div style={{ width: '100%', justifyContent: 'center', display: 'flex', color: 'orange' }}>
                      <ErrorOutlineIcon size={320} style={{ fontSize: '144px' }} /> <br />
                    </div>
                    <Typography variant='h6' style={{ padding: '0 34px', textAlign: 'center', fontWeight: 'lighter' }}>
                      {body}
                    </Typography>
                  </div>
                </DialogContent>
                : null
        }
        <DialogActions style={{ paddingBottom: '16px', paddingRight: '24px' }}>
          {buttonCancel ?
            <Button variant='contained' color='inherit' onClick={handleCancel}><strong>Cancelar</strong></Button>
            : null
          }
          {buttonAccept ?
            <Button variant='contained' color='primary' onClick={handleAccept}><strong>Aceptar</strong></Button>
            : null
          }
          {buttonClose ?
            <Button variant='contained' color='primary' onClick={handleClose}><strong>Aceptar</strong></Button>
            : null
          }

        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogMessage
