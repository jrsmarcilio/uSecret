import { AlertColor } from "@mui/material";

export interface ToastProps {
  open: boolean;
  message: string;
  handleClose: () => void;
  severity?: AlertColor;
}