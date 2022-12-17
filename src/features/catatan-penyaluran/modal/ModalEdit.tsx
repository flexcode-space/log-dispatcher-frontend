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
import { modal, reloadPage } from "src/state/modal";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { useCatatanPenyaluran } from "../useCatatanPenyaluran";
import { validationSchema, initialValues } from "../CatatanPenyaluran.constant";
import { catatanPenyaluran } from "src/state/catatanPenyaluran";
import dayjs from "dayjs";
import { catatanPenyaluranApi } from "src/api/catatan-penyaluran";

type ModalFilter = {
  handleClose: () => void;
};

const ModalFilter = ({ handleClose }: ModalFilter) => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(catatanPenyaluran);

  const { updateCatatanPenyaluran } = catatanPenyaluranApi();
  const { garduIndukOptions } = useCatatanPenyaluran();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-catatan-penyaluran";

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
        keterangan,
        ...rest
      } = values;

      const startDate = dayjs(values.tanggal_mulai).format("YYYY-MM-DD");
      const startTime = dayjs(values.waktu_mulai).format("HH:mm");

      const endDate = dayjs(values?.tanggal_akhir).format("YYYY-MM-DD");
      const endTime = dayjs(values?.waktu_akhir).format("HH:mm");

      const payload = {
        ...rest,
        keterangan,
        tanggal_mulai: `${startDate} ${startTime}`,
        tanggal_akhir: `${endDate} ${endTime}`,
      };

      await updateCatatanPenyaluran(payload);

      reloadPage();

      onClickCloseModal();
    })();
  };

  const onClickCloseModal = () => {
    handleClose();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    const startDate = dayjs(data.tanggal_mulai);
    const endDate = dayjs(data.tanggal_akhir);

    formMethods.reset({
      ...data,
      tanggal_mulai: startDate,
      waktu_mulai: startDate,
      tanggal_akhir: endDate,
      waktu_akhir: endDate,
      gardu_induk_id: data?.gardu_induk?.id,
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
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Jurusan" name="jurusan" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Mulai" name="tanggal_mulai" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Watu Mulai" name="waktu_mulai" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Akhir" name="tanggal_akhir" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Watu Akhir" name="waktu_akhir" />
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

export default ModalFilter;
