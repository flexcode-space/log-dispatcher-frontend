import React, { useMemo, useState } from "react";
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
import { Pencil } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";

export const ModalKeteranganGangguan = () => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-keterangan-gangguan";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      //  TODO: handle submit
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    // formMethods.reset({ ...initialValues });
  };

  const fieldsRender = useMemo((): React.ReactNode => {
    const fieldsMap = [
      { label: "Beban Sistem" },
      { label: "Beban Sebelumnya" },
      { label: "Cuaca" },
      { label: "FL" },
      { label: "Counter PMT" },
      { label: "Counter LA" },
      { label: "Arus Ganggung" },
      { label: "Lain-Lain" },
    ];

    return fieldsMap.map(({ label }) => (
      <Grid item xs={12} key={label}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={11}>
            <InputField name="nama" label={label} />
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth sx={{ mb: 3 }} size="medium" variant="outlined">
              <Pencil />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    ));
  }, []);

  return (
    <>
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
                  Keterangan Gangguan
                </Typography>
              </Box>
              <Grid container spacing={2} mt={1}>
                {fieldsRender}
              </Grid>
            </DialogContent>
            <DialogActions className="dialog-actions-dense">
              <Button variant="contained" onClick={onClickCloseModal}>
                Tutup
              </Button>
            </DialogActions>
          </StyledForm>
        </FormProvider>
      </Dialog>
    </>
  );
};
