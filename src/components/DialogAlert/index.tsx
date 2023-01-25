import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ExtendButtonBase, IconButtonTypeMap } from '@mui/material';

interface DialogAlertProps {
  open: boolean;
  title: string;
  message: string;
  handleClose: () => void;
  onConfirm: () => void;
  childen?: React.ReactNode | React.ReactNode[];
}

export default function DialogAlert({ open, title, message, handleClose, childen, onConfirm }: DialogAlertProps) {

  return (
    <div>
      {childen}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            autoFocus onClick={onConfirm}
          >Confirmar
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}