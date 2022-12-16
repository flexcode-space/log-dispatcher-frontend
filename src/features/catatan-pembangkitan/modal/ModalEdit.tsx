import { useEffect } from "react";
import dayjs from "dayjs";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { TrashCanOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectInput } from "src/components/select-input";
import { InputField, TextArea } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { useCatatanPembangkitan } from "../useCatatanPembangkitan";
import {
  initialValues,
  validationSchema,
} from "../CatatanPembangkitan.constant";
import { catatanPembangkitan, removeData } from "../state";
import catatanPembangkitanApi from "src/api/catatan-pembangkitan/catatanPembangkitanApi";

const ModalFilter = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(catatanPembangkitan);
  const { pembangkitOptions, statusOptions } = useCatatanPembangkitan();
  const { updateCatatanPembangkitan } = catatanPembangkitanApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-catatan-pembangkit";


  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const {
        tanggal_mulai,
        waktu_mulai,
        tanggal_akhir,
        waktu_akhir,
        ...rest
      } = values;

      const startDate = dayjs(tanggal_mulai).format("YYYY-MM-DD");
      const startTime = dayjs(waktu_mulai).format("HH:MM");

      const endDate = dayjs(tanggal_akhir).format("YYYY-MM-DD");
      const endTime = dayjs(waktu_akhir).format("HH:MM");

      const payload = {
        ...rest,
        id: data.id,
        tanggal_mulai: `${startDate} ${startTime}`,
        tanggal_akhir: `${endDate} ${endTime}`,
      };

      await updateCatatanPembangkitan(payload);
      closeModal();
      reloadPage();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    const startDate = dayjs(data.tanggal_mulai).format("YYYY-MM-DD HH:MM");
    const endDate = dayjs(data?.tanggal_akhir).format("YYYY-MM-DD HH:MM");

    formMethods.reset({
      pembangkit_id: data?.pembangkit?.id,
      tanggal_mulai: startDate,
      waktu_mulai: startDate,
      tanggal_akhir: endDate,
      waktu_akhir: endDate,
      keterangan: data.keterangan,
      operator: data.operator,
      status: data.status,
      mampu: data.mampu,
    });
  }, [modalSnapshot.isOpen]);

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
          <DialogTitle id="max-width-dialog-title">Ubah Data</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Status"
                  name="status"
                  options={statusOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField type="number" name="mampu" label="Mampu" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Mulai" name="tanggal_mulai" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Waktu Mulai" name="waktu_mulai" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Akhir" name="tanggal_akhir" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Watu Akhir" name="tanggal_akhir" />
              </Grid>
              <Grid item xs={12}>
                <InputField name="operator" label="Operator Pembangkit" />
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
                <Button variant="text" onClick={onClickCloseModal}>
                  <IconButton>
                    <TrashCanOutline />
                  </IconButton>
                  Hapus data
                </Button>
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={onClickCloseModal}>
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

export default ModalFilter;
