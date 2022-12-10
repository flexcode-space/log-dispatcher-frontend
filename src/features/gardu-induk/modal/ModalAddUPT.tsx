import { useState, useEffect } from "react";
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
import { useSnapshot } from "valtio";
import { StyledForm } from "../GarduInduk.styled";
import { InputField } from "src/components/input-field";
import { modal, reloadPage, closeModal } from "src/state/modal";
import { uptApi } from "src/api/upt";

import { validationSchema, initialValues } from "./ModalAddUPT.constant";

const ModallAddUPT = () => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen = modalSnapshot.isOpen && modal.target === "modal-upt";

  const { createUPT } = uptApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onResetModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  const onClickCloseModal = () => {
    onResetModal();
  };

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    formMethods.handleSubmit(async (values) => {
      await createUPT(values);

      reloadPage();
      onResetModal();
    })();
  };

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
          <DialogTitle id="max-width-dialog-title">Tambah UPT</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={12}>
                <InputField name="nama" label="UPT" />
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

export default ModallAddUPT;
