import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
// import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { useModalAdd } from "./useModalAdd";
import { Form } from "./form";
import { initialValues, validationSchema } from "./Modal.constant";
// import { Default, FormTerencana } from "./form";

const ModalAdd = () => {
  const [isNextPage, setIsNextPage] = useState<boolean>(false);

  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-laporan-pekerjaan";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenisForm = formMethods.watch("jenis");

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
            {Form[jenisForm]()}
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
