import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

interface Props {
  title: string
  body: string
  onSubmit: () => void
  onCancel: () => void
  submitTitle?: string
  cancelTitle?: string
}

const Confirmation: React.FC<Props> = ({
  title,
  body,
  onSubmit,
  onCancel,
  submitTitle = 'Submit',
  cancelTitle = 'Cancel'
}) => {
  return (
    <Dialog
      open
      onClose={onCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelTitle}</Button>
        <Button onClick={onSubmit} autoFocus>
          {submitTitle}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmation
