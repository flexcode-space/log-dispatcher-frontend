import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { SelectInput } from "src/components/select-input";
import { InputField, TextArea } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { useKapasitorReaktor } from "../useKapasitorReaktor";
import { initialValues, validationSchema } from "../KapasitorReaktor.constant";
import { kapasitorReaktor } from "src/state/kapasitorReaktor";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { kapasitorReaktorApi } from "src/api/kapasitorReaktorApi";

dayjs.extend(customParseFormat);

const ModalEdit = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(kapasitorReaktor);

  const { updateKapasitorReaktor } = kapasitorReaktorApi();
  const { garduIndukOptions } = useKapasitorReaktor();

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-edit-kapasitor-reaktor";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, jam_buka, jam_tutup, ...rest } = values;

      const payload = {
        ...rest,
        jam_buka: dayjs(jam_buka).format("hh:mm"),
        jam_tutup: dayjs(jam_tutup).format("hh:mm"),
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
      };

      await updateKapasitorReaktor(payload);
      reloadPage();
      closeModal();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    formMethods.reset({
      ...data,
      tanggal: dayjs(data.tanggal),
      jam_buka: dayjs(data.jam_buka, "hh:mm"),
      jam_tutup: dayjs(data.jam_tutup, "hh:mm"),
      gardu_induk_id: data.gardu_induk?.id,
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
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Lokasi"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Jam Buka" name="jam_buka" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Jam Tutup" name="jam_tutup" />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  type="number"
                  name="tegangan_sebelum"
                  label="Tegangan Sebelum"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  type="number"
                  name="tegangan_sesudah"
                  label="Tegangan Sesudah"
                />
              </Grid>
              <Grid item xs={12}>
                <TextArea label="Keterangan" name="keterangan" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalEdit;
