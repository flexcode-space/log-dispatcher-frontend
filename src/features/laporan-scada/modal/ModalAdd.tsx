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
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { useModalAdd } from "./useModalAdd";
import { initialValues, validationSchema } from "./ModalAdd.constant";
import { laporanScadaApi } from "src/api/laporan-scada";
import dayjs from "dayjs";
import { setReloadPage } from "src/state/reloadPage";
import { useEffect } from "react";
import { laporanScada, removeData } from "../state/laporanScada";
import { TrashCanOutline } from "mdi-material-ui";

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(laporanScada);

  const { createLaporanScada, updateLaporanScada, deleteLaporanScada } =
    laporanScadaApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-laporan-scada";

  const { garduIndukOptions, typeOptions } = useModalAdd();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, tanggal_konfirmasi, ...rest } = values;

      const payload = {
        ...rest,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
        tanggal_konfirmasi:
          dayjs(tanggal_konfirmasi).format("YYYY-MM-DD HH:mm"),
      };

      if (modalSnapshot.id) {
        await updateLaporanScada({ ...payload, id: data.id });
      } else {
        await createLaporanScada(payload);
      }
      hanleCloseModal();
      setReloadPage("laporan-scada");
    })();
  };

  const onClickDelete = async () => {
    if (confirm("Hapus Data ini ?")) {
      await deleteLaporanScada({ id: data.id });
      hanleCloseModal();
      setReloadPage("laporan-scada");
    }
  };

  const hanleCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
    removeData();
  };

  useEffect(() => {
    const { tanggal, tanggal_konfirmasi, ...rest } = data;

    formMethods.reset({
      ...rest,
      gardu_induk_id: rest?.gardu_induk?.id,
      tanggal: dayjs(tanggal),
      tanggal_konfirmasi: dayjs(tanggal_konfirmasi),
    });
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={hanleCloseModal}
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
                Tambah Data
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Jenis Laporan"
                  name="tipe"
                  options={typeOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField label="Bay" name="bay" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Tanggal Konfirmasi"
                  name="tanggal_konfirmasi"
                />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Aksi Scada" name="aksi" />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Aset" name="aset" />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Status" name="status" />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Keterangan" name="keterangan" />
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
                  <Button variant="text" onClick={onClickDelete}>
                    <IconButton>
                      <TrashCanOutline />
                    </IconButton>
                    Hapus data
                  </Button>
                )}
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={hanleCloseModal}>
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
