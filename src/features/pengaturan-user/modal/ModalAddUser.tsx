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
import { UploadFile } from "src/components/upload-file";
import { HAK_AKSES } from "./useModalAdd";
import { columns } from "src/features/home/components/StatusPembangkit";

const ModalAddUser = () => {
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
                Tambah Akun
              </Typography>
            </Box>
            <Grid container spacing={1} mb={5}>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src="/images/profil-tambah-akun.png"
                  alt="contoh foto"
                  height={120}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <UploadFile
                  name="Pilih-Foto"
                  label="Pilih Foto"
                  onChange={() => {}}
                />
                <p>Support file: .jpg, png maximum 5 MB</p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Hak Akses" name="" options={HAK_AKSES} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="nama" label="Nama" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField label="Jabatan" name="jabatan" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField label="Email" name="" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField label="Username" name="" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField label="Password" name="" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              SIMPAN
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAddUser;
