import HotToast from "react-hot-toast";
import Alert from "@mui/material/Alert";

const success = (message: string) => {
  return HotToast.custom(<Alert severity="success">{message}</Alert>, {
    duration: 500,
  });
};

const error = (message: string) => {
  return HotToast.custom(<Alert severity="error">{message}</Alert>, {
    duration: 500,
  });
};

export const toast = {
  success,
  error,
};
