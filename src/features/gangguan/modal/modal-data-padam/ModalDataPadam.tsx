import React, { useEffect, useState } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DeleteOutline,
  PencilOutline,
  PlusCircleOutline,
} from "mdi-material-ui";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { DataGrid } from "@mui/x-data-grid";
import { modal, closeModal } from "src/state/modal";
import {
  defaultColumns,
  validationSchema,
  initialValues,
} from "./ModalDataPadam.constant";
import { dataPadamApi } from "src/api/data-padam";
import { gangguan, removeGangguanID } from "../../state/gangguan";
import { reloadPage, setReloadPage } from "src/state/reloadPage";
import { CellType } from "src/types";

export const ModalDataPadam = () => {
  const modalSnapshot = useSnapshot(modal);
  const gangguanSnap = useSnapshot(gangguan);
  const reloadPageSnap = useSnapshot(reloadPage);

  const [isAddDataPadam, setIsAddDataPadam] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    getDataPadamList,
    dataPadamList,
    createDataPadam,
    updateDataPadam,
    deleteDataPadam,
  } = dataPadamApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-data-padam";

  const columns = [
    ...defaultColumns,
    {
      flex: 0.25,
      minWidth: 100,
      field: "aksi",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              formMethods.reset({ ...row });
              setIsAddDataPadam(true);
              setIsEdit(true);
            }}
          >
            <PencilOutline />
          </IconButton>
          <IconButton>
            <DeleteOutline onClick={() => onClickDelete(row?.id)} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      if (isEdit) {
        await updateDataPadam({
          ...values,
          gangguan_id: gangguanSnap.gangguanId,
        });
      } else {
        await createDataPadam({
          ...values,
          gangguan_id: gangguanSnap.gangguanId,
        });
      }
      setIsAddDataPadam(false);
      setIsEdit(false);
      formMethods.reset({ ...initialValues });
      setReloadPage("data-padam");
    })();
  };

  const onClickDelete = async (id: string) => {
    if (confirm("Hapus Data ini ?")) {
      await deleteDataPadam({ id });
      setReloadPage("data-padam");
    }
  };

  const handleCloseModal = () => {
    closeModal();
    removeGangguanID();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.isOpen) {
      getDataPadamList({ gangguan_id: gangguanSnap.gangguanId });
    }
  }, [modalSnapshot.isOpen]);

  useEffect(() => {
    if (reloadPageSnap.target === "data-padam") {
      getDataPadamList({ gangguan_id: gangguanSnap.gangguanId });
    }
  }, [reloadPageSnap.id]);

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        onClose={handleCloseModal}
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
                    rows={dataPadamList}
                  />
                </Grid>
                <Grid item xs={12}>
                  {isAddDataPadam && (
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
                        <InputField type="number" name="kw" label="KW" />
                      </Grid>
                      <Grid item xs={3}>
                        <InputField type="number" name="menit" label="Menit" />
                      </Grid>
                      <Grid item xs={3}>
                        <InputField name="keterangan" label="Keterangan" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="text"
                          onClick={() => {
                            setIsAddDataPadam(false);
                            formMethods.reset({ ...initialValues });
                            setIsEdit(false);
                          }}
                        >
                          Batal
                        </Button>
                        <Button type="submit" variant="outlined">
                          Simpan
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {!isAddDataPadam && (
                  <Grid item xs={12}>
                    <Button
                      onClick={() => setIsAddDataPadam(true)}
                      sx={{ height: "30px" }}
                      variant="outlined"
                    >
                      <PlusCircleOutline />
                      Tambah
                    </Button>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions className="dialog-actions-dense">
              <Button variant="contained" onClick={handleCloseModal}>
                Tutup
              </Button>
            </DialogActions>
          </StyledForm>
        </FormProvider>
      </Dialog>
    </>
  );
};
