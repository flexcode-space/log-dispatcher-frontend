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
import { SelectInput } from "src/components/select-input";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { initialValues, validationSchema } from "./ModalAdd.constant";
import { setReloadPage } from "src/state/reloadPage";
import { rekonfigurasi, removeData } from "../state/rekonfigurasi";
import { rekonfigurasiApi } from "src/api/rekonfigurasi";
import { restrictNumeric } from "payment";
import { useModalAdd } from "./useModalAdd";
import { TrashCanOutline } from "mdi-material-ui";

dayjs.extend(customParseFormat);

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(rekonfigurasi);

  const { garduIndukOptions, subsitemOptions } = useModalAdd();

  const { createRekonfigurasi, updateRekonfigurasi, deleteRekonfigurasi } =
    rekonfigurasiApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-rekonfigurasi";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, jam, ...rest } = values;
      const date = dayjs(tanggal).format("YYYY-MM-DD");
      const time = dayjs(jam).format("HH:mm");

      const payload = {
        ...rest,
        waktu: `${date} ${time}`,
      };
      if (modalSnapshot.id) {
        await updateRekonfigurasi({ ...payload, id: data.id });
      } else {
        await createRekonfigurasi(payload);
      }
      hanleCloseModal();
      setReloadPage("rekonfigurasi");
    })();
  };

  const onClickDelete = async () => {
    if (confirm("Hapus Data ini ?")) {
      await deleteRekonfigurasi({ id: data.id });
      hanleCloseModal();
      setReloadPage("rekonfigurasi");
    }
  };

  const hanleCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
    removeData();
  };

  useEffect(() => {
    if (modalSnapshot.isOpen && !!modalSnapshot.id) {
      const { waktu, sub_sistem_awal, sub_sistem_akhir, ...rest } = data;

      const date = dayjs(waktu);

      formMethods.reset({
        ...rest,
        tanggal: date,
        jam: date,
        sub_sistem_awal_id: sub_sistem_awal?.id,
        sub_sistem_akhir_id: sub_sistem_akhir?.id,
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
              <Grid item xs={12}>
                <InputField name="gi" label="Gardu Induk/Peralatan" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker name="tanggal" label="Tanggal" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Jam" name="jam" />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  name="sub_sistem_awal_id"
                  label="Subsistem Awal"
                  options={subsitemOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  name="sub_sistem_akhir_id"
                  label="Subsistem Akhir"
                  options={subsitemOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label="Alasan Rekonfigurasi"
                  name="alasan_rekonfigurasi"
                />
              </Grid>
              <Grid item xs={12}>
                <TextArea name="keterangan" label="Keterangan" />
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
