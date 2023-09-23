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
import { StyledListItem } from "./ModalFilePendukung.styled";
import { gangguan, removeData } from "../../state/gangguan";

const ModalFilePendukung = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(gangguan);

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-gangguan-file-pendukung";

  const onClickCloseModal = () => {
    closeModal();
    removeData();
  };

  const onClickUpdateData = () => {
    openModal("modal-add-gangguan", data.id);
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
      <DialogTitle id="max-width-dialog-title">Dokumen Pendukung</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12}>
            <List dense>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.dfr} />}
              >
                <ListItemText>DFR</ListItemText>
              </StyledListItem>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.pqm} />}
              >
                <ListItemText>PKM</ListItemText>
              </StyledListItem>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.vaisala} />}
              >
                <ListItemText>VAISALA</ListItemText>
              </StyledListItem>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.sld} />}
              >
                <ListItemText>SLD</ListItemText>
              </StyledListItem>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.gensum} />}
              >
                <ListItemText>Gensum</ListItemText>
              </StyledListItem>
              <StyledListItem
                secondaryAction={<ButtonDownload url={data?.lap} />}
              >
                <ListItemText>Lap. Gangguan</ListItemText>
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

export default ModalFilePendukung;
