import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";

type ModalChangeStatusProps = {
  onSubmitStatus: (keterangan: string) => void;
};

const ModalChangeStatus = ({ onSubmitStatus }: ModalChangeStatusProps) => {
  const modalSnapshot = useSnapshot(modal);

  const validationSchema = yup.object({
    keterangan: yup.string().required("This field is required"),
  });

  const initialValues = {
    keterangan: "",
  };

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-change-status";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const keterangan = formMethods.watch("keterangan");

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      onSubmitStatus(values.keterangan);
      onClickCloseModal();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
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
        <StyledForm noValidate onSubmit={onSubmit} sx={{ width: "100%" }}>
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
                Masukkan Keterangan
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <InputField label="Keterangan" name="keterangan" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" disabled={!keterangan} type="submit">
              {modalSnapshot.id}
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalChangeStatus;
