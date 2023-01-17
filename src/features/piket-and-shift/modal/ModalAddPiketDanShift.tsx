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
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectInput, SelectMultipleInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { piketApi } from "src/api/piket";
import {
  initialValues,
  validationSchema,
} from "./ModalAddPiketDanShift.constant";
import { useModal } from "./useModal";
import { piketAndShift, removeData } from "../state/piketAndShift";
import { useEffect } from "react";

const ModalAddPiketDanShift = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(piketAndShift);

  const { userOptions } = useModal();

  const { createPiket, deletePiket } = piketApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    formMethods.handleSubmit(async (values) => {
      const {
        pimpinan,
        shift_pagi,
        shift_siang,
        shift_malam,
        bid_fasop,
        tanggal,
      } = values;

      // delete DATA when edit piket
      if (modalSnapshot.id) {
        const deleteArray = [{ id: data?.pimpinan.id }];

        data?.shiftPagi.map((value) => {
          deleteArray.push({ id: value.id });
        });

        data?.shiftSiang.map((value) => {
          deleteArray.push({ id: value.id });
        });

        data?.shiftMalam.map((value) => {
          deleteArray.push({ id: value.id });
        });

        data?.bidFasop.map((value) => {
          deleteArray.push({ id: value.id });
        });

        deleteArray.forEach(async (value) => {
          await deletePiket(value);
        });
      }

      // end

      const dataArray = [];
      const date = dayjs(tanggal).format("YYYY-MM-DD");

      dataArray.push({
        posisi: "Pimpinan",
        shift: "-",
        tanggal: date,
        user_id: pimpinan,
      });

      shift_pagi?.map((value) => {
        dataArray.push({
          posisi: "Shift Pagi",
          shift: "-",
          tanggal: date,
          user_id: value,
        });
      });

      shift_siang?.map((value) => {
        dataArray.push({
          posisi: "Shift Siang",
          shift: "-",
          tanggal: date,
          user_id: value,
        });
      });

      shift_malam?.map((value) => {
        dataArray.push({
          posisi: "Shift Malam",
          shift: "-",
          tanggal: date,
          user_id: value,
        });
      });

      bid_fasop?.map((value) => {
        dataArray.push({
          posisi: "BID Fasop",
          shift: "-",
          tanggal: date,
          user_id: value,
        });
      });

      console.log(data);

      dataArray.forEach(async (value) => {
        await createPiket(value);
      });
      onCloseModal();
    })();
  };

  const onCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      const shiftPagiArray = data?.shiftPagi?.map((value) => value.user.id);
      const shiftSiangArray = data?.shiftSiang?.map((value) => value.user.id);
      const shiftMalamArray = data?.shiftMalam?.map((value) => value.user.id);
      const bidFasopArray = data?.bidFasop?.map((value) => value.user.id);

      formMethods.reset({
        tanggal: dayjs(data.tanggal),
        pimpinan: data?.pimpinan?.user?.id,
        shift_pagi: shiftPagiArray as never[],
        shift_siang: shiftSiangArray as never[],
        shift_malam: shiftMalamArray as never[],
        bid_fasop: bidFasopArray as never[],
      });
    }
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={modalSnapshot.isOpen}
      fullWidth
      onClose={onCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit} sx={{ maxWidth: "100%" }}>
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
                Tambah Piket dan Shift
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <DatePicker label="Pilih Tanggal" name="tanggal" />
              </Grid>

              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Piket Pimpinan"
                  name="pimpinan"
                  options={userOptions}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <SelectMultipleInput
                  label="Shift Pagi"
                  name="shift_pagi"
                  options={userOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectMultipleInput
                  label="Shift Siang"
                  name="shift_siang"
                  options={userOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectMultipleInput
                  label="Shift Malam"
                  name="shift_malam"
                  options={userOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectMultipleInput
                  label="Piket BID FASOP"
                  name="bid_fasop"
                  options={userOptions}
                />
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

export default ModalAddPiketDanShift;
