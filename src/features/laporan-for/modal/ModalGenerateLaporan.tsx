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
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { useEffect } from "react";
type ModalAddProps = {
  Data?: { value: string | number; label: string }[];
};
const ModalGenerateLaporan = ({ Data }: ModalAddProps) => {
  const modalSnapshot = useSnapshot(modal);
  let text = document.querySelector("#textLaporan");

  function copyFunction() {
    let copyText = text?.textContent;
    if (copyText === undefined) {
      alert("laporan gagal di salin");
    } else {
      navigator?.clipboard.writeText(`${copyText}`);
      alert(`laporan berhasil di salin`);
      closeModal();
    }
  }

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-generate-laporan";

  const formMethods = useForm({
    //     resolver: yupResolver(validationSchema),
    //     defaultValues: initialValues,
    //     mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
  };

  const hanleCloseModal = () => {
    closeModal();
  };

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
              px: { sm: 15 },
              pt: 6,
              position: "relative",
            }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                Laporan FOR
              </Typography>
            </Box>
            <Box
              sx={{
                maxHeight: 1000,
                overflow: "auto",
                border: "1px solid  #e0e0e0",
                borderRadius: "8px",
                padding: 4,
              }}
            >
              <div id="textLaporan">
                {/* @ts-ignore */}
                <p dangerouslySetInnerHTML={{ __html: Data }} />
              </div>
            </Box>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button
              variant="contained"
              type="submit"
              id="btn-copy"
              onClick={() => copyFunction()}
            >
              Salin Laporan
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalGenerateLaporan;
