import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { useModalAdd } from "./useModalAdd";
import { initialValues, validationSchema } from "./ModalAdd.constant";
import { pengaturanTeganganApi } from "src/api/pengaturan-tegangan";
import {
  konfigurasiPengaturanTegangan,
  removeData,
} from "../state/konfigurasiPengaturanTegangan";
import { useEffect } from "react";
import { setReloadPage } from "src/state/reloadPage";
import { TrashCanOutline } from "mdi-material-ui";

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(konfigurasiPengaturanTegangan);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-konfigurasi";

  const { garduIndukOptions, jenisSwitchingOptions } = useModalAdd();
  const { createKonfigurasi, updateKonfigurasi, deleteKonfigurasi } =
    pengaturanTeganganApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      if (modalSnapshot.id) {
        await updateKonfigurasi({
          id: modalSnapshot.id,
          gardu_induk_id: values.gardu_induk_id,
          jenis: values.jenis,
          jurusan: values.jurusan,
        });
      } else {
        await createKonfigurasi(values);
      }

      handleClickCloseModal();
      setReloadPage("modal-add-konfigurasi");
    })();
  };

  const handleDelete = async () => {
    await deleteKonfigurasi({ id: data.id });
    handleClickCloseModal();
    setReloadPage("modal-add-konfigurasi");
  };

  const handleClickCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      formMethods.reset({
        ...data,
        jenis: data.tipe,
        gardu_induk_id: data.gardu_induk.id,
      });
    }
  }, [modalSnapshot.id]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={handleClickCloseModal}
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
                Tambah Konfigurasi
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Lokasi"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Jenis Switching"
                  name="jenis"
                  options={jenisSwitchingOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Jurusan" name="jurusan" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                {modalSnapshot.id && (
                  <Button variant="text" onClick={handleDelete}>
                    <IconButton>
                      <TrashCanOutline />
                    </IconButton>
                    Hapus data
                  </Button>
                )}
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={handleClickCloseModal}>
                  Batal
                </Button>
                <Button variant="contained" type="submit">
                  Simpan
                </Button>
              </Box>
            </Stack>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAdd;
