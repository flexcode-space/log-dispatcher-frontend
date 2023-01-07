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
import { SelectInput, SelectMultipleInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  initialValues,
  validationSchema,
} from "./ModalAddPiketDanShift.constant";
import { useModal } from "./useModal";

const ModalAddPiketDanShift = () => {
  const modalSnapshot = useSnapshot(modal);

  const { userOptions } = useModal();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    formMethods.handleSubmit(async (values) => {
      console.log("values", values);
    })();
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
        <StyledForm noValidate onSubmit={onSubmit} sx={{ maxWidth: "100%" }}>
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
                <SelectInput
                  label="Piket Pimpinan"
                  name=""
                  options={userOptions}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <SelectMultipleInput
                  label="Shift Pagi"
                  name="shift_pagi"
                  options={userOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectMultipleInput
                  label="Shift Siang"
                  name="shift_siang"
                  options={userOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectMultipleInput
                  label="Shift Malam"
                  name="shift_malam"
                  options={userOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectMultipleInput
                  label="Piket BID FASOP"
                  name="bid_fasop"
                  options={userOptions}
                />
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
