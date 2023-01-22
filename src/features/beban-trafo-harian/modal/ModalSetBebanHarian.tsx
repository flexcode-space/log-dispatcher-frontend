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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { DatePicker } from "src/components/date-picker";
import { initialValues, validationSchema } from "./ModalBebanHarian.constant";
import { modal, closeModal } from "src/state/modal";

const ModalSetBebanHarian = () => {
  const modalSnapshot = useSnapshot(modal);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const isOpen = modalSnapshot.isOpen && modalSnapshot.target === "modal-beban-harian"

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      // TODO: HANDLE SUBMIT
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
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
                Set Beban
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Pilih Jenis Peralatan"
                  name="peralatan"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Pilih Peralatan"
                  name="peralatan"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="sub_sistem_awal" label="Subsistem Awal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput label="Subsistem Baru" name="no" options={[]} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker label="Tanggal" name="tanggal" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker label="Waktu" name="tanggal" />
                </LocalizationProvider>
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
