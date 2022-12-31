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
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { batubara, removeData } from "../state/batubara";
import { initialValues, validationSchema } from "./ModalAdd.constant";
import { DatePicker } from "src/components/date-picker";
import { useModalAdd } from "./useModalAdd";
import dayjs from "dayjs";
import { batubaraApi } from "src/api/batubara";
import { setReloadPage } from "src/state/reloadPage";
import { useEffect } from "react";

const ModalAddData = () => {
  const modalSnapshot = useSnapshot(modal);
  const batubaraSnapshot = useSnapshot(batubara);

  const { createBatubara, updateBatubara } = batubaraApi();
  const { pembangkitOptions } = useModalAdd();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-batubara";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const payload = {
        ...values,
        tanggal: dayjs(values.tanggal).format("YYYY-MM-DD"),
        tipe: batubaraSnapshot.type,
      };

      if (modalSnapshot.id) {
        await updateBatubara({ ...payload, id: modalSnapshot.id });
      } else {
        await createBatubara(payload);
      }
      handleCloseModal();
      setReloadPage("batubara");
    })();
  };

  const handleCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      const { tanggal, pembangkit, ...rest } = batubaraSnapshot.data;

      formMethods.reset({
        ...rest,
        tanggal: dayjs(tanggal),
        pembangkit_id: pembangkit.id,
      });
    }
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={handleCloseModal}
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
              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Nama Pembangkit"
                  name="pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="stock" label="Stock" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField label="Satuan" name="satuan" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="harian" label="Jumlah Hari" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="unit" label="Jumlah Unit" />
              </Grid>
              <Grid item xs={12}>
                <DatePicker name="tanggal" label="Tanggal" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={handleCloseModal}>
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

export default ModalAddData;
