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
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { closeModal, modal } from "src/state/modal";
import { InputField } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { useSwitchingPembengkit } from "../useSwitchingPembangkit";
import {
  initialValues,
  validationSchema,
} from "../SwitchingPembangkit.constant";
import { switchingPembangkitApi } from "src/api/switching-pembangkit";
import { setReloadPage } from "src/state/reloadPage";
import { removeData } from "../state/switchingPembangkit";
import { switchingPembangkit } from "../state/switchingPembangkit";
import { TrashCanOutline } from "mdi-material-ui";

dayjs.extend(customParseFormat);

const ModalFilter = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(switchingPembangkit);

  const {
    jenisSwitchingOptions,
    pembangkitOptions,
    statusOptions,
    energiPrimerOptions,
    personOptions,
  } = useSwitchingPembengkit();

  const { updateSwitchingPembangkit, deleteSwitchingPembangkit } =
    switchingPembangkitApi();

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-edit-switching-pembangkit";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenis = formMethods.watch("jenis");

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, waktu_perintah, waktu_real, ...rest } = values;

      const payload = {
        ...rest,
        id: data.id,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
        waktu_perintah: dayjs(waktu_perintah).format("HH:mm"),
        waktu_real: dayjs(waktu_real).format("HH:mm"),
      };

      await updateSwitchingPembangkit(payload);
      formMethods.reset({ ...initialValues });

      handleCloseModal();
    })();
  };

  const onClickDelete = async () => {
    if (confirm("Hapus Data ini ?")) {
      await deleteSwitchingPembangkit({ id: data.id });
      handleCloseModal();
      setReloadPage("switching-pembangkit");
    }
  };

  const handleCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
    removeData();
  };

  useEffect(() => {
    formMethods.reset({
      ...data,
      pembangkit_id: data.pembangkit?.id,
      operator_acc_id: data?.operator_acc?.id,
      operator_bops_id: data?.operator_bops?.id,
      operator_pembangkit_id: data?.operator_pembangkit?.id,
      tanggal: dayjs(data.tanggal),
      waktu_perintah: dayjs(data.waktu_perintah, "HH: mm"),
      // @ts-ignore
      waktu_real: dayjs(data.waktu_real, "HH:mm", true).isValid()
        ? dayjs(data.waktu_real, "HH:mm")
        : null,
    });
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={handleCloseModal}
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
                Ubah Data
              </Typography>
            </Box>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <SelectInput
                  label="Jenis Switching"
                  name="jenis"
                  options={jenisSwitchingOptions}
                />
              </Grid>
              {jenis === "start-stop" && (
                <Grid item xs={6}>
                  <SelectInput
                    label="Dispatch"
                    name="tipe"
                    options={[
                      {
                        value: "Start",
                        label: "Start",
                      },
                      {
                        value: "Start",
                        label: "Stop",
                      },
                    ]}
                  />
                </Grid>
              )}
              <Grid item xs={6}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={4}>
                <TimePicker label="Waktu Perintah" name="waktu_perintah" />
              </Grid>
              <Grid item xs={4}>
                <TimePicker label="Waktu Real" name="waktu_real" />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  label="BOPS"
                  name="operator_bops_id"
                  options={personOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  label="ACC"
                  name="operator_acc_id"
                  options={personOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  label="Operator Pembangkit"
                  name="operator_pembangkit_id"
                  options={personOptions}
                />
              </Grid>
              {jenis !== "change-over" ? (
                <Grid item xs={4}>
                  <SelectInput
                    label="Energi Primer"
                    name="energi_primer"
                    options={energiPrimerOptions}
                  />
                </Grid>
              ) : null}
              {jenis === "change-over" ? (
                <Grid item xs={4}>
                  <SelectInput
                    label="Status"
                    name="status"
                    options={statusOptions}
                  />
                </Grid>
              ) : null}

              {jenis === "naik-turun" && (
                <Grid item xs={4}>
                  <InputField type="number" name="tegangan" label="Tegangan" />
                </Grid>
              )}

              <Grid item xs={12}>
                <InputField name="keterangan" label="Keterangan" />
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
                <Button variant="text" onClick={onClickDelete}>
                  <IconButton>
                    <TrashCanOutline />
                  </IconButton>
                  Hapus data
                </Button>
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={handleCloseModal}>
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
