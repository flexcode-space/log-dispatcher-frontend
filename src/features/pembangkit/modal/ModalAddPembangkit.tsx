import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { StyledForm } from "../Pembangkit.styled";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";

import { pembangkitApi } from "src/api/pembangkit";
import { closeModal, modal, reloadPage } from "src/state/modal";

import { useModal } from "./useModal";
import { initialValues, validationSchema } from "./ModalAdd.constants";

const ModalAddPembangkit = () => {
  const {
    subsistemOptions,
    garduIndukOptions,
    jenisPembangkitOptions,
    bahanBakarOptions,
    kategoriPembangkitOptions,
  } = useModal();

  const { createPembangkit, getPembangkitDetail, updatePembangkit } =
    pembangkitApi();

  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-pembangkit";

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
      if (modalSnapshot.id) {
        await updatePembangkit(payload);
      } else {
        await createPembangkit(payload);
      }
      closeModal();
      reloadPage();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      getPembangkitDetail(modalSnapshot.id).then((data: any) => {
        const {
          gardu_induk,
          scada,
          sub_sistem,
          bahan_bakar,
          jenis,
          kategori,
          ...rest
        } = data;

        formMethods.reset({
          ...rest,
          ...scada,
          gardu_induk_id: gardu_induk.id,
          sub_sistem_id: sub_sistem.id,
          bahan_bakar_id: bahan_bakar.id,
          jenis_pembangkit_id: jenis.id,
          kategori_pembangkit_id: kategori.id,
        });
      });
    }
  }, [modalSnapshot.id]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onClickCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit}>
          <DialogContent
            sx={{
              pb: 6,
              px: { xs: 8, sm: 15 },
              pt: 6,
              position: "relative",
            }}
          >
            <Box sx={{ mb: 8 }}>
              <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                Tambah Pembangkit
              </Typography>
            </Box>
            <Grid container spacing={1}>
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
            <Button variant="outlined" onClick={onClickCloseModal}>
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

export default ModalAddPembangkit;
