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
import { InputField, TextArea } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { useModalAdd } from "./useModalAdd";
import { initialValues, validationSchema } from "./ModalAdd.constant";
import { laporanNeracaDayaApi } from "src/api/laporan-neraca-daya";
import dayjs from "dayjs";
import { setReloadPage } from "src/state/reloadPage";
import { useEffect } from "react";
import { laporanNeracaDaya, removeData } from "../../state/laporanNeracaDaya";
import { TrashCanOutline } from "mdi-material-ui";

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(laporanNeracaDaya);

  const {
    createLaporanNeracaDaya,
    updateLaporanNeracaDaya,
    deleteLaporanNeracaDaya,
  } = laporanNeracaDayaApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-neraca-daya";

  const { subsistemOptions, pembangkitOptions, ibtOptions } = useModalAdd();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, ...rest } = values;

      const payload = {
        ...rest,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
      };

      if (modalSnapshot.id) {
        await updateLaporanNeracaDaya({ ...payload, id: data.id });
      } else {
        await createLaporanNeracaDaya(payload);
      }
      hanleCloseModal();
      setReloadPage("laporan-neraca-daya");
    })();
  };

  const onClickDelete = async () => {
    if (confirm("Hapus Data ini ?")) {
      await deleteLaporanNeracaDaya({ id: data.id });
      hanleCloseModal();
      setReloadPage("laporan-neraca-daya");
    }
  };

  const hanleCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    const { pembangkit, sub_sistem, ibt, tanggal } = data;

    formMethods.reset({
      ...data,
      ibt_id: ibt?.id,
      sub_sistem_id: sub_sistem?.id,
      pembangkit_id: pembangkit?.id,
      tanggal: dayjs(tanggal),
    });
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
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Subsistem"
                  name="sub_sistem_id"
                  options={subsistemOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField type="number" label="DM Pasok" name="dm_pasok" />
              </Grid>

              <Grid item xs={12} mb="10px">
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  IBT
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <SelectInput label="IBT" name="ibt_id" options={ibtOptions} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField type="number" label="Beban IBT" name="beban_ibt" />
              </Grid>

              <Grid item xs={12} mb="10px">
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Pembangkit
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField type="number" label="Beban KIT" name="beban_kit" />
              </Grid>
              <Grid item xs={12} sm={12}>
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
