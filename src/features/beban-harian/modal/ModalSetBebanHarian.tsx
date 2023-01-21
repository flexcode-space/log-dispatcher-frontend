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
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { initialValues, validationSchema } from "./ModalBebanHarian.constant";
import { modal, closeModal } from "src/state/modal";
import { useModal } from "./useModal";
import { bebanApi } from "src/api/beban";
import dayjs from "dayjs";

const ModalSetBebanHarian = () => {
  const modalSnapshot = useSnapshot(modal);

  const { createPindahBeban } = bebanApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenisPeralatan = formMethods.watch("nama_peralatan");

  const { optionJenisPeralatan, peralatanOptions, subsistemOptions } =
    useModal(jenisPeralatan);

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, waktu, ...rest } = values;
      await createPindahBeban({
        ...rest,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
        waktu: dayjs(waktu).format("HH:mm"),
      });
      onClickCloseModal();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  return (
    <Dialog
      open={modalSnapshot.isOpen}
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
                Pindah SS Beban
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Jenis Peralatan"
                  name="nama_peralatan"
                  options={optionJenisPeralatan}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Pilih Peralatan"
                  name="peralatan_id"
                  options={peralatanOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Subsistem Awal"
                  name="subsistem_awal_id"
                  options={subsistemOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Subsistem Baru"
                  name="subsistem_akhir_id"
                  options={subsistemOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker label="Waktu" name="waktu" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalSetBebanHarian;
