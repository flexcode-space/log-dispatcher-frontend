import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItemText,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { closeModal, modal, openModal } from "src/state/modal";
import { energizePeralatan, removeData } from "src/state/energizePeralatan";
import { StyledListItem } from "./ModalDetail.styled";

const ModalDetail = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(energizePeralatan);

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-energize-peralatan-detail";

  const onClickCloseModal = () => {
    closeModal();
    removeData();
  };

  const onClickUpdateData = () => {
    openModal("modal-energize-peralatan", data?.id);
  };

  const ButtonDownload = ({ url }: { url: string }) => (
    <Button
      variant="outlined"
      disabled={!url}
      onClick={() => window.open(url, "_blank", "noreferrer")}
    >
      Download
    </Button>
  );

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onClickCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <DialogTitle id="max-width-dialog-title">Dokumen Energize</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12}>
            <List dense>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.sop} />}
              >
                <ListItemText>SOP Energize</ListItemText>
              </StyledListItem>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.rlb} />}
              >
                <ListItemText>RLB</ListItemText>
              </StyledListItem>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.permohonan} />}
              >
                <ListItemText>Surat Permohonan</ListItemText>
              </StyledListItem>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.ba_ptp} />}
              >
                <ListItemText>BA PTP</ListItemText>
              </StyledListItem>
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button variant="outlined" onClick={onClickUpdateData}>
          Ubah Data
        </Button>
        <Button variant="contained" onClick={onClickCloseModal}>
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetail;
