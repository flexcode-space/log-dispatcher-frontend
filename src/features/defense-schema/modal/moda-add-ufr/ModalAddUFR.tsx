import { useEffect, useState } from "react";
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
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, reloadPage, closeModal } from "src/state/modal";
import { useModalUFR } from "./useModalUFR";
import { initialValues, validationSchema } from "./ModalAddUFR.constant";
import { defenseUFRApi } from "src/api/defense-ufr";
import dayjs from "dayjs";
import { removeData, ufr } from "../../ufr/state/ufr";
import { setReloadPage } from "src/state/reloadPage";

const ModalAddUFR = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(ufr);

  const { createDefenseUFR, updateDefenseUFR } = defenseUFRApi();
  const {
    trafoOptions,
    garduIndukOptions,
    subsistemOptions,
    tahapOptions,
    statusOptions,
  } = useModalUFR();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-ufr";

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, status, ...rest } = values;

      const payload = {
        ...rest,
        status: status === "true",
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
      };

      if (modalSnapshot.id) {
        await updateDefenseUFR([{ ...payload, id: modalSnapshot.id }]);
      } else {
        await createDefenseUFR([payload]);
      }
      onCloseModal();
      setReloadPage("ufr");
    })();
  };

  const onCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      const {
        tanggal,
        status,
        gardu_induk,
        trafo,
        sub_sistem,
        tahap,
        ...rest
      } = data;

      formMethods.reset({
        ...rest,
        tanggal: dayjs(tanggal),
        status: status ? "true" : "false",
        gardu_induk_id: gardu_induk?.id,
        trafo_id: trafo?.id,
        sub_sistem_id: sub_sistem?.id,
        defense_tahap_id: tahap.id,
      });
    }
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onCloseModal}
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
                Tambah Laporan
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  UFR
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField type="number" name="set" label="Sett" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  name="defense_tahap_id"
                  label="Tahap"
                  options={tahapOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Subsistem"
                  name="sub_sistem_id"
                  options={subsistemOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Lokasi
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Trafo"
                  name="trafo_id"
                  options={trafoOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="penyulang" label="Penyulang" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  type="number"
                  name="beban_siang"
                  label="Beban Siang"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  type="number"
                  name="beban_malam"
                  label="Beban Malam"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DatePicker name="tanggal" label="Tanggal" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput
                  name="status"
                  label="Status"
                  options={statusOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="keterangan" label="Keterangan" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  UFR Kerja
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="ufr_trip" label="Trip" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="ufr_masuk" label="Masuk" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField type="number" name="ufr_kw" label="KW" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="lama" label="Lama" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="kwh" label="KWH" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Penyulang Pengganti
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="penyulang_buka" label="Dibuka" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="penyulang_tutup" label="Ditutup" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField type="number" name="penyulang_kw" label="KW" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="lama" label="Lama" />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <InputField name="kwh" label="KWH" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Tambah
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAddUFR;
