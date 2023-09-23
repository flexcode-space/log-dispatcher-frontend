import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal } from "src/state/modal";
import { DatePicker, TimePicker } from "src/components/date-picker";
import {
  validationSchema,
  initialValues,
} from "../PengaturanTegangan.constant";
import { usePengaturanTegangan } from "../usePengaturanTegangan";
import { pengaturanTegangan, removeData } from "../state/pengaturanTegangan";
import { pengaturanTeganganApi } from "src/api/pengaturan-tegangan";
import { setReloadPage } from "src/state/reloadPage";
import { TrashCanOutline } from "mdi-material-ui";

dayjs.extend(customParseFormat);

const ModalEdit = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(pengaturanTegangan);

  const { updatePengaturanTegangan, deletePengaturanTegangan } =
    pengaturanTeganganApi();

  const { garduIndukOptions, openCloseOptions, konfigurasiOptions } =
    usePengaturanTegangan();

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-edit-pengaturan-tegangan";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, waktu, ...rest } = values;

      const payload = {
        ...rest,
        id: data.id,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
        waktu: dayjs(waktu).format("HH:mm"),
      };

      await updatePengaturanTegangan(payload);
      handleCloseModal();
      setReloadPage("pengaturan-tegangan");
    })();
  };

  const onClickDelete = async () => {
    if (confirm("Hapus Data ini ?")) {
      await deletePengaturanTegangan({ id: data.id });
      handleCloseModal();
      setReloadPage("pengaturan-tegangan");
    }
  };

  const handleCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    formMethods.reset({
      gardu_induk_id: data?.gardu_induk?.id,
      tanggal: dayjs(data.tanggal).format("YYYY-MM-DD"),
      waktu: dayjs(data.waktu, "HH:mm"),
      keterangan: data.keterangan,
      mvar: data.mvar,
      open_close: data.open_close,
      sebelum: data.sebelum,
      sesudah: data.sesudah,
      jurusan_id: data.jurusan_id,
    });
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={handleCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit}>
          <DialogTitle id="max-width-dialog-title">Ubah Data</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Gard Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Jurusan"
                  name="jurusan_id"
                  options={konfigurasiOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Open / Close"
                  name="open_close"
                  options={openCloseOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Waktu" name="waktu" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Tegangan
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <InputField type="number" name="sebelum" label="Sebelum" />
              </Grid>
              <Grid item xs={6}>
                <InputField type="number" name="sesudah" label="Sesudah" />
              </Grid>
              <Grid item xs={12}>
                <InputField type="number" name="mvar" label="MVAR" />
              </Grid>
              <Grid item xs={12}>
                <InputField name="keterangan" label="Keterangan" />
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
                <Button variant="text" onClick={onClickDelete}>
                  <IconButton>
                    <TrashCanOutline />
                  </IconButton>
                  Hapus data
                </Button>
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={handleCloseModal}>
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

export default ModalEdit;
