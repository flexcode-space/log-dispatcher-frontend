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
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";

const ModalAddPiketDanShift = () => {
  const modalSnapshot = useSnapshot(modal);

  const formMethods = useForm({
    //     resolver: yupResolver(validationSchema),
    //     defaultValues: initialValues,
    //     mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
  };

  const hanleCloseModal = () => {
    closeModal();
  };

  return (
    <Dialog
      open={modalSnapshot.isOpen}
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
                Tambah Piket dan Shift
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <DatePicker label="Pilih Tanggal" name="tanggal" />
              </Grid>

              <Grid item xs={12} sm={12}>
                <SelectInput label="Piket Pimpinan" name="" options={[]} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Shift Pagi" name="" options={[]} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Shift Siang" name="" options={[]} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Shift Malam" name="" options={[]} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Piket BID FASOP" name="" options={[]} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={hanleCloseModal}>
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

export default ModalAddPiketDanShift;
