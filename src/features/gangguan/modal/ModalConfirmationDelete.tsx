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
import { TrashCanOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import { modal, closeModal } from "src/state/modal";
import { gangguan, removeData } from "../state/gangguan";
import dayjs from "dayjs";
import { gangguanApi } from "src/api/gangguan";
import { setReloadPage } from "src/state/reloadPage";

export const ModalConfirmationDelete = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(gangguan);

  const { deleteGangguan } = gangguanApi();

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-confirmation-delete";

  const onClickDelete = async () => {
    await deleteGangguan({ id: data.id });
    setReloadPage("gangguan")
  };

  const onClickCloseModal = () => {
    closeModal();
    removeData();
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
            <Typography variant="h6" sx={{ mb: 3, lineHeight: "2rem" }}>
              {`Hapus Laporan Gangguan ${dayjs(data.tanggal).format(
                "DD MMMM YYYY"
              )}?`}
            </Typography>
          </Box>
          <Grid container spacing={2} mt={1}>
            <Typography variant="subtitle1">
              {`Apakah kamu yakin menghapus Laporan Gangguan pada Tanggal ${dayjs(
                data.tanggal
              ).format(
                "DD MMMM YYYY"
              )}? Setelah dihapus data laporan akan hilang`}
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions className="dialog-actions-dense">
          <Button variant="outlined" onClick={onClickCloseModal}>
            Batal
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#FF4D49" }}
            onClick={onClickDelete}
          >
            <TrashCanOutline sx={{ mr: 1 }} />
            Ya, Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
