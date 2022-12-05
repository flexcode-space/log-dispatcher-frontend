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
  IconButton,
} from "@mui/material";
import { PlusCircleOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { DataGrid } from "src/components/table";
import { modal, closeModal } from "src/state/modal";

export const ModalDataPadam = () => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-data-padam";

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

  const columns = [
    {
      flex: 0.25,
      minWidth: 100,
      field: "penyulang",
      headerName: "Penyulang",
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: "kw",
      headerName: "KW",
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: "menit",
      headerName: "Menit",
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: "kwh",
      headerName: "kwh",
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: "keterangan",
      headerName: "Keterangan",
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: "aksi",
      headerName: "Aksi",
    },
  ];

  const dataMock = [{ id: 1, penyulang: "Penyulang 1", kw: 0 }];

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        onClose={onClickCloseModal}
        maxWidth="md"
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
                width: "100%",
              }}
            >
              <Box sx={{ mb: 8 }}>
                <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                  Data Padam
                </Typography>
              </Box>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <DataGrid
                    sx={{ minWidth: "750px" }}
                    hideFooter
                    autoHeight
                    columns={columns}
                    rows={dataMock}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Tambah Data Padam
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <InputField name="penyulang" label="Penyulang" />
                    </Grid>
                    <Grid item xs={3}>
                      <InputField name="kw" label="KW" />
                    </Grid>
                    <Grid item xs={3}>
                      <InputField name="menit" label="Menit" />
                    </Grid>
                    <Grid item xs={3}>
                      <InputField name="keterangan" label="Keterangan" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button sx={{ height: "30px" }} variant="outlined">
                    <PlusCircleOutline />
                    Tambah
                  </Button>
                </Grid>
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
