import Snackbar from "@mui/material/Snackbar";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert/Alert";

export interface ToastProps {
  open: boolean;
  message: string;
  handleClose: () => void;
  severity?: AlertColor;
}

export default function Toast({ handleClose, message, open, severity }: ToastProps) {

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );


  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      >
        <Alert
          onClose={handleClose} severity={severity ? severity : "success"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}