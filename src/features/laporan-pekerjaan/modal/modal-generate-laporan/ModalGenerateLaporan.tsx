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
      alert(`laporan  berhasil di salin`);
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
                laporan perkerjaan
              </Typography>
            </Box>
            <Box
              sx={{
                maxHeight: 1000,
                overflow: "auto",
                border: "1px solid  #e0e0e0",
                borderRadius: "8px",
                padding: 5,
              }}
            >
              <p id="textLaporan">
                UPDATE SISTEM UP2B JATENG & DIY Kamis 27-08-2022 Pukul 17.00
                (jam terakhir yang datanya ada di tanggal itu) <br /> <br />
                #Renc beban: 4,269 MW, Real: 4,138 MW #Ekskursi teg = NIHIL; Teg
                Terendah (Busbar) GI WATES : 142 kV ; Tertinggi NBTNG : 152 kV
                (dari jam 00 - jam 17) #Transfer ke barat: 3,074 MW (Penghantar
                yang Transfer Barat) #Padam akibat ggn KIT&LUR : NIHIL (Dari
                Gangguan Data Padam) #Pek Terencana: 1) GI UNGAR: SUTT BAWEN 2
                pkl 07.55 - 16.21 wib dilaks SLO Pusertif, HAR OFF Prog 100%.
                #Pekerjaan Menginap : 1) GI NBTNG: SUTT WLERI 1&2, Pekerjaan
                Rekonduktoring, rencana padam menginap s.d tgl 26-11-2022.
                #Gangguan KIT/LUR : Nihil #Pelepasan Penghantar Pembersihan
                Isolator T.281, 296, 329, 339-342, 364, 369, 372, 380, 382, 396,
                399, 404, 423, 444, 454 #Energize Peralatan #RTU Block Serondol
                Terima Kasih Dispa UP2B JTD
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
