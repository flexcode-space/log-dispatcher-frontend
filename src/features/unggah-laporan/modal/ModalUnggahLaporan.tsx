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
import { StyledForm } from "src/components/form";
import { OutlinedInputField } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { SelectInput } from "src/components/select-input";
import { initialValues, validationSchema } from "./ModalUnggahLaporan.constant";
import { tipeLaporanOptions } from "../UnggahLaporan.constant";
import { modal, reloadPage } from "src/state/modal";
import UploadFile from "./components/UploadFile";
import { Axios } from "src/api/axios";
import { unggahLaporanApi } from "src/api/unggah-laporan";
import { FieldValues } from "../types";
import dayjs from "dayjs";

type ModalAddProps = {
  handleClose: () => void;
};

const ModalUnggahLaporan = ({ handleClose }: ModalAddProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { unggahLaporan } = unggahLaporanApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const tipe = formMethods.watch("tipe");

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, jam, tipe, ...rest } = values;

      const jenis =
        tipe === "amr"
          ? {
              jenis: "mw-mvar",
            }
          : {};

      const date = dayjs(tanggal).format("YYYY-MM-DD");
      const time = dayjs(jam).format("HH:mm");

      const payload = {
        ...rest,
        tipe,
        tanggal: `${date} ${time}`,
        ...jenis,
      };

      await unggahLaporan(payload);
      onCloseModal();
      reloadPage();
    })();
  };

  const onCloseModal = () => {
    handleClose();
    formMethods.reset({ ...initialValues });
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    name: FieldPath<FieldValues>
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
      onClose={onCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit} sx={{ width: "100%" }}>
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
              <Grid item xs={12} sm={6}>
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker label="Jam" name="jam" />
              </Grid>
              {tipe === "scada" && (
                <Grid item xs={12} sm={12}>
                  <OutlinedInputField
                    name="scada"
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
                          onChange={(e) => handleFileUpload(e, "scada")}
                        />
                      </Button>
                    }
                  />
                </Grid>
              )}
              {tipe === "amr" && (
                <>
                  <UploadFile
                    onChange={handleFileUpload}
                    name="pembangkit"
                    title="Pembangkit"
                  />
                  <UploadFile
                    onChange={handleFileUpload}
                    name="trafo"
                    title="Trafo"
                  />
                  <UploadFile
                    onChange={handleFileUpload}
                    name="ibt"
                    title="IBT"
                  />
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onCloseModal}>
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
