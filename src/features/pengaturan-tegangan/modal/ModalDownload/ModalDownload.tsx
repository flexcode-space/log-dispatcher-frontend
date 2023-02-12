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
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { DatePicker } from "src/components/date-picker";
import { modal, closeModal } from "src/state/modal";
import dayjs from "dayjs";
import { initialValues, validationSchema } from "./ModalDownload.constant";
import { baseURL } from "src/api/axios";
import { pengaturanTeganganApi } from "src/api/pengaturan-tegangan";

const ModalDownload = () => {
  const modalSnapshot = useSnapshot(modal);

  const { getReport, loadingDownload } = pengaturanTeganganApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-download";

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const tanggalStart = dayjs(values?.tanggal_start);
      const tanggalEnd = dayjs(values?.tanggal_end);

      if (tanggalStart.isAfter(tanggalEnd, "day")) {
        alert("Tanggal Akhir tidak boleh kecil dari Tanggal Awal");
      } else {
        const params = {
          tanggal_start: tanggalStart.format("YYYY-MM-DD"),
          tanggal_end: tanggalEnd.format("YYYY-MM-DD"),
        };
        await getReport(params).then((result) => {
          window.open(`${baseURL}/${result?.path}`, "_blank", "noreferrer");
        });
      }
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
                Download Laporan
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <DatePicker label="Dari Tanggal" name="tanggal_start" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker label="Sampai Tanggal" name="tanggal_end" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <LoadingButton
              loading={loadingDownload}
              variant="contained"
              type="submit"
            >
              Simpan
            </LoadingButton>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalDownload;
