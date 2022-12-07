import { ChangeEvent } from "react";
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
import { InputField, TextArea } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { UploadFile } from "src/components/upload-file";
import { StyledForm } from "src/components/form";
import { modal, closeModal, reloadPage } from "src/state/modal";
import { Axios } from "src/api/axios";
import { documentApi } from "src/api/document";
import { typeDocumentOptions } from "../Document.constant";
import {
  validationSchema,
  initialValues,
  UploadDocumentType,
} from "./ModalAddDocument.constant";

const ModalAddDocument = () => {
  const modalSnapshot = useSnapshot(modal);
  const { createDocument } = documentApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-document";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      // TODO
      console.log("values", values);
      await createDocument(values);

      closeModal();
      reloadPage();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    name: FieldPath<UploadDocumentType>
  ) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    Axios.post("/laporan/upload", formData).then(({ data }) => {
      formMethods.setValue(name, data.nama);
    });
  };

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
                Tambah Dokumen
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <InputField name="nama" label="Nama Dokumen" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Jenis Dokumen"
                  name="tipe"
                  options={typeDocumentOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <UploadFile
                  name="nama_url"
                  label="Pilih Dokumen"
                  onChange={(e) => handleFileUpload(e, "nama_url")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextArea name="keterangan" label="Keterangan" />
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

export default ModalAddDocument;
