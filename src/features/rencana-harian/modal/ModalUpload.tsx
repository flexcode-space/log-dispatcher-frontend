import { ChangeEvent } from "react";
import { useForm, FormProvider, FieldPath } from "react-hook-form";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { Axios } from "src/api/axios";
import { StyledForm } from "src/components/form";
import { DatePicker } from "src/components/date-picker";
import { OutlinedInputField } from "src/components/input-field";
import { rencanaHarianApi } from "src/api/rencana-harian";
import { modal, reloadPage } from "src/state/modal";
import { initialValues, validationSchema } from "./ModalUpload.constant";
import { convertDate } from "src/utils/date";

type ModalUpload = {
  handleClose: () => void;
};

const ModalUpload = ({ handleClose }: ModalUpload) => {
  const modalSnapshot = useSnapshot(modal);

  const { unggahRencanaHarian } = rencanaHarianApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, file } = values;

      await unggahRencanaHarian({
        file,
        tanggal: convertDate(tanggal! as string),
      });
      handleClose();
      reloadPage();
    })();
  };

  const onClickCloseModal = () => {
    handleClose();
    formMethods.reset({ ...initialValues });
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    name: FieldPath<{ tanggal: string; file: string }>
  ) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    Axios.post("/laporan/upload", formData).then(({ data }) => {
      formMethods.setValue(name, data.nama);
    });
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
                Unggah Rencana Harian
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={12}>
                <DatePicker label="Tanggal Rencana Harian" name="tanggal" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <OutlinedInputField
                  name="file"
                  label="Upload File"
                  disabled={true}
                  Icon={
                    <Button
                      variant="outlined"
                      component="label"
                      style={{ maxHeight: 30 }}
                    >
                      Pilih File
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleFileUpload(e, "file")}
                      />
                    </Button>
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Unggah
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalUpload;
