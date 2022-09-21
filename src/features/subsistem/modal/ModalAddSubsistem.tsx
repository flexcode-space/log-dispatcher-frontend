import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";

import { useState } from "react";
import { StyledForm } from "../Subsistem.styled";
import { InputField } from "src/components/input-field";

type ModalAddSubsistemProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddSubsistem = ({ open, handleClose }: ModalAddSubsistemProps) => {
  const [fields, setFields] = useState<Array<number>>([0]);

  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Tambah Subsistem</DialogTitle>
      <DialogContent>
        <StyledForm noValidate sx={{ width: "500px" }}>
          <Grid container spacing={1} mt={1}>
            {fields.map((index) => {
              return (
                <InputField
                  key={`subsistem-${index}`}
                  name="name"
                  label={`Nama Subsistem ${index + 1}`}
                />
              );
            })}
          </Grid>
          <Button
            style={{ width: "250px" }}
            sx={{ mb: 2 }}
            onClick={() =>
              setFields((prevState) => [...prevState, fields.length])
            }
            variant="outlined"
          >
            Tambah Subsistem
          </Button>
        </StyledForm>
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button variant="outlined" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="contained" onClick={() => null}>
          Tambah
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddSubsistem;
