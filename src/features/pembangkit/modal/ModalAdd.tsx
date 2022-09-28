import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";

import { useState } from "react";
import { StyledForm } from "../Pembangkit.styled";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { useModal } from "./useModal";

type ModalAddProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalAdd = ({ open, handleClose }: ModalAddProps) => {
  const [fields, setFields] = useState<Array<number>>([0]);

  const {
    subsistemOptions,
    garduIndukOptions,
    jenisPembangkitOptions,
    bahanBakarOptions,
    kategoriPembangkitOptions,
  } = useModal();

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Tambah Pembangkit</DialogTitle>
      <DialogContent>
        <StyledForm noValidate sx={{ width: "500px" }}>
          <Grid container spacing={1} mt={1}>
            <Grid item xs={12} sm={6}>
              <SelectInput
                label="Subsistem"
                name="subsistem"
                options={subsistemOptions}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput
                label="Gardu Induk"
                name="gardu_induk_id"
                options={garduIndukOptions}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField name="nama" label="Nama Pembangkit" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput
                label="Jenis Pembangkit"
                name="jenis_pembangkit_id"
                options={jenisPembangkitOptions}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput
                label="Bahan Bakar"
                name="bahan_bakar_id"
                options={bahanBakarOptions}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                label="Kategori"
                name="kategori_pembangkit_id"
                options={kategoriPembangkitOptions}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField name="dmn" label="DMN" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField name="tml" label="TML" />
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
          </Grid>
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

export default ModalAdd;
