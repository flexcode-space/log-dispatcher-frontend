import React from "react";
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
import { modal, closeModal } from "src/state/modal";

export const ModalConfirmationDelete = () => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-confirmation-delete";

  const onClickCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        onClose={onClickCloseModal}
        maxWidth="sm"
        scroll="body"
      >
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
              Keterangan Gangguan
            </Typography>
          </Box>
          <Grid container spacing={2} mt={1}>
            <h1>test</h1>
          </Grid>
        </DialogContent>
        <DialogActions className="dialog-actions-dense">
          <Button variant="contained" onClick={onClickCloseModal}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
