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
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField, TextArea } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";

import { setReloadPage } from "src/state/reloadPage";
import { useEffect } from "react";

const ModalGenerateLaporan = () => {
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
                Neraca Daya Rencana 06.00 (Pagi)
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
              <p id="textLaporan">
                Kecukupan Daya UP2B Jateng & DIY <br />
                Jumat 26-08-2022
                <br />
                <br />
                BP Tertinggi UP2B JTD (Yang pernah tercapai di Sistem)
                (Realisasi) <br />
                Siang: 4,600 MW, Tanggal 11-09-2022, Pukul 16:00 WIB (00.00 -
                16.00) <br />
                Malam: 4,851 MW, Tanggal 13-05-2022, Pukul 18:00 WIB (16.30 -
                23.30) <br />
                Prakiraan BP hari ini (ROH) Siang: 4,360 MW, Pukul 13:30 WIB
                Malam: 4,812 MW, Pukul 18:00 WIB Total Mampu Pasok: 7,106 MW
                (Total Semua Subsistem) 1. SS UNGAR a DM PASOK : 1,204 MW - IBT
                UNGAR 1-2: 800 MW (07.00) - KIT TBROK :
              </p>
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
