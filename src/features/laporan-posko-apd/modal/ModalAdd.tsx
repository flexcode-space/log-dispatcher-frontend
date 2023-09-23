import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { InputField, TextArea } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { initialValues, validationSchema } from "./ModalAdd.constant";
import { setReloadPage } from "src/state/reloadPage";
import { laporanPosko, removeData } from "../state/laporanPosko";
import laporanPoskoApi from "src/api/laporan-posko/laporanPoskoApi";
import { TrashCanOutline } from "mdi-material-ui";

dayjs.extend(customParseFormat);

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(laporanPosko);

  const { createLaporanPosko, updateLaporanPosko, deleteLaporanPosko } =
    laporanPoskoApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-laporan-posko";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, start_time, end_time, ...rest } = values;

      const startTime = dayjs(start_time).format("HH:mm");
      const endTime = dayjs(end_time).format("HH:mm");

      const payload = {
        ...rest,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
        periode: `${startTime} ${endTime}`,
      };
      if (modalSnapshot.id) {
        await updateLaporanPosko({ ...payload, id: data.id });
      } else {
        await createLaporanPosko(payload);
      }
      hanleCloseModal();
      setReloadPage("laporan-posko");
    })();
  };

  const onClickDelete = async () => {
    if (confirm("Hapus Data ini ?")) {
      await deleteLaporanPosko({ id: data.id });
      hanleCloseModal();
      setReloadPage("laporan-posko");
    }
  };

  const hanleCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
    removeData();
  };

  useEffect(() => {
    if (modalSnapshot.isOpen && !!modalSnapshot.id) {
      const { tanggal, periode, ...rest } = data;

      const splitPeriode = periode.split(" ");

      formMethods.reset({
        ...rest,
        tanggal: dayjs(data.tanggal),
        start_time: dayjs(splitPeriode[0], "HH:mm"),
        end_time: dayjs(splitPeriode[1], "HH:mm"),
      });
    }
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
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
                Tambah Data
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={4}>
                <DatePicker label="Tanggal Mulai" name="tanggal" />
              </Grid>
              <Grid item xs={4}>
                <TimePicker label="Dari Jam" name="start_time" />
              </Grid>
              <Grid item xs={4}>
                <TimePicker label="Sampai Jam" name="end_time" />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  type="number"
                  label="Pasokan Kit"
                  name="pasokan_kit"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  type="number"
                  label="Cadangan KIT"
                  name="cadangan_kit"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  type="number"
                  label="Pasokan IBT & Transfer"
                  name="pasokan_ibt"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  type="number"
                  label="Beban Puncak"
                  name="beban_puncak"
                />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Status" name="status" />
              </Grid>
              <Grid item xs={12}>
                <TextArea label="Keterangan" name="keterangan" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                {modalSnapshot.id && (
                  <Button variant="text" onClick={onClickDelete}>
                    <IconButton>
                      <TrashCanOutline />
                    </IconButton>
                    Hapus data
                  </Button>
                )}
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={hanleCloseModal}>
                  Batal
                </Button>
                <Button variant="contained" type="submit">
                  Simpan
                </Button>
              </Box>
            </Stack>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAdd;
