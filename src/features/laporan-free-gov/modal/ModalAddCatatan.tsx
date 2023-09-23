import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { setReloadPage } from "src/state/reloadPage";
import { TextArea } from "src/components/input-field";
import { laporanFreegovApi } from "src/api/laporan-freegov";
import { laporanFreeGov } from "../state/laporanFreeGov";

type ModalAddCatatanProps = {
  date: string;
};

const ModalAddCatatan = ({ date }: ModalAddCatatanProps) => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(laporanFreeGov);
  const { createLaporanFreegov } = laporanFreegovApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-laporan-freegov";

  const initialValues = { catatan: "" };
  const validationSchema = yup.object({ catatan: yup.string() });

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      await createLaporanFreegov({
        ...values,
        pembangkit_id: modalSnapshot.id,
        tanggal: date,
      });

      onCloseModal();
      setReloadPage("laporan-freegov");
    })();
  };

  const onCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    formMethods.reset({
      ...data,
    });
  }, [data]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm sx={{ width: "100%" }} noValidate onSubmit={onSubmit}>
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
                Tambah Catatan
              </Typography>
            </Box>
            <TextArea name="catatan" label="Catatan" />
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button onClick={onCloseModal}>Batal</Button>
            <Button variant="contained" type="submit">
              Tambah
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAddCatatan;
