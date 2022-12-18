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
// import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { InputField } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { useSwitchingPembengkit } from "../useSwitchingPembangkit";

const ModalFilter = () => {
  const modalSnapshot = useSnapshot(modal);

  const { jenisSwitchingOptions, pembangkitOptions } = useSwitchingPembengkit();

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-edit-switching-pembangkit";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      console.log(values);

      closeModal();
    })();
  };

  const handleCloseModal = () => {
    closeModal();
    // formMethods.reset({ ...initialValues });
  };

  return (
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
            }}
          >
            <Box sx={{ mb: 8 }}>
              <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                Ubah Data
              </Typography>
            </Box>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <SelectInput
                  label="Jenis Switching"
                  name="jenis"
                  options={jenisSwitchingOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={4}>
                <TimePicker label="Waktu Perintah" name="waktu_perintah" />
              </Grid>
              <Grid item xs={4}>
                <TimePicker label="Waktu Real" name="waktu_real" />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  label="BPOS"
                  name="operator_bops_id"
                  options={[]}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectInput label="ACC" name="operator_acc_id" options={[]} />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  label="Operator Pembengkit"
                  name="operator_pembangkit_id"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Energi Primer"
                  name="energi_primer"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput label="Status" name="status" options={[]} />
              </Grid>

              <Grid item xs={12}>
                <InputField name="keterangan" label="Keterangan" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Terapkan
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalFilter;
