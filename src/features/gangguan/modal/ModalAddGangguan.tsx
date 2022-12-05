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
  IconButton,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { UploadFile } from "src/components/upload-file";
import { modal, closeModal } from "src/state/modal";

import AddCicleIcon from "src/assets/icons/add-cicle-icon.svg";

const defaultValue = {
  jurusan: "",
};

type DefaultValueProps = {
  jurusan: string;
}[];

export const ModalAddGangguan = () => {
  const modalSnapshot = useSnapshot(modal);
  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);
  const [showNextForm, setShowNextForm] = useState<boolean>(false);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-gangguan";

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
    setFields([defaultValue]);
    // formMethods.reset({ ...initialValues });
  };

  return (
    <>
      <Dialog
        open={isOpen && !showNextForm}
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
                  Tambah Pencatatan Gangguan
                </Typography>
              </Box>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={6}>
                  <SelectInput label="Lokasi" name="lokasi" options={[]} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectInput
                    label="Jenis Gangguan"
                    name="jenis"
                    options={[]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectInput
                    label="Jenis Peralatan"
                    name="jenis_peralatan"
                    options={[]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectInput
                    label="Peralatan"
                    name="peralatan"
                    options={[]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, mb: "10px" }}
                  >
                    Waktu
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <DatePicker label="Tanggal" name="tanggal" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputField name="trip" label="Trip" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputField name="reclose" label="Reclose" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputField name="buka" label="Buka" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputField name="tutup" label="Tutup" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField name="sms" label="SMS Kinerja" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField name="pmt" label="Siap Op. PMT" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectInput label="Rele" name="rele" options={[]} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectInput
                    label="Announciator"
                    name="announciator"
                    options={[]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, mb: "10px" }}
                  >
                    Upload File
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <UploadFile
                    name="nama_url"
                    label="DFR"
                    onChange={() => null}
                  />
                </Grid>
                <Grid item xs={6}>
                  <UploadFile
                    name="nama_url"
                    label="PQM"
                    onChange={() => null}
                  />
                </Grid>
                <Grid item xs={6}>
                  <UploadFile
                    name="nama_url"
                    label="VAISALA"
                    onChange={() => null}
                  />
                </Grid>
                <Grid item xs={6}>
                  <UploadFile
                    name="nama_url"
                    label="SLD"
                    onChange={() => null}
                  />
                </Grid>
                <Grid item xs={6}>
                  <UploadFile
                    name="nama_url"
                    label="Gensum"
                    onChange={() => null}
                  />
                </Grid>
                <Grid item xs={6}>
                  <UploadFile
                    name="nama_url"
                    label="Lap. Gangguan"
                    onChange={() => null}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="dialog-actions-dense">
              <Button variant="outlined" onClick={onClickCloseModal}>
                Batal
              </Button>
              <Button variant="contained" onClick={() => setShowNextForm(true)}>
                Selanjutnya
              </Button>
            </DialogActions>
          </StyledForm>
        </FormProvider>
      </Dialog>

      <Dialog
        open={isOpen && showNextForm}
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
                  Keterangan Gangguan
                </Typography>
              </Box>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <InputField name="nama" label="Penyebab Gangguan" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="nama" label="Akibat Gangguan" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="nama" label="Beban Sistem" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="nama" label="Cuaca" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="nama" label="FL" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="nama" label="Counter PMT" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="nama" label="Counter LA" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="nama" label="Arus Gangguan" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="nama" label="Lain-lain" />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="dialog-actions-dense">
              <Button
                variant="outlined"
                onClick={() => {
                  onClickCloseModal();
                  setShowNextForm(false);
                }}
              >
                Batal
              </Button>
              <Button variant="contained">Tambah</Button>
            </DialogActions>
          </StyledForm>
        </FormProvider>
      </Dialog>
    </>
  );
};
