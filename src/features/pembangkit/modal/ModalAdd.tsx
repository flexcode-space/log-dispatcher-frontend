import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "../Pembangkit.styled";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";

import { pembangkitApi } from "src/api/pembangkit";

import { useModal } from "./useModal";
import { initialValues, validationSchema } from "./ModalAdd.constants";

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

  const { createPembangkit } = pembangkitApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { b1, b2, b3, dmn, tml, ...rest } = values;

      const payload = {
        ...rest,
        dmn: Number(values.dmn),
        tml: Number(values.tml),
        scada: { b1, b2, b3 },
      };

      await createPembangkit(payload);
      handleClose();
    })();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate sx={{ width: "500px" }} onSubmit={onSubmit}>
          <DialogTitle id="max-width-dialog-title">
            Tambah Pembangkit
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Subsistem"
                  name="sub_sistem_id"
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
                <InputField type="number" name="dmn" label="DMN" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField type="number" name="tml" label="TML" />
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
                <InputField name="id_amr" label="ID Point" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Tambah
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAdd;
