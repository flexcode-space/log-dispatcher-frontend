import { ChangeEvent, useEffect, useState } from "react";
import { useForm, FormProvider, FieldPath } from "react-hook-form";
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
import { UploadFile } from "src/components/upload-file";
import { HAK_AKSES } from "./useModalAdd";
import { pengaturanUserApi } from "src/api/pengaturan-user";
import { Axios } from "src/api/axios";
import { validationSchema, initialValues } from "./ModalUser.constant";
import { pengaturanUser, removeData } from "../state/pengaturanUser";
import { setReloadPage } from "src/state/reloadPage";

const ModalAddUser = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(pengaturanUser);

  const [image, setImage] = useState<string>("");

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-user";

  const { createPengaturanUser, updatePengaturanUser } = pengaturanUserApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    name: FieldPath<{ photo: string }>
  ) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    Axios.post("/laporan/upload", formData).then(({ data }) => {
      formMethods.setValue(name, data.nama);
    });
  };

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      if (modalSnapshot.id) {
        await updatePengaturanUser({ ...values, id: modalSnapshot.id });
      } else {
        await createPengaturanUser(values);
      }
      onCloseModal();
      setReloadPage("pengaturan-user");
    })();
  };

  const onCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      formMethods.reset({ ...data });
    }
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onCloseModal}
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
                  src={image || "/images/profil-tambah-akun.png"}
                  alt="contoh foto"
                  height={120}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <UploadFile
                  name="photo"
                  label="Pilih Foto"
                  onChange={(e) => handleFileUpload(e, "photo")}
                />
                <p>Support file: .jpg, png maximum 5 MB</p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Hak Akses" name="hak" options={HAK_AKSES} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="name" label="Nama" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField label="Jabatan" name="jabatan" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField label="Email" name="email" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField label="Username" name="username" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField label="Password" name="password" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onCloseModal}>
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
