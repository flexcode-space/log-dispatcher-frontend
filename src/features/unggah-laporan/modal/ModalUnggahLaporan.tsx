import { ChangeEvent } from "react";
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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useSnapshot } from "valtio";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "src/components/form";
import { OutlinedInputField } from "src/components/input-field";
import { DatePicker } from "src/components/date-picker";
import { SelectInput } from "src/components/select-input";
import { initialValues, validationSchema } from "./ModalUnggahLaporan.constant";
import { tipeLaporanOptions } from "../UnggahLaporan.constant";
import { modal, reloadPage } from "src/state/modal";
import UploadFile from "./components/UploadFile";

type ModalAddProps = {
  handleClose: () => void;
};

const ModalUnggahLaporan = ({ handleClose }: ModalAddProps) => {
  const modalSnapshot = useSnapshot(modal);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const tipe = formMethods.watch("tipe");

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      // TODO
    })();
  };

  const onClickCloseModal = () => {
    handleClose();
    formMethods.reset({ ...initialValues });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    console.log("file", file);
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
                Unggah Laporan
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Tipe laporan"
                  name="tipe"
                  options={tipeLaporanOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker label="Tanggal" name="tanggal" />
                </LocalizationProvider>
              </Grid>
              {tipe === "scada" && (
                <Grid item xs={12} sm={12}>
                  <OutlinedInputField
                    name="scada"
                    label="Upload File"
                    Icon={
                      <Button
                        variant="outlined"
                        component="label"
                        style={{ maxHeight: 30 }}
                      >
                        Pilih File
                        <input type="file" hidden onChange={handleFileUpload} />
                      </Button>
                    }
                  />
                </Grid>
              )}
              {tipe === "amr" && (
                <>
                  <UploadFile title="Pembangkit" />
                  <UploadFile title="Trafo" />
                  <UploadFile title="IBT" />
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Unggah Laporan
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalUnggahLaporan;
