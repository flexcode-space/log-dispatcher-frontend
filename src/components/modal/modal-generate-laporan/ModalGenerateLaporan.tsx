import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { modal, closeModal } from "src/state/modal";
import { copyClipboard } from "src/helper/clipboard";

type ModalAddProps = {
  value: string;
  title: string;
};
const ModalGenerateLaporan = ({ value, title }: ModalAddProps) => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-generate-laporan";

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
            {title}
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
          <div id="textLaporan" dangerouslySetInnerHTML={{ __html: value }} />
        </Box>
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button
          variant="contained"
          type="submit"
          id="btn-copy"
          disabled={!value}
          onClick={() => copyClipboard(value)}
        >
          Salin Laporan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalGenerateLaporan;
