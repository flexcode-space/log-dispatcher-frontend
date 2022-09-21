import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";

import { useState } from "react";
import { StyledForm } from "../Reaktor.styled";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";

type ModalAddProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalAdd = ({ open, handleClose }: ModalAddProps) => {
  const [fields, setFields] = useState<Array<number>>([0]);

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        Tambah Reaktor & Kapasitor
      </DialogTitle>
      <DialogContent>
        <StyledForm noValidate sx={{ width: "500px" }}>
          <Grid container spacing={1} mt={1}>
            <Grid item xs={12} sm={4}>
              <SelectInput
                label="Subsistem"
                name="subsistem"
                options={[{ value: "1", label: "Subsistem 1" }]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                label="Gardu Induk"
                name="gardu_induk"
                options={[{ value: "1", label: "Gardu Induk Asal 1" }]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                label="Jenis"
                name="jenis"
                options={[{ value: "1", label: "Kapasitor" }]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField name="b1" label="B1" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField name="b2" label="B2" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField name="b3" label="B3" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField name="id_point" label="ID Point" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                label="Tegangan (KV)"
                name="tegangan"
                options={[{ value: "1", label: "100 KV" }]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField name="setting_ovr" label="Setting OVR" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField name="mvar" label="MVAR" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField name="nama_peralatan" label="Nama Peralatan" />
            </Grid>
          </Grid>
        </StyledForm>
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button variant="outlined" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="contained" onClick={() => null}>
          Tambah Busbar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAdd;
