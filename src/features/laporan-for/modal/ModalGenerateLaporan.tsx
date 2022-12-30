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

const ModalGenerateLaporan = () => {
  const modalSnapshot = useSnapshot(modal);
  let text = document.querySelector("#textLaporan");
  function copyFunction() {
    console.log("text :", text);
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
              <p id="textLaporan">
                LAPORAN HARIAN OPERASI SISTEM UP2B JATENG & DIY <br /> Jumat
                26-08-2022 <br />
                <br /> - Piket Pimpinan : IRAWAN SURYA DARMA <br /> - Piket Bid
                Fasop : REZA ILHAM S, YOGI SAPUTRO, DWIATMA <br /> - Piket
                Dispatcher : ARIS SETYAWAN, RILO PAMBUDI, AZIF FUAD FAHRUDDIN
                <br />
                <br />
                Gangguan Hari/Tanggal: Kamis, 25-08-2022 <br /> 1. PLTU CLCAP #2
                : FD1, Pkl 12.26 <br /> - 18.47 derating di beban 198 MW kendala
                vaccum condensor <br /> - Beban padam : Nihil <br /> - System
                Recovery Time (SRT) : Nihil <br /> - Defense Scheme : Nihil{" "}
                <br /> 2. PLTU CLCAP #1 : FD1, Pkl 13.23 - 15.01 WIB derating
                dibeban 263 MW, kendala coal flow maximum <br /> - Beban padam :
                Nihil <br />- System Recovery Time (SRT) : Nihil - Defense
                Scheme : Nihil <br /> 3. PLTU RBANG #1 : FD1, Pkl 20.15-00.07
                WIB derating dibeban 213 MW kendala gangguan Mill E; Pkl
                22.50-00.07 WIB derating dibeban 180 MW kendala gangguan Mill E
                <br /> - Beban padam : Nihil <br /> - System Recovery Time (SRT)
                : Nihil <br /> - Defense Scheme : Nihil <br />
                <br /> Terima kasih <br /> Dispa UP2B JTD
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
