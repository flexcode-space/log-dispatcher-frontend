import {
  Button,
  Switch,
  Dialog,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormControlLabel,
  DialogContentText,
} from "@mui/material";

import { StyledForm } from "../Subsistem.styled";

type ModalAddSubsistemProps = {
  open: boolean;
};

const ModalAddSubsistem = ({ open }: ModalAddSubsistemProps) => {
  const handleClose = () => null;

  return (
    <Dialog
      open={open}
      maxWidth="md"
      // fullScreen={true}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Tambah Subsistem</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 4 }}>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <DialogContentText sx={{ mb: 4 }}>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <DialogContentText sx={{ mb: 4 }}>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <StyledForm noValidate>
          {/* <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
          </FormControl> */}
          {/* <FormControlLabel
            label="Full width"
            sx={{ mt: 2 }}
            control={
              <Switch checked={true} onChange={() => null} />
            }
          /> */}
        </StyledForm>
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddSubsistem;
