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

const ModalAddPiketDanShift = () => {
  const modalSnapshot = useSnapshot(modal);

  const { userOptions } = useModal();

  const { createPiket } = piketApi();

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

      const data = [];
      const date = dayjs(tanggal).format("YYYY-MM-DD");

      data.push({
        posisi: "Pimpinan",
        shift: "-",
        tanggal: date,
        user_id: pimpinan,
      });

      shift_pagi?.map((value) => {
        data.push({
          posisi: "Shift Pagi",
          shift: "-",
          tanggal: date,
          user_id: value,
        });
      });

      shift_siang?.map((value) => {
        data.push({
          posisi: "Shift Siang",
          shift: "-",
          tanggal: date,
          user_id: value,
        });
      });

      shift_malam?.map((value) => {
        data.push({
          posisi: "Shift Malam",
          shift: "-",
          tanggal: date,
          user_id: value,
        });
      });

      bid_fasop?.map((value) => {
        data.push({
          posisi: "BID Fasop",
          shift: "-",
          tanggal: date,
          user_id: value,
        });
      });

      data.forEach(async (value) => {
        await createPiket(value);
      });
      onCloseModal();
    })();
  };

  const onCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
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
