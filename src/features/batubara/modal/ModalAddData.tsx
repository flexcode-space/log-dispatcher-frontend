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
// import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";

const ModalAddData = () => {
  const modalSnapshot = useSnapshot(modal);

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      // TODO : handle submit
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    // formMethods.reset({ ...initialValues });
  };

  return (
    <Dialog
      open={modalSnapshot.isOpen}
      fullWidth
      onClose={onClickCloseModal}
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
                  options={[]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="stock" label="Stock" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput label="Satuan" name="satuan" options={[]} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="hari" label="Jumlah Hari" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="unit" label="Jumlah Unit" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
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
