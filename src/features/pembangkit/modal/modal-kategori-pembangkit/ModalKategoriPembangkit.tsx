import { useEffect, useState } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { closeModal, modal } from "src/state/modal";
import { InputField } from "src/components/input-field";
import {
  columns,
  validationSchema,
  initialValues,
} from "./ModalKategoriPembangkit.constant";
import { PlusCircleOutline } from "mdi-material-ui";
import { pembangkitApi } from "src/api/pembangkit";
import { yupResolver } from "@hookform/resolvers/yup";

const ModalKategoriPembangkit = () => {
  const modalSnapshot = useSnapshot(modal);

  const [isAdddData, setIsAddData] = useState<boolean>(false);

  const {
    getKategoriPembangkit,
    kategoriPembangkit,
    createKategoriPembangkit,
  } = pembangkitApi();

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-kategori-pembangkit";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      await createKategoriPembangkit(values);
      setIsAddData(false);
      getKategoriPembangkit();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    setIsAddData(false);
  };

  useEffect(() => {
    if (modalSnapshot.isOpen) {
      getKategoriPembangkit();
    }
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onClickCloseModal}
      maxWidth="lg"
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
            <Box sx={{ mb: 8, width: 1000 }}>
              <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                Kategori
              </Typography>
            </Box>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <DataGrid
                  hideFooter
                  autoHeight
                  columns={columns}
                  rows={kategoriPembangkit}
                />
              </Grid>
              <Grid item xs={12}>
                {isAdddData && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Kategori
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InputField name="nama" label="Nama" />
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="text"
                        onClick={() => setIsAddData(false)}
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
              {!isAdddData && (
                <Grid item xs={12}>
                  <Button
                    onClick={() => setIsAddData(true)}
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
            <Button variant="contained" onClick={onClickCloseModal}>
              Tutup
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalKategoriPembangkit;
