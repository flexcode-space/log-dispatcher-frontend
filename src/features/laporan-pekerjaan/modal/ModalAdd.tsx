import { useState } from "react";
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
// import Plus from "mdi-material-ui/Plus";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, reloadPage, closeModal } from "src/state/modal";
import { useModalAdd } from "./useModalAdd";
import { Index } from "./Form";

const ModalAdd = () => {
  const [isNextPage, setIsNextPage] = useState<boolean>(false);

  const modalSnapshot = useSnapshot(modal);

  const { jenisPekerjaanOptions } = useModalAdd();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-laporan-pekerjaan";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      //  TODO: handle submit
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    // formMethods.reset({ ...initialValues });
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
            <Index jenisPekerjaanOptions={jenisPekerjaanOptions} />
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button
              variant={isNextPage ? "text" : "outlined"}
              onClick={onClickCloseModal}
            >
              Batal
            </Button>
            {isNextPage ? (
              <>
                <Button variant="outlined" onClick={() => setIsNextPage(false)}>
                  Sebelumnya
                </Button>
                <Button variant="contained" type="submit">
                  Tambah
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={() => setIsNextPage(true)}>
                Selanjutnya
              </Button>
            )}
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAdd;
