import { useState } from "react";
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
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, reloadPage, closeModal } from "src/state/modal";

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      //  TODO: handle submit
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    // formMethods.reset({ ...initialValues });
  };

  return (
    <Dialog
      open={modalSnapshot.isOpen}
      fullWidth
      onClose={onClickCloseModal}
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
                Tambah Laporan
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  UFR
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="sett" label="Sett" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="tahap" label="Tahap" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Subsistem"
                  name="sub_sistem_id"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Lokasi
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput label="Trafo" name="trafo_id" options={[]} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="penyulang" label="Penyulang" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="beban_siang" label="Beban Siang" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="beban_malam" label="Beban Malam" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="status" label="Status" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="keterangan" label="Keterangan" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  UFR Kerja
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="trip" label="Trip" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="masuk" label="Masuk" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="kw" label="KW" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="lama" label="Lama" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="kwh" label="KWH" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Penyulang Pengganti
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="dibuka" label="Dibuka" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="ditutup" label="Ditutup" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="kw" label="KW" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="lama" label="Lama" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="kwh" label="KWH" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
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

export default ModalAdd;
